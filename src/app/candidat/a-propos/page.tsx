// src/app/a-propos/page.tsx
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Topbar from "@/components/Topbar";

// Helper function for Google Drive images
function drive(fileId: string, size: number = 1000) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}

export default function Page() {
  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      image: drive("19Y2RTkDWRqIvUSrF-OqQV0wIIgBnZ2Rv"),
      title: "L'excellence au service de votre avenir",
      subtitle: "Découvrez comment nous transformons les ambitions en réussites",
    },
    {
      image: drive("1OZs6AGKI7ISRz1na7fT_hX5zrvmHMcdK"),
      title: "Une équipe dédiée à votre succès",
      subtitle: "Des experts passionnés à vos côtés à chaque étape",
    },
    {
      image: drive("12f8UOOz5WKcjW-G6dk43INtSogITngGA"),
      title: "Des opportunités concrètes en Allemagne",
      subtitle: "Formation, recrutement et accompagnement sur mesure",
    },
    {
      image: drive("1rIRDYQOcNsWFGSNp36KkfVTADaPcDWzs"),
      title: "Votre pont vers une carrière d'excellence",
      subtitle: "De la formation linguistique à l'intégration professionnelle",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <>
      <Topbar />
      <Navbar />

      {/* Section 0: Slider - Full Width Hero with À Propos header */}
      <section 
        className="relative h-[500px] md:h-[600px] w-full overflow-hidden pt-20"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-imperial/70 to-brand-imperial/40" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%2303045e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24'%3EAVS Tunisia Group%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center text-white">
                  {/* À Propos Badge - displayed above the slider content */}
                  <span className="inline-flex items-center px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-white/30 mb-4">
                    À Propos
                  </span>
                  <h1 className="font-display-lg-mobile md:font-display-lg text-white mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="font-body-lg text-white/90 md:text-xl">{slide.subtitle}</p>
                  <div className="mt-6">
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
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="px-3 py-1 bg-brand-ice text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/10">
              Notre Mission
            </span>
            <h2 className="font-headline-lg text-brand-imperial mt-4 mb-6">
              Notre mission
            </h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Nos solutions sont toutes conçues pour créer de nouvelles et excitantes façons de vous aider rapidement à obtenir un emploi, à développer une carrière et à rechercher de nouvelles opportunités.
            </p>
            <p className="font-body-md text-on-surface-variant leading-relaxed mt-4">
              Si vous éprouvez des difficultés à trouver un emploi, si vous avez besoin d'expérience pour vous préparer au travail ou si vous souhaitez vous perfectionner pour occuper un meilleur emploi, nous avons mis en place un service spécial d'expérience de travail dédié à cet aspect.
            </p>
            <p className="font-body-md text-on-surface-variant leading-relaxed mt-4">
              Nous avons conçu une gamme de produits qui visent tous à vous amener là où vous voulez aller dans les plus brefs délais.
            </p>
          </div>
          <div className="relative h-[400px] rounded-[24px] overflow-hidden shadow-2xl">
            <img 
              className="absolute inset-0 w-full h-full object-cover object-top" 
              alt="Notre mission - AVS Tunisia Group" 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-imperial/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Values Section - with images */}
      <section className="bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 bg-brand-ice text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/10">
              Nos Valeurs
            </span>
            <h2 className="font-headline-lg text-brand-imperial mt-4">
              Nos valeurs fondamentales
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Communiquer",
                description: "Établir des ponts entre les talents et les opportunités en Allemagne",
                image: "https://womaccelerator.com/wp-content/uploads/2021/03/Comment-bien-communiquer-avec-les-autres.jpg",
              },
              {
                title: "Co-créer",
                description: "Construire ensemble des solutions sur mesure pour chaque parcours",
                image: "https://www.telos-eu.com/medias/cache/18/93/18932f6b154f815ce94cafd780f7b433.jpg",
              },
              {
                title: "Former",
                description: "Préparer et perfectionner les compétences pour l'excellence professionnelle",
                image: "https://ictc-ctic.ca/sites/default/files/images/krakenimages-376KN_ISplE-unsplash.jpg",
              },
              {
                title: "Connecter",
                description: "Relier les ambitions aux réalisations concrètes en Allemagne",
                image: "https://www.bluenove.com//wp-content/uploads/2018/07/article-co-design-1-1484x1080.jpg",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="card-hover rounded-2xl border border-outline-variant bg-surface-container-lowest overflow-hidden transition-all duration-300 group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2303045e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='20'%3E" + value.title + "%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-headline-md text-primary text-lg mb-2">
                    {value.title}
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section - with images */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 bg-brand-ice text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/10">
            Nos Solutions
          </span>
          <h2 className="font-headline-lg text-brand-imperial mt-4">
            Nos solutions pour votre réussite
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Recherche d'emploi",
              description: "Accédez rapidement à un emploi en Allemagne",
              image: "https://www.forcemanagement.net/user_files/recherche_demploi958.jpg",
            },
            {
              title: "Développement de carrière",
              description: "Construisez une carrière solide et évolutive",
              image: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/8103728/592175_687021.jpeg",
            },
            {
              title: "Nouvelles opportunités",
              description: "Découvrez des perspectives professionnelles innovantes",
              image: "https://www.dynamique-mag.com/wp-content/uploads/0cb230e2e51781a6b2c1432ebacfcd27.jpg",
            },
            {
              title: "Expérience de travail",
              description: "Acquérez l'expérience nécessaire pour réussir",
              image: "https://tkh.tlfr.ca/assets/articles/uf/experience-sur-un-tableau.jpg",
            },
            {
              title: "Perfectionnement",
              description: "Améliorez vos compétences pour un meilleur emploi",
              image: "https://www.cegeplevis.ca/wp-content/uploads/2022/05/perfectionnement_banniere-900x600-c-center.jpg",
            },
          ].map((solution, index) => (
            <div
              key={index}
              className="card-hover rounded-2xl border border-outline-variant bg-surface-container-lowest overflow-hidden transition-all duration-300 group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2303045e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='20'%3E" + solution.title + "%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-headline-md text-primary text-base mb-1">
                  {solution.title}
                </h3>
                <p className="font-body-md text-on-surface-variant text-sm">
                  {solution.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section - Updated numbers */}
      <section className="bg-gradient-to-br from-brand-imperial/5 via-secondary/5 to-brand-imperial/5 border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "170+", label: "Candidats accompagnés", icon: "👥" },
              { value: "10+", label: "Entreprises partenaires", icon: "🏢" },
              { value: "95%", label: "Taux de satisfaction", icon: "⭐" },
              { value: "7+", label: "Années d'expertise", icon: "📅" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="font-display-lg text-secondary text-3xl md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-caption text-on-surface-variant mt-2 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
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