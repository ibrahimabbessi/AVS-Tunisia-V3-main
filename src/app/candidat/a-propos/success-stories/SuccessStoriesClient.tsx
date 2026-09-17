"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star,
  User,
  Calendar,
  MapPin,
  Heart,
  BookOpen,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { SuccessStory } from "@/lib/db/successStories";

// ─── Category display helpers ─────────────────────────────────────
// categorySlug in Mongo is lowercase-no-accents ('sante', 'formation').
// Map them to French labels for display.
const CATEGORY_LABELS: Record<string, { label: string; icon: React.ReactNode; emoji: string }> = {
  sante:      { label: "Santé",     icon: <Heart className="size-4" />,     emoji: "❤️" },
  formation:  { label: "Formation", icon: <BookOpen className="size-4" />,  emoji: "📚" },
  technique:  { label: "Technique", icon: <Briefcase className="size-4" />, emoji: "🔧" },
};

function categoryInfo(slug?: string) {
  if (!slug) return { label: "Autre", icon: <Star className="size-4" />, emoji: "⭐" };
  return CATEGORY_LABELS[slug] ?? { label: slug, icon: <Star className="size-4" />, emoji: "⭐" };
}

// rating is stored 1–10 in Mongo but displayed as 5 stars
function starsFor(rating?: number) {
  if (!rating) return 5
  return rating > 5 ? Math.max(1, Math.round(rating / 2)) : rating
}

export default function SuccessStoriesClient({ stories }: { stories: SuccessStory[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const categories = [
    "all",
    ...Array.from(new Set(stories.map((s) => s.categorySlug).filter(Boolean))) as string[],
  ];

  const filteredStories =
    selectedCategory === "all"
      ? stories
      : stories.filter((s) => s.categorySlug === selectedCategory);

  const handleImageError = (storyId: string, imageIndex: number) => {
    setImageErrors((prev) => ({ ...prev, [`${storyId}-${imageIndex}`]: true }));
  };

  const handleImageLoad = (storyId: string, imageIndex: number) => {
    const key = `${storyId}-${imageIndex}`;
    if (imageErrors[key]) {
      setImageErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section — unchanged */}
      <section className="relative pt-40 pb-8 md:pt-48 md:pb-8 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent overflow-hidden">
        {/* ...keep your existing hero markup... */}
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
            {/* ...keep your hero image markup... */}
          </div>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-0 pb-section-gap-lg">
        {/* Stats — now uses live count */}
        <div className="grid gap-4 sm:grid-cols-4 mb-12">
          <div className="rounded-xl bg-white shadow-lg p-6 text-center border border-outline-variant/30">
            <div className="text-3xl mb-2">🎓</div>
            <div className="font-display-lg text-secondary text-3xl">{stories.length}</div>
            <div className="font-body-md text-on-surface-variant text-sm">Histoires de réussite</div>
          </div>
          <div className="rounded-xl bg-white shadow-lg p-6 text-center border border-outline-variant/30">
            <div className="text-3xl mb-2">🇩🇪</div>
            <div className="font-display-lg text-secondary text-3xl">5+</div>
            <div className="font-body-md text-on-surface-variant text-sm">Années d'accompagnement</div>
          </div>
          <div className="rounded-xl bg-white shadow-lg p-6 text-center border border-outline-variant/30">
            <div className="text-3xl mb-2">🏆</div>
            <div className="font-display-lg text-secondary text-3xl">100%</div>
            <div className="font-body-md text-on-surface-variant text-sm">Taux de satisfaction</div>
          </div>
          <div className="rounded-xl bg-white shadow-lg p-6 text-center border border-outline-variant/30">
            <div className="text-3xl mb-2">🌟</div>
            <div className="font-display-lg text-secondary text-3xl">⭐5</div>
            <div className="font-body-md text-on-surface-variant text-sm">Note moyenne</div>
          </div>
        </div>

        {/* Category filter — uses categorySlug, displays French label */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <span className="font-body-md text-on-surface-variant font-medium">
            Filtrer par catégorie :
          </span>
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
                {cat === "all" ? "Tous" : categoryInfo(cat).label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-on-surface-variant">
              Aucune histoire trouvée dans cette catégorie.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStories.map((story) => {
              // Prefer the cover image; fall back to the first photo
              const heroUrl = story.coverImage?.url || story.photos?.[0]?.url || null;
              const hasError = imageErrors[`${story._id}-0`];
              const imageUrl = heroUrl && !hasError ? heroUrl : null;
              const cat = categoryInfo(story.categorySlug);

              return (
                <Link
                  key={story._id}
                  href={`/candidat/a-propos/success-stories/${story.slug}`}
                  className="group cursor-pointer rounded-2xl bg-surface-container-lowest border border-outline-variant/30 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 no-underline"
                >
                  <div className="relative h-80 bg-gradient-to-br from-brand-ice to-brand-imperial/10 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={`${story.title} - ${story.subtitle ?? ""}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => handleImageError(story._id, 0)}
                        onLoad={() => handleImageLoad(story._id, 0)}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">
                        {cat.emoji}
                      </div>
                    )}

                    {story.badge && (
                      <span className="absolute top-3 right-3 bg-brand-imperial/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                        {story.badge}
                      </span>
                    )}

                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      {story.categorySlug && (
                        <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-brand-imperial px-2.5 py-1 rounded-full text-xs font-medium">
                          {cat.icon}
                          {cat.label}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-imperial/10">
                        <User className="size-5 text-brand-imperial" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-headline-md text-on-surface text-base truncate">
                          {story.title}
                        </h3>
                        <p className="font-body-sm text-on-surface-variant text-xs truncate">
                          {story.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-on-surface-variant/70">
                      {story.period?.display && (
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {story.period.display}
                        </span>
                      )}
                      {story.location?.display && (
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3" />
                          {story.location.display}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-1 text-yellow-400">
                      {Array.from({ length: starsFor(story.rating) }).map((_, i) => (
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

        {/* CTA Section — unchanged */}
        {/* ...keep your existing CTA markup... */}
      </section>

      <Footer />
    </>
  );
}