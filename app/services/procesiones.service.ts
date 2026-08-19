import { supabase } from "~/lib/supabase";

/**
 * Devuelve las procesiones cuya cofradía está publicada.
 */
export async function getProcesionesPublicadas() {
  const { data, error } = await supabase
    .from("procesiones")
    .select(`
      id,
      slug,
      nombre,
      tipo,
      image_url,
      hora_salida,
      hora_entrada,
      lugar_salida,
      lugar_entrada,
      orden_dia,
      cofradias!inner (
        id,
        nombre,
        slug,
        escudo_url,
        publicada
      ),
      dias_semana_santa (
        id,
        nombre,
        orden,
        desplazamiento_resurreccion
      )
    `)
    .eq("cofradias.publicada", true);

  if (error) {
    console.error("Error al obtener las procesiones:", error);

    throw new Error(
      "No se han podido cargar las procesiones.",
    );
  }

  return (data ?? [])
    .map((procesion) => {
      const {
        cofradias,
        dias_semana_santa,
        ...datosProcesion
      } = procesion;

      return {
        ...datosProcesion,
        cofradia: cofradias,
        dia: dias_semana_santa,
      };
    })
    .sort((a, b) => {
      const ordenDiaA = a.dia?.orden ?? 999;
      const ordenDiaB = b.dia?.orden ?? 999;

      if (ordenDiaA !== ordenDiaB) {
        return ordenDiaA - ordenDiaB;
      }

      return a.orden_dia - b.orden_dia;
    });
}

export type ProcesionResumen = Awaited<
  ReturnType<typeof getProcesionesPublicadas>
>[number];

/**
 * Devuelve toda la información pública de una procesión.
 */
export async function getProcesionPorSlug(slug: string) {
  const { data, error } = await supabase
    .from("procesiones")
    .select(`
      id,
      slug,
      nombre,
      tipo,
      image_url,
      hora_salida,
      hora_entrada,
      lugar_salida,
      lugar_entrada,
      recorrido,
      observaciones,
      orden_dia,
      fuente_url,
      verificado_en,

      cofradias!inner (
        id,
        nombre,
        slug,
        anio_fundacion,
        anio_refundacion,
        escudo_url,
        publicada,
        sedes_canonicas (
          id,
          nombre,
          slug,
          direccion
        )
      ),

      dias_semana_santa (
        id,
        nombre,
        orden,
        desplazamiento_resurreccion
      ),

      habitos (
        id,
        aplica_a,
        nombre,
        descripcion,
        image_url,
        orden,
        activo
      ),

      acompanamientos_musicales (
        id,
        nombre,
        procedencia,
        tipo_formacion,
        posicion,
        orden
      ),

      puntos_interes (
        id,
        nombre,
        tipo,
        direccion,
        descripcion_breve,
        hora_aproximada,
        orden
      ),

      procesion_titulares (
        orden,
        titulares (
          id,
          nombre,
          tipo,
          autor,
          anio_realizacion,
          imagen_url,
          tipo_paso,
          descripcion_breve
        )
      )
    `)
    .eq("slug", slug)
    .eq("cofradias.publicada", true)
    .maybeSingle();

  if (error) {
    console.error(
      `Error al obtener la procesión "${slug}":`,
      error,
    );

    throw new Error(
      "No se ha podido cargar la información de la procesión.",
    );
  }

  if (!data) {
    return null;
  }

  const {
    cofradias,
    dias_semana_santa,
    habitos,
    acompanamientos_musicales,
    puntos_interes,
    procesion_titulares,
    ...procesion
  } = data;

  const {
    sedes_canonicas,
    ...cofradia
  } = cofradias;

  const titulares = [...(procesion_titulares ?? [])]
    .sort((a, b) => a.orden - b.orden)
    .flatMap((relacion) => {
      if (!relacion.titulares) {
        return [];
      }

      return [
        {
          ...relacion.titulares,
          orden: relacion.orden,
        },
      ];
    });

  return {
    ...procesion,

    dia: dias_semana_santa,

    cofradia: {
      ...cofradia,
      sede: sedes_canonicas,
    },

    titulares,

    habitos: [
      ...(habitos ?? []),
    ]
      .filter((habito) => habito.activo)
      .sort((a, b) => a.orden - b.orden),

    acompanamientos_musicales: [
      ...(acompanamientos_musicales ?? []),
    ].sort((a, b) => a.orden - b.orden),

    puntos_interes: [
      ...(puntos_interes ?? []),
    ].sort((a, b) => a.orden - b.orden),
  };
}

export type ProcesionDetalle = NonNullable<
  Awaited<ReturnType<typeof getProcesionPorSlug>>
>;