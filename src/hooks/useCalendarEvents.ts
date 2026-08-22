"use client";

import { useEffect, useState } from "react";
import type {
  CalendarEvent,
  CalendarResponse,
  CalendarSourceStatus,
} from "@/types";
import { weekWindow } from "@/lib/schedule-utils";

interface CalendarEventsResult {
  events: CalendarEvent[];
  sources: CalendarSourceStatus[];
  loading: boolean;
  error: string | null;
}

/**
 * Low-level fetch from /api/calendar for a time window.
 * `calendars`: undefined = all configured; [] = none; otherwise a subset.
 */
export function useCalendarEvents(
  timeMin: string,
  timeMax: string,
  calendars?: string[],
): CalendarEventsResult {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [sources, setSources] = useState<CalendarSourceStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scoped = calendars !== undefined;
  const calParam = calendars?.join(",") ?? "";

  useEffect(() => {
    // Explicitly-empty selection means "nothing to show", skip the request.
    if (scoped && calParam === "") {
      setEvents([]);
      setSources([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ timeMin, timeMax });
        if (calParam) params.set("calendars", calParam);
        const res = await fetch(`/api/calendar?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = (await res.json()) as CalendarResponse & { error?: string };
        if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
        setEvents(data.events);
        setSources(data.sources);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setEvents([]);
        setSources([]);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [timeMin, timeMax, calParam, scoped]);

  return { events, sources, loading, error };
}

/** Events for the Monday-Sunday week containing `weekStart`. */
export function useWeekEvents(
  weekStart: Date,
  calendars?: string[],
): CalendarEventsResult {
  const { timeMin, timeMax } = weekWindow(weekStart);
  return useCalendarEvents(timeMin, timeMax, calendars);
}
