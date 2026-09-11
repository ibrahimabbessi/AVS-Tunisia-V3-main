// src/app/candidat/a-propos/events/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// Cloudinary helper
const CLOUDINARY_BASE = "https://res.cloudinary.com/girgi5fd/image/upload/";

const cloudinary = (path: string) => {
  return `${CLOUDINARY_BASE}${path}`;
};

// Types
interface Event {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  date: string;
  location?: string;
  category: string[];
  tags: string[];
  images: string[];
  videos?: {
    url: string;
    title: string;
    thumbnail?: string;
    isFacebookReel?: boolean;
  }[];
  pressLinks?: {
    title: string;
    url: string;
    source: string;
    date?: string;
  }[];
  socialLinks?: {
    platform: "facebook" | "instagram" | "youtube" | "linkedin" | "twitter" | "website";
    url: string;
    label?: string;
    isVideo?: boolean;
  }[];
  featured?: boolean;
  status?: "upcoming" | "ongoing" | "completed";
}

// Generate image URLs for the event (from pic100 to pic142)
const generateEventImages = () => {
  const images = [];
  for (let i = 100; i <= 142; i++) {
    images.push(`v1788972500/event-14-08-2026-pic${i}.jpg`);
  }
  return images;
};
const generateFestivalImages = () => {
  const images = [];
  // pic0 to pic31
  for (let i = 0; i <= 31; i++) {
    images.push(`v1788978188/event-27-08-2026-pic${i}.jpg`);
  }
  return images;
};


// Generate image URLs for the Hommage event
const generateHommageImages = () => {
  const images = [
    "v1788977975/event-07-09-2026-pic18.jpg",
    "v1788977975/event-07-09-2026-pic28.jpg",
    "v1788977973/event-07-09-2026-pic39.jpg",
    "v1788977965/event-07-09-2026-pic6.jpg",
    "v1788977975/event-07-09-2026-pic2.jpg",
    "v1788977975/event-07-09-2026-pic10.jpg",
    "v1788977975/event-07-09-2026-pic13.jpg",
    "v1788977975/event-07-09-2026-pic33.jpg",
    "v1788977975/event-07-09-2026-pic8.jpg",
    "v1788977975/event-07-09-2026-pic1.jpg",
  ];
  return images;
};

// Events Data
const EVENTS: Event[] = [
  // NEW EVENT - Visite de l'Ambassadeur de Chine
  {
    id: "5",
    title: "Visite de l'Ambassadeur de Chine à Hergla",
    description: "Hergla accueille S.E. l'Ambassadeur de Chine et sa délégation. Une visite culturelle et touristique riche en échanges et en découvertes.",
    longDescription: `🇨🇳 Hergla accueille S.E. l'Ambassadeur de Chine et sa délégation

Dans une atmosphère alliant culture, histoire et beauté des lieux, S.E. l'Ambassadeur de la République Populaire de Chine en Tunisie, M. Wang Li, accompagné de la délégation chinoise, a fait escale dans la ville de Hergla, dans le cadre d'une visite à caractère touristique et culturel visant à découvrir le riche patrimoine historique et les charmes authentiques de la Méditerranée.

M. Wang Li, connu pour sa modestie, sa légèreté d'esprit et sa présence chaleureuse, a insufflé une atmosphère de convivialité, de simplicité et de bienveillance, transformant cette visite en un moment privilégié alliant découverte culturelle, échange d'amitié et renforcement des liens entre la Tunisie et la Chine.

L'équipe d'AVS FORMA Hergla a eu l'honneur d'être présente et de contribuer à l'accueil de S.E. l'Ambassadeur et de sa délégation, lors d'une occasion dont nous sommes fiers pour les valeurs humaines et culturelles qu'elle porte, et pour l'importance qu'elle revêt en matière d'ouverture sur les différentes cultures et de renforcement du dialogue entre les peuples.

Cette visite s'inscrit dans le cadre du soutien aux échanges culturels et touristiques, du renforcement des liens d'amitié et de coopération entre les peuples tunisien et chinois, et de la mise en valeur des atouts historiques et touristiques dont regorge la ville de Hergla.

✨ Hergla... où se rencontrent le parfum de l'histoire et la beauté de la mer, et où les visites se transforment en ponts d'amitié entre les peuples. 🇹🇳🇨🇳

🇨🇳 欢迎！🇨🇳`,
    date: "2026-08-14",
    location: "Hergla, Tunisie",
    category: ["culturel", "diplomatique", "tourisme"],
    tags: ["Chine", "Tunisie", "Ambassadeur", "Hergla", "culture", "diplomatie", "échanges", "amitié"],
    images: generateEventImages(),
    videos: [
      {
        url: "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reel/1077682931869173&show_text=0",
        title: "🎬 Reel Facebook - Visite de l'Ambassadeur de Chine",
      }
    ],
    socialLinks: [
      { 
        platform: "facebook", 
        url: "https://www.facebook.com/photo?fbid=1442607777895158&set=pcb.1442616694560933",
        label: "📸 Post Photo 1"
      },
      { 
        platform: "facebook", 
        url: "https://www.facebook.com/photo/?fbid=1446300834192519&set=a.553485663474045",
        label: "📸 Post Photo 2"
      },
      { 
        platform: "facebook", 
        url: "https://www.facebook.com/reel/1077682931869173",
        label: "🎬 Reel Vidéo",
        isVideo: true
      },
      { platform: "instagram", url: "https://www.instagram.com/herglaformaavs/", label: "📷 Instagram" },
      { platform: "youtube", url: "https://www.youtube.com/@AVSTunisia", label: "▶️ YouTube" },
    ],
    featured: true,
    status: "completed",
  },
  // NEW EVENT - Cérémonie d'Hommage aux Enseignants (with updated images)
  {
    id: "6",
    title: "Cérémonie d'Hommage aux Enseignants - Un Siècle de Savoir",
    description: "Plus de cent ans de science et de connaissance, et un hommage à ceux qui ont éclairé nos chemins. Une cérémonie émouvante réunissant la communauté éducative.",
    longDescription: "Cette cérémonie d'hommage a célébré des générations d'enseignants qui ont consacré leur vie à la transmission du savoir et à la formation des esprits. Un moment d'émotion et de reconnaissance envers ces piliers de notre société.\n\nL'événement a rassemblé plus de 200 participants, incluant des enseignants retraités, des élèves, des parents et des personnalités locales. Des discours émouvants, des témoignages et des moments artistiques ont marqué cette célébration unique.\n\nCette initiative a permis de mettre en lumière le rôle essentiel des enseignants dans la construction d'une société éclairée et de transmettre un message de gratitude à tous ceux qui ont consacré leur vie à l'éducation.",
    date: "2026-09-07",
    location: "École Habib El Kamil, Hergla",
    category: ["hommage", "éducation", "célébration"],
    tags: ["enseignants", "savoir", "transmission", "communauté", "reconnaissance", "éducation", "hommage"],
    images: generateHommageImages(),
    videos: [
      {
        url: "https://www.youtube.com/watch?v=N6wCRQ4QWtk",
        title: "Cérémonie d'Hommage - Version Intégrale",
        thumbnail: "v1788891722/event-hommage-thumb.jpg",
      },
      {
        url: "https://www.youtube.com/watch?v=SzrzUk0br70",
        title: "Témoignages des Enseignants Honorés",
      },
      {
        url: "https://www.youtube.com/watch?v=xmaO8SCEEoY",
        title: "École Habib El Kamil - Un siècle d'éducation et de transmission",
      },
    ],
    pressLinks: [
      {
        title: "Une cérémonie historique pour honorer les enseignants",
        url: "https://example.com/presse/hommage-enseignants",
        source: "Le Quotidien",
        date: "2026-09-08",
      },
    ],
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/avstunisia/events/1" },
      { platform: "instagram", url: "https://instagram.com/avstunisia/events/1" },
      { platform: "youtube", url: "https://youtube.com/avstunisia/events/1" },
    ],
    featured: false,
    status: "completed",
  },

  {
    id: "2",
    title: "Tournoi International de Football Tunisie vs Allemagne",
    description: "Un tournoi amical de football entre la Tunisie et l'Allemagne, réunissant 4 équipes dans une ambiance sportive et conviviale.",
    longDescription: "Le tournoi a réuni des équipes tunisiennes et allemandes dans un esprit de compétition et d'amitié. L'événement a été marqué par des matchs intenses, des échanges culturels et une forte participation du public local.\n\nOrganisé en partenariat avec le Club Sportif Hergla et des clubs allemands, ce tournoi a renforcé les liens sportifs et culturels entre les deux nations.",
    date: "2025-03-04",
    location: "Stade Sportif Hergla",
    category: ["sport", "international", "football"],
    tags: ["football", "tournoi", "Tunisie", "Allemagne", "sport", "amitié"],
    images: [
      "v1786966061/Foto_Ikbal_Lamine.jpg",
      "v1786966065/Foto_Ghzala_Boussadia.png",
    ],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=9_Iuj4kkDo0",
        title: "Tournoi Tunis VS Germany - Highlights",
      },
    ],
    pressLinks: [
      {
        title: "Un tournoi pour rapprocher les cultures",
        url: "https://example.com/presse/tournoi-football",
        source: "Radio Monastir",
        date: "2025-03-06",
      },
    ],
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/avstunisia/events/2" },
      { platform: "instagram", url: "https://instagram.com/avstunisia/events/2" },
    ],
    featured: false,
    status: "completed",
  },
  {
    id: "3",
    title: "Visite des Partenaires Allemands à Sousse",
    description: "Une visite stratégique de nos partenaires allemands pour explorer les opportunités de coopération et d'investissement en Tunisie.",
    longDescription: "Dans le cadre du renforcement des liens entre la Tunisie et l'Allemagne, une délégation d'investisseurs allemands a visité plusieurs sites stratégiques à Sousse. La visite a inclus des rencontres avec les autorités locales, des visites d'institutions éducatives et des échanges sur les opportunités de partenariat.",
    date: "2024-01-24",
    location: "Gouvernorat de Sousse, UTICA Akouda, Technopôle",
    category: ["partenariat", "investissement", "coopération"],
    tags: ["Allemagne", "investisseurs", "partenariat", "Sousse", "développement"],
    images: [
      "v1786966062/Foto_Mohamed_Ben_Said.jpg",
      "v1786966065/Foto_Ghzala_Boussadia.png",
    ],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=GRvNyHI7JA8",
        title: "Visite de nos partenaires allemands à Bled El Arbi",
      },
      {
        url: "https://www.youtube.com/watch?v=63HrOo_M91I",
        title: "Visite à l'UTICA Akouda",
      },
      {
        url: "https://www.youtube.com/watch?v=_MgIOa7iMEY",
        title: "Visite au Gouvernorat de Sousse",
      },
    ],
    pressLinks: [
      {
        title: "Une coopération renforcée entre la Tunisie et l'Allemagne",
        url: "https://example.com/presse/visite-partenaires",
        source: "Watania TV",
        date: "2024-01-25",
      },
    ],
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/avstunisia/events/3" },
      { platform: "facebook", url: "https://facebook.com/avstunisia/events/3" },
    ],
    featured: false,
    status: "completed",
  },
  {
    id: "4",
    title: "Journée Portes Ouvertes à la FSEG Sousse",
    description: "Une journée de découverte des opportunités d'études et de carrière en Allemagne pour les étudiants de la Faculté des Sciences Économiques et de Gestion.",
    longDescription: "En partenariat avec la FSEG Sousse, l'IFT Global et Tunisair, cette journée portes ouvertes a permis aux étudiants de découvrir les opportunités de formation, de stage et d'emploi en Allemagne. Des ateliers, des conférences et des séances d'information ont été organisés.",
    date: "2023-11-15",
    location: "FSEG Sousse",
    category: ["éducation", "orientation", "carrière"],
    tags: ["étudiants", "Allemagne", "carrière", "formation", "FSEG"],
    images: [
      "v1786966061/Foto_Ikbal_Lamine.jpg",
    ],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=WBQAJvXTK-k",
        title: "Journée Portes Ouvertes FSEG",
      },
    ],
    pressLinks: [
      {
        title: "Les étudiants tunisiens séduits par l'Allemagne",
        url: "https://example.com/presse/fseg-portes-ouvertes",
        source: "Radio Monastir",
        date: "2023-11-16",
      },
    ],
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/avstunisia/events/4" },
      { platform: "instagram", url: "https://instagram.com/avstunisia/events/4" },
    ],
    featured: false,
    status: "completed",
  },
  {
  id: "7",
  title: "Festival Sidi Said Boumendil - Hergla 2026",
  description: "Une soirée exceptionnelle au Festival Sidi Said Boumendil avec des spectacles de stars du cartoon, des concerts et des animations pour toute la famille.",
  longDescription: `Le Festival Sidi Said Boumendil a offert une soirée inoubliable avec le spectacle des stars du cartoon et Ammo Souheil, qui a enchanté petits et grands.

Le festival a également présenté un grand spectacle "El Zarda" avec l'artiste Abdelkrim El Basti, la musique de Khaled El Senoussi, la mise en scène de Monir El Mkhinini, le chant du célèbre artiste Nabil El Karsi, l'artiste de la Hadhra Fathi El Wergui, la talentueuse chanteuse Leila Achraf, la merveilleuse artiste de Melalia Jamila Hakki, l'artiste raffiné Lotfi Dahmani, et le pionnier de l'art zinghi Hamadi Tarhouni. Le tout s'est déroulé le jeudi 27 août 2026. Rendez-vous pour une soirée exceptionnelle, Insha'Allah.

Dans une atmosphère remplie de joie, de rires et de beaux souvenirs, les enfants et les familles ont vécu une soirée magnifique au rythme de la gaieté et du plaisir avec les stars du cartoon et Ammo Souheil, un spectacle qui a su allier le plaisir des petits et la nostalgie des grands vers les plus beaux souvenirs de la génération dorée. 🌟🎶👨‍👩‍👧‍👦

🎁 Et grâce au partenariat avec AVS, la joie fut encore plus grande !
La directrice d'AVS, Mme Iqbal Lamine, a organisé un concours spécial à l'issue du spectacle pour faire plaisir à nos petits enfants, dans une ambiance d'enthousiasme et de suspense, avec de nombreux cadeaux et prix pour les gagnants. 🥳🎁✨

📍 Théâtre en plein air - Hergla

Et les surprises ne sont pas finies ! 🤩
🎊 Les concours et les cadeaux continueront lors des prochaines soirées, alors restez à l'affût pour encore plus de divertissement, de suspense et de beaux moments ! 💫

Merci à tous ceux qui ont partagé avec nous cette magnifique ambiance… Et le meilleur reste à venir, Insha'Allah ! ❤️

#مهرجان_سيدي_سعيد_بومنديل #هرقلة #AVS #عمو_سهيل #نجوم_الكرتون #فرحة_الأطفال #مسابقات #هدايا #صيف_2026`,
  date: "2026-08-27",
  location: "Théâtre en plein air, Hergla",
  category: ["festival", "culturel", "divertissement", "enfants"],
  tags: [
    "Festival Sidi Said Boumendil",
    "Hergla",
    "AVS",
    "Ammo Souheil",
    "Stars du cartoon",
    "Joie des enfants",
    "Concours",
    "Cadeaux",
    "Été 2026"
  ],
  images: generateFestivalImages(),
  videos: [
    {
      url: "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/61579109124677/videos/1918645859353495&show_text=0",
      title: "🎬 Festival Sidi Said Boumendil - Vidéo 1",
    },
    {
      url: "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/61579109124677/videos/2123262741596314&show_text=0",
      title: "🎬 Festival Sidi Said Boumendil - Vidéo 2",
    },
    {
      url: "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reel/3355558211313203&show_text=0",
      title: "🎬 Festival Sidi Said Boumendil - Reel",
    }
  ],
  socialLinks: [
    { platform: "facebook", url: "https://www.facebook.com/AVSforma", label: "📘 Facebook" },
    { platform: "instagram", url: "https://www.instagram.com/herglaformaavs/", label: "📷 Instagram" },
    { platform: "youtube", url: "https://www.youtube.com/@AVSTunisia", label: "▶️ YouTube" },
  ],
  featured: false,
  status: "completed",
}
];

// Video Embed Component - Responsive for all video types
function VideoEmbed({ video }: { video: { url: string; title: string; isFacebookReel?: boolean } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Get the appropriate embed URL based on video type
  const getEmbedUrl = (url: string) => {
    // YouTube
    if (url.includes('youtube.com/watch') || url.includes('youtu.be')) {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=0&rel=0`;
      }
    }
    // Facebook Reel
    if (url.includes('facebook.com/reel')) {
      const match = url.match(/reel\/(\d+)/);
      if (match) {
        return `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reel/${match[1]}&show_text=0`;
      }
    }
    // Facebook plugin URL (already processed)
    if (url.includes('facebook.com/plugins/video.php')) {
      return url;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(video.url);

  return (
    <div className="w-full">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
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
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-secondary hover:underline"
              >
                Voir sur {video.isFacebookReel ? 'Facebook' : 'YouTube'}
              </a>
            </div>
          </div>
        ) : (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full rounded-xl"
            style={{ border: 'none' }}
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title={video.title}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        )}
      </div>
      <div className="mt-1.5">
        <p className="text-xs text-on-surface-variant truncate">{video.title}</p>
      </div>
    </div>
  );
}

// Image Carousel Component with Auto-Slide
function ImageCarousel({ images, eventTitle, videos }: { images: string[]; eventTitle: string; videos?: Event['videos'] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);
  const imagesPerPage = 3;
  const totalPages = Math.ceil(images.length / imagesPerPage);
  
  // Get current page images
  const getCurrentImages = () => {
    const start = currentPage * imagesPerPage;
    const end = Math.min(start + imagesPerPage, images.length);
    return images.slice(start, end);
  };

  const currentImages = getCurrentImages();

  const goToPage = (page: number) => {
    if (page === currentPage || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentPage(page);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1);
    } else {
      goToPage(0); // Loop back to first page
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!isPaused && totalPages > 1) {
      autoSlideInterval.current = setInterval(() => {
        nextPage();
      }, 5000);
    }

    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
    };
  }, [currentPage, isPaused, totalPages]);

  // Pause auto-slide on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Check if there's a Facebook Reel video
  const facebookReel = videos?.find(v => v.isFacebookReel);

  return (
    <div 
      className="bg-surface-container-low p-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Grid with Transition */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {currentImages.map((image, idx) => {
          const globalIndex = currentPage * imagesPerPage + idx;
          return (
            <div 
              key={idx} 
              className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/20 transition-all duration-500 ${
                isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <img
                src={cloudinary(image)}
                alt={`${eventTitle} - Photo ${globalIndex + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e5e7eb'/%3E%3Ctext x='200' y='160' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='20'%3E📸%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                {globalIndex + 1} / {images.length}
              </div>
            </div>
          );
        })}
      </div>

      {/* Facebook Reel Video - Responsive */}
      {facebookReel && (
        <div className="mt-4 max-w-2xl mx-auto">
          <div className="rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/20 shadow-sm">
            <VideoEmbed video={facebookReel} />
          </div>
        </div>
      )}

      {/* Pagination Controls */}
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

      {/* Progress indicator with auto-slide indicator */}
      <div className="flex justify-center items-center gap-2 mt-3">
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === currentPage
                ? "w-6 bg-secondary"
                : "w-3 bg-outline-variant/30 hover:bg-outline-variant/50"
            }`}
          />
        ))}
        <span className="text-[10px] text-on-surface-variant/50 ml-2">
          {!isPaused && totalPages > 1 ? '▶ Auto' : '⏸'}
        </span>
      </div>
    </div>
  );
}

// Event Card Component - Accordion Style
function EventCard({ event, isFeatured = false }: { event: Event; isFeatured?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500";
      case "ongoing":
        return "bg-green-500";
      case "completed":
        return "bg-gray-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "upcoming":
        return "À venir";
      case "ongoing":
        return "En cours";
      case "completed":
        return "Terminé";
      default:
        return "";
    }
  };

  return (
    <div
      className={`w-full rounded-2xl border border-outline-variant/30 bg-surface-container-lowest overflow-hidden transition-all duration-300 ${
        isFeatured ? "ring-2 ring-secondary/30" : ""
      } ${isOpen ? "shadow-xl" : "shadow-sm hover:shadow-md"}`}
    >
      {/* Accordion Header - Always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 hover:bg-surface-container-low/50 transition-colors duration-200"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {/* Status Badge */}
              {event.status && (
                <span className={`px-2.5 py-0.5 ${getStatusColor(event.status)} text-white text-xs font-bold rounded-full shadow-sm`}>
                  {getStatusLabel(event.status)}
                </span>
              )}
              {/* Featured Badge */}
              {isFeatured && (
                <span className="px-2.5 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full shadow-sm flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  À la une
                </span>
              )}
              {/* Categories */}
              {event.category.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-0.5 bg-brand-ice/50 text-brand-imperial rounded-full text-xs font-medium capitalize"
                >
                  {cat}
                </span>
              ))}
              {event.category.length > 2 && (
                <span className="px-2 py-0.5 bg-surface-container-low text-on-surface-variant rounded-full text-xs">
                  +{event.category.length - 2}
                </span>
              )}
            </div>
            
            <h3 className="font-headline-md text-primary text-lg md:text-xl">
              {event.title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-on-surface-variant mt-1.5">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(event.date)}
              </span>
              {event.location && (
                <>
                  <span className="w-px h-4 bg-outline-variant/30" />
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </span>
                </>
              )}
            </div>
          </div>
          
          {/* Expand/Collapse Icon */}
          <div className="flex-shrink-0 self-center">
            <div className={`p-2 rounded-full bg-surface-container-low transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}>
              <svg className="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </button>

      {/* Accordion Content - Expanded */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-0 border-t border-outline-variant/20 space-y-4">
          {/* Short Description */}
          <p className="font-body-md text-on-surface-variant text-sm leading-relaxed mt-4">
            {event.description}
          </p>

          {/* Image Carousel */}
          <ImageCarousel images={event.images} eventTitle={event.title} videos={event.videos} />

          {/* Long Description */}
          {event.longDescription && (
            <div>
              <h4 className="font-label-md text-primary text-sm mb-2">Description détaillée</h4>
              <div className="font-body-md text-on-surface-variant text-sm leading-relaxed whitespace-pre-line">
                {event.longDescription}
              </div>
            </div>
          )}

          {/* Videos (YouTube) */}
          {event.videos && event.videos.filter(v => !v.isFacebookReel).length > 0 && (
            <div>
              <h4 className="font-label-md text-primary text-sm mb-2 flex items-center gap-2">
                <span className="text-red-500">▶</span> Vidéos YouTube
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.videos.filter(v => !v.isFacebookReel).map((video, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-outline-variant/20 bg-surface-container-low">
                    <VideoEmbed video={video} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Press Links */}
          {event.pressLinks && event.pressLinks.length > 0 && (
            <div>
              <h4 className="font-label-md text-primary text-sm mb-2 flex items-center gap-2">
                📰 Presse
              </h4>
              <div className="space-y-2">
                {event.pressLinks.map((press, idx) => (
                  <a
                    key={idx}
                    href={press.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-primary">{press.title}</p>
                      <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                        <span>{press.source}</span>
                        {press.date && (
                          <>
                            <span className="w-px h-3 bg-outline-variant/30" />
                            <span>{formatDate(press.date)}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-on-surface-variant shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {event.socialLinks && event.socialLinks.length > 0 && (
            <div>
              <h4 className="font-label-md text-primary text-sm mb-2 flex items-center gap-2">
                <span>🔗</span> Partager sur les réseaux sociaux
              </h4>
              <div className="flex flex-wrap gap-2">
                {event.socialLinks.map((social, idx) => {
                  const platformColors: Record<string, string> = {
                    facebook: "bg-[#1877F2] hover:bg-[#1877F2]/90",
                    instagram: "bg-[#E4405F] hover:bg-[#E4405F]/90",
                    youtube: "bg-[#FF0000] hover:bg-[#FF0000]/90",
                    linkedin: "bg-[#0A66C2] hover:bg-[#0A66C2]/90",
                    twitter: "bg-[#000000] hover:bg-[#000000]/90",
                    website: "bg-secondary hover:bg-secondary/90",
                  };
                  
                  const isVideo = social.isVideo || social.label?.includes("Vidéo") || social.label?.includes("Reel");
                  
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-3 py-1.5 ${platformColors[social.platform] || "bg-secondary"} text-white text-xs font-medium rounded-lg transition-all hover:scale-105 ${
                        isVideo ? "ring-2 ring-white/40 ring-offset-2 ring-offset-transparent" : ""
                      }`}
                    >
                      {social.label || social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                      {isVideo && (
                        <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                          <span>▶</span> Video
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-surface-container-low text-on-surface-variant/70 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Filter Bar Component
function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
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

// Stats Component
function EventStats({ events }: { events: Event[] }) {
  const totalEvents = events.length;
  const uniqueCategories = [...new Set(events.flatMap(e => e.category))];
  const totalVideos = events.reduce((acc, e) => acc + (e.videos?.length || 0), 0);
  const featuredEvents = events.filter(e => e.featured).length;

  const stats = [
    { value: totalEvents, label: "Événements", icon: "📅" },
    { value: uniqueCategories.length, label: "Catégories", icon: "🏷️" },
    { value: totalVideos, label: "Vidéos", icon: "🎬" },
    { value: featuredEvents, label: "À la une", icon: "⭐" },
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

// Main Page Component
export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(EVENTS);

  // Get unique categories
  const allCategories = [...new Set(EVENTS.flatMap(e => e.category))];

  // Filter events
  useEffect(() => {
    let filtered = EVENTS;

    if (selectedCategory) {
      filtered = filtered.filter(e => e.category.includes(selectedCategory));
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(term) ||
        e.description.toLowerCase().includes(term) ||
        e.tags.some(tag => tag.toLowerCase().includes(term)) ||
        e.category.some(cat => cat.toLowerCase().includes(term))
      );
    }

    setFilteredEvents(filtered);
  }, [selectedCategory, searchTerm]);

  // Sort events by date (newest first)
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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
                  {EVENTS.length} Événements
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
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='24' font-weight='bold'%3E🎉 Événements%3C/text%3E%3C/svg%3E";
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
        {/* Stats */}
        <div className="mb-10">
          <EventStats events={EVENTS} />
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
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="shrink-0">
            <FilterBar
              categories={allCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-on-surface-variant">
            {filteredEvents.length} événement{filteredEvents.length > 1 ? "s" : ""} trouvé{filteredEvents.length > 1 ? "s" : ""}
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

        {/* Events Grid - Accordion Style */}
        {sortedEvents.length > 0 ? (
          <div className="space-y-4">
            {sortedEvents.map((event) => (
              <EventCard key={event.id} event={event} isFeatured={event.featured} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-headline-md text-primary text-xl mb-2">Aucun événement trouvé</h3>
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

        {/* Call to Action */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-brand-imperial to-brand-imperial/90 p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="font-headline-md text-white text-2xl md:text-3xl mb-3">
              Vous aussi, participez à nos événements !
            </h2>
            <p className="font-body-md text-white/90 max-w-2xl mx-auto mb-6">
              Rejoignez-nous lors de nos prochains événements et faites partie
              de l'aventure AVS Tunisia Group.
            </p>
            <Link
              href="/candidat/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-imperial rounded-xl font-label-md hover:bg-white/90 transition-all duration-300 hover:scale-[1.05] shadow-lg"
            >
              Restez informé
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}