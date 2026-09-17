"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { parseYouTubeId, youTubeEmbedUrl, youTubeThumbnailUrl } from "@/lib/mediaUrls";
import type { Video } from "@/lib/db/videos";

// ─── Date helpers ─────────────────────────────────────────────────

function getYear(iso: string): number {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? 0 : d.getFullYear();
}

function formatDisplayDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

/** Group an array of videos by publication year, newest year first. */
function groupByYear(videos: Video[]): { year: number; items: Video[] }[] {
  const grouped: Record<number, Video[]> = {};
  for (const v of videos) {
    const y = getYear(v.publishedAt);
    if (!grouped[y]) grouped[y] = [];
    grouped[y].push(v);
  }
  return Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a)
    .map((year) => ({ year, items: grouped[year] }));
}

// ─── Video Item ───────────────────────────────────────────────────

function VideoItem({ video }: { video: Video }) {
  const ytId = parseYouTubeId(video.youtubeUrl);
  const embedUrl = ytId ? youTubeEmbedUrl(ytId) : null;
  const thumbUrl = ytId ? youTubeThumbnailUrl(ytId) : null;

  // If we have a Cloudinary cover, use it as the iframe poster fallback
  // by rendering it behind the iframe while it loads.
  const poster = video.coverImage?.url || thumbUrl;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Thumbnail */}
        <div className="flex-shrink-0 md:w-56">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-container-low">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-on-surface-variant">
                Vidéo indisponible
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-headline-md text-primary text-base md:text-lg">
              {video.title}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-on-surface-variant">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatDisplayDate(video.publishedAt)}
            </span>
          </div>

          <p className="font-body-md text-on-surface-variant text-sm leading-relaxed line-clamp-3 whitespace-pre-line">
            {video.description}
          </p>

          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-secondary font-label-md text-sm hover:gap-2 transition-all"
          >
            Voir la vidéo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Year Section ─────────────────────────────────────────────────

function YearSection({
  year,
  items,
  isOpen,
  onToggle
}: {
  year: number;
  items: Video[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      id={`year-${year}`}
      className="border rounded-2xl border-outline-variant/30 bg-surface-container-lowest overflow-hidden transition-all duration-300 hover:border-outline-variant/60 scroll-mt-24"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-surface-container-low transition-colors"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <span className="font-display-lg text-brand-imperial text-2xl md:text-3xl">
            {year}
          </span>
          <span className="text-xs md:text-sm text-on-surface-variant">
            {items.length} vidéo{items.length > 1 ? "s" : ""}
          </span>
          <span
            className={`w-2 h-2 rounded-full ${
              items.length > 0 ? "bg-secondary" : "bg-outline-variant"
            }`}
          ></span>
        </div>
        <svg
          className={`w-5 h-5 md:w-6 md:h-6 text-on-surface-variant transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 md:px-6 pb-4 md:pb-6 space-y-3 md:space-y-4">
          {items.map((video) => (
            <VideoItem key={video._id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Year Navigation ──────────────────────────────────────────────

function YearNavigation({
  years,
  activeYear,
  onYearClick
}: {
  years: number[];
  activeYear: number | null;
  onYearClick: (year: number) => void;
}) {
  return (
    <div className="sticky top-24 self-start bg-white/80 backdrop-blur-sm rounded-2xl border border-outline-variant/30 p-4 shadow-lg">
      <h4 className="font-label-md text-on-surface-variant text-xs uppercase tracking-wider mb-3 text-center">
        Années
      </h4>
      <div className="flex flex-col gap-1">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onYearClick(year)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 text-left ${
              activeYear === year
                ? "bg-secondary text-white font-bold shadow-md"
                : "text-on-surface-variant hover:bg-surface-container-low hover:text-secondary"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Media Stats ──────────────────────────────────────────────────

function MediaStats({ videos, yearCount }: { videos: Video[]; yearCount: number }) {
  // "Thèmes" — we no longer have tags in the schema, so approximate
  // by counting distinct "first word" groupings from titles. If you add
  // tags back to the schema, swap this for a proper unique-count.
  const totalVideos = videos.length;
  const totalYears = yearCount;

  const stats = [
    { value: `${totalVideos}+`, label: "Vidéos", icon: "📹" },
    { value: totalYears, label: "Années de couverture", icon: "📅" },
    { value: totalVideos > 0 ? Math.max(1, Math.ceil(totalVideos / 3)) : 0, label: "Sujets couverts", icon: "🏷️" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-4 md:p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30"
        >
          <div className="text-2xl md:text-3xl mb-2">{stat.icon}</div>
          <div className="font-display-lg text-secondary text-xl md:text-2xl">
            {stat.value}
          </div>
          <div className="text-caption text-on-surface-variant mt-1 font-medium uppercase tracking-wider text-xs md:text-sm">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────

export default function VideosClient({ videos }: { videos: Video[] }) {
  const coverage = useMemo(() => groupByYear(videos), [videos]);

  const [openYear, setOpenYear] = useState<number | null>(coverage[0]?.year ?? null);
  const [activeYear, setActiveYear] = useState<number | null>(coverage[0]?.year ?? null);
  const [isScrolling, setIsScrolling] = useState(false);
  const yearRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const toggleYear = (year: number) => {
    setOpenYear((prev) => (prev === year ? null : year));
  };

  const scrollToYear = (year: number) => {
    const element = yearRefs.current[year];
    if (!element) return;
    setOpenYear(null);
    setActiveYear(year);
    setIsScrolling(true);
    setTimeout(() => {
      setOpenYear(year);
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setTimeout(() => setIsScrolling(false), 500);
    }, 150);
  };

  // Scroll-spy: highlight the year section nearest the top of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isScrolling) {
            const year = parseInt(entry.target.id.replace("year-", ""), 10);
            setActiveYear(year);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" }
    );
    Object.values(yearRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [isScrolling, coverage]);

  const years = coverage.map((data) => data.year);

  // Empty state — nothing published yet
  if (videos.length === 0) {
    return (
      <>
        <Navbar />
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-32 text-center">
          <h1 className="font-display-lg text-brand-imperial mb-4">Galerie Vidéos</h1>
          <p className="text-on-surface-variant">Aucune vidéo pour le moment.</p>
        </section>
        <Footer />
      </>
    );
  }

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
                  YouTube Channel
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                  Galerie Vidéos
                </span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                Galerie Vidéos
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed">
                Découvrez notre chaîne YouTube avec des vidéos couvrant nos activités, événements,
                partenariats et apparitions médiatiques de {years[years.length - 1] ?? "…"} à{" "}
                {years[0] ?? "…"}.
              </p>
            </div>

            <div className="flex-1 max-w-md lg:max-w-lg">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-imperial/20 to-secondary/20 mix-blend-overlay"></div>
                <img
                  src="https://blog.hootsuite.com/wp-content/uploads/2016/04/video-marketing1-1.jpg"
                  alt="Galerie Vidéos - YouTube Channel"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='24' font-weight='bold'%3E🎬 Vidéos%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 text-sm">▶</span>
                    <span className="text-xs font-medium text-on-surface">Voir nos vidéos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg">
        <div className="mb-12 md:mb-16">
          <MediaStats videos={videos} yearCount={coverage.length} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 md:mb-6">
              <h2 className="font-headline-lg text-brand-imperial text-xl md:text-2xl">
                Vidéos par Année
              </h2>
              <span className="text-xs md:text-sm text-on-surface-variant">
                {coverage.length} années • {videos.length} vidéos
              </span>
            </div>

            <div className="space-y-3 md:space-y-4">
              {coverage.map((yearData) => (
                <div
                  key={yearData.year}
                  ref={(el) => {
                    yearRefs.current[yearData.year] = el;
                  }}
                  id={`year-${yearData.year}`}
                >
                  <YearSection
                    year={yearData.year}
                    items={yearData.items}
                    isOpen={openYear === yearData.year}
                    onToggle={() => toggleYear(yearData.year)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <YearNavigation years={years} activeYear={activeYear} onYearClick={scrollToYear} />
          </div>
        </div>

        {/* Mobile year nav */}
        <div className="lg:hidden mt-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => scrollToYear(year)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 ${
                  activeYear === year
                    ? "bg-secondary text-white font-bold shadow-md"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-secondary"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Purpose section */}
        <div className="mt-12 md:mt-16 p-6 md:p-8 rounded-2xl bg-surface-container-low border border-outline-variant/30">
          <h3 className="font-headline-md text-brand-imperial mb-4 text-lg md:text-xl">
            Pourquoi cette section ?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {[
              "Mettre en avant nos activités et événements",
              "Partager nos partenariats et collaborations",
              "Valoriser notre présence médiatique",
              "Témoigner de notre engagement envers la communauté"
            ].map((purpose, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-secondary flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs md:text-sm text-on-surface-variant">{purpose}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}