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

      <section className="max-w-7xl mx-auto w-full px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-stretch w-full bg-white shadow-xl">
          
          <div className="w-full lg:w-1/2 relative min-h-[350px] lg:min-h-full">
            <Image
              src="/bgabout.jpg"
              alt="Sobre a FISUMa"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
              Honramos o nosso passado e construímos o futuro da Física.
            </h2>
            
            <p className="text-slate-600 font-medium mb-8 leading-relaxed">
              O FISUMa nasceu da iniciativa de estudantes movidos pela necessidade de criar 
              uma comunidade unida. Fundámos este núcleo para garantir que todos os alunos 
              tenham ferramentas, orientação e oportunidades reais para aplicar a física no mundo real.
            </p>

            <div className="flex flex-col gap-4 mb-10">
              <Link href="/missao" className="text-[#63B3ED] hover:text-[#4A9EDB] font-bold text-sm transition-colors flex items-center gap-1">
                Conheça os nossos Objetivos <span className="text-lg leading-none">›</span>
              </Link>
            </div>

            <div>
              {/* BOTÃO ATUALIZADO: Agora aponta para /calendario */}
              <Link 
                href="/calendario" 
                className="inline-block px-10 py-4 bg-[#63B3ED] hover:bg-[#4A9EDB] text-white text-sm uppercase font-bold tracking-widest rounded-none transition-all text-center"
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