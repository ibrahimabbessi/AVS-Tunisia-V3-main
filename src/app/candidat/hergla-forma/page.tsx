// src/app/hergla-forma/page.tsx
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function HerglaFormaPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
      title: "Formation professionnelle de qualité",
      subtitle: "Découvrez nos programmes adaptés à vos besoins",
    },
    {
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
      title: "Apprenez l'allemand avec nous",
      subtitle: "Des cours pour tous les niveaux",
    },
    {
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
      title: "Préparez votre avenir en Allemagne",
      subtitle: "Accompagnement personnalisé vers la réussite",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const values = [
    {
      icon: "❤️",
      title: "L'égalité",
      description: "Égalité des chances pour tous les apprenants",
    },
    {
      icon: "👥",
      title: "L'appartenance",
      description: "Créer une communauté solidaire et inclusive",
    },
    {
      icon: "🛡️",
      title: "La gouvernance",
      description: "Une gestion transparente et responsable",
    },
    {
      icon: "👁️",
      title: "La transparence",
      description: "Communication claire et honnête",
    },
    {
      icon: "🏆",
      title: "La redevabilité",
      description: "Engagement envers l'excellence et la qualité",
    },
  ];

  const missions = [
    {
      icon: "🎓",
      title: "Centre éducatif et culturel",
      description: "Nous formons les élites en langue allemande suivant la norme CECR du CADRE EUROPEEN COMMUN DE REFERENCE pour les langues.",
    },
    {
      icon: "👥",
      title: "Consultants",
      description: "Nous fournissons un soutien stratégique pour nos candidats.",
    },
    {
      icon: "✨",
      title: "Centre moderne",
      description: "Nous essayons d'optimiser vos performances en développant de manière innovante.",
    },
    {
      icon: "🎯",
      title: "Centre d'évaluation",
      description: "Nous vous orientons vers la force d'agir en fonction des applications.",
    },
  ];

  const galleryImages = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    src: `https://images.unsplash.com/photo-${[
      "1524178232363-1fb2b075b655",
      "1571260899304-425eee4c7efc",
      "1523240795612-9a054b0db644",
      "1522202174988-5b60d8c9f6f9",
      "1521737852567-6949b3e8d8a3",
      "1517487888296-1c6b4c3fda8f",
      "1522202174988-5b60d8c9f6f9",
      "1521737852567-6949b3e8d8a3",
    ][i] || "1524178232363-1fb2b075b655"}?q=80&w=400&auto=format&fit=crop`,
  }));

  return (
    <>
      <Navbar />

      {/* Section 0: Slider - Full Width Hero */}
      <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden pt-20">
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
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%2303045e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24'%3EAVS Hergla Forma%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center text-white">
                  <span className="inline-flex items-center px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-white/30 mb-4">
                    AVS Hergla Forma
                  </span>
                  <h1 className="font-display-lg-mobile md:font-display-lg text-white mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="font-body-lg text-white/90 md:text-xl">{slide.subtitle}</p>
                  <div className="mt-6">
                    <Link
                      href="/hergla-forma/formation-en-langue"
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-imperial rounded-xl font-label-md hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] shadow-lg"
                    >
                      Découvrir nos cours
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

      {/* Main Content */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg">
        {/* Introduction */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-brand-imperial/10 flex items-center justify-center text-2xl">
              🏢
            </div>
            <h1 className="font-display-lg text-brand-imperial">AVS Hergla Forma</h1>
          </div>

          <div className="space-y-6 font-body-md text-on-surface-variant leading-relaxed">
            <p>
              <span className="font-semibold text-brand-imperial">AVS HERGLA FORMA</span> est un centre de 
              formation professionnelle basé à SOUSSE, et agréé par l'état tunisien pour les formations 
              initiales et continues avec une variété de programmes, dans différents secteurs d'activité.
            </p>
            <p>
              Grâce à sa démarche pédagogique, son assistance technique, linguistique et son accompagnement, 
              AVS HERGLA FORMA peut vous ouvrir des nouveaux horizons, alors n'hésitez pas à nous contacter 
              pour avoir plus d'informations. Notre centre de formation propose de formation continue pour 
              les entreprises et les salariés afin de pouvoir donner aux membres de votre équipe les moyens 
              de développer leur potentiel et améliorer leurs compétences.
            </p>
            <p>
              AVS HERGLA FORMA vous donne la possibilité de suivre des formations professionnelles au sein 
              de votre société c'est à dire formations intra-entreprise, ou bien dans des locaux loués par 
              notre organisme ; soit des formations inter-entreprises. Notre centre de formation 
              professionnel dispense différents types de formations pour former les salariés et étudiants à 
              de nouvelles compétences professionnelles. En d'autres termes, d'optimiser la productivité 
              d'une entreprise et de diminuer le chômage.
            </p>
            <div className="rounded-xl bg-brand-ice/30 p-6 border border-brand-imperial/10">
              <p className="font-medium text-brand-imperial">
                La mission du AVS HERGLA FORMA est d'offrir une formation professionnelle de qualité qui 
                répond à la fois aux besoins du marché du travail et aux besoins en formation initiale ou 
                de perfectionnement.
              </p>
            </div>
            <p>
              Depuis des années, l'Allemagne affronte une demande importante de main-d'œuvre dans plusieurs 
              métiers surtout les métiers spécialisés. En suivant une formation professionnelle, vous pouvez 
              répondre à cette demande, et finir par avoir un poste stable et bien payé.
            </p>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-16">
          <h2 className="font-headline-lg text-brand-imperial mb-6 text-center">
            Notre galerie
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-xl bg-surface-container-low transition-all hover:shadow-md hover:scale-105"
              >
                <img
                  src={img.src}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='16'%3E📸%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Ready for Language Training */}
        <div className="mb-16 rounded-2xl bg-gradient-to-br from-brand-imperial to-brand-imperial/90 p-8 text-white shadow-lg">
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl mb-4">📚</span>
            <h2 className="font-headline-lg text-white mb-2">
              Êtes-vous prêt pour une formation linguistique ?
            </h2>
            <p className="font-body-md text-white/90 max-w-2xl leading-relaxed mb-6">
              Commencez à apprendre la langue allemande avec Hergla Forma à titre privé et professionnel 
              peu importe la raison pour laquelle vous souhaitez améliorer vos compétences linguistiques. 
              Nos formateurs expérimentés se concentreront sur vos besoins. Nous nous réjouissons de vous 
              raconter et serons heureux de vous conseiller personnellement et sans engagement quant au 
              cours de langue qui vous convient le mieux !
            </p>
            <Link
              href="/hergla-forma/formation-en-langue"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-imperial rounded-xl font-label-md hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] shadow-lg"
            >
              Découvrir nos cours
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Our Mission */}
        <div className="mb-16">
          <h2 className="font-headline-lg text-brand-imperial mb-6 text-center">
            Notre Mission
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {missions.map((mission, index) => (
              <div
                key={index}
                className="card-hover rounded-xl bg-surface-container-lowest p-6 border border-outline-variant/30 shadow-sm transition-all duration-300"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-full bg-brand-ice p-2.5 text-2xl">
                    {mission.icon}
                  </div>
                  <h3 className="font-headline-md text-primary">{mission.title}</h3>
                </div>
                <p className="font-body-md text-on-surface-variant text-sm">
                  {mission.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="font-headline-lg text-brand-imperial mb-6 text-center">
            Nos Valeurs
          </h2>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {values.map((value, index) => (
              <div
                key={index}
                className="group card-hover rounded-xl bg-surface-container-lowest p-6 text-center border border-outline-variant/30 shadow-sm transition-all duration-300"
              >
                <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-brand-ice text-2xl transition-colors group-hover:bg-brand-imperial group-hover:text-white">
                  {value.icon}
                </div>
                <h3 className="font-headline-md text-primary text-sm">{value.title}</h3>
                <p className="font-body-md text-on-surface-variant text-xs mt-1">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-imperial to-brand-imperial/90 p-8 text-center text-white shadow-lg">
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-4">💬</span>
            <h2 className="font-headline-lg text-white mb-2">
              Prêt à commencer votre formation ?
            </h2>
            <p className="font-body-md text-white/90 max-w-lg mb-6">
              Contactez-nous dès aujourd'hui pour découvrir nos programmes de formation
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
                href="/hergla-forma/formation-en-langue"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-secondary text-white rounded-xl font-label-md hover:bg-secondary/90 transition-all duration-300 hover:scale-[1.02] shadow-lg glass-highlight"
              >
                Voir nos programmes
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