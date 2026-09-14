// Shared domain types for FISUMa.

/**
 * A calendar event, tagged with its source calendar. Class timetables come
 * from the UMA schedule API and FISUMa events from Google Calendar, both
 * normalized to this shape. `start`/`end` are ISO strings (date-only when
 * `allDay`; UMA events are wall-clock, i.e. no timezone offset).
 */
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  allDay: boolean;
  location?: string;
  /** UMA class-type code, e.g. "T", "TP", "PL5". */
  tipo?: string;
  /** Short room code, e.g. "02.9" — fits where the full name doesn't. */
  sala?: string;
  /** Full room name, e.g. "CITMA - 02 Sala 9". */
  salaDesc?: string;
  /** Floor the room is on (UMA rooms only). */
  piso?: number;
  /** Professor name(s) (UMA classes only). */
  docentes?: string[];
  /** Class group(s), e.g. ["A"] (UMA classes only). */
  turmas?: string[];
  /** Source calendar key, e.g. "ano2" or "fisuma". */
  source: string;
  /** Display color: the event's own Google color, else the calendar's. */
  colorHex: string;
  /** Flagged important (e.g. red exams), rendered with emphasis. */
  important: boolean;
  /** Academic year of the source calendar, if any. */
  ano?: number;
}

/** Per-source load status, for the legend/toggles and error reporting. */
export interface CalendarSourceStatus {
  key: string;
  label: string;
  color: string;
  ano?: number;
  ok: boolean;
  error?: string;
}

/** Response shape returned by GET /api/calendar. */
export interface CalendarResponse {
  events: CalendarEvent[];
  sources: CalendarSourceStatus[];
}

/** A private reminder the user adds to their weekly schedule (stored locally). */
export interface PersonalReminder {
  id: string;
  /** Day of the reminder (YYYY-MM-DD). */
  date: string;
  /** Start/end as decimal hours (e.g. 14.5 = 14:30). */
  start: number;
  end: number;
  title: string;
}
