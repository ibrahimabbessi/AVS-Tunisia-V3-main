// src/app/hergla-forma/formation-initiale/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function FormationInitiale() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section with Image - Reduced bottom padding */}
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
                  Formation Initiale
                </span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                Formation Initiale
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed max-w-3xl">
                Notre Offre De Formation Initiale
              </p>
              <p className="font-body-md text-on-surface-variant mt-2 leading-relaxed max-w-3xl">
                Apprendre, se former, réfléchir à son projet professionnel, se reconvertir
              </p>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://i.pinimg.com/736x/d9/92/51/d992510dc4947a2a90d712ba0162376a.jpg"
                  alt="Formation Initiale"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='24'%3EFormation%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-imperial/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section - Reduced top padding */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-md">
        
        {/* Main Description */}
        <div className="mb-12 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <div className="rounded-full bg-brand-ice p-2.5">
                <span className="text-xl">✨</span>
              </div>
            </div>
            <div>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                Formation diplômante, certifiante et homologuée basée essentiellement sur l'aspect pratique 
                de la spécialité permettant ainsi au stagiaire de s'intégrer facilement à la vie professionnelle.
              </p>
            </div>
          </div>
        </div>

        {/* Our Diplomas Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-imperial/10 flex items-center justify-center text-xl">
              🎓
            </div>
            <h2 className="font-headline-lg text-brand-imperial">
              Nos Diplômes
            </h2>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card-hover rounded-xl bg-surface-container-lowest p-6 border border-outline-variant/30 shadow-sm transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-headline-md text-primary text-base">
                    Formations certifiantes
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-sm">
                    CF / ICDL / MOS
                  </p>
                </div>
              </div>
            </div>

            <div className="card-hover rounded-xl bg-surface-container-lowest p-6 border border-outline-variant/30 shadow-sm transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-headline-md text-primary text-base">
                    Certificat fin formation
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-sm">
                    CFF (En cours et selon demande)
                  </p>
                </div>
              </div>
            </div>

            <div className="card-hover rounded-xl bg-surface-container-lowest p-6 border border-outline-variant/30 shadow-sm transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-headline-md text-primary text-base">
                    Certificat de compétence
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-sm">
                    CC / Chèque formation prochainement
                  </p>
                </div>
              </div>
            </div>

            <div className="card-hover rounded-xl bg-surface-container-lowest p-6 border border-outline-variant/30 shadow-sm transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-headline-md text-primary text-base">
                    Brevet technicien professionnelle
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-sm">
                    BTP
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Highlighted Program */}
          <div className="mt-4 rounded-xl bg-gradient-to-r from-brand-imperial/5 to-secondary/5 p-6 border border-secondary/20">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="rounded-full bg-secondary p-1.5">
                  <span className="text-white text-sm">⚡</span>
                </div>
              </div>
              <div>
                <h3 className="font-headline-md text-primary text-base">
                  Technicien en installation des équipements électriques et électroniques
                </h3>
                <p className="font-body-md text-on-surface-variant text-sm mt-1">
                  (En cours d'homologation)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Access Conditions */}
        <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-6 md:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <div className="rounded-full bg-brand-ice p-2.5">
                <span className="text-xl">👥</span>
              </div>
            </div>
            <div>
              <h2 className="font-headline-md text-brand-imperial mb-3">
                Conditions d'accès
              </h2>
              <div className="rounded-xl bg-surface-container-low p-4 border border-outline-variant/30">
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Formation destinée aux candidats ayant le niveau scolaire conformément à l'arrêté 
                  du ministre de l'éducation et de la formation au 26 février 2009.
                </p>
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