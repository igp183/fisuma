"use client";

import { addDays, endOfMonth, startOfMonth, subDays } from "date-fns";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";

/**
 * Events for the month around `viewDate`, padded so the leading/trailing days of
 * the 6-week grid are covered. Optionally limited to a subset of calendars.
 */
export function useEvents(viewDate: Date, calendars?: string[]) {
  const timeMin = subDays(startOfMonth(viewDate), 7).toISOString();
  const timeMax = addDays(endOfMonth(viewDate), 7).toISOString();
  return useCalendarEvents(timeMin, timeMax, calendars);
}
