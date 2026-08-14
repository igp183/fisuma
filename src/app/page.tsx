import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen pt-32">
      
      {/* HERO SECTION */}
      <section className="flex-grow flex items-center justify-between max-w-7xl mx-auto w-full px-8 pb-20">
        
        {/* Left Column: Text & Buttons */}
        <div className="max-w-2xl z-10">
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Descobre o Universo connosco na UMa.
          </h1>
          
          <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
            Promovemos a ciência, aproximamos os estudantes e construímos o futuro da Física na Universidade da Madeira. Do laboratório às estrelas e suas simulações.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
              Explorar Projetos <span aria-hidden="true">→</span>
            </button>
            <button className="bg-transparent border border-slate-700 hover:border-slate-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Saber mais
            </button>
          </div>

          <div className="flex gap-6 text-xs font-mono text-slate-500">
            <p>📍 Funchal, 32.65° N, 16.98° W</p>
            <p>Alt: 274m (Campus da Penteada)</p>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="hidden lg:block w-1/2 relative opacity-90 hover:opacity-100 transition-opacity">
          <div className="aspect-video w-full rounded-2xl border border-white/10 overflow-hidden bg-slate-900/50 shadow-[0_0_100px_-20px_rgba(34,211,238,0.15)] relative">
            <Image 
              src="/black-hole.png" 
              alt="Simulação de Buraco Negro" 
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="w-full bg-[#03060D] border-t border-white/5 py-16">
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