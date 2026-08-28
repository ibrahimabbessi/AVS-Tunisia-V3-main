"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

// Helper function to get Google Drive image URL
const getDriveImageUrl = (id: string) => {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
};

// Gallery images for Public-Private Partnership
const PUBLIC_PRIVATE_IMAGES = [
  { id: 1, src: getDriveImageUrl("1s5gtMtAo_0yREVxdc_jaPu1YXOYsh36f"), alt: "Public-Private Partnership 1" },
  { id: 2, src: getDriveImageUrl("1OzijwE2uT7Uvd72ICHGu2btdcfaA0XLV"), alt: "Public-Private Partnership 2" },
  { id: 3, src: getDriveImageUrl("1tJ4QSVMSjjn9YM0jGiaqeqqzn2AG0iYV"), alt: "Public-Private Partnership 3" },
  { id: 4, src: getDriveImageUrl("1ead6VsC4IaSii7q68kggM-tXvCwUYJXz"), alt: "Public-Private Partnership 4" },
  { id: 5, src: getDriveImageUrl("1JATiyfGBhAXhay6qWFF0I3tfLuv1xgEw"), alt: "Public-Private Partnership 5" },
  { id: 6, src: getDriveImageUrl("1RnFtdtfVa628dHoUxOsHa_d4x9ONQux9"), alt: "Public-Private Partnership 6" },
  { id: 7, src: getDriveImageUrl("1bbGvZWcAKXk-Iz8sCsZ0igXvDOZtjVkx"), alt: "Public-Private Partnership 7" },
  { id: 8, src: getDriveImageUrl("1H_Gm-fGDEqq_CyDae3_kk1EK-AZiRxOF"), alt: "Public-Private Partnership 8" },
];

// Gallery images for Private-Private Partnership
const PRIVATE_PRIVATE_IMAGES = [
  { id: 11, src: getDriveImageUrl("1lVoj1ZBwm8oE9i2uzPOhqDJ2VSesRM3c"), alt: "Private-Private Partnership 1" },
  { id: 12, src: getDriveImageUrl("14OQFPP0ujCACE4jPkZWC6kn1zmMUEtnQ"), alt: "Private-Private Partnership 2" },
  { id: 13, src: getDriveImageUrl("1ygP7sfAtosXXcHDiUtVOt85cC5qmTNG4"), alt: "Private-Private Partnership 3" },
  { id: 14, src: getDriveImageUrl("1VoeTB7zyipmL6H-pQYY4YNhmYIA92dLw"), alt: "Private-Private Partnership 4" },
  { id: 15, src: getDriveImageUrl("12-nEETZJ8D2X9rIHi8RE4Q2AvryIFkzf"), alt: "Private-Private Partnership 5" },
  { id: 16, src: getDriveImageUrl("1mHiBfh8Ci9yeUjQayhsnDhY3y8AmA3u0"), alt: "Private-Private Partnership 6" },
  { id: 17, src: getDriveImageUrl("1pW2bisG6nl62vupe4FzyT0woUYO_-2o-"), alt: "Private-Private Partnership 7" },
  { id: 18, src: getDriveImageUrl("1cey2vFybE4bwwUPekAPO29PAWCO_XSFc"), alt: "Private-Private Partnership 8" },
  { id: 19, src: getDriveImageUrl("1c6DKa_oJp3Yg7a_mUVhvfv0ZMhssOxTA"), alt: "Private-Private Partnership 9" },
];

// Image Gallery Component with Auto-slide and Thumbnails
function ImageGallery({ images }: { images: typeof PUBLIC_PRIVATE_IMAGES }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);
  const [thumbErrors, setThumbErrors] = useState<Record<number, boolean>>({});

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageError = (id: number) => {
    setImgError(prev => ({ ...prev, [id]: true }));
  };

  const handleThumbError = (id: number) => {
    setThumbErrors(prev => ({ ...prev, [id]: true }));
  };

  // Auto-slide effect every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Slider */}
      <div className="relative h-48 md:h-64 lg:h-80 rounded-xl overflow-hidden bg-surface-container-low">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {!imgError[image.id] ? (
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                onError={() => handleImageError(image.id)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-imperial/10 to-secondary/10 flex items-center justify-center">
                <span className="text-on-surface-variant text-sm">Image non disponible</span>
              </div>
            )}
          </div>
        ))}
        
        {isPaused && (
          <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            ⏸ Pause
          </div>
        )}
      </div>
      
      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={prevImage}
          className="p-2 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-on-surface-variant">
            {currentIndex + 1} / {images.length}
          </span>
          <div className="flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-6 bg-secondary"
                    : "w-2 bg-outline-variant hover:bg-outline"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <button
          onClick={nextImage}
          className="p-2 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors"
          aria-label="Next image"
        >
          <svg className="w-5 h-5 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnail Strip - No horizontal scroller */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? "border-secondary shadow-lg shadow-secondary/20 scale-105"
                  : "border-outline-variant hover:border-secondary/50"
              }`}
            >
              {!thumbErrors[image.id] ? (
                <img
                  src={image.src.replace('sz=w800', 'sz=w200')}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => handleThumbError(image.id)}
                />
              ) : (
                <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
                  <span className="text-[8px] text-on-surface-variant/50">{index + 1}</span>
                </div>
              )}
              {index === currentIndex && (
                <div className="absolute inset-0 ring-2 ring-secondary ring-inset"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({
  title,
  type,
  subtitle,
  description,
  objectives,
  impact,
  stats,
  galleryImages,
  isReversed = false,
}: {
  title: string;
  type: string;
  subtitle: string;
  description: string;
  objectives: string[];
  impact: string;
  stats: { value: string; label: string }[];
  galleryImages: typeof PUBLIC_PRIVATE_IMAGES;
  isReversed?: boolean;
}) {
  return (
    <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12`}>
      <div className="lg:w-1/2">
        <ImageGallery images={galleryImages} />
      </div>
      
      <div className="lg:w-1/2 space-y-6">
        <div>
          <span className="inline-block px-3 py-1 bg-brand-ice text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/10">
            {type}
          </span>
          <h2 className="font-headline-lg text-brand-imperial mt-3">
            {title}
          </h2>
          <p className="font-label-md text-secondary mt-1">
            {subtitle}
          </p>
        </div>
        
        <p className="font-body-md text-on-surface-variant leading-relaxed">
          {description}
        </p>
        
        <div className="space-y-2">
          <h4 className="font-label-md text-brand-imperial">Objectifs clés</h4>
          <ul className="space-y-1.5">
            {objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-on-surface-variant">
                <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {objective}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
          <h4 className="font-label-md text-brand-imperial mb-1">Impact</h4>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {impact}
          </p>
        </div>
        
        <div className="flex gap-6">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="font-display-lg text-secondary text-2xl">
                {stat.value}
              </div>
              <div className="text-caption text-on-surface-variant">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjetsPilotesPage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section - removed bottom padding */}
      <section className="relative pt-32 pb-0 md:pt-40 md:pb-0 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="max-w-4xl">
            <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
              Nos Partenariats
            </span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
              Partenariats Stratégiques
            </h1>
            <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
            <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed max-w-3xl">
              Des collaborations innovantes pour former les talents de demain
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section - added top padding to bring it closer */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-8 pb-0 space-y-24">
        <ProjectCard
          title="Partenariat Public Privé"
          type="Public-Private"
          subtitle="Partenariat Éducatif entre AVS FORMA et la Faculté des Sciences Économiques et de Gestion de Sousse"
          description="Nous avons le plaisir de vous annoncer un partenariat éducatif passionnant entre notre centre de formation allemand AVS FORMA, et la Faculté des Sciences Économiques et de Gestion de Sousse. Cette collaboration vise à intégrer la langue allemande au sein du programme d'enseignement de la faculté, élargissant ainsi les horizons académiques et professionnels des étudiants. Ce partenariat stratégique est une opportunité unique qui s'inscrit dans notre engagement mutuel envers l'excellence éducative et le développement des compétences internationales."
          objectives={[
            "Intégrer la langue allemande dans le programme universitaire",
            "Améliorer les profils académiques et professionnels des étudiants",
            "Faciliter l'accès aux opportunités internationales",
            "Renforcer la collaboration entre les institutions académiques et de formation",
          ]}
          impact="Cette collaboration contribue à l'évolution de l'enseignement supérieur à la Faculté des Sciences Économiques et de Gestion de Sousse en fournissant aux étudiants une préparation complète et diversifiée pour relever les défis mondiaux. Ensemble, nous ouvrons de nouvelles voies vers l'excellence éducative et professionnelle."
          stats={[
            { value: "+100", label: "Étudiants formés" },
            { value: "2024", label: "Année de lancement" },
          ]}
          galleryImages={PUBLIC_PRIVATE_IMAGES}
        />

        <div className="h-px bg-outline-variant/30"></div>

        <ProjectCard
          title="Partenariat Privé Privé"
          type="Private-Private"
          subtitle="Partenariat Éducatif entre AVS FORMA et la Faculté privée Leaders University"
          description="Avec grand enthousiasme, AVS Hergla Forma et LEADERS UNIVERSITY Business School et Faculté d'informatique de Nabeul unissent leurs forces pour établir un partenariat éducatif privilégié. Cette collaboration novatrice vise à créer des opportunités exceptionnelles pour les jeunes tunisiens désireux de s'intégrer au marché du travail allemand, notamment dans le domaine de l'informatique."
          objectives={[
            "Préparer les étudiants aux carrières dans le marché IT allemand",
            "Combiner la formation technique et linguistique",
            "Offrir une éducation pratique et orientée carrière",
            "Soutenir l'intégration des étudiants dans des environnements internationaux",
          ]}
          impact="Grâce à cette association, AVS Hergla Forma et LEADERS UNIVERSITY s'engagent conjointement à former et à guider les jeunes esprits tunisiens, en leur offrant les compétences linguistiques et techniques nécessaires pour exceller dans le marché de l'informatique en Allemagne."
          stats={[
            { value: "+100", label: "Étudiants formés" },
            { value: "2024", label: "Année de lancement" },
          ]}
          galleryImages={PRIVATE_PRIVATE_IMAGES}
          isReversed={true}
        />
      </section>

      <section className="bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg text-center">
          <h2 className="font-headline-lg text-brand-imperial mb-4">
            Prêt à Rejoindre nos Programmes ?
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto mb-8">
            Découvrez comment nos partenariats peuvent vous aider à atteindre vos objectifs académiques et professionnels.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-brand-imperial to-brand-imperial/90 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <span className="font-label-md text-label-md">Contactez-nous</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}