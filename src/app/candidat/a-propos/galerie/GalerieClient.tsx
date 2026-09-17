"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  Search,
  Maximize2,
  Loader2,
  AlertCircle,
  X,
  ChevronDown,
} from "lucide-react";
import { GalleryLightboxModal } from "@/components/GalleryLightboxModal";
import type { GalleryFolder, GalleryItem } from "@/lib/db/gallery";

// ============================================
// TYPES
// ============================================

interface PhotoGalerie {
  src: string;
  titre: string;
  categorie: string;
  public_id?: string;
  secure_url?: string;
  thumbnail?: string;
  optimized?: string;
}

const ITEMS_PER_PAGE = 24;

// ============================================
// IMAGE OPTIMIZATION — inline Cloudinary transformations
// ============================================

const CLOUDINARY_CLOUD = "girgi5fd";

function optimizedUrl(url: string, width: number, quality = 80): string {
  if (!url) return "";
  return url.replace(
    "/upload/",
    `/upload/c_fill,w_${width},q_${quality},fl_progressive/`
  );
}

function srcSet(url: string): string {
  const sizes = [200, 400, 800, 1200];
  return sizes.map((s) => `${optimizedUrl(url, s)} ${s}w`).join(", ");
}

// ============================================
// SKELETON
// ============================================

const ImageSkeleton = () => (
  <div className="aspect-square rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer bg-[length:200%_100%]" />
  </div>
);

// ============================================
// OPTIMIZED IMAGE
// ============================================

const OptimizedImage = ({
  item,
  onClick,
  isPriority = false,
  folderLabel
}: {
  item: GalleryItem;
  onClick: () => void;
  isPriority?: boolean;
  folderLabel?: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const { publicId, url } = item.cloudinary;
  const filename = publicId.split("/").pop() || publicId;
  const derivedTitre = filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]/g, " ");
  // Prefer the explicit caption if the CMS provided one
  const titre = item.caption?.trim() || derivedTitre;

  const thumbnailUrl = optimizedUrl(url, 400);
  const fullUrl = url;

  useEffect(() => {
    if (isPriority && imgRef.current) {
      const img = new Image();
      img.src = fullUrl;
    }
  }, [fullUrl, isPriority]);

  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer aspect-square hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      {!isLoaded && <ImageSkeleton />}

      <img
        ref={imgRef}
        src={thumbnailUrl}
        srcSet={isPriority ? srcSet(url) : undefined}
        sizes={
          isPriority
            ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            : undefined
        }
        alt={titre || "Image"}
        className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        loading={isPriority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          setError(true);
          const img = e.target as HTMLImageElement;
          img.src = optimizedUrl(url, 400);
          setTimeout(() => {
            img.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e5e7eb'/%3E%3Ctext x='200' y='210' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='40'%3E%F0%9F%96%BC%EF%B8%8F%3C/text%3E%3C/svg%3E";
          }, 1000);
        }}
      />

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-slate-700">
          <div className="text-center">
            <div className="text-4xl mb-2">🖼️</div>
            <p className="text-xs text-slate-500">Image non disponible</p>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
        <div className="w-full">
          <p className="text-white text-xs font-bold truncate">{titre}</p>
          <span className="text-white/60 text-[10px]">{folderLabel}</span>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="p-2.5 rounded-full bg-white/30 backdrop-blur-md">
          <Maximize2 className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
};

// ============================================
// LOAD MORE
// ============================================

const LoadMoreButton = ({
  onClick,
  isLoading,
  hasMore
}: {
  onClick: () => void;
  isLoading: boolean;
  hasMore: boolean;
}) => {
  if (!hasMore) return null;
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="px-8 py-3 rounded-2xl bg-secondary text-white font-bold text-sm hover:bg-secondary/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Chargement...
          </>
        ) : (
          <>
            Voir plus
            <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
};

// ============================================
// MAIN
// ============================================

export default function GalerieClient({
  initialFolders,
  initialItems
}: {
  initialFolders: GalleryFolder[];
  initialItems: Record<string, GalleryItem[]>;
}) {
  const folders = initialFolders;
  const [folderId, setFolderId] = useState<string>(folders[0]?._id ?? "");
  const [itemsByFolder, setItemsByFolder] =
    useState<Record<string, GalleryItem[]>>(initialItems);
  const [loadingFolder, setLoadingFolder] = useState<Record<string, boolean>>(
    {}
  );
  const [erreur, setErreur] = useState<string | null>(null);
  const [recherche, setRecherche] = useState<string>("");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoGalerie | null>(null);
  const [page, setPage] = useState(1);

  const folder = folders.find((f) => f._id === folderId);
  const items = folderId ? itemsByFolder[folderId] || [] : [];

  // Load items for a folder on demand
  const loadFolder = useCallback(
    async (id: string) => {
      if (itemsByFolder[id] || loadingFolder[id]) return;
      setLoadingFolder((p) => ({ ...p, [id]: true }));
      setErreur(null);
      try {
        const res = await fetch(`/api/gallery/items?folderId=${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setItemsByFolder((prev) => ({ ...prev, [id]: data.items || [] }));
      } catch (err) {
        setErreur(
          err instanceof Error ? err.message : "Impossible de charger les images"
        );
      } finally {
        setLoadingFolder((p) => ({ ...p, [id]: false }));
      }
    },
    [itemsByFolder, loadingFolder]
  );

  // Load items when the active folder changes
  useEffect(() => {
    if (folderId) loadFolder(folderId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId]);

  // Reset pagination when folder/search changes
  useEffect(() => {
    setPage(1);
  }, [folderId, recherche]);

  // Filter
  const filtered = useMemo(() => {
    if (!recherche) return items;
    const q = recherche.toLowerCase();
    return items.filter((it) => {
      const name = it.cloudinary.publicId.split("/").pop()?.toLowerCase() || "";
      const cap = it.caption?.toLowerCase() || "";
      return name.includes(q) || cap.includes(q);
    });
  }, [items, recherche]);

  // Paginate for display
const visible = [...filtered].reverse().slice(0, page * ITEMS_PER_PAGE);
  const hasMore = visible.length < filtered.length;

  // Lightbox photos — current folder only
  const lightboxPhotos = useMemo<PhotoGalerie[]>(() => {
    return visible.map((it) => {
      const filename =
        it.cloudinary.publicId
          .split("/")
          .pop()
          ?.replace(/\.[^.]+$/, "")
          .replace(/[-_]/g, " ") || "Image";
      return {
        src: it.cloudinary.url,
        titre: it.caption?.trim() || filename,
        categorie: folder?.title || "",
        public_id: it.cloudinary.publicId,
        secure_url: it.cloudinary.url,
        thumbnail: optimizedUrl(it.cloudinary.url, 400),
        optimized: optimizedUrl(it.cloudinary.url, 800)
      };
    });
  }, [visible, folder]);

  // Total items across all loaded folders
  const totalImages = useMemo(
    () =>
      Object.values(itemsByFolder).reduce(
        (acc, arr) => acc + (arr?.length || 0),
        0
      ),
    [itemsByFolder]
  );

  if (!folders.length) {
    return (
      <>
        <Navbar />
        <section className="max-w-7xl mx-auto px-4 py-32 text-center">
          <h1 className="font-display-lg text-brand-imperial mb-4">
            Galerie Photos
          </h1>
          <p className="text-on-surface-variant">
            Aucun album photo pour le moment.
          </p>
        </section>
        <Footer />
      </>
    );
  }

  const isLoading = folderId ? loadingFolder[folderId] : false;

  return (
    <>
      <Navbar />

      {selectedPhoto && (
        <GalleryLightboxModal
          photo={selectedPhoto}
          photos={lightboxPhotos}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={setSelectedPhoto}
        />
      )}

      {/* Hero */}
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
                  Galerie Photo
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                  {totalImages} Photos
                </span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                Galerie Photos
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed">
                Explorez notre galerie photo regroupant l&apos;ensemble de nos
                activités, événements, partenariats et moments marquants
                capturés en images.
              </p>
            </div>
            <div className="flex-1 max-w-md lg:max-w-lg">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-imperial/20 to-secondary/20 mix-blend-overlay"></div>
                <img
                  src={
                    folders[0]?.coverImage?.url
                      ? optimizedUrl(folders[0].coverImage.url, 800)
                      : "https://images.unsplash.com/photo-1554907984-1d022f2c1a5c?w=800&q=80"
                  }
                  alt="Galerie Photo"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-secondary text-sm">📸</span>
                    <span className="text-xs font-medium text-on-surface">
                      {totalImages} photos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <div className="text-2xl mb-1">📷</div>
            <div className="font-display-lg text-secondary text-xl">
              {totalImages}
            </div>
            <div className="text-caption text-on-surface-variant mt-1 font-medium uppercase tracking-wider text-xs">
              Photos totales
            </div>
          </div>
          <div className="text-center p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <div className="text-2xl mb-1">📁</div>
            <div className="font-display-lg text-secondary text-xl">
              {folders.length}
            </div>
            <div className="text-caption text-on-surface-variant mt-1 font-medium uppercase tracking-wider text-xs">
              Dossiers
            </div>
          </div>
          <div className="text-center p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <div className="text-2xl mb-1">📂</div>
            <div className="font-display-lg text-secondary text-xl">
              {
                Object.keys(itemsByFolder).filter(
                  (k) => itemsByFolder[k]?.length > 0
                ).length
              }
            </div>
            <div className="text-caption text-on-surface-variant mt-1 font-medium uppercase tracking-wider text-xs">
              Dossiers chargés
            </div>
          </div>
          <div className="text-center p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <div className="text-2xl mb-1">🖼️</div>
            <div className="font-display-lg text-secondary text-xl">
              {filtered.length}
            </div>
            <div className="text-caption text-on-surface-variant mt-1 font-medium uppercase tracking-wider text-xs">
              Photos affichées
            </div>
          </div>
        </div>

        {/* Folder tabs */}
        <div className="flex flex-wrap items-center gap-3 pb-2">
          {folders.map((f) => {
            const active = folderId === f._id;
            const count = itemsByFolder[f._id]?.length ?? f.itemCount ?? 0;
            return (
              <button
                key={f._id}
                onClick={() => {
                  setFolderId(f._id);
                  setRecherche("");
                }}
                className={`px-5 py-2.5 rounded-2xl text-sm font-black whitespace-nowrap transition-all flex items-center space-x-2 ${
                  active
                    ? "bg-secondary text-white shadow-md shadow-secondary/30 scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <span>📁</span>
                <span>{f.title}</span>
                {count > 0 && (
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                      active
                        ? "bg-white/20"
                        : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher des images..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
          {recherche && (
            <button
              onClick={() => setRecherche("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>

        {/* Body */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <ImageSkeleton key={`skeleton-${i}`} />
              ))}
          </div>
        ) : erreur ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <p className="text-sm font-bold text-red-600 dark:text-red-400">
              {erreur}
            </p>
            <button
              onClick={() => {
                if (folderId) {
                  setItemsByFolder((prev) => {
                    const next = { ...prev };
                    delete next[folderId];
                    return next;
                  });
                  loadFolder(folderId);
                }
              }}
              className="px-6 py-2 rounded-xl bg-secondary text-white font-bold text-sm hover:bg-secondary/80 transition-colors"
            >
              Réessayer
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-sm font-extrabold text-slate-600 dark:text-slate-300">
              {recherche
                ? "Aucune image ne correspond à votre recherche."
                : `Aucune image dans le dossier "${folder?.title}".`}
            </p>
            {recherche && (
              <button
                onClick={() => setRecherche("")}
                className="mt-4 px-6 py-2 rounded-xl bg-secondary text-white font-bold text-sm hover:bg-secondary/80 transition-colors"
              >
                Effacer la recherche
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {visible.map((item, index) => (
                <OptimizedImage
                  key={`${item._id}-${index}`}
                  item={item}
                  isPriority={index < 5}
                  folderLabel={folder?.title}
                  onClick={() => {
                    const filename =
                      item.cloudinary.publicId
                        .split("/")
                        .pop()
                        ?.replace(/\.[^.]+$/, "")
                        .replace(/[-_]/g, " ") || "Image";
                    setSelectedPhoto({
                      src: item.cloudinary.url,
                      titre: item.caption?.trim() || filename,
                      categorie: folder?.title || "",
                      public_id: item.cloudinary.publicId,
                      secure_url: item.cloudinary.url
                    });
                  }}
                />
              ))}
            </div>

            {hasMore && (
              <LoadMoreButton
                onClick={() => setPage((p) => p + 1)}
                isLoading={false}
                hasMore={hasMore}
              />
            )}

            {!hasMore && filtered.length > 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-slate-500">
                  Vous avez vu toutes les images de ce dossier 🎉
                </p>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </>
  );
}