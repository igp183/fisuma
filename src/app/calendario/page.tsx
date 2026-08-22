"use client";

import { useState } from "react";
import { CALENDARS } from "@/lib/calendars";
import WeeklySchedule from "@/components/WeeklySchedule";
import EventsCalendar from "@/components/EventsCalendar";
import CalendarFilter from "@/components/CalendarFilter";

type Tab = "semanal" | "mensal";

const TABS: { value: Tab; label: string }[] = [
  { value: "semanal", label: "Semanal" },
  { value: "mensal", label: "Mensal" },
];

export default function CalendarioPage() {
  const [tab, setTab] = useState<Tab>("semanal");
  const [active, setActive] = useState<string[]>(() =>
    CALENDARS.map((c) => c.key),
  );

  const toggle = (key: string) =>
    setActive((cur) =>
      cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key],
    );

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-6">
          <div>
            <span className="text-[#63B3ED] text-sm font-bold tracking-[0.2em] uppercase drop-shadow-sm">
              Calendário
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-2">
              {tab === "semanal" ? "Horário semanal" : "Eventos mensais"}
            </h1>

            {/* Semanal / Mensal toggle; each view renders its own date nav. */}
            <div className="flex w-fit border border-slate-200 bg-white p-1 shadow-sm mt-6">
              {TABS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setTab(value)}
                  className={`px-6 py-2 text-sm font-bold transition-colors ${
                    tab === value
                      ? "bg-[#0066CC] text-white"
                      : "bg-transparent text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Shared calendar filter, applied to both views. */}
          <CalendarFilter active={active} onToggle={toggle} />
        </div>

        {tab === "semanal" ? (
          <WeeklySchedule activeCalendars={active} />
        ) : (
          <EventsCalendar activeCalendars={active} />
        )}
      </div>
    </main>
  );
}
