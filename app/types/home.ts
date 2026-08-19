import type { Database } from "~/types/database";

export type HomeCofradia = Pick<
  Database["public"]["Tables"]["cofradias"]["Row"],
  "id" | "nombre" | "slug" | "anio_fundacion" | "escudo_url"
>;

export type HomeCountdownData = {
  nowIso: string;
  targetIso: string;
  targetDateLabel: string;
  targetYear: number;
};

export type CountdownValues = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type SemanaSantaCountdownProps = {
  countdown: HomeCountdownData;
};

export type ExploreCofradiasProps = {
  cofradias: HomeCofradia[];
};