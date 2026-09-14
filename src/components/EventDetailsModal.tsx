"use client";

import { format } from "date-fns";
import { pt } from "date-fns/locale";
import type { CalendarEvent } from "@/types";
import { CALENDARS } from "@/lib/calendars";
import {
  REMINDER_SOURCE,
  eventTimeLabel,
  roomLabel,
  tipoLabel,
} from "@/lib/calendar-utils";
import { wallClockDate } from "@/lib/datetime";

interface EventDetailsModalProps {
  event: CalendarEvent;
  /** Remove a personal reminder by id (personal entries only). */
  onDeleteReminder?: (id: string) => void;
  onClose: () => void;
}

/** One labeled row of the details list; renders nothing without a value. */
function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 text-sm">
      <span className="w-24 shrink-0 text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-0.5">
        {label}
      </span>
      <span className="text-slate-700">{value}</span>
    </div>
  );
}

/** Overlay with the full detail of a single event (class, exam, reminder…). */
export default function EventDetailsModal({
  event,
  onDeleteReminder,
  onClose,
}: EventDetailsModalProps) {
  const personal = event.source === REMINDER_SOURCE;
  const sourceLabel = personal
    ? "Pessoal"
    : CALENDARS.find((c) => c.key === event.source)?.label;

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-start justify-center p-4 pt-24"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-none w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Colored band ties the modal to the block/pill the user clicked. */}
        <div className="h-1.5" style={{ backgroundColor: event.colorHex }} />
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {sourceLabel && (
                  <span
                    className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-slate-200 text-slate-600"
                    style={{ backgroundColor: `${event.colorHex}22` }}
                  >
                    {sourceLabel}
                  </span>
                )}
                {event.important && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-red-200 bg-red-50 text-red-600">
                    Avaliação
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {event.title}
              </h3>
              <p className="text-xs font-mono text-slate-500 mt-1 capitalize">
                {format(wallClockDate(event.start), "EEEE, d 'de' LLLL", {
                  locale: pt,
                })}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="w-8 h-8 shrink-0 rounded-none border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            <DetailRow label="Horário" value={eventTimeLabel(event)} />
            <DetailRow
              label="Tipo"
              value={event.tipo ? tipoLabel(event.tipo) : undefined}
            />
            <DetailRow label="Sala" value={roomLabel(event)} />
            <DetailRow label="Docente" value={event.docentes?.join(", ")} />
            <DetailRow label="Turma" value={event.turmas?.join(", ")} />
          </div>

          {event.description && (
            <p className="text-xs text-slate-600 mt-4 whitespace-pre-wrap leading-relaxed border-t border-slate-100 pt-4">
              {event.description}
            </p>
          )}

          {personal && onDeleteReminder && (
            <button
              onClick={() => {
                onDeleteReminder(event.id);
                onClose();
              }}
              className="mt-5 w-full py-2 border border-red-200 bg-red-50 text-red-600 rounded-none text-xs font-bold hover:bg-red-100 transition-colors"
            >
              Apagar lembrete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
