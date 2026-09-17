"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Calendar, ChevronLeft, ChevronRight, X, ZoomIn, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { PressItem } from "@/lib/db/press";

// Format an ISO date string into a French display form ("15 mars 2025")
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

export default function PresseClient({ items }: { items: PressItem[] }) {
  const [selectedItem, setSelectedItem] = useState<PressItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Group items into slides of 5 (memoized so it only recomputes when items change)
  const slides: PressItem[][] = useMemo(() => {
    const groups: PressItem[][] = [];
    for (let i = 0; i < items.length; i += 5) {
      groups.push(items.slice(i, i + 5));
    }
    return groups;
  }, [items]);

  // Auto-scroll carousel
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      if (!isFullscreen) {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isFullscreen, slides.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const openViewer = (item: PressItem) => {
    const index = items.findIndex((p) => p.slug === item.slug);
    setViewerIndex(index);
    setSelectedItem(item);
    setIsFullscreen(true);
  };

  const nextImage = () => {
    setViewerIndex((prev) => {
      const next = (prev + 1) % items.length;
      setSelectedItem(items[next]);
      return next;
    });
  };

  const prevImage = () => {
    setViewerIndex((prev) => {
      const next = (prev - 1 + items.length) % items.length;
      setSelectedItem(items[next]);
      return next;
    });
  };

  // Keyboard navigation in fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  // Empty state — nothing published yet
  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-20">
          <section className="relative w-full bg-[#f8f7f4] py-16 md:py-24">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center py-20">
              <h2 className="font-display-lg text-brand-imperial mb-4">
                La Presse en Parle
              </h2>
              <p className="text-on-surface-variant">
                Aucun article de presse pour le moment.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="pt-20">
        <section className="relative w-full overflow-hidden bg-[#f8f7f4] py-16 md:py-24">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0iTTMwIDMwbDEwLTEwbTEwIDEwbC0xMC0xMG0wIDIwbC0xMC0xMG0tMTAgMTBsMTAtMTBtMTAtMTBsMTAgMTBtLTEwLTEwbC0xMCAxMG0wLTEwbDEwIDEwbS0xMC0xMGwtMTAgMTBtMTAtMTBsLTEwLTEwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] bg-repeat"></div>
          </div>

          {/* Header */}
          <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-gutter mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="inline-block px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-widest rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm mb-4">
                  Presse
                </span>
                <h2 className="font-display-lg text-brand-imperial text-balance">
                  La Presse en Parle
                </h2>
                <p className="font-body-lg text-on-surface-variant max-w-2xl mt-4">
                  Découvrez les articles, interviews et reportages qui mettent en lumière notre impact et nos initiatives.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        index === currentIndex
                          ? "w-8 bg-brand-imperial"
                          : "w-4 bg-brand-imperial/20 hover:bg-brand-imperial/40"
                      }`}
                      aria-label={`Aller à la slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Exhibition Space */}
          <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <div
              ref={containerRef}
              className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl border border-white/50"
            >
              {/* Carousel */}
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {slides.map((slide, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="min-w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6"
                  >
                    {slide.map((item) => (
                      <div
                        key={item.slug}
                        className="relative group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        onClick={() => openViewer(item)}
                      >
                        <div className="relative h-56 md:h-64 lg:h-72 overflow-hidden bg-surface-container-low">
                          {item.coverImage?.url ? (
                            <img
                              src={item.coverImage.url}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-on-surface-variant text-xs">
                              Pas d'image
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full">
                              <ZoomIn className="w-6 h-6 text-brand-imperial" />
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(item.publishedAt)}</span>
                          </div>
                          <h3 className="font-label-md text-brand-imperial line-clamp-2 text-sm">
                            {item.title}
                          </h3>
                          {item.source && (
                            <p className="text-xs text-on-surface-variant/70 mt-1 truncate">
                              {item.source}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              {slides.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-300 z-10 hover:scale-110"
                    aria-label="Slide précédente"
                  >
                    <ChevronLeft className="w-6 h-6 text-brand-imperial" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-300 z-10 hover:scale-110"
                    aria-label="Slide suivante"
                  >
                    <ChevronRight className="w-6 h-6 text-brand-imperial" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Fullscreen Image Viewer */}
          {selectedItem && isFullscreen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-xl p-4 animate-in fade-in duration-300"
              onClick={() => setIsFullscreen(false)}
            >
              <div
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="absolute top-6 right-6 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 z-20 text-white hover:scale-110"
                  aria-label="Fermer"
                >
                  <X className="w-8 h-8" />
                </button>

                {/* Counter */}
                <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {viewerIndex + 1} / {items.length}
                </div>

                {/* Main Image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {selectedItem.coverImage?.url ? (
                    <img
                      src={selectedItem.coverImage.url}
                      alt={selectedItem.title}
                      className="w-full h-full max-h-[90vh] max-w-[90vw] object-contain animate-in zoom-in-95 duration-300"
                    />
                  ) : (
                    <div className="text-white/60">Image non disponible</div>
                  )}
                </div>

                {/* Nav Arrows */}
                {items.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 z-20 text-white hover:scale-110 backdrop-blur-sm"
                      aria-label="Image précédente"
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 z-20 text-white hover:scale-110 backdrop-blur-sm"
                      aria-label="Image suivante"
                    >
                      <ChevronRight className="w-8 h-8" />
                    </button>
                  </>
                )}

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 text-white/80 text-sm mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(selectedItem.publishedAt)}</span>
                      {selectedItem.source && (
                        <>
                          <span>·</span>
                          <span>{selectedItem.source}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-white text-2xl md:text-3xl font-bold">
                      {selectedItem.title}
                    </h3>
                    {selectedItem.excerpt && (
                      <p className="text-white/70 text-sm mt-2 max-w-2xl">
                        {selectedItem.excerpt}
                      </p>
                    )}
                    {selectedItem.url && (
                      <a
                        href={selectedItem.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white text-brand-imperial rounded-lg text-sm font-medium hover:bg-white/90"
                      >
                        Lire l'article
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Decorative */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-imperial/20 to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-imperial/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-ice/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </section>
      </main>

      <Footer />
    </>
  );
}