// src/app/company/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import {
  CheckCircle2,
  Shield,
  Users,
  GraduationCap,
  Globe2,
  Clock,
  ArrowRight,
  Target,
  Award,
} from "lucide-react";
import FirmaNav from "@/components/FirmaNav";

// Cloudinary helper
const CLOUDINARY_BASE = "https://res.cloudinary.com/girgi5fd/image/upload/";

const cloudinary = (path: string) => {
  return `${CLOUDINARY_BASE}${path}`;
};

// Logo URLs (reused from candidate homepage)
const AVS_GROUP_LOGO = "v1786965482/avs-group-logo.png";
const AVS_HERGLA_FORMA_LOGO = "v1786965483/avs-hergla-forma-logo.png";
const IFT_GLOBAL_LOGO = "v1786965485/ift-global-logo.png";
const AVS_CARE_FORMA_LOGO = "v1786965487/avs-care-form-logo.png";

// Animated Counter Component
function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * target);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, target, duration]);

  // Format number with + suffix if needed
  const displayValue = target >= 1000 ? `${count}+` : count;

  return <div ref={counterRef}>{displayValue}</div>;
}

export default function CompanyPage() {
  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [flippedLogo, setFlippedLogo] = useState<number | null>(null);

  const slides = [
    {
      image: cloudinary("v1786965592/img1.jpg"),
      title: "Votre solution contre la pénurie de main-d'œuvre qualifiée en Allemagne",
      subtitle: "Nous recrutons, formons et intégrons des talents tunisiens qualifiés pour votre entreprise – de A à Z.",
    },
    {
      image: cloudinary("v1786965592/img2.jpg"),
      title: "Des talents qualifiés selon les standards allemands",
      subtitle: "Formation linguistique certifiée (B1/B2) + formation interculturelle pour une intégration réussie.",
    },
    {
      image: cloudinary("v1786965605/img4.jpg"),
      title: "95% de taux de réussite en première année d'intégration",
      subtitle: "Une approche éprouvée qui réduit les risques et garantit votre satisfaction.",
    },
    {
      image: cloudinary("v1786965597/img5.jpg"),
      title: "Transparence totale sur les coûts et le processus",
      subtitle: "Nous vous accompagnons à chaque étape avec clarté et honnêteté.",
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

  // Benefits data for companies - WITH IMAGES INSTEAD OF ICONS
  const benefits = [
    {
      image: "https://connexio-eu.s3.amazonaws.com/uploads/article/picture/616/Comment_les_recruteurs_trouvent_leurs_candidats_en_Allemagne__5_techniques_de_sourcing_incontournables.jpg",
      title: "Talents qualifiés selon les standards allemands",
      description:
        "Accédez à un vivier de jeunes talents tunisiens motivés, formés selon les exigences les plus élevées du marché allemand.",
    },
    {
      image: "https://previews.123rf.com/images/genialbaron/genialbaron1207/genialbaron120700005/14598351-solution-key.jpg",
      title: "Solution clé en main",
      description:
        "Du recrutement à la formation linguistique certifiée en passant par le placement – nous prenons en charge l'intégralité du processus.",
    },
    {
      image: "https://toafl.com/wp-content/uploads/2018/03/eu-star-B1B2.png",
      title: "Formation certifiée B1/B2 + interculturelle",
      description:
        "Nos candidats suivent un programme structuré avec des cours d'allemand certifiés CECR et une préparation interculturelle complète.",
    },
    {
      image: "https://i0.wp.com/www.lapresse.tn/wp-content/uploads/2026/06/bac-tunisie.png?fit=1672%2C941&quality=80&ssl=1",
      title: "95% de taux de réussite à l'intégration",
      description:
        "Notre approche éprouvée garantit un taux de rétention exceptionnel de 95% en première année dans votre entreprise.",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREG73q6uEfi8PpNv-hHB8isOxzGERzQgl-kieo05i88xUobBxm0HN-2fwj&s=10",
      title: "Transparence totale",
      description:
        "Nous vous offrons une visibilité complète sur tous les coûts et chaque étape du processus, pour une collaboration sereine.",
    },
    {
      image: "https://www.etikouest-packaging.com/wp-content/uploads/2016/10/icone-garantie-qualite.png",
      title: "Garantie qualité",
      description:
        "Nous assurons un suivi continu et un accompagnement personnalisé pour maintenir les plus hauts standards de qualité.",
    },
  ];

  // Company stats with numeric values for animation
  const companyStats = [
    { value: 170, label: "Talents placés", icon: "👥", suffix: "+" },
    { value: 95, label: "Taux de rétention", icon: "📊", suffix: "%" },
    { value: 12, label: "Secteurs d'activité", icon: "🏢", suffix: "+" },
    { value: 7, label: "Années d'expertise", icon: "⭐", suffix: "+" },
  ];

  // Process steps for companies
  const steps = [
    {
      number: "01",
      title: "Analyse des besoins",
      description:
        "Nous analysons vos besoins spécifiques et créons un profil personnalisé pour vos postes à pourvoir.",
    },
    {
      number: "02",
      title: "Recrutement & Sélection",
      description:
        "Nous trouvons et sélectionnons les meilleurs talents qualifiés selon les standards allemands.",
    },
    {
      number: "03",
      title: "Formation certifiée",
      description:
        "Nos candidats suivent des cours intensifs d'allemand B1/B2 et une formation interculturelle complète.",
    },
    {
      number: "04",
      title: "Intégration & Suivi",
      description:
        "Nous accompagnons l'ensemble du processus d'intégration et assurons un suivi personnalisé.",
    },
  ];

  // Logo flip data (reused from candidate homepage)
  const LOGOS_WITH_FLIP = [
    {
      id: 0,
      name: "AVS Hergla Forma",
      logoId: AVS_HERGLA_FORMA_LOGO,
      flipImage: "https://www.studying-in-germany.org/wp-content/uploads/2013/01/learn-german-language.jpg",
      flipText: "Formation linguistique certifiée"
    },
    {
      id: 1,
      name: "IFT Global",
      logoId: IFT_GLOBAL_LOGO,
      flipImage: "https://static.wixstatic.com/media/193d2c_a22dc120727042a3944e798147893d79~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_90/visa-germany-d-visa.jpg",
      flipText: "Recrutement international"
    },
    {
      id: 2,
      name: "AVS Care Forma",
      logoId: AVS_CARE_FORMA_LOGO,
      flipImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD6mYkLfBw-8VlCYqvF2j8q0gX57z7WT5rlDObUS_7BLa0z-XtVZnVyMs&s=10",
      flipText: "Formation aux métiers du soin"
    }
  ];

  return (
    <>
      <Topbar />
      <FirmaNav />

      {/* Hero Slider Section */}
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
                  <span className="inline-flex items-center px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-white/30 mb-4">
                    Pourquoi AVS TUNISIA ?
                  </span>
                  <h1 className="font-display-lg-mobile md:font-display-lg text-white mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="font-body-lg text-white/90 md:text-xl">
                    {slide.subtitle}
                  </p>

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
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg space-y-16">

      {/* Introduction Section - Enhanced with Image Grid Layout */}
      <section className="glass-panel rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden ambient-shadow">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-ice text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/10 mb-4">
                <Target className="h-4 w-4" />
                Pourquoi AVS TUNISIA ?
              </span>
              <h2 className="font-headline-lg text-brand-imperial mb-6 leading-tight text-balance">
                Votre partenaire de confiance pour le recrutement international
              </h2>
              <p className="font-body-lg text-on-surface-variant mb-8 max-w-xl text-balance leading-relaxed">
                AVS TUNISIA GROUP est votre partenaire de confiance pour le
                recrutement de talents qualifiés de Tunisie. Grâce à notre
                double atout – AVS Hergla Forma pour la formation linguistique
                certifiée et IFT Global pour le recrutement – nous vous offrons
                une solution complète pour vos besoins en personnel.
              </p>
              
              {/* Value Points with Icons */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="font-body-md text-on-surface-variant">
                    Talents qualifiés selon les standards allemands
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="font-body-md text-on-surface-variant">
                    Formation linguistique certifiée (B1/B2) + interculturelle
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="font-body-md text-on-surface-variant">
                    95% de taux de réussite en première année d'intégration
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="font-body-md text-on-surface-variant">
                    Transparence totale sur les coûts et le processus
                  </span>
                </div>
              </div>

              {/* Highlight Box */}
              <div className="p-4 bg-secondary-container/20 rounded-lg border border-secondary-container/30">
                <p className="font-body-md text-secondary font-medium flex items-center gap-2">
                  <span>💡</span>
                  Nous vous proposons des jeunes talents qualifiés et motivés de
                  Tunisie – nous réduisons les risques et la complexité pour votre
                  entreprise.
                </p>
              </div>
            </div>

            {/* Right side - Image Grid (adapted from About Section) */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src={cloudinary("v1786965592/img1.jpg")}
                alt="AVS Tunisia Group — recrutement 1"
                className="rounded-xl h-48 w-full object-cover shadow-md hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2303045e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='20'%3EAVS Tunisia%3C/text%3E%3C/svg%3E";
                }}
              />
              <img
                src={cloudinary("v1786965592/img2.jpg")}
                alt="AVS Tunisia Group — recrutement 2"
                className="rounded-xl h-48 w-full object-cover mt-8 shadow-md hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2303045e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='20'%3EAVS Tunisia%3C/text%3E%3C/svg%3E";
                }}
              />
              <img
                src={cloudinary("v1786965589/img3.jpg")}
                alt="AVS Tunisia Group — recrutement 3"
                className="rounded-xl h-56 w-full object-cover col-span-2 shadow-md hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2303045e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='20'%3EAVS Tunisia%3C/text%3E%3C/svg%3E";
                }}
              />
              <img
                src={cloudinary("v1786965605/img4.jpg")}
                alt="AVS Tunisia Group — recrutement 4"
                className="rounded-xl h-48 w-full object-cover shadow-md hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2303045e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='20'%3EAVS Tunisia%3C/text%3E%3C/svg%3E";
                }}
              />
              <img
                src={cloudinary("v1786965597/img5.jpg")}
                alt="AVS Tunisia Group — recrutement 5"
                className="rounded-xl h-48 w-full object-cover mt-8 shadow-md hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2303045e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='20'%3EAVS Tunisia%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>
        </div>
      </section>

        {/* Company Stats - Animated */}
        <section className="bg-gradient-to-br from-brand-imperial/5 via-secondary/5 to-brand-imperial/5 border border-outline-variant/30 rounded-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="font-display-lg text-secondary text-3xl md:text-4xl">
                  <AnimatedCounter target={stat.value} duration={2000} />
                  {stat.suffix}
                </div>
                <div className="text-caption text-on-surface-variant mt-2 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Grid - WITH IMAGES INSTEAD OF ICONS - 3 per row */}
        <section>
          <h3 className="font-headline-md text-on-surface mb-6">
            Vos avantages en un coup d'œil
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="glass-panel rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden card-hover ambient-shadow group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2303045e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='20'%3E" + benefit.title + "%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  {/* Overlay gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h4 className="font-headline-md text-sm text-on-surface mb-1">
                    {benefit.title}
                  </h4>
                  <p className="font-body-md text-sm text-on-surface-variant">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Group Hierarchy Section */}
        <section>
          <div className="mt-16 pt-10 border-t border-outline-variant">
            <p className="font-caption text-on-surface-variant uppercase tracking-wider text-center mb-8">
              Notre groupe
            </p>
            <div className="glass-panel ambient-shadow rounded-2xl p-8 md:p-12 max-w-4xl mx-auto flex flex-col items-center">
              {/* AVS Group Logo */}
              <img
                src={cloudinary(AVS_GROUP_LOGO)}
                alt="AVS Group"
                className="h-48 md:h-64 object-contain mb-10 transition-transform duration-300 hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%2303045e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24' font-weight='bold'%3EAVS Group%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="w-full border-t border-outline-variant pt-10 flex flex-wrap justify-center gap-8 md:gap-12">
                {LOGOS_WITH_FLIP.map((logo) => {
                  const isFlipped = flippedLogo === logo.id;
                  
                  return (
                    <div 
                      key={logo.id} 
                      className="flex flex-col items-center gap-3 flex-1 min-w-[200px] max-w-[280px]"
                      onMouseEnter={() => setFlippedLogo(logo.id)}
                      onMouseLeave={() => setFlippedLogo(null)}
                    >
                      <div className="relative h-64 w-full perspective-1000 cursor-pointer">
                        <div
                          className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                            isFlipped ? "rotate-y-180" : ""
                          }`}
                        >
                          {/* Front Face - Logo */}
                          <div className="absolute inset-0 backface-hidden">
                            <div className="card-hover h-full w-full rounded-xl border border-outline-variant bg-surface-container-lowest flex items-center justify-center p-8 transition-transform duration-300 hover:scale-105">
                              <img
                                src={cloudinary(logo.logoId)}
                                alt={logo.name}
                                className="max-h-full max-w-full object-contain"
                                onError={(e) => {
                                  const parent = (e.target as HTMLImageElement).parentElement;
                                  if (parent) {
                                    const fallback = document.createElement('div');
                                    fallback.className = 'h-full w-full flex items-center justify-center font-headline-md text-on-surface-variant text-center p-2';
                                    fallback.textContent = logo.name;
                                    parent.appendChild(fallback);
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }
                                }}
                              />
                            </div>
                          </div>

                          {/* Back Face - Flip Image */}
                          <div className="absolute inset-0 backface-hidden rotate-y-180">
                            <div className="h-full w-full rounded-xl overflow-hidden bg-gradient-to-br from-brand-imperial/5 to-secondary/5 border border-secondary/30">
                              <img
                                src={logo.flipImage}
                                alt={logo.flipText}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2303045e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24'%3E" + logo.flipText + "%3C/text%3E%3C/svg%3E";
                                }}
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                <h4 className="font-headline-md text-white text-center text-base">
                                  {logo.flipText}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="font-headline-md text-on-surface-variant text-center">{logo.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Process Overview - New Timeline Design */}
        <section className="py-section-gap-md md:py-section-gap-lg relative">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/2">
                <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
                  Notre processus en 4 étapes
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-12">
                  Une approche structurée en 4 étapes pour sécuriser les meilleurs talents pour votre organisation.
                </p>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-secondary before:to-transparent">
                  
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-brand-imperial text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 font-label-md text-label-md z-10">
                      1
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-xl bg-white border border-outline-variant/30 ambient-shadow">
                      <h4 className="font-headline-md text-headline-md text-brand-imperial mb-2 text-lg">
                        Analyse des besoins
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                        Nous analysons vos besoins spécifiques et créons un profil personnalisé pour vos postes à pourvoir.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-surface-container-high text-on-surface-variant shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 font-label-md text-label-md z-10 transition-colors duration-300 group-hover:bg-brand-imperial group-hover:text-white">
                      2
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-xl bg-white border border-outline-variant/30 ambient-shadow">
                      <h4 className="font-headline-md text-headline-md text-brand-imperial mb-2 text-lg">
                        Recrutement & Sélection
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                        Nous trouvons et sélectionnons les meilleurs talents qualifiés selon les standards allemands.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-surface-container-high text-on-surface-variant shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 font-label-md text-label-md z-10 transition-colors duration-300 group-hover:bg-brand-imperial group-hover:text-white">
                      3
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-xl bg-white border border-outline-variant/30 ambient-shadow">
                      <h4 className="font-headline-md text-headline-md text-brand-imperial mb-2 text-lg">
                        Formation certifiée
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                        Nos candidats suivent des cours intensifs d'allemand B1/B2 et une formation interculturelle complète.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-surface-container-high text-on-surface-variant shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 font-label-md text-label-md z-10 transition-colors duration-300 group-hover:bg-brand-imperial group-hover:text-white">
                      4
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-xl bg-white border border-outline-variant/30 ambient-shadow">
                      <h4 className="font-headline-md text-headline-md text-brand-imperial mb-2 text-lg">
                        Intégration & Suivi
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                        Nous accompagnons l'ensemble du processus d'intégration et assurons un suivi personnalisé.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 hidden md:block">
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden glass-panel ambient-shadow p-4">
                  <div 
                    className="bg-cover bg-center w-full h-full rounded-2xl"
                    style={{
                      backgroundImage: "url('https://res.cloudinary.com/girgi5fd/image/upload/v1787730401/Copie_de_Article.png')",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="glass-panel rounded-xl shadow-sm border border-outline-variant/30 p-8 text-center ambient-shadow">
          <h3 className="font-headline-md text-on-surface mb-3">
            Prêt à recruter vos talents qualifiés ?
          </h3>
          <p className="font-body-lg text-on-surface-variant mb-6">
            Contactez-nous dès aujourd'hui pour un entretien de conseil sans engagement.
          </p>
          <Link
            href="/company/kontakt-beratung"
            className="inline-flex items-center gap-2 bg-brand-imperial text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-imperial/90 transition-colors btn-primary glass-highlight"
          >
            Prendre contact maintenant
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>

      <Footer />
    </>
  );
}