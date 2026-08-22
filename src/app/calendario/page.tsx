import Link from "next/link";
// Importa os teus componentes (ajusta os caminhos se necessário)
import WeeklySchedule from "../../components/WeeklySchedule";
import CalendarFilter from "../../components/CalendarFilter";

export default function CalendarioPage() {
  return (
    <main className="flex flex-col min-h-screen bg-slate-50 pt-32 pb-16 px-6">
      
      <div className="max-w-7xl mx-auto w-full">
        
        {/* CABEÇALHO DO CALENDÁRIO */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-6">
          
          <div>
            <span className="text-[#63B3ED] text-sm font-bold tracking-[0.2em] uppercase drop-shadow-sm">
              Calendário
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-2">
              Horário semanal
            </h1>
            
            {/* Controlos de Navegação (Mês/Semana e Datas) */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              
              {/* Toggle Semanal / Mensal */}
              <div className="flex bg-white border border-slate-200 p-1 shadow-sm">
                <button className="px-6 py-2 bg-[#0066CC] text-white text-sm font-bold transition-colors">
                  Semanal
                </button>
                <button className="px-6 py-2 bg-transparent text-slate-600 hover:text-slate-900 text-sm font-bold transition-colors">
                  Mensal
                </button>
              </div>

              {/* Botões de Navegação */}
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-bold transition-colors shadow-sm">
                  Hoje
                </button>
                <button className="px-3 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                  ←
                </button>
                <button className="px-3 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                  →
                </button>
              </div>

              {/* Data Atual */}
              <span className="text-lg font-bold text-slate-800 ml-2">
                17 ago. - 23 ago. 2026
              </span>

            </div>
          </div>

          {/* Filtros de Ano (Os teus botões de filtro) */}
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span> 1º Ano
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> 2º Ano
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span> 3º Ano
            </button>
            <button className="px-4 py-2 bg-[#0066CC] text-white border border-[#0066CC] text-xs font-bold shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white"></span> FISUMa
            </button>
          </div>

        </div>

        {/* ZONA DO CALENDÁRIO (Grelha e Sidebar) */}
        <div className="flex flex-col lg:flex-row gap-6 w-full items-stretch">
          
          {/* Grelha Principal (Onde vai o teu WeeklySchedule.tsx) */}
          <div className="w-full lg:w-3/4 bg-white border border-slate-200 shadow-xl min-h-[600px] flex items-center justify-center text-slate-400">
             {/* Substitui este parágrafo pelo teu componente <WeeklySchedule /> */}
             <p>[Componente da Grelha Semanal Aqui]</p>
          </div>

          {/* Sidebar (Agenda & Avaliações) */}
          <div className="w-full lg:w-1/4 bg-white border border-slate-200 shadow-xl p-6 flex flex-col">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-4">
              Agenda & Avaliações
            </h2>
            
            <div className="flex-grow flex items-center justify-center">
              <span className="text-slate-400 text-sm font-mono">Nada esta semana.</span>
            </div>

            {/* Botão de Anotar Lembrete (Estilo limpo com border dashed) */}
            <button className="w-full mt-4 py-3 border-2 border-dashed border-[#63B3ED] bg-blue-50/50 hover:bg-blue-50 text-[#0066CC] font-bold text-sm transition-colors">
              + Anotar lembrete
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-3">
              Guardado localmente no teu dispositivo.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}