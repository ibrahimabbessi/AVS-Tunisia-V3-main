// app/components/FirmaNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Phone, ChevronRight, MapPin, Briefcase } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

// Topbar component integrated inside Navbar (same as candidat)
function Topbar() {
  const SOCIAL_LINKS = [
    { key: "facebook", url: "https://www.facebook.com/AVSforma", icon: FaFacebookF },
    { key: "instagram", url: "https://www.instagram.com/herglaformaavs/", icon: FaInstagram },
    { key: "linkedin", url: "https://www.linkedin.com/company/avstunisiagroup/posts/?feedView=all", icon: FaLinkedinIn },
    { key: "youtube", url: "https://www.youtube.com/@AVSTunisia", icon: FaYoutube },
    { key: "tiktok", url: "https://www.tiktok.com/@avstunisia_herglaforma", icon: FaTiktok },
    { key: "twitter", url: "https://x.com/AvsForma", icon: FaXTwitter },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-[#59cde9] via-[#3b8bc4] to-[#0a2a88] text-white shadow-lg shadow-blue-500/20 h-10">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
        }} />
      </div>

      {/* Subtle animated line at bottom */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative flex flex-wrap justify-between items-center h-full z-10">
        {/* Left section - Contact info */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          {/* Location */}
          <span className="flex items-center gap-1.5 text-xs text-white/90 group cursor-default">
            <span className="p-1 rounded-full bg-white/15 group-hover:bg-white/25 transition-all duration-300 group-hover:scale-110">
              <MapPin className="h-3 w-3 text-white/80 group-hover:text-white transition-colors" />
            </span>
            <span className="relative">
              Ave. Habib Bourguiba, Hergla 4012
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white/60 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </span>
          
          <div className="hidden sm:block w-px h-3 bg-white/30"></div>
          
          <a
            href="tel:+21699658637"
            className="flex items-center gap-1.5 text-xs text-white/90 hover:text-white transition-all duration-300 group"
          >
            <span className="p-1 rounded-full bg-white/15 group-hover:bg-white/25 transition-all duration-300 group-hover:scale-110">
              <Phone className="h-3 w-3 text-white/80 group-hover:text-white transition-colors" />
            </span>
            <span className="relative">
              99 658 637
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white/60 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </a>
          
          <div className="hidden sm:block w-px h-3 bg-white/30"></div>
          
          <a
            href="tel:+21673251010"
            className="flex items-center gap-1.5 text-xs text-white/90 hover:text-white transition-all duration-300 group"
          >
            <span className="p-1 rounded-full bg-white/15 group-hover:bg-white/25 transition-all duration-300 group-hover:scale-110">
              <Phone className="h-3 w-3 text-white/80 group-hover:text-white transition-colors" />
            </span>
            <span className="relative">
              73 251 010
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white/60 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </a>
        </div>

        {/* Right section - Social icons */}
        <div className="flex items-center gap-1.5">
          {/* Status indicator */}
          <div className="hidden sm:flex items-center gap-2 mr-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
            </span>
            <span className="text-[10px] text-white/70 hidden md:inline">En ligne</span>
          </div>
          
          <div className="w-px h-4 bg-white/30 hidden sm:block"></div>
          
          {SOCIAL_LINKS.map(({ key, url, icon: Icon }) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={key}
              className="relative group p-1 rounded-full bg-white/10 hover:bg-white/25 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20"
            >
              <Icon className="h-3 w-3 text-white/80 group-hover:text-white transition-all duration-300" />
              
              {/* Tooltip */}
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] bg-black/70 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
            </a>
          ))}
          
          <div className="w-px h-3 bg-white/30 mx-1 animate-pulse"></div>
          
          {/* Quick action button */}
          <a
            href="/contact"
            className="hidden sm:flex items-center gap-1 text-[10px] font-medium text-white/90 hover:text-white bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10"
          >
            Contact
            <ChevronRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" />
          </a>
          
        </div>
      </div>
    </div>
  );
}

export default function FirmaNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangSelectorOpen, setIsLangSelectorOpen] = useState(false);

  // Base path for company section
  const BASE_PATH = "/company";

  // Helper function to create paths
  const createPath = (path: string) => {
    if (path === "/") return BASE_PATH;
    if (path.startsWith("/")) return `${BASE_PATH}${path}`;
    return `${BASE_PATH}/${path}`;
  };

  // Company navigation items - French version
  const companyNavItems = [
    { 
      name: "Pourquoi AVS ?", 
      href: "/", 
      description: "Votre partenaire pour les talents"
    },
    { 
      name: "Notre Modèle", 
      href: "/notre-modele", 
      description: "Comment fonctionne la collaboration"
    },
    { 
      name: "Nos Succès", 
      href: "/nos-succes", 
      description: "Des partenariats réussis"
    },
    { 
      name: "Opportunités", 
      href: "/opportunites", 
      description: "Ce qui vous attend"
    },
    { 
      name: "Cadre Juridique & Sécurité", 
      href: "/cadre-juridique-securite", 
      description: "Conformité et protection des données"
    },
    { 
      name: "Coûts & Investissement", 
      href: "/couts-investissement", 
      description: "Transparence financière"
    },
  ];

  const languages = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
  ];

  // Function to check if a nav item is active
  const isNavItemActive = (itemHref: string) => {
    // Exact match for the base path
    if (itemHref === BASE_PATH) {
      return pathname === BASE_PATH;
    }
    // For other paths, check if the pathname starts with the item href
    // But ensure it's not just a partial match (e.g., /company/unser-modell should not match /company/unser)
    return pathname.startsWith(itemHref + '/') || pathname === itemHref;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Topbar integrated */}
      <Topbar />
      
      {/* Main Navbar */}
      <div className="bg-white/70 backdrop-blur-md border-b border-outline-variant/30 shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center h-20 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Link
              href={"/"}
              className="font-headline-md text-headline-md font-display-lg text-primary tracking-tight"
            >
              AVS Tunisia
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-secondary/10 text-secondary text-[10px] font-semibold rounded-full border border-secondary/20">
              <Briefcase className="h-3 w-3" />
              Entreprises
            </span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 font-label-md text-label-md h-full">
            {companyNavItems.map((item) => {
              const itemHref = createPath(item.href);
              const isActive = isNavItemActive(itemHref);

              return (
                <li key={item.href} className="h-full flex items-center relative group">
                  <Link
                    href={itemHref}
                    className={`transition-all duration-300 px-3 py-2 rounded-md text-xs ${
                      isActive
                        ? "text-secondary border-b-2 border-secondary font-bold"
                        : "text-on-surface-variant hover:text-secondary hover:bg-surface-container-low"
                    }`}
                  >
                    {item.name}
                  </Link>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
                      {item.description}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangSelectorOpen(!isLangSelectorOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-outline-variant/30 hover:bg-surface-container-low transition-colors"
              >
                <span className="text-xs">🌐</span>
                <span className="font-label-md text-label-md text-on-surface-variant text-[10px] uppercase">FR</span>
                <svg 
                  className={`w-3.5 h-3.5 text-on-surface-variant transition-transform duration-200 ${isLangSelectorOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLangSelectorOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-outline-variant/30 py-1.5">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setIsLangSelectorOpen(false);
                        // Handle language change here
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-2 text-xs transition-colors hover:bg-secondary/10 hover:text-secondary"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Connexion Button 
            <Link
              href={createPath("/connexion")}
              className="font-label-md text-label-md bg-transparent border-[1.5px] border-secondary text-secondary hover:bg-secondary/5 px-5 py-2 rounded-lg transition-colors duration-300 text-[10px]"
            >
              Connexion
            </Link>
            */}
            {/* CTA Button */}
            <Link
              href={createPath("/contact")}
              className="font-label-md text-label-md bg-brand-imperial text-white hover:bg-brand-imperial/90 px-5 py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02] glass-highlight text-[10px]"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setIsDropdownOpen(false);
              setIsLangSelectorOpen(false);
            }}
            className="md:hidden text-primary p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white/95 border-b border-outline-variant/30 backdrop-blur-md px-4 py-4 space-y-3">
            {/* Mobile Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/5 rounded-lg border border-secondary/10">
              <Briefcase className="h-4 w-4 text-secondary" />
              <span className="text-sm font-semibold text-secondary">Entreprises</span>
            </div>

            <ul className="space-y-2">
              {companyNavItems.map((item) => {
                const itemHref = createPath(item.href);
                const isActive = isNavItemActive(itemHref);

                return (
                  <li key={item.href}>
                    <Link
                      href={itemHref}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg transition-all text-xs ${
                        isActive
                          ? "bg-secondary/10 text-secondary font-bold"
                          : "text-on-surface hover:bg-surface-container-low"
                      }`}
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-[10px] text-on-surface-variant">
                        {item.description}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile - Language Selector */}
            <div className="pt-2 border-t border-outline-variant/30">
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      // Handle language change here
                    }}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-outline-variant/30 hover:bg-surface-container-low transition-colors text-xs"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-2 pt-2 border-t border-outline-variant/30">
              <Link
                href={createPath("/connexion")}
                onClick={() => setIsOpen(false)}
                className="text-center font-label-md text-label-md bg-transparent border-[1.5px] border-secondary text-secondary hover:bg-secondary/5 py-2.5 rounded-lg transition-colors text-xs"
              >
                Connexion
              </Link>
              <Link
                href={createPath("/contact")}
                onClick={() => setIsOpen(false)}
                className="text-center font-label-md text-label-md bg-brand-imperial text-white hover:bg-brand-imperial/90 py-2.5 rounded-lg transition-all text-xs"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}