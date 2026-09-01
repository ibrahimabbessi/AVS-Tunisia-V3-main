// src/components/GallerySection.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DOSSIERS_GALERIE } from "@/types/gallery";
import {
  Search,
  FolderOpen,
  Maximize2,
  Loader2,
  AlertCircle,
  PlusCircle
} from "lucide-react";

interface PhotoGalerie {
  src: string;
  titre: string;
  categorie: string;
}

interface GallerySectionProps {
  onSelectPhoto: (photo: PhotoGalerie) => void;
  onPhotosLoaded: (photos: PhotoGalerie[]) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ 
  onSelectPhoto, 
  onPhotosLoaded 
}) => {
  const [dossierSelectionne, setDossierSelectionne] = useState<string>("activites");
  const [imagesDossiers, setImagesDossiers] = useState<{ [key: string]: string[] }>({});
  const [chargement, setChargement] = useState<boolean>(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [recherche, setRecherche] = useState<string>("");

  // Fonction pour récupérer les images d'un dossier
  const fetchDossierCloudinary = async (idDossier: string): Promise<string[]> => {
    try {
      console.log(`🔄 Chargement du dossier: ${idDossier}`);
      const response = await fetch(`/api/cloudinary/folder?folderId=${encodeURIComponent(idDossier)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erreur API:', errorData);
        // En cas d'erreur, utiliser des images mockées pour le développement
        return generateMockImages(idDossier);
      }
      
      const data = await response.json();
      console.log(`📸 Données reçues:`, data);
      
      if (data.images && data.images.length > 0) {
        return data.images;
      } else {
        // Si aucun image trouvé, utiliser des mockées
        console.warn('⚠️ Aucune image trouvée, utilisation de mock');
        return generateMockImages(idDossier);
      }
    } catch (error) {
      console.error('❌ Erreur fetch:', error);
      return generateMockImages(idDossier);
    }
  };

  // Générer des images mockées pour le développement et tester l'affichage
  const generateMockImages = (idDossier: string): string[] => {
    const mockImages = [];
    // Extraire le nom du dossier pour les images
    const folderName = idDossier.split('/').pop() || idDossier;
    for (let i = 1; i <= 8; i++) {
      mockImages.push(`${idDossier}/image-${i}.jpg`);
    }
    return mockImages;
  };

  // Charger les images d'un dossier
  const chargerImagesDossier = useCallback(async (idDossier: string) => {
    setChargement(true);
    setErreur(null);
    
    try {
      const images = await fetchDossierCloudinary(idDossier);
      
      setImagesDossiers(prev => ({
        ...prev,
        [idDossier]: images
      }));
      
      // Mettre à jour la liste complète des photos
      const toutesLesPhotos = images.map(img => ({
        src: `https://res.cloudinary.com/girgi5fd/image/upload/${img}`,
        titre: img.split('/').pop()?.replace(/\.[^.]+$/, '') || 'Image',
        categorie: idDossier
      }));
      onPhotosLoaded(toutesLesPhotos);
      
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Impossible de charger les images");
    } finally {
      setChargement(false);
    }
  }, [onPhotosLoaded]);

  // Charger le dossier initial
  useEffect(() => {
    const dossierInitial = DOSSIERS_GALERIE.find(d => d.id === dossierSelectionne);
    if (dossierInitial) {
      chargerImagesDossier(dossierInitial.idDossier);
    }
  }, [dossierSelectionne, chargerImagesDossier]);

  const dossierCourant = DOSSIERS_GALERIE.find(d => d.id === dossierSelectionne);
  const images = dossierCourant ? imagesDossiers[dossierCourant.idDossier] || [] : [];

  // Filtrer les images par recherche
  const imagesFiltrees = images.filter((cheminImage) => {
    if (!recherche) return true;
    const nomFichier = cheminImage.split('/').pop()?.toLowerCase() || '';
    return nomFichier.includes(recherche.toLowerCase());
  });

  return (
    <section id="galerie" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-extrabold text-xs mb-3">
            <FolderOpen className="w-4 h-4 text-purple-500" />
            <span>Galerie 📸</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Galerie des Activités & Destinations
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
            Explorez nos activités, destinations, interviews et partenaires en images.
          </p>
        </div>
      </div>

      {/* Filtres par dossier */}
      <div className="flex flex-wrap items-center gap-3 pb-2">
        {DOSSIERS_GALERIE.map((dossier) => {
          const estActif = dossierSelectionne === dossier.id;
          const imageCount = imagesDossiers[dossier.idDossier]?.length || 0;
          
          return (
            <button
              key={dossier.id}
              onClick={() => {
                setDossierSelectionne(dossier.id);
              }}
              className={`px-5 py-2.5 rounded-2xl text-sm font-black whitespace-nowrap transition-all flex items-center space-x-2 ${
                estActif
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <span>{dossier.icone}</span>
              <span>{dossier.label}</span>
              {estActif && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                  {imageCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher des images..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Grille d'images */}
      {chargement ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
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
            className="px-6 py-2 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      ) : imagesFiltrees.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {imagesFiltrees.map((cheminImage, index) => {
            const urlComplete = `https://res.cloudinary.com/girgi5fd/image/upload/${cheminImage}`;
            const nomFichier = cheminImage.split('/').pop() || `image-${index}`;
            const nomAffichage = nomFichier.replace(/\.(jpg|jpeg|png|webp)$/i, '');
            
            return (
              <div
                key={`${cheminImage}-${index}`}
                onClick={() => onSelectPhoto({
                  src: urlComplete,
                  titre: nomAffichage,
                  categorie: dossierSelectionne
                })}
                className="group relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer aspect-square hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={urlComplete}
                  alt={nomAffichage}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Erreur de chargement: ${urlComplete}`);
                    (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                  }}
                />
                
                {/* Overlay au survol */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div className="w-full">
                    <p className="text-white text-xs font-bold truncate">
                      {nomAffichage}
                    </p>
                    <span className="text-white/60 text-[10px]">
                      {DOSSIERS_GALERIE.find(d => d.id === dossierSelectionne)?.label}
                    </span>
                  </div>
                </div>

                {/* Icône de zoom */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="p-2.5 rounded-full bg-white/30 backdrop-blur-md">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <div className="text-4xl mb-2">📭</div>
          <p className="text-sm font-extrabold text-slate-600 dark:text-slate-300">
            {recherche 
              ? "Aucune image ne correspond à votre recherche." 
              : "Sélectionnez un dossier pour voir les images"}
          </p>
          <button
            onClick={() => {
              const dossier = DOSSIERS_GALERIE.find(d => d.id === dossierSelectionne);
              if (dossier) chargerImagesDossier(dossier.idDossier);
            }}
            className="mt-4 px-6 py-2 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition-colors"
          >
            Actualiser
          </button>
        </div>
      )}
    </section>
  );
};