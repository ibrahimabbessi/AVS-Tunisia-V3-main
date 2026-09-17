"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  parseYouTubeId,
  youTubeEmbedUrl,
  isFacebookReelUrl,
  facebookEmbedUrl,
  cloudinaryThumb
} from "@/lib/mediaUrls";
import type { Event } from "@/lib/db/events";

// ─── Date & status helpers ────────────────────────────────────────

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function formatDateRange(start?: string, end?: string): string {
  if (!start && !end) return "";
  if (!start) return formatDate(end);
  if (!end || end === start) return formatDate(start);
  return `${formatDate(start)} – ${formatDate(end)}`;
}

/** Derive lifecycle status from dates. */
function deriveLifecycle(event: Event): "upcoming" | "ongoing" | "completed" {
  const now = new Date();
  const start = event.startDate ? new Date(event.startDate) : null;
  const end = event.endDate ? new Date(event.endDate) : start;
  if (!start) return "completed";
  if (start > now) return "upcoming";
  if (end && end < now) return "completed";
  return "ongoing";
}

const LIFECYCLE_LABELS: Record<string, string> = {
  upcoming: "À venir",
  ongoing: "En cours",
  completed: "Terminé"
};

const LIFECYCLE_COLORS: Record<string, string> = {
  upcoming: "bg-blue-500",
  ongoing: "bg-green-500",
  completed: "bg-gray-500"
};

/** Strip HTML tags and produce a short plain-text summary. */
function htmlToExcerpt(html: string, maxLen = 200): string {
  if (!html) return "";
  // Replace block-level tags with spaces, strip the rest
  const text = html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|div|h[1-6]|li)>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + "…" : text;
}

/** Check if a URL looks like a Facebook URL. */
function isFacebookUrl(url: string): boolean {
  return isFacebookReelUrl(url);
}

// ─── Video Embed ──────────────────────────────────────────────────

function VideoEmbed({
  url,
  title
}: {
  url: string;
  title: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const embedUrl = useMemo(() => {
    // YouTube
    const ytId = parseYouTubeId(url);
    if (ytId) return youTubeEmbedUrl(ytId);

    // Facebook
    if (isFacebookUrl(url)) return facebookEmbedUrl(url, { showText: false });

    // Already an embed URL (facebook.com/plugins/video.php...)
    if (url.includes("facebook.com/plugins/video.php")) return url;

    return url;
  }, [url]);

  const isFacebook = isFacebookUrl(url);

  return (
    <div className="w-full">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        {isLoading && (
          <div className="absolute inset-0 bg-surface-container-low rounded-xl flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 border-4 border-brand-imperial/20 border-t-brand-imperial rounded-full animate-spin"></div>
              <span className="text-xs text-on-surface-variant">Chargement...</span>
            </div>
          </div>
        )}
        {hasError ? (
          <div className="absolute inset-0 bg-surface-container-low rounded-xl flex items-center justify-center">
            <div className="text-center p-4">
              <span className="text-4xl block mb-2">🎬</span>
              <p className="text-sm text-on-surface-variant">Vidéo non disponible</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-secondary hover:underline"
              >
                Voir sur {isFacebook ? "Facebook" : "YouTube"}
              </a>
            </div>
          </div>
        ) : (
          <iframe
            src={embedUrl ?? url}
            className="absolute inset-0 w-full h-full rounded-xl"
            style={{ border: "none" }}
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title={title}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        )}
      </div>
      <div className="mt-1.5">
        <p className="text-xs text-on-surface-variant truncate">{title}</p>
      </div>
    </div>
  );
}

// ─── Image Carousel ───────────────────────────────────────────────

function ImageCarousel({
  photos,
  eventTitle,
  facebookReelUrl
}: {
  photos: { url: string; publicId: string }[];
  eventTitle: string;
  facebookReelUrl?: string | null;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);
  const imagesPerPage = 3;
  const totalPages = Math.ceil(photos.length / imagesPerPage);

  const currentImages = photos.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  const goToPage = (page: number) => {
    if (page === currentPage || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentPage(page);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) goToPage(currentPage + 1);
    else goToPage(0);
  };

  const prevPage = () => {
    if (currentPage > 0) goToPage(currentPage - 1);
  };

  useEffect(() => {
    if (!isPaused && totalPages > 1) {
      autoSlideInterval.current = setInterval(nextPage, 5000);
    }
    return () => {
      if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
    };
  }, [currentPage, isPaused, totalPages]);

  if (photos.length === 0 && !facebookReelUrl) return null;

  return (
    <div
      className="bg-surface-container-low p-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {photos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {currentImages.map((photo, idx) => {
            const globalIndex = currentPage * imagesPerPage + idx;
            return (
              <div
                key={photo.publicId}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/20 transition-all duration-500 ${
                  isTransitioning ? "scale-95 opacity-0" : "scale-100 opacity-100"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <img
                  src={cloudinaryThumb(photo.url, 800, 600)}
                  alt={`${eventTitle} - Photo ${globalIndex + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e5e7eb'/%3E%3Ctext x='200' y='160' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='20'%3E📸%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  {globalIndex + 1} / {photos.length}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Facebook Reel */}
      {facebookReelUrl && (
        <div className="mt-4 max-w-2xl mx-auto">
          <div className="rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/20 shadow-sm">
            <VideoEmbed url={facebookReelUrl} title="🎬 Reel Facebook" />
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all ${
              currentPage === 0
                ? "bg-surface-container-low text-on-surface-variant/40 cursor-not-allowed"
                : "bg-surface-container-low hover:bg-surface-container text-secondary hover:scale-105"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Précédent
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page - 1)}
                className={`w-8 h-8 rounded-lg text-sm transition-all ${
                  currentPage === page - 1
                    ? "bg-secondary text-white font-bold shadow-md"
                    : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:scale-105"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={nextPage}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all bg-surface-container-low hover:bg-surface-container text-secondary hover:scale-105"
          >
            Suivant
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex justify-center items-center gap-2 mt-3">
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === currentPage ? "w-6 bg-secondary" : "w-3 bg-outline-variant/30 hover:bg-outline-variant/50"
            }`}
          />
        ))}
        {totalPages > 1 && (
          <span className="text-[10px] text-on-surface-variant/50 ml-2">
            {!isPaused ? "▶ Auto" : "⏸"}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Event Card ───────────────────────────────────────────────────

function EventCard({ event }: { event: Event }) {
  const [isOpen, setIsOpen] = useState(false);
  const lifecycle = deriveLifecycle(event);
  const excerpt = htmlToExcerpt(event.body, 200);
  const coverUrl = event.coverImage?.url
    ? cloudinaryThumb(event.coverImage.url, 1200, 800)
    : null;

  const youtubeVideos = (event.youtubeUrls ?? [])
    .map((url) => ({ url, id: parseYouTubeId(url) }))
    .filter((v) => v.id)
    .map((v) => ({
      url: v.url,
      title: `Vidéo YouTube (${v.id})`
    }));

  const facebookReels = (event.facebookReelUrls ?? []).map((url) => ({
    url,
    title: "🎬 Reel Facebook"
  }));

  return (
    <div
      className={`w-full rounded-2xl border border-outline-variant/30 bg-surface-container-lowest overflow-hidden transition-all duration-300 ${
        isOpen ? "shadow-xl" : "shadow-sm hover:shadow-md"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left hover:bg-surface-container-low/50 transition-colors duration-200"
      >
        <div className="flex flex-col sm:flex-row">
          {/* Cover thumbnail */}
          {coverUrl && (
            <div className="sm:w-56 sm:flex-shrink-0 aspect-[4/3] sm:aspect-auto sm:h-auto relative bg-surface-container-low overflow-hidden">
              <img
                src={coverUrl}
                alt={event.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          )}

          {/* Header content */}
          <div className="flex-1 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span
                    className={`px-2.5 py-0.5 ${LIFECYCLE_COLORS[lifecycle]} text-white text-xs font-bold rounded-full shadow-sm`}
                  >
                    {LIFECYCLE_LABELS[lifecycle]}
                  </span>
                  {(event.categorySlugs ?? []).slice(0, 2).map((cat) => (
                    <span
                      key={cat}
                      className="px-2 py-0.5 bg-brand-ice/50 text-brand-imperial rounded-full text-xs font-medium capitalize"
                    >
                      {cat}
                    </span>
                  ))}
                  {(event.categorySlugs ?? []).length > 2 && (
                    <span className="px-2 py-0.5 bg-surface-container-low text-on-surface-variant rounded-full text-xs">
                      +{(event.categorySlugs ?? []).length - 2}
                    </span>
                  )}
                </div>

                <h3 className="font-headline-md text-primary text-lg md:text-xl">
                  {event.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-sm text-on-surface-variant mt-1.5">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {formatDateRange(event.startDate, event.endDate)}
                    {event.startTime && (
                      <span className="text-xs opacity-70">· {event.startTime}</span>
                    )}
                  </span>
                  {event.location && (
                    <>
                      <span className="w-px h-4 bg-outline-variant/30" />
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {event.location}
                      </span>
                    </>
                  )}
                </div>

                {excerpt && (
                  <p className="text-sm text-on-surface-variant mt-2 line-clamp-2">
                    {excerpt}
                  </p>
                )}
              </div>

              <div className="flex-shrink-0 self-center">
                <div
                  className={`p-2 rounded-full bg-surface-container-low transition-all duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-on-surface-variant"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[8000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-4 border-t border-outline-variant/20 space-y-4">
          {/* Image carousel with any Facebook reel inline */}
          <ImageCarousel
            photos={event.photos ?? []}
            eventTitle={event.title}
            facebookReelUrl={event.facebookReelUrls?.[0] ?? null}
          />

          {/* Full body as HTML */}
          {event.body && (
            <div>
              <h4 className="font-label-md text-primary text-sm mb-2">Description détaillée</h4>
              <div
                className="font-body-md text-on-surface-variant text-sm leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: event.body }}
              />
            </div>
          )}

          {/* YouTube videos */}
          {youtubeVideos.length > 0 && (
            <div>
              <h4 className="font-label-md text-primary text-sm mb-2 flex items-center gap-2">
                <span className="text-red-500">▶</span> Vidéos YouTube
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {youtubeVideos.map((video, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden border border-outline-variant/20 bg-surface-container-low"
                  >
                    <VideoEmbed url={video.url} title={video.title} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Facebook reels (beyond the first one shown inline) */}
          {facebookReels.length > 1 && (
            <div>
              <h4 className="font-label-md text-primary text-sm mb-2 flex items-center gap-2">
                🎬 Autres Reels Facebook
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {facebookReels.slice(1).map((reel, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden border border-outline-variant/20 bg-surface-container-low"
                  >
                    <VideoEmbed url={reel.url} title={reel.title} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Registration URL */}
          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
            >
              Plus d'informations
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}

          {/* Tags */}
          {(event.tags ?? []).length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {(event.tags ?? []).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-surface-container-low text-on-surface-variant/70 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Filter Bar ───────────────────────────────────────────────────

function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange
}: {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
          selectedCategory === null
            ? "bg-secondary text-white font-bold shadow-md"
            : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-secondary"
        }`}
      >
        Tous
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-3 py-1.5 text-sm rounded-lg transition-all capitalize ${
            selectedCategory === cat
              ? "bg-secondary text-white font-bold shadow-md"
              : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-secondary"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ─── Stats ────────────────────────────────────────────────────────

function EventStats({ events }: { events: Event[] }) {
  const totalEvents = events.length;
  const uniqueCategories = [
    ...new Set(events.flatMap((e) => e.categorySlugs ?? []))
  ];
  const totalVideos = events.reduce(
    (acc, e) =>
      acc + (e.youtubeUrls?.length ?? 0) + (e.facebookReelUrls?.length ?? 0),
    0
  );
  const withPhotos = events.filter((e) => (e.photos ?? []).length > 0).length;

  const stats = [
    { value: totalEvents, label: "Événements", icon: "📅" },
    { value: uniqueCategories.length || "—", label: "Catégories", icon: "🏷️" },
    { value: totalVideos, label: "Vidéos", icon: "🎬" },
    { value: withPhotos, label: "Avec photos", icon: "📸" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30"
        >
          <div className="text-2xl mb-1">{stat.icon}</div>
          <div className="font-display-lg text-secondary text-xl">{stat.value}</div>
          <div className="text-caption text-on-surface-variant text-xs uppercase tracking-wider">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────

export default function EventsClient({ events }: { events: Event[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const allCategories = useMemo(
    () => [...new Set(events.flatMap((e) => e.categorySlugs ?? []))],
    [events]
  );

  const filteredEvents = useMemo(() => {
    let filtered = events;
    if (selectedCategory) {
      filtered = filtered.filter((e) =>
        (e.categorySlugs ?? []).includes(selectedCategory)
      );
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(term) ||
          e.body.toLowerCase().includes(term) ||
          (e.tags ?? []).some((t) => t.toLowerCase().includes(term)) ||
          (e.categorySlugs ?? []).some((c) => c.toLowerCase().includes(term))
      );
    }
    return filtered;
  }, [events, selectedCategory, searchTerm]);

  const sortedEvents = useMemo(
    () =>
      [...filteredEvents].sort((a, b) => {
        const da = a.startDate ? new Date(a.startDate).getTime() : 0;
        const db = b.startDate ? new Date(b.startDate).getTime() : 0;
        return db - da;
      }),
    [filteredEvents]
  );

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 md:pt-40 md:pb-8 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-brand-imperial blur-3xl"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-1 max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                  Événements
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                  {events.length} Événements
                </span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                Nos <span className="text-secondary">Événements</span>
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed">
                Découvrez tous les événements organisés par AVS Tunisia Group.
                Cliquez sur un événement pour voir tous les détails.
              </p>
            </div>

            <div className="flex-1 max-w-md lg:max-w-lg">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-imperial/20 to-secondary/20 mix-blend-overlay"></div>
                <img
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop"
                  alt="Événements AVS Tunisia Group"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='24' font-weight='bold'%3E🎉 Événements%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎉</span>
                    <span className="text-xs font-medium text-on-surface">Voir nos événements</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg">
        <div className="mb-10">
          <EventStats events={events} />
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un événement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-xl border border-outline-variant/30 bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          {allCategories.length > 0 && (
            <div className="shrink-0">
              <FilterBar
                categories={allCategories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-on-surface-variant">
            {filteredEvents.length} événement{filteredEvents.length > 1 ? "s" : ""} trouvé
            {filteredEvents.length > 1 ? "s" : ""}
          </p>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-sm text-secondary hover:underline"
            >
              Effacer le filtre
            </button>
          )}
        </div>

        {/* Events grid */}
        {sortedEvents.length > 0 ? (
          <div className="space-y-4">
            {sortedEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-headline-md text-primary text-xl mb-2">
              Aucun événement trouvé
            </h3>
            <p className="text-on-surface-variant">
              Aucun événement ne correspond à vos critères de recherche.
              {selectedCategory && " Essayez de modifier le filtre de catégorie."}
            </p>
            {(selectedCategory || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm("");
                }}
                className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-brand-imperial to-brand-imperial/90 p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="font-headline-md text-white text-2xl md:text-3xl mb-3">
              Vous aussi, participez à nos événements !
            </h2>
            <p className="font-body-md text-white/90 max-w-2xl mx-auto mb-6">
              Rejoignez-nous lors de nos prochains événements et faites partie de
              l'aventure AVS Tunisia Group.
            </p>
            <Link
              href="/candidat/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-imperial rounded-xl font-label-md hover:bg-white/90 transition-all duration-300 hover:scale-[1.05] shadow-lg"
            >
              Restez informé
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}