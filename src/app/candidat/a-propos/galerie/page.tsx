"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect, useCallback } from "react";
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
} from "lucide-react";
import { GalleryLightboxModal } from "@/components/GalleryLightboxModal"; // Import the extracted component

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
  public_id: string;
  secure_url?: string;
}

// ============================================
// DOSSIERS CONFIGURATION - FIXED TO MATCH CLOUDINARY FOLDERS
// ============================================
const DOSSIERS_GALERIE = [
  { id: "activities", label: "Activités", icone: "⚽", idDossier: "activites" }, // Changed from "activites"
  { id: "destinations", label: "Destinations", icone: "✈️", idDossier: "destination" },
  { id: "partners", label: "Partenaires", icone: "🤝", idDossier: "par" }, // Using "par" as folder
  { id: "interviews", label: "Interviews", icone: "🎙️", idDossier: "int" }, // Using "int" as folder
  { id: "visa", label: "Visa", icone: "🛂", idDossier: "visa" },
  // Removed "success-stories" since it doesn't exist
];

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function GalleryPage() {
  const [dossierSelectionne, setDossierSelectionne] = useState<string>("activities"); // Changed default
  const [imagesDossiers, setImagesDossiers] = useState<{ [key: string]: CloudinaryResource[] }>({});
  const [chargement, setChargement] = useState<boolean>(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [recherche, setRecherche] = useState<string>("");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoGalerie | null>(null);
  const [allPhotos, setAllPhotos] = useState<PhotoGalerie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Cloudinary images for a folder
  const fetchDossierCloudinary = async (idDossier: string): Promise<CloudinaryResource[]> => {
    try {
      console.log(`🔄 Chargement du dossier: ${idDossier}`);
      const response = await fetch(`/api/cloudinary/folder?folderId=${encodeURIComponent(idDossier)}`);
      
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

  // Load images for a folder
  const chargerImagesDossier = useCallback(async (idDossier: string) => {
    setChargement(true);
    setErreur(null);
    
    try {
      const resources = await fetchDossierCloudinary(idDossier);
      
      setImagesDossiers(prev => ({
        ...prev,
        [idDossier]: resources
      }));
      
      // Update all photos list with real Cloudinary URLs
      const toutesLesPhotos = resources.map((resource: CloudinaryResource) => {
        const imageUrl = resource.secure_url || 
          `https://res.cloudinary.com/girgi5fd/image/upload/${resource.public_id}`;
        
        const parts = resource.public_id.split('/');
        const filename = parts[parts.length - 1] || resource.public_id;
        const titre = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
        
        return {
          src: imageUrl,
          titre: titre || 'Image',
          categorie: idDossier,
          public_id: resource.public_id,
          secure_url: resource.secure_url,
        };
      });
      
      setAllPhotos(toutesLesPhotos);
      
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Impossible de charger les images");
    } finally {
      setChargement(false);
      setIsLoading(false);
    }
  }, []);

  // Load initial folder
  useEffect(() => {
    const dossierInitial = DOSSIERS_GALERIE.find(d => d.id === dossierSelectionne);
    if (dossierInitial) {
      chargerImagesDossier(dossierInitial.idDossier);
    }
  }, [dossierSelectionne, chargerImagesDossier]);

  const dossierCourant = DOSSIERS_GALERIE.find(d => d.id === dossierSelectionne);
  const images = dossierCourant ? imagesDossiers[dossierCourant.idDossier] || [] : [];

  // Filter images by search
  const imagesFiltrees = images.filter((resource) => {
    if (!recherche) return true;
    const filename = resource.public_id.split('/').pop()?.toLowerCase() || '';
    return filename.includes(recherche.toLowerCase());
  });

  // Get all photos for lightbox with proper URLs
  const allPhotosForLightbox = allPhotos.filter(p => {
    if (!recherche) return true;
    return p.titre.toLowerCase().includes(recherche.toLowerCase());
  });

  // Navigate to next/prev photo in lightbox
  const navigatePhoto = useCallback((photo: PhotoGalerie) => {
    setSelectedPhoto(photo);
  }, []);

  // Calculate total images across all folders
  const totalImages = Object.values(imagesDossiers).reduce(
    (acc, arr) => acc + (arr?.length || 0), 
    0
  );

  // Preload all folders in background
  useEffect(() => {
    const preloadAllFolders = async () => {
      for (const dossier of DOSSIERS_GALERIE) {
        if (!imagesDossiers[dossier.idDossier]) {
          await chargerImagesDossier(dossier.idDossier);
        }
      }
    };
    
    if (!isLoading) {
      preloadAllFolders();
    }
  }, [isLoading, chargerImagesDossier, imagesDossiers]);

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

      {/* Lightbox Modal - Using extracted component */}
      {selectedPhoto && (
        <GalleryLightboxModal
          photo={selectedPhoto}
          photos={allPhotosForLightbox}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={navigatePhoto}
        />
      )}

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

      {/* Main Gallery Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Stats */}
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

        {/* Folder filters */}
        <div className="flex flex-wrap items-center gap-3 pb-2">
          {DOSSIERS_GALERIE.map((dossier) => {
            const estActif = dossierSelectionne === dossier.id;
            const imageCount = imagesDossiers[dossier.idDossier]?.length || 0;
            
            return (
              <button
                key={dossier.id}
                onClick={() => setDossierSelectionne(dossier.id)}
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

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher des images..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
        </div>

        {/* Photo grid */}
        {chargement ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-secondary animate-spin" />
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
              Chargement des images...
            </p>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {imagesFiltrees.map((resource, index) => {
              const imageUrl = resource.secure_url || 
                `https://res.cloudinary.com/girgi5fd/image/upload/${resource.public_id}`;
              
              const parts = resource.public_id.split('/');
              const filename = parts[parts.length - 1] || resource.public_id;
              const titre = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
              
              return (
                <div
                  key={`${resource.public_id}-${index}`}
                  onClick={() => setSelectedPhoto({
                    src: imageUrl,
                    titre: titre || 'Image',
                    categorie: dossierSelectionne,
                    public_id: resource.public_id,
                    secure_url: resource.secure_url,
                  })}
                  className="group relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer aspect-square hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={imageUrl}
                    alt={titre || 'Image'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      console.error(`Erreur de chargement: ${imageUrl}`);
                      const fallbackUrl = `https://res.cloudinary.com/girgi5fd/image/upload/c_fill,w_400,h_400/${resource.public_id}`;
                      (e.target as HTMLImageElement).src = fallbackUrl;
                      
                      setTimeout(() => {
                        (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                      }, 1000);
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <div className="w-full">
                      <p className="text-white text-xs font-bold truncate">
                        {titre}
                      </p>
                      <span className="text-white/60 text-[10px]">
                        {DOSSIERS_GALERIE.find(d => d.id === dossierSelectionne)?.label}
                      </span>
                    </div>
                  </div>

                  {/* Zoom icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="p-2.5 rounded-full bg-white/30 backdrop-blur-md">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}