"use client";

import { useState } from "react";
import { parseISO, isValid } from "date-fns";

interface ReminderModalProps {
  onSave: (reminder: {
    title: string;
    date: string;
    start: number;
    end: number;
  }) => void;
  onClose: () => void;
}

export default function ReminderModal({ onSave, onClose }: ReminderModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Por favor, insere um título.");
      return;
    }
    if (!date || !isValid(parseISO(date))) {
      setError("Por favor, insere uma data válida (AAAA-MM-DD).");
      return;
    }

    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const startDecimal = startH + startM / 60;
    const endDecimal = endH + endM / 60;

    if (endDecimal <= startDecimal) {
      setError("A hora de fim tem de ser posterior à hora de início.");
      return;
    }

    onSave({
      title: title.trim(),
      date,
      start: startDecimal,
      end: endDecimal,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
      
      <div className="bg-white border border-slate-200 shadow-2xl rounded-none w-full max-w-md p-8 relative">
        
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Novo Lembrete</h3>
            <p className="text-xs text-slate-500 mt-1">Guardado localmente e visível só no teu horário.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 font-bold text-lg p-1"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#63B3ED]">
              Título
            </label>
            <input
              type="text"
              placeholder="Ex: Estudar Física Estatística"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-none text-sm focus:outline-none focus:border-[#63B3ED] transition-colors"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#63B3ED]">
              Data
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-none text-sm focus:outline-none focus:border-[#63B3ED] transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#63B3ED]">
                Início
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-none text-sm focus:outline-none focus:border-[#63B3ED] transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#63B3ED]">
                Fim
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-none text-sm focus:outline-none focus:border-[#63B3ED] transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs uppercase font-bold tracking-widest rounded-none transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-[#63B3ED] hover:bg-[#4A9EDB] text-white text-xs uppercase font-bold tracking-widest rounded-none transition-colors shadow-sm"
            >
              Guardar
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}