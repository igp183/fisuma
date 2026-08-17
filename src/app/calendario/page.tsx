"use client";

import { useState } from "react";
import { CALENDARS } from "@/lib/calendars";
import WeeklySchedule from "@/components/WeeklySchedule";
import EventsCalendar from "@/components/EventsCalendar";
import CalendarFilter from "@/components/CalendarFilter";

type Tab = "semanal" | "mensal";

const TABS = [
  ["semanal", "Semanal"],
  ["mensal", "Mensal"],
] as const;

export default function CalendarioPage() {
  const [tab, setTab] = useState<Tab>("semanal");
  // Shared calendar filter: both views read the same data and filter by it.
  const [active, setActive] = useState<string[]>(() => CALENDARS.map((c) => c.key));

  const toggle = (key: string) =>
    setActive((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );

  return (
    <main className="flex flex-col min-h-screen pt-32 pb-24 px-8 relative">
      <div className="w-full max-w-7xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400" /> CALENDÁRIO
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 rounded-full border border-white/10 bg-white/5 w-fit">
            {TABS.map(([value, label]) => (
              <button
                key={value}
                onClick={() => setTab(value)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  tab === value
                    ? "bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <CalendarFilter active={active} onToggle={toggle} />
        </div>
      </div>

      {tab === "semanal" ? (
        <WeeklySchedule activeCalendars={active} />
      ) : (
        <EventsCalendar activeCalendars={active} />
      )}
    </main>
  );
}
