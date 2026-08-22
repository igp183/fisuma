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
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-colors ${
              on
                ? "border-white/20 bg-white/10 text-white"
                : "border-white/10 text-slate-500 hover:text-slate-300"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${on ? colorDotClass(c.color) : "bg-slate-600"}`} />
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
