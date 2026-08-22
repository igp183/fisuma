import Link from "next/link";

export default function Missao() {
  return (
    <main className="flex flex-col min-h-screen bg-slate-50">
      
      {/* HEADER MINIMALISTA (Breadcrumb) */}
      <section className="w-full bg-slate-900 pt-32 pb-8 px-6 flex justify-center">
         <div className="text-sm font-medium text-slate-400 font-sans tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">Homepage</Link>
            <span className="mx-3">/</span>
            <Link href="/sobre" className="hover:text-white transition-colors">Sobre</Link>
            <span className="mx-3">/</span>
            <span className="text-white">Missão</span>
         </div>
      </section>

      {/* SECÇÃO DE CONTEÚDO (Estilo Documento Institucional) */}
      <section className="max-w-5xl mx-auto w-full px-6 py-16 md:py-24">
        
        {/* CONTAINER BRANCO */}
        <div className="bg-white shadow-sm border border-slate-100 p-10 md:p-24">
          
          {/* TEXTO INTRODUTÓRIO CENTRADO */}
          <p className="text-xl md:text-2xl font-medium text-slate-800 italic leading-relaxed mb-10 text-center">
            A FISUMa visa desmistificar a ciência e promover o rigor académico, num quadro de inovação 
            e entreajuda, que contribua para o desenvolvimento e afirmação da Física na Madeira 
            e no país num mundo globalizado e dinâmico.
          </p>

          {/* LINHA SEPARADORA AZUL (Mais comprida e centrada) */}
          <div className="w-64 h-[3px] bg-[#63B3ED] mb-12 mx-auto"></div>

          {/* CORPO DO TEXTO */}
          <div className="text-slate-600 text-base md:text-lg leading-loose space-y-8 font-medium">
            
            <p className="text-center">
              O Núcleo de Estudantes prossegue a realização de atividades de divulgação científica, 
              promovendo a difusão e valorização social e económica do conhecimento e da inovação 
              tecnológica. Garante um apoio ao nível académico, nos seus aspetos teóricos, computacionais 
              e experimentais, procurando preparar os seus estudantes para os desafios da sociedade global 
              e da formação contínua, transmitindo-lhes competências técnicas avançadas.
            </p>

            <p>
              Pretende que todos os que nela se formem sejam cidadãos do mundo, criativos e empreendedores, 
              responsáveis e profissionais, tolerantes e atentos aos desafios tecnológicos duma sociedade 
              que se pretende sustentável. Para tal, a FISUMa promove e apoia ações, projetos laboratoriais 
              e programas que fomentem o espírito de iniciativa, incluindo o desenvolvimento de hardware, 
              software e simulações complexas.
            </p>

            <p>
              No plano da relação com o meio envolvente, o Núcleo colabora com a comunidade académica, 
              órgãos da Universidade da Madeira, escolas secundárias regionais e entidades parceiras, 
              assegurando a promoção do ensino superior e o entusiasmo pelas Ciências Exatas nas 
              futuras gerações.
            </p>

          </div>
          
        </div>

      </section>

    </main>
  );
}