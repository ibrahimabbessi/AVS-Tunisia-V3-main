"use client";

import { useEffect, useState } from "react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Cloudinary helper - Direct URLs                                    */
/*  All images are now served from Cloudinary CDN for better          */
/*  performance, reliability, and optimization.                       */
/* ------------------------------------------------------------------ */

// Cloudinary base URL
const CLOUDINARY_BASE = "https://res.cloudinary.com/girgi5fd/image/upload/";

// Helper function to get Cloudinary URL
const cloudinary = (path: string) => {
  return `${CLOUDINARY_BASE}${path}`;
};

/* ------------------------------------------------------------------ */
/*  Hero Section - Cloudinary Images                                   */
/* ------------------------------------------------------------------ */

const HERO_SLIDES = [
  { src: "v1786964943/hero1.jpg", alt: "AVS Tunisia Group — image d'accueil 1" },
  { src: "v1786964946/hero6.jpg", alt: "AVS Tunisia Group — image d'accueil 2" },
  { src: "v1786964946/hero2.jpg", alt: "AVS Tunisia Group — image d'accueil 3" },
  { src: "v1786964947/hero4.jpg", alt: "AVS Tunisia Group — image d'accueil 4" },
  { src: "v1786964953/hero3.jpg", alt: "AVS Tunisia Group — image d'accueil 5" },
  { src: "v1786964954/hero5.jpg", alt: "AVS Tunisia Group — image d'accueil 6" },
];

const HERO_STATS = [
  { value: "7+", label: "Années d'expérience" },
  { value: "170+", label: "Candidats accompagnés" },
  { value: "12+", label: "Domaines de formation" },
];

/* ------------------------------------------------------------------ */
/*  Services Section                                                   */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    icon: "translate",
    title: "Formation",
    description:
      "Des cursus de langue allemande intensifs, calibrés sur les référentiels du marché du travail allemand, du niveau A1 au B2 professionnel.",
  },
  {
    icon: "diversity_3",
    title: "Conseil",
    description:
      "Un accompagnement individuel sur le choix de filière, la constitution du dossier et la préparation aux démarches administratives.",
  },
  {
    icon: "work",
    title: "Recrutement",
    description:
      "Une mise en relation directe avec des employeurs allemands partenaires, du premier entretien jusqu'à la signature du contrat.",
  },
];

// Cloudinary URLs for logos
const AVS_GROUP_LOGO = "v1786965482/avs-group-logo.png";
const AVS_HERGLA_FORMA_LOGO = "v1786965483/avs-hergla-forma-logo.png";
const IFT_GLOBAL_LOGO = "v1786965485/ift-global-logo.png";
const AVS_CARE_FORMA_LOGO = "v1786965487/avs-care-form-logo.png";

/* ------------------------------------------------------------------ */
/*  About Section - Cloudinary Images                                  */
/* ------------------------------------------------------------------ */

const ABOUT_IMAGES = [
  { src: "v1786965592/img1.jpg", alt: "AVS Tunisia Group — à propos 1" },
  { src: "v1786965592/img2.jpg", alt: "AVS Tunisia Group — à propos 2" },
  { src: "v1786965589/img3.jpg", alt: "AVS Tunisia Group — à propos 3" },
  { src: "v1786965605/img4.jpg", alt: "AVS Tunisia Group — à propos 4" },
  { src: "v1786965597/img5.jpg", alt: "AVS Tunisia Group — à propos 5" },
];

/* ------------------------------------------------------------------ */
/*  Team Section - Cloudinary Images                                  */
/* ------------------------------------------------------------------ */

const TEAM = [
  {
    name: "Ikbal Lamine",
    image: "v1786966061/Foto_Ikbal_Lamine.jpg",
    primaryRole: "Fondatrice & PDG",
    secondaryRoles: [
      "Fondatrice & Gérante AVS",
      "Coach International",
      "Consultante en Formation en Allemagne",
      "Experte en Médiation",
    ],
  },
  {
    name: "Ghazala Boussidia",
    image: "v1786966065/Foto_Ghzala_Boussadia.png",
    primaryRole: "Team Leader & Chef de Projet",
    secondaryRoles: [
      "Team Leader",
      "Chef de Projet",
      "Directrice Coordinatrice du Groupe",
    ],
  },
  {
    name: "Mohamed Ben Said",
    image: "v1786966062/Foto_Mohamed_Ben_Said.jpg",
    primaryRole: "Directeur Administratif & Financier",
    secondaryRoles: [
      "Directeur Administratif",
      "Manager Financier",
      "Formateur IT",
    ],
  },
  {
    name: "Zaineb Ben Rajeb",
    image: "v1788167919/Zaineb_Ben_Rajeb_2.jpg",
    primaryRole: "Responsable Administrative",
    secondaryRoles: [
      "Gestion administrative",
      "Coordination des dossiers",
      "Suivi des candidatures",
    ],
    languages: ["Français", "Arabe", "Anglais"],
  },
];

/* ------------------------------------------------------------------ */
/*  Testimonials Section - Cloudinary Images                          */
/* ------------------------------------------------------------------ */

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  image?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Adem",
    role: "Responsable de la planification qualité (Mécanique)",
    image: "v1786966137/Adem.jpg",
    quote:
      "Je tiens à exprimer ma profonde gratitude envers AVS Forma pour l'excellente expérience vécue avec eux. Leur professionnalisme, leur respect et leur sérieux tout au long du processus témoignent de la confiance que l'on peut leur accorder. Grâce à leur accompagnement rigoureux et à leur soutien constant, j'ai pu décrocher avec succès un poste qualifié dans le domaine de l'ingénierie de la qualité industrielle. Leur expertise et leur engagement m'ont permis d'atteindre ce résultat pleinement satisfaisant et je tiens également à remercier particulièrement Mlle Ghzala pour son professionnalisme, son sérieux et sa transparence, qui ont grandement contribué à la réussite de cette expérience.",
  },
  {
    name: "Ala",
    role: "Logistique",
    image: "v1786966138/Ala.jpg",
    quote:
      "Je suis très reconnaissant(e) envers AVS Forma pour l'accompagnement exceptionnel tout au long de mon parcours. Grâce à leurs cours de langue et à leur soutien personnalisé, j'ai pu atteindre le niveau nécessaire pour poursuivre ma carrière en Allemagne et réaliser mon rêve professionnel. L'équipe est toujours à l'écoute et prête à aider, ce qui m'a donné confiance et motivation à chaque étape. Aujourd'hui, je suis fier(e) de pouvoir dire que je travaille dans mon domaine de prédilection, et tout cela n'aurait pas été possible sans AVS Forma.",
  },
  {
    name: "Amel",
    role: "Contrôle qualité (Mécanique)",
    image: "v1786966140/Amel.jpg",
    quote:
      "Venir en Allemagne était un défi, mais aussi une formidable opportunité. Avec l'aide de AVS Forma, j'ai franchi cette étape et intégré une entreprise allemande en tant qu'ingénieure électromécanique. Aujourd'hui, je travaille dans le domaine de l'assurance qualité, une expérience qui me permet de progresser autant sur le plan professionnel que personnel. Je recommande vivement cette aventure à tous ceux qui rêvent d'élargir leurs horizons.",
  },
  {
    name: "Islem",
    role: "Contrôle qualité (Mécanique)",
    image: "v1786966141/Islem.jpg",
    quote:
      "Je tiens à exprimer toute ma satisfaction concernant AVS. Dès le premier contact, j'ai été agréablement surpris par leur sérieux, leur professionnalisme et la clarté de leurs explications. L'équipe a toujours été disponible pour répondre à mes questions et m'accompagner dans chaque étape. Grâce à leur soutien, j'ai pu obtenir une opportunité d'emploi en Allemagne dans de très bonnes conditions. Je recommande vivement leurs services à toute personne qui cherche une agence fiable et compétente.",
  },
  {
    name: "Karim",
    role: "Infirmier",
    image: "v1786966142/Karim.jpg",
    quote:
      "Je tiens à exprimer ma profonde gratitude envers la société AVS Forma pour le traitement professionnel et bien organisé de mes documents. Grâce à votre accompagnement et à votre soutien, je peux désormais concrétiser mon projet d'apprendre l'allemand en Allemagne et avancer sereinement dans mon parcours d'études.",
  },
  {
    name: "Khawla",
    role: "Infirmière",
    image: "v1786966143/Khawla.jpg",
    quote:
      "J'ai eu une excellente expérience avec AVS qui m'a accompagnée dans toutes les démarches pour travailler en Allemagne. Leur professionnalisme et leur soutien m'ont beaucoup aidée à réussir mon intégration.",
  },
  {
    name: "Khouloud",
    role: "Infirmière",
    image: "v1786966130/Khouloud.jpg",
    quote:
      "Je tiens à remercier chaleureusement toute l'équipe de AVS pour leur accompagnement exceptionnel tout au long de mon parcours. Grâce à leur professionnalisme et à la qualité de leur enseignement, j'ai pu suivre une formation en langue allemande parfaitement adaptée à mes besoins. Ce que j'ai particulièrement apprécié, c'est leur sérieux et leur engagement à chaque étape. AVS ne s'est pas contentée de m'enseigner la langue, elle m'a également aidé à trouver une formation professionnelle en Allemagne, ce qui représente une opportunité précieuse pour mon avenir. Merci encore à toute l'équipe AVS pour votre travail remarquable, votre disponibilité et votre soutien constant. Je recommande cette agence à toute personne souhaitant apprendre l'allemand et poursuivre un projet professionnel en Allemagne.",
  },
  {
    name: "Mahmoud",
    role: "Infirmier",
    quote:
      "Je tiens à remercier chaleureusement AVS Forma pour leur précieux accompagnement et soutien tout au long de mon parcours. Grâce à leur expertise et dévouement, j'ai pu réaliser mon projet d'Ausbildung en Allemagne avec confiance et sérénité. Merci pour votre professionnalisme et votre engagement à rendre chaque étape possible.",
  },
  {
    name: "Mehdi",
    role: "Contrôle qualité (Mécanique)",
    image: "v1786966133/Mehdi.jpg",
    quote:
      "Je suis très satisfait de mon expérience avec AVS Forma. Le personnel est accueillant, compétent et toujours prêt à répondre à mes questions. J'ai apprécié leur sérieux, leur suivi personnalisé et la qualité de leurs conseils. C'est un partenaire de confiance pour toute personne qui souhaite étudier ou travailler à l'étranger.",
  },
  {
    name: "Mohamed B.",
    role: "Infirmier",
    image: "v1786966131/Mohamed.jpg",
    quote:
      "Je suis très satisfait du service et du soutien offerts par AVS à toutes les étapes que j'ai franchies avec eux, depuis les cours d'allemand que j'ai suivis à l'école de langues AVS jusqu'au service et à l'accueil que j'ai reçus en Allemagne, en passant par l'équipe sympathique. Je suis très satisfait de leur professionnalisme et de leur soutien. Bravo !",
  },
  {
    name: "Rihem",
    role: "Infirmière",
    quote:
      "Je tiens à exprimer ma profonde gratitude à l'agence AVS pour leur précieuse assistance qui m'a permis de poursuivre ma formation en Allemagne.",
  },
  {
    name: "Sarra",
    role: "Infirmière",
    image: "v1786966134/Sarra.jpg",
    quote:
      "Grâce à l'agence AVS Forma, j'ai pu réaliser mon rêve de venir en Allemagne pour commencer ma formation professionnelle en tant qu'infirmière. Tout s'est passé de manière organisée et conforme au plan. Leur accompagnement, leur disponibilité et leur professionnalisme m'ont énormément aidée dans chaque étape. Je suis très reconnaissante envers AVS Forma pour cette belle opportunité qui marque un nouveau départ dans ma vie. Merci beaucoup !",
  },
  {
    name: "Zied",
    role: "Hauswirtschafter",
    image: "v1786966135/Zied.jpg",
    quote:
      "Je tiens à exprimer ma profonde gratitude envers l'équipe d'AVS Forma pour son professionnalisme et son accompagnement de grande qualité. Mon expérience avec eux a été très enrichissante, grâce à leur organisation, leur suivi constant et leur disponibilité. Cette collaboration m'a permis de développer mes compétences et de progresser vers l'atteinte de mon objectif. Je tiens à remercier chaleureusement toute l'équipe, et plus particulièrement Mlle Ghzala, pour son aide précieuse et son expertise.",
  },
];

/* ------------------------------------------------------------------ */
/*  Hero Section Component                                             */
/* ------------------------------------------------------------------ */

function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-gutter py-section-gap-md bg-surface-container-low">
      <div className="absolute inset-0 w-full h-full z-0 opacity-20">
        <div
          className="bg-cover bg-center w-full h-full"
          data-alt="Formes géométriques abstraites lumineuses suspendues dans un espace minimaliste, palette de noirs profonds, blancs immaculés et accents de bleu intense"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1600&auto=format&fit=crop')",
          }}
        />
      </div>

      <div className="max-w-container-max mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start space-y-6">
          <span className="px-3 py-1 bg-brand-ice text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/10">
            Leader dans la formation et l&apos;employabilité
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-primary text-balance">
            Votre Pont vers une <span className="text-gradient">Carrière d&apos;Excellence</span> en Allemagne
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-xl text-balance">
            Propulsez votre avenir professionnel. AVS Tunisia Group vous
            accompagne de la formation linguistique à l&apos;intégration
            réussie au sein des meilleures entreprises allemandes.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button  className="px-6 py-3 bg-brand-imperial text-white rounded-lg font-label-md hover:scale-105 transition-transform duration-200 ambient-shadow border-t border-white/40 flex items-center gap-2">
              <Link href="/candidat/ift-global/notre-demarche">Explorer les Opportunités</Link>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button className="px-6 py-3 border-2 border-brand-sapphire text-brand-sapphire rounded-lg font-label-md hover:bg-brand-sapphire/5 transition-colors">
              <Link href="/candidat/candidature">Candidature</Link>
            </button>
          </div>
        </div>

        <div
          className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden glass-panel ambient-shadow border-t border-white/60 p-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            {HERO_SLIDES.map((slide, i) => (
              <img
                key={slide.src}
                src={cloudinary(slide.src)}
                alt={slide.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            <div className="absolute top-4 right-4 z-10 flex gap-1.5">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Aller à la diapositive ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 left-8 right-8 glass-panel rounded-xl p-4 flex justify-around items-center divide-x divide-outline-variant/30">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="text-center px-4">
                <div className="font-headline-md text-brand-imperial font-bold">
                  {stat.value}
                </div>
                <div className="font-caption text-on-surface-variant">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Services Section                                                   */
/* ------------------------------------------------------------------ */

function ServicesSection() {
  const [flippedLogo, setFlippedLogo] = useState<number | null>(null);

  // Logo data with flip content - using Cloudinary URLs
  const LOGOS_WITH_FLIP = [
    {
      id: 0,
      name: "AVS Hergla Forma",
      logoId: AVS_HERGLA_FORMA_LOGO,
      flipImage: "https://www.studying-in-germany.org/wp-content/uploads/2013/01/learn-german-language.jpg",
      flipText: "Apprendre Allemagne"
    },
    {
      id: 1,
      name: "IFT Global",
      logoId: IFT_GLOBAL_LOGO,
      flipImage: "https://static.wixstatic.com/media/193d2c_a22dc120727042a3944e798147893d79~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_90/visa-germany-d-visa.jpg",
      flipText: "Obtenir Visa"
    },
    {
      id: 2,
      name: "AVS Care Forma",
      logoId: AVS_CARE_FORMA_LOGO,
      flipImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD6mYkLfBw-8VlCYqvF2j8q0gX57z7WT5rlDObUS_7BLa0z-XtVZnVyMs&s=10",
      flipText: "Assistant De Vie"
    }
  ];

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-md">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-start">
        <div className="lg:col-span-2">
          <span className="px-3 py-1 bg-brand-ice text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/10">
            Nos services
          </span>
          <h2 className="font-headline-lg text-brand-imperial max-w-xl text-balance mt-4">
            Trois piliers, une seule ambition&nbsp;: votre réussite en Allemagne.
          </h2>
        </div>
        <div className="glass-panel ambient-shadow rounded-2xl p-6 flex gap-4 items-start">
          <span className="material-symbols-outlined text-brand-sapphire shrink-0">
            format_quote
          </span>
          <p className="font-body-md text-on-surface-variant italic">
            Nous ne formons pas des candidats, nous construisons des carrières durables.
          </p>
        </div>
      </div>
 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SERVICES.map((service, index) => {
          // Assign links based on service title
          let linkHref = "#";
          if (service.title === "Formation") {
            linkHref = "/candidat/ift-global/formations-professionnelles";
          } else if (service.title === "Conseil") {
            linkHref = "/candidat/contact";
          } else if (service.title === "Recrutement") {
            linkHref = "/candidat/ift-global/offre-emploi";
          }

          return (
            <div
              key={service.title}
              className="card-hover group border border-outline-variant rounded-2xl p-8 bg-surface-container-lowest"
            >
              <div className="h-14 w-14 rounded-xl bg-brand-imperial flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-white">
                  {service.icon}
                </span>
              </div>
              <h3 className="font-headline-md text-primary mb-3">{service.title}</h3>
              <p className="font-body-md text-on-surface-variant mb-6">
                {service.description}
              </p>
              <Link
                href={linkHref}
                className="font-label-md text-secondary inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                En savoir plus
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          );
        })}
      </div>
 
      {/* Group hierarchy: AVS Group as parent with logos */}
      <div className="mt-16 pt-10 border-t border-outline-variant">
        <p className="font-caption text-on-surface-variant uppercase tracking-wider text-center mb-8">
          Notre groupe
        </p>
        <div className="glass-panel ambient-shadow rounded-2xl p-8 md:p-12 max-w-4xl mx-auto flex flex-col items-center">
          {/* AVS Group Logo */}
          <img
            src={cloudinary(AVS_GROUP_LOGO)}
            alt="AVS Group"
            className="h-48 md:h-64 object-contain mb-10 transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%2303045e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24' font-weight='bold'%3EAVS Group%3C/text%3E%3C/svg%3E";
            }}
          />
          <div className="w-full border-t border-outline-variant pt-10 flex flex-wrap justify-center gap-8 md:gap-12">
            {LOGOS_WITH_FLIP.map((logo) => {
              const isFlipped = flippedLogo === logo.id;
              
              return (
                <div 
                  key={logo.id} 
                  className="flex flex-col items-center gap-3 flex-1 min-w-[200px] max-w-[280px]"
                  onMouseEnter={() => setFlippedLogo(logo.id)}
                  onMouseLeave={() => setFlippedLogo(null)}
                >
                  <div className="relative h-64 w-full perspective-1000 cursor-pointer">
                    <div
                      className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                        isFlipped ? "rotate-y-180" : ""
                      }`}
                    >
                      {/* Front Face - Logo */}
                      <div className="absolute inset-0 backface-hidden">
                        <div className="card-hover h-full w-full rounded-xl border border-outline-variant bg-surface-container-lowest flex items-center justify-center p-8 transition-transform duration-300 hover:scale-105">
                          <img
                            src={cloudinary(logo.logoId)}
                            alt={logo.name}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              const parent = (e.target as HTMLImageElement).parentElement;
                              if (parent) {
                                const fallback = document.createElement('div');
                                fallback.className = 'h-full w-full flex items-center justify-center font-headline-md text-on-surface-variant text-center p-2';
                                fallback.textContent = logo.name;
                                parent.appendChild(fallback);
                                (e.target as HTMLImageElement).style.display = 'none';
                              }
                            }}
                          />
                        </div>
                      </div>

                      {/* Back Face - Flip Image */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180">
                        <div className="h-full w-full rounded-xl overflow-hidden bg-gradient-to-br from-brand-imperial/5 to-secondary/5 border border-secondary/30">
                          <img
                            src={logo.flipImage}
                            alt={logo.flipText}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2303045e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24'%3E" + logo.flipText + "%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <h4 className="font-headline-md text-white text-center text-base">
                              {logo.flipText}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="font-headline-md text-on-surface-variant text-center">{logo.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  About Section                                                      */
/* ------------------------------------------------------------------ */

function AboutSection() {
  return (
    <section className="bg-surface-container-low py-section-gap-md">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-ice text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/10 mb-4">
            <span className="material-symbols-outlined text-[14px]">flag</span>
            À Propos
          </span>
          <h2 className="font-headline-lg text-brand-imperial mb-6 leading-tight text-balance">
            Trouvez la meilleure voie pour votre avenir&nbsp;!
          </h2>
          <p className="font-body-lg text-on-surface-variant mb-8 max-w-xl text-balance">
            De la santé à l&apos;industrie en passant par l&apos;artisanat, AVS Tunisia
            Group ouvre l&apos;accès à des opportunités concrètes dans les secteurs
            allemands en tension, avec un accompagnement pensé pour chaque étape
            du parcours.
          </p>
          <button className="px-6 py-3 bg-brand-imperial text-white rounded-lg font-label-md hover:scale-105 transition-transform duration-200 ambient-shadow border-t border-white/40 flex items-center gap-2 w-fit">
            Découvrir notre histoire
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <img
            src={cloudinary(ABOUT_IMAGES[0].src)}
            alt={ABOUT_IMAGES[0].alt}
            className="rounded-xl h-48 w-full object-cover"
          />
          <img
            src={cloudinary(ABOUT_IMAGES[1].src)}
            alt={ABOUT_IMAGES[1].alt}
            className="rounded-xl h-48 w-full object-cover mt-8"
          />
          <img
            src={cloudinary(ABOUT_IMAGES[2].src)}
            alt={ABOUT_IMAGES[2].alt}
            className="rounded-xl h-56 w-full object-cover col-span-2"
          />
          <img
            src={cloudinary(ABOUT_IMAGES[3].src)}
            alt={ABOUT_IMAGES[3].alt}
            className="rounded-xl h-48 w-full object-cover"
          />
          <img
            src={cloudinary(ABOUT_IMAGES[4].src)}
            alt={ABOUT_IMAGES[4].alt}
            className="rounded-xl h-48 w-full object-cover mt-8"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Team Section - Enhanced with flip cards                          */
/* ------------------------------------------------------------------ */

function TeamSection() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Enhanced team data with social links and additional info
  const enhancedTeam = [
    {
      name: "Ikbal Lamine",
      image: TEAM[0].image,
      primaryRole: "Fondatrice & PDG",
      secondaryRoles: [
        "Fondatrice & Gérante AVS",
        "Coach International",
        "Consultante en Formation en Allemagne",
        "Experte en Médiation",
      ],
      socialLinks: {
        linkedin: "https://linkedin.com/in/ikbal-lamine",
        email: "mailto:ikbal.lamine@avstunisia.com",
      },
      expertise: ["Fondatrice", "Coach International", "Consultante"],
      yearsOfExperience: "15+",
    },
    {
      name: "Mohamed Ben Said",
      image: TEAM[2].image,
      primaryRole: "Team Leader & Chef de Projet",
      secondaryRoles: [
        "Team Leader",
        "Chef de Projet",
        "Directeur Coordinatrice du Groupe",
      ],
      socialLinks: {
        linkedin: "https://linkedin.com/in/mohamed-ben-said",
        email: "mailto:mohamed.bensaid@avstunisia.com",
      },
      expertise: ["Team Leader", "Chef de Projet", "Coordination"],
      yearsOfExperience: "8+",
    },
    {
      name: "Ghazala Boussidia",
      image: TEAM[1].image,
      primaryRole: "Directeur Administratif & Financier",
      secondaryRoles: [
        "Directeur Administratif",
        "Manager Financier",
        "Formateur IT",
      ],
      socialLinks: {
        linkedin: "https://linkedin.com/in/ghazala-boussidia",
        email: "mailto:ghazala.boussidia@avstunisia.com",
      },
      expertise: ["Directeur Administratif", "Manager Financier", "Formateur"],
      yearsOfExperience: "10+",
    },
    {
      name: "Zaineb Ben Rajeb",
      image: TEAM[3].image,
      primaryRole: "Responsable Administrative",
      secondaryRoles: [
        "Gestion administrative",
        "Coordination des dossiers",
        "Suivi des candidatures",
      ],
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/zaineb-ben-rajeb-avstunisia/",
        email: "mailto:zaineb.benrajeb@avstunisia.com",
      },
      expertise: ["Gestion administrative", "Coordination", "Suivi"],
      yearsOfExperience: "5+",
      languages: ["Français", "Arabe", "Anglais"],
    },
  ];

  return (
    <section className="bg-gradient-to-b from-surface-container-lowest via-surface-container-low to-surface-container-lowest py-section-gap-md">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-brand-ice text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/10 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">groups</span>
                Notre Équipe
              </span>
              <span className="text-xs text-on-surface-variant/60">•</span>
              <span className="text-xs text-on-surface-variant/60">4 experts</span>
            </div>
            <h2 className="font-headline-lg text-brand-imperial text-balance">
              Une équipe d&apos;experts à votre service
            </h2>
            <p className="font-body-md text-on-surface-variant mt-2 max-w-lg leading-relaxed">
              Des spécialistes de la formation, du conseil et du recrutement,
              réunis pour faire la différence dans votre parcours professionnel
              en Allemagne.
            </p>
          </div>
          
          {/* Team stats */}
          <div className="flex gap-6 shrink-0">
            <div className="text-center">
              <div className="font-headline-lg text-secondary text-2xl">15+</div>
              <div className="font-caption text-on-surface-variant text-xs">Années d'expérience</div>
            </div>
            <div className="w-px bg-outline-variant/30"></div>
            <div className="text-center">
              <div className="font-headline-lg text-secondary text-2xl">100%</div>
              <div className="font-caption text-on-surface-variant text-xs">Taux de satisfaction</div>
            </div>
          </div>
        </div>

        {/* Team Grid with Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {enhancedTeam.map((member, index) => {
            const isFlipped = flippedCard === index;

            return (
              <div
                key={member.name}
                className="relative perspective-1000"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setFlippedCard(null);
                }}
              >
                <div
                  className={`relative w-full transition-transform duration-700 transform-style-3d ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                  style={{ minHeight: "480px" }}
                >
                  {/* Front Face */}
                  <div className="absolute inset-0 backface-hidden">
                    <div className="h-full rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-8 text-center shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
                      {/* Image with gradient overlay */}
                      <div className="relative -mt-16 mb-4">
                        <div className="relative inline-block">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-imperial/10 to-secondary/10 blur-xl opacity-50"></div>
                          <img
                            src={cloudinary(member.image)}
                            alt={member.name}
                            className="relative h-28 w-28 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='112' height='112'%3E%3Crect width='112' height='112' fill='%23e5e7eb'/%3E%3Ctext x='56' y='60' text-anchor='middle' fill='%236b7280' font-size='40'%3E👤%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          {/* Status indicator */}
                          <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-400 border-2 border-white"></div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-headline-md text-primary text-lg">
                          {member.name}
                        </h3>
                        <p className="font-label-md text-brand-imperial mt-1 text-sm">
                          {member.primaryRole}
                        </p>
                        
                        {/* Expertise tags */}
                        <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                          {member.expertise.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 bg-brand-ice/50 text-brand-imperial rounded-full text-[10px] font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Secondary roles */}
                        <div className="mt-4 space-y-1">
                          {member.secondaryRoles.map((role) => (
                            <p
                              key={role}
                              className="font-caption text-on-surface-variant text-xs leading-relaxed"
                            >
                              {role}
                            </p>
                          ))}
                        </div>

                        {/* Experience indicator */}
                        <div className="mt-4 flex items-center justify-center gap-2">
                          <span className="text-xs text-on-surface-variant/60">⭐</span>
                          <span className="text-xs text-on-surface-variant/60">
                            {member.yearsOfExperience} ans d'expérience
                          </span>
                        </div>

                        {/* Languages (for Zaineb) */}
                        {member.languages && (
                          <div className="mt-2 flex items-center justify-center gap-1.5">
                            {member.languages.map((lang) => (
                              <span
                                key={lang}
                                className="px-2 py-0.5 bg-surface-container-low rounded-full text-[9px] text-on-surface-variant/70"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Flip button */}
                      <button
                        onClick={() => setFlippedCard(isFlipped ? null : index)}
                        className="mt-4 w-full py-2.5 px-4 bg-brand-imperial/5 text-brand-imperial rounded-xl font-label-md text-xs hover:bg-brand-imperial/10 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[16px]">info</span>
                        En savoir plus
                      </button>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <div className="h-full rounded-2xl bg-gradient-to-br from-brand-imperial/5 via-surface-container-lowest to-secondary/5 border border-secondary/30 p-8 flex flex-col items-center justify-between shadow-lg">
                      {/* Back content */}
                      <div className="text-center">
                        <div className="mb-4">
                          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-imperial/10">
                            <span className="material-symbols-outlined text-3xl text-brand-imperial">
                              badge
                            </span>
                          </div>
                        </div>
                        
                        <h3 className="font-headline-md text-primary text-lg">
                          {member.name}
                        </h3>
                        <p className="font-label-md text-brand-imperial text-sm mt-1">
                          {member.primaryRole}
                        </p>
                        
                        <div className="mt-4 space-y-2 text-left">
                          {member.secondaryRoles.map((role) => (
                            <div key={role} className="flex items-start gap-2">
                              <span className="material-symbols-outlined text-brand-imperial text-[16px] mt-0.5">
                                check_circle
                              </span>
                              <span className="font-body-sm text-on-surface-variant text-xs">
                                {role}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Languages on back (for Zaineb) */}
                        {member.languages && (
                          <div className="mt-4 pt-3 border-t border-outline-variant/20">
                            <p className="font-caption text-on-surface-variant text-xs mb-2">Langues parlées</p>
                            <div className="flex flex-wrap justify-center gap-1.5">
                              {member.languages.map((lang) => (
                                <span
                                  key={lang}
                                  className="px-3 py-1 bg-brand-imperial/10 text-brand-imperial rounded-full text-xs font-medium"
                                >
                                  {lang}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Social links */}
                      <div className="w-full">
                        <div className="flex items-center justify-center gap-4">
                          <a
                            href={member.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all duration-300 hover:scale-110"
                            aria-label="LinkedIn"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                          <a
                            href={member.socialLinks.email}
                            className="p-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110"
                            aria-label="Email"
                          >
                            <span className="material-symbols-outlined text-[18px]">mail</span>
                          </a>
                          <button
                            onClick={() => setFlippedCard(null)}
                            className="p-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-brand-imperial/10 hover:text-brand-imperial transition-all duration-300 hover:scale-110"
                            aria-label="Retour"
                          >
                            <span className="material-symbols-outlined text-[18px]">undo</span>
                          </button>
                        </div>
                        <p className="text-center text-[10px] text-on-surface-variant/50 mt-3">
                          Cliquez sur une icône pour contacter
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive prompt */}
        <div className="mt-8 text-center">
          <p className="font-body-sm text-on-surface-variant/60 text-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">touch_app</span>
            Passez la souris sur les cartes ou cliquez sur &quot;En savoir plus&quot; pour découvrir l&apos;équipe
          </p>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 pt-8 border-t border-outline-variant/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-brand-imperial">verified</span>
                <span className="font-label-md text-on-surface-variant text-xs">Experts certifiés</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-brand-imperial">diversity_3</span>
                <span className="font-label-md text-on-surface-variant text-xs">Équipe multidisciplinaire</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-brand-imperial">handshake</span>
                <span className="font-label-md text-on-surface-variant text-xs">Partenaires de confiance</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-brand-imperial">translate</span>
                <span className="font-label-md text-on-surface-variant text-xs">Français • Allemand • Anglais</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials Section                                               */
/* ------------------------------------------------------------------ */

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="material-symbols-outlined text-yellow-400 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          star
        </span>
      ))}
    </div>
  );
}

function TestimonialsSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Create doubled array for smooth marquee effect
  const doubledTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  // Function to create testimonial card
  const createTestimonialCard = (testimonial: typeof TESTIMONIALS[0], index: number) => {
    const isSelected = selectedIndex === (index % TESTIMONIALS.length);
    
    return (
      <div
        key={`${testimonial.name}-${index}`}
        className={`p-5 rounded-xl mx-3 shadow-md hover:shadow-xl transition-all duration-300 w-80 md:w-96 shrink-0 bg-white border border-outline-variant/20 ${
          isSelected ? 'ring-2 ring-secondary shadow-2xl scale-105' : 'hover:scale-[1.02]'
        }`}
        onClick={() => setSelectedIndex(isSelected ? null : (index % TESTIMONIALS.length))}
      >
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            {testimonial.image ? (
              <img
                src={cloudinary(testimonial.image)}
                alt={testimonial.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='%23e5e7eb'/%3E%3Ctext x='24' y='28' text-anchor='middle' fill='%236b7280' font-size='20'%3E👤%3C/text%3E%3C/svg%3E";
                }}
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-imperial/10 to-secondary/10 flex items-center justify-center border-2 border-white shadow-md">
                <span className="material-symbols-outlined text-on-surface-variant text-[24px]">person</span>
              </div>
            )}
            {/* Verified badge */}
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center border-2 border-white">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-label-md text-primary text-sm font-semibold truncate">
                {testimonial.name}
              </p>
            </div>
            <p className="font-caption text-on-surface-variant text-xs truncate">
              {testimonial.role}
            </p>
            <div className="mt-1">
              <Stars />
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-700 mt-3 line-clamp-3 leading-relaxed">
          {testimonial.quote}
        </p>

        <div className="flex items-center justify-between text-on-surface-variant/60 text-xs mt-3 pt-3 border-t border-outline-variant/20">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            <span>Posté récemment</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">chat_bubble</span>
            <span>{(index % TESTIMONIALS.length) + 1}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-surface-container-low to-surface-container py-section-gap-md overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="px-3 py-1 bg-brand-ice text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/10 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">rate_review</span>
              Témoignages
            </span>
          </div>
          <h2 className="font-headline-lg text-brand-imperial text-balance">
            Ce que nos clients disent de nous
          </h2>
          <p className="font-body-md text-on-surface-variant mt-2 max-w-lg mx-auto">
            Découvrez les retours de ceux qui ont déjà franchi le pas vers la réussite.
          </p>
        </div>

        {/* Marquee Row 1 - Left to Right */}
        <div className="relative w-full overflow-hidden py-4">
          <div className="absolute left-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-surface-container-low to-transparent"></div>
          <div className="absolute right-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-surface-container-low to-transparent"></div>
          
          <div className="flex animate-marquee-slow">
            {doubledTestimonials.map((testimonial, index) => (
              <div key={`row1-${index}`} className="flex-shrink-0">
                {createTestimonialCard(testimonial, index)}
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 - Right to Left (Reverse) */}
        <div className="relative w-full overflow-hidden py-4">
          <div className="absolute left-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-surface-container-low to-transparent"></div>
          <div className="absolute right-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-surface-container-low to-transparent"></div>
          
          <div className="flex animate-marquee-reverse-slow">
            {doubledTestimonials.map((testimonial, index) => (
              <div key={`row2-${index}`} className="flex-shrink-0">
                {createTestimonialCard(testimonial, index)}
              </div>
            ))}
          </div>
        </div>

        {/* Interaction hint */}
        <div className="text-center mt-8">
          <p className="font-body-sm text-on-surface-variant/60 text-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">touch_app</span>
            Cliquez sur une carte pour la mettre en évidence
          </p>
        </div>

        {/* View all button */}
        <div className="text-center mt-6">
          <button
            onClick={() => setSelectedIndex(null)}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-imperial/10 text-brand-imperial rounded-xl font-label-md text-sm hover:bg-brand-imperial/20 transition-all duration-300 hover:scale-[1.02]"
          >
            <span className="material-symbols-outlined text-[18px]">format_quote</span>
            Voir tous les témoignages
          </button>
        </div>
      </div>

      {/* Modal for full testimonial */}
      {selectedIndex !== null && selectedIndex < TESTIMONIALS.length && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 md:p-10 max-w-lg w-full max-h-[85vh] overflow-y-auto relative shadow-2xl animate-in slide-in-from-bottom-10 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 h-9 w-9 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="flex items-center gap-4 mb-6 pr-8">
              {TESTIMONIALS[selectedIndex].image ? (
                <img
                  src={cloudinary(TESTIMONIALS[selectedIndex].image)}
                  alt={TESTIMONIALS[selectedIndex].name}
                  className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%23e5e7eb'/%3E%3Ctext x='32' y='38' text-anchor='middle' fill='%236b7280' font-size='28'%3E👤%3C/text%3E%3C/svg%3E";
                  }}
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-imperial/10 to-secondary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-[32px]">person</span>
                </div>
              )}
              <div>
                <p className="font-headline-md text-primary text-lg">{TESTIMONIALS[selectedIndex].name}</p>
                <p className="font-caption text-on-surface-variant">{TESTIMONIALS[selectedIndex].role}</p>
                <div className="mt-1">
                  <Stars />
                </div>
              </div>
            </div>

            <div className="relative">
              <span className="absolute -top-2 -left-2 text-4xl text-brand-imperial/10">"</span>
              <p className="font-body-md text-on-surface-variant leading-relaxed pl-4">
                {TESTIMONIALS[selectedIndex].quote}
              </p>
              <span className="absolute -bottom-2 -right-2 text-4xl text-brand-imperial/10 rotate-180">"</span>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs text-on-surface-variant/60">Partager</span>
                <button className="p-1.5 hover:bg-brand-ice rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant/60">share</span>
                </button>
                <button className="p-1.5 hover:bg-brand-ice rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant/60">favorite</span>
                </button>
              </div>
              <button
                onClick={() => setSelectedIndex(null)}
                className="px-4 py-2 bg-brand-imperial text-white rounded-lg text-xs font-medium hover:bg-brand-imperial/90 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add custom CSS for marquee animations */}
      <style jsx>{`
        @keyframes marquee-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-reverse-slow {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee-slow {
          animation: marquee-slow 40s linear infinite;
          width: fit-content;
        }

        .animate-marquee-reverse-slow {
          animation: marquee-reverse-slow 40s linear infinite;
          width: fit-content;
        }

        .animate-marquee-slow:hover,
        .animate-marquee-reverse-slow:hover {
          animation-play-state: paused;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA Section                                                        */
/* ------------------------------------------------------------------ */

function CTASection() {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-md">
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-brand-imperial to-brand-sapphire px-8 py-16 md:py-24 text-center">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 0%, transparent 40%), radial-gradient(circle at 80% 80%, white 0%, transparent 40%)",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-headline-lg text-white mb-4 text-balance">
            Prêt à franchir le pas&nbsp;?
          </h2>
          <p className="font-body-lg text-white/80 mb-10 text-balance">
            Contactez notre équipe dès aujourd&apos;hui et donnez à votre carrière
            la trajectoire qu&apos;elle mérite.
          </p>
          <button className="px-8 py-4 rounded-lg bg-white text-brand-imperial font-label-md hover:scale-[1.02] transition-transform inline-flex items-center gap-2">
            Nous contacter
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <>
      <Topbar />
      <Navbar />
      <main className="flex-grow pt-20">
        <Hero />
        <ServicesSection />
        <AboutSection />
        <TeamSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}