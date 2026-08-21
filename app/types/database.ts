export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      acompanamientos_musicales: {
        Row: {
          id: number
          nombre: string
          orden: number
          posicion: string | null
          procedencia: string | null
          procesion_id: number
          tipo_formacion: string | null
        }
        Insert: {
          id?: number
          nombre: string
          orden?: number
          posicion?: string | null
          procedencia?: string | null
          procesion_id: number
          tipo_formacion?: string | null
        }
        Update: {
          id?: number
          nombre?: string
          orden?: number
          posicion?: string | null
          procedencia?: string | null
          procesion_id?: number
          tipo_formacion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "acompanamientos_musicales_procesion_id_fkey"
            columns: ["procesion_id"]
            isOneToOne: false
            referencedRelation: "procesiones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acompanamientos_musicales_procesion_id_fkey"
            columns: ["procesion_id"]
            isOneToOne: false
            referencedRelation: "v_calendario_procesiones"
            referencedColumns: ["id"]
          },
        ]
      }
      cofradias: {
        Row: {
          anio_fundacion: number | null
          anio_refundacion: number | null
          escudo_url: string | null
          historia: string | null
          id: number
          nombre: string
          nombre_corto: string | null
          publicada: boolean
          sede_canonica_id: number | null
          slug: string
        }
        Insert: {
          anio_fundacion?: number | null
          anio_refundacion?: number | null
          escudo_url?: string | null
          historia?: string | null
          id?: number
          nombre: string
          nombre_corto?: string | null
          publicada?: boolean
          sede_canonica_id?: number | null
          slug: string
        }
        Update: {
          anio_fundacion?: number | null
          anio_refundacion?: number | null
          escudo_url?: string | null
          historia?: string | null
          id?: number
          nombre?: string
          nombre_corto?: string | null
          publicada?: boolean
          sede_canonica_id?: number | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "cofradias_sede_canonica_id_fkey"
            columns: ["sede_canonica_id"]
            isOneToOne: false
            referencedRelation: "sedes_canonicas"
            referencedColumns: ["id"]
          },
        ]
      }
      dias_semana_santa: {
        Row: {
          desplazamiento_resurreccion: number
          id: number
          nombre: string
          orden: number
        }
        Insert: {
          desplazamiento_resurreccion: number
          id?: number
          nombre: string
          orden: number
        }
        Update: {
          desplazamiento_resurreccion?: number
          id?: number
          nombre?: string
          orden?: number
        }
        Relationships: []
      }
      enlaces_oficiales: {
        Row: {
          activo: boolean
          cofradia_id: number
          id: number
          nombre_usuario: string | null
          orden: number
          tipo: string
          url: string
        }
        Insert: {
          activo?: boolean
          cofradia_id: number
          id?: number
          nombre_usuario?: string | null
          orden?: number
          tipo: string
          url: string
        }
        Update: {
          activo?: boolean
          cofradia_id?: number
          id?: number
          nombre_usuario?: string | null
          orden?: number
          tipo?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "enlaces_oficiales_cofradia_id_fkey"
            columns: ["cofradia_id"]
            isOneToOne: false
            referencedRelation: "cofradias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enlaces_oficiales_cofradia_id_fkey"
            columns: ["cofradia_id"]
            isOneToOne: false
            referencedRelation: "v_calendario_procesiones"
            referencedColumns: ["cofradia_id"]
          },
        ]
      }
      habitos: {
        Row: {
          activo: boolean
          aplica_a: string
          descripcion: string
          id: number
          image_url: string | null
          nombre: string | null
          orden: number
          procesion_id: number
        }
        Insert: {
          activo?: boolean
          aplica_a?: string
          descripcion: string
          id?: never
          image_url?: string | null
          nombre?: string | null
          orden?: number
          procesion_id: number
        }
        Update: {
          activo?: boolean
          aplica_a?: string
          descripcion?: string
          id?: never
          image_url?: string | null
          nombre?: string | null
          orden?: number
          procesion_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "habitos_procesion_id_fkey"
            columns: ["procesion_id"]
            isOneToOne: false
            referencedRelation: "procesiones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "habitos_procesion_id_fkey"
            columns: ["procesion_id"]
            isOneToOne: false
            referencedRelation: "v_calendario_procesiones"
            referencedColumns: ["id"]
          },
        ]
      }
      horarios: {
        Row: {
          activo: boolean
          hora: string
          id: number
          orden: number
          sede_canonica_id: number
          texto: string
          tipo: string
        }
        Insert: {
          activo?: boolean
          hora: string
          id?: number
          orden?: number
          sede_canonica_id: number
          texto: string
          tipo?: string
        }
        Update: {
          activo?: boolean
          hora?: string
          id?: number
          orden?: number
          sede_canonica_id?: number
          texto?: string
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "horarios_sede_canonica_id_fkey"
            columns: ["sede_canonica_id"]
            isOneToOne: false
            referencedRelation: "sedes_canonicas"
            referencedColumns: ["id"]
          },
        ]
      }
      procesion_titulares: {
        Row: {
          orden: number
          procesion_id: number
          titular_id: number
        }
        Insert: {
          orden?: number
          procesion_id: number
          titular_id: number
        }
        Update: {
          orden?: number
          procesion_id?: number
          titular_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "procesion_titulares_procesion_id_fkey"
            columns: ["procesion_id"]
            isOneToOne: false
            referencedRelation: "procesiones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "procesion_titulares_procesion_id_fkey"
            columns: ["procesion_id"]
            isOneToOne: false
            referencedRelation: "v_calendario_procesiones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "procesion_titulares_titular_id_fkey"
            columns: ["titular_id"]
            isOneToOne: false
            referencedRelation: "titulares"
            referencedColumns: ["id"]
          },
        ]
      }
      procesiones: {
        Row: {
          cofradia_id: number
          dia_id: number
          fuente_url: string | null
          hora_entrada: string | null
          hora_salida: string | null
          id: number
          image_url: string | null
          lugar_entrada: string | null
          lugar_salida: string | null
          nombre: string
          observaciones: string | null
          orden_dia: number
          recorrido: string | null
          slug: string
          tipo: string
          verificado_en: string | null
        }
        Insert: {
          cofradia_id: number
          dia_id: number
          fuente_url?: string | null
          hora_entrada?: string | null
          hora_salida?: string | null
          id?: number
          image_url?: string | null
          lugar_entrada?: string | null
          lugar_salida?: string | null
          nombre: string
          observaciones?: string | null
          orden_dia?: number
          recorrido?: string | null
          slug: string
          tipo: string
          verificado_en?: string | null
        }
        Update: {
          cofradia_id?: number
          dia_id?: number
          fuente_url?: string | null
          hora_entrada?: string | null
          hora_salida?: string | null
          id?: number
          image_url?: string | null
          lugar_entrada?: string | null
          lugar_salida?: string | null
          nombre?: string
          observaciones?: string | null
          orden_dia?: number
          recorrido?: string | null
          slug?: string
          tipo?: string
          verificado_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "procesiones_cofradia_id_fkey"
            columns: ["cofradia_id"]
            isOneToOne: false
            referencedRelation: "cofradias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "procesiones_cofradia_id_fkey"
            columns: ["cofradia_id"]
            isOneToOne: false
            referencedRelation: "v_calendario_procesiones"
            referencedColumns: ["cofradia_id"]
          },
          {
            foreignKeyName: "procesiones_dia_id_fkey"
            columns: ["dia_id"]
            isOneToOne: false
            referencedRelation: "dias_semana_santa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "procesiones_dia_id_fkey"
            columns: ["dia_id"]
            isOneToOne: false
            referencedRelation: "v_calendario_procesiones"
            referencedColumns: ["dia_id"]
          },
        ]
      }
      puntos_interes: {
        Row: {
          descripcion_breve: string | null
          direccion: string | null
          hora_aproximada: string | null
          id: number
          nombre: string
          orden: number
          procesion_id: number
          tipo: string
        }
        Insert: {
          descripcion_breve?: string | null
          direccion?: string | null
          hora_aproximada?: string | null
          id?: number
          nombre: string
          orden?: number
          procesion_id: number
          tipo: string
        }
        Update: {
          descripcion_breve?: string | null
          direccion?: string | null
          hora_aproximada?: string | null
          id?: number
          nombre?: string
          orden?: number
          procesion_id?: number
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "puntos_recorrido_procesion_id_fkey"
            columns: ["procesion_id"]
            isOneToOne: false
            referencedRelation: "procesiones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "puntos_recorrido_procesion_id_fkey"
            columns: ["procesion_id"]
            isOneToOne: false
            referencedRelation: "v_calendario_procesiones"
            referencedColumns: ["id"]
          },
        ]
      }
      sedes_canonicas: {
        Row: {
          descripcion_breve: string | null
          direccion: string
          horarios_url: string | null
          id: number
          imagen_url: string | null
          nombre: string
          nota_uso_actual: string | null
          slug: string
          uso_actual: string
        }
        Insert: {
          descripcion_breve?: string | null
          direccion: string
          horarios_url?: string | null
          id?: number
          imagen_url?: string | null
          nombre: string
          nota_uso_actual?: string | null
          slug: string
          uso_actual?: string
        }
        Update: {
          descripcion_breve?: string | null
          direccion?: string
          horarios_url?: string | null
          id?: number
          imagen_url?: string | null
          nombre?: string
          nota_uso_actual?: string | null
          slug?: string
          uso_actual?: string
        }
        Relationships: []
      }
      titulares: {
        Row: {
          advocacion: string | null
          anio_realizacion: number | null
          autor: string | null
          cofradia_id: number
          descripcion_breve: string | null
          id: number
          imagen_url: string | null
          nombre: string
          orden: number
          siglo_realizacion: string | null
          tipo: string
          tipo_paso: string | null
        }
        Insert: {
          advocacion?: string | null
          anio_realizacion?: number | null
          autor?: string | null
          cofradia_id: number
          descripcion_breve?: string | null
          id?: number
          imagen_url?: string | null
          nombre: string
          orden: number
          siglo_realizacion?: string | null
          tipo: string
          tipo_paso?: string | null
        }
        Update: {
          advocacion?: string | null
          anio_realizacion?: number | null
          autor?: string | null
          cofradia_id?: number
          descripcion_breve?: string | null
          id?: number
          imagen_url?: string | null
          nombre?: string
          orden?: number
          siglo_realizacion?: string | null
          tipo?: string
          tipo_paso?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "titulares_cofradia_id_fkey"
            columns: ["cofradia_id"]
            isOneToOne: false
            referencedRelation: "cofradias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "titulares_cofradia_id_fkey"
            columns: ["cofradia_id"]
            isOneToOne: false
            referencedRelation: "v_calendario_procesiones"
            referencedColumns: ["cofradia_id"]
          },
        ]
      }
    }
    Views: {
      v_calendario_procesiones: {
        Row: {
          cofradia_id: number | null
          cofradia_nombre: string | null
          cofradia_slug: string | null
          desplazamiento_resurreccion: number | null
          dia_id: number | null
          dia_nombre: string | null
          dia_orden: number | null
          escudo_url: string | null
          fuente_url: string | null
          hora_entrada: string | null
          hora_salida: string | null
          id: number | null
          lugar_entrada: string | null
          lugar_salida: string | null
          nombre: string | null
          observaciones: string | null
          orden_dia: number | null
          recorrido: string | null
          tipo: string | null
          verificado_en: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
