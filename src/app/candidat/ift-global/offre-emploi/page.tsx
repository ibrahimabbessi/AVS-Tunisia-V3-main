// src/app/ift-global/offre-emploi/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function OffreEmploiPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const jobSectors = [
    {
      id: "industrie",
      title: "Secteur de l'industrie",
      icon: "🏭",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      description: "Des opportunités dans les domaines de l'électricité, l'énergétique, la maintenance industrielle et la mécanique. Des métiers d'avenir avec d'excellentes perspectives de carrière.",
      jobs: [
        { 
          icon: "⚡", 
          name: "Électricité",
          description: "Installation et maintenance des systèmes électriques",
          salary: "~45 000€/an"
        },
        { 
          icon: "🔥", 
          name: "Énergétique",
          description: "Gestion et optimisation des systèmes énergétiques",
          salary: "~48 000€/an"
        },
        { 
          icon: "⚙️", 
          name: "Maintenance industrielle",
          description: "Maintenance préventive et corrective des équipements",
          salary: "~42 000€/an"
        },
        { 
          icon: "🔧", 
          name: "Mécanique - Fabrication & conception",
          description: "Conception et fabrication de pièces mécaniques",
          salary: "~44 000€/an"
        },
      ],
    },
    {
      id: "sante",
      title: "Secteur de santé",
      icon: "🩺",
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
      description: "Le secteur de la santé recrute ! Infirmiers diplômés, des opportunités dans les hôpitaux et cliniques allemandes avec des conditions de travail attractives.",
      jobs: [
        { 
          icon: "❤️", 
          name: "Infirmier",
          description: "Soins aux patients dans les établissements de santé",
          salary: "~42 000€/an"
        },
      ],
    },
    {
      id: "autres",
      title: "Autres secteurs",
      icon: "💼",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      image: "https://images.unsplash.com/photo-1497215842964-222b7dcfc088?w=600&h=400&fit=crop",
      description: "Un large éventail d'opportunités dans l'informatique, la logistique, la restauration, l'artisanat et bien plus encore. Trouvez votre voie en Allemagne.",
      jobs: [
        { 
          icon: "💻", 
          name: "Informatique",
          description: "Développement, réseau et support technique",
          salary: "~50 000€/an"
        },
        { 
          icon: "🚛", 
          name: "Chauffeur semi-remorque (LKW)",
          description: "Transport de marchandises à travers l'Europe",
          salary: "~38 000€/an"
        },
        { 
          icon: "🍽️", 
          name: "Restauration & Hôtellerie",
          description: "Service client dans les établissements de restauration",
          salary: "~32 000€/an"
        },
        { 
          icon: "🔨", 
          name: "Bricolage & Artisanat",
          description: "Travaux de rénovation et artisanat divers",
          salary: "~35 000€/an"
        },
        { 
          icon: "🔥", 
          name: "Soudure",
          description: "Soudage de précision dans l'industrie",
          salary: "~40 000€/an"
        },
        { 
          icon: "❄️", 
          name: "Mécanicien d'installations sanitaires/chauffage/climatisation",
          description: "Installation et maintenance des systèmes CVC",
          salary: "~42 000€/an"
        },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-brand-imperial blur-3xl"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                IFT Global
              </span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                Offres d'emploi
              </span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
              Trouvez votre emploi en Allemagne
            </h1>
            <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
            <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed max-w-3xl">
              Découvrez nos opportunités dans différents secteurs professionnels en Allemagne. 
              Des postes à pourvoir avec des conditions de travail attractives et une rémunération compétitive.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="#jobs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-imperial text-white rounded-xl font-label-md hover:bg-brand-imperial/90 transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                Voir les offres
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

      {/* Stats Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter -mt-8 relative z-20">
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-white shadow-lg p-6 text-center border border-outline-variant/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-3xl mb-2">🏗️</div>
            <div className="font-display-lg text-secondary text-3xl">3</div>
            <div className="font-body-md text-on-surface-variant text-sm">Secteurs d'activité</div>
          </div>
          <div className="rounded-xl bg-white shadow-lg p-6 text-center border border-outline-variant/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-3xl mb-2">👔</div>
            <div className="font-display-lg text-secondary text-3xl">11</div>
            <div className="font-body-md text-on-surface-variant text-sm">Métiers disponibles</div>
          </div>
          <div className="rounded-xl bg-white shadow-lg p-6 text-center border border-outline-variant/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-3xl mb-2">💶</div>
            <div className="font-display-lg text-secondary text-3xl">~42k</div>
            <div className="font-body-md text-on-surface-variant text-sm">Salaire annuel moyen</div>
          </div>
          <div className="rounded-xl bg-white shadow-lg p-6 text-center border border-outline-variant/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-3xl mb-2">🌍</div>
            <div className="font-display-lg text-secondary text-3xl">∞</div>
            <div className="font-body-md text-on-surface-variant text-sm">Opportunités en Allemagne</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="jobs" className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg">
        
        {/* Job Sectors */}
        <div className="space-y-10">
          {jobSectors.map((sector) => (
            <div
              key={sector.id}
              className="rounded-3xl bg-surface-container-lowest border border-outline-variant/30 overflow-hidden transition-all duration-500 hover:shadow-xl"
            >
              <div className={`bg-gradient-to-r ${sector.color} p-8 text-white`}>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-white/20 p-3 text-3xl backdrop-blur-sm">
                    {sector.icon}
                  </div>
                  <div>
                    <h2 className="font-headline-lg text-white">{sector.title}</h2>
                    <p className="text-white/80 font-body-md text-sm">
                      {sector.jobs.length} offre{sector.jobs.length > 1 ? "s" : ""} disponible{sector.jobs.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <p className="font-body-md text-on-surface-variant leading-relaxed">
                      {sector.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        ✅ Contrat CDI
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        📈 Évolution possible
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium">
                        💶 Rémunération attractive
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-md h-40">
                    <img
                      src={sector.image}
                      alt={sector.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Jobs List - Enhanced with details */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {sector.jobs.map((job, index) => (
                    <div
                      key={index}
                      className={`group rounded-xl bg-surface-container-low p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                        selectedJob === job.name ? "ring-2 ring-secondary bg-brand-ice/30" : ""
                      }`}
                      onClick={() => setSelectedJob(selectedJob === job.name ? null : job.name)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-secondary text-2xl group-hover:scale-110 transition-transform duration-300">
                          {job.icon}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-headline-md text-on-surface text-base">
                            {job.name}
                          </h4>
                          <p className="font-body-sm text-on-surface-variant text-xs mt-1">
                            {job.description}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                              {job.salary}
                            </span>
                            <button className="text-xs text-brand-imperial font-medium hover:underline">
                              Plus d'infos →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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

        {/* Benefits Section */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 border border-outline-variant/30">
          <h2 className="font-headline-lg text-brand-imperial text-center mb-8">
            Pourquoi travailler en Allemagne avec IFT Global ?
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl mb-3">💶</div>
              <h3 className="font-headline-md text-on-surface mb-2">Rémunération attractive</h3>
              <p className="font-body-sm text-on-surface-variant text-sm">
                Salaire compétitif et avantages sociaux dans le respect du droit du travail allemand
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="font-headline-md text-on-surface mb-2">Sécurité de l'emploi</h3>
              <p className="font-body-sm text-on-surface-variant text-sm">
                Contrats de travail stables avec une forte protection sociale
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-headline-md text-on-surface mb-2">Évolution de carrière</h3>
              <p className="font-body-sm text-on-surface-variant text-sm">
                Possibilités de formation continue et d'avancement professionnel
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-brand-imperial/5 to-brand-ice/20 p-8 border border-outline-variant/30">
          <h2 className="font-headline-lg text-brand-imperial text-center mb-8">
            Témoignages de nos talents
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="font-body-md text-on-surface-variant text-sm italic">
                "Embauché comme infirmier à Berlin grâce à IFT Global. L'accompagnement a été exceptionnel."
              </p>
              <div className="mt-4 font-body-sm text-brand-imperial font-semibold">- Maria, 28 ans</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="font-body-md text-on-surface-variant text-sm italic">
                "Je suis mécanicien industriel à Stuttgart. IFT Global m'a aidé à trouver cette opportunité unique."
              </p>
              <div className="mt-4 font-body-sm text-brand-imperial font-semibold">- Thomas, 31 ans</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 text-yellow-400 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="font-body-md text-on-surface-variant text-sm italic">
                "Développeur informatique à Munich, une expérience professionnelle enrichissante avec un excellent salaire."
              </p>
              <div className="mt-4 font-body-sm text-brand-imperial font-semibold">- Lucas, 26 ans</div>
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
              Vous cherchez une opportunité en Allemagne ?
            </h2>
            <p className="font-body-md text-white/90 max-w-2xl mx-auto mb-8">
              Rejoignez notre réseau de talents et trouvez l'emploi qui correspond à vos compétences. 
              Nous vous accompagnons dans toutes les démarches.
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