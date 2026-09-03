// app/company/opportunites/page.tsx
"use client";

import { Building2, Heart, Users, Laptop, Plane, Briefcase, CheckCircle2, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ChancenAnforderungenPage() {
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  const sectors = [
    {
      icon: Building2,
      name: "Industrie",
      description: "Électricité, Énergétique, Maintenance industrielle, Mécanique, Fabrication & conception, Contrôle qualité, Automation, Mécatronique, Automobile, Construction industrielle",
      image: "https://res.cloudinary.com/girgi5fd/image/upload/v1788210051/bg201.png"
    },
    {
      icon: Heart,
      name: "Santé",
      description: "Soins infirmiers, Aide-soignant, Soins aux personnes âgées, Soins hospitaliers, Soins pédiatriques, Laboratoire, Radiologie",
      image: "https://res.cloudinary.com/girgi5fd/image/upload/v1788210027/bg202.png"
    },
    {
      icon: Users,
      name: "Tourisme",
      description: "Hôtellerie, Restauration, Cuisine, Réception, Gestion hôtelière, Événementiel",
      image: "https://res.cloudinary.com/girgi5fd/image/upload/v1788210030/bg203.png"
    },
    {
      icon: Laptop,
      name: "IT & Technologie",
      description: "Développement logiciel, Développement web, Cloud, DevOps, Cybersécurité, Data, IA & Machine Learning, QA & Testing",
      image: "https://res.cloudinary.com/girgi5fd/image/upload/v1788210054/bg204.png"
    },
    {
      icon: Plane,
      name: "Logistique",
      description: "Conduite de camion, Entrepôt, Logistique, Chaîne d'approvisionnement",
      image: "https://res.cloudinary.com/girgi5fd/image/upload/v1788210051/bg205.png"
    },
    {
      icon: Briefcase,
      name: "Autres domaines",
      description: "Artisanat, Commerce, Finance, Éducation, et bien d'autres",
      image: "https://res.cloudinary.com/girgi5fd/image/upload/v1788210004/bg206.jpg"
    }
  ];

  const requirements = [
    {
      category: "Compétences linguistiques",
      icon: "🌐",
      items: [
        "Niveau B1 minimum en allemand (norme CECR)",
        "B2 pour les postes académiques ou spécialisés",
        "Justification par des tests de langue certifiés (Goethe, TELC, TestDaF)"
      ]
    },
    {
      category: "Qualifications professionnelles",
      icon: "🎓",
      items: [
        "Formation professionnelle achevée ou diplôme universitaire",
        "Expérience professionnelle pertinente (selon le poste)",
        "Certificats spécifiques au domaine d'activité"
      ]
    },
    {
      category: "Qualités & Conditions",
      icon: "⭐",
      items: [
        "Motivation et engagement professionnel",
        "Esprit d'équipe et compétences en communication",
        "Ouverture culturelle et capacité d'adaptation",
        "Âge inférieur à 35 ans"
      ]
    }
  ];

  // ========== PROCESS STEPS WITH IMAGES ==========
const processSteps = [
  {
    step: "1",
    icon: "📄",
    title: "Déposer un dossier complet chez IFT",
    description:
      "Pour chaque candidat, il est impératif de commencer l'apprentissage de la langue allemande en parallèle tout en déposant son dossier d'inscription complet, afin de participer à notre programme de recrutement en Allemagne.",
    imageUrl: "https://res.cloudinary.com/girgi5fd/image/upload/v1788249113/bg208.png",
  },
  {
    step: "2",
    icon: "👥",
    title: "On vous cherche une formation professionnelle ou un emploi en Allemagne",
    description:
      "Après que vous nous ayez soumis votre dossier, nous le présenterons aux sociétés intéressées. En cas de réponse positive, le candidat recevra des informations détaillées concernant les conditions de formation ou d'emploi disponibles et sera convié à un entretien.",
    imageUrl: "https://res.cloudinary.com/girgi5fd/image/upload/v1788249113/bg209.jpg",
  },
  {
    step: "3",
    icon: "✏️",
    title: "Signer les contrats avec IFT",
    description:
      "Une fois que le candidat a passé l'entretien, si son profil est jugé acceptable, un contrat de formation ou d'emploi pourra être conclu. Le candidat signera également un contrat d'hébergement pour faciliter sa transition vers l'Allemagne.",
    imageUrl: "https://res.cloudinary.com/girgi5fd/image/upload/v1788249113/bg210.jpg",
  },
  {
    step: "4",
    icon: "✈️",
    title: "Visa express et préparation de dossier d'Ambassade",
    description:
      "Par la suite, nous prenons en charge la procédure de visa express pour accélérer le rendez-vous de visa. Nous préparons également le dossier à présenter à l'ambassade d'Allemagne en Tunisie afin d'obtenir le visa. Enfin, nous assurons leur accueil à l'aéroport pour faciliter leur arrivée en Allemagne.",
    imageUrl: "https://res.cloudinary.com/girgi5fd/image/upload/v1788249114/bg211.jpg",
  },
  {
    step: "5",
    icon: "📍",
    title: "Accueil des candidats à l'aéroport",
    description:
      "Nous sommes ravis de vous accueillir en Allemagne ! Le sol allemand s'étend désormais sous vos pieds, porteur de promesses et d'opportunités. Votre détermination et votre talent vous ont amené jusqu'ici, et nous sommes impatients de vous accompagner dans cette étape cruciale de votre parcours professionnel.",
    imageUrl: "https://res.cloudinary.com/girgi5fd/image/upload/v1788249115/bg2122.jpg",
  },
  {
    step: "6",
    icon: "🤝",
    title: "Accompagnement & Suivi",
    description:
      "Chez nous, l'accompagnement ne s'arrête pas à votre arrivée. Nous assurons un suivi continu de nos candidats en Allemagne, veillant à votre intégration harmonieuse dans votre nouvel environnement professionnel et culturel. Votre réussite est notre priorité, et nous sommes là pour vous soutenir à chaque étape.",
    imageUrl: "https://res.cloudinary.com/girgi5fd/image/upload/v1788249113/bg213.jpg",
  },
  {
    step: "7",
    icon: "🏆",
    title: "Accomplissement",
    description:
      "Avec fierté, nous célébrons vos accomplissements. Après avoir brillamment achevé votre formation, l'obtention de votre diplôme marque le point culminant de vos efforts acharnés et de votre engagement. Ce précieux certificat atteste de vos compétences nouvellement acquises, ouvrant la voie vers de nouvelles opportunités professionnelles et concrétisant votre progression vers l'excellence. Félicitations pour ce succès mérité.",
    imageUrl: "https://res.cloudinary.com/girgi5fd/image/upload/v1788249120/bg214.png",
  },
];

  // Fallback placeholder for images
  const getDocumentPlaceholder = (label: string) => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='24'%3E📄%3C/text%3E%3Ctext x='50%25' y='65%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='14'%3E${encodeURIComponent(label)}%3C/text%3E%3C/svg%3E`;
  };

  return (
    <div className="space-y-8">
      {/* ========== SECTION 1: HERO ========== */}
      <section className="relative bg-gradient-to-br from-[#0a2a88] via-[#0a2a88]/95 to-[#3b8bc4]/90 rounded-2xl overflow-hidden shadow-xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative p-8 md:p-12 text-white">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm mb-4">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                IFT Global – Entreprises
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Opportunités & Exigences
              </h1>
              <div className="w-20 h-1 bg-white/50 rounded-full mt-4 mx-auto lg:mx-0"></div>
              <p className="text-white/90 text-lg mt-4 max-w-2xl mx-auto lg:mx-0">
                Nous recrutons des talents qualifiés dans différents secteurs. 
                Découvrez ici quels profils vous attendent et quelles exigences 
                nos candidats remplissent.
              </p>
              <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
                <a
                  href="#sectors"
                  className="inline-flex items-center gap-2 bg-white text-[#0a2a88] px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
                >
                  Découvrir les secteurs
                  <ChevronDown className="h-4 w-4" />
                </a>
                <Link
                  href="/company/contact"
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold border border-white/30 hover:bg-white/30 transition-all"
                >
                  Postuler maintenant
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="flex-1 max-w-sm lg:max-w-md">
              <div className="relative">
                <div className="absolute -inset-1 bg-white/20 rounded-2xl blur-xl"></div>
                <img
                  src="https://res.cloudinary.com/girgi5fd/image/upload/v1788249122/bg207.png"
                  alt="IFT Global recruitment"
                  className="relative rounded-2xl shadow-2xl w-full h-auto border border-white/20"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop";
                  }}
                />
                <div className="absolute -bottom-4 -right-4 bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="font-medium">600+ talents placés</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: SECTORS ========== */}
      <section id="sectors">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#0a2a88]/10 rounded-lg">
            <Building2 className="h-6 w-6 text-[#0a2a88]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Secteurs dans lesquels nous recrutons</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sectors.map((sector) => (
            <div
              key={sector.name}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default"
              onMouseEnter={() => setHoveredSector(sector.name)}
              onMouseLeave={() => setHoveredSector(null)}
            >
            {/* Full Height Image */}
<div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden bg-gray-900">
              <img
                src={sector.image}
                alt={sector.name}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='24'%3E${encodeURIComponent(sector.name)}%3C/text%3E%3C/svg%3E`;
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Sector info overlay */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
                  <sector.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-xl drop-shadow-lg">{sector.name}</h3>
                  <span className="text-white/80 text-sm">
                    {sector.description.split(',').length} compétences
                  </span>
                </div>
              </div>
            </div>
                          
              {/* Badges */}
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {sector.description.split(',').map((item, index) => {
                    const trimmed = item.trim();
                    return (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200 transition-all duration-200 hover:bg-purple-200 hover:scale-105 hover:shadow-md cursor-default"
                      >
                        {trimmed}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECTION 3: REQUIREMENTS ========== */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#0a2a88]/10 rounded-lg">
            <CheckCircle2 className="h-6 w-6 text-[#0a2a88]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Exigences pour nos candidats</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {requirements.map((req) => (
            <div key={req.category} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{req.icon}</span>
                <h3 className="font-semibold text-gray-900">{req.category}</h3>
              </div>
              <ul className="space-y-2">
                {req.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className={`text-gray-700 ${item.includes('35 ans') ? 'font-semibold text-[#0a2a88]' : ''}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-700 flex items-center gap-3">
          <span className="text-lg">ℹ️</span>
          <span>Ces exigences sont adaptées selon les besoins spécifiques de chaque entreprise partenaire.</span>
        </div>
      </section>

      {/* ========== SECTION 4: PROCESS STEPS (SMALLER IMAGES) ========== */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#0a2a88]/10 flex items-center justify-center text-xl">
            ⭐
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0a2a88]">Le chemin vers votre nouveau talent</h2>
            <p className="text-sm text-gray-500">Notre processus de recrutement en 7 étapes</p>
          </div>
        </div>
        
        <div className="space-y-6">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className={`rounded-xl bg-white border border-gray-200 p-5 md:p-6 shadow-sm transition-all duration-300 hover:shadow-lg ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex flex-col gap-5 md:gap-6`}
            >
              {/* Text Content - takes more space */}
              <div className={`flex-[2] ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0a2a88]/10 text-lg">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#0a2a88] text-xs font-bold text-white">
                        {step.step}
                      </span>
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 text-xs md:text-sm mt-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
              
            {/* Image - smaller (flex-1) */}
            <div className={`flex-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
              <div className="rounded-xl overflow-hidden shadow-md bg-gray-50">
                <img
                  src={step.imageUrl}
                  alt={step.title}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getDocumentPlaceholder(step.title);
                  }}
                />
              </div>
            </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== SECTION 5: CTA ========== */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center transition-all hover:shadow-md">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-[#0a2a88]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-8 w-8 text-[#0a2a88]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Prêt pour la prochaine réussite ?
          </h2>
          <p className="text-gray-600 mb-6">
            Contactez-nous et trouvez vos talents. Nous vous accompagnons dans 
            la recherche des profils qualifiés dont vous avez besoin.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/company/contact"
              className="inline-flex items-center gap-2 bg-[#0a2a88] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0a2a88]/90 transition-all hover:scale-105 shadow-lg"
            >
              Demander maintenant
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/company"
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* ========== STATS BANNER ========== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-[#0a2a88]">600+</div>
          <div className="text-sm text-gray-600">Talents placés</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-[#0a2a88]">50+</div>
          <div className="text-sm text-gray-600">Entreprises partenaires</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-[#0a2a88]">95%</div>
          <div className="text-sm text-gray-600">Taux de satisfaction</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-[#0a2a88]">7</div>
          <div className="text-sm text-gray-600">Étapes d'accompagnement</div>
        </div>
      </div>
    </div>
  );
}