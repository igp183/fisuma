"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { addDays, parseISO } from "date-fns";
import {
  CARD_MAX_HEIGHT,
  HOURS,
  HOUR_START,
  PX_PER_HOUR,
  WEEKDAYS_FULL,
  blockStyle,
  eventsToBlocks,
  formatHour,
  layoutWeek,
  mondayOf,
  parseClassTitle,
  remindersToBlocks,
  shortDate,
  toDecimalHour,
} from "@/lib/schedule-utils";
import { useWeekEvents } from "@/hooks/useCalendarEvents";
import { usePersonalReminders } from "@/hooks/usePersonalReminders";
import { wallClockDate } from "@/lib/datetime";
import ReminderModal from "./ReminderModal";

interface WeeklyScheduleProps {
  weekStart: Date;
  activeCalendars: string[];
}

// Grid geometry. The hour-label gutter matches grid-cols-[52px_1fr]; when
// events overlap, a day column splits into lanes and we widen the grid so no
// lane falls below MIN_LANE_WIDTH (the grid scrolls horizontally instead of
// squeezing events into an unreadable sliver).
const HOUR_GUTTER = 52;
const MIN_LANE_WIDTH = 68;
const BASE_MIN_WIDTH = 760;

export default function WeeklySchedule({ weekStart, activeCalendars }: WeeklyScheduleProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Events for the visible week, from /api/calendar.
  const { events, loading, error } = useWeekEvents(weekStart, activeCalendars);
  const { reminders, add, remove } = usePersonalReminders();

  const blocks = useMemo(
    () =>
      layoutWeek([
        ...eventsToBlocks(events),
        ...remindersToBlocks(reminders, weekStart),
      ]),
    [events, reminders, weekStart],
  );

  // Widen the grid when a day needs multiple lanes, so overlapping events stay
  // legible instead of shrinking. All events remain visible; it scrolls.
  const gridMinWidth = useMemo(() => {
    const maxLanes = blocks.reduce((m, b) => Math.max(m, b.lanes), 1);
    return Math.max(BASE_MIN_WIDTH, HOUR_GUTTER + 7 * maxLanes * MIN_LANE_WIDTH);
  }, [blocks]);

  // On load or when the week changes, scroll to an hour before the day's
  // first event (or before "now", if viewing the current week) instead of
  // always starting at HOUR_START, so the relevant part of the day is
  // visible without scrolling through empty morning hours first.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isCurrentWeek = mondayOf(new Date()).getTime() === mondayOf(weekStart).getTime();
    const candidates = blocks.map((b) => b.start);
    if (isCurrentWeek) candidates.push(toDecimalHour(new Date()));
    const target = candidates.length
      ? Math.max(HOUR_START, Math.min(...candidates) - 1)
      : HOUR_START;
    el.scrollTop = (target - HOUR_START) * PX_PER_HOUR;
  }, [blocks, weekStart]);

  // Sidebar agenda: important events (exams/deliveries) + personal reminders.
  const agenda = useMemo(() => {
    const monday = mondayOf(weekStart);
    const sunday = addDays(monday, 7);
    const exams = events
      .filter((e) => e.important && !e.allDay)
      .map((e) => {
        const d = wallClockDate(e.start);
        return {
          id: e.id,
          date: d,
          start: toDecimalHour(d),
          end: toDecimalHour(wallClockDate(e.end)),
          title: parseClassTitle(e.title).name,
          tipo: "Avaliação",
          personal: false,
        };
      });
    const rems = reminders
      .filter((r) => {
        const d = parseISO(r.date);
        return d >= monday && d < sunday;
      })
      .map((r) => ({
        id: r.id,
        date: parseISO(r.date),
        start: r.start,
        end: r.end,
        title: r.title,
        tipo: "Pessoal",
        personal: true,
      }));
    return [...exams, ...rems].sort(
      (a, b) => a.date.getTime() - b.date.getTime() || a.start - b.start,
    );
  }, [events, reminders, weekStart]);

  return (
    <div className="relative w-full">
      {modalOpen && (
        <ReminderModal
          onSave={(reminder) => {
            add(reminder);
            setModalOpen(false);
          }}
          onClose={() => setModalOpen(false)}
        />
      )}

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* Main week grid: height-capped, scrolls internally so the page
            chrome above it never has to scroll out of view. */}
        <div
          className="xl:col-span-3 bg-white border border-slate-200 rounded-none shadow-xl relative z-0 flex flex-col"
          style={{ maxHeight: CARD_MAX_HEIGHT }}
        >
          {(loading || error) && (
            <div className="flex justify-end px-6 pt-3">
              {loading && (
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#0066CC] animate-pulse">
                  a sincronizar…
                </span>
              )}
              {error && (
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-500">
                  erro: {error}
                </span>
              )}
            </div>
          )}
          <div ref={scrollRef} className="overflow-auto flex-1">
          <div className="relative p-6" style={{ minWidth: gridMinWidth }}>
            
            {/* Day headers */}
            <div className="grid grid-cols-[52px_1fr] border-b border-slate-200 pb-4 mb-2">
              <div />
              <div className="grid grid-cols-7">
                {WEEKDAYS_FULL.map((day, index) => {
                  const date = addDays(weekStart, index);
                  const weekend = index > 4;
                  return (
                    <div key={day} className="text-center flex flex-col gap-1">
                      <span className={`text-2xl font-bold ${weekend ? "text-[#0066CC]" : "text-slate-900"}`}>
                        {date.getDate()}
                      </span>
                      <span className={`font-bold uppercase tracking-wide text-xs ${weekend ? "text-[#63B3ED]" : "text-slate-500"}`}>
                        {day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              {/* Hour rows */}
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="grid grid-cols-[52px_1fr] border-b border-slate-100"
                  style={{ height: `${PX_PER_HOUR}px` }}
                >
                  <div className="pr-2 relative">
                    <span className="absolute -top-2.5 right-2 text-[11px] font-mono text-slate-400 font-bold">
                      {hour}:00
                    </span>
                  </div>
                  <div className="grid grid-cols-7 relative border-l border-slate-100">
                    <div className="absolute top-1/2 w-full border-t border-slate-100 border-dashed" />
                    {WEEKDAYS_FULL.map((_, i) => (
                      <div
                        key={i}
                        className={`border-r border-slate-100 ${i > 4 ? "bg-slate-50/50" : ""}`}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Positioned event and reminder blocks */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="grid grid-cols-[52px_1fr] w-full h-full">
                  <div />
                  <div className="relative w-full h-full">
                    {blocks.map((b) => (
                      <div
                        key={b.id}
                        style={{
                          ...blockStyle(b.dayIndex, b.start, b.end, b.lane, b.lanes),
                          borderColor: b.colorHex,
                          backgroundColor: `${b.colorHex}22`,
                          borderStyle: b.personal ? "dashed" : "solid",
                        }}
                        className="absolute rounded-none border-2 p-2 flex flex-col overflow-hidden text-slate-900 pointer-events-auto z-10 transition-transform hover:z-50 hover:scale-[1.02] group shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-1 gap-1">
                          <span className="text-[9px] font-black uppercase tracking-wider bg-white/70 text-slate-800 px-1.5 py-0.5 rounded-none shadow-sm">
                            {b.personal ? "Pessoal" : b.ano ? `${b.ano}º` : b.tipo ?? ""}
                          </span>
                          <span className="text-[10px] font-bold opacity-80">{formatHour(b.start)}</span>
                        </div>
                        <div className="font-bold text-xs leading-tight">{b.title}</div>
                        {(b.sala || (b.tipo && !b.personal)) && (
                          <div className="text-[10px] font-medium opacity-70 mt-auto truncate">
                            {b.tipo && !b.personal ? `[${b.tipo}] ` : ""}
                            {b.sala ?? ""}
                          </div>
                        )}
                        {b.personal && (
                          <button
                            onClick={() => remove(b.id)}
                            aria-label="Apagar lembrete"
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-red-500/90 hover:bg-red-600 text-white text-[10px] w-5 h-5 rounded-none flex items-center justify-center transition-opacity"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {!loading && blocks.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm font-mono pointer-events-none">
                  {activeCalendars.length === 0 ? "Escolhe um calendário nos filtros acima" : "Sem aulas esta semana"}
                </div>
              )}
            </div>
          </div>
          </div>
        </div>

        {/* Sidebar: agenda & reminders */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-none shadow-xl p-6 h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
              Agenda &amp; Avaliações
            </h3>

            <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2 flex-grow">
              {agenda.length === 0 ? (
                <div className="flex-grow flex items-center justify-center">
                   <p className="text-sm font-mono text-slate-400 text-center">
                     Nada esta semana.
                   </p>
                </div>
              ) : (
                agenda.map((item) => (
                  <div
                    key={item.id}
                    className="group relative flex flex-col p-4 rounded-none bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-700 bg-white border border-slate-200 shadow-sm px-2 py-1 rounded-none">
                          {shortDate(item.date)}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-slate-500">
                          {formatHour(item.start)} - {formatHour(item.end)}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-none border ${
                          item.personal
                            ? "text-purple-600 border-purple-200 bg-purple-50"
                            : "text-red-600 border-red-200 bg-red-50"
                        }`}
                      >
                        {item.tipo}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug pr-4">
                      {item.title}
                    </h4>
                    {item.personal && (
                      <button
                        onClick={() => remove(item.id)}
                        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all text-xs font-bold"
                      >
                        Apagar
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="w-full mt-6 py-3 border-2 border-dashed border-[#63B3ED] bg-blue-50/50 hover:bg-blue-50 text-[#0066CC] rounded-none text-sm font-bold transition-colors shadow-sm"
            >
              + Anotar lembrete
            </button>
            <p className="text-[9px] text-slate-400 text-center mt-3">
              Guardado localmente no teu dispositivo.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}