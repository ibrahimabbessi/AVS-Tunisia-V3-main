"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Phone, ChevronRight, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

// ============ TYPE DEFINITIONS ============
type DropdownItem = {
  name: string;
  href: string;
  hasSubmenu?: boolean;
};

type NavLink = {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownKey?: string;
};

type SocialLink = {
  key: string;
  url: string;
  icon: React.ElementType;
};

type Language = {
  code: string;
  label: string;
  flag: string;
};

// ============ TOPBAR COMPONENT ============
function Topbar() {
  const SOCIAL_LINKS: SocialLink[] = [
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

// ============ MAIN NAVBAR COMPONENT ============
export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAProposOpen, setIsAProposOpen] = useState(false);
  const [isHerglaFormaOpen, setIsHerglaFormaOpen] = useState(false);
  const [isIftGlobalOpen, setIsIftGlobalOpen] = useState(false);
  const [isLanguageSubmenuOpen, setIsLanguageSubmenuOpen] = useState(false);
  const [isLangSelectorOpen, setIsLangSelectorOpen] = useState(false);

  // Base path for candidat section
  const BASE_PATH = "/candidat";

  // Helper function to create paths with /candidat prefix
  const createPath = (path: string): string => {
    if (path === "/") return BASE_PATH;
    return `${BASE_PATH}${path}`;
  };

  // ============ NAVIGATION DATA ============
  const navLinks: NavLink[] = [
    { name: "Accueil", href: "/" },
    { name: "À Propos", href: "/a-propos", hasDropdown: true, dropdownKey: "aPropos" },
    { name: "Hergla Forma", href: "/hergla-forma", hasDropdown: true, dropdownKey: "herglaForma" },
    { name: "IFT Global", href: "/ift-global", hasDropdown: true, dropdownKey: "iftGlobal" },
    { name: "Care Forma", href: "/care-forma" },
    { name: "Contact", href: "/contact" },
  ];

  const aProposItems: DropdownItem[] = [
    { name: "Équipe", href: "/a-propos/equipe" },
    { name: "Projets Pilotes", href: "/a-propos/projets-pilotes" },
    { name: "Presse", href: "/a-propos/presse" },
    { name: "Galerie Vidéos", href: "/a-propos/galerie-videos" },
    { name: "Success Stories", href: "/a-propos/success-stories" },
  ];

  const herglaFormaItems: DropdownItem[] = [
    { 
      name: "Contenu des cours d'allemand", 
      href: "/hergla-forma/contenu-cours-allemand",
      hasSubmenu: true,
    },
    { name: "Formation initiale", href: "/hergla-forma/formation-initiale" },
    { name: "Formation continue", href: "/hergla-forma/formation-continue" },
    { name: "Formation E-learning", href: "/hergla-forma/formation-e-learning" },
    { name: "Formation en language", href: "/hergla-forma/formation-en-langue" },
  ];

  const iftGlobalItems: DropdownItem[] = [
    { name: "Notre démarche", href: "/ift-global/notre-demarche" },
    { name: "Offre d'emploi", href: "/ift-global/offre-emploi" },
    { name: "Formations professionnelles", href: "/ift-global/formations-professionnelles" },
  ];

  const languageSubmenuItems: DropdownItem[] = [
    { name: "A1", href: "/hergla-forma/contenu-cours-allemand/a1" },
    { name: "A2", href: "/hergla-forma/contenu-cours-allemand/a2" },
    { name: "B1", href: "/hergla-forma/contenu-cours-allemand/b1" },
    { name: "B2", href: "/hergla-forma/contenu-cours-allemand/b2" },
  ];

  const languages: Language[] = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
  ];

  // ============ RENDER ============
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Topbar integrated */}
      <Topbar />
      
      {/* Main Navbar */}
      <div className="bg-white/70 backdrop-blur-md border-b border-outline-variant/30 shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center h-20 px-4 md:px-6 max-w-7xl mx-auto">
          <Link
            href={"/"}
            className="font-headline-md text-headline-md font-display-lg text-primary tracking-tight"
          >
            AVS Tunisia
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 font-label-md text-label-md h-full">
            {navLinks.map((link) => {
              const linkHref = createPath(link.href);
              const isActive = pathname === linkHref || (linkHref !== BASE_PATH && pathname.startsWith(linkHref + '/'));

              if (link.hasDropdown) {
                const isDropdownOpen = link.dropdownKey === "aPropos" ? isAProposOpen : 
                              link.dropdownKey === "herglaForma" ? isHerglaFormaOpen : 
                              isIftGlobalOpen;
                const setIsDropdownOpen = link.dropdownKey === "aPropos" ? setIsAProposOpen : 
                                 link.dropdownKey === "herglaForma" ? setIsHerglaFormaOpen : 
                                 setIsIftGlobalOpen;
                const items = link.dropdownKey === "aPropos" ? aProposItems : 
                             link.dropdownKey === "herglaForma" ? herglaFormaItems : 
                             iftGlobalItems;
                const hasSubmenu = link.dropdownKey === "herglaForma";

                return (
                  <li 
                    key={link.href} 
                    className="h-full flex items-center relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => {
                      setIsDropdownOpen(false);
                      if (hasSubmenu) setIsLanguageSubmenuOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <Link
                        href={linkHref}
                        className={`transition-all duration-300 px-3 py-2 rounded-md text-xs ${
                          isActive
                            ? "text-secondary border-b-2 border-secondary font-bold"
                            : "text-on-surface-variant hover:text-secondary hover:bg-surface-container-low"
                        }`}
                      >
                        {link.name}
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDropdownOpen(!isDropdownOpen);
                        }}
                        className="p-1 hover:bg-surface-container-low rounded-md transition-colors"
                        aria-label="Toggle dropdown"
                      >
                        <svg 
                          className={`w-3.5 h-3.5 text-on-surface-variant transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-lg border border-outline-variant/30 py-1.5">
                        {items.map((item) => {
                          const itemHref = createPath(item.href);
                          const isItemActive = pathname === itemHref || pathname.startsWith(itemHref + '/');
                          
                          // Check if this item has a submenu
                          const itemHasSubmenu = hasSubmenu && 'hasSubmenu' in item && item.hasSubmenu === true;
                          
                          if (itemHasSubmenu) {
                            return (
                              <div key={item.href} className="relative">
                                <button
                                  onClick={() => setIsLanguageSubmenuOpen(!isLanguageSubmenuOpen)}
                                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors hover:bg-secondary/10 hover:text-secondary ${
                                    isItemActive ? "bg-secondary/10 text-secondary font-medium" : "text-on-surface"
                                  }`}
                                >
                                  <span>{item.name}</span>
                                  <svg 
                                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isLanguageSubmenuOpen ? 'rotate-90' : ''}`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                                {/* Nested Submenu */}
                                {isLanguageSubmenuOpen && (
                                  <div className="absolute left-full top-0 ml-1 w-44 bg-white rounded-lg shadow-lg border border-outline-variant/30 py-1.5">
                                    {languageSubmenuItems.map((subItem) => {
                                      const subItemHref = createPath(subItem.href);
                                      return (
                                        <Link
                                          key={subItem.href}
                                          href={subItemHref}
                                          className={`block px-3.5 py-2 text-xs transition-colors hover:bg-secondary/10 hover:text-secondary ${
                                            pathname === subItemHref ? "bg-secondary/10 text-secondary font-medium" : "text-on-surface"
                                          }`}
                                          onClick={() => {
                                            setIsDropdownOpen(false);
                                            setIsLanguageSubmenuOpen(false);
                                          }}
                                        >
                                          {subItem.name}
                                        </Link>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          }
                          
                          return (
                            <Link
                              key={item.href}
                              href={itemHref}
                              className={`block px-3.5 py-2 text-xs transition-colors hover:bg-secondary/10 hover:text-secondary ${
                                isItemActive ? "bg-secondary/10 text-secondary font-medium" : "text-on-surface"
                              }`}
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {item.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              }
              
              return (
                <li key={link.href} className="h-full flex items-center">
                  <Link
                    href={linkHref}
                    className={`transition-all duration-300 px-3 py-2 rounded-md text-xs ${
                      isActive
                        ? "text-secondary border-b-2 border-secondary font-bold"
                        : "text-on-surface-variant hover:text-secondary hover:bg-surface-container-low"
                    }`}
                  >
                    {link.name}
                  </Link>
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
            {/* Candidature Button */}
            <Link
              href={createPath("/candidature")}
              className="font-label-md text-label-md bg-brand-imperial text-white hover:bg-brand-imperial/90 px-5 py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02] glass-highlight text-[10px]"
            >
              Candidature
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setIsAProposOpen(false);
              setIsHerglaFormaOpen(false);
              setIsIftGlobalOpen(false);
              setIsLanguageSubmenuOpen(false);
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
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const linkHref = createPath(link.href);
                const isActive = pathname === linkHref || (linkHref !== BASE_PATH && pathname.startsWith(linkHref + '/'));
                
                if (link.hasDropdown) {
                  const isDropdownOpen = link.dropdownKey === "aPropos" ? isAProposOpen : 
                                        link.dropdownKey === "herglaForma" ? isHerglaFormaOpen : 
                                        isIftGlobalOpen;
                  const setIsDropdownOpen = link.dropdownKey === "aPropos" ? setIsAProposOpen : 
                                           link.dropdownKey === "herglaForma" ? setIsHerglaFormaOpen : 
                                           setIsIftGlobalOpen;
                  const items = link.dropdownKey === "aPropos" ? aProposItems : 
                               link.dropdownKey === "herglaForma" ? herglaFormaItems : 
                               iftGlobalItems;
                  const hasSubmenu = link.dropdownKey === "herglaForma";

                  return (
                    <li key={link.href}>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Link
                            href={linkHref}
                            onClick={() => setIsOpen(false)}
                            className={`flex-1 block px-4 py-2.5 rounded-lg transition-all text-xs ${
                              isActive
                                ? "bg-secondary/10 text-secondary font-bold"
                                : "text-on-surface hover:bg-surface-container-low"
                            }`}
                          >
                            {link.name}
                          </Link>
                          <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="p-2 hover:bg-surface-container-low rounded-lg transition-colors"
                          >
                            <svg 
                              className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        {isDropdownOpen && (
                          <div className="ml-4 space-y-1 border-l-2 border-secondary/20 pl-3">
                            {items.map((item) => {
                              const itemHref = createPath(item.href);
                              const isItemActive = pathname === itemHref || pathname.startsWith(itemHref + '/');
                              
                              // Check if this item has a submenu
                              const itemHasSubmenu = hasSubmenu && 'hasSubmenu' in item && item.hasSubmenu === true;
                              
                              if (itemHasSubmenu) {
                                return (
                                  <div key={item.href}>
                                    <button
                                      onClick={() => setIsLanguageSubmenuOpen(!isLanguageSubmenuOpen)}
                                      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-xs transition-all ${
                                        isItemActive
                                          ? "bg-secondary/10 text-secondary font-medium"
                                          : "text-on-surface hover:bg-surface-container-low"
                                      }`}
                                    >
                                      <span>{item.name}</span>
                                      <svg 
                                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isLanguageSubmenuOpen ? 'rotate-90' : ''}`}
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </button>
                                    {isLanguageSubmenuOpen && (
                                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-secondary/20 pl-3">
                                        {languageSubmenuItems.map((subItem) => {
                                          const subItemHref = createPath(subItem.href);
                                          return (
                                            <Link
                                              key={subItem.href}
                                              href={subItemHref}
                                              onClick={() => {
                                                setIsOpen(false);
                                                setIsLanguageSubmenuOpen(false);
                                              }}
                                              className={`block px-4 py-2 rounded-lg text-xs transition-all ${
                                                pathname === subItemHref
                                                  ? "bg-secondary/10 text-secondary font-medium"
                                                  : "text-on-surface hover:bg-surface-container-low"
                                              }`}
                                            >
                                              {subItem.name}
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                              
                              return (
                                <Link
                                  key={item.href}
                                  href={itemHref}
                                  onClick={() => {
                                    setIsOpen(false);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`block px-4 py-2 rounded-lg text-xs transition-all ${
                                    isItemActive
                                      ? "bg-secondary/10 text-secondary font-medium"
                                      : "text-on-surface hover:bg-surface-container-low"
                                  }`}
                                >
                                  {item.name}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                }
                
                return (
                  <li key={link.href}>
                    <Link
                      href={linkHref}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2.5 rounded-lg transition-all text-xs ${
                        isActive
                          ? "bg-secondary/10 text-secondary font-bold"
                          : "text-on-surface hover:bg-surface-container-low"
                      }`}
                    >
                      {link.name}
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
                href={createPath("/candidature")}
                onClick={() => setIsOpen(false)}
                className="text-center font-label-md text-label-md bg-brand-imperial text-white hover:bg-brand-imperial/90 py-2.5 rounded-lg transition-all text-xs"
              >
                Candidature en Ligne
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}