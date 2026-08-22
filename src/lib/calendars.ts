// Public Google Calendars the site reads from. IDs come from env vars (see
// .env.example) so they're configurable without code changes; metadata lives
// here. An empty env var means the calendar is skipped.

export type CalendarColorKey = "amber" | "cyan" | "violet" | "blue";

export interface CalendarMeta {
  /** Stable key used in query params and UI toggles. */
  key: string;
  label: string;
  /** Academic year (1-3) for class calendars; undefined for FISUMa events. */
  ano?: number;
  color: CalendarColorKey;
  /** Env var holding this calendar's public ID. */
  envVar: string;
}

/** A calendar's metadata plus the ID resolved from the environment. */
export interface CalendarSource extends CalendarMeta {
  id: string;
}

export const CALENDARS: CalendarMeta[] = [
  { key: "ano1", label: "1º Ano", ano: 1, color: "amber", envVar: "GOOGLE_CALENDAR_ID_ANO1" },
  { key: "ano2", label: "2º Ano", ano: 2, color: "cyan", envVar: "GOOGLE_CALENDAR_ID_ANO2" },
  { key: "ano3", label: "3º Ano", ano: 3, color: "violet", envVar: "GOOGLE_CALENDAR_ID_ANO3" },
  { key: "fisuma", label: "FISUMa", color: "blue", envVar: "GOOGLE_CALENDAR_ID_FISUMA" },
];

/** Calendars whose ID is set in the environment. Server-side only. */
export function configuredCalendars(): CalendarSource[] {
  return CALENDARS.map((c) => ({
    ...c,
    id: (process.env[c.envVar] ?? "").trim(),
  })).filter((c) => c.id !== "");
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
