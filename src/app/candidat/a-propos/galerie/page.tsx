"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  Search,
  FolderOpen,
  Maximize2,
  Loader2,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  ZoomIn,
  ZoomOut,
  Download,
  Heart,
  ChevronDown,
} from "lucide-react";
import { GalleryLightboxModal } from "@/components/GalleryLightboxModal";

// ============================================
// TYPES
// ============================================
interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  created_at?: string;
  format?: string;
  context?: {
    custom?: {
      caption?: string;
      alt?: string;
    };
  };
}

interface PhotoGalerie {
  src: string;
  titre: string;
  categorie: string;
  public_id?: string;
  secure_url?: string;
  thumbnail?: string;
  optimized?: string;
}

// ============================================
// DOSSIERS CONFIGURATION
// ============================================
const DOSSIERS_GALERIE = [
  { id: "activities", label: "Activités", icone: "⚽", idDossier: "activites" },
  { id: "destinations", label: "Destinations", icone: "✈️", idDossier: "destination" },
  { id: "partners", label: "Partenaires", icone: "🤝", idDossier: "par" },
  { id: "interviews", label: "Interviews", icone: "🎙️", idDossier: "int" },
  { id: "visa", label: "Visa", icone: "🛂", idDossier: "visa" },
  { id: "contract", label: "Contrats", icone: "📄", idDossier: "contrat" },
];

const ITEMS_PER_PAGE = 24;
const CLOUDINARY_CLOUD_NAME = "girgi5fd";

// ============================================
// IMAGE CACHE UTILITY
// ============================================
const ImageCache = {
  set: (folderId: string, images: CloudinaryResource[]) => {
    try {
      sessionStorage.setItem(`gallery_${folderId}`, JSON.stringify({
        data: images,
        timestamp: Date.now()
      }));
    } catch (e) {}
  },
  
  get: (folderId: string): CloudinaryResource[] | null => {
    try {
      const cached = sessionStorage.getItem(`gallery_${folderId}`);
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > 10 * 60 * 1000) {
        sessionStorage.removeItem(`gallery_${folderId}`);
        return null;
      }
      
      return data;
    } catch (e) {
      return null;
    }
  },
  
  clear: () => {
    try {
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith('gallery_')) {
          sessionStorage.removeItem(key);
        }
      });
    } catch (e) {}
  }
};

// ============================================
// IMAGE OPTIMIZATION UTILITIES
// ============================================
const getOptimizedUrl = (publicId: string, width: number, quality: number = 80) => {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_${width},q_${quality},fl_progressive/${publicId}`;
};

const getSrcSet = (publicId: string) => {
  const sizes = [200, 400, 800, 1200];
  return sizes.map(size => 
    `${getOptimizedUrl(publicId, size)} ${size}w`
  ).join(', ');
};

// ============================================
// SKELETON LOADING COMPONENT
// ============================================
const ImageSkeleton = () => (
  <div className="aspect-square rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer bg-[length:200%_100%]" />
  </div>
);

// ============================================
// OPTIMIZED IMAGE COMPONENT
// ============================================
const OptimizedImage = ({ 
  resource, 
  onClick, 
  isPriority = false,
  folderLabel,
}: { 
  resource: CloudinaryResource; 
  onClick: () => void;
  isPriority?: boolean;
  folderLabel?: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const publicId = resource.public_id;
  const parts = publicId.split('/');
  const filename = parts[parts.length - 1] || publicId;
  const titre = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
  
  const thumbnailUrl = getOptimizedUrl(publicId, 400);
  const fullUrl = resource.secure_url || getOptimizedUrl(publicId, 1200);
  
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
        srcSet={isPriority ? getSrcSet(publicId) : undefined}
        sizes={isPriority ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" : undefined}
        alt={titre || 'Image'}
        className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={isPriority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          setError(true);
          const fallbackUrl = getOptimizedUrl(publicId, 400);
          (e.target as HTMLImageElement).src = fallbackUrl;
          
          setTimeout(() => {
            (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
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
          <p className="text-white text-xs font-bold truncate">
            {titre}
          </p>
          <span className="text-white/60 text-[10px]">
            {folderLabel}
          </span>
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
// LOAD MORE BUTTON COMPONENT
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
// MAIN PAGE COMPONENT - FIXED
// ============================================
export default function GalleryPage() {
  const [dossierSelectionne, setDossierSelectionne] = useState<string>("activities");
  const [imagesDossiers, setImagesDossiers] = useState<{ [key: string]: CloudinaryResource[] }>({});
  const [chargement, setChargement] = useState<boolean>(false);
  const [chargementPlus, setChargementPlus] = useState<boolean>(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [recherche, setRecherche] = useState<string>("");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoGalerie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [visibleImages, setVisibleImages] = useState<CloudinaryResource[]>([]);
  
  // Use refs to prevent infinite loops
  const loadingRef = useRef<{ [key: string]: boolean }>({});
  const isInitialLoadRef = useRef(true);

  // Fetch Cloudinary images for a folder with pagination
  const fetchDossierCloudinary = async (idDossier: string, pageNum: number = 1): Promise<CloudinaryResource[]> => {
    try {
      console.log(`🔄 Chargement du dossier: ${idDossier}, page: ${pageNum}`);
      const response = await fetch(
        `/api/cloudinary/folder?folderId=${encodeURIComponent(idDossier)}&page=${pageNum}&limit=${ITEMS_PER_PAGE}`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erreur API:', errorData);
        return [];
      }
      
      const data = await response.json();
      console.log(`📸 Données reçues pour ${idDossier}:`, data);
      
      if (data.resources && data.resources.length > 0) {
        return data.resources;
      } else {
        console.warn(`⚠️ Aucune image trouvée dans ${idDossier}`);
        return [];
      }
    } catch (error) {
      console.error('❌ Erreur fetch:', error);
      return [];
    }
  };

  // Load images for a folder with caching - FIXED: removed allPhotos dependency
  const chargerImagesDossier = useCallback(async (idDossier: string, pageNum: number = 1, append: boolean = false) => {
    // Prevent concurrent loading of the same folder
    const loadingKey = `${idDossier}-${pageNum}`;
    if (loadingRef.current[loadingKey]) {
      console.log(`⏳ Already loading ${loadingKey}, skipping...`);
      return;
    }
    loadingRef.current[loadingKey] = true;

    if (pageNum === 1) {
      setChargement(true);
      setPage(1);
    } else {
      setChargementPlus(true);
    }
    setErreur(null);
    
    try {
      // Check cache for first page only
      if (pageNum === 1) {
        const cached = ImageCache.get(idDossier);
        if (cached && cached.length > 0) {
          console.log(`📦 Cache trouvé pour ${idDossier}: ${cached.length} images`);
          
          // Update all states atomically
          setImagesDossiers(prev => ({
            ...prev,
            [idDossier]: cached
          }));
          
          setVisibleImages(cached);
          setHasMore(cached.length === ITEMS_PER_PAGE);
          setIsLoading(false);
          setChargement(false);
          loadingRef.current[loadingKey] = false;
          return;
        }
      }
      
      const resources = await fetchDossierCloudinary(idDossier, pageNum);
      
      if (resources.length === 0 && pageNum === 1) {
        setHasMore(false);
        setVisibleImages([]);
        setImagesDossiers(prev => ({
          ...prev,
          [idDossier]: []
        }));
        setIsLoading(false);
        setChargement(false);
        loadingRef.current[loadingKey] = false;
        return;
      }
      
      // Update images
      setImagesDossiers(prev => {
        const existing = prev[idDossier] || [];
        const updated = append ? [...existing, ...resources] : resources;
        
        if (pageNum === 1) {
          ImageCache.set(idDossier, updated);
        }
        
        return {
          ...prev,
          [idDossier]: updated
        };
      });
      
      // Update visible images
      setVisibleImages(prev => append ? [...prev, ...resources] : resources);
      setHasMore(resources.length === ITEMS_PER_PAGE);
      setPage(pageNum);
      
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Impossible de charger les images");
    } finally {
      setChargement(false);
      setChargementPlus(false);
      setIsLoading(false);
      loadingRef.current[loadingKey] = false;
    }
  }, []); // ⚠️ EMPTY dependency array - this function never changes!

  // Load more images
  const loadMore = useCallback(() => {
    if (!hasMore || chargementPlus || chargement) return;
    const dossier = DOSSIERS_GALERIE.find(d => d.id === dossierSelectionne);
    if (dossier) {
      chargerImagesDossier(dossier.idDossier, page + 1, true);
    }
  }, [hasMore, chargementPlus, chargement, dossierSelectionne, page, chargerImagesDossier]);

  // Load initial folder - FIXED: dependencies are stable now
  useEffect(() => {
    const dossierInitial = DOSSIERS_GALERIE.find(d => d.id === dossierSelectionne);
    if (dossierInitial) {
      // Reset pagination state when folder changes
      setPage(1);
      setHasMore(true);
      setVisibleImages([]);
      chargerImagesDossier(dossierInitial.idDossier);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dossierSelectionne]); // ⚠️ Only depends on dossierSelectionne

  // Get current folder data
  const dossierCourant = DOSSIERS_GALERIE.find(d => d.id === dossierSelectionne);
  const images = dossierCourant ? imagesDossiers[dossierCourant.idDossier] || [] : [];

  // Filter images by search
  const imagesFiltrees = useMemo(() => {
    if (!recherche) return visibleImages;
    return visibleImages.filter((resource) => {
      const filename = resource.public_id.split('/').pop()?.toLowerCase() || '';
      return filename.includes(recherche.toLowerCase());
    });
  }, [visibleImages, recherche]);

  // Get all photos for lightbox - FIXED: computed from imagesDossiers
  const allPhotosForLightbox = useMemo(() => {
    const allPhotos: PhotoGalerie[] = [];
    Object.entries(imagesDossiers).forEach(([categorie, resources]) => {
      resources?.forEach((resource) => {
        const filename = resource.public_id.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ') || 'Image';
        if (!recherche || filename.toLowerCase().includes(recherche.toLowerCase())) {
          allPhotos.push({
            src: resource.secure_url || getOptimizedUrl(resource.public_id, 1200),
            titre: filename,
            categorie: categorie,
            public_id: resource.public_id,
            secure_url: resource.secure_url,
            thumbnail: getOptimizedUrl(resource.public_id, 400),
            optimized: getOptimizedUrl(resource.public_id, 800),
          });
        }
      });
    });
    return allPhotos;
  }, [imagesDossiers, recherche]);

  // Navigate to next/prev photo in lightbox
  const navigatePhoto = useCallback((photo: PhotoGalerie) => {
    setSelectedPhoto(photo);
  }, []);

  // Calculate total images across all folders
  const totalImages = useMemo(() => {
    return Object.values(imagesDossiers).reduce(
      (acc, arr) => acc + (arr?.length || 0), 
      0
    );
  }, [imagesDossiers]);

  // Preload next page when scrolling near bottom
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || chargementPlus || chargement) return;
      
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 500;
      
      if (scrollPosition >= threshold) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, chargementPlus, chargement, loadMore]);

  // Reset pagination when folder changes - already handled in useEffect above
  
  if (isLoading && chargement) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-secondary animate-spin mx-auto mb-4" />
            <p className="text-on-surface-variant">Chargement de la galerie...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {selectedPhoto && (
        <GalleryLightboxModal
          photo={selectedPhoto}
          photos={allPhotosForLightbox}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={navigatePhoto}
        />
      )}

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
                Explorez notre galerie photo regroupant l&apos;ensemble de nos activités,
                événements, partenariats et moments marquants capturés en images.
              </p>
            </div>
            <div className="flex-1 max-w-md lg:max-w-lg">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-imperial/20 to-secondary/20 mix-blend-overlay"></div>
                <img
                  src="https://images.unsplash.com/photo-1554907984-1d022f2c1a5c?w=800&q=80"
                  alt="Galerie Photo"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='24' font-weight='bold'%3E📸 Galerie%3C/text%3E%3C/svg%3E";
                  }}
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

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <div className="text-2xl mb-1">📷</div>
            <div className="font-display-lg text-secondary text-xl">{totalImages}</div>
            <div className="text-caption text-on-surface-variant mt-1 font-medium uppercase tracking-wider text-xs">
              Photos totales
            </div>
          </div>
          <div className="text-center p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <div className="text-2xl mb-1">📁</div>
            <div className="font-display-lg text-secondary text-xl">{DOSSIERS_GALERIE.length}</div>
            <div className="text-caption text-on-surface-variant mt-1 font-medium uppercase tracking-wider text-xs">
              Dossiers
            </div>
          </div>
          <div className="text-center p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <div className="text-2xl mb-1">📂</div>
            <div className="font-display-lg text-secondary text-xl">
              {Object.keys(imagesDossiers).filter(key => imagesDossiers[key]?.length > 0).length}
            </div>
            <div className="text-caption text-on-surface-variant mt-1 font-medium uppercase tracking-wider text-xs">
              Dossiers chargés
            </div>
          </div>
          <div className="text-center p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
            <div className="text-2xl mb-1">🖼️</div>
            <div className="font-display-lg text-secondary text-xl">
              {imagesFiltrees.length}
            </div>
            <div className="text-caption text-on-surface-variant mt-1 font-medium uppercase tracking-wider text-xs">
              Photos affichées
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pb-2">
          {DOSSIERS_GALERIE.map((dossier) => {
            const estActif = dossierSelectionne === dossier.id;
            const imageCount = imagesDossiers[dossier.idDossier]?.length || 0;
            
            return (
              <button
                key={dossier.id}
                onClick={() => {
                  setDossierSelectionne(dossier.id);
                  setRecherche("");
                }}
                className={`px-5 py-2.5 rounded-2xl text-sm font-black whitespace-nowrap transition-all flex items-center space-x-2 ${
                  estActif
                    ? "bg-secondary text-white shadow-md shadow-secondary/30 scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <span>{dossier.icone}</span>
                <span>{dossier.label}</span>
                {imageCount > 0 && (
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                    estActif ? "bg-white/20" : "bg-slate-200 dark:bg-slate-700"
                  }`}>
                    {imageCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

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

        {chargement ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array(12).fill(0).map((_, i) => (
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
                const dossier = DOSSIERS_GALERIE.find(d => d.id === dossierSelectionne);
                if (dossier) chargerImagesDossier(dossier.idDossier);
              }}
              className="px-6 py-2 rounded-xl bg-secondary text-white font-bold text-sm hover:bg-secondary/80 transition-colors"
            >
              Réessayer
            </button>
          </div>
        ) : imagesFiltrees.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-sm font-extrabold text-slate-600 dark:text-slate-300">
              {recherche 
                ? "Aucune image ne correspond à votre recherche." 
                : `Aucune image dans le dossier "${dossierCourant?.label}".`}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Assurez-vous que des images sont uploadées dans le dossier <strong>{dossierCourant?.idDossier}</strong> sur Cloudinary.
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
              {imagesFiltrees.map((resource, index) => (
                <OptimizedImage
                  key={`${resource.public_id}-${index}`}
                  resource={resource}
                  isPriority={index < 5}
                  folderLabel={dossierCourant?.label}
                  onClick={() => setSelectedPhoto({
                    src: resource.secure_url || getOptimizedUrl(resource.public_id, 1200),
                    titre: resource.public_id.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ') || 'Image',
                    categorie: dossierSelectionne,
                    public_id: resource.public_id,
                    secure_url: resource.secure_url,
                  })}
                />
              ))}
            </div>

            {chargementPlus && (
              <div className="flex justify-center py-8">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-6 h-6 text-secondary animate-spin" />
                  <span className="text-sm text-slate-500">Chargement de plus d'images...</span>
                </div>
              </div>
            )}

            {hasMore && !chargementPlus && imagesFiltrees.length > 0 && (
              <LoadMoreButton 
                onClick={loadMore}
                isLoading={chargementPlus}
                hasMore={hasMore}
              />
            )}

            {!hasMore && imagesFiltrees.length > 0 && (
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