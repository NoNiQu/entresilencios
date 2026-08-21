import { supabase } from "~/lib/supabase";

/**
 * Devuelve las cofradías publicadas para listados y tarjetas.
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
      )
    `)
    .eq("publicada", true);

  if (error) {
    console.error("Error al obtener las cofradías:", error);

    throw new Error(
      "No se han podido cargar las cofradías.",
    );
  }

  return [...(data ?? [])].sort((a, b) => {
    const anioA =
      a.anio_refundacion ??
      a.anio_fundacion ??
      Number.MAX_SAFE_INTEGER;

    const anioB =
      b.anio_refundacion ??
      b.anio_fundacion ??
      Number.MAX_SAFE_INTEGER;

    if (anioA !== anioB) {
      return anioA - anioB;
    }

    return a.nombre.localeCompare(b.nombre, "es");
  });
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

  return data;
}

export type CofradiaDetalle = NonNullable<
  Awaited<ReturnType<typeof getCofradiaPorSlug>>
>;