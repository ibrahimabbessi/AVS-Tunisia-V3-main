"use client";

import { useState } from "react";
import Link from "next/link";
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
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ============================================================
// TYPES
// ============================================================

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

// ============================================================
// DATA - All images now use Cloudinary URLs
// ============================================================

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
    fullStory: `Je tiens à exprimer ma profonde gratitude envers l'agence AVS Forma qui m'a accompagnée dans mon projet de partir en Allemagne pour effectuer un Ausbildung.

Leur soutien et leur professionnalisme m'ont été d'une aide inestimable tout au long du processus. Je dois souligner que cette agence s'est révélée hautement fiable. Dès le début, ils m'ont fourni des informations précises et claires concernant les démarches administratives, les exigences et les délais à respecter. Ils ont été présents à chaque étape et m'ont guidé de manière efficace. Cependant, je tiens à souligner que ce processus demande de la patience et une préparation minutieuse de la langue allemande.

En effet, la maîtrise de l'allemand est la clé essentielle pour réussir son intégration en Allemagne. Heureusement, l'agence m'a encouragé à m'investir pleinement dans l'apprentissage de la langue, ce qui s'est avéré décisif dans mon parcours.

Grâce à leur accompagnement et à mes efforts dans l'apprentissage de la langue, j'ai pu réaliser mon rêve et entamer une Ausbildung réussie en Allemagne. Je recommande vivement cette agence à toute personne désireuse de partir étudier ou travailler en Allemagne, à condition d'être prête à investir du temps et des efforts dans la préparation de la langue allemande.

Je me souviens encore des premiers jours où j'appréhendais l'inconnu, mais aujourd'hui, je suis tellement reconnaissante de cette opportunité. J'ai pu m'immerger dans une nouvelle culture, rencontrer des gens formidables et enrichir mon bagage professionnel d'une manière que je n'aurais jamais pu imaginer. Encore une fois, merci infiniment à l'équipe de l'agence pour leur soutien et leur expertise. Leur engagement envers la réussite de leur clientèle est véritablement exemplaire.`,
    images: [
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730384/65.Takwa.png",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730370/avs-tunisia-demarche-etape-04.jpg",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730384/65.Takwa.png",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730370/avs-tunisia-demarche-etape-04.jpg",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730384/65.Takwa.png",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730370/avs-tunisia-demarche-etape-04.jpg",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730384/65.Takwa.png",
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
    fullStory: `Nawres a commencé son parcours avec AVS Forma avec une détermination exceptionnelle. Son histoire est celle d'une réussite progressive, marquée par des efforts constants et une volonté de fer.

Dès son arrivée en Allemagne, Nawres s'est immergée dans la culture et la langue allemande. Grâce au soutien de l'agence et à sa propre persévérance, elle a rapidement progressé dans son apprentissage.

Aujourd'hui, Nawres continue de briller dans sa formation professionnelle, inspirant d'autres jeunes à suivre ses pas. Son parcours démontre que la persévérance et le travail acharné sont les clés du succès.`,
    images: [
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730386/Copie_de_84.Nawres_Chouchene.png",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730370/avs-tunisia-demarche-etape-04.jpg",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730386/Copie_de_84.Nawres_Chouchene.png",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730370/avs-tunisia-demarche-etape-04.jpg",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730386/Copie_de_84.Nawres_Chouchene.png",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730370/avs-tunisia-demarche-etape-04.jpg",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730386/Copie_de_84.Nawres_Chouchene.png",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730370/avs-tunisia-demarche-etape-04.jpg",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730386/Copie_de_84.Nawres_Chouchene.png",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730370/avs-tunisia-demarche-etape-04.jpg",
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
    fullStory: `Sur les traces du succès des étudiants en soins infirmiers d'excellence, nous félicitons Marwa qui a commencé son voyage avec nous en 2020 avec un visa de formation professionnelle en Allemagne.

Aujourd'hui, ses efforts sont couronnés par l'obtention de son diplôme d'infirmière dans le pays de ses rêves, l'Allemagne !

À tous ceux qui aspirent à réaliser leur rêve dans ce domaine, nous sommes ici pour vous soutenir et vous guider vers le succès. Rejoignez-nous et commencez votre parcours vers l'excellence et la réussite !`,
    images: [
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730379/Copie_de_25.Marwa.png",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730370/avs-tunisia-demarche-etape-04.jpg",
    ],
  },
  {
    id: "ayman-ammar",
    name: "Ayman Ammar",
    description: "Formation technique en Allemagne",
    badge: "En cours",
    date: "2022 - Présent",
    location: "Allemagne",
    category: "Santé",
    rating: 5,
    fullStory: `Ayman incarne parfaitement l'esprit de détermination et de passion qui caractérise les jeunes talents tunisiens. Son parcours en Allemagne est une source d'inspiration pour tous ceux qui rêvent de poursuivre une carrière internationale.

Grâce à son engagement et au soutien d'AVS Forma, Ayman a pu développer ses compétences techniques et s'intégrer parfaitement dans le milieu professionnel allemand.

Son histoire démontre qu'avec de la persévérance et un bon accompagnement, il est possible de réaliser ses ambitions professionnelles à l'étranger.`,
    images: [
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787731342/Portait_111_Ayman.jpg",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730370/avs-tunisia-demarche-etape-04.jpg",
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
    fullStory: `Amina est un véritable modèle de réussite pour la jeunesse tunisienne. Son parcours exemplaire en Allemagne est le fruit d'un travail acharné et d'une détermination sans faille.

Son histoire montre que les rêves peuvent devenir réalité avec les bons conseils, le bon accompagnement et beaucoup de persévérance. Amina a su saisir les opportunités qui se sont présentées à elle et les transformer en succès.

Nous sommes fiers d'avoir accompagné Amina dans son parcours et nous continuerons à soutenir d'autres jeunes talents comme elle.`,
    images: [
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730377/Copie_de_61.Amina.png",
      "https://res.cloudinary.com/girgi5fd/image/upload/v1787730370/avs-tunisia-demarche-etape-04.jpg",
    ],
  },
];

// ============================================================
// COMPONENT
// ============================================================

export default function SuccessStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const categories = ["all", ...new Set(successStories.map((s) => s.category || "Autre"))];

  const filteredStories =
    selectedCategory === "all"
      ? successStories
      : successStories.filter((s) => s.category === selectedCategory);

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "Santé":
        return <Heart className="size-4" />;
      case "Formation":
        return <BookOpen className="size-4" />;
      case "Technique":
        return <Briefcase className="size-4" />;
      default:
        return <Star className="size-4" />;
    }
  };

  const getCategoryEmoji = (category?: string) => {
    switch (category) {
      case "Santé":
        return "❤️";
      case "Formation":
        return "📚";
      case "Technique":
        return "🔧";
      default:
        return "⭐";
    }
  };

  const handleImageError = (storyId: string, imageIndex: number) => {
    const key = `${storyId}-${imageIndex}`;
    setImageErrors(prev => ({
      ...prev,
      [key]: true
    }));
  };

  const handleImageLoad = (storyId: string, imageIndex: number) => {
    const key = `${storyId}-${imageIndex}`;
    if (imageErrors[key]) {
      setImageErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-8 md:pt-48 md:pb-8 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-brand-imperial blur-3xl"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
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
                Découvrez les témoignages inspirants de jeunes talents tunisiens qui ont réalisé leur
                rêve en Allemagne grâce à IFT Global.
              </p>
            </div>

            <div className="flex-1 max-w-md lg:max-w-lg">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-imperial/20 to-secondary/20 mix-blend-overlay"></div>
                <img
                  src="https://res.cloudinary.com/girgi5fd/image/upload/v1787730370/avs-tunisia-demarche-etape-04.jpg"
                  alt="IFT Global Success Stories"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/success-stories-hero-fallback.jpg';
                  }}
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-on-surface">IFT Global 🚀</span>
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
          <span className="font-body-md text-on-surface-variant font-medium">
            Filtrer par catégorie :
          </span>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer les histoires par catégorie">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-brand-imperial text-white shadow-md"
                    : "bg-surface-container-low hover:bg-brand-ice text-on-surface-variant border border-outline-variant/30"
                }`}
                aria-pressed={selectedCategory === cat}
                aria-label={`Filtrer par ${cat === "all" ? "toutes les catégories" : cat}`}
              >
                {cat === "all" ? "Tous" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Success Stories Grid */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-on-surface-variant">Aucune histoire trouvée dans cette catégorie.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStories.map((story) => {
              const hasValidImage = story.images.length > 0;
              const imageKey = hasValidImage ? `${story.id}-0` : null;
              const hasError = imageKey ? imageErrors[imageKey] || false : false;
              const imageUrl = hasValidImage && !hasError ? story.images[0] : null;

              return (
                <Link
                  key={story.id}
                  href={`/candidat/a-propos/success-stories/${story.id}`}
                  className="group cursor-pointer rounded-2xl bg-surface-container-lowest border border-outline-variant/30 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 no-underline"
                >
                  {/* Image Container */}
                  <div className="relative h-80 bg-gradient-to-br from-brand-ice to-brand-imperial/10 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={`${story.name} - ${story.description}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => handleImageError(story.id, 0)}
                        onLoad={() => handleImageLoad(story.id, 0)}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-brand-ice/50 to-brand-imperial/10">
                        {getCategoryEmoji(story.category)}
                      </div>
                    )}
                    
                    {/* Badges and overlays */}
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

                    <div className="mt-3 flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-3.5 fill-current" />
                      ))}
                    </div>

                    <div className="mt-3 flex items-center text-brand-imperial font-medium text-sm group-hover:gap-2 transition-all duration-300">
                      Lire l'histoire
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

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
                href="/candidat/candidature"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-imperial rounded-xl font-label-md hover:bg-white/90 transition-all duration-300 hover:scale-[1.05] shadow-lg"
              >
                Postuler maintenant
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/candidat/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-xl font-label-md hover:bg-secondary/90 transition-all duration-300 hover:scale-[1.05] shadow-lg"
              >
                Contactez-nous
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
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