import type { CSSProperties } from "react";
import { addDays, format, startOfMonth, startOfWeek } from "date-fns";
import type { CalendarEvent, CalendarSourceStatus } from "@/types";
import { wallClockDate } from "./datetime";

/** Weekday labels (pt), Monday first. */
export const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

/** Local date key (YYYY-MM-DD). */
export function dayKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

/** The 42 days (6 weeks, Monday first) covering the month of `view`. */
export function buildMonthGrid(view: Date): Date[] {
  const gridStart = startOfWeek(startOfMonth(view), { weekStartsOn: 1 });
  return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
}

/** Group events by their start day. */
export function groupEventsByDay(
  events: CalendarEvent[],
): Map<string, CalendarEvent[]> {
  const map = new Map<string, CalendarEvent[]>();
  for (const ev of events) {
    const key = dayKey(wallClockDate(ev.start));
    const list = map.get(key);
    if (list) list.push(ev);
    else map.set(key, [ev]);
  }
  return map;
}

/** Human time label: "Todo o dia" or "HH:mm – HH:mm". */
export function eventTimeLabel(ev: CalendarEvent): string {
  if (ev.allDay) return "Todo o dia";
  return `${format(wallClockDate(ev.start), "HH:mm")} – ${format(wallClockDate(ev.end), "HH:mm")}`;
}

/** Inline pill style from the event's resolved color and importance. */
export function eventPillStyle(ev: CalendarEvent): CSSProperties {
  return {
    color: "#e6edfb",
    borderLeftColor: ev.colorHex,
    backgroundColor: `${ev.colorHex}1f`, // ~12% alpha
    ...(ev.important
      ? { boxShadow: `0 0 10px ${ev.colorHex}80`, borderLeftWidth: 3 }
      : null),
  };
}

export interface SyncStatus {
  text: string;
  textClass: string;
  dotClass: string;
}

/** Sync-indicator state derived from the hook's loading/error/sources. */
export function syncStatus(
  loading: boolean,
  error: string | null,
  sources: CalendarSourceStatus[],
): SyncStatus {
  if (error || sources.some((s) => !s.ok)) {
    return {
      text: "erro de sincronização",
      textClass: "text-red-400",
      dotClass: "bg-red-400",
    };
  }
  if (loading) {
    return {
      text: "a sincronizar…",
      textClass: "text-cyan-400",
      dotClass: "bg-cyan-400 animate-pulse",
    };
  }
  return {
    text: "sincronizado",
    textClass: "text-emerald-400",
    dotClass: "bg-emerald-400",
  };
}
