"use client";

import { useMemo, useState } from "react";
import { addMonths, format, isSameMonth, isToday, startOfMonth, subMonths } from "date-fns";
import { pt } from "date-fns/locale";
import { useEvents } from "@/hooks/useEvents";
import { usePersonalReminders } from "@/hooks/usePersonalReminders";
import {
  WEEKDAYS,
  buildMonthGrid,
  dayKey,
  eventPillStyle,
  groupEventsByDay,
  reminderToEvent,
  syncStatus,
} from "@/lib/calendar-utils";
import DayEventsModal from "./DayEventsModal";

const MAX_PILLS_PER_DAY = 3;

interface EventsCalendarProps {
  /** Calendar keys currently visible (shared filter). */
  activeCalendars: string[];
}

/** Monthly view of the Google Calendar events, filtered by the shared calendar filter. */
export default function EventsCalendar({ activeCalendars }: EventsCalendarProps) {
  const [view, setView] = useState<Date>(() => startOfMonth(new Date()));
  const [selected, setSelected] = useState<Date | null>(null);
  const { events, sources, loading, error } = useEvents(view);
  const { reminders, remove } = usePersonalReminders();

  // Google events respect the calendar filter; personal reminders always show.
  const visible = useMemo(() => {
    const merged = [
      ...events.filter((e) => activeCalendars.includes(e.source)),
      ...reminders.map(reminderToEvent),
    ];
    return merged.sort((a, b) => a.start.localeCompare(b.start));
  }, [events, activeCalendars, reminders]);
  const eventsByDay = useMemo(() => groupEventsByDay(visible), [visible]);
  const days = useMemo(() => buildMonthGrid(view), [view]);

  const status = syncStatus(loading, error, sources);
  const selectedEvents = selected ? eventsByDay.get(dayKey(selected)) ?? [] : [];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4">
          <span className="w-2 h-2 rounded-full bg-cyan-400" /> MENSAL
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 capitalize">
          {format(view, "LLLL", { locale: pt })}{" "}
          <span className="text-slate-500 font-normal">{format(view, "yyyy")}</span>
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-slate-300">
          <button
            onClick={() => setView(startOfMonth(new Date()))}
            className="px-4 py-2 border border-white/20 rounded-full text-sm font-bold hover:bg-white/10 transition-colors"
          >
            Hoje
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView((v) => subMonths(v, 1))}
              aria-label="Mês anterior"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => setView((v) => addMonths(v, 1))}
              aria-label="Mês seguinte"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            >
              →
            </button>
          </div>
          <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
            <span className={`w-1.5 h-1.5 rounded-full ${status.dotClass}`} />
            <span className={status.textClass}>{status.text}</span>
          </span>
        </div>
      </div>

      <div className="bg-[#0B1120]/80 border border-white/5 rounded-3xl p-4 md:p-6 backdrop-blur-md shadow-lg">
        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map((wd, i) => (
            <div
              key={wd}
              className={`text-center text-[10px] font-bold uppercase tracking-widest pb-2 ${
                i > 4 ? "text-cyan-600" : "text-slate-500"
              }`}
            >
              {wd}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const key = dayKey(day);
            const dayEvents = eventsByDay.get(key) ?? [];
            const outside = !isSameMonth(day, view);
            const today = isToday(day);
            return (
              <button
                key={key}
                onClick={() => setSelected(day)}
                className={`min-h-[56px] sm:min-h-[76px] md:min-h-[96px] p-1.5 sm:p-2 flex flex-col gap-1 rounded-lg border text-left transition-colors ${
                  outside
                    ? "border-transparent opacity-35 hover:opacity-60"
                    : "border-white/5 hover:bg-white/5"
                } ${today ? "bg-cyan-500/5 border-cyan-500/30" : ""}`}
              >
                <span
                  className={`text-xs font-mono w-6 h-6 flex items-center justify-center ${
                    today
                      ? "bg-cyan-400 text-[#04070d] rounded-full font-bold"
                      : "text-slate-400"
                  }`}
                >
                  {format(day, "d")}
                </span>
                {/* Small screens: colored dots (Google-style). */}
                {dayEvents.length > 0 && (
                  <span className="flex sm:hidden flex-wrap gap-1 mt-auto">
                    {dayEvents.slice(0, 4).map((ev) => (
                      <span
                        key={ev.id}
                        style={{ backgroundColor: ev.colorHex }}
                        className="w-1.5 h-1.5 rounded-full"
                      />
                    ))}
                  </span>
                )}

                {/* Larger screens: text pills. */}
                <span className="hidden sm:flex flex-col gap-0.5 overflow-hidden">
                  {dayEvents.slice(0, MAX_PILLS_PER_DAY).map((ev) => (
                    <span
                      key={ev.id}
                      style={eventPillStyle(ev)}
                      className="text-[10px] leading-tight font-mono border-l-2 px-1.5 py-0.5 rounded-r truncate"
                    >
                      {ev.title}
                    </span>
                  ))}
                  {dayEvents.length > MAX_PILLS_PER_DAY && (
                    <span className="text-[10px] font-mono text-slate-500 px-1.5">
                      +{dayEvents.length - MAX_PILLS_PER_DAY} mais
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <p className="mt-4 text-center text-xs font-mono text-red-400">
          Não foi possível carregar os eventos: {error}
        </p>
      )}

      {selected && (
        <DayEventsModal
          date={selected}
          events={selectedEvents}
          onDeleteReminder={remove}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
