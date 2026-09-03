// app/company/nos-succes/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Award, Building2, Users, GraduationCap, Star, Quote, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Helper function to get Google Drive image URL
const getDriveImageUrl = (id: string) => {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
};

// Gallery images for Leaders University Partnership
const LEADERS_UNIVERSITY_IMAGES = [
  { id: 1, src: getDriveImageUrl("1s5gtMtAo_0yREVxdc_jaPu1YXOYsh36f"), alt: "Leaders University Partnership 1" },
  { id: 2, src: getDriveImageUrl("1OzijwE2uT7Uvd72ICHGu2btdcfaA0XLV"), alt: "Leaders University Partnership 2" },
  { id: 3, src: getDriveImageUrl("1tJ4QSVMSjjn9YM0jGiaqeqqzn2AG0iYV"), alt: "Leaders University Partnership 3" },
  { id: 4, src: getDriveImageUrl("1ead6VsC4IaSii7q68kggM-tXvCwUYJXz"), alt: "Leaders University Partnership 4" },
];

// Gallery images for FSEG Sousse Partnership
const FSEG_IMAGES = [
  { id: 5, src: getDriveImageUrl("1lVoj1ZBwm8oE9i2uzPOhqDJ2VSesRM3c"), alt: "FSEG Sousse Partnership 1" },
  { id: 6, src: getDriveImageUrl("14OQFPP0ujCACE4jPkZWC6kn1zmMUEtnQ"), alt: "FSEG Sousse Partnership 2" },
  { id: 7, src: getDriveImageUrl("1ygP7sfAtosXXcHDiUtVOt85cC5qmTNG4"), alt: "FSEG Sousse Partnership 3" },
  { id: 8, src: getDriveImageUrl("1VoeTB7zyipmL6H-pQYY4YNhmYIA92dLw"), alt: "FSEG Sousse Partnership 4" },
];

// Gallery images for additional success stories
const ADDITIONAL_IMAGES = [
  { id: 9, src: getDriveImageUrl("12-nEETZJ8D2X9rIHi8RE4Q2AvryIFkzf"), alt: "Success Story 1" },
  { id: 10, src: getDriveImageUrl("1mHiBfh8Ci9yeUjQayhsnDhY3y8AmA3u0"), alt: "Success Story 2" },
  { id: 11, src: getDriveImageUrl("1pW2bisG6nl62vupe4FzyT0woUYO_-2o-"), alt: "Success Story 3" },
];

// Image Gallery Component with Auto-slide and Thumbnails
function ImageGallery({ images, className = "" }: { images: typeof LEADERS_UNIVERSITY_IMAGES; className?: string }) {
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
    if (isPaused || images.length <= 1) return;
    
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  if (images.length === 0) return null;

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Slider */}
      <div className="relative h-48 md:h-56 lg:h-64 rounded-xl overflow-hidden bg-surface-container-low">
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

        {/* Navigation arrows on hover */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      
      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={prevImage}
              className="p-1.5 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-on-surface-variant">
                {currentIndex + 1} / {images.length}
              </span>
              <div className="flex gap-1">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-4 bg-secondary"
                        : "w-1.5 bg-outline-variant hover:bg-outline"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <button
              onClick={nextImage}
              className="p-1.5 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors"
              aria-label="Next image"
            >
              <svg className="w-4 h-4 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="mt-3">
            <div className="flex flex-wrap gap-1.5">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 w-14 h-10 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
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
                      <span className="text-[6px] text-on-surface-variant/50">{index + 1}</span>
                    </div>
                  )}
                  {index === currentIndex && (
                    <div className="absolute inset-0 ring-2 ring-secondary ring-inset"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Success Story Card Component
function SuccessStoryCard({
  title,
  type,
  subtitle,
  description,
  objectives,
  impact,
  stats,
  galleryImages,
  isReversed = false,
  testimonial,
}: {
  title: string;
  type: string;
  subtitle: string;
  description: string;
  objectives: string[];
  impact: string;
  stats: { value: string; label: string }[];
  galleryImages: typeof LEADERS_UNIVERSITY_IMAGES;
  isReversed?: boolean;
  testimonial?: { quote: string; author: string; position: string; rating: number };
}) {
  return (
    <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 lg:gap-10`}>
      <div className="lg:w-1/2">
        <ImageGallery images={galleryImages} />
      </div>
      
      <div className="lg:w-1/2 space-y-5">
        <div>
          <span className="inline-block px-3 py-1 bg-brand-ice text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/10">
            {type}
          </span>
          <h3 className="font-headline-lg text-brand-imperial mt-3">
            {title}
          </h3>
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
                <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
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

        {testimonial && (
          <div className="p-4 bg-brand-imperial/5 rounded-xl border border-brand-imperial/10">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-on-surface-variant italic">"{testimonial.quote}"</p>
            <p className="text-xs font-semibold text-brand-imperial mt-1">{testimonial.author}</p>
            <p className="text-xs text-on-surface-variant">{testimonial.position}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function NosSuccesPage() {
  const globalStats = [
    { value: "500+", label: "Talents placés" },
    { value: "50+", label: "Entreprises partenaires" },
    { value: "20+", label: "Secteurs d'activité" },
    { value: "95%", label: "Taux de réussite" },
  ];

  return (
    <div className="space-y-12">
      {/* Header / Hero Section */}
      <section className="relative bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent rounded-xl p-8 border border-outline-variant/30">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-brand-imperial/10 rounded-lg">
            <Award className="h-6 w-6 text-brand-imperial" />
          </div>
          <div>
            <span className="inline-flex items-center px-3 py-1 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20">
              Nos Réalisations
            </span>
            <h2 className="font-headline-lg text-brand-imperial mt-3 mb-3">Nos Succès</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed max-w-3xl">
              Nous sommes fiers des partenariats et projets réussis que nous avons développés au fil des années. 
              Découvrez nos collaborations stratégiques et l'impact concret sur nos partenaires.
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="space-y-16">
        <SuccessStoryCard
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
            { value: "+150", label: "Étudiants formés" },
            { value: "2024", label: "Année de lancement" },
          ]}
          galleryImages={LEADERS_UNIVERSITY_IMAGES}
          testimonial={{
            quote: "La collaboration avec AVS TUNISIA a révolutionné notre stratégie de formation. Les étudiants sont parfaitement préparés pour le marché allemand.",
            author: "Dr. Karim Ben Ali",
            position: "Directeur, Leaders University",
            rating: 5,
          }}
        />

        <div className="h-px bg-outline-variant/30"></div>

        <SuccessStoryCard
          title="Partenariat Public Privé"
          type="Public-Private"
          subtitle="Partenariat Éducatif entre AVS FORMA et la Faculté des Sciences Économiques et de Gestion de Sousse"
          description="Nous avons le plaisir de vous annoncer un partenariat éducatif passionnant entre notre centre de formation allemand AVS FORMA, et la Faculté des Sciences Économiques et de Gestion de Sousse. Cette collaboration vise à intégrer la langue allemande au sein du programme d'enseignement de la faculté, élargissant ainsi les horizons académiques et professionnels des étudiants."
          objectives={[
            "Intégrer la langue allemande dans le programme universitaire",
            "Améliorer les profils académiques et professionnels des étudiants",
            "Faciliter l'accès aux opportunités internationales",
            "Renforcer la collaboration entre les institutions académiques et de formation",
          ]}
          impact="Cette collaboration contribue à l'évolution de l'enseignement supérieur à la Faculté des Sciences Économiques et de Gestion de Sousse en fournissant aux étudiants une préparation complète et diversifiée pour relever les défis mondiaux."
          stats={[
            { value: "+100", label: "Étudiants formés" },
            { value: "2024", label: "Année de lancement" },
          ]}
          galleryImages={FSEG_IMAGES}
          isReversed={true}
          testimonial={{
            quote: "Ce partenariat ouvre des perspectives exceptionnelles pour nos étudiants. La formation linguistique est un atout majeur pour leur employabilité.",
            author: "Prof. Samira Trabelsi",
            position: "Doyenne, FSEG Sousse",
            rating: 5,
          }}
        />
      </section>

      {/* Global Stats Overview */}
      <section className="bg-gradient-to-r from-brand-imperial to-brand-sapphire rounded-xl p-8 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {globalStats.map((stat, index) => (
            <div key={index}>
              <div className="font-display-lg text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Success Stories Grid */}
      <section>
        <h3 className="font-headline-md text-brand-imperial mb-6">Autres réalisations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-xl shadow-sm border border-outline-variant/30 p-6 ambient-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-brand-imperial/10 rounded-lg">
                <Building2 className="h-5 w-5 text-brand-imperial" />
              </div>
              <div>
                <h4 className="font-semibold text-on-surface">Weber Industries GmbH</h4>
                <span className="text-xs font-medium text-brand-imperial bg-brand-imperial/10 px-2 py-0.5 rounded-full">Industrie</span>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant mb-4">
              Placement de 25 ingénieurs qualifiés pour le développement de nouvelles technologies industrielles.
            </p>
            <div className="flex gap-4 pt-4 border-t border-outline-variant/30">
              <div>
                <div className="text-lg font-bold text-brand-imperial">25</div>
                <div className="text-xs text-on-surface-variant">Ingénieurs placés</div>
              </div>
              <div>
                <div className="text-lg font-bold text-brand-imperial">100%</div>
                <div className="text-xs text-on-surface-variant">Taux de rétention</div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-xl shadow-sm border border-outline-variant/30 p-6 ambient-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-brand-imperial/10 rounded-lg">
                <Users className="h-5 w-5 text-brand-imperial" />
              </div>
              <div>
                <h4 className="font-semibold text-on-surface">Healthcare Solutions AG</h4>
                <span className="text-xs font-medium text-brand-imperial bg-brand-imperial/10 px-2 py-0.5 rounded-full">Santé</span>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant mb-4">
              Recrutement de 40 professionnels de santé pour des cliniques et établissements médicaux en Allemagne.
            </p>
            <div className="flex gap-4 pt-4 border-t border-outline-variant/30">
              <div>
                <div className="text-lg font-bold text-brand-imperial">40</div>
                <div className="text-xs text-on-surface-variant">Professionnels placés</div>
              </div>
              <div>
                <div className="text-lg font-bold text-brand-imperial">92%</div>
                <div className="text-xs text-on-surface-variant">Satisfaction client</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="glass-panel rounded-xl shadow-sm border border-outline-variant/30 p-8 text-center ambient-shadow">
        <h3 className="font-headline-md text-on-surface mb-3">
          Devenez notre prochain succès
        </h3>
        <p className="font-body-lg text-on-surface-variant mb-6">
          Découvrez comment nous pouvons soutenir votre entreprise dans le recrutement de talents qualifiés.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/company/contact"
            className="inline-flex items-center gap-2 bg-brand-imperial text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-imperial/90 transition-colors btn-primary glass-highlight"
          >
            Devenir partenaire
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/company/notre-modele"
            className="inline-flex items-center gap-2 bg-surface-container-low text-on-surface px-8 py-3 rounded-lg font-semibold hover:bg-surface-container transition-colors border border-outline-variant/30"
          >
            Découvrir notre modèle
          </Link>
        </div>
      </section>
    </div>
  );
}