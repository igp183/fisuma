"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;
  const isHomePage = pathname === "/";
  
  const showSolidBackground = scrolled || !isHomePage || isMobileMenuOpen;

  const links = [
    { name: "Sobre", path: "/sobre" },
    { name: "Calendário", path: "/calendario" },
    { name: "Projetos", path: "/projetos" },
    { name: "Equipa", path: "/equipa" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        showSolidBackground
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Como usamos "justify-between", o Logo fica à esquerda e os Menus à direita automaticamente */}
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-24 flex items-center justify-between relative">
        
        {/* LOGO ÚNICO (Esquerda em todos os ecrãs) */}
        <Link 
          href="/" 
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex hover:opacity-80 transition-opacity items-center"
        >
          {/* Tamanho responsivo: pequeno no telemóvel (w-36), maior em desktop */}
          <div className="relative w-36 h-10 md:w-52 md:h-14 lg:w-72 lg:h-20">
            <Image
              src="/logo1nbg.png"
              alt="FISUMa Logo"
              fill
              quality={100}
              className="object-contain object-left brightness-0 invert"
            />
          </div>
        </Link>

        {/* LINKS DESKTOP */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-white drop-shadow-md">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`relative pb-1 transition-colors hover:text-[#63B3ED] ${
                isActive(link.path) ? "text-white" : "text-gray-200"
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#63B3ED] rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* BOTÃO HAMBURGER / FECHAR (MOBILE) */}
        <button
          className="md:hidden text-white p-2 focus:outline-none z-50 relative ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* DROPDOWN MENU MOBILE */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "max-h-[500px] border-b border-slate-800/50 shadow-2xl" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`py-4 text-lg font-medium transition-colors border-b border-slate-800/50 last:border-none ${
                isActive(link.path) ? "text-[#63B3ED]" : "text-slate-200"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}