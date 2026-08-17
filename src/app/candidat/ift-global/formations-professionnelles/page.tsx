// src/app/ift-global/formations-professionnelles/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function FormationsProfessionnellesPage() {
  const [expandedSector, setExpandedSector] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const sectors = [
    {
      id: "sante",
      title: "Secteur de la santé",
      icon: "❤️",
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50",
      description:
        "Au cœur du secteur de la santé, trois domaines cruciaux se rejoignent pour offrir un soutien complet à chaque étape de la vie. Des professionnels de la santé qualifiés, qu'il s'agisse d'infirmiers polyvalents, d'assistants en technologie opératoire ou d'assistants techniques en anesthésie, sont dédiés à prodiguer des soins attentionnés et compétents.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
      formations: [
        { 
          icon: "🩺", 
          name: "Formation d'infirmier/ère",
          duration: "3 ans",
          level: "Bac+3",
          salary: "~38 000€/an"
        },
        { 
          icon: "🏥", 
          name: "Formation d'assistant(e) technique en salle d'opération (OTA)",
          duration: "3 ans",
          level: "Bac+3",
          salary: "~42 000€/an"
        },
        { 
          icon: "💉", 
          name: "Formation d'assistant technicien en anesthésie (ATA)",
          duration: "3 ans",
          level: "Bac+3",
          salary: "~44 000€/an"
        },
      ],
    },
    {
      id: "tourisme",
      title: "Secteur du tourisme",
      icon: "✈️",
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-cyan-50",
      description:
        "Dans le secteur du tourisme, deux formations captivantes se démarquent. D'une part, en tant qu'hôtelier ou hôtelière, tu prends soin des voyageurs dans des environnements variés, avec une nouvelle réglementation de formation depuis août 2022, axée sur la réception, les réservations, l'entretien et la restauration. D'autre part, en tant que marin fluvial, tu navigues sur l'eau en pilotant des bateaux de passagers ou de marchandises, avec d'excellents salaires à la clé.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
      formations: [
        { 
          icon: "🏨", 
          name: "Formation d'employé(e) d'hôtel",
          duration: "2 ans",
          level: "Bac+2",
          salary: "~32 000€/an"
        },
        { 
          icon: "⛵", 
          name: "Formation de batelier/ère",
          duration: "2 ans",
          level: "Bac+2",
          salary: "~36 000€/an"
        },
      ],
    },
    {
      id: "restauration",
      title: "Secteur de la restauration",
      icon: "🍽️",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      description:
        "Dans le domaine de la restauration, plusieurs formations prometteuses se distinguent. En tant que professionnel de la gastronomie, tu transformes les ingrédients en œuvres d'art gustatives, tandis que la formation de pâtissier te plonge dans l'univers délicieux des desserts visuellement attrayants.",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop",
      formations: [
        { 
          icon: "🧑‍🍳", 
          name: "Formation de spécialiste de la gastronomie",
          duration: "3 ans",
          level: "Bac+3",
          salary: "~34 000€/an"
        },
        { 
          icon: "🎂", 
          name: "Formation de pâtissier/ère",
          duration: "3 ans",
          level: "Bac+3",
          salary: "~32 000€/an"
        },
        { 
          icon: "👨‍🍳", 
          name: "Formation de cuisinier",
          duration: "3 ans",
          level: "Bac+3",
          salary: "~33 000€/an"
        },
        { 
          icon: "☕", 
          name: "Formation de spécialiste de la restauration et événementielle",
          duration: "2 ans",
          level: "Bac+2",
          salary: "~30 000€/an"
        },
      ],
    },
    {
      id: "mecanique",
      title: "Secteur de la mécanique",
      icon: "🔧",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      description:
        "Du monde industriel aux voitures personnalisées, deux chemins captivants s'ouvrent à vous. En tant que mécanicien industriel, vous construirez et maintiendrez des machines complexes, tandis qu'en tant que peintre en carrosserie automobile, vous donnerez vie à des véhicules avec des finitions impeccables et des designs personnalisés.",
      image: "https://images.unsplash.com/photo-1530046339160-ce3e8c43d605?w=600&h=400&fit=crop",
      formations: [
        { 
          icon: "⚙️", 
          name: "Mécanicien(ne) industriel(le)",
          duration: "3.5 ans",
          level: "Bac+3",
          salary: "~40 000€/an"
        },
        { 
          icon: "🎨", 
          name: "Peintre de véhicules",
          duration: "3 ans",
          level: "Bac+2",
          salary: "~35 000€/an"
        },
      ],
    },
    {
      id: "autres",
      title: "Autres secteurs",
      icon: "✨",
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50",
      description:
        "Explorez un éventail diversifié de domaines professionnels, chacun offrant des opportunités uniques. Que vous souhaitiez créer des revêtements métalliques innovants en tant que technicien en revêtements de surface ou assurer la sécurité et l'apprentissage aquatique en tant qu'employé spécialisé en exploitation de piscines, ces chemins de carrière dynamiques vous attendent.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
      formations: [
        { 
          icon: "💧", 
          name: "Technicien en revêtements de surface (Surface-Coater)",
          duration: "3 ans",
          level: "Bac+3",
          salary: "~38 000€/an"
        },
        { 
          icon: "🏊", 
          name: "Employé(e) spécialisé(e) en piscines",
          duration: "2 ans",
          level: "Bac+2",
          salary: "~32 000€/an"
        },
      ],
    },
  ];

  const filterOptions = ["all", ...new Set(sectors.map(s => s.title.split(" ")[1] || s.id))];

  const filteredSectors = filter === "all" 
    ? sectors 
    : sectors.filter(s => s.id === filter || s.title.includes(filter));

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-brand-imperial blur-3xl"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                IFT Global
              </span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                Formations professionnelles
              </span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
              Formez-vous en Allemagne
            </h1>
            <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
            <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed max-w-3xl">
              Découvrez nos formations professionnelles de qualité dans différents secteurs en Allemagne. 
              Des opportunités d'apprentissage rémunérées qui combinent théorie et pratique.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="#sectors"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-imperial text-white rounded-xl font-label-md hover:bg-brand-imperial/90 transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                Explorer les formations
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
              <Link
                href="/candidature"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-imperial rounded-xl font-label-md border border-brand-imperial/20 hover:bg-brand-ice transition-all duration-300"
              >
                Postuler maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced with icons */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter -mt-8 relative z-20">
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-white shadow-lg p-6 text-center border border-outline-variant/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-3xl mb-2">🏫</div>
            <div className="font-display-lg text-secondary text-3xl">5+</div>
            <div className="font-body-md text-on-surface-variant text-sm">Secteurs de formation</div>
          </div>
          <div className="rounded-xl bg-white shadow-lg p-6 text-center border border-outline-variant/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-3xl mb-2">📚</div>
            <div className="font-display-lg text-secondary text-3xl">13</div>
            <div className="font-body-md text-on-surface-variant text-sm">Formations disponibles</div>
          </div>
          <div className="rounded-xl bg-white shadow-lg p-6 text-center border border-outline-variant/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-3xl mb-2">💶</div>
            <div className="font-display-lg text-secondary text-3xl">~35k</div>
            <div className="font-body-md text-on-surface-variant text-sm">Salaire annuel moyen</div>
          </div>
          <div className="rounded-xl bg-white shadow-lg p-6 text-center border border-outline-variant/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-3xl mb-2">🎓</div>
            <div className="font-display-lg text-secondary text-3xl">100%</div>
            <div className="font-body-md text-on-surface-variant text-sm">Reconnues en Allemagne</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="sectors" className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg">
        
        {/* Filter Section */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <span className="font-body-md text-on-surface-variant font-medium">Filtrer par secteur :</span>
          <div className="flex flex-wrap gap-2">
            {["all", ...filterOptions].filter((v, i, a) => a.indexOf(v) === i).map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === opt
                    ? "bg-brand-imperial text-white shadow-md"
                    : "bg-surface-container-low hover:bg-brand-ice text-on-surface-variant border border-outline-variant/30"
                }`}
              >
                {opt === "all" ? "Tous" : opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Sectors */}
        <div className="space-y-10">
          {filteredSectors.map((sector) => (
            <div
              key={sector.id}
              className={`rounded-3xl bg-surface-container-lowest border border-outline-variant/30 overflow-hidden transition-all duration-500 hover:shadow-xl ${
                expandedSector === sector.id ? "shadow-2xl" : ""
              }`}
            >
              <div className={`bg-gradient-to-r ${sector.color} p-8 text-white cursor-pointer`}
                   onClick={() => setExpandedSector(expandedSector === sector.id ? null : sector.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-white/20 p-3 text-3xl backdrop-blur-sm">
                      {sector.icon}
                    </div>
                    <div>
                      <h2 className="font-headline-lg text-white">{sector.title}</h2>
                      <p className="text-white/80 font-body-md text-sm">
                        {sector.formations.length} formation{sector.formations.length > 1 ? "s" : ""} disponible{sector.formations.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="text-white/80 text-2xl">
                    {expandedSector === sector.id ? "−" : "+"}
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="font-body-md text-on-surface-variant leading-relaxed">
                      {sector.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-ice text-brand-imperial rounded-full text-xs font-medium">
                        💼 Alternance rémunérée
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        🎓 Certificat reconnu
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-md h-48">
                    <img
                      src={sector.image}
                      alt={sector.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Formations List - Enhanced with details */}
                <div className="mt-6">
                  <h3 className="font-headline-md text-brand-imperial mb-4">Formations disponibles</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {sector.formations.map((formation, index) => (
                      <div
                        key={index}
                        className="group rounded-xl bg-surface-container-low p-5 transition-all duration-300 hover:bg-brand-ice/30 hover:shadow-md hover:-translate-y-1"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-secondary text-2xl group-hover:scale-110 transition-transform duration-300">
                            {formation.icon}
                          </span>
                          <div className="flex-1">
                            <h4 className="font-body-md text-on-surface font-semibold text-sm">
                              {formation.name}
                            </h4>
                            <div className="flex flex-wrap gap-3 mt-2 text-xs text-on-surface-variant">
                              <span className="flex items-center gap-1">
                                📅 {formation.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                📊 {formation.level}
                              </span>
                              <span className="flex items-center gap-1 text-green-600 font-medium">
                                💰 {formation.salary}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA within sector */}
                <div className="mt-6 pt-6 border-t border-outline-variant/20">
                  <Link
                    href="/candidature"
                    className="inline-flex items-center gap-2 text-brand-imperial font-medium hover:gap-3 transition-all duration-300"
                  >
                    Postuler à ce secteur
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-brand-imperial/5 to-brand-ice/20 p-8 border border-outline-variant/30">
          <h2 className="font-headline-lg text-brand-imperial text-center mb-8">
            Ce que disent nos apprenants
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="font-body-md text-on-surface-variant text-sm italic">
                "IFT Global m'a accompagné dans ma formation d'infirmier en Allemagne. Aujourd'hui, je travaille dans un hôpital à Munich."
              </p>
              <div className="mt-4 font-body-sm text-brand-imperial font-semibold">- Sarah, 24 ans</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="font-body-md text-on-surface-variant text-sm italic">
                "Grâce à IFT Global, j'ai pu suivre une formation en pâtisserie et travaille maintenant dans un grand hôtel à Berlin."
              </p>
              <div className="mt-4 font-body-sm text-brand-imperial font-semibold">- Ahmed, 22 ans</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="font-body-md text-on-surface-variant text-sm italic">
                "La formation en mécanique industrielle m'a ouvert des portes. Un excellent accompagnement de A à Z."
              </p>
              <div className="mt-4 font-body-sm text-brand-imperial font-semibold">- Karim, 26 ans</div>
            </div>
          </div>
        </div>

        {/* Main CTA Section */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-brand-imperial to-brand-imperial/90 p-10 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <span className="text-5xl mb-4 block">👥</span>
            <h2 className="font-headline-lg text-white mb-3">
              Prêt à commencer votre formation en Allemagne ?
            </h2>
            <p className="font-body-md text-white/90 max-w-2xl mx-auto mb-8">
              Rejoignez nos programmes de formation professionnelle en Allemagne et construisez votre avenir. 
              Nous vous accompagnons à chaque étape.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/candidature"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-imperial rounded-xl font-label-md hover:bg-white/90 transition-all duration-300 hover:scale-[1.05] shadow-lg"
              >
                Postuler maintenant
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-xl font-label-md hover:bg-secondary/90 transition-all duration-300 hover:scale-[1.05] shadow-lg glass-highlight"
              >
                Contactez-nous
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}