import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Carregamos a fonte Inter
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FISUMa | Núcleo de Estudantes de Física",
  description: "Descobre o Universo connosco na UMa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="scroll-smooth">
      {/* O inter.className garante que o Inter é usado em todo o site */}
      <body className={`${inter.className} flex flex-col min-h-screen bg-slate-50 text-slate-800`}>
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}