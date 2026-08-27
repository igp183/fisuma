import Image from "next/image";
import Link from "next/link";

export default function Sobre() {
  return (
    <main className="flex flex-col min-h-screen bg-slate-50">
      
      <section className="w-full bg-slate-900 pt-32 pb-8 px-6 flex justify-center">
         <div className="text-sm font-medium text-slate-400 font-sans tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">Homepage</Link>
            <span className="mx-3">/</span>
            <span className="text-white">Sobre</span>
         </div>
      </section>

      {/* Ajustei o py-16 para py-10 em mobile para não haver tanto espaço vazio em cima e em baixo */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 md:py-24">
        <div className="flex flex-col lg:flex-row items-stretch w-full bg-white shadow-xl">
          
          <div className="w-full lg:w-1/2 relative min-h-[250px] sm:min-h-[350px] lg:min-h-full">
            <Image
              src="/bgabout.jpg"
              alt="Sobre a FISUMa"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Mudei p-10 para p-6 em mobile para dar mais largura ao texto */}
          <div className="w-full lg:w-1/2 p-6 sm:p-10 md:p-16 flex flex-col justify-center">
            
            {/* Título: text-2xl em mobile, text-4xl em desktop */}
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6 leading-tight tracking-tight">
              Honramos o nosso passado e construímos o futuro da Física.
            </h2>
            
            {/* Parágrafo: text-sm em mobile, text-base em desktop */}
            <p className="text-sm md:text-base text-slate-600 font-medium mb-8 leading-relaxed">
              O FISUMa nasceu da iniciativa de estudantes movidos pela necessidade de criar 
              uma comunidade unida. Fundámos este núcleo para garantir que todos os alunos 
              tenham ferramentas, orientação e oportunidades reais para aplicar a física no mundo real.
            </p>

            <div className="flex flex-col gap-4 mb-8 md:mb-10">
              <Link href="/missao" className="text-[#63B3ED] hover:text-[#4A9EDB] font-bold text-sm transition-colors flex items-center gap-1">
                Conheça os nossos Objetivos <span className="text-lg leading-none">›</span>
              </Link>
            </div>

            <div>
              {/* Botão com w-full em telemóveis muito pequenos para ser mais fácil de clicar */}
              <Link 
                href="/calendario" 
                className="inline-block w-full sm:w-auto px-8 md:px-10 py-4 bg-[#63B3ED] hover:bg-[#4A9EDB] text-white text-xs md:text-sm uppercase font-bold tracking-widest rounded-none transition-all text-center"
              >
                Ver Calendário
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}