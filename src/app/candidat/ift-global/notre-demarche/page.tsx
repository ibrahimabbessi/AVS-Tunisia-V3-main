// src/app/ift-global/notre-demarche/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function NotreDemarchePage() {
  const [hoveredDocIndex, setHoveredDocIndex] = useState<number | null>(null);

  const conditions = [
    {
      image: "https://www.francetravail.fr/files/live/sites/PE/files/candidat/recherche-emploi/2024/moins18-trouverW-850.jpg",
      title: "Condition d'accès 1",
      description: "Age du candidat entre 18 et 30 ans",
    },
    {
      image: "https://www.goethe.de/resources/files/png144/b1_b2-formatkey-png-w320r.png",
      title: "Condition d'accès 2",
      description: "Niveau d'allemand B1/B2",
    },
    {
      image: "https://topwork.at/wp-content/uploads/2023/09/elektriker_topwork.jpg",
      title: "Condition d'accès 3",
      description: "Choisir une formation professionnelle ou un emploi",
    },
  ];

  // Document images array
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

  // Extract file IDs from Google Drive links for other sections
  const heroImageId = "1PpkOsa8e_6oETZDrUjOQEJHkCk7Hyqqf";
  const consultationImages = [
    { id: "1DNOyCUHqA_sYBbOaHNcCau5XSuZS98On" },
    { id: "10kY9LHmW1WYs6pYHXqy1i5JX50EhWSCk" },
    { id: "1qAam7FhdLLMLMlk06iufy1-U9nMCONlW" },
  ];

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
      title: "On vous cherche une formation professionnelle ou un emploi en Allemagne",
      description:
        "Après que vous nous ayez soumis votre dossier, nous le présenterons aux sociétés intéressées. En cas de réponse positive, le candidat recevra des informations détaillées concernant les conditions de formation ou d'emploi disponibles et sera convié à un entretien.",
      imageId: "1MUcNYDyvTdPM_sVcMx-zTfRcnbxdHEOe",
    },
    {
      icon: "✏️",
      title: "Signer les contrats avec IFT",
      description:
        "Une fois que le candidat a passé l'entretien, si son profil est jugé acceptable, un contrat de formation ou d'emploi pourra être conclu. Le candidat signera également un contrat d'hébergement pour faciliter sa transition vers l'Allemagne.",
      imageId: "1UWRmb5PmXTrDKCRdDuXj7nRYtk-SPOs6",
    },
    {
      icon: "✈️",
      title: "Visa express et préparation de dossier d'Ambassade",
      description:
        "Par la suite, nous prenons en charge la procédure de visa express pour accélérer le rendez-vous de visa. Nous préparons également le dossier à présenter à l'ambassade d'Allemagne en Tunisie afin d'obtenir le visa. Enfin, nous assurons leur accueil à l'aéroport pour faciliter leur arrivée en Allemagne.",
      imageId: "1ncICPK-48T3JrQJdORGYBJzJrrYOQdmf",
    },
    {
      icon: "📍",
      title: "Accueil des candidats à l'aéroport",
      description:
        "Nous sommes ravis de vous accueillir en Allemagne ! Le sol allemand s'étend désormais sous vos pieds, porteur de promesses et d'opportunités. Votre détermination et votre talent vous ont amené jusqu'ici, et nous sommes impatients de vous accompagner dans cette étape cruciale de votre parcours professionnel.",
      imageId: "13gzmKHSzDOouVatDZIyGa8GqIuR3A2q6",
    },
    {
      icon: "🤝",
      title: "Accompagnement & Suivi",
      description:
        "Chez nous, l'accompagnement ne s'arrête pas à votre arrivée. Nous assurons un suivi continu de nos candidats en Allemagne, veillant à votre intégration harmonieuse dans votre nouvel environnement professionnel et culturel. Votre réussite est notre priorité, et nous sommes là pour vous soutenir à chaque étape.",
      imageId: "1RjjI-lFGJhXd8ORgAsxlaxfSXdMOaJyC",
    },
    {
      icon: "🏆",
      title: "Accomplissement",
      description:
        "Avec fierté, nous célébrons vos accomplissements. Après avoir brillamment achevé votre formation, l'obtention de votre diplôme marque le point culminant de vos efforts acharnés et de votre engagement. Ce précieux certificat atteste de vos compétences nouvellement acquises, ouvrant la voie vers de nouvelles opportunités professionnelles et concrétisant votre progression vers l'excellence. Félicitations pour ce succès mérité.",
      imageId: "1Jhp7-Ay7u5L-FwWw-48nj8A00b04e12z",
    },
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
                  IFT Global
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                  Notre Démarche
                </span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                Notre Démarche
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed max-w-3xl">
                IFT Global ouvre les portes à une gamme variée de formations et d'opportunités d'emploi en 
                Allemagne, spécialement conçues pour les jeunes passionnés qui possèdent une maîtrise de la 
                langue allemande.
              </p>
            </div>
            <div className="flex-1 max-w-md">
              <img
                src={getDriveImageUrl(heroImageId)}
                alt="IFT Global"
                className="w-full h-auto rounded-2xl shadow-lg border border-outline-variant/30"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getDocumentPlaceholder("IFT Global");
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg">
        
        {/* Introduction Section - Removed duplicate text */}
        <div className="mb-12 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-6 md:p-8 shadow-sm">
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            Notre objectif est de créer des partenariats fructueux avec des entreprises 
            qui partagent notre vision. Lorsqu'une réponse positive est reçue, le postulant se verra 
            fournir des informations détaillées concernant les conditions applicables aux formations et 
            aux emplois disponibles. À ce stade, un contrat concluant sera formalisé.
          </p>
          <p className="font-body-md text-on-surface-variant leading-relaxed mt-4">
            Subséquemment, l'équipe dédiée d'IFT Global assumera l'intégralité des procédures nécessaires 
            pour l'obtention du visa ainsi que pour l'orchestration fluide du départ de Tunisie vers 
            l'Allemagne. Notre engagement est de faciliter cette transition en gérant les aspects 
            logistiques complexes, garantissant ainsi une expérience sans heurts pour nos candidats 
            ambitieux.
          </p>
        </div>

        {/* Consultation Section */}
        <div className="mb-12 rounded-2xl bg-gradient-to-br from-brand-imperial to-brand-imperial/90 p-6 md:p-8 text-white shadow-lg">
          <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="font-headline-md text-white mb-1">Consultation gratuite</h2>
              <p className="text-white/90 font-body-md">
                Pour étudier le besoin et trouver les opportunités favorables pour le candidat
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <a
                href="tel:+21673251010"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-imperial rounded-xl font-label-md transition-all hover:bg-white/90 hover:shadow-lg hover:scale-[1.02]"
              >
                <span>📞</span>
                +216 73 251 010
              </a>
            </div>
          </div>
          {/* Consultation Images */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {consultationImages.map((img, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md">
                <img
                  src={getDriveImageUrl(img.id)}
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

        {/* Conditions d'accès - with images instead of icons */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-imperial/10 flex items-center justify-center text-xl">
              📋
            </div>
            <h2 className="font-headline-lg text-brand-imperial">Conditions d'accès</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {conditions.map((condition, index) => (
              <div
                key={index}
                className="card-hover rounded-xl bg-surface-container-lowest overflow-hidden border border-outline-variant/30 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={condition.image}
                    alt={condition.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getDocumentPlaceholder(condition.title);
                    }}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-headline-md text-primary text-sm">{condition.title}</h3>
                  <p className="font-body-md text-on-surface-variant text-sm mt-1">{condition.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents Section - with image gallery */}
        <div className="mb-12 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl">📄</span>
            <h2 className="font-headline-md text-brand-imperial">Documents requis</h2>
          </div>
          <p className="font-body-md text-on-surface-variant text-sm mb-4">
            Chaque candidat est prié de présenter les documents suivants :
          </p>
          
          {/* image gallery - show half initially, expand on hover */}
          <div>
            <div className="flex flex-wrap gap-4 justify-center">
              {documentImages.map((doc, index) => {
                const isHovered = hoveredDocIndex === index;
                return (
                  <div 
                    key={doc.id}
                    className="relative rounded-lg overflow-hidden border border-outline-variant/30 bg-surface-container-low transition-all duration-500 ease-in-out cursor-pointer"
                    style={{
                      flex: isHovered ? '0 0 220px' : '0 0 100px',
                      height: isHovered ? '320px' : '200px',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      zIndex: isHovered ? 10 : 1,
                      boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.2)' : 'none',
                    }}
                    onMouseEnter={() => setHoveredDocIndex(index)}
                    onMouseLeave={() => setHoveredDocIndex(null)}
                  >
                    <div className="w-full h-full overflow-hidden relative">
                      <img
                        src={doc.url}
                        alt={doc.label}
                        className="w-full h-full object-cover transition-all duration-500"
                        style={{
                          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                          objectPosition: isHovered ? 'center' : 'center 30%',
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = getDocumentPlaceholder(doc.label);
                        }}
                      />
                      {/* Overlay that hides the bottom portion of the image when not hovered */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 transition-all duration-500"
                        style={{
                          height: isHovered ? '0%' : '50%',
                          background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 100%)',
                        }}
                      />
                    </div>
                    <div 
                      className="absolute bottom-0 left-0 right-0 p-3 transition-all duration-500"
                      style={{
                        background: isHovered 
                          ? 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' 
                          : 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
                      }}
                    >
                      <span className={`text-white font-body-md text-center block transition-all duration-500 ${
                        isHovered ? 'text-sm font-bold' : 'text-xs'
                      }`}>
                        {doc.label}
                      </span>
                      {isHovered && (
                        <span className="text-white/80 text-xs block text-center mt-1 animate-fade-in">
                          ✨ Voir en détail
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 font-body-md text-xs text-on-surface-variant/60 italic text-center">
              * Passez votre souris sur chaque document pour le voir en détail
            </p>
          </div>
        </div>

        {/* Process Steps - with alternating layout */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-imperial/10 flex items-center justify-center text-xl">
              ⭐
            </div>
            <h2 className="font-headline-lg text-brand-imperial">Notre processus d'accompagnement</h2>
          </div>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`rounded-xl bg-surface-container-lowest p-8 border border-outline-variant/30 shadow-sm transition-all duration-300 hover:shadow-lg ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex flex-col gap-8`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-ice text-2xl">
                      {step.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex size-6 items-center justify-center rounded-full bg-brand-imperial text-xs font-bold text-white">
                          {index + 1}
                        </span>
                        <h3 className="font-headline-md text-primary text-base">{step.title}</h3>
                      </div>
                      <p className="font-body-md text-on-surface-variant text-sm mt-3 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`flex-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="rounded-xl overflow-hidden shadow-md h-56 md:h-64">
                    <img
                      src={getDriveImageUrl(step.imageId)}
                      alt={step.title}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getDocumentPlaceholder(step.title);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-imperial to-brand-imperial/90 p-8 text-center text-white shadow-lg">
          <h2 className="font-headline-lg text-white mb-2">
            Prêt à commencer votre parcours ?
          </h2>
          <p className="font-body-md text-white/90 mb-6">
            Contactez-nous dès aujourd'hui pour une consultation gratuite
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-imperial rounded-xl font-label-md hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] shadow-lg"
          >
            Contactez-nous
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}