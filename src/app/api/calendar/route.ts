import { NextResponse } from "next/server";
import { addDays } from "date-fns";
import type {
  CalendarEvent,
  CalendarResponse,
  CalendarSourceStatus,
} from "@/types";
import {
  configuredCalendars,
  resolveEventColor,
  isImportantColor,
  CALENDAR_COLOR_HEX,
  EXAM_COLOR_HEX,
  type CalendarSource,
} from "@/lib/calendars";
import { mondayOf } from "@/lib/schedule-utils";

// Read-only proxy that merges the site's calendars into one tagged event feed.
// Class timetables (ano1/2/3) come from the Universidade da Madeira public
// schedule API; the FISUMa calendar comes from a public Google Calendar (its
// API key stays server-side). Sources are fetched in parallel, cached and
// normalized to the shared CalendarEvent shape so the client is source-agnostic.
// Query: ?calendars=ano2,fisuma (default: all)  ?timeMin=ISO  ?timeMax=ISO

const REVALIDATE_SECONDS = 300; // 5 min
const MAX_RESULTS = 2500;

// ---------------------------------------------------------------------------
// Google Calendar (FISUMa association events)
// ---------------------------------------------------------------------------

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

function normalizeGoogle(item: GoogleEvent, source: CalendarSource): CalendarEvent {
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

async function fetchGoogleCalendar(
  source: CalendarSource,
  apiKey: string,
  timeMin: string,
  timeMax: string,
): Promise<CalendarEvent[]> {
  const url =
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(source.id ?? "")}/events` +
    `?key=${encodeURIComponent(apiKey)}` +
    `&timeMin=${encodeURIComponent(timeMin)}` +
    `&timeMax=${encodeURIComponent(timeMax)}` +
    `&singleEvents=true&orderBy=startTime&maxResults=${MAX_RESULTS}`;

  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  const data = (await res.json()) as GoogleEventsResponse;
  if (!res.ok) throw new Error(data.error?.message ?? `HTTP ${res.status}`);
  return (data.items ?? []).map((item) => normalizeGoogle(item, source));
}

// ---------------------------------------------------------------------------
// Universidade da Madeira schedule API (class timetables + exams)
// ---------------------------------------------------------------------------

const UMA_API = "https://www.uma.pt/api";
const UMA_LANG = "pt";

/**
 * One class/exam instance from the UMA API. The feed is a weekly recurrence
 * pattern: each item carries a day-of-week + start/end time rather than an
 * absolute date, so it must be placed within the queried week.
 */
interface UmaEvent {
  id: number;
  /** 1=Sun, 2=Mon … 6=Fri, 7=Sat. */
  idDiaSemana: number;
  horaInicio: string; // "09:30"
  horaFim: string; // "11:00"
  cadeira: string; // subject name
  sala?: string; // room code
  sala_desc?: string; // full room name
  piso?: number; // floor
  docente?: string[]; // professor(s)
  turma?: string[]; // class group(s), e.g. ["A"]
  tipo?: string; // T | TP | PL | ...
  Tipo?: string;
  ano?: number;
}

/** yyyy-MM-dd for a local date (matches the format the UMA API expects). */
function ymd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

/** Monday-anchored weeks (as {monday, di, df}) covering [timeMin, timeMax). */
function weeksInRange(timeMin: string, timeMax: string): { monday: Date; di: string; df: string }[] {
  const end = new Date(timeMax);
  const weeks: { monday: Date; di: string; df: string }[] = [];
  let monday = mondayOf(new Date(timeMin));
  // Guard against pathological ranges (cap at ~1 year of weeks).
  for (let i = 0; monday < end && i < 60; i++) {
    weeks.push({ monday, di: ymd(monday), df: ymd(addDays(monday, 6)) });
    monday = addDays(monday, 7);
  }
  return weeks;
}

/** Map a UMA weekly item to a concrete, dated CalendarEvent. */
function normalizeUma(
  item: UmaEvent,
  monday: Date,
  source: CalendarSource,
  isExam: boolean,
): CalendarEvent {
  const offset = (item.idDiaSemana + 5) % 7; // Mon=0 … Sun=6
  const dateStr = ymd(addDays(monday, offset));
  // Wall-clock ISO (no offset) — the client reads times exactly as written.
  const start = `${dateStr}T${item.horaInicio}:00`;
  const end = `${dateStr}T${item.horaFim}:00`;
  const tipo = (item.tipo ?? item.Tipo ?? "").trim();
  const docentes = (item.docente ?? []).filter(Boolean);
  const turmas = (item.turma ?? []).filter(Boolean);
  return {
    id: `${source.key}:${isExam ? "av" : "aula"}:${item.id}:${dateStr}:${item.horaInicio}`,
    title: isExam ? `Avaliação: ${item.cadeira}` : item.cadeira,
    description: "",
    start,
    end,
    allDay: false,
    location: item.sala_desc || item.sala || undefined,
    tipo: tipo || undefined,
    sala: item.sala || undefined,
    salaDesc: item.sala_desc || undefined,
    piso: item.piso,
    docentes: docentes.length ? docentes : undefined,
    turmas: turmas.length ? turmas : undefined,
    source: source.key,
    colorHex: isExam ? EXAM_COLOR_HEX : CALENDAR_COLOR_HEX[source.color],
    important: isExam,
    ano: source.ano,
  };
}

/** Fetch one week of UMA events (classes when isExam=false, else assessments). */
async function fetchUmaWeek(
  source: CalendarSource,
  week: { monday: Date; di: string; df: string },
  isExam: boolean,
): Promise<CalendarEvent[]> {
  const url =
    `${UMA_API}/calendario/events?di=${week.di}&df=${week.df}` +
    `&cursoid=${source.cursoid}&ano=${source.ano}` +
    (isExam ? "&isavaliacao=true" : "") +
    `&lang=${UMA_LANG}`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  // The UMA API answers 200/201 on success.
  if (!res.ok) throw new Error(`UMA HTTP ${res.status}`);
  const items = (await res.json()) as UmaEvent[];
  return items.map((item) => normalizeUma(item, week.monday, source, isExam));
}

async function fetchUmaCalendar(
  source: CalendarSource,
  timeMin: string,
  timeMax: string,
): Promise<CalendarEvent[]> {
  // The API returns a per-week recurrence with no absolute dates, so we fan out
  // over each week in the window and stamp events with that week's dates. Both
  // classes and exams (isavaliacao=true) use the same weekly placement.
  const weeks = weeksInRange(timeMin, timeMax);
  const batches = await Promise.all(
    weeks.flatMap((week) => [
      fetchUmaWeek(source, week, false),
      fetchUmaWeek(source, week, true),
    ]),
  );
  return batches.flat();
}

// ---------------------------------------------------------------------------
// Dispatch
// ---------------------------------------------------------------------------

/** Fetch one calendar from its backing source, wrapping errors per-source. */
async function fetchSource(
  source: CalendarSource,
  apiKey: string | undefined,
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
  try {
    let events: CalendarEvent[];
    if (source.sourceType === "uma") {
      events = await fetchUmaCalendar(source, timeMin, timeMax);
    } else {
      if (!apiKey) throw new Error("Falta GOOGLE_CALENDAR_API_KEY na configuração.");
      events = await fetchGoogleCalendar(source, apiKey, timeMin, timeMax);
    }
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
    sources.map((s) => fetchSource(s, apiKey, timeMin, timeMax)),
  );

  const body: CalendarResponse = {
    events: results
      .flatMap((r) => r.events)
      .sort((a, b) => a.start.localeCompare(b.start)),
    sources: results.map((r) => r.status),
  };
  return NextResponse.json(body);
}
