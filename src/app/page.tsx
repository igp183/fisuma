import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      
      {/* HERO SECTION - FULL BACKGROUND */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] w-full px-8 pt-32 pb-20 overflow-hidden text-center">
        
        {/* Background Image */}
        <div className="absolute inset-0 -z-20">
          <Image 
            src="/black-hole.png" 
            alt="Simulação de Buraco Negro" 
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        
        {/* Dark Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#050A15]/90 via-[#050A15]/60 to-[#050A15]"></div>

        {/* Centered Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-3 bg-[#0B1120]/80 border border-cyan-400/30 text-[#00E5FF] font-mono text-[13px] px-5 py-2 rounded-full mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(0,229,255,0.1)]">
            <Image 
              src="/logo-fisuma.png" 
              alt="FISUMa Logo" 
              width={16} 
              height={16} 
              className="w-4 h-4 object-contain opacity-80"
            />
            <span>nucleo_estudantes_fisica</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-lg">
            Descobre o Universo connosco na UMa.
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl drop-shadow-md">
            Promovemos a ciência, aproximamos os estudantes e construímos o futuro da Física na Universidade da Madeira. Do laboratório às estrelas e suas simulações.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-lg hover:scale-105 transform duration-200">
              Explorar Projetos <span aria-hidden="true">→</span>
            </button>
            <button className="bg-white/10 border border-white/20 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg">
              Saber mais
            </button>
          </div>

          {/* Location Bar */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-xs font-mono text-slate-300 bg-black/30 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
            <p>📍 Funchal, 32.65° N, 16.98° W</p>
            <p>Alt: 274m (Campus da Penteada)</p>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="w-full bg-[#03060D] border-t border-white/5 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-cyan-400 mb-2">2026</h3>
            <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Ano de Fundação</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-cyan-400 mb-2">6</h3>
            <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Membros Ativos</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-cyan-400 mb-2">1</h3>
            <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Eventos Realizados</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-cyan-400 mb-2">100%</h3>
            <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Curiosidade Científica</p>
          </div>
        </div>
      </section>

    </main>
  );
}