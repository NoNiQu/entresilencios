import { supabase } from "~/lib/supabase";
import type { HomeCofradia } from "~/types/home";

export async function getHomeCofradias(): Promise<HomeCofradia[]> {
  const { data, error } = await supabase
    .from("cofradias")
    .select("id, nombre, slug, anio_fundacion, escudo_url")
    .eq("publicada", true)
    .order("nombre", { ascending: true })
    .limit(4);

  if (error) {
    console.error("Error cargando las cofradías de la home:", error);
    return [];
  }

  return data ?? [];
}