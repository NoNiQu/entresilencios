import { supabase } from "~/lib/supabase";

/**
 * Limpia espacios, saltos de línea y caracteres invisibles
 * al principio y al final de un texto.
 *
 * No modifica los espacios ni saltos internos del contenido.
 */
function limpiarTexto(texto: string | null) {
  if (!texto) {
    return texto;
  }

  return texto.replace(
    /^[\s\u00A0\u200B\uFEFF]+|[\s\u00A0\u200B\uFEFF]+$/g,
    "",
  );
}

/**
 * Devuelve las cofradías publicadas para listados y tarjetas.
 *
 * Se ordenan según su primera procesión de Semana Santa.
 *
 * Los traslados no cuentan para determinar el orden.
 * Si una cofradía participa en varias procesiones,
 * únicamente se tiene en cuenta la primera.
 */
export async function getCofradiasPublicadas() {
  const { data, error } = await supabase
    .from("cofradias")
    .select(`
      id,
      nombre,
      nombre_corto,
      slug,
      anio_fundacion,
      anio_refundacion,
      escudo_url,

      sede:sedes_canonicas (
        id,
        nombre,
        direccion
      ),

      procesiones (
        id,
        tipo,
        orden_dia,
        dias_semana_santa (
          id,
          nombre,
          orden
        )
      )
    `)
    .eq("publicada", true);

  if (error) {
    console.error(
      "Error al obtener las cofradías:",
      error,
    );

    throw new Error(
      "No se han podido cargar las cofradías.",
    );
  }

  return (data ?? [])
    .map((cofradia) => {
      const {
        procesiones,
        ...datosCofradia
      } = cofradia;

      /**
       * Quitamos los traslados y buscamos la primera
       * procesión real de la cofradía.
       */
      const primeraProcesion = [
        ...(procesiones ?? []),
      ]
        .filter(
          (procesion) =>
            procesion.tipo !== "TRASLADO" &&
            procesion.dias_semana_santa,
        )
        .sort((a, b) => {
          const ordenDiaA =
            a.dias_semana_santa?.orden ??
            Number.MAX_SAFE_INTEGER;

          const ordenDiaB =
            b.dias_semana_santa?.orden ??
            Number.MAX_SAFE_INTEGER;

          if (ordenDiaA !== ordenDiaB) {
            return ordenDiaA - ordenDiaB;
          }

          return (
            (a.orden_dia ?? Number.MAX_SAFE_INTEGER) -
            (b.orden_dia ?? Number.MAX_SAFE_INTEGER)
          );
        })[0];

      return {
        ...datosCofradia,

        orden_primera_procesion:
          primeraProcesion?.dias_semana_santa?.orden ??
          Number.MAX_SAFE_INTEGER,

        orden_dia_primera_procesion:
          primeraProcesion?.orden_dia ??
          Number.MAX_SAFE_INTEGER,
      };
    })
    .sort((a, b) => {
      /**
       * Primero: día de Semana Santa.
       */
      if (
        a.orden_primera_procesion !==
        b.orden_primera_procesion
      ) {
        return (
          a.orden_primera_procesion -
          b.orden_primera_procesion
        );
      }

      /**
       * Segundo: orden de la procesión dentro del día.
       */
      if (
        a.orden_dia_primera_procesion !==
        b.orden_dia_primera_procesion
      ) {
        return (
          a.orden_dia_primera_procesion -
          b.orden_dia_primera_procesion
        );
      }

      /**
       * Desempate final por nombre.
       */
      return a.nombre.localeCompare(
        b.nombre,
        "es",
      );
    })
    .map(
      ({
        orden_primera_procesion,
        orden_dia_primera_procesion,
        ...cofradia
      }) => cofradia,
    );
}

/**
 * Tipo inferido automáticamente a partir de la consulta anterior.
 */
export type CofradiaResumen = Awaited<
  ReturnType<typeof getCofradiasPublicadas>
>[number];

/**
 * Devuelve toda la información pública de una cofradía.
 */
export async function getCofradiaPorSlug(slug: string) {
  const { data, error } = await supabase
    .from("cofradias")
    .select(`
      id,
      nombre,
      slug,
      anio_fundacion,
      anio_refundacion,
      historia,

      escudo_url,

      sede:sedes_canonicas (
        id,
        nombre,
        slug,
        direccion,
        descripcion_breve,
        imagen_url
      ),

      titulares (
        id,
        nombre,
        advocacion,
        tipo,
        autor,
        anio_realizacion,
        siglo_realizacion,
        imagen_url,
        tipo_paso,
        descripcion_breve,
        orden
      ),

      enlaces_oficiales (
        id,
        tipo,
        url,
        nombre_usuario,
        orden,
        activo
      )
    `)
    .eq("slug", slug)
    .eq("publicada", true)
    .eq("enlaces_oficiales.activo", true)

    .order("orden", {
      referencedTable: "titulares",
      ascending: true,
    })

    .order("orden", {
      referencedTable: "enlaces_oficiales",
      ascending: true,
    })

    .maybeSingle();

  if (error) {
    console.error(
      `Error al obtener la cofradía "${slug}":`,
      error,
    );

    throw new Error(
      "No se ha podido cargar la información de la cofradía.",
    );
  }

  if (!data) {
    return null;
  }

  return {
    ...data,

    historia: limpiarTexto(
      data.historia,
    ),

    titulares: data.titulares.map(
      (titular) => ({
        ...titular,

        descripcion_breve: limpiarTexto(
          titular.descripcion_breve,
        ),
      }),
    ),
  };
}

export type CofradiaDetalle = NonNullable<
  Awaited<ReturnType<typeof getCofradiaPorSlug>>
>;