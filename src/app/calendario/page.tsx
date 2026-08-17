"use client";

import React, { useState, useEffect, FormEvent } from "react";

// ============================================================================
// BASE DE DADOS DO HORÁRIO E EVENTOS
// ============================================================================
const cadeiras = [
  { id: 201, ano: 2, dia: "Segunda", inicio: 10.0, fim: 11.5, nome: "Cálculo III", tipo: "T", sala: "Sala 22 - Piso 1", cor: "bg-amber-500/20 border-amber-500/50 text-amber-300" },
  { id: 202, ano: 2, dia: "Terça", inicio: 9.0, fim: 10.5, nome: "Prog. Orientada por Objetos", tipo: "T", sala: "Sala do senado - Piso -2", cor: "bg-red-500/20 border-red-500/50 text-red-300" },
  { id: 203, ano: 2, dia: "Terça", inicio: 11.0, fim: 13.0, nome: "Termodinâmica e T. Cinética", tipo: "T", sala: "A Definir - Piso 0", cor: "bg-teal-500/20 border-teal-500/50 text-teal-300" },
  { id: 204, ano: 2, dia: "Terça", inicio: 14.0, fim: 15.5, nome: "Cálculo III", tipo: "T", sala: "Sala 22 - Piso 1", cor: "bg-amber-500/20 border-amber-500/50 text-amber-300" },
  { id: 205, ano: 2, dia: "Quarta", inicio: 9.0, fim: 10.5, nome: "Eletromagnetismo", tipo: "T", sala: "A Definir - Piso 0", cor: "bg-indigo-500/20 border-indigo-500/50 text-indigo-300" },
  { id: 206, ano: 2, dia: "Quarta", inicio: 11.0, fim: 12.5, nome: "Eletromagnetismo", tipo: "T", sala: "A Definir - Piso 0", cor: "bg-indigo-500/20 border-indigo-500/50 text-indigo-300" },
  { id: 207, ano: 2, dia: "Quinta", inicio: 9.0, fim: 11.0, nome: "Termodinâmica e T. Cinética", tipo: "TP", sala: "A Definir - Piso 0", cor: "bg-teal-500/20 border-teal-500/50 text-teal-300" },
  { id: 208, ano: 2, dia: "Quinta", inicio: 11.0, fim: 13.0, nome: "Eletromagnetismo", tipo: "TP", sala: "A Definir - Piso 0", cor: "bg-indigo-500/20 border-indigo-500/50 text-indigo-300" },
  { id: 209, ano: 2, dia: "Sexta", inicio: 9.0, fim: 11.0, nome: "Cálculo III", tipo: "TP", sala: "Sala 22 - Piso 1", cor: "bg-amber-500/20 border-amber-500/50 text-amber-300" },
  { id: 210, ano: 2, dia: "Sexta", inicio: 11.0, fim: 13.0, nome: "Prog. Orientada por Objetos", tipo: "TP", sala: "Sala 30 - Piso 2", cor: "bg-red-500/20 border-red-500/50 text-red-300" },
  { id: 211, ano: 2, dia: "Sexta", inicio: 14.0, fim: 16.0, nome: "Termodinâmica e T. Cinética", tipo: "PL", sala: "A Definir - Piso 0", cor: "bg-teal-500/20 border-teal-500/50 text-teal-300" },
];

const eventosGerais = [
  { id: "ev1", dataExata: "2026-10-15", inicio: 10.0, fim: 11.5, titulo: "1º Teste de Cálculo III", tipo: "Avaliação", cor: "bg-amber-600 border-amber-400 text-white z-20 shadow-[0_0_20px_rgba(217,119,6,0.5)]" },
  { id: "ev2", dataExata: "2026-10-22", inicio: 14.0, fim: 16.0, titulo: "Reunião de Projetos (FISUMa)", tipo: "Núcleo", cor: "bg-cyan-600 border-cyan-400 text-white z-20 shadow-[0_0_20px_rgba(8,145,178,0.5)]" },
  // Evento de exemplo no Fim de Semana para veres como fica
  { id: "ev3", dataExata: "2026-10-17", inicio: 14.0, fim: 18.0, titulo: "Maratona de Programação", tipo: "Núcleo", cor: "bg-blue-600 border-blue-400 text-white z-20 shadow-[0_0_20px_rgba(37,99,235,0.5)]" },
];

const formatarHora = (horaDecimal?: number) => {
  if (horaDecimal === undefined) return "";
  const h = Math.floor(horaDecimal);
  const m = Math.round((horaDecimal - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

const timeStrToNum = (timeStr: string) => {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h + (m / 60);
};

export default function CalendarioPage() {
  const [anosAtivos, setAnosAtivos] = useState<number[]>([2]);
  const [lembretesPessoais, setLembretesPessoais] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formTitulo, setFormTitulo] = useState("");
  const [formData, setFormData] = useState("");
  const [formInicio, setFormInicio] = useState("");
  const [formFim, setFormFim] = useState("");

  useEffect(() => {
    const guardados = localStorage.getItem('lembretes_fisuma');
    if(guardados) {
      setLembretesPessoais(JSON.parse(guardados));
    }
  }, []);

  const dataHoje = new Date(2026, 9, 12); 
  const [dataBase, setDataBase] = useState(dataHoje);

  const getSegundaFeira = (d: Date) => {
    const data = new Date(d);
    const dia = data.getDay();
    const diff = data.getDate() - dia + (dia === 0 ? -6 : 1); 
    return new Date(data.setDate(diff));
  };

  const inicioSemana = getSegundaFeira(dataBase);
  const fimSemana = new Date(inicioSemana);
  fimSemana.setDate(fimSemana.getDate() + 6); // Agora adiciona 6 dias para ir até Domingo

  const mesesAbrev = ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."];
  const textoSemana = `${inicioSemana.getDate()} ${mesesAbrev[inicioSemana.getMonth()]} - ${fimSemana.getDate()} ${mesesAbrev[fimSemana.getMonth()]} ${fimSemana.getFullYear()}`;

  const semanaAnterior = () => setDataBase(new Date(dataBase.getFullYear(), dataBase.getMonth(), dataBase.getDate() - 7));
  const semanaSeguinte = () => setDataBase(new Date(dataBase.getFullYear(), dataBase.getMonth(), dataBase.getDate() + 7));
  const irParaHoje = () => setDataBase(dataHoje);

  const toggleAno = (ano: number) => {
    setAnosAtivos(prev => prev.includes(ano) ? prev.filter(a => a !== ano) : [...prev, ano]);
  };

  const handleGuardarLembrete = (e: FormEvent) => {
    e.preventDefault();
    if (!formTitulo || !formData || !formInicio || !formFim) {
      alert("Por favor, preenche todos os campos.");
      return;
    }
    const inicioNum = timeStrToNum(formInicio);
    const fimNum = timeStrToNum(formFim);

    if (fimNum <= inicioNum) {
      alert("A hora de fim tem de ser posterior à hora de início.");
      return;
    }

    const novoLembrete = {
      id: `pess-${Date.now()}`,
      dataExata: formData,
      inicio: inicioNum,
      fim: fimNum,
      titulo: formTitulo,
      tipo: "Pessoal",
      cor: "bg-purple-600/90 border-purple-400 text-white z-30 shadow-[0_0_20px_rgba(147,51,234,0.5)] border-dashed border-2"
    };

    const novaLista = [...lembretesPessoais, novoLembrete];
    setLembretesPessoais(novaLista);
    localStorage.setItem('lembretes_fisuma', JSON.stringify(novaLista));

    setIsModalOpen(false);
    setFormTitulo("");
    setFormData("");
    setFormInicio("");
    setFormFim("");
  };

  const removerLembrete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); 
    if(confirm("Queres mesmo apagar este lembrete?")) {
      const novaLista = lembretesPessoais.filter(l => l.id !== id);
      setLembretesPessoais(novaLista);
      localStorage.setItem('lembretes_fisuma', JSON.stringify(novaLista));
    }
  };

  // Alterado para 7 dias
  const diasDaSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
  const horas = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]; // Estendi as horas um pouco para o fim de tarde
  const PIXEIS_POR_HORA = 80;

  const cadeirasVisiveis = cadeiras.filter(c => anosAtivos.includes(c.ano));
  const todosEventos = [...eventosGerais, ...lembretesPessoais].sort((a, b) => new Date(a.dataExata).getTime() - new Date(b.dataExata).getTime());

  return (
    <main className="flex flex-col min-h-screen pt-32 pb-24 px-8 relative">
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0B1120] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <h2 className="text-2xl font-bold text-white mb-2">Novo Lembrete</h2>
            <p className="text-sm text-slate-400 mb-6">Ficará guardado localmente e visível no teu horário.</p>
            
            <form onSubmit={handleGuardarLembrete} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-cyan-400 mb-1 uppercase tracking-wider">Título do Evento</label>
                <input type="text" value={formTitulo} onChange={e => setFormTitulo(e.target.value)} required placeholder="Ex: Estudar Álgebra..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-bold text-cyan-400 mb-1 uppercase tracking-wider">Data</label>
                <input type="date" value={formData} onChange={e => setFormData(e.target.value)} required
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 transition-colors [color-scheme:dark]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-cyan-400 mb-1 uppercase tracking-wider">Início</label>
                  <input type="time" value={formInicio} onChange={e => setFormInicio(e.target.value)} required
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 transition-colors [color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-cyan-400 mb-1 uppercase tracking-wider">Fim</label>
                  <input type="time" value={formFim} onChange={e => setFormFim(e.target.value)} required
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 transition-colors [color-scheme:dark]" />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-slate-600 text-slate-300 rounded-xl font-bold hover:bg-white/5 transition-colors">
                  Cancelar
                </button>
                <button type="submit"
                  className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-colors shadow-[0_0_15px_rgba(8,145,178,0.5)]">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      <section className="w-full max-w-7xl mx-auto mb-10 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span> CALENDÁRIO
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Pesquisa de Horários
          </h1>

          <div className="flex items-center gap-4 text-slate-300">
            <button onClick={irParaHoje} className="px-4 py-2 border border-white/20 rounded-full text-sm font-bold hover:bg-white/10 transition-colors">Hoje</button>
            <div className="flex items-center gap-2">
              <button onClick={semanaAnterior} className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors">←</button>
              <button onClick={semanaSeguinte} className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors">→</button>
            </div>
            <span className="text-xl font-bold ml-2 text-white">{textoSemana}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {[1, 2, 3].map(ano => (
            <button key={ano} onClick={() => toggleAno(ano)} className={`px-5 py-2.5 rounded-lg border font-bold text-sm transition-all duration-300 ${anosAtivos.includes(ano) ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.2)]" : "bg-white/5 border-white/10 text-slate-500 hover:bg-white/10"}`}>
              {ano}º Ano
            </button>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* ESQUERDA: Horário */}
        <div className="xl:col-span-3 bg-[#0B1120]/80 border border-white/5 rounded-3xl p-6 backdrop-blur-md shadow-lg overflow-x-auto relative z-0">
          <div className="min-w-[1000px] relative">
            
            {/* Agora grid-cols-8 (1 para as horas, 7 para os dias) */}
            <div className="grid grid-cols-8 border-b border-white/10 pb-4 mb-2">
              <div className="col-span-1"></div>
              {diasDaSemana.map((dia, index) => {
                const dataDia = new Date(inicioSemana);
                dataDia.setDate(dataDia.getDate() + index);
                
                return (
                  <div key={dia} className="col-span-1 text-center flex flex-col gap-1">
                    <span className={`text-2xl font-bold ${index > 4 ? 'text-cyan-400' : 'text-white'}`}>{dataDia.getDate()}</span>
                    <span className={`font-bold uppercase tracking-wide text-xs ${index > 4 ? 'text-cyan-600' : 'text-slate-500'}`}>{dia}</span>
                  </div>
                );
              })}
            </div>

            <div className="relative">
              {horas.map(hora => (
                <div key={hora} className="grid grid-cols-8 border-b border-white/10" style={{ height: `${PIXEIS_POR_HORA}px` }}>
                  <div className="col-span-1 pr-4 relative">
                    <span className="absolute -top-2.5 right-4 text-xs font-mono text-slate-400 font-bold">{hora}:00</span>
                    <span className="absolute top-[34px] right-4 text-[10px] font-mono text-slate-600">{hora}:30</span>
                  </div>
                  {/* Agora temos 7 colunas em vez de 5 */}
                  <div className="col-span-7 grid grid-cols-7 relative border-l border-white/10">
                    <div className="absolute top-1/2 w-full border-t border-white/5 border-dashed"></div>
                    <div className="border-r border-white/10 relative"></div>
                    <div className="border-r border-white/10 relative"></div>
                    <div className="border-r border-white/10 relative"></div>
                    <div className="border-r border-white/10 relative"></div>
                    <div className="border-r border-white/10 relative"></div>
                    <div className="border-r border-white/10 relative bg-white/[0.01]"></div> {/* Fundo muito ligeiro no fds */}
                    <div className="relative bg-white/[0.01]"></div>
                  </div>
                </div>
              ))}

              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="grid grid-cols-8 w-full h-full">
                  <div className="col-span-1"></div>
                  <div className="col-span-7 relative w-full h-full">
                    
                    {cadeirasVisiveis.map((cadeira) => {
                      const indexDia = diasDaSemana.indexOf(cadeira.dia);
                      return (
                        <div key={cadeira.id} className={`absolute rounded-md border p-2 flex flex-col overflow-hidden transition-all duration-300 cursor-pointer pointer-events-auto hover:z-50 hover:scale-[1.03] z-10 backdrop-blur-md ${cadeira.cor}`}
                          style={{
                            // Usar 100/7% em vez de 20% para caberem 7 dias
                            left: `calc(${indexDia * (100/7)}% + 4px)`, width: `calc(${100/7}% - 8px)`,
                            top: `${(cadeira.inicio - 8) * PIXEIS_POR_HORA}px`, height: `${(cadeira.fim - cadeira.inicio) * PIXEIS_POR_HORA}px`,
                          }}>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[9px] font-black uppercase tracking-wider bg-black/20 px-1.5 py-0.5 rounded">{cadeira.ano}º Ano</span>
                            <span className="text-[10px] font-bold opacity-90">{formatarHora(cadeira.inicio)}</span>
                          </div>
                          <div className="font-bold text-xs leading-tight mb-1">{cadeira.nome}</div>
                          <div className="text-[10px] font-medium opacity-80 mt-auto truncate">[{cadeira.tipo}] {cadeira.sala}</div>
                        </div>
                      );
                    })}

                    {todosEventos.map((evento) => {
                      const dataEvento = new Date(evento.dataExata);
                      if (dataEvento >= inicioSemana && dataEvento <= fimSemana) {
                        const diaDaSemanaIndex = dataEvento.getDay();
                        // Converter 0 (Domingo) - 6 (Sábado) para o index 0 (Segunda) - 6 (Domingo)
                        const indexDia = diaDaSemanaIndex === 0 ? 6 : diaDaSemanaIndex - 1; 
                        
                        if (indexDia >= 0 && indexDia <= 6 && evento.inicio && evento.fim) {
                          return (
                            <div key={evento.id} className={`absolute rounded-md border p-2 flex flex-col overflow-hidden transition-all duration-300 cursor-pointer pointer-events-auto hover:scale-[1.03] group ${evento.cor}`}
                              style={{
                                left: `calc(${indexDia * (100/7)}% + 8px)`, width: `calc(${100/7}% - 16px)`, 
                                top: `${(evento.inicio - 8) * PIXEIS_POR_HORA}px`, height: `${(evento.fim - evento.inicio) * PIXEIS_POR_HORA}px`,
                              }}>
                              <div className="flex justify-between items-start mb-1">
                                <span className="text-[9px] font-black uppercase tracking-wider bg-black/30 px-1.5 py-0.5 rounded">{evento.tipo}</span>
                                <span className="text-[10px] font-bold opacity-90">{formatarHora(evento.inicio)}</span>
                              </div>
                              <div className="font-bold text-sm leading-tight mt-1 text-center flex-grow flex items-center justify-center">{evento.titulo}</div>
                              
                              {evento.tipo === "Pessoal" && (
                                <button onClick={(e) => removerLembrete(evento.id, e)} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-red-500/80 hover:bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded flex items-center justify-center transition-opacity">
                                  ×
                                </button>
                              )}
                            </div>
                          );
                        }
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIREITA: Lista Lateral */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          <div className="bg-[#0B1120]/80 border border-white/5 rounded-3xl p-6 backdrop-blur-md shadow-lg h-full">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
              Agenda & Avaliações
            </h3>

            <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
              {todosEventos.map(item => {
                const dateObj = new Date(item.dataExata);
                const showDate = `${String(dateObj.getDate()).padStart(2, '0')} ${mesesAbrev[dateObj.getMonth()]}`;

                return (
                  <div key={item.id} className="group relative flex flex-col p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white bg-white/10 px-2 py-1 rounded shadow-inner">
                          {showDate}
                        </span>
                        {item.inicio !== undefined && (
                          <span className="font-mono text-[10px] font-bold text-slate-400">
                            {formatarHora(item.inicio)} - {formatarHora(item.fim)}
                          </span>
                        )}
                      </div>

                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${item.tipo === 'Pessoal' ? 'text-purple-400 border-purple-400/30' : 'text-amber-400 border-amber-400/30'}`}>
                        {item.tipo}
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-bold text-slate-200 leading-snug pr-4">{item.titulo}</h4>

                    {item.tipo === "Pessoal" && (
                      <button onClick={(e) => removerLembrete(item.id, e)} className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all text-xs font-bold">
                        Apagar
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => setIsModalOpen(true)} 
              className="w-full mt-6 py-3 border border-dashed border-cyan-600/50 text-cyan-400 bg-cyan-400/5 rounded-xl text-sm font-bold hover:bg-cyan-400/10 hover:border-cyan-400 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.1)]">
              + Anotar Lembrete (Privado)
            </button>
            <p className="text-[9px] text-slate-500 text-center mt-3">Guardado localmente no teu dispositivo.</p>
          </div>
        </div>

      </section>
    </main>
  );
}