import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="relative w-full h-screen min-h-[650px] flex items-center justify-center overflow-hidden pt-20">
        
        <div className="absolute inset-0 z-0">
          <Image
            src="/FG2.jpg"
            alt="Equipa FISUMa"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/70"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto px-6 mt-8">
          <div className="mb-4 md:mb-6 flex flex-col items-center">
            <span className="text-[#63B3ED] text-xs md:text-sm font-bold tracking-[0.2em] uppercase drop-shadow-md">
              Núcleo de Estudantes de Física
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-5 md:mb-6 leading-tight drop-shadow-lg">
            Descobre o Universo <br className="hidden md:block" /> connosco na UMa.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 md:mb-12 max-w-2xl leading-relaxed drop-shadow-md font-medium">
            Promovemos a ciência, aproximamos os estudantes e construímos o
            futuro da Física na Universidade da Madeira. Do laboratório às estrelas e suas simulações.
          </p>

          {/* ESTILO DE BOTÕES COLADOS (Igual à Imagem 1) */}
          <div className="flex w-full sm:max-w-md mx-auto shadow-2xl">
            <a 
              href="/sobre" 
              className="flex-1 py-4 bg-black hover:bg-gray-900 text-white text-xs sm:text-sm uppercase font-bold tracking-widest rounded-none transition-colors text-center"
            >
              Saber Mais
            </a>
            <a 
              href="/calendario" 
              className="flex-1 py-4 bg-[#63B3ED] hover:bg-[#4A9EDB] text-white text-xs sm:text-sm uppercase font-bold tracking-widest rounded-none transition-colors text-center"
            >
              Calendário
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}