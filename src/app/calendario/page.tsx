"use client";

import { useState } from "react";
import { addDays, addMonths, format, startOfMonth, subMonths } from "date-fns";
import { pt } from "date-fns/locale";
import { CALENDARS } from "@/lib/calendars";
import { mondayOf, weekLabel } from "@/lib/schedule-utils";
import WeeklySchedule from "@/components/WeeklySchedule";
import EventsCalendar from "@/components/MensalCalendar";
import CalendarFilter from "@/components/CalendarFilter";

type Tab = "semanal" | "mensal";

const TABS: { value: Tab; label: string }[] = [
  { value: "semanal", label: "Semanal" },
  { value: "mensal", label: "Mensal" },
];

export default function CalendarioPage() {
  const [tab, setTab] = useState<Tab>("semanal");
  const [weekStart, setWeekStart] = useState<Date>(() => mondayOf(new Date()));
  const [monthView, setMonthView] = useState<Date>(() => startOfMonth(new Date()));
  const [active, setActive] = useState<string[]>(() =>
    CALENDARS.map((c) => c.key),
  );

  const toggle = (key: string) =>
    setActive((cur) =>
      cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key],
    );

  const goToday = () =>
    tab === "semanal"
      ? setWeekStart(mondayOf(new Date()))
      : setMonthView(startOfMonth(new Date()));
  const goPrev = () =>
    tab === "semanal"
      ? setWeekStart((w) => addDays(w, -7))
      : setMonthView((v) => subMonths(v, 1));
  const goNext = () =>
    tab === "semanal"
      ? setWeekStart((w) => addDays(w, 7))
      : setMonthView((v) => addMonths(v, 1));

  const dateLabel =
    tab === "semanal"
      ? weekLabel(weekStart)
      : format(monthView, "LLLL yyyy", { locale: pt });

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* CABEÇALHO DO CALENDÁRIO */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 gap-6">
          <div>
            <span className="text-[#63B3ED] text-sm font-bold tracking-[0.2em] uppercase drop-shadow-sm">
              Calendário
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-2">
              {tab === "semanal" ? "Horário semanal" : "Eventos mensais"}
            </h1>
          </div>

          {/* Filtros de Calendário da branch incoming */}
          <CalendarFilter active={active} onToggle={toggle} />
        </div>

        {/* Controlos de Navegação e Tabs */}
        <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-6">
          
          {/* Toggle Semanal / Mensal */}
          <div className="flex w-fit border border-slate-200 bg-white p-1 shadow-sm">
            {TABS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setTab(value)}
                className={`px-6 py-2 text-sm font-bold transition-colors ${
                  tab === value
                    ? "bg-[#63B3ED] text-white"
                    : "bg-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Botão Hoje */}
          <button
            onClick={goToday}
            className="px-6 py-2 bg-white border border-slate-200 text-slate-700 shadow-sm rounded-none text-sm font-bold hover:bg-slate-50 transition-colors"
          >
            Hoje
          </button>

          {/* Botões de Navegação de Seta */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              aria-label={tab === "semanal" ? "Semana anterior" : "Mês anterior"}
              className="w-10 h-10 flex items-center justify-center rounded-none bg-white border border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
            >
              ←
            </button>
            <button
              onClick={goNext}
              aria-label={tab === "semanal" ? "Semana seguinte" : "Mês seguinte"}
              className="w-10 h-10 flex items-center justify-center rounded-none bg-white border border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
            >
              →
            </button>
          </div>

          {/* Data Atual Dinâmica */}
          <span className="text-lg font-bold text-slate-800 ml-2 capitalize">
            {dateLabel}
          </span>
        </div>

        {/* ZONA DO CALENDÁRIO (Renderização Condicional por Tab) */}
        {tab === "semanal" ? (
          <WeeklySchedule weekStart={weekStart} activeCalendars={active} />
        ) : (
          <EventsCalendar view={monthView} activeCalendars={active} />
        )}

      </div>
    </main>
  );
}