import Link from "next/link";

export default function Contacto() {
  return (
    <main className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Cabeçalho Escuro (Breadcrumbs) */}
      <section className="w-full bg-slate-900 pt-32 pb-8 px-6 flex justify-center">
         <div className="text-sm font-medium text-slate-400 font-sans tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">Homepage</Link>
            <span className="mx-3">/</span>
            <span className="text-white">Contacto</span>
         </div>
      </section>

      {/* Secção Principal: Formulário e Barra Lateral */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 md:py-24">
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-12 text-center md:text-left tracking-tight">
          Contactos
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* COLUNA ESQUERDA: Formulário (Estilo Imagens 2 e 3) */}
          <div className="lg:col-span-2">
            <form className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label htmlFor="motivo" className="text-sm font-bold text-slate-700">Qual o motivo do seu contacto?</label>
                <select id="motivo" className="w-full border border-slate-300 px-4 py-3 text-sm bg-white text-slate-700 focus:outline-none focus:border-[#63B3ED] rounded-none shadow-sm">
                  <option>Geral</option>
                  <option>Dúvidas Académicas</option>
                  <option>Projetos / Parcerias</option>
                  <option>Eventos</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nome" className="text-sm font-bold text-slate-700">Nome completo *</label>
                  <input type="text" id="nome" required className="w-full border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:border-[#63B3ED] rounded-none shadow-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-slate-700">Email *</label>
                  <input type="email" id="email" required className="w-full border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:border-[#63B3ED] rounded-none shadow-sm" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="assunto" className="text-sm font-bold text-slate-700">Assunto *</label>
                <input type="text" id="assunto" required className="w-full border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:border-[#63B3ED] rounded-none shadow-sm" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="mensagem" className="text-sm font-bold text-slate-700">Mensagem *</label>
                <textarea id="mensagem" rows={6} required className="w-full border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:border-[#63B3ED] rounded-none shadow-sm resize-y"></textarea>
              </div>

              <div>
                <button type="submit" className="mt-4 px-8 py-4 bg-[#63B3ED] hover:bg-[#4A9EDB] text-white text-sm uppercase font-bold tracking-widest rounded-none transition-all shadow-sm">
                  Enviar Mensagem
                </button>
              </div>
            </form>
          </div>

          {/* COLUNA DIREITA: Informações (Estilo Imagens 2 e 3) */}
          <div className="flex flex-col gap-10 lg:pl-8 lg:border-l lg:border-slate-200 pt-4 lg:pt-0">
            
            <div>
              <h3 className="font-bold text-slate-900 mb-3 text-lg">Sede do FISUMa</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Campus Universitário da Penteada<br />
                9020-105 Funchal - Portugal
              </p>
              <p className="text-sm text-slate-500 mt-2">
                <span className="font-bold text-slate-700">Email:</span> geral.fisuma@mail.uma.pt
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-3 text-lg">Departamento de Física</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Gabinete de Apoio ao Estudante<br />
                Piso 0, Sala 14
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Redes Sociais</h3>
              <div className="flex gap-4">
                {/* Ícones placeholder (usando divs circulares para simular a imagem 3) */}
                <a href="#" className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 hover:text-[#63B3ED] hover:border-[#63B3ED] transition-colors">
                  <span className="text-xs font-bold">IG</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 hover:text-[#63B3ED] hover:border-[#63B3ED] transition-colors">
                  <span className="text-xs font-bold">IN</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 hover:text-[#63B3ED] hover:border-[#63B3ED] transition-colors">
                  <span className="text-xs font-bold">GH</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Secção Inferior: Localização e Mapa (Estilo Imagem 4) */}
      <section className="w-full bg-slate-200/50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Bloco de Texto (Esquerda) */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-slate-900">Como chegar até nós</h2>
              <div className="w-12 h-1 bg-[#63B3ED] mb-2"></div>
              <p className="text-slate-600 font-medium">Núcleo de Estudantes de Física da UMa</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Campus da Penteada<br />
                Caminho da Penteada<br />
                9020-105 Funchal
              </p>
              <a 
                href="https://www.google.com/maps/dir//Universidade+da+Madeira,+Caminho+da+Penteada,+9020-105+Funchal" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-[#63B3ED] hover:underline mt-2"
              >
                Ver direções no Google Maps ›
              </a>
            </div>

            {/* Mapa (Direita) - Usando Iframe Embed centrado no Funchal/UMa */}
            <div className="w-full h-64 md:h-80 bg-slate-300 shadow-inner relative overflow-hidden border border-slate-300">
              <iframe 
                title="Mapa do Campus da Penteada"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3387.616781035091!2d-16.9248!3d32.6588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605fe2374b62db%3A0xe54e64f26b5c00a6!2sUniversidade%20da%20Madeira!5e0!3m2!1spt-PT!2spt!4v1700000000000!5m2!1spt-PT!2spt" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0" 
              ></iframe>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}