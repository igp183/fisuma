"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  // This hook gets the current URL path (e.g., "/" or "/sobre")
  const pathname = usePathname();

  return (
    <nav className="w-full bg-[#050A15]/90 backdrop-blur-md border-b border-white/5 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
        
        {/* Left: Logo Area */}
        <Link href="/" className="flex items-center h-full hover:opacity-80 transition-opacity">
          <Image 
            src="/logo1nbg.png" 
            alt="FISUMa Logo" 
            width={800} 
            height={300} 
            quality={100}
            className="h-[88px] w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            priority
          />
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-300">
          
          {/* Sobre Link - Now Dynamic */}
          <div className="relative flex flex-col items-center">
            <Link 
              href="/sobre" 
              className={pathname === "/sobre" ? "text-white" : "hover:text-white transition-colors"}
            >
              Sobre
            </Link>
            {/* Only show the highlight if the URL is /sobre */}
            {pathname === "/sobre" && (
              <div className="absolute -bottom-9 w-6 h-[3px] bg-cyan-400 rounded-t-sm"></div>
            )}
          </div>

          {/* Calendário Link - Dynamic */}
          <div className="relative flex flex-col items-center">
            <Link 
              href="/calendario" 
              className={pathname === "/calendario" ? "text-white" : "hover:text-white transition-colors"}
            >
              Calendário
            </Link>
            {pathname === "/calendario" && (
              <div className="absolute -bottom-9 w-6 h-[3px] bg-cyan-400 rounded-t-sm"></div>
            )}
          </div>


          <Link href="/#projetos" className="hover:text-white transition-colors">Projetos</Link>
          <Link href="/#equipa" className="hover:text-white transition-colors">Equipa</Link>
          <Link href="/#contacto" className="hover:text-white transition-colors">Contacto</Link>
        </div>

        {/* Right: CTA Button */}
        <div>
          <button className="bg-[#3B82F6] hover:bg-blue-500 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]">
            Junta-te a nós <span aria-hidden="true">→</span>
          </button>
        </div>

      </div>
    </nav>
  );
}