import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/types/database";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishable =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE;

if (!supabaseUrl) {
  throw new Error(
    "Falta la variable de entorno VITE_SUPABASE_URL.",
  );
}

if (!supabasePublishable) {
  throw new Error(
    "Falta la variable de entorno VITE_SUPABASE_PUBLISHABLE.",
  );
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabasePublishable,
  {
    db: {
      schema: "public",
    },

    /*
     * Entre Silencios no tiene usuarios ni autenticación.
     * Desactivamos toda la gestión automática de sesiones.
     */
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  },
);