// src/types/gallery.ts
export type DossierGalerie = 
  | 'activites'
  | 'destination'
  | 'interview'
  | 'partenaires'
  | 'visa';

export interface DonneesDossier {
  id: DossierGalerie;
  label: string;
  cheminCloudinary: string;
  idDossier: string; // Le chemin complet dans Cloudinary
  icone: string;
}

export const DOSSIERS_GALERIE: DonneesDossier[] = [
  {
    id: 'activites',
    label: 'Activités',
    cheminCloudinary: 'https://res.cloudinary.com/girgi5fd/image/upload/',
    idDossier: 'Home/candidat/media-galerie/Activites', // Chemin complet
    icone: '🎯'
  },
  {
    id: 'destination',
    label: 'Destinations',
    cheminCloudinary: 'https://res.cloudinary.com/girgi5fd/image/upload/',
    idDossier: 'Home/candidat/media-galerie/Destination',
    icone: '🌍'
  },
  {
    id: 'interview',
    label: 'Interviews',
    cheminCloudinary: 'https://res.cloudinary.com/girgi5fd/image/upload/',
    idDossier: 'Home/candidat/media-galerie/Interviews',
    icone: '🎙️'
  },
  {
    id: 'partenaires',
    label: 'Partenaires',
    cheminCloudinary: 'https://res.cloudinary.com/girgi5fd/image/upload/',
    idDossier: 'Home/candidat/media-galerie/Partners',
    icone: '🤝'
  },
  {
    id: 'visa',
    label: 'Visa',
    cheminCloudinary: 'https://res.cloudinary.com/girgi5fd/image/upload/',
    idDossier: 'Home/candidat/media-galerie/Visa',
    icone: '🛂'
  }
];