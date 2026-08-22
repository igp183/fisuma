"use client";

import { useState, type FormEvent } from "react";
import type { PersonalReminder } from "@/types";
import { timeStrToDecimal } from "@/lib/schedule-utils";

interface ReminderModalProps {
  onSave: (reminder: Omit<PersonalReminder, "id">) => void;
  onClose: () => void;
}

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 transition-colors";
const labelClass =
  "block text-xs font-bold text-cyan-400 mb-1 uppercase tracking-wider";

/** Modal to add a private reminder, with inline validation (no blocking dialogs). */
export default function ReminderModal({ onSave, onClose }: ReminderModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!title || !date || !start || !end) {
      setError("Preenche todos os campos.");
      return;
    }
    if (timeStrToDecimal(end) <= timeStrToDecimal(start)) {
      setError("A hora de fim tem de ser depois do início.");
      return;
    }
    onSave({
      title,
      date,
      start: timeStrToDecimal(start),
      end: timeStrToDecimal(end),
    });
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0B1120] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white mb-2">Novo lembrete</h2>
        <p className="text-sm text-slate-400 mb-6">
          Guardado localmente e visível só no teu horário.
        </p>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Estudar Álgebra"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Data</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${inputClass} [color-scheme:dark]`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Início</label>
              <input
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className={`${inputClass} [color-scheme:dark]`}
              />
            </div>
            <div>
              <label className={labelClass}>Fim</label>
              <input
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className={`${inputClass} [color-scheme:dark]`}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-slate-600 text-slate-300 rounded-xl font-bold hover:bg-white/5 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-colors shadow-[0_0_15px_rgba(8,145,178,0.5)]"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
