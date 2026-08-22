"use client";

import { useMemo, useState } from "react";
import { addDays, parseISO } from "date-fns";
import {
  HOURS,
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
  weekLabel,
} from "@/lib/schedule-utils";
import { useWeekEvents } from "@/hooks/useCalendarEvents";
import { usePersonalReminders } from "@/hooks/usePersonalReminders";
import { wallClockDate } from "@/lib/datetime";
import ReminderModal from "./ReminderModal";

interface WeeklyScheduleProps {
  /** Calendar keys currently visible (shared filter). */
  activeCalendars: string[];
}

/** Weekly timetable: classes from the shared calendar data, plus private reminders. */
export default function WeeklySchedule({ activeCalendars }: WeeklyScheduleProps) {
  const [weekStart, setWeekStart] = useState<Date>(() => mondayOf(new Date()));
  const [modalOpen, setModalOpen] = useState(false);

  const { events, loading, error } = useWeekEvents(weekStart);
  const { reminders, add, remove } = usePersonalReminders();

  const visibleEvents = useMemo(
    () => events.filter((e) => activeCalendars.includes(e.source)),
    [events, activeCalendars],
  );

  const blocks = useMemo(
    () =>
      layoutWeek([
        ...eventsToBlocks(visibleEvents),
        ...remindersToBlocks(reminders, weekStart),
      ]),
    [visibleEvents, reminders, weekStart],
  );

  // Sidebar agenda: this week's exams (red events) + personal reminders.
  const agenda = useMemo(() => {
    const monday = mondayOf(weekStart);
    const sunday = addDays(monday, 7);
    const exams = visibleEvents
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
  }, [visibleEvents, reminders, weekStart]);

  return (
    <div className="relative">
      {modalOpen && (
        <ReminderModal
          onSave={(reminder) => {
            add(reminder);
            setModalOpen(false);
          }}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* Header: title + week navigation */}
      <section className="w-full max-w-7xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4">
          <span className="w-2 h-2 rounded-full bg-cyan-400" /> HORÁRIO
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
          Horário semanal
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-slate-300">
          <button
            onClick={() => setWeekStart(mondayOf(new Date()))}
            className="px-4 py-2 border border-white/20 rounded-full text-sm font-bold hover:bg-white/10 transition-colors"
          >
            Hoje
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setWeekStart((w) => addDays(w, -7))}
              aria-label="Semana anterior"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => setWeekStart((w) => addDays(w, 7))}
              aria-label="Semana seguinte"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            >
              →
            </button>
          </div>
          <span className="text-xl font-bold text-white">{weekLabel(weekStart)}</span>
          {loading && (
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 animate-pulse">
              a sincronizar…
            </span>
          )}
          {error && (
            <span className="text-[10px] font-mono uppercase tracking-widest text-red-400">
              erro de sincronização
            </span>
          )}
        </div>
      </section>

      <section className="w-full max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left: weekly grid */}
        <div className="xl:col-span-3 bg-[#0B1120]/80 border border-white/5 rounded-3xl p-6 backdrop-blur-md shadow-lg overflow-x-auto relative z-0">
          <div className="min-w-[760px] relative">
            {/* Day headers: fixed-width hour gutter + 7 day columns */}
            <div className="grid grid-cols-[52px_1fr] border-b border-white/10 pb-4 mb-2">
              <div />
              <div className="grid grid-cols-7">
                {WEEKDAYS_FULL.map((day, index) => {
                  const date = addDays(weekStart, index);
                  const weekend = index > 4;
                  return (
                    <div key={day} className="text-center flex flex-col gap-1">
                      <span className={`text-2xl font-bold ${weekend ? "text-cyan-400" : "text-white"}`}>
                        {date.getDate()}
                      </span>
                      <span className={`font-bold uppercase tracking-wide text-xs ${weekend ? "text-cyan-600" : "text-slate-500"}`}>
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
                  className="grid grid-cols-[52px_1fr] border-b border-white/10"
                  style={{ height: `${PX_PER_HOUR}px` }}
                >
                  <div className="pr-2 relative">
                    <span className="absolute -top-2.5 right-2 text-[11px] font-mono text-slate-400 font-bold">
                      {hour}:00
                    </span>
                  </div>
                  <div className="grid grid-cols-7 relative border-l border-white/10">
                    <div className="absolute top-1/2 w-full border-t border-white/5 border-dashed" />
                    {WEEKDAYS_FULL.map((_, i) => (
                      <div
                        key={i}
                        className={`border-r border-white/10 ${i > 4 ? "bg-white/[0.01]" : ""}`}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Positioned blocks (classes + reminders) */}
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
                          boxShadow: b.important ? `0 0 16px ${b.colorHex}80` : undefined,
                        }}
                        className="absolute rounded-md border-2 p-2 flex flex-col overflow-hidden text-white pointer-events-auto z-10 transition-transform hover:z-50 hover:scale-[1.02] group"
                      >
                        <div className="flex justify-between items-start mb-1 gap-1">
                          <span className="text-[9px] font-black uppercase tracking-wider bg-black/30 px-1.5 py-0.5 rounded">
                            {b.personal ? "Pessoal" : b.ano ? `${b.ano}º` : b.tipo ?? ""}
                          </span>
                          <span className="text-[10px] font-bold opacity-90">{formatHour(b.start)}</span>
                        </div>
                        <div className="font-bold text-xs leading-tight">{b.title}</div>
                        {(b.sala || (b.tipo && !b.personal)) && (
                          <div className="text-[10px] font-medium opacity-80 mt-auto truncate">
                            {b.tipo && !b.personal ? `[${b.tipo}] ` : ""}
                            {b.sala ?? ""}
                          </div>
                        )}
                        {b.personal && (
                          <button
                            onClick={() => remove(b.id)}
                            aria-label="Apagar lembrete"
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-red-500/80 hover:bg-red-500 text-white text-[10px] w-5 h-5 rounded flex items-center justify-center transition-opacity"
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
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm font-mono pointer-events-none">
                  {activeCalendars.length === 0 ? "Escolhe um calendário" : "Sem aulas esta semana"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: agenda + reminders */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          <div className="bg-[#0B1120]/80 border border-white/5 rounded-3xl p-6 backdrop-blur-md shadow-lg h-full">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
              Agenda &amp; Avaliações
            </h3>

            <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2">
              {agenda.length === 0 ? (
                <p className="text-sm font-mono text-slate-500 text-center py-6">
                  Nada esta semana.
                </p>
              ) : (
                agenda.map((item) => (
                  <div
                    key={item.id}
                    className="group relative flex flex-col p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white bg-white/10 px-2 py-1 rounded">
                          {shortDate(item.date)}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-slate-400">
                          {formatHour(item.start)} - {formatHour(item.end)}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                          item.personal
                            ? "text-purple-400 border-purple-400/30"
                            : "text-red-400 border-red-400/30"
                        }`}
                      >
                        {item.tipo}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-200 leading-snug pr-4">
                      {item.title}
                    </h4>
                    {item.personal && (
                      <button
                        onClick={() => remove(item.id)}
                        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all text-xs font-bold"
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
              className="w-full mt-6 py-3 border border-dashed border-cyan-600/50 text-cyan-400 bg-cyan-400/5 rounded-xl text-sm font-bold hover:bg-cyan-400/10 hover:border-cyan-400 transition-colors"
            >
              + Anotar lembrete
            </button>
            <p className="text-[9px] text-slate-500 text-center mt-3">
              Guardado localmente no teu dispositivo.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
