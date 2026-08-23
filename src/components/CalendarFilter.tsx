"use client";

import { CALENDARS, colorDotClass } from "@/lib/calendars";

interface CalendarFilterProps {
  active: string[];
  onToggle: (key: string) => void;
}

/** Shared per-calendar filter chips, used by both the weekly and monthly views. */
export default function CalendarFilter({ active, onToggle }: CalendarFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {CALENDARS.map((c) => {
        const on = active.includes(c.key);
        return (
          <button
            key={c.key}
            onClick={() => onToggle(c.key)}
            aria-pressed={on}
            className={`inline-flex items-center gap-2 px-4 py-2 border text-xs font-bold shadow-sm transition-colors ${
              on
                ? "border-slate-300 bg-white text-slate-800"
                : "border-slate-200 bg-slate-100 text-slate-400 hover:bg-slate-50"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${on ? colorDotClass(c.color) : "bg-slate-300"}`} />
            {c.label}
          </button>
        );
      })}
    </div>
  );
}