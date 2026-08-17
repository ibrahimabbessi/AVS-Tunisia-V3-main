// src/app/a-propos/success-stories/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Star,
  Quote,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Calendar,
  MapPin,
  Award,
  Heart,
  MessageCircle,
  Play,
  ThumbsUp,
  Share2,
  BookOpen,
  GraduationCap,
  Briefcase,
  Clock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type SuccessStory = {
  id: string;
  name: string;
  description: string;
  fullStory: string;
  images: string[];
  badge?: string;
  date?: string;
  location?: string;
  category?: string;
  rating?: number;
};

const successStories: SuccessStory[] = [
  {
    id: "takwa-ben-slama",
    name: "Takwa Ben Slama",
    description: "Ausbildung en Allemagne - Infirmière",
    badge: "Diplômée 2024",
    date: "2020 - 2024",
    location: "Allemagne",
    category: "Santé",
    rating: 5,
    fullStory:
      "Je tiens à exprimer ma profonde gratitude envers l'agence AVS Forma qui m'a accompagnée dans mon projet de partir en Allemagne pour effectuer un Ausbildung.\n\nLeur soutien et leur professionnalisme m'ont été d'une aide inestimable tout au long du processus. Je dois souligner que cette agence s'est révélée hautement fiable. Dès le début, ils m'ont fourni des informations précises et claires concernant les démarches administratives, les exigences et les délais à respecter. Ils ont été présents à chaque étape et m'ont guidé de manière efficace. Cependant, je tiens à souligner que ce processus demande de la patience et une préparation minutieuse de la langue allemande.\n\nEn effet, la maîtrise de l'allemand est la clé essentielle pour réussir son intégration en Allemagne. Heureusement, l'agence m'a encouragé à m'investir pleinement dans l'apprentissage de la langue, ce qui s'est avéré décisif dans mon parcours.\n\nGrâce à leur accompagnement et à mes efforts dans l'apprentissage de la langue, j'ai pu réaliser mon rêve et entamer une Ausbildung réussie en Allemagne. Je recommande vivement cette agence à toute personne désireuse de partir étudier ou travailler en Allemagne, à condition d'être prête à investir du temps et des efforts dans la préparation de la langue allemande.\n\nJe me souviens encore des premiers jours où j'appréhendais l'inconnu, mais aujourd'hui, je suis tellement reconnaissante de cette opportunité. J'ai pu m'immerger dans une nouvelle culture, rencontrer des gens formidables et enrichir mon bagage professionnel d'une manière que je n'aurais jamais pu imaginer. Encore une fois, merci infiniment à l'équipe de l'agence pour leur soutien et leur expertise. Leur engagement envers la réussite de leur clientèle est véritablement exemplaire.",
    images: [
      "/images/success/takwa-1.jpg",
      "/images/success/takwa-2.jpg",
      "/images/success/takwa-3.jpg",
    ],
  },
  {
    id: "nawres-chouchene",
    name: "Nawres Chouchene",
    description: "Formation professionnelle en Allemagne",
    badge: "En cours",
    date: "2021 - Présent",
    location: "Allemagne",
    category: "Formation",
    rating: 5,
    fullStory:
      "Nawres a commencé son parcours avec AVS Forma avec une détermination exceptionnelle. Son histoire est celle d'une réussite progressive, marquée par des efforts constants et une volonté de fer.\n\nDès son arrivée en Allemagne, Nawres s'est immergée dans la culture et la langue allemande. Grâce au soutien de l'agence et à sa propre persévérance, elle a rapidement progressé dans son apprentissage.\n\nAujourd'hui, Nawres continue de briller dans sa formation professionnelle, inspirant d'autres jeunes à suivre ses pas. Son parcours démontre que la persévérance et le travail acharné sont les clés du succès.",
    images: [
      "/images/success/nawres-1.jpg",
      "/images/success/nawres-2.jpg",
      "/images/success/nawres-3.jpg",
    ],
  },
  {
    id: "marwa-ben-ahmed",
    name: "Marwa Ben Ahmed",
    description: "Diplômée en soins infirmiers",
    badge: "Diplômée 2024",
    date: "2020 - 2024",
    location: "Allemagne",
    category: "Santé",
    rating: 5,
    fullStory:
      "Sur les traces du succès des étudiants en soins infirmiers d'excellence, nous félicitons Marwa qui a commencé son voyage avec nous en 2020 avec un visa de formation professionnelle en Allemagne.\n\nAujourd'hui, ses efforts sont couronnés par l'obtention de son diplôme d'infirmière dans le pays de ses rêves, l'Allemagne !\n\nÀ tous ceux qui aspirent à réaliser leur rêve dans ce domaine, nous sommes ici pour vous soutenir et vous guider vers le succès. Rejoignez-nous et commencez votre parcours vers l'excellence et la réussite !",
    images: [
      "/images/success/marwa-1.jpg",
      "/images/success/marwa-2.jpg",
      "/images/success/marwa-3.jpg",
    ],
  },
  {
    id: "ayman-ammar",
    name: "Ayman Ammar",
    description: "Formation technique en Allemagne",
    badge: "En cours",
    date: "2022 - Présent",
    location: "Allemagne",
    category: "Technique",
    rating: 5,
    fullStory:
      "Ayman incarne parfaitement l'esprit de détermination et de passion qui caractérise les jeunes talents tunisiens. Son parcours en Allemagne est une source d'inspiration pour tous ceux qui rêvent de poursuivre une carrière internationale.\n\nGrâce à son engagement et au soutien d'AVS Forma, Ayman a pu développer ses compétences techniques et s'intégrer parfaitement dans le milieu professionnel allemand.\n\nSon histoire démontre qu'avec de la persévérance et un bon accompagnement, il est possible de réaliser ses ambitions professionnelles à l'étranger.",
    images: [
      "/images/success/ayman-1.jpg",
      "/images/success/ayman-2.jpg",
      "/images/success/ayman-3.jpg",
    ],
  },
  {
    id: "amina-sammouda",
    name: "Amina Sammouda",
    description: "Parcours d'excellence en Allemagne",
    badge: "Diplômée 2023",
    date: "2019 - 2023",
    location: "Allemagne",
    category: "Santé",
    rating: 5,
    fullStory:
      "Amina est un véritable modèle de réussite pour la jeunesse tunisienne. Son parcours exemplaire en Allemagne est le fruit d'un travail acharné et d'une détermination sans faille.\n\nSon histoire montre que les rêves peuvent devenir réalité avec les bons conseils, le bon accompagnement et beaucoup de persévérance. Amina a su saisir les opportunités qui se sont présentées à elle et les transformer en succès.\n\nNous sommes fiers d'avoir accompagné Amina dans son parcours et nous continuerons à soutenir d'autres jeunes talents comme elle.",
    images: [
      "/images/success/amina-1.jpg",
      "/images/success/amina-2.jpg",
      "/images/success/amina-3.jpg",
    ],
  },
];

export default function SuccessStoriesPage() {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...new Set(successStories.map(s => s.category || "Autre"))];
  
  const filteredStories = selectedCategory === "all" 
    ? successStories 
    : successStories.filter(s => s.category === selectedCategory);

  const openModal = (story: SuccessStory) => {
    setSelectedStory(story);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedStory(null);
    document.body.style.overflow = "";
  };

  const nextImage = () => {
    if (selectedStory) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedStory.images.length);
    }
  };

  const prevImage = () => {
    if (selectedStory) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedStory.images.length) % selectedStory.images.length);
    }
  };

  // Get category icon
  const getCategoryIcon = (category?: string) => {
    switch(category) {
      case "Santé": return <Heart className="size-4" />;
      case "Formation": return <BookOpen className="size-4" />;
      case "Technique": return <Briefcase className="size-4" />;
      default: return <Star className="size-4" />;
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-8 md:pt-48 md:pb-8 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent overflow-hidden">        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-brand-imperial blur-3xl"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="flex-1 max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                  IFT Global
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                  Success Stories
                </span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                Histoires de réussite
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed">
                Découvrez les témoignages inspirants de jeunes talents tunisiens qui ont réalisé leur rêve 
                en Allemagne grâce à IFT Global.
              </p>
            </div>

            {/* Right Image */}
            <div className="flex-1 max-w-md lg:max-w-lg">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-imperial/20 to-secondary/20 mix-blend-overlay"></div>
                <img
                  src="https://www.souriezvousjouez.com/cdn/shop/files/Souriez-Vous-Jouez-Succes-Story-01.jpg?v=1725302736"
                  alt="Success Stories"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='24' font-weight='bold'%3E🌟 Success Stories%3C/text%3E%3C/svg%3E";
                  }}
                />
                {/* Decorative badge on image */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-on-surface">Histoires inspirantes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-0 pb-section-gap-lg">
        
        {/* Stats Section */}
        <div className="grid gap-4 sm:grid-cols-4 mb-12">
          <div className="rounded-xl bg-white shadow-lg p-6 text-center border border-outline-variant/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-3xl mb-2">🎓</div>
            <div className="font-display-lg text-secondary text-3xl">{successStories.length}</div>
            <div className="font-body-md text-on-surface-variant text-sm">Histoires de réussite</div>
          </div>
          <div className="rounded-xl bg-white shadow-lg p-6 text-center border border-outline-variant/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-3xl mb-2">🇩🇪</div>
            <div className="font-display-lg text-secondary text-3xl">5+</div>
            <div className="font-body-md text-on-surface-variant text-sm">Années d'accompagnement</div>
          </div>
          <div className="rounded-xl bg-white shadow-lg p-6 text-center border border-outline-variant/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-3xl mb-2">🏆</div>
            <div className="font-display-lg text-secondary text-3xl">100%</div>
            <div className="font-body-md text-on-surface-variant text-sm">Taux de satisfaction</div>
          </div>
          <div className="rounded-xl bg-white shadow-lg p-6 text-center border border-outline-variant/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-3xl mb-2">🌟</div>
            <div className="font-display-lg text-secondary text-3xl">⭐5</div>
            <div className="font-body-md text-on-surface-variant text-sm">Note moyenne</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <span className="font-body-md text-on-surface-variant font-medium">Filtrer par catégorie :</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-brand-imperial text-white shadow-md"
                    : "bg-surface-container-low hover:bg-brand-ice text-on-surface-variant border border-outline-variant/30"
                }`}
              >
                {cat === "all" ? "Tous" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Success Stories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              onClick={() => openModal(story)}
              className="group cursor-pointer rounded-2xl bg-surface-container-lowest border border-outline-variant/30 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-brand-ice to-brand-imperial/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
                  {story.category === "Santé" ? "❤️" : 
                   story.category === "Formation" ? "📚" : 
                   story.category === "Technique" ? "🔧" : "⭐"}
                </div>
                {story.badge && (
                  <span className="absolute top-3 right-3 bg-brand-imperial/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                    {story.badge}
                  </span>
                )}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  {story.category && (
                    <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-brand-imperial px-2.5 py-1 rounded-full text-xs font-medium">
                      {getCategoryIcon(story.category)}
                      {story.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-imperial/10">
                    <User className="size-5 text-brand-imperial" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-headline-md text-on-surface text-base truncate">
                      {story.name}
                    </h3>
                    <p className="font-body-sm text-on-surface-variant text-xs truncate">
                      {story.description}
                    </p>
                  </div>
                </div>

                {/* Meta info */}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-on-surface-variant/70">
                  {story.date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {story.date}
                    </span>
                  )}
                  {story.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      {story.location}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>

                {/* Read more */}
                <div className="mt-3 flex items-center text-brand-imperial font-medium text-sm group-hover:gap-2 transition-all duration-300">
                  Lire l'histoire
                  <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-brand-imperial to-brand-imperial/90 p-10 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <span className="text-5xl mb-4 block">🚀</span>
            <h2 className="font-headline-lg text-white mb-3">
              Vous aussi, écrivez votre success story
            </h2>
            <p className="font-body-md text-white/90 max-w-2xl mx-auto mb-8">
              Rejoignez notre communauté de talents et commencez votre parcours vers l'excellence 
              professionnelle en Allemagne.
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

      {/* Modal */}
      {selectedStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-500 shadow-md transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="size-5" />
            </button>

            <div className="p-6 md:p-8">
              {/* Story Header */}
              <div className="mb-6 flex items-start justify-between border-b border-gray-100 pb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedStory.name}</h2>
                    {selectedStory.badge && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-imperial/10 px-3 py-1 text-xs font-medium text-brand-imperial">
                        <Award className="size-3" />
                        {selectedStory.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{selectedStory.description}</p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {selectedStory.date && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        <Calendar className="size-3" />
                        {selectedStory.date}
                      </span>
                    )}
                    {selectedStory.location && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        <MapPin className="size-3" />
                        {selectedStory.location}
                      </span>
                    )}
                    {selectedStory.category && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-ice px-3 py-1 text-xs font-medium text-brand-imperial">
                        {getCategoryIcon(selectedStory.category)}
                        {selectedStory.category}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-imperial/10 ml-4">
                  <Quote className="size-6 text-brand-imperial" />
                </div>
              </div>

              {/* Story Content */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left - Story Text */}
                <div>
                  <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedStory.fullStory}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-brand-imperial">
                    <Heart className="size-4 fill-brand-imperial/20" />
                    <span className="text-sm font-medium">Une histoire inspirante</span>
                  </div>
                </div>

                {/* Right - Gallery */}
                <div>
                  <div className="relative overflow-hidden rounded-xl bg-gray-100">
                    <div className="aspect-square relative">
                      {selectedStory.images.length > 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-ice/20 to-brand-imperial/20">
                          <span className="text-6xl opacity-30">
                            {selectedStory.category === "Santé" ? "❤️" : 
                             selectedStory.category === "Formation" ? "📚" : 
                             selectedStory.category === "Technique" ? "🔧" : "⭐"}
                          </span>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-ice/20 to-brand-imperial/20">
                          <span className="text-6xl opacity-30">📸</span>
                        </div>
                      )}
                    </div>

                    {/* Image Navigation */}
                    {selectedStory.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                        >
                          <ChevronLeft className="size-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                        >
                          <ChevronRight className="size-5" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                          {selectedStory.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`size-2 rounded-full transition-all ${
                                currentImageIndex === index
                                  ? "w-6 bg-white"
                                  : "bg-white/50 hover:bg-white/70"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <p className="mt-2 text-center text-xs text-gray-500">
                    {selectedStory.name} - {selectedStory.description}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 border-t border-gray-100 pt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MessageCircle className="size-4" />
                  <span>Partagez cette histoire inspirante</span>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share2 className="size-4" />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <ThumbsUp className="size-4" />
                  </button>
                </div>
                <button
                  onClick={closeModal}
                  className="rounded-lg bg-brand-imperial px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-imperial/90"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}