// src/components/Topbar.tsx
"use client";

import { Phone, ChevronRight, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

const SOCIAL_LINKS = [
  { key: "facebook", url: "https://www.facebook.com/AVSforma", icon: FaFacebookF },
  { key: "instagram", url: "https://www.instagram.com/herglaformaavs/", icon: FaInstagram },
  { key: "linkedin", url: "https://www.linkedin.com/company/avstunisiagroup/posts/?feedView=all", icon: FaLinkedinIn },
  { key: "youtube", url: "https://www.youtube.com/@AVSTunisia", icon: FaYoutube },
  { key: "tiktok", url: "https://www.tiktok.com/@avstunisia_herglaforma", icon: FaTiktok },
  { key: "twitter", url: "https://x.com/AvsForma", icon: FaXTwitter },
];

export default function Topbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#59cde9] via-[#3b8bc4] to-[#0a2a88] text-white shadow-lg shadow-blue-500/20 h-10">
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

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative flex flex-wrap justify-between items-center h-full z-10">
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