"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ============ TYPE DEFINITIONS ============
type PressItem = {
  id: string;
  title: string;
  date: string;
  image: string;
  link: string;
};

// ============ DATA ============
const PRESS_ITEMS: PressItem[] = [
  {
    id: "1",
    title: "Le Programme Volontaire de Retour des Réfugiés en Tunisie",
    date: "15 Mars 2025",
    image: "https://drive.google.com/thumbnail?id=1loj66BOZFG-Bd-nzANgVD99EESvhwl6P&sz=w1000",
    link: "https://drive.google.com/file/d/1loj66BOZFG-Bd-nzANgVD99EESvhwl6P/view?usp=sharing",
  },
  {
    id: "2",
    title: "L'Intégration des Réfugiés en Allemagne",
    date: "10 Mars 2025",
    image: "https://drive.google.com/thumbnail?id=1ahPE7o1V9-YD8ZmaUQ9g20OH3R45hDYi&sz=w1000",
    link: "https://drive.google.com/file/d/1ahPE7o1V9-YD8ZmaUQ9g20OH3R45hDYi/view?usp=sharing",
  },
  {
    id: "3",
    title: "La Coopération Tuniso-Allemande dans le Domaine de la Formation",
    date: "5 Mars 2025",
    image: "https://drive.google.com/thumbnail?id=12FbkVxlEaLk8mGZbe19m9CGDngt9p8NW&sz=w1000",
    link: "https://drive.google.com/file/d/12FbkVxlEaLk8mGZbe19m9CGDngt9p8NW/view?usp=sharing",
  },
  {
    id: "4",
    title: "Les Défis de l'Immigration en Méditerranée",
    date: "28 Février 2025",
    image: "https://drive.google.com/thumbnail?id=1TK78djelUEkH5Y7LQVxXe1PNXvwaFTBu&sz=w1000",
    link: "https://drive.google.com/file/d/1TK78djelUEkH5Y7LQVxXe1PNXvwaFTBu/view?usp=sharing",
  },
  {
    id: "5",
    title: "L'Impact des Programmes de Formation sur l'Emploi",
    date: "20 Février 2025",
    image: "https://drive.google.com/thumbnail?id=1ULlujaXV-il3AGZR9rj7yIl-Opk0xB_6&sz=w1000",
    link: "https://drive.google.com/file/d/1ULlujaXV-il3AGZR9rj7yIl-Opk0xB_6/view?usp=sharing",
  },
  {
    id: "6",
    title: "Interview Exclusive avec le Directeur du Programme",
    date: "15 Février 2025",
    image: "https://drive.google.com/thumbnail?id=1nW6-d6A-7rmfk_WQcisL2cvQI_aFx_kL&sz=w1000",
    link: "https://drive.google.com/file/d/1nW6-d6A-7rmfk_WQcisL2cvQI_aFx_kL/view?usp=sharing",
  },
  {
    id: "7",
    title: "Les Opportunités d'Intégration pour les Jeunes",
    date: "10 Février 2025",
    image: "https://drive.google.com/thumbnail?id=1kg3tW49Ahcf5WRL3FANibwrGg5DK2Wmz&sz=w1000",
    link: "https://drive.google.com/file/d/1kg3tW49Ahcf5WRL3FANibwrGg5DK2Wmz/view?usp=sharing",
  },
  {
    id: "8",
    title: "Le Rôle de la Société Civile dans l'Accueil des Réfugiés",
    date: "5 Février 2025",
    image: "https://drive.google.com/thumbnail?id=1Mw9B76xW7pjfkEHzYagkteY7LbdqM7Tf&sz=w1000",
    link: "https://drive.google.com/file/d/1Mw9B76xW7pjfkEHzYagkteY7LbdqM7Tf/view?usp=sharing",
  },
  {
    id: "9",
    title: "La Formation Professionnelle au Service de l'Intégration",
    date: "30 Janvier 2025",
    image: "https://drive.google.com/thumbnail?id=1D7aSY2HLDUHk0jBiHJCH9u6Hy27vYLq8&sz=w1000",
    link: "https://drive.google.com/file/d/1D7aSY2HLDUHk0jBiHJCH9u6Hy27vYLq8/view?usp=sharing",
  },
  {
    id: "10",
    title: "Documentaire sur le Parcours des Réfugiés",
    date: "25 Janvier 2025",
    image: "https://drive.google.com/thumbnail?id=1uH0RNYd9vh-ricWWF726RE3raocWGjE7&sz=w1000",
    link: "https://drive.google.com/file/d/1uH0RNYd9vh-ricWWF726RE3raocWGjE7/view?usp=sharing",
  },
  {
    id: "11",
    title: "Les Enjeux de la Coopération Internationale",
    date: "20 Janvier 2025",
    image: "https://drive.google.com/thumbnail?id=1KscSDHhusQbOPRZf68ia9pyNf3y0y7rw&sz=w1000",
    link: "https://drive.google.com/file/d/1KscSDHhusQbOPRZf68ia9pyNf3y0y7rw/view?usp=sharing",
  },
  {
    id: "12",
    title: "Témoignages de Réfugiés Intégrés",
    date: "15 Janvier 2025",
    image: "https://drive.google.com/thumbnail?id=14hbRBdcTQ2XBjHBnsuPrvYwNYgVEHYC1&sz=w1000",
    link: "https://drive.google.com/file/d/14hbRBdcTQ2XBjHBnsuPrvYwNYgVEHYC1/view?usp=sharing",
  },
  {
    id: "13",
    title: "Le Programme Volontaire : Bilan et Perspectives",
    date: "10 Janvier 2025",
    image: "https://drive.google.com/thumbnail?id=1xd3ClECsJ0uE0t9Bujri40AN6kYD2B-t&sz=w1000",
    link: "https://drive.google.com/file/d/1xd3ClECsJ0uE0t9Bujri40AN6kYD2B-t/view?usp=sharing",
  },
  {
    id: "14",
    title: "L'Accueil des Réfugiés en Tunisie",
    date: "5 Janvier 2025",
    image: "https://drive.google.com/thumbnail?id=1_vgdnfYXjanCnpVF7DOb2PKdMEsQ_utf&sz=w1000",
    link: "https://drive.google.com/file/d/1_vgdnfYXjanCnpVF7DOb2PKdMEsQ_utf/view?usp=sharing",
  },
  {
    id: "15",
    title: "Les Défis Psychosociaux des Réfugiés",
    date: "30 Décembre 2024",
    image: "https://drive.google.com/thumbnail?id=1po-gn9Qqe7IHkaf0l47gMejQGI0_0zss&sz=w1000",
    link: "https://drive.google.com/file/d/1po-gn9Qqe7IHkaf0l47gMejQGI0_0zss/view?usp=sharing",
  },
  {
    id: "16",
    title: "L'Intégration par le Sport",
    date: "25 Décembre 2024",
    image: "https://drive.google.com/thumbnail?id=19MEMVwmlOeHSqJq3Zr7nlC2WgiNoH1as&sz=w1000",
    link: "https://drive.google.com/file/d/19MEMVwmlOeHSqJq3Zr7nlC2WgiNoH1as/view?usp=sharing",
  },
  {
    id: "17",
    title: "Les Femmes Réfugiées et l'Autonomisation",
    date: "20 Décembre 2024",
    image: "https://drive.google.com/thumbnail?id=1h8agqTfYcjdEdMYGBOaTyMnQDMdeoNAp&sz=w1000",
    link: "https://drive.google.com/file/d/1h8agqTfYcjdEdMYGBOaTyMnQDMdeoNAp/view?usp=sharing",
  },
  {
    id: "18",
    title: "L'Éducation des Enfants Réfugiés",
    date: "15 Décembre 2024",
    image: "https://drive.google.com/thumbnail?id=1BnWxl_-my5v5ep4998fk86g_1z5_F63V&sz=w1000",
    link: "https://drive.google.com/file/d/1BnWxl_-my5v5ep4998fk86g_1z5_F63V/view?usp=sharing",
  },
  {
    id: "19",
    title: "Les Initiatives de Solidarité Internationale",
    date: "10 Décembre 2024",
    image: "https://drive.google.com/thumbnail?id=1STSqqV8isDU-99caX6YiiNnBkkX6cglG&sz=w1000",
    link: "https://drive.google.com/file/d/1STSqqV8isDU-99caX6YiiNnBkkX6cglG/view?usp=sharing",
  },
  {
    id: "20",
    title: "Le Retour Volontaire : Une Solution Durable",
    date: "5 Décembre 2024",
    image: "https://drive.google.com/thumbnail?id=1Eyd1eOCF7e2qcvbx3Tymkk3oIHPh4Ap4&sz=w1000",
    link: "https://drive.google.com/file/d/1Eyd1eOCF7e2qcvbx3Tymkk3oIHPh4Ap4/view?usp=sharing",
  },
  {
    id: "21",
    title: "La Formation Linguistique pour Réfugiés",
    date: "30 Novembre 2024",
    image: "https://drive.google.com/thumbnail?id=1wgeglk99xIXYpBJs-mbq4YNHnmIp1V9V&sz=w1000",
    link: "https://drive.google.com/file/d/1wgeglk99xIXYpBJs-mbq4YNHnmIp1V9V/view?usp=sharing",
  },
  {
    id: "22",
    title: "Les Réfugiés Sahariens en Tunisie",
    date: "25 Novembre 2024",
    image: "https://drive.google.com/thumbnail?id=1_yTUVD4E6SGj_g7hl6RprzJcd5TJYRsh&sz=w1000",
    link: "https://drive.google.com/file/d/1_yTUVD4E6SGj_g7hl6RprzJcd5TJYRsh/view?usp=sharing",
  },
  {
    id: "23",
    title: "L'Impact des Programmes d'Insertion Professionnelle",
    date: "20 Novembre 2024",
    image: "https://drive.google.com/thumbnail?id=1fOsMEf_auTNttHFN2FcbvcugISAcPE5e&sz=w1000",
    link: "https://drive.google.com/file/d/1fOsMEf_auTNttHFN2FcbvcugISAcPE5e/view?usp=sharing",
  },
  {
    id: "24",
    title: "Les Défis Juridiques des Réfugiés",
    date: "15 Novembre 2024",
    image: "https://drive.google.com/thumbnail?id=1QD6jSMnZ8pj8MA7L_7HSygHnbT3zswDn&sz=w1000",
    link: "https://drive.google.com/file/d/1QD6jSMnZ8pj8MA7L_7HSygHnbT3zswDn/view?usp=sharing",
  },
  {
    id: "25",
    title: "L'Accès aux Soins pour les Réfugiés",
    date: "10 Novembre 2024",
    image: "https://drive.google.com/thumbnail?id=1JW5-KlJNdgsfn7SvvBCJrLzP2uRq4T3G&sz=w1000",
    link: "https://drive.google.com/file/d/1JW5-KlJNdgsfn7SvvBCJrLzP2uRq4T3G/view?usp=sharing",
  },
  {
    id: "26",
    title: "Les Programmes de Bourses pour Réfugiés",
    date: "5 Novembre 2024",
    image: "https://drive.google.com/thumbnail?id=1iT9ieyEcXzmQiPjMldrq7-9uesTa_aIA&sz=w1000",
    link: "https://drive.google.com/file/d/1iT9ieyEcXzmQiPjMldrq7-9uesTa_aIA/view?usp=sharing",
  },
  {
    id: "27",
    title: "Le Réseau Associatif pour les Réfugiés",
    date: "30 Octobre 2024",
    image: "https://drive.google.com/thumbnail?id=1a2PlcLNP5iQTJqdZ6W5P1cc02ypcsz3J&sz=w1000",
    link: "https://drive.google.com/file/d/1a2PlcLNP5iQTJqdZ6W5P1cc02ypcsz3J/view?usp=sharing",
  },
  {
    id: "28",
    title: "Les Projets d'Insertion Professionnelle",
    date: "25 Octobre 2024",
    image: "https://drive.google.com/thumbnail?id=1UfEz9LrcoNfN-2AEA3PcuRYYS_QHq3ob&sz=w1000",
    link: "https://drive.google.com/file/d/1UfEz9LrcoNfN-2AEA3PcuRYYS_QHq3ob/view?usp=sharing",
  },
  {
    id: "29",
    title: "Les Témoignages de Réussite",
    date: "20 Octobre 2024",
    image: "https://drive.google.com/thumbnail?id=1anx-8v4tlp7XBAcfaBVdpNCw4zOr_NeO&sz=w1000",
    link: "https://drive.google.com/file/d/1anx-8v4tlp7XBAcfaBVdpNCw4zOr_NeO/view?usp=sharing",
  },
  {
    id: "30",
    title: "La Situation des Réfugiés en Afrique du Nord",
    date: "15 Octobre 2024",
    image: "https://drive.google.com/thumbnail?id=14qE4rfZSOSzOWEXDzAvPSiCr1XHlDloT&sz=w1000",
    link: "https://drive.google.com/file/d/14qE4rfZSOSzOWEXDzAvPSiCr1XHlDloT/view?usp=sharing",
  },
  {
    id: "31",
    title: "Les Réfugiés et le Marché du Travail",
    date: "10 Octobre 2024",
    image: "https://drive.google.com/thumbnail?id=1ONDc_8Z0IIsyzDJnKFpKcdERZv4gRkGi&sz=w1000",
    link: "https://drive.google.com/file/d/1ONDc_8Z0IIsyzDJnKFpKcdERZv4gRkGi/view?usp=sharing",
  },
  {
    id: "32",
    title: "L'Intégration Culturelle des Réfugiés",
    date: "5 Octobre 2024",
    image: "https://drive.google.com/thumbnail?id=1Y_Be3kItsg_rIsUEHbsFNAu-_5s74vSJ&sz=w1000",
    link: "https://drive.google.com/file/d/1Y_Be3kItsg_rIsUEHbsFNAu-_5s74vSJ/view?usp=sharing",
  },
  {
    id: "33",
    title: "Les Programmes de Formation Continue",
    date: "30 Septembre 2024",
    image: "https://drive.google.com/thumbnail?id=1Y6A-qMNuGbet_q3UbbuhU6mnpEvPzG5p&sz=w1000",
    link: "https://drive.google.com/file/d/1Y6A-qMNuGbet_q3UbbuhU6mnpEvPzG5p/view?usp=sharing",
  },
  {
    id: "34",
    title: "Bilan du Programme Volontaire de Retour",
    date: "25 Septembre 2024",
    image: "https://drive.google.com/thumbnail?id=1czAazsqrJ6lAXNpo9b6Fu4m2Qi24PoiV&sz=w1000",
    link: "https://drive.google.com/file/d/1czAazsqrJ6lAXNpo9b6Fu4m2Qi24PoiV/view?usp=sharing",
  },
];

// ============ GROUP ITEMS INTO SLIDES OF 5 ============
// ✅ FIXED: Added explicit type definition
const SLIDES: PressItem[][] = [];
for (let i = 0; i < PRESS_ITEMS.length; i += 5) {
  SLIDES.push(PRESS_ITEMS.slice(i, i + 5));
}

// ============ COMPONENT ============
export default function PressePage() {
  const [selectedItem, setSelectedItem] = useState<PressItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFullscreen) {
        setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isFullscreen]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const openViewer = (item: PressItem) => {
    const index = PRESS_ITEMS.findIndex((p) => p.id === item.id);
    setViewerIndex(index);
    setSelectedItem(item);
    setIsFullscreen(true);
  };

  const nextImage = () => {
    setViewerIndex((prev) => (prev + 1) % PRESS_ITEMS.length);
    setSelectedItem(PRESS_ITEMS[(viewerIndex + 1) % PRESS_ITEMS.length]);
  };

  const prevImage = () => {
    setViewerIndex((prev) => (prev - 1 + PRESS_ITEMS.length) % PRESS_ITEMS.length);
    setSelectedItem(PRESS_ITEMS[(viewerIndex - 1 + PRESS_ITEMS.length) % PRESS_ITEMS.length]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, viewerIndex]);

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
                  {SLIDES.map((_, index) => (
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
                {SLIDES.map((slide, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="min-w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6"
                  >
                    {slide.map((item: PressItem) => (
                      <div
                        key={item.id}
                        className="relative group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        onClick={() => openViewer(item)}
                      >
                        <div className="relative h-56 md:h-64 lg:h-72 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full">
                              <ZoomIn className="w-6 h-6 text-brand-imperial" />
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
                            <Calendar className="w-3 h-3" />
                            <span>{item.date}</span>
                          </div>
                          <h3 className="font-label-md text-brand-imperial line-clamp-2 text-sm">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-300 z-10 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-brand-imperial" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-300 z-10 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-brand-imperial" />
              </button>
            </div>
          </div>

          {/* Image Viewer Modal - Fullscreen with Navigation */}
          {selectedItem && isFullscreen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-xl p-4 animate-in fade-in duration-300"
              onClick={() => setIsFullscreen(false)}
            >
              <div
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="absolute top-6 right-6 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 z-20 text-white hover:scale-110"
                >
                  <X className="w-8 h-8" />
                </button>

                {/* Image Counter */}
                <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {viewerIndex + 1} / {PRESS_ITEMS.length}
                </div>

                {/* Main Image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full max-h-[90vh] max-w-[90vw] object-contain animate-in zoom-in-95 duration-300"
                  />
                </div>

                {/* Navigation Arrows - Left */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 z-20 text-white hover:scale-110 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                {/* Navigation Arrows - Right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 z-20 text-white hover:scale-110 backdrop-blur-sm"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 text-white/80 text-sm mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedItem.date}</span>
                    </div>
                    <h3 className="text-white text-2xl md:text-3xl font-bold">
                      {selectedItem.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-imperial/20 to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-imperial/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-ice/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}