import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col bg-white text-slate-700">
      
      {/* SECÇÃO PARCEIROS */}
      <section className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h4 className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            Entidades Parceiras & Apoios
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 text-slate-600 font-bold text-lg md:text-xl">
            <span className="hover:text-[#63B3ED] transition-colors cursor-pointer">Universidade da Madeira</span>
            <span className="hover:text-[#63B3ED] transition-colors cursor-pointer">AAUMa</span>
            <span className="hover:text-[#63B3ED] transition-colors cursor-pointer">FCT - Física</span>
            <span className="hover:text-[#63B3ED] transition-colors cursor-pointer">SPF - Soc. Portuguesa</span>
          </div>
        </div>
      </section>

      {/* FOOTER PRINCIPAL */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            {/* Coluna Esquerda: Marca */}
            <div className="col-span-1 md:col-span-5 flex flex-col gap-6">
              <Link href="/" className="inline-block hover:opacity-80 transition-opacity w-fit -ml-2">
                <Image 
                  src="/logo2nbg.png" 
                  alt="FISUMa Logo" 
                  width={800} 
                  height={300}
                  quality={100}
                  className="h-20 md:h-24 w-auto object-contain" 
                />
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Núcleo de Estudantes de Física da Universidade da Madeira. Promovendo a curiosidade e o rigor científico no topo do Atlântico.
              </p>
            </div>

            {/* Coluna Meio 1: Navegação */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
              <h4 className="text-[#63B3ED] text-xs font-bold tracking-widest uppercase">Navegação</h4>
              <nav className="flex flex-col gap-4 text-slate-600 text-sm">
                <Link href="/sobre" className="hover:text-[#63B3ED] transition-colors">Sobre Nós</Link>
                <Link href="/calendario" className="hover:text-[#63B3ED] transition-colors">Calendário</Link>
                <Link href="/#projetos" className="hover:text-[#63B3ED] transition-colors">Projetos</Link>
                <Link href="/#equipa" className="hover:text-[#63B3ED] transition-colors">Equipa</Link>
              </nav>
            </div>

            {/* Coluna Meio 2: Contactos */}
            <div className="col-span-1 md:col-span-3 flex flex-col gap-6">
              <h4 className="text-[#63B3ED] text-xs font-bold tracking-widest uppercase">Contactos</h4>
              <div className="flex flex-col gap-4 text-slate-600 text-sm">
                <a href="mailto:fisuma@mail.uma.pt" className="hover:text-[#63B3ED] transition-colors">fisuma@mail.uma.pt</a>
                <p>Campus da Penteada, Funchal</p>
              </div>
            </div>

            {/* Coluna Direita: Redes Sociais */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
              <h4 className="text-[#63B3ED] text-xs font-bold tracking-widest uppercase">Redes Sociais</h4>
              <div className="flex flex-col gap-4 text-slate-600 text-sm">
                <a href="#" className="hover:text-[#63B3ED] transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#63B3ED] transition-colors">Facebook</a>
                <a href="#" className="hover:text-[#63B3ED] transition-colors">LinkedIn</a>
              </div>
            </div>

          </div>

          {/* Divisória de Copyright */}
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-mono">
            <p>© {new Date().getFullYear()} FISUMa · Todos os direitos reservados.</p>
            <p>Desenvolvido com paixão pela Física.</p>
          </div>
        </div>
      </section>
    </footer>
  );
}