import Link from "next/link";
// import Image from "next/image"; // Descomenta quando tiveres as imagens reais

export default function Projetos() {
  // Lista de projetos. Podes adicionar, remover ou editar facilmente aqui.
  const projects = [
    {
      title: "Plataforma Web FISUMa",
      description: "O portal oficial do núcleo de estudantes. Desenvolvido de raiz para integrar o calendário académico, gestão de lembretes e apresentação de projetos de forma dinâmica e escalável.",
      tech: ["React", "Next.js", "Tailwind CSS"],
      authors: "Sérgio Oliveira & Equipa",
      github: "https://github.com/teu-user/fisuma-web",
    },
    {
      title: "Simulação de Criptografia Quântica",
      description: "Projeto de investigação computacional focado na análise de protocolos de distribuição de chaves quânticas. Acompanha o livro técnico de 222 páginas desenvolvido em estágio.",
      tech: ["Python", "C++", "LaTeX"],
      authors: "Sérgio Oliveira",
      github: "https://github.com/teu-user/quantum-crypto",
    },
    {
      title: "Emulador Lógico de Hardware",
      description: "Sistema para simulação de hardware e deteção de sequências sem sobreposição de bits, garantindo alta precisão no processamento de sinais e arquitetura de computadores.",
      tech: ["Verilog", "C++"],
      authors: "Sérgio Oliveira, Henrique, Carlos e Tomás",
      github: "https://github.com/teu-user/hardware-emulator",
    },
    {
      title: "Motor de Dados Termodinâmicos",
      description: "API e framework backend desenvolvida para calcular mecânica estatística e processar conjuntos de dados termodinâmicos complexos para experiências laboratoriais avançadas.",
      tech: ["Python", "FastAPI", "PostgreSQL"],
      authors: "Equipa FISUMa",
      github: "https://github.com/teu-user/thermo-engine",
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Cabeçalho Escuro (Breadcrumbs) */}
      <section className="w-full bg-slate-900 pt-32 pb-8 px-6 flex justify-center">
         <div className="text-sm font-medium text-slate-400 font-sans tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">Homepage</Link>
            <span className="mx-3">/</span>
            <span className="text-white">Projetos</span>
         </div>
      </section>

      {/* Secção Principal: Lista de Projetos */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 md:py-24">
        
        {/* Título e Descrição */}
        <div className="mb-12 md:mb-20 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Os Nossos Projetos
          </h1>
          <div className="w-16 h-1 bg-[#63B3ED] mb-6"></div>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
            Explora o código e a investigação desenvolvida pelos membros do FISUMa. 
            Uma ponte direta entre o software, a física teórica e a comunidade open-source.
          </p>
        </div>

        {/* Grelha de Projetos (2 colunas em desktop, 1 em mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col rounded-none"
            >
              
              {/* Espaço para a Imagem do Projeto (Placeholder) */}
              <div className="w-full aspect-[16/9] bg-slate-100 relative overflow-hidden flex items-center justify-center border-b border-slate-200">
                <div className="text-slate-400 flex flex-col items-center gap-3 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-10 h-10 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span className="font-mono text-xs font-bold tracking-widest uppercase opacity-70">
                    [ Imagem {project.title} ]
                  </span>
                </div>

                {/* 
                  QUANDO TIVERES AS IMAGENS, DESCOMENTA ESTE BLOCO
                  <Image 
                    src={`/projetos/projeto-${index + 1}.jpg`} 
                    alt={`Imagem do ${project.title}`}
                    fill
                    className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                */}
              </div>

              {/* Informação do Projeto */}
              <div className="p-8 flex flex-col flex-grow relative z-10">
                
                {/* Título e Autores */}
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-[#63B3ED] transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest mb-4">
                  Por: {project.authors}
                </p>

                {/* Descrição */}
                <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tecnologias / Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Botão GitHub */}
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full flex items-center justify-center gap-2 py-4 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white text-xs uppercase font-bold tracking-widest rounded-none transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Ver no GitHub
                </a>

              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}