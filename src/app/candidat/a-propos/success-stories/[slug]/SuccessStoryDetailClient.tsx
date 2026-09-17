"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Award,
  Heart,
  Quote,
  Star,
  Share2,
  ThumbsUp,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { SuccessStory, CloudinaryAsset } from "@/lib/db/successStories";

// rating is stored 1–10 in Mongo but displayed as 5 stars
function starsFor(rating?: number) {
  if (!rating) return 5
  return rating > 5 ? Math.max(1, Math.round(rating / 2)) : rating;
}

function ImageGallery({ photos }: { photos: CloudinaryAsset[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);

  const nextImage = () => setCurrentIndex((p) => (p + 1) % photos.length);
  const prevImage = () => setCurrentIndex((p) => (p - 1 + photos.length) % photos.length);

  useEffect(() => {
    if (isPaused || photos.length <= 1) return;
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, [isPaused, photos.length]);

  if (!photos.length) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden bg-surface-container-low">
        {photos.map((photo, index) => (
          <div
            key={photo.publicId}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {!imgError[index] ? (
              <img
                src={photo.url}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-contain"
                onError={() => setImgError((p) => ({ ...p, [index]: true }))}
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

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={prevImage}
          className="p-2 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-on-surface-variant">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>
        <button
          onClick={nextImage}
          className="p-2 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {photos.map((photo, index) => (
          <button
            key={photo.publicId}
            onClick={() => setCurrentIndex(index)}
            className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              index === currentIndex
                ? "border-secondary shadow-lg shadow-secondary/20 scale-105"
                : "border-outline-variant hover:border-secondary/50"
            }`}
          >
            {/* Cloudinary auto thumbnail — no extra storage */}
            <img
              src={photo.url.replace("/upload/", "/upload/w_200,h_150,c_fill,q_auto,f_auto/")}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SuccessStoryDetailClient({ story }: { story: SuccessStory }) {
  return (
    <>
      <Navbar />

      <section className="relative pt-40 pb-8 md:pt-48 md:pb-8 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="flex-1 max-w-4xl">
              <Link
                href="/candidat/a-propos/success-stories"
                className="inline-flex items-center gap-2 text-brand-imperial hover:gap-3 transition-all duration-300 mb-4 font-medium"
              >
                <ArrowLeft className="size-4" />
                Retour aux success stories
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                {story.categorySlug && (
                  <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20">
                    {story.categorySlug}
                  </span>
                )}
                {story.badge && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                    <Award className="size-3" />
                    {story.badge}
                  </span>
                )}
              </div>

              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                {story.title}
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed">
                {story.subtitle}
              </p>

              <div className="mt-4 flex flex-wrap gap-4">
                {story.period?.display && (
                  <span className="inline-flex items-center gap-2 text-sm text-on-surface-variant">
                    <Calendar className="size-4" />
                    {story.period.display}
                  </span>
                )}
                {story.location?.display && (
                  <span className="inline-flex items-center gap-2 text-sm text-on-surface-variant">
                    <MapPin className="size-4" />
                    {story.location.display}
                  </span>
                )}
                {story.rating && (
                  <span className="inline-flex items-center gap-1 text-yellow-400">
                    {Array.from({ length: starsFor(story.rating) }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 max-w-lg">
              <ImageGallery photos={story.photos ?? []} />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-12 pb-section-gap-lg">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-outline-variant/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-brand-imperial/10 rounded-lg">
                  <Quote className="size-5 text-brand-imperial" />
                </div>
                <h2 className="font-headline-lg text-on-surface">Mon histoire</h2>
              </div>

              {/* body is HTML — render it directly.
                  The CMS sanitizes inline styles on save, so we trust it here. */}
              <div
                className="prose prose-lg max-w-none text-on-surface-variant leading-relaxed"
                dangerouslySetInnerHTML={{ __html: story.body ?? "" }}
              />

              <div className="mt-6 flex items-center gap-2 text-brand-imperial bg-brand-imperial/5 px-4 py-3 rounded-lg">
                <Heart className="size-4 fill-brand-imperial/20" />
                <span className="font-medium">Une histoire inspirante</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
              <Link
                href="/candidat/a-propos/success-stories"
                className="inline-flex items-center gap-2 text-brand-imperial font-medium hover:gap-3 transition-all duration-300"
              >
                <ArrowLeft className="size-4" />
                Toutes les success stories
              </Link>
              <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                <span>Partager</span>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Share2 className="size-4" /></button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ThumbsUp className="size-4" /></button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><MessageCircle className="size-4" /></button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-outline-variant/30 sticky top-24">
              <h3 className="font-headline-md text-on-surface mb-4 flex items-center gap-2">
                <span>🚀</span> Rejoignez l'aventure
              </h3>
              <p className="text-sm text-on-surface-variant mb-6">
                Vous aussi, réalisez votre rêve de partir étudier ou travailler en Allemagne.
              </p>
              <div className="space-y-3">
                <Link
                  href="/candidat/candidature"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-brand-imperial text-white rounded-lg font-medium hover:bg-brand-imperial/90 transition-all"
                >
                  Rejoindre l'aventure
                </Link>
                <Link
                  href="/candidat/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-all"
                >
                  Contactez-nous
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}