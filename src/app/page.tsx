import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <Image
            src="/FG2.jpg"
            alt="Equipa FISUMa"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6 mt-16">
          <div className="mb-6 flex flex-col items-center">
            <span className="text-[#63B3ED] text-sm font-bold tracking-[0.2em] uppercase drop-shadow-md">
              Núcleo de Estudantes de Física
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-lg">
            Descobre o Universo <br className="hidden md:block" /> connosco na UMa.
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl leading-relaxed drop-shadow-md font-medium">
            Promovemos a ciência, aproximamos os estudantes e construímos o
            futuro da Física na Universidade da Madeira. Do laboratório às estrelas e suas simulações.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            
            {/* BOTÃO ATUALIZADO: Agora aponta para /calendario */}
            <a 
              href="/calendario" 
              className="px-10 py-4 bg-[#63B3ED] hover:bg-[#4A9EDB] text-white text-sm uppercase font-bold tracking-widest rounded-none transition-all text-center"
            >
              Explorar Calendário
            </a>
            
            <a 
              href="/sobre" 
              className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/40 text-sm uppercase font-bold tracking-widest backdrop-blur-sm rounded-none transition-all text-center"
            >
              Saber Mais
            </a>
            
          </div>
        </div>
      </section>
    </main>
  );
}