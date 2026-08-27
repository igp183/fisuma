"use client";

import Link from "next/link";
// import Image from "next/image"; // Descomenta quando tiveres as fotos
import { useState } from "react";

// Definimos o tipo de dados para um membro da equipa
interface TeamMember {
  name: string;
  role: string;
  description: string;
}

export default function Equipa() {
  // Estado para controlar qual o membro que está selecionado no modal
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Array com os dados da equipa, agora com a propriedade "description"
  const team: TeamMember[] = [
    { 
      name: "Sérgio Oliveira", 
      role: "Co-fundador",
      description: "Estudante do 2º ano de Engenharia Física e Computacional na UMa. É um apaixonado por computação e mecânica quântica, criptografia e exploração aeroespacial. Desenvolve ativamente projetos de software e integra a sua visão tecnológica na liderança do núcleo."
    },
    { 
      name: "Ivan Pestana", 
      role: "Co-fundador",
      description: "Movido pela curiosidade científica, o Ivan foca-se em aplicar os princípios fundamentais da física na resolução de problemas práticos. Tem um papel crucial na organização interna e na definição da estratégia a longo prazo do FISUMa."
    },
    { 
      name: "Henrique Nóbrega", 
      role: "Co-fundador",
      description: "Com um forte interesse pela área da investigação e simulação de sistemas físicos, o Henrique dedica-se a aproximar os alunos das oportunidades de laboratório e projetos académicos dentro da Universidade da Madeira."
    },
    { 
      name: "Allen", 
      role: "Co-fundador",
      description: "O Allen destaca-se pela sua capacidade de comunicação de ciência e espírito de equipa. O seu principal foco é garantir que o núcleo serve como uma ponte sólida entre a teoria aprendida nas aulas e a comunidade."
    },
    { 
      name: "Pablo", 
      role: "Co-fundador",
      description: "Focado na componente computacional e de análise de dados da Física, o Pablo traz uma perspetiva analítica essencial para a gestão dos projetos tecnológicos e parcerias do núcleo estudantil."
    },
    { 
      name: "Diogo Silva", 
      role: "Co-fundador",
      description: "Entusiasta pela instrumentação e desenvolvimento de hardware, o Diogo é um pilar na organização de workshops e atividades práticas que permitem aos alunos pôr a mão na massa."
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 relative">
      
      {/* MODAL / POPUP DE DESCRIÇÃO */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedMember(null)} // Fecha ao clicar no fundo escuro
        >
          {/* Caixa do Modal */}
          <div 
            className="bg-white w-full max-w-2xl shadow-2xl flex flex-col md:flex-row rounded-none overflow-hidden relative border border-slate-200"
            onClick={(e) => e.stopPropagation()} // Impede que clicar dentro da caixa feche o modal
          >
            {/* Botão Fechar */}
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Placeholder de Foto no Modal */}
            <div className="w-full md:w-2/5 bg-slate-100 min-h-[250px] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
               <svg className="w-12 h-12 opacity-30 text-slate-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
            </div>

            {/* Conteúdo de Texto no Modal */}
            <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{selectedMember.name}</h3>
              <p className="text-[#63B3ED] text-xs font-black uppercase tracking-widest mb-6">
                {selectedMember.role}
              </p>
              <div className="w-8 h-1 bg-slate-200 mb-6"></div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {selectedMember.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cabeçalho Escuro (Breadcrumbs) */}
      <section className="w-full bg-slate-900 pt-32 pb-8 px-6 flex justify-center">
         <div className="text-sm font-medium text-slate-400 font-sans tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">Homepage</Link>
            <span className="mx-3">/</span>
            <span className="text-white">Equipa</span>
         </div>
      </section>

      {/* Secção Principal: Grelha da Equipa */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 md:py-24">
        
        <div className="mb-12 md:mb-20 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            A Nossa Equipa
          </h1>
          <div className="w-16 h-1 bg-[#63B3ED] mb-6"></div>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
            Conhece os fundadores do FISUMa. Uma equipa de estudantes unidos pela paixão à Física 
            e pelo compromisso de construir uma comunidade mais forte e preparada para o futuro.
          </p>
        </div>

        {/* Grelha de Membros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {team.map((member, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedMember(member)} // Abre o Modal ao clicar
              className="bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col rounded-none cursor-pointer hover:-translate-y-1"
            >
              
              {/* Espaço para a Fotografia (Placeholder) */}
              <div className="w-full aspect-[4/5] bg-slate-100 relative overflow-hidden flex items-center justify-center border-b border-slate-200">
                <div className="text-slate-400 flex flex-col items-center gap-2 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-12 h-12 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase opacity-70">Ver Perfil</span>
                </div>
              </div>

              {/* Informação do Membro */}
              <div className="p-6 md:p-8 text-center flex flex-col items-center bg-white relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1 group-hover:text-[#63B3ED] transition-colors">
                  {member.name}
                </h3>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">
                  {member.role}
                </p>
              </div>

            </div>
          ))}
        </div>

      </section>
    </main>
  );
}