"use client";

import { useMemo, useState } from "react";
import {
  addMonths,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import { pt } from "date-fns/locale";
import { useEvents } from "@/hooks/useEvents";
import { usePersonalReminders } from "@/hooks/usePersonalReminders";
import { wallClockDate } from "@/lib/datetime";
import {
  REMINDER_SOURCE,
  buildMonthGrid,
  dayKey,
  eventPillStyle,
  eventTimeLabel,
  groupEventsByDay,
  reminderToEvent,
} from "@/lib/calendar-utils";
import { WEEKDAYS_FULL } from "@/lib/schedule-utils";
import DayEventsModal from "./DayEventsModal";
import ReminderModal from "./ReminderModal";

const MAX_PILLS_PER_DAY = 5;

interface EventsCalendarProps {
  /** Calendar keys currently visible (shared filter). */
  activeCalendars: string[];
}

/** Monthly view. Same visual system as the weekly view, laid out per month. */
export default function EventsCalendar({ activeCalendars }: EventsCalendarProps) {
  const [view, setView] = useState<Date>(() => startOfMonth(new Date()));
  const [selected, setSelected] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { events, loading, error } = useEvents(view);
  const { reminders, add, remove } = usePersonalReminders();

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
  const selectedEvents = selected ? eventsByDay.get(dayKey(selected)) ?? [] : [];

  // Sidebar agenda: important events (exams/deliveries) + reminders this month.
  const agenda = useMemo(
    () =>
      visible
        .filter(
          (e) =>
            (e.important || e.source === REMINDER_SOURCE) &&
            !e.allDay &&
            isSameMonth(wallClockDate(e.start), view),
        )
        .sort((a, b) => a.start.localeCompare(b.start)),
    [visible, view],
  );

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

      {/* Month navigation */}
      <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-8">
        <button
          onClick={() => setView(startOfMonth(new Date()))}
          className="px-6 py-2 bg-white border border-slate-200 text-slate-700 shadow-sm rounded-none text-sm font-bold hover:bg-slate-50 transition-colors"
        >
          Hoje
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView((v) => subMonths(v, 1))}
            aria-label="Mês anterior"
            className="w-10 h-10 flex items-center justify-center rounded-none bg-white border border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => setView((v) => addMonths(v, 1))}
            aria-label="Mês seguinte"
            className="w-10 h-10 flex items-center justify-center rounded-none bg-white border border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            →
          </button>
        </div>
        <span className="text-lg font-bold text-slate-800 ml-2 capitalize">
          {format(view, "LLLL yyyy", { locale: pt })}
        </span>
        {loading && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#0066CC] animate-pulse ml-4">
            a sincronizar…
          </span>
        )}
        {error && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 ml-4">
            erro: {error}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Month grid */}
        <div className="xl:col-span-3 bg-white border border-slate-200 rounded-none shadow-xl p-6">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 border-b border-slate-200 pb-4 mb-2">
            {WEEKDAYS_FULL.map((day, i) => (
              <div
                key={day}
                className={`text-center font-bold uppercase tracking-wide text-xs ${
                  i > 4 ? "text-[#63B3ED]" : "text-slate-500"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 border-l border-t border-slate-100">
            {days.map((day) => {
              const key = dayKey(day);
              const dayEvents = eventsByDay.get(key) ?? [];
              const outside = !isSameMonth(day, view);
              const today = isToday(day);
              const weekend = day.getDay() === 0 || day.getDay() === 6;
              return (
                <button
                  key={key}
                  onClick={() => setSelected(day)}
                  className={`min-h-[120px] sm:min-h-[148px] xl:min-h-[172px] border-r border-b border-slate-100 p-1.5 flex flex-col gap-1 text-left transition-colors hover:bg-slate-50 ${
                    today ? "bg-[#0066CC]/5" : weekend ? "bg-slate-50/50" : ""
                  }`}
                >
                  <span
                    className={`text-sm font-bold w-7 h-7 flex items-center justify-center ${
                      today
                        ? "bg-[#0066CC] text-white rounded-full"
                        : outside
                          ? "text-slate-300"
                          : weekend
                            ? "text-[#0066CC]"
                            : "text-slate-700"
                    }`}
                  >
                    {format(day, "d")}
                  </span>

                  {/* Small screens: colored dots. */}
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

                  {/* Larger screens: event pills, styled like the weekly blocks. */}
                  <span className="hidden sm:flex flex-col gap-0.5 overflow-hidden">
                    {dayEvents.slice(0, MAX_PILLS_PER_DAY).map((ev) => (
                      <span
                        key={ev.id}
                        style={eventPillStyle(ev)}
                        className="text-[10px] leading-tight font-medium border-l-2 px-1.5 py-0.5 truncate"
                      >
                        {ev.title}
                      </span>
                    ))}
                    {dayEvents.length > MAX_PILLS_PER_DAY && (
                      <span className="text-[10px] font-medium text-slate-500 px-1.5">
                        +{dayEvents.length - MAX_PILLS_PER_DAY} mais
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
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
                    Nada este mês.
                  </p>
                </div>
              ) : (
                agenda.map((item) => {
                  const personal = item.source === REMINDER_SOURCE;
                  return (
                    <div
                      key={item.id}
                      className="group relative flex flex-col p-4 rounded-none bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-700 bg-white border border-slate-200 shadow-sm px-2 py-1 rounded-none capitalize">
                            {format(wallClockDate(item.start), "dd MMM", { locale: pt })}
                          </span>
                          <span className="font-mono text-[10px] font-bold text-slate-500">
                            {eventTimeLabel(item)}
                          </span>
                        </div>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-none border ${
                            personal
                              ? "text-purple-600 border-purple-200 bg-purple-50"
                              : "text-red-600 border-red-200 bg-red-50"
                          }`}
                        >
                          {personal ? "Pessoal" : "Avaliação"}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug pr-4">
                        {item.title}
                      </h4>
                      {personal && (
                        <button
                          onClick={() => remove(item.id)}
                          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all text-xs font-bold"
                        >
                          Apagar
                        </button>
                      )}
                    </div>
                  );
                })
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
