import { NextResponse } from "next/server";
import type {
  CalendarEvent,
  CalendarResponse,
  CalendarSourceStatus,
} from "@/types";
import {
  configuredCalendars,
  resolveEventColor,
  isImportantColor,
  type CalendarSource,
} from "@/lib/calendars";

// Read-only proxy to the configured public Google Calendars. The API key stays
// on the server; calendars are fetched in parallel, cached, merged and tagged.
// Query: ?calendars=ano2,fisuma (default: all)  ?timeMin=ISO  ?timeMax=ISO

const REVALIDATE_SECONDS = 300; // 5 min
const MAX_RESULTS = 2500;

interface GoogleEventTime {
  date?: string; // all-day: YYYY-MM-DD
  dateTime?: string; // timed: RFC3339
}

interface GoogleEvent {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  colorId?: string;
  start?: GoogleEventTime;
  end?: GoogleEventTime;
}

interface GoogleEventsResponse {
  items?: GoogleEvent[];
  error?: { message?: string };
}

function normalize(item: GoogleEvent, source: CalendarSource): CalendarEvent {
  const allDay = Boolean(item.start?.date && !item.start?.dateTime);
  const start = item.start?.dateTime ?? item.start?.date ?? "";
  const end = item.end?.dateTime ?? item.end?.date ?? start;
  return {
    id: `${source.key}:${item.id}`,
    title: item.summary?.trim() || "(sem título)",
    description: item.description ?? "",
    start,
    end,
    allDay,
    location: item.location,
    source: source.key,
    colorHex: resolveEventColor(item.colorId, source.color),
    important: isImportantColor(item.colorId),
    ano: source.ano,
  };
}

async function fetchCalendar(
  source: CalendarSource,
  apiKey: string,
  timeMin: string,
  timeMax: string,
): Promise<{ events: CalendarEvent[]; status: CalendarSourceStatus }> {
  const base: CalendarSourceStatus = {
    key: source.key,
    label: source.label,
    color: source.color,
    ano: source.ano,
    ok: true,
  };

  const url =
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(source.id)}/events` +
    `?key=${encodeURIComponent(apiKey)}` +
    `&timeMin=${encodeURIComponent(timeMin)}` +
    `&timeMax=${encodeURIComponent(timeMax)}` +
    `&singleEvents=true&orderBy=startTime&maxResults=${MAX_RESULTS}`;

  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    const data = (await res.json()) as GoogleEventsResponse;
    if (!res.ok) {
      const error = data.error?.message ?? `HTTP ${res.status}`;
      return { events: [], status: { ...base, ok: false, error } };
    }
    const events = (data.items ?? []).map((item) => normalize(item, source));
    return { events, status: base };
  } catch (err) {
    const error = err instanceof Error ? err.message : "Erro de rede";
    return { events: [], status: { ...base, ok: false, error } };
  }
}

/** Default window: previous month start to two months ahead. */
function defaultWindow(): { timeMin: string; timeMax: string } {
  const now = new Date();
  return {
    timeMin: new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString(),
    timeMax: new Date(now.getFullYear(), now.getMonth() + 2, 0).toISOString(),
  };
}

export async function GET(request: Request) {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Falta GOOGLE_CALENDAR_API_KEY na configuração." },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);

  // Which calendars? Explicit subset via ?calendars=, else all configured.
  const requested = searchParams.get("calendars");
  let sources = configuredCalendars();
  if (requested) {
    const keys = new Set(requested.split(",").map((s) => s.trim()));
    sources = sources.filter((c) => keys.has(c.key));
  }

  const fallback = defaultWindow();
  const timeMin = searchParams.get("timeMin") ?? fallback.timeMin;
  const timeMax = searchParams.get("timeMax") ?? fallback.timeMax;

  const results = await Promise.all(
    sources.map((s) => fetchCalendar(s, apiKey, timeMin, timeMax)),
  );

  const body: CalendarResponse = {
    events: results
      .flatMap((r) => r.events)
      .sort((a, b) => a.start.localeCompare(b.start)),
    sources: results.map((r) => r.status),
  };
  return NextResponse.json(body);
}
