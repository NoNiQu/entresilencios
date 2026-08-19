import type { HomeCountdownData } from "~/types/home";

const MADRID_TIME_ZONE = "Europe/Madrid";
const VIERNES_DOLORES_OFFSET = -9;

type CalendarDate = {
  year: number;
  month: number;
  day: number;
};

function getEasterSunday(year: number): CalendarDate {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);

  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return {
    year,
    month,
    day,
  };
}

function addDays(date: CalendarDate, days: number): CalendarDate {
  const result = new Date(
    Date.UTC(date.year, date.month - 1, date.day + days),
  );

  return {
    year: result.getUTCFullYear(),
    month: result.getUTCMonth() + 1,
    day: result.getUTCDate(),
  };
}

function getMadridYear(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: MADRID_TIME_ZONE,
    year: "numeric",
  });

  return Number(formatter.format(date));
}

function getTimeZoneOffset(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(date);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  const zonedTime = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second),
  );

  return zonedTime - date.getTime();
}

function createMadridDate(date: CalendarDate) {
  const utcGuess = new Date(
    Date.UTC(date.year, date.month - 1, date.day, 0, 0, 0),
  );

  const firstOffset = getTimeZoneOffset(utcGuess, MADRID_TIME_ZONE);

  const firstResult = new Date(utcGuess.getTime() - firstOffset);

  const secondOffset = getTimeZoneOffset(firstResult, MADRID_TIME_ZONE);

  if (firstOffset === secondOffset) {
    return firstResult;
  }

  return new Date(utcGuess.getTime() - secondOffset);
}

function getViernesDolores(year: number) {
  const easterSunday = getEasterSunday(year);

  return addDays(easterSunday, VIERNES_DOLORES_OFFSET);
}

function formatTargetDate(date: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    timeZone: MADRID_TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function getHomeCountdownData(
  now = new Date(),
): HomeCountdownData {
  let targetYear = getMadridYear(now);
  let targetDate = createMadridDate(getViernesDolores(targetYear));

  if (now.getTime() >= targetDate.getTime()) {
    targetYear += 1;
    targetDate = createMadridDate(getViernesDolores(targetYear));
  }

  return {
    nowIso: now.toISOString(),
    targetIso: targetDate.toISOString(),
    targetDateLabel: formatTargetDate(targetDate),
    targetYear,
  };
}