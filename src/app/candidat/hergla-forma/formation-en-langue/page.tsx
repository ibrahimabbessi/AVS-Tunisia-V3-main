// src/app/hergla-forma/formation-en-langue/page.tsx
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

type FormData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  email: string;
  city: string;
  level: string;
  message: string;
  courseType?: string;
};

type SubLevel = {
  name: string;
  price: number;
};

type CourseCard = {
  id: string;
  title: string;
  icon: string;
  description: string;
  content: string;
  images: string[];
  subLevels?: SubLevel[];
  hours?: string;
  price?: number;
  duration?: string;
  level?: string;
};

const courseData: CourseCard[] = [
  {
    id: "intensif",
    title: "Cours Intensif",
    icon: "📚",
    description: "Immersion totale avec sessions 5 fois par semaine",
    content:
      "Le cours intensif est le produit phare de notre centre de formation linguistique allemande, AVS Forma. Il couvre tous les niveaux, de A1 à B2, incluant tous les sous-niveaux. Au cours de cette formation en allemand, tu as l'opportunité d'immerger dans la langue de manière intensive, avec des sessions cinq fois par semaine, du lundi au vendredi. Nous mettons l'accent sur la conversation, l'apprentissage de la grammaire et du vocabulaire, ainsi que sur l'amélioration de la compréhension orale et de la production écrite.",
    images: [
      "https://www.innovation-en-education.fr/wp-content/uploads/2022/08/Comment-rendre-un-cours-plus-inte%CC%81ressant1.jpg",
      "https://static.actu.fr/uploads/2024/03/lycee-960x640.jpeg",
      "https://www.ludomag.com/wp-content/uploads/2020/11/Prometheanimge2_art4_241120.jpg",
    ],
    subLevels: [
      { name: "A1.1", price: 400 },
      { name: "A1.2", price: 400 },
      { name: "A2.1", price: 400 },
      { name: "A2.2", price: 400 },
      { name: "B1.1", price: 500 },
      { name: "B1.2", price: 500 },
      { name: "B2.1", price: 500 },
      { name: "B2.2", price: 500 },
    ],
    hours: "40h (soir) / 60h (jour) par sous-niveau",
  },
  {
    id: "en-ligne",
    title: "Cours en ligne",
    icon: "💻",
    description: "Apprentissage flexible avec ressources interactives",
    content:
      "Nos cours en ligne offrent une expérience éducative immersive, combinant la flexibilité de l'apprentissage à distance avec des ressources pédagogiques interactives. Grâce à notre approche innovante, vous pourrez développer vos compétences et connaissances tout en bénéficiant du soutien personnalisé de nos experts. Rejoignez-nous pour une expérience d'apprentissage en ligne enrichissante et adaptée à vos besoins.",
    images: [
      "https://f.hellowork.com/blogdumoderateur/2015/08/formation-en-ligne.jpg",
      "https://my-life.lu/wp-content/uploads/2020/10/Article_56040-1939x1200.jpg",
      "https://www.globallingua.ca/hubfs/cours-en-ligne-pour-adolescent.jpg",
    ],
    subLevels: [
      { name: "A1.1", price: 400 },
      { name: "A1.2", price: 400 },
      { name: "A2.1", price: 400 },
      { name: "A2.2", price: 400 },
      { name: "B1.1", price: 500 },
      { name: "B1.2", price: 500 },
      { name: "B2.1", price: 500 },
      { name: "B2.2", price: 500 },
    ],
    hours: "40h (soir) / 60h (jour) par sous-niveau",
  },
  {
    id: "professionnel",
    title: "Cours d'allemand Professionnel",
    icon: "💼",
    description: "Développement linguistique pour l'intégration professionnelle",
    content:
      "Développement linguistique pour favoriser l'intégration et l'adaptation au milieu professionnel. Vous souhaitez travailler à l'étranger en Allemagne dans votre domaine professionnel ? Si vous prévoyez de faire cette démarche en allemand, il est nécessaire de prouver que vous possédez les connaissances linguistiques requises pour exercer votre métier. Réservez dès maintenant notre cours intensif de préparation à la vie professionnelle !",
    images: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1740635341299-3b8e3490f546?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1663050763436-818382a24bb8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    level: "Avancé - vocabulaire spécifique",
    hours: "40h",
    price: 400,
  },
  {
    id: "conversation",
    title: "Cours d'expression & conversation",
    icon: "💬",
    description: "Améliorez votre fluidité et votre assurance",
    content:
      "Tu souhaites améliorer ton allemand et gagner en fluidité, élargir ton vocabulaire et communiquer avec plus d'assurance avec autrui ? Entraîne-toi à l'expression orale (1 ou 2 fois par semaine) pendant une période de 4 à 6 semaines, que ce soit dans notre centre de formation AVS Forma à Hammam Sousse ou à travers un cours en ligne.\n\nCours d'expression allemande : Entraîne-toi à la prononciation de la langue allemande en pratiquant différents sons qui pourraient ne pas exister dans ta langue maternelle. À cette fin, nous organisons des sessions de pratique de la prononciation de mots et de phrases en allemand, une fois par semaine le mercredi, sur une période de 4 à 6 semaines à Hammam Sousse (Deutsch Kaffee).",
    images: [
      "https://plus.unsplash.com/premium_photo-1681492985238-c03c92137e0f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://media.istockphoto.com/id/1321373947/photo/two-women-in-a-business-meeting-in-an-office-conference-room.jpg?s=2048x2048&w=is&k=20&c=_iDBU3zinndhlOMHZ_aMq3adDzqfO4anjnwjYIbjIx0=",
    ],
    duration: "20h",
    price: 300,
  },
  {
    id: "certification",
    title: "Préparation à la certification",
    icon: "🏆",
    description: "Préparez-vous aux examens telc B1 ou B2",
    content:
      "Tu désires démontrer ton niveau avancé en langue en passant l'examen allemand telc B1 ou B2, que ce soit pour des motifs professionnels, universitaires ou personnels ? Prépare-toi à l'examen telc allemand à Hammam Sousse au sein de ton école de langue allemande 'AVS Forma' pendant une période de 4 à 6 semaines.",
    images: [
      "https://images.unsplash.com/photo-1752578753798-ff3a23e16498?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1617529497832-5ad49d9b5928?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    duration: "20h",
    price: 300,
  },
  {
    id: "vie-professionnelle",
    title: "Préparation à la vie professionnelle",
    icon: "🏢",
    description: "Préparez-vous au succès sur le marché du travail allemand",
    content:
      "Plongez dans l'excellence professionnelle avec notre centre de formation de langue allemande, dédié à guider nos étudiants vers le succès sur le marché du travail allemand. Chez AVS HERGLA FORMA, nous croyons fermement que la maîtrise de la langue allemande est la clé pour ouvrir les portes de l'opportunité et de la croissance professionnelle.\n\nNotre approche novatrice va bien au-delà de l'apprentissage linguistique conventionnel. Nous avons conçu des programmes de formation spécifiquement orientés vers les besoins du marché de travail allemand. Nos cours sont soigneusement conçus pour armer nos étudiants des compétences linguistiques, professionnelles et interculturelles nécessaires pour exceller dans leur domaine.\n\nEn choisissant AVS HERGLA FORMA, vous bénéficiez d'une expérience d'apprentissage immersive et pratique. Nos formateurs expérimentés, dotés d'une expertise pointue dans le domaine professionnel allemand, vous guideront à travers des situations réelles, des simulations professionnelles et des exercices concrets. Vous serez préparés à communiquer avec aisance et confiance, que ce soit lors d'entretiens d'embauche, de réunions d'affaires ou de collaboration au sein d'équipes multiculturelles.\n\nNous comprenons que chaque étudiant a des objectifs professionnels uniques. C'est pourquoi nous offrons des programmes flexibles adaptés à vos aspirations. Que vous visiez un secteur spécifique tel que l'ingénierie, la finance, la santé ou d'autres domaines, nous personnalisons nos cours pour répondre à vos besoins spécifiques.\n\nLancez-vous dans votre voyage vers une carrière fructueuse en Allemagne avec AVS HERGLA FORMA. Nous sommes déterminés à vous offrir bien plus qu'une simple maîtrise de la langue. Nous vous préparons à briller sur la scène professionnelle allemande grâce à une combinaison inégalée de compétences linguistiques et de savoir-faire pratique. Votre succès professionnel commence ici.",
    images: [
      "https://plus.unsplash.com/premium_photo-1664908454171-0296b05bd3b7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1682433104883-cfde56c3a83b?q=80&w=1182&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1762341109322-7fc6e729ec31?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    level: "Avancé",
    duration: "20h",
    price: 300,
  },
];

const levelOptions = [
  "Débutant",
  "A1.1",
  "A1.2",
  "A2.1",
  "A2.2",
  "B1.1",
  "B1.2",
  "B2.1",
  "B2.2",
];

// Image Slider Component
function ImageSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000); // Changed from 3000 to 10000 (10 seconds)

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-48 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='16'%3EImage non disponible%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
      ))}
      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-6 bg-white"
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// SubLevel Pricing Component
function SubLevelPricing({ subLevels }: { subLevels: SubLevel[] }) {
  const aLevels = subLevels.filter(s => s.name.startsWith('A'));
  const bLevels = subLevels.filter(s => s.name.startsWith('B'));

  return (
    <div className="mt-3">
      <p className="font-label-md text-on-surface-variant text-sm mb-2">Prix par sous-niveau :</p>
      <div className="flex flex-wrap gap-2">
        {aLevels.map((level) => (
          <span key={level.name} className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-ice/50 rounded-full text-xs font-medium text-brand-imperial">
            {level.name}: {level.price} DT
          </span>
        ))}
        {bLevels.map((level) => (
          <span key={level.name} className="inline-flex items-center gap-1 px-2.5 py-1 bg-secondary/10 rounded-full text-xs font-medium text-secondary">
            {level.name}: {level.price} DT
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FormationLangue() {
  const [selectedCourse, setSelectedCourse] = useState<CourseCard | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    email: "",
    city: "",
    level: "",
    message: "",
    courseType: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, course: selectedCourse?.title });
    alert("Votre demande a été envoyée avec succès !");
    setSelectedCourse(null);
    setFormData({
      firstName: "",
      lastName: "",
      birthDate: "",
      phone: "",
      email: "",
      city: "",
      level: "",
      message: "",
      courseType: "",
    });
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                Hergla Forma
              </span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                Formation en Langue
              </span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
              Formation en Langue
            </h1>
            <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
            <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed max-w-3xl">
              Découvrez nos cours d'allemand adaptés à tous les niveaux
            </p>
            <p className="font-body-md text-on-surface-variant mt-2 leading-relaxed max-w-3xl">
              Du A1 au B2, conformément au Cadre européen commun de référence pour les langues (CECRL)
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg">
        
        {/* Course Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courseData.map((course) => (
            <div
              key={course.id}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-outline-variant/30"
              onClick={() => setSelectedCourse(course)}
            >
              {/* Image Slider */}
              <ImageSlider images={course.images} />

              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{course.icon}</span>
                  <h3 className="font-headline-md text-primary text-lg">
                    {course.title}
                  </h3>
                </div>
                <p className="font-body-md text-on-surface-variant text-sm mb-3">
                  {course.description}
                </p>
                <div className="flex items-center text-secondary font-label-md text-sm group-hover:gap-2 transition-all">
                  <span>En savoir plus</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popup Modal */}
      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCourse(null);
          }}
        >
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-surface-container-lowest shadow-2xl animate-in slide-in-from-bottom-10 duration-300 border border-outline-variant/30">
            {/* Close button */}
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute right-4 top-4 rounded-full bg-surface-container-low p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-6 md:p-8">
              {/* Course Header */}
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-xl bg-brand-ice p-3 text-2xl">
                  {selectedCourse.icon}
                </div>
                <div>
                  <h2 className="font-headline-lg text-brand-imperial text-2xl">
                    {selectedCourse.title}
                  </h2>
                  <p className="font-body-md text-on-surface-variant text-sm">
                    {selectedCourse.description}
                  </p>
                </div>
              </div>

              {/* Course Content */}
              <div className="mb-6 rounded-xl bg-surface-container-low p-4 border border-outline-variant/30">
                <div className="font-body-md text-on-surface-variant text-sm whitespace-pre-line leading-relaxed">
                  {selectedCourse.content}
                </div>
              </div>

              {/* Course Details */}
              <div className="mb-6 rounded-xl bg-brand-ice/20 p-4 border border-brand-imperial/10">
                <h4 className="font-label-md text-brand-imperial mb-2">Détails du cours</h4>
                
                {selectedCourse.subLevels && (
                  <>
                    <p className="font-body-md text-on-surface-variant text-sm">
                      <span className="font-semibold">Durée :</span> {selectedCourse.hours}
                    </p>
                    <SubLevelPricing subLevels={selectedCourse.subLevels} />
                  </>
                )}

                {selectedCourse.price && (
                  <div className="space-y-1">
                    <p className="font-body-md text-on-surface-variant text-sm">
                      <span className="font-semibold">Prix :</span> {selectedCourse.price} DT
                    </p>
                    {selectedCourse.duration && (
                      <p className="font-body-md text-on-surface-variant text-sm">
                        <span className="font-semibold">Durée :</span> {selectedCourse.duration}
                      </p>
                    )}
                    {selectedCourse.level && (
                      <p className="font-body-md text-on-surface-variant text-sm">
                        <span className="font-semibold">Niveau :</span> {selectedCourse.level}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-headline-md text-brand-imperial text-lg">
                  Formulaire d'inscription
                </h3>

                {selectedCourse.id === "intensif" && (
                  <div>
                    <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                      Type de cours
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-sm text-on-surface-variant">
                        <input
                          type="radio"
                          name="courseType"
                          value="matin"
                          onChange={handleInputChange}
                          className="text-secondary"
                        />
                        Matin
                      </label>
                      <label className="flex items-center gap-2 text-sm text-on-surface-variant">
                        <input
                          type="radio"
                          name="courseType"
                          value="soir"
                          onChange={handleInputChange}
                          className="text-secondary"
                        />
                        Soir
                      </label>
                    </div>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                      Prénom <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">👤</span>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-10 py-2.5 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                        placeholder="Votre prénom"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                      Nom <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2.5 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                      Date de naissance <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">📅</span>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-10 py-2.5 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                      Tél./Mobile <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">📱</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-10 py-2.5 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                        placeholder="Votre numéro de téléphone"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                      Email <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">✉️</span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-10 py-2.5 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                        placeholder="Votre adresse email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                      Ville <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">📍</span>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-10 py-2.5 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                        placeholder="Votre ville"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                    Niveau
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2.5 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  >
                    <option value="">Sélectionnez votre niveau</option>
                    {levelOptions.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                    Votre message <span className="text-on-surface-variant/60">(facultatif)</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2.5 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    placeholder="Écrivez votre message ici..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCourse(null)}
                    className="rounded-lg border border-outline-variant/30 px-4 py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-imperial text-white rounded-lg font-label-md transition-all duration-300 hover:bg-brand-imperial/90 hover:scale-[1.02] shadow-lg"
                  >
                    <span>✉️</span>
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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