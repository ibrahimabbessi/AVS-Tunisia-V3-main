"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  ZoomIn,
  ZoomOut,
  Download,
  FolderOpen,
  Heart
} from "lucide-react";

interface PhotoGalerie {
  src: string;
  titre: string;
  categorie: string;
  public_id?: string;
  secure_url?: string;
}

interface GalleryLightboxModalProps {
  photo: PhotoGalerie;
  photos: PhotoGalerie[];
  onClose: () => void;
  onNavigate: (nextPhoto: PhotoGalerie) => void;
}

export const GalleryLightboxModal: React.FC<GalleryLightboxModalProps> = ({
  photo,
  photos,
  onClose,
  onNavigate,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [aime, setAime] = useState<boolean>(false);

  // Trouver l'index actuel
  useEffect(() => {
    const index = photos.findIndex((p) => p.src === photo.src);
    setCurrentIndex(index >= 0 ? index : 0);
  }, [photo, photos]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(photos[prevIdx]);
  }, [currentIndex, photos, onNavigate]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % photos.length;
    onNavigate(photos[nextIdx]);
  }, [currentIndex, photos, onNavigate]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  }, [onClose, handlePrev, handleNext]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleDownload = async () => {
    try {
      const response = await fetch(photo.src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = photo.titre || "image";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      window.open(photo.src, "_blank");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: photo.titre,
          text: `Découvrez cette image de ${photo.categorie}`,
          url: photo.src,
        });
      } else {
        await navigator.clipboard.writeText(photo.src);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Partage échoué:", error);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-6xl max-h-[92vh] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col lg:flex-row overflow-hidden">
        
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2.5 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 hover:scale-110 transition-all duration-200 shadow-lg"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Zone image */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] lg:min-h-[500px]">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-white/60 text-sm font-medium">
                Chargement de l'image...
              </p>
            </div>
          )}

          {imageError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="text-6xl mb-4">🖼️</div>
              <p className="text-white/70 font-medium mb-2">
                Échec du chargement de l'image
              </p>
              <p className="text-white/40 text-sm max-w-md">
                L'image n'a pas pu être chargée. Vérifiez votre connexion.
              </p>
              <button
                onClick={() => {
                  setImageLoaded(false);
                  setImageError(false);
                  const nouvelleSrc = photo.src + (photo.src.includes('?') ? '&' : '?') + `retry=${Date.now()}`;
                  const img = new Image();
                  img.src = nouvelleSrc;
                  img.onload = () => {
                    setImageLoaded(true);
                    setImageError(false);
                  };
                  img.onerror = () => {
                    setImageError(true);
                  };
                }}
                className="mt-4 px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm transition-colors"
              >
                Réessayer
              </button>
            </div>
          )}

          <img
            src={photo.src}
            alt={photo.titre || "Image de la galerie"}
            className={`max-h-[80vh] w-auto object-contain transition-all duration-300 select-none ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: `scale(${zoomLevel})` }}
            onLoad={() => {
              setImageLoaded(true);
              setImageError(false);
            }}
            onError={() => {
              setImageLoaded(false);
              setImageError(true);
            }}
            crossOrigin="anonymous"
          />

          {/* Navigation */}
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/60 text-white hover:bg-slate-800 hover:scale-110 transition-all duration-200 border border-white/10 backdrop-blur-sm"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/60 text-white hover:bg-slate-800 hover:scale-110 transition-all duration-200 border border-white/10 backdrop-blur-sm"
                aria-label="Suivant"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Contrôles de zoom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-1 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
              className="p-1.5 text-white hover:text-purple-400 transition-colors rounded-lg hover:bg-white/10"
              aria-label="Zoom arrière"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs text-white font-bold px-2 min-w-[44px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
              className="p-1.5 text-white hover:text-purple-400 transition-colors rounded-lg hover:bg-white/10"
              aria-label="Zoom avant"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 text-white hover:text-purple-400 transition-colors rounded-lg hover:bg-white/10 border-l border-white/10 pl-2"
              aria-label="Réinitialiser le zoom"
            >
              <span className="text-xs font-bold">Réinitialiser</span>
            </button>
          </div>

          {/* Compteur d'images */}
          <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-xs text-white font-bold">
              {currentIndex + 1} / {photos.length}
            </span>
          </div>
        </div>

        {/* Panneau latéral - Métadonnées */}
        <div className="w-full lg:w-80 p-5 lg:p-6 bg-slate-900 text-white flex flex-col justify-between space-y-5 overflow-y-auto border-t lg:border-t-0 lg:border-l border-slate-800">
          <div className="space-y-4">
            {/* Badge catégorie */}
            <div className="inline-block px-3 py-1 rounded-full text-xs font-black bg-purple-900/60 text-purple-300 border border-purple-700">
              <span className="flex items-center space-x-1">
                <FolderOpen className="w-3 h-3" />
                <span>{photo.categorie?.toUpperCase() || "GALERIE"}</span>
              </span>
            </div>

            {/* Titre */}
            <h2 className="text-xl font-black leading-snug line-clamp-3">
              {photo.titre || "Sans titre"}
            </h2>

            {/* Métadonnées */}
            <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="text-slate-500">📁 Dossier:</span>
                <span className="text-slate-300 font-bold">{photo.categorie}</span>
              </div>
            </div>
          </div>

          {/* Barre d'actions */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
            {/* Bouton J'aime */}
            <button
              onClick={() => setAime(!aime)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex-1 justify-center ${
                aime
                  ? "bg-rose-500 text-white hover:bg-rose-600"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
            >
              <Heart className={`w-4 h-4 ${aime ? "fill-current" : ""}`} />
              <span>{aime ? "J'aime" : "Aimer"}</span>
            </button>

            {/* Bouton Partager */}
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-extrabold text-xs hover:bg-slate-700 transition-all flex-1 justify-center"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedShare ? "Copié !" : "Partager"}</span>
            </button>

            {/* Bouton Télécharger */}
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-3 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-extrabold text-xs hover:bg-slate-700 transition-all"
              aria-label="Télécharger"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};