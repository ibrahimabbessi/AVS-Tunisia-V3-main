// src/app/ift-global/care-forma/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function CareFormaPage() {
  const [hoveredDocIndex, setHoveredDocIndex] = useState<number | null>(null);

  // Document images for the assistant de vie program
  const documentImages = [
    { id: 1, url: "https://static.onlinecv.fr/wp-content/uploads/sites/36/2023/12/12113530/FRE_Munich_Photo-1040x1433.webp", label: "Photo d'identité" },
    { id: 2, url: "https://thumbs.dreamstime.com/b/un-jeune-br%C3%A9silien-portant-tshirt-bleu-debout-sur-fond-blanc-isol%C3%A9-visage-joyeux-souriant-aux-bras-crois%C3%A9s-regardant-la-cam%C3%A9ra-228325198.jpg", label: "Photo portrait" },
    { id: 3, url: "https://www.leconomistemaghrebin.com/wp-content/uploads/2026/07/passeportt.jpg", label: "Passeport" },
    { id: 4, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8eMKn143bHBKxv-c7uJpOCBvsFe2RSnpfgZsiawVsmn8uKAUttIRe8WPm&s=10", label: "Diplôme" },
    { id: 5, url: "https://imgv2-1-f.scribdassets.com/img/document/95226756/original/90995a27a4/1?v=1", label: "Certificat de stage" },
    { id: 6, url: "https://www.linguaviva-dortmund.de/assets/images/telc-musterzertifikat-b1-451x640.jpg", label: "Certificat de langue" },
  ];

  // Function to get Google Drive image URL
  const getDriveImageUrl = (fileId: string) => {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  };

  // Document placeholder SVG fallback
  const getDocumentPlaceholder = (label: string) => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='267'%3E%3Crect width='200' height='267' fill='%23e5e7eb'/%3E%3Crect x='20' y='20' width='160' height='160' fill='%23d1d5db' rx='8'/%3E%3Ctext x='50%25' y='65%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='16' font-weight='bold'%3E📄%3C/text%3E%3Ctext x='50%25' y='80%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='12'%3E${encodeURIComponent(label)}%3C/text%3E%3C/svg%3E`;
  };

  // Qualifications and skills for assistant de vie with images
  const qualifications = [
    {
      icon: "❤️",
      title: "Empathie et Compassion",
      description: "Capacité à comprendre et partager les émotions des personnes âgées ou en situation de handicap.",
      image: "https://cdn-s-www.leprogres.fr/images/CDBE28AE-548F-4959-B02E-0AA7D0EC1513/NW_raw/un-comportement-empathique-de-la-part-d-un-soignant-peut-reduire-la-sensation-de-douleur-de-12-illustration-stock-adobe-com-1564604610.jpg",
    },
    {
      icon: "🤝",
      title: "Patience et Écoute",
      description: "Savoir écouter activement et faire preuve de patience dans les situations difficiles.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh9t6bwrsNd01qBTt_NDzZdWyQIXdQy8pTtaJQgePH4a2hSa47nDy2Px3x&s=10",
    },
    {
      icon: "📋",
      title: "Organisation",
      description: "Gérer efficacement les tâches quotidiennes et les emplois du temps des bénéficiaires.",
      image: "https://www.blogdemaritan.com/wp-content/uploads/2022/09/les-taches-dun-infirmier-a-domicile.jpg",
    },
    {
      icon: "🧠",
      title: "Sens des Responsabilités",
      description: "Assurer la sécurité et le bien-être des personnes sous votre responsabilité.",
      image: "https://www.macsf.fr/var/macsf/storage/images-versioned/images/2/0/2/4/944202-38-fre-FR/IDE-615x555.jpg",
    },
    {
      icon: "💬",
      title: "Communication",
      description: "Établir une communication claire avec les bénéficiaires, leurs familles et les équipes médicales.",
      image: "https://www.cmpa-acpm.ca/static-assets/images/meta/good-practices/21-team-communication-opengraph.jpg",
    },
    {
      icon: "🏃",
      title: "Adaptabilité",
      description: "S'adapter aux différents besoins et situations des bénéficiaires.",
      image: "https://previews.123rf.com/images/leaf/leaf1107/leaf110700245/10033248-doctor-and-nurse-running-in-hallway-of-hospital.jpg",
    },
  ];

  // Program steps
  const steps = [
    {
      icon: "📄",
      title: "Déposer un dossier complet chez IFT",
      description:
        "Pour chaque candidat, il est impératif de commencer l'apprentissage de la langue allemande en parallèle tout en déposant son dossier d'inscription complet, afin de participer à notre programme de recrutement en Allemagne.",
      imageId: "1PHZFUUoN8g5PmRrdCp701kTbWcGMbD4B",
    },
    {
      icon: "👥",
      title: "On vous cherche une formation en Allemagne",
      description:
        "Après que vous nous ayez soumis votre dossier, nous le présenterons aux centres de formation et établissements de santé intéressés pour une formation d'Assistant de Vie.",
      imageId: "1MUcNYDyvTdPM_sVcMx-zTfRcnbxdHEOe",
    },
    {
      icon: "✏️",
      title: "Signer les contrats avec IFT",
      description:
        "Une fois que le candidat a passé l'entretien, si son profil est jugé acceptable, un contrat de formation sera conclu. Le candidat signera également un contrat d'hébergement pour faciliter sa transition vers l'Allemagne.",
      imageId: "1UWRmb5PmXTrDKCRdDuXj7nRYtk-SPOs6",
    },
    {
      icon: "✈️",
      title: "Visa express et préparation de dossier d'Ambassade",
      description:
        "Par la suite, nous prenons en charge la procédure de visa express pour accélérer le rendez-vous de visa. Nous préparons également le dossier à présenter à l'ambassade d'Allemagne en Tunisie afin d'obtenir le visa.",
      imageId: "1ncICPK-48T3JrQJdORGYBJzJrrYOQdmf",
    },
    {
      icon: "📍",
      title: "Accueil des candidats à l'aéroport",
      description:
        "Nous sommes ravis de vous accueillir en Allemagne ! Le sol allemand s'étend désormais sous vos pieds, porteur de promesses et d'opportunités dans le domaine des soins.",
      imageId: "13gzmKHSzDOouVatDZIyGa8GqIuR3A2q6",
    },
    {
      icon: "🤝",
      title: "Accompagnement & Suivi",
      description:
        "Chez nous, l'accompagnement ne s'arrête pas à votre arrivée. Nous assurons un suivi continu de nos candidats en Allemagne, veillant à votre intégration harmonieuse dans le secteur des soins.",
      imageId: "1RjjI-lFGJhXd8ORgAsxlaxfSXdMOaJyC",
    },
    {
      icon: "🏆",
      title: "Diplôme & Insertion Professionnelle",
      description:
        "Après avoir brillamment achevé votre formation d'Assistant de Vie, vous obtiendrez votre diplôme reconnu en Allemagne. Ce précieux certificat atteste de vos compétences et ouvre la voie vers de nouvelles opportunités professionnelles.",
      imageId: "1Jhp7-Ay7u5L-FwWw-48nj8A00b04e12z",
    },
  ];

  // Formation details
  const formationDetails = [
    {
      title: "Formation Théorique",
      description: "Cours théoriques sur les soins aux personnes âgées, les premiers secours, la nutrition, et la législation sociale allemande.",
      duration: "6 mois",
    },
    {
      title: "Formation Pratique",
      description: "Stages en maisons de retraite, hôpitaux et structures d'accueil pour personnes handicapées.",
      duration: "12 mois",
    },
    {
      title: "Formation Linguistique",
      description: "Cours d'allemand médical pour communiquer efficacement avec les bénéficiaires et les équipes soignantes.",
      duration: "3 mois",
    },
  ];

  // Care-Forma images
  const careFormaImages = [
    "https://mrdeutschakademie.com/files/photos/1/bannieres/photojpgAlJaQo5EWw6lh3chWeTw-converted.webp",
    "https://www.capretraite.fr/wp-content/uploads/2026/08/EHPAD-avec-section-personnes-handicapees-vieillissantes-les-specificites-a-verifier-2-1024x683.jpg",
    "https://lanes-germany.com/content-images/fachsprache-medizin-bei-lanes.png",
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="max-w-4xl flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                  Care-Forma
                </span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                Formation d'Assistant de Vie
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed max-w-3xl">
                Devenez un professionnel des soins en Allemagne. IFT Global vous offre l'opportunité 
                de suivre une formation complète d'Assistant de Vie, combinant théorie, pratique 
                et immersion linguistique.
              </p>
            </div>
            {/* Image à droite du titre Formation d'Assistant de Vie */}
            <div className="flex-1 max-w-md">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30">
                <img
                  src="https://www.irfasud.fr/app/uploads/2019/09/assistante-de-vie-aux-familles-2-1024x683.jpg"
                  alt="Assistant de Vie"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='267'%3E%3Crect width='400' height='267' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='20'%3E🏥 Assistant de Vie%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Assistant de Vie - Formation professionnelle en Allemagne */}
      <section className="py-12 md:py-16 bg-blue-50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-8">
            <h2 className="font-headline-md text-brand-imperial">Assistant de Vie</h2>
            <p className="font-body-lg text-on-surface-variant">Formation professionnelle en Allemagne</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <span className="block text-4xl font-bold text-brand-imperial">18-30</span>
              <span className="text-sm text-on-surface-variant font-medium">Âge requis</span>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <span className="block text-4xl font-bold text-brand-imperial">B1/B2</span>
              <span className="text-sm text-on-surface-variant font-medium">Niveau d'allemand</span>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <span className="block text-4xl font-bold text-brand-imperial">24</span>
              <span className="text-sm text-on-surface-variant font-medium">Mois</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg">
        
        {/* Program Overview */}
        <div className="mb-12 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🎯</span>
            <h2 className="font-headline-md text-brand-imperial">Le Programme Care-Forma</h2>
          </div>
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            Le programme <strong>Care-Forma</strong> est spécialement conçu pour former des Assistants de Vie 
            qualifiés répondant aux besoins du système de santé allemand. Cette formation unique vous prépare 
            à accompagner les personnes âgées, en situation de handicap ou en convalescence dans leur vie 
            quotidienne.
          </p>
          
          {/* 3 images pour Care-Forma */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {careFormaImages.map((img, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md border border-outline-variant/20">
                <img
                  src={img}
                  alt={`Care-Forma illustration ${index + 1}`}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='16'%3E📸 Image ${index + 1}%3C/text%3E%3C/svg%3E`;
                  }}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {formationDetails.map((detail, index) => (
              <div key={index} className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/20">
                <h4 className="font-headline-sm text-primary text-sm font-semibold">{detail.title}</h4>
                <p className="font-body-md text-on-surface-variant text-sm mt-1">{detail.description}</p>
                <div className="mt-2 inline-flex items-center gap-1 bg-brand-imperial/10 text-brand-imperial px-3 py-1 rounded-full text-xs font-medium">
                  ⏱️ {detail.duration}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Assistant de Vie? */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">💝</span>
            <h2 className="font-headline-md text-brand-imperial">Pourquoi devenir Assistant de Vie ?</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card-hover rounded-xl bg-surface-container-lowest p-6 border border-outline-variant/30 transition-all duration-300">
              <div className="text-3xl mb-3">🌟</div>
              <h3 className="font-headline-sm text-primary text-sm font-semibold">Un métier humain</h3>
              <p className="font-body-md text-on-surface-variant text-sm mt-1">
                Accompagnez les personnes dans leur vie quotidienne et faites une différence réelle.
              </p>
            </div>
            <div className="card-hover rounded-xl bg-surface-container-lowest p-6 border border-outline-variant/30 transition-all duration-300">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-headline-sm text-primary text-sm font-semibold">Fort potentiel d'emploi</h3>
              <p className="font-body-md text-on-surface-variant text-sm mt-1">
                L'Allemagne recherche constamment des professionnels qualifiés dans le secteur des soins.
              </p>
            </div>
            <div className="card-hover rounded-xl bg-surface-container-lowest p-6 border border-outline-variant/30 transition-all duration-300">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="font-headline-sm text-primary text-sm font-semibold">Carrière stable</h3>
              <p className="font-body-md text-on-surface-variant text-sm mt-1">
                Des opportunités d'évolution dans le secteur médico-social en Allemagne.
              </p>
            </div>
          </div>
        </div>

        {/* Qualifications */}
        <div className="mb-12 rounded-2xl bg-gradient-to-br from-brand-imperial/5 to-secondary/5 p-6 md:p-8 border border-outline-variant/30">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">✨</span>
            <h2 className="font-headline-md text-brand-imperial">Qualités requises pour un Assistant de Vie</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {qualifications.map((qual, index) => (
              <div
                key={index}
                className="card-hover rounded-xl bg-surface-container-lowest p-5 border border-outline-variant/30 transition-all duration-300 hover:border-brand-imperial/30 overflow-hidden group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{qual.icon}</span>
                  <h3 className="font-headline-sm text-primary text-sm font-semibold">{qual.title}</h3>
                </div>
                <p className="font-body-md text-on-surface-variant text-sm mb-3">{qual.description}</p>
                <div className="rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={qual.image}
                    alt={qual.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='150'%3E%3Crect width='400' height='150' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='16'%3E${encodeURIComponent(qual.icon)} ${qual.title}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Section */}
        <div className="mb-12 rounded-2xl bg-gradient-to-br from-brand-imperial to-brand-imperial/90 p-6 md:p-8 text-white shadow-lg">
          <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="font-headline-md text-white mb-1">Consultation gratuite</h2>
              <p className="text-white/90 font-body-md">
                Pour étudier votre projet et trouver les opportunités qui vous correspondent
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+21673251010"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-imperial rounded-xl font-label-md transition-all hover:bg-white/90 hover:shadow-lg hover:scale-[1.02]"
              >
                <span>📞</span>
                +216 73 251 010
              </a>
              <a
                href="mailto:contact@ift-global.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-xl font-label-md transition-all hover:bg-white/30 hover:shadow-lg hover:scale-[1.02]"
              >
                <span>✉️</span>
                Contactez-nous
              </a>
            </div>
          </div>
          {/* Consultation Images */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400",
              "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400",
              "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400",
            ].map((img, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md">
                <img
                  src={img}
                  alt={`Consultation ${index + 1}`}
                  className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getDocumentPlaceholder(`Image ${index + 1}`);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">❓</span>
            <h2 className="font-headline-md text-brand-imperial">Questions fréquentes</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/20">
              <h4 className="font-headline-sm text-primary text-sm font-semibold">Quel est le niveau d'allemand requis ?</h4>
              <p className="font-body-md text-on-surface-variant text-sm mt-1">
                Un niveau B1/B2 est requis pour suivre la formation et communiquer efficacement avec les bénéficiaires.
              </p>
            </div>
            <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/20">
              <h4 className="font-headline-sm text-primary text-sm font-semibold">La formation est-elle rémunérée ?</h4>
              <p className="font-body-md text-on-surface-variant text-sm mt-1">
                Oui, les candidats reçoivent une rémunération pendant leur formation en Allemagne.
              </p>
            </div>
            <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/20">
              <h4 className="font-headline-sm text-primary text-sm font-semibold">Quelles sont les débouchés ?</h4>
              <p className="font-body-md text-on-surface-variant text-sm mt-1">
                Maisons de retraite, hôpitaux, structures pour personnes handicapées, et soins à domicile.
              </p>
            </div>
            <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/20">
              <h4 className="font-headline-sm text-primary text-sm font-semibold">Quelle est la durée de la formation ?</h4>
              <p className="font-body-md text-on-surface-variant text-sm mt-1">
                La formation dure 24 mois, combinant théorie, pratique et apprentissage linguistique.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-imperial to-brand-imperial/90 p-8 text-center text-white shadow-lg">
          <h2 className="font-headline-lg text-white mb-2">
            Prêt à devenir Assistant de Vie en Allemagne ?
          </h2>
          <p className="font-body-md text-white/90 mb-6">
            Rejoignez le programme Care-Forma et construisez votre avenir dans le secteur des soins
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-imperial rounded-xl font-label-md hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] shadow-lg"
            >
              S'inscrire maintenant
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="tel:+21673251010"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/20 text-white rounded-xl font-label-md hover:bg-white/30 transition-all duration-300 hover:scale-[1.02]"
            >
              📞 Nous appeler
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}