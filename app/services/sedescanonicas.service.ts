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
 * Devuelve las sedes canónicas que pertenecen al menos
 * a una cofradía publicada.
 */
export async function getSedesCanonicasPublicadas() {
  const { data, error } = await supabase
    .from("sedes_canonicas")
    .select(`
      id,
      nombre,
      slug,
      direccion,
      descripcion_breve,
      imagen_url,
      cofradias!inner (
        id,
        nombre,
        slug,
        escudo_url,
        publicada
      )
    `)
    .eq("cofradias.publicada", true)
    .order("nombre", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Error al obtener las sedes canónicas:",
      error,
    );

    throw new Error(
      "No se han podido cargar las sedes canónicas.",
    );
  }

  return data ?? [];
}

export type SedeCanonicaResumen = Awaited<
  ReturnType<typeof getSedesCanonicasPublicadas>
>[number];

/**
 * Devuelve una sede canónica por slug junto con sus
 * cofradías publicadas y sus horarios.
 */
export async function getSedeCanonicaPorSlug(slug: string) {
  const { data, error } = await supabase
    .from("sedes_canonicas")
    .select(`
      id,
      nombre,
      slug,
      direccion,
      descripcion_breve,
      imagen_url,
      uso_actual,
      nota_uso_actual,
      horarios_url,
      cofradias!inner (
        id,
        nombre,
        slug,
        anio_fundacion,
        escudo_url,
        publicada
      ),
      horarios (
        id,
        tipo,
        texto,
        hora,
        orden,
        activo
      )
    `)
    .eq("slug", slug)
    .eq("cofradias.publicada", true)
    .maybeSingle();

  if (error) {
    console.error(
      `Error al obtener la sede canónica "${slug}":`,
      error,
    );

    throw new Error(
      "No se ha podido cargar la información de la sede canónica.",
    );
  }

  if (!data) {
    return null;
  }

  const {
    horarios,
    ...sede
  } = data;

  return {
    ...sede,

    descripcion_breve: limpiarTexto(
      sede.descripcion_breve,
    ),

    nota_uso_actual: limpiarTexto(
      sede.nota_uso_actual,
    ),

    horarios: [...(horarios ?? [])]
      .filter((horario) => horario.activo)
      .sort((a, b) => a.orden - b.orden)
      .map((horario) => ({
        ...horario,
        texto: limpiarTexto(horario.texto),
      })),
  };
}

export type SedeCanonicaDetalle = NonNullable<
  Awaited<ReturnType<typeof getSedeCanonicaPorSlug>>
>;