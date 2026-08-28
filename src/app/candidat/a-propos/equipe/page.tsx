"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import Topbar from "@/components/Topbar";

// Cloudinary helper
const CLOUDINARY_BASE = "https://res.cloudinary.com/girgi5fd/image/upload/";

const cloudinary = (path: string) => {
  return `${CLOUDINARY_BASE}${path}`;
};

const TEAM = [
  {
    name: "Ikbal Lamine",
    image: "v1786966061/Foto_Ikbal_Lamine.jpg",
    primaryRole: "Fondatrice & PDG",
    secondaryRoles: [
      "Fondatrice & Gérante AVS",
      "Coach International",
      "Consultante en Formation en Allemagne",
      "Experte en Médiation",
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/ikbal-lamine-avstunisia/",
      email: "mailto:ikbal.lamine@avstunisia.com",
    },
    experience: "15+ ans",
    languages: ["Français", "Arabe", "Anglais", "Allemand"],
    expertise: ["Fondatrice", "Coach International", "Consultante"],
    yearsOfExperience: "15+",
  },
  {
    name: "Mohamed Ben Said",
    image: "v1786966062/Foto_Mohamed_Ben_Said.jpg",
    primaryRole: "Teamleiter | Projektmanagement | International Recruiting",
    secondaryRoles: [
      "IFT Global Staffing & Consulting Services",
      "Skilled Workers & Apprentices Placement",
      "AVS Forma Bildungszentrum & Vermittlungsservice",
      "German Language • Training • Integration",
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/mohamed-ben-said-avstunisia/",
      email: "mailto:mohamed.bensaid@avstunisia.com",
    },
    experience: "8+ ans",
    languages: ["Français", "Arabe", "Anglais", "Allemand"],
    expertise: ["Team Leader", "Chef de Projet", "Coordination"],
    yearsOfExperience: "8+",
  },
  {
    name: "Ghazala Boussidia",
    image: "v1786966065/Foto_Ghzala_Boussadia.png",
    primaryRole: "Team Leader & Chef de Projet",
    secondaryRoles: [
      "Team Leader",
      "Chef de Projet",
      "Directrice Coordinatrice du Groupe",
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/ghazala-boussidia-avstunisia/",
      email: "mailto:ghazala.boussidia@avstunisia.com",
    },
    experience: "10+ ans",
    languages: ["Français", "Arabe", "Anglais", "Allemand"],
    expertise: ["Directeur Administratif", "Manager Financier", "Formateur"],
    yearsOfExperience: "10+",
  },
  {
    name: "Zaineb Ben Rajeb",
    image: "v1786966062/Foto_Zaineb_Ben_Rajeb.jpg",
    primaryRole: "Responsable Administrative",
    secondaryRoles: [
      "Gestion administrative",
      "Coordination des dossiers",
      "Suivi des candidatures",
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/zaineb-ben-rajeb-avstunisia/",
      email: "mailto:zaineb.benrajeb@avstunisia.com",
    },
    experience: "5+ ans",
    languages: ["Français", "Arabe", "Anglais"],
    expertise: ["Gestion administrative", "Coordination", "Suivi"],
    yearsOfExperience: "5+",
  },
];

// Team Member Card Component with Enhanced Flip - Homepage Style
function TeamMemberCard({ member, index }: { member: typeof TEAM[0], index: number }) {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const imageUrl = cloudinary(member.image);

  return (
    <div
      className="relative perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => {
        setIsFlipped(false);
      }}
    >
      <div
        className={`relative w-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ minHeight: "480px" }}
      >
        {/* Front Face - Homepage Style */}
        <div className="absolute inset-0 backface-hidden">
          <div className="h-full rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-8 text-center shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
            {/* Image with gradient overlay */}
            <div className="relative -mt-16 mb-4">
              <div className="relative inline-block">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-imperial/10 to-secondary/10 blur-xl opacity-50"></div>
                {!imgError ? (
                  <>
                    {isLoading && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-imperial/10 to-secondary/10 animate-pulse flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-brand-imperial/20 border-t-brand-imperial rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img
                      src={imageUrl}
                      alt={member.name}
                      className={`relative h-28 w-28 mx-auto rounded-full object-cover border-4 border-white shadow-lg transition-opacity duration-300 ${
                        isLoading ? 'opacity-0' : 'opacity-100'
                      }`}
                      onLoad={() => setIsLoading(false)}
                      onError={() => {
                        setIsLoading(false);
                        setImgError(true);
                      }}
                    />
                  </>
                ) : (
                  <div className="relative h-28 w-28 mx-auto rounded-full bg-gradient-to-br from-brand-imperial to-secondary flex items-center justify-center text-white font-display-lg text-3xl border-4 border-white shadow-lg">
                    {getInitials(member.name)}
                  </div>
                )}
                {/* Status indicator */}
                <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-400 border-2 border-white"></div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-headline-md text-primary text-lg">
                {member.name}
              </h3>
              <p className="font-label-md text-brand-imperial mt-1 text-sm">
                {member.primaryRole}
              </p>
              
              {/* Expertise tags */}
              <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                {member.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-brand-ice/50 text-brand-imperial rounded-full text-[10px] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Secondary roles */}
              <div className="mt-4 space-y-1">
                {member.secondaryRoles.slice(0, 3).map((role) => (
                  <p
                    key={role}
                    className="font-caption text-on-surface-variant text-xs leading-relaxed"
                  >
                    {role}
                  </p>
                ))}
              </div>

              {/* Experience indicator */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-xs text-on-surface-variant/60">⭐</span>
                <span className="text-xs text-on-surface-variant/60">
                  {member.yearsOfExperience} ans d'expérience
                </span>
              </div>

              {/* Languages */}
              <div className="mt-2 flex items-center justify-center gap-1.5">
                {member.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2 py-0.5 bg-surface-container-low rounded-full text-[9px] text-on-surface-variant/70"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Flip button */}
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="mt-4 w-full py-2.5 px-4 bg-brand-imperial/5 text-brand-imperial rounded-xl font-label-md text-xs hover:bg-brand-imperial/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">info</span>
              En savoir plus
            </button>
          </div>
        </div>

        {/* Back Face - Homepage Style */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="h-full rounded-2xl bg-gradient-to-br from-brand-imperial/5 via-surface-container-lowest to-secondary/5 border border-secondary/30 p-8 flex flex-col items-center justify-between shadow-lg">
            {/* Back content */}
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-imperial/10">
                  <span className="material-symbols-outlined text-3xl text-brand-imperial">
                    badge
                  </span>
                </div>
              </div>
              
              <h3 className="font-headline-md text-primary text-lg">
                {member.name}
              </h3>
              <p className="font-label-md text-brand-imperial text-sm mt-1">
                {member.primaryRole}
              </p>
              
              <div className="mt-4 space-y-2 text-left">
                {member.secondaryRoles.map((role) => (
                  <div key={role} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-brand-imperial text-[16px] mt-0.5">
                      check_circle
                    </span>
                    <span className="font-body-sm text-on-surface-variant text-xs">
                      {role}
                    </span>
                  </div>
                ))}
              </div>

              {/* Languages on back */}
              <div className="mt-4 pt-3 border-t border-outline-variant/20">
                <p className="font-caption text-on-surface-variant text-xs mb-2">Langues parlées</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {member.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 bg-brand-imperial/10 text-brand-imperial rounded-full text-xs font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="w-full">
              <div className="flex items-center justify-center gap-4">
                <a
                  href={member.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href={member.socialLinks.email}
                  className="p-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                </a>
                <button
                  onClick={() => setIsFlipped(false)}
                  className="p-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-brand-imperial/10 hover:text-brand-imperial transition-all duration-300 hover:scale-110"
                  aria-label="Retour"
                >
                  <span className="material-symbols-outlined text-[18px]">undo</span>
                </button>
              </div>
              <p className="text-center text-[10px] text-on-surface-variant/50 mt-3">
                Cliquez sur une icône pour contacter
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EquipePage() {
  return (
    <>
      <Topbar />
      <Navbar />
      
      {/* Hero Section - Homepage Style */}
      <section className="relative pt-40 pb-16 md:pt-48 md:pb-24 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-brand-imperial blur-3xl"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="flex-1 max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                  Notre Équipe
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                  AVS TUNISIA GROUP
                </span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                L'équipe de <br className="hidden sm:block" />
                <span className="text-secondary">AVS TUNISIA GROUP</span>
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed">
                L'équipe de AVS TUNISIA GROUP se caractérise par son ouverture, 
                sa communication efficace et sa volonté d'offrir une deuxième 
                chance aux apprenants et candidats en leur proposant des 
                opportunités de formation et de travail en Allemagne. Leur force 
                réside dans leur vaste expérience, leur expertise avérée et leur 
                habileté à trouver les meilleures occasions de formation 
                professionnelle et d'emploi en Allemagne pour leurs apprenants.
              </p>
            </div>

            {/* Right Image */}
            <div className="flex-1 max-w-md lg:max-w-lg">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-imperial/20 to-secondary/20 mix-blend-overlay"></div>
                <img
                  src="https://pratiquesrh.com/sites/default/files/styles/hero_tablet_1x/public/2025-02/team-building.jpg.webp?itok=86pKF7D-"
                  alt="Équipe AVS Tunisia Group"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='24' font-weight='bold'%3EÉquipe AVS%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-on-surface">Équipe d'exception</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg">
        
        {/* Team Grid - Same as Homepage */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Interactive hint - Same as Homepage */}
        <div className="mt-8 text-center">
          <p className="font-body-sm text-on-surface-variant/60 text-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">touch_app</span>
            Passez la souris sur les cartes ou cliquez sur &quot;En savoir plus&quot; pour découvrir l&apos;équipe
          </p>
        </div>

        {/* Trust indicators - Same as Homepage */}
        <div className="mt-12 pt-8 border-t border-outline-variant/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-brand-imperial">verified</span>
                <span className="font-label-md text-on-surface-variant text-xs">Experts certifiés</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-brand-imperial">diversity_3</span>
                <span className="font-label-md text-on-surface-variant text-xs">Équipe multidisciplinaire</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-brand-imperial">handshake</span>
                <span className="font-label-md text-on-surface-variant text-xs">Partenaires de confiance</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-brand-imperial">translate</span>
                <span className="font-label-md text-on-surface-variant text-xs">Français • Allemand • Anglais</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action - Same as Homepage but with gradient */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-brand-imperial to-brand-imperial/90 p-10 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="font-headline-lg text-white mb-3">
              Rejoignez l'aventure AVS TUNISIA GROUP
            </h2>
            <p className="font-body-md text-white/90 max-w-2xl mx-auto mb-8">
              Vous aussi, faites partie de notre communauté et bénéficiez de l'expertise de notre équipe pour réaliser vos projets en Allemagne.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/candidature"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-imperial rounded-xl font-label-md hover:bg-white/90 transition-all duration-300 hover:scale-[1.05] shadow-lg"
              >
                Postuler maintenant
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-xl font-label-md hover:bg-secondary/90 transition-all duration-300 hover:scale-[1.05] shadow-lg"
              >
                Contactez-nous
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}