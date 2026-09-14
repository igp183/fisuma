import type { CSSProperties } from "react";
import { addDays, parseISO } from "date-fns";
import type { CalendarEvent, PersonalReminder } from "@/types";
import { reminderToEvent } from "./calendar-utils";
import { wallClockDate } from "./datetime";

// Weekly grid geometry.
export const WEEKDAYS_FULL = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];
export const HOUR_START = 8;
export const HOUR_END = 21;
export const PX_PER_HOUR = 80;

/** Weekday columns always shown in the weekly view (Mon–Fri). */
export const MIN_WEEK_DAYS = 5;

/**
 * How many day columns the weekly grid should render: Mon–Fri by default,
 * extended to include a Saturday/Sunday only when an event actually lands
 * there. Keeps empty weekends from wasting ~2/7 of the width while never
 * hiding a real class or exam.
 */
export function visibleDayCount(blocks: { dayIndex: number }[]): number {
  return blocks.reduce((max, b) => Math.max(max, b.dayIndex + 1), MIN_WEEK_DAYS);
}

/**
 * Max height for the Semanal/Mensal grid card. Bounds the card to the
 * viewport (minus the page chrome above it) so the grid scrolls internally
 * instead of the whole page. The header and tabs stay in place. 360px is a
 * floor so short viewports still show a usable slice of the grid.
 */
export const CARD_MAX_HEIGHT = "max(360px, calc(100vh - 300px))";

/** Hour rows rendered in the grid (labels). */
export const HOURS = Array.from(
  { length: HOUR_END - HOUR_START },
  (_, i) => HOUR_START + i,
);

const MONTHS_ABBR = ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."];

/** Monday (00:00) of the week containing `d`. */
export function mondayOf(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay(); // 0 = Sunday
  date.setDate(date.getDate() - day + (day === 0 ? -6 : 1));
  date.setHours(0, 0, 0, 0);
  return date;
}

/** ISO window covering the Monday-Sunday week of `weekStart`. */
export function weekWindow(weekStart: Date): { timeMin: string; timeMax: string } {
  const start = mondayOf(weekStart);
  return { timeMin: start.toISOString(), timeMax: addDays(start, 7).toISOString() };
}

/** Label like "17 ago. - 23 ago. 2026". */
export function weekLabel(weekStart: Date): string {
  const start = mondayOf(weekStart);
  const end = addDays(start, 6);
  return `${start.getDate()} ${MONTHS_ABBR[start.getMonth()]} - ${end.getDate()} ${MONTHS_ABBR[end.getMonth()]} ${end.getFullYear()}`;
}

export function shortDate(d: Date): string {
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS_ABBR[d.getMonth()]}`;
}

/** Monday = 0 ... Sunday = 6. */
export function weekdayIndex(d: Date): number {
  const day = d.getDay();
  return day === 0 ? 6 : day - 1;
}

export function toDecimalHour(d: Date): number {
  return d.getHours() + d.getMinutes() / 60;
}

export function formatHour(h: number): string {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function timeStrToDecimal(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h + (m || 0) / 60;
}

/**
 * Absolute position/size for a block in the week grid.
 * A day column (100/`numDays` %) is split into `lanes` sub-columns so
 * overlapping events sit side-by-side; `lane` is this block's sub-column
 * (0-based). `numDays` is how many day columns the grid currently shows
 * (5 for a weekday-only week, up to 7 when weekend events are present).
 * Start/end are clamped to the visible [HOUR_START, HOUR_END] range.
 */
export function blockStyle(
  dayIndex: number,
  start: number,
  end: number,
  lane = 0,
  lanes = 1,
  numDays = 7,
): CSSProperties {
  const dayWidth = 100 / numDays;
  const laneWidth = dayWidth / lanes;
  const gap = lanes > 1 ? 2 : 4;
  const top = Math.max(start, HOUR_START);
  const bottom = Math.min(end, HOUR_END);
  return {
    left: `calc(${dayIndex * dayWidth + lane * laneWidth}% + ${gap}px)`,
    width: `calc(${laneWidth}% - ${gap * 2}px)`,
    top: `${(top - HOUR_START) * PX_PER_HOUR}px`,
    height: `${Math.max(bottom - top, 0) * PX_PER_HOUR}px`,
  };
}

/** A timed item placed on the week grid. */
export interface WeekBlock {
  id: string;
  dayIndex: number;
  start: number;
  end: number;
  title: string;
  tipo?: string;
  sala?: string;
  colorHex: string;
  ano?: number;
  important: boolean;
  personal: boolean;
  /** The underlying event, for the details modal. */
  event: CalendarEvent;
}

/** Class/event instances (timed only) as positioned blocks. */
export function eventsToBlocks(events: CalendarEvent[]): WeekBlock[] {
  return events
    .filter((e) => !e.allDay)
    .map((e) => {
      const start = wallClockDate(e.start);
      return {
        id: e.id,
        dayIndex: weekdayIndex(start),
        start: toDecimalHour(start),
        end: toDecimalHour(wallClockDate(e.end)),
        title: e.title,
        tipo: e.tipo,
        // Short room code on the block; the full name lives in the modal.
        sala: e.sala ?? e.location,
        colorHex: e.colorHex,
        ano: e.ano,
        important: e.important,
        personal: false,
        event: e,
      };
    });
}

/** Personal reminders falling within the given week, as positioned blocks. */
export function remindersToBlocks(
  reminders: PersonalReminder[],
  weekStart: Date,
): WeekBlock[] {
  const start = mondayOf(weekStart);
  const end = addDays(start, 7);
  return reminders
    .filter((r) => {
      const d = parseISO(r.date);
      return d >= start && d < end;
    })
    .map((r) => ({
      id: r.id,
      dayIndex: weekdayIndex(parseISO(r.date)),
      start: r.start,
      end: r.end,
      title: r.title,
      tipo: "Pessoal",
      colorHex: "#A855F7", // purple
      important: false,
      personal: true,
      event: reminderToEvent(r),
    }));
}

/** A block with its resolved side-by-side column within an overlap cluster. */
export interface PlacedBlock extends WeekBlock {
  lane: number;
  lanes: number;
}

/**
 * Assign side-by-side columns to overlapping blocks, per day.
 * Within a day, events are grouped into clusters of mutually-overlapping items;
 * each cluster is packed greedily into the minimum number of columns (its max
 * concurrency), so nothing is drawn on top of anything else.
 */
export function layoutWeek(blocks: WeekBlock[]): PlacedBlock[] {
  const visible = blocks.filter(
    (b) => b.end > HOUR_START && b.start < HOUR_END && b.end > b.start,
  );
  const byDay = new Map<number, WeekBlock[]>();
  for (const b of visible) {
    const arr = byDay.get(b.dayIndex);
    if (arr) arr.push(b);
    else byDay.set(b.dayIndex, [b]);
  }

  const placed: PlacedBlock[] = [];
  for (const dayBlocks of byDay.values()) {
    const sorted = [...dayBlocks].sort((a, b) => a.start - b.start || a.end - b.end);
    let cluster: WeekBlock[] = [];
    let clusterEnd = -Infinity;

    const flush = () => {
      const columnEnds: number[] = []; // end time of the last event in each column
      const lane = new Map<string, number>();
      for (const ev of cluster) {
        let col = columnEnds.findIndex((end) => end <= ev.start);
        if (col === -1) {
          col = columnEnds.length;
          columnEnds.push(ev.end);
        } else {
          columnEnds[col] = ev.end;
        }
        lane.set(ev.id, col);
      }
      const lanes = columnEnds.length;
      for (const ev of cluster) {
        placed.push({ ...ev, lane: lane.get(ev.id) ?? 0, lanes });
      }
      cluster = [];
    };

    for (const ev of sorted) {
      if (cluster.length > 0 && ev.start >= clusterEnd) flush();
      cluster.push(ev);
      clusterEnd = Math.max(clusterEnd, ev.end);
    }
    flush();
  }
  return placed;
}