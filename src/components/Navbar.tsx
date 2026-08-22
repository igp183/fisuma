"use client"; 

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;
  
  // NOVA REGRA: Fica com fundo escuro se fizermos scroll OU se não estivermos na Homepage
  const isHomePage = pathname === "/";
  const showSolidBackground = scrolled || !isHomePage;

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        showSolidBackground 
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg py-2" 
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
          <div className="relative w-52 h-14 md:w-72 md:h-20">
            <Image 
              src="/logo1nbg.png" 
              alt="FISUMa Logo" 
              fill
              quality={100}
              className="object-contain object-left brightness-0 invert"
            />
          </div>
        </Link>

        {/* LINKS CENTRAIS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-white drop-shadow-md">
          {[
            { name: "Sobre", path: "/sobre" },
            { name: "Calendário", path: "/calendario" },
            { name: "Projetos", path: "/projetos" },
            { name: "Equipa", path: "/equipa" },
            { name: "Contacto", path: "/contacto" },
          ].map((link) => (
            <Link 
              key={link.name} 
              href={link.path} 
              className={`relative pb-1 transition-colors hover:text-blue-300 ${
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

        {/* MENU MOBILE */}
        <button className="md:hidden text-white drop-shadow-md">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      </div>
    </nav>
  );
}