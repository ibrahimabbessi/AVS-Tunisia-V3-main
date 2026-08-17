// src/app/hergla-forma/formation-continue/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

// Helper function to get Google Drive image URL
const getDriveImageUrl = (id: string) => {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
};

export default function FormationContinue() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section with Image */}
      <section className="relative pt-32 pb-8 md:pt-40 md:pb-8 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                  Hergla Forma
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                  Formation Continue
                </span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                Formation Continue
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed max-w-3xl">
                NOTRE OFFRE DE FORMATION CONTINUE
              </p>
              <p className="font-body-md text-on-surface-variant mt-2 leading-relaxed max-w-3xl">
                Un accompagnement complet pour former et perfectionner vos employés
              </p>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://i.pinimg.com/1200x/93/0d/c1/930dc1ac4570507ca25303a967e0cc2d.jpg"
                  alt="Formation Continue"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='24'%3EFormation%20Continue%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-imperial/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-md">
        
        {/* Key Services Grid - with images instead of icons */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card-hover rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm transition-all duration-300 overflow-hidden group">
            <div className="h-32 overflow-hidden">
              <img
                src="https://heitzsystem.com/wp-content/uploads/2020/01/assitance-shutterstock_1131985139-1.jpg"
                alt="Assistance technique"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='16'%3EAssistance%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-headline-md text-primary text-base">Assistance technique</h3>
              <p className="font-body-md text-on-surface-variant text-sm mt-1">Mise à niveau et expertise</p>
            </div>
          </div>

          <div className="card-hover rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm transition-all duration-300 overflow-hidden group">
            <div className="h-32 overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1uzf59N25nCfYSuhMYPEeHQ9ms8pbLN8cZu4s_Xta9j1-8ljzGqyPOS2u&s=10"
                alt="Formation TFP"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='16'%3ETFP%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-headline-md text-primary text-base">Formation TFP</h3>
              <p className="font-body-md text-on-surface-variant text-sm mt-1">Individuelle et collective</p>
            </div>
          </div>

          <div className="card-hover rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm transition-all duration-300 overflow-hidden group">
            <div className="h-32 overflow-hidden">
              <img
                src={getDriveImageUrl("1fiBdGNJ2zt7lx28ygS3qUe9CNh2qZN-R")}
                alt="Intra & Inter"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='16'%3EIntra%26Inter%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-headline-md text-primary text-base">Intra & Inter</h3>
              <p className="font-body-md text-on-surface-variant text-sm mt-1">Formation en entreprise</p>
            </div>
          </div>

          <div className="card-hover rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm transition-all duration-300 overflow-hidden group">
            <div className="h-32 overflow-hidden">
              <img
                src="https://www.lecoindesentrepreneurs.fr/wp-content/uploads/2019/11/pr%C3%A9parer-un-projet-de-cr%C3%A9ation-dentreprise.png"
                alt="Accompagnement"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='16'%3EAccompagnement%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-headline-md text-primary text-base">Accompagnement</h3>
              <p className="font-body-md text-on-surface-variant text-sm mt-1">Projets d'entreprise</p>
            </div>
          </div>
        </div>

        {/* Main Description */}
        <div className="mb-12 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <div className="rounded-full bg-brand-ice p-2.5">
                <span className="text-xl">💡</span>
              </div>
            </div>
            <div>
              <h2 className="font-headline-md text-brand-imperial mb-3">
                Expertise et assistance technique
              </h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                AVS HERGLA FORMA assure une formation continue de qualité proposée aux entreprises, 
                professionnels, salariés et aux demandeurs d'emploi en vue d'améliorer leurs compétences 
                ou d'acquérir de nouvelles connaissances professionnelles.
              </p>
              <p className="font-body-md text-on-surface-variant leading-relaxed mt-3">
                L'équipe AVS assure l'assistance et l'accompagnement dans le diagnostic des besoins en 
                formation, l'élaboration de plan de formation, la réalisation des actions de formation 
                et leur évaluation.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-imperial/10 flex items-center justify-center text-xl">
              📋
            </div>
            <h2 className="font-headline-lg text-brand-imperial">
              Nos services
            </h2>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="card-hover rounded-xl bg-surface-container-lowest p-6 border border-outline-variant/30 shadow-sm transition-all duration-300">
              <div className="mb-3 flex items-center gap-3">
                <span className="text-xl">📄</span>
                <h3 className="font-headline-md text-primary">Programme de formation</h3>
              </div>
              <p className="font-body-md text-on-surface-variant text-sm">
                Formation continue en inter et intra entreprise
              </p>
              <div className="mt-3 flex gap-3">
                <button className="inline-flex items-center gap-2 rounded-lg bg-brand-ice px-3 py-1.5 text-sm font-medium text-brand-imperial transition-colors hover:bg-brand-ice/70">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  PDF
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg bg-brand-ice px-3 py-1.5 text-sm font-medium text-brand-imperial transition-colors hover:bg-brand-ice/70">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  EPUB
                </button>
              </div>
            </div>

            <div className="card-hover rounded-xl bg-surface-container-lowest p-6 border border-outline-variant/30 shadow-sm transition-all duration-300">
              <div className="mb-3 flex items-center gap-3">
                <span className="text-xl">📊</span>
                <h3 className="font-headline-md text-primary">Diagnostic de Mise à Niveau</h3>
              </div>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Technique</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Commercial</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Financier</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Environnemental</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>SMI</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Énergétique</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Assistance Section */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-imperial to-brand-imperial/90 p-6 md:p-8 text-white shadow-lg">
          <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start md:gap-6">
            <div className="mb-4 md:mb-0">
              <div className="rounded-full bg-white/20 p-3">
                <span className="text-2xl">🛡️</span>
              </div>
            </div>
            <div>
              <h3 className="font-headline-md text-white mb-2">
                Assistance technique et accompagnement
              </h3>
              <p className="text-white/90 font-body-md leading-relaxed">
                Assistance technique et accompagnement lors de vos projets
              </p>
              <div className="mt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-brand-imperial rounded-lg font-label-md hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] shadow-lg"
                >
                  Contactez-nous
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-brand-imperial text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg text-center relative z-10">
          <h2 className="font-headline-lg text-white mb-4">
            Prêt à commencer votre parcours ?
          </h2>
          <p className="font-body-lg text-white/80 max-w-2xl mx-auto mb-8">
            Rejoignez-nous et bénéficiez d'un accompagnement personnalisé vers votre réussite professionnelle en Allemagne
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-imperial rounded-xl font-label-md hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] shadow-lg"
            >
              Contactez-nous
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/candidature"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-secondary text-white rounded-xl font-label-md hover:bg-secondary/90 transition-all duration-300 hover:scale-[1.02] shadow-lg glass-highlight"
            >
              Postuler maintenant
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}