import Image from "next/image";

export default function Sobre() {
  return (
    <main className="flex flex-col min-h-screen pt-32 pb-20">
      
      {/* HEADER SECTION */}
      <section className="w-full max-w-4xl mx-auto px-8 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
          Sobre a <span className="text-cyan-400">FISUMa</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          O Núcleo de Estudantes de Física da Universidade da Madeira é o ponto de encontro para as mentes curiosas que querem explorar o universo, desde as simulações computacionais até à observação do cosmos.
        </p>
      </section>

      {/* CONTENT SECTION */}
      <section className="w-full max-w-5xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Content */}
        <div className="flex flex-col gap-8 z-10">
          
          <div className="bg-[#0B1120]/50 border border-white/5 p-8 rounded-2xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-cyan-400">01.</span> A Nossa Missão
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Desmistificar a ciência e torná-la acessível. Queremos proporcionar aos estudantes experiências práticas em laboratório, desenvolvimento de projetos tecnológicos e uma forte rede de apoio académico que complemente a teoria lecionada nos anfiteatros.
            </p>
          </div>

          <div className="bg-[#0B1120]/50 border border-white/5 p-8 rounded-2xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-cyan-400">02.</span> A Nossa História
            </h2>
            <p className="text-slate-400 leading-relaxed">
              O FISUMa nasceu da iniciativa de estudantes da licenciatura em Engenharia Física e Computacional. Movidos pela necessidade de criar uma comunidade unida, fundámos este núcleo para garantir que todos os alunos tenham ferramentas, orientação e oportunidades para aplicar a física no mundo real.
            </p>
          </div>

        </div>

        {/* Right: Image / Visual */}
        <div className="relative w-full aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_-15px_rgba(0,229,255,0.15)]">
          {/* You can replace 'black-hole.png' with a photo of your team or lab later! */}
          <Image 
            src="/black-hole.png" 
            alt="Equipa do FISUMa" 
            fill
            className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
          />
          {/* Decorative Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A15] via-transparent to-transparent"></div>
        </div>
        
      </section>

    </main>
  );
}