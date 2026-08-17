import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col">
      
      {/* PARTNERS SECTION */}
      <section className="bg-[#0B1120] border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h4 className="text-slate-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            Entidades Parceiras & Apoios
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 text-slate-400 font-bold text-lg md:text-xl">
            <span className="hover:text-white transition-colors cursor-pointer">Universidade da Madeira</span>
            <span className="hover:text-white transition-colors cursor-pointer">AAUMa</span>
            <span className="hover:text-white transition-colors cursor-pointer">FCT - Física</span>
            <span className="hover:text-white transition-colors cursor-pointer">SPF - Soc. Portuguesa</span>
          </div>
        </div>
      </section>

      {/* MAIN FOOTER */}
      <section className="bg-[#050A15] py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            {/* Left Column: Brand */}
            <div className="col-span-1 md:col-span-5 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg border border-cyan-400 flex items-center justify-center bg-transparent">
                  <span className="text-cyan-400 font-bold text-lg">Φ</span>
                </div>
                <span className="text-white font-extrabold text-2xl tracking-wide">FISUMa</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Núcleo de Estudantes de Física da Universidade da Madeira. Promovendo a curiosidade e o rigor científico no topo do Atlântico.
              </p>
            </div>

            {/* Middle Column 1: Navigation */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
              <h4 className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Navegação</h4>
              <nav className="flex flex-col gap-4 text-slate-400 text-sm">
                <Link href="#sobre" className="hover:text-white transition-colors">Sobre Nós</Link>
                <Link href="#eventos" className="hover:text-white transition-colors">Eventos</Link>
                <Link href="#projetos" className="hover:text-white transition-colors">Projetos</Link>
                <Link href="#equipa" className="hover:text-white transition-colors">Equipa</Link>
              </nav>
            </div>

            {/* Middle Column 2: Contacts */}
            <div className="col-span-1 md:col-span-3 flex flex-col gap-6">
              <h4 className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Contactos</h4>
              <div className="flex flex-col gap-4 text-slate-400 text-sm">
                <a href="mailto:fisuma@mail.uma.pt" className="hover:text-white transition-colors">fisuma@mail.uma.pt</a>
                <p>Campus da Penteada, Funchal</p>
              </div>
            </div>

            {/* Right Column: Socials */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
              <h4 className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Redes Sociais</h4>
              <div className="flex flex-col gap-4 text-slate-400 text-sm">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>

          </div>

          {/* Copyright Divider */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-mono">
            {/* Uses JS to automatically get the current year so it's never outdated */}
            <p>© {new Date().getFullYear()} FISUMa · Todos os direitos reservados.</p>
            <p>Desenvolvido com paixão pela Física.</p>
          </div>
        </div>
      </section>
    </footer>
  );
}