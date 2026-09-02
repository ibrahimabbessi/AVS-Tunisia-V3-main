// app/company/layout.tsx
"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Building2 } from "lucide-react";
import FirmaNav from "@/components/FirmaNav";

interface CompanyLayoutProps {
  children: ReactNode;
}

export default function CompanyLayout({ children }: CompanyLayoutProps) {
  const pathname = usePathname();

  const breadcrumbItems = [
    { name: "Accueil", href: "/" },
    { name: "Entreprises", href: "/company" },
  ];

  const getCurrentPageName = () => {
    if (pathname === "/company") return "Pourquoi AVS TUNISIA ?";
    if (pathname.includes("/unser-modell")) return "Notre Modèle";
    if (pathname.includes("/unsere-erfolge")) return "Nos Succès";
    if (pathname.includes("/chancen-anforderungen")) return "Opportunités & Exigences";
    if (pathname.includes("/kontakt-beratung")) return "Contact & Conseil";
    return "";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* FirmaNav - Company-specific navbar */}
      <FirmaNav />
      
      {/* Hero Section with Gradient */}
      <div className="relative bg-gradient-to-r from-[#0a2a88] via-[#3b8bc4] to-[#59cde9] text-white pt-[120px]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
          }} />
        </div>
        {/*
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 glass-highlight">
              <Building2 className="h-4 w-4" />
              <span className="font-caption text-white/90 uppercase tracking-wider">Entreprises</span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-white mb-4">
              Votre partenaire pour <span className="text-[#59cde9]">des talents qualifiés</span> de Tunisie
            </h1>
            <p className="font-body-lg text-white/80 max-w-3xl">
              Nous mettons en relation les entreprises allemandes avec des talents tunisiens motivés et parfaitement formés.
            </p>
          </div>
        </div>
        */}
      </div>



      {/* Main Content - No sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {children}
      </div>
    </div>
  );
}