"use client";

import { format } from "date-fns";
import { pt } from "date-fns/locale";
import type { CalendarEvent } from "@/types";
import {
  REMINDER_SOURCE,
  eventPillStyle,
  eventTimeLabel,
} from "@/lib/calendar-utils";

interface DayEventsModalProps {
  date: Date;
  events: CalendarEvent[];
  /** Remove a personal reminder by id (personal entries only). */
  onDeleteReminder?: (id: string) => void;
  onClose: () => void;
}

/** Overlay listing every event on a given day. */
export default function DayEventsModal({
  date,
  events,
  onDeleteReminder,
  onClose,
}: DayEventsModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 pt-24"
      onClick={onClose}
    >
      <div
        className="bg-[#0B1120] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white capitalize">
              {format(date, "EEEE, d 'de' LLLL", { locale: pt })}
            </h3>
            <p className="text-xs font-mono text-slate-500 mt-1">
              {events.length === 1 ? "1 evento" : `${events.length} eventos`}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 rounded-full border border-white/10 text-slate-400 hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto">
          {events.length === 0 ? (
            <p className="text-center text-sm font-mono text-slate-500 py-6">
              Nada agendado
            </p>
          ) : (
            events.map((ev) => {
              const personal = ev.source === REMINDER_SOURCE;
              return (
                <div
                  key={ev.id}
                  style={eventPillStyle(ev)}
                  className="relative border-l-2 rounded-r-lg p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-white">
                      {ev.important && <span aria-hidden="true">🔴 </span>}
                      {ev.title}
                    </p>
                    {personal && (
                      <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-purple-300">
                        Pessoal
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 mt-1">
                    {eventTimeLabel(ev)}
                    {ev.location ? ` · ${ev.location}` : ""}
                  </p>
                  {ev.description && (
                    <p className="text-xs text-slate-300 mt-2 whitespace-pre-wrap leading-relaxed">
                      {ev.description}
                    </p>
                  )}
                  {personal && onDeleteReminder && (
                    <button
                      onClick={() => onDeleteReminder(ev.id)}
                      className="mt-2 text-[11px] font-bold text-slate-400 hover:text-red-400 transition-colors"
                    >
                      Apagar
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
