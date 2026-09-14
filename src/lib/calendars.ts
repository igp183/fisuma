// Calendars the site reads from. Class timetables (1º/2º/3º ano) come live from
// the Universidade da Madeira public schedule API, keyed by course + year. The
// FISUMa calendar stays a public Google Calendar the association edits by hand.
// Config comes from env vars (see .env.example) so it's changeable without code.

export type CalendarColorKey = "amber" | "cyan" | "violet" | "blue";

/** Where a calendar's events come from. */
export type CalendarSourceType = "uma" | "google";

export interface CalendarMeta {
  /** Stable key used in query params and UI toggles. */
  key: string;
  label: string;
  /** Academic year (1-3) for class calendars; undefined for FISUMa events. */
  ano?: number;
  color: CalendarColorKey;
  /** Backing data source. */
  sourceType: CalendarSourceType;
  /** Google source only: env var holding the public calendar ID. */
  envVar?: string;
}

/** A calendar's metadata plus the values resolved from the environment. */
export interface CalendarSource extends CalendarMeta {
  /** Google source: resolved public calendar ID (empty ⇒ skipped). */
  id?: string;
  /** UMA source: resolved course id from UMA_CURSO_ID. */
  cursoid?: number;
}

/** UMA course id for the Physics degree (Licenciatura em Física). */
const DEFAULT_UMA_CURSO_ID = 23360;

export const CALENDARS: CalendarMeta[] = [
  { key: "ano1", label: "1º Ano", ano: 1, color: "amber", sourceType: "uma" },
  { key: "ano2", label: "2º Ano", ano: 2, color: "cyan", sourceType: "uma" },
  { key: "ano3", label: "3º Ano", ano: 3, color: "violet", sourceType: "uma" },
  { key: "fisuma", label: "FISUMa", color: "blue", sourceType: "google", envVar: "GOOGLE_CALENDAR_ID_FISUMA" },
];

/**
 * Resolve each calendar against the environment. Server-side only.
 * UMA calendars (class timetables) are always kept — 3º ano is included even if
 * upstream returns no classes yet. Google calendars are skipped when their ID
 * env var is empty.
 */
export function configuredCalendars(): CalendarSource[] {
  const cursoid = Number(process.env.UMA_CURSO_ID) || DEFAULT_UMA_CURSO_ID;
  return CALENDARS.map((c): CalendarSource => {
    if (c.sourceType === "uma") return { ...c, cursoid };
    return { ...c, id: (process.env[c.envVar ?? ""] ?? "").trim() };
  }).filter((c) => c.sourceType === "uma" || c.id !== "");
}

// Tailwind class fragments per calendar color, used for the legend dots.
// Written as full literal strings so Tailwind's content scanner keeps them.
export const CALENDAR_COLORS: Record<CalendarColorKey, { dot: string }> = {
  amber: { dot: "bg-amber-400" },
  cyan: { dot: "bg-cyan-400" },
  violet: { dot: "bg-violet-400" },
  blue: { dot: "bg-blue-400" },
};

/** Tailwind class for a calendar's legend dot. */
export const colorDotClass = (color: string): string =>
  (CALENDAR_COLORS[color as CalendarColorKey] ?? CALENDAR_COLORS.blue).dot;

/** Color for exams/assessments pulled from UMA — matches the red "important"
 * language used for Google's Tomato exams, so both read the same on the grid. */
export const EXAM_COLOR_HEX = "#D50000";

// Fallback hex per calendar color (used when an event has no explicit color).
export const CALENDAR_COLOR_HEX: Record<CalendarColorKey, string> = {
  amber: "#F59E0B",
  cyan: "#22D3EE",
  violet: "#8B5CF6",
  blue: "#3B82F6",
};

// Google Calendar's fixed event palette (colorId to hex), so an event's color
// chosen in the Google UI carries through to the site.
// https://developers.google.com/calendar/api/v3/reference/colors
export const GOOGLE_EVENT_COLORS: Record<string, string> = {
  "1": "#7986CB", // Lavender
  "2": "#33B679", // Sage
  "3": "#8E24AA", // Grape
  "4": "#E67C73", // Flamingo
  "5": "#F6BF26", // Banana
  "6": "#F4511E", // Tangerine
  "7": "#039BE5", // Peacock
  "8": "#616161", // Graphite
  "9": "#3F51B5", // Blueberry
  "10": "#0B8043", // Basil
  "11": "#D50000", // Tomato
};

/** colorIds treated as important (exams, deliveries), rendered with a glow. */
const IMPORTANT_COLOR_IDS = new Set(["11"]); // Tomato / red

/** Resolve an event's display hex: its own Google color, else the calendar's. */
export function resolveEventColor(
  colorId: string | undefined,
  calendarColor: CalendarColorKey,
): string {
  if (colorId && GOOGLE_EVENT_COLORS[colorId]) return GOOGLE_EVENT_COLORS[colorId];
  return CALENDAR_COLOR_HEX[calendarColor];
}

export function isImportantColor(colorId: string | undefined): boolean {
  return colorId !== undefined && IMPORTANT_COLOR_IDS.has(colorId);
}
