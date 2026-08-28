// src/app/a-propos/success-stories/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Award,
  Heart,
  Quote,
  Star,
  BookOpen,
  Briefcase,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";

// Define the success stories data
const successStories = {
  "takwa-ben-slama": {
    id: "takwa-ben-slama",
    name: "Takwa Ben Slama",
    description: "Ausbildung en Allemagne - Infirmière",
    badge: "Diplômée 2024",
    date: "2020 - 2024",
    location: "Allemagne",
    category: "Santé",
    rating: 5,
    fullStory:
      "Je tiens à exprimer ma profonde gratitude envers l'agence AVS Forma qui m'a accompagnée dans mon projet de partir en Allemagne pour effectuer un Ausbildung.\n\nLeur soutien et leur professionnalisme m'ont été d'une aide inestimable tout au long du processus. Je dois souligner que cette agence s'est révélée hautement fiable. Dès le début, ils m'ont fourni des informations précises et claires concernant les démarches administratives, les exigences et les délais à respecter. Ils ont été présents à chaque étape et m'ont guidé de manière efficace. Cependant, je tiens à souligner que ce processus demande de la patience et une préparation minutieuse de la langue allemande.\n\nEn effet, la maîtrise de l'allemand est la clé essentielle pour réussir son intégration en Allemagne. Heureusement, l'agence m'a encouragé à m'investir pleinement dans l'apprentissage de la langue, ce qui s'est avéré décisif dans mon parcours.\n\nGrâce à leur accompagnement et à mes efforts dans l'apprentissage de la langue, j'ai pu réaliser mon rêve et entamer une Ausbildung réussie en Allemagne. Je recommande vivement cette agence à toute personne désireuse de partir étudier ou travailler en Allemagne, à condition d'être prête à investir du temps et des efforts dans la préparation de la langue allemande.\n\nJe me souviens encore des premiers jours où j'appréhendais l'inconnu, mais aujourd'hui, je suis tellement reconnaissante de cette opportunité. J'ai pu m'immerger dans une nouvelle culture, rencontrer des gens formidables et enrichir mon bagage professionnel d'une manière que je n'aurais jamais pu imaginer. Encore une fois, merci infiniment à l'équipe de l'agence pour leur soutien et leur expertise. Leur engagement envers la réussite de leur clientèle est véritablement exemplaire.",
    images: [
      "https://drive.google.com/uc?export=view&id=1WCH5fBu19IAF4aG98-nVrLTFwHMXvPWj",
      "https://drive.google.com/uc?export=view&id=1PIPnja_ZJSM2ziQT2I4Gi_Ld98XH5oMU",
      "https://drive.google.com/uc?export=view&id=1SoNGp4AfOP0Wl74U-NY9Bx4PcVUQYWhN",
      "https://drive.google.com/uc?export=view&id=18kmk-F3iumdjx1ygeY046sIX86sqSCsn",
      "https://drive.google.com/uc?export=view&id=1MRJAH7MJcYrGsur1WfTpvd7Ta1r5NuRr",
      "https://drive.google.com/uc?export=view&id=1--TiTw7xvTP4LhKD7dfGOkSwwRzvJApn",
      "https://drive.google.com/uc?export=view&id=1CO7y1OM1HGu_tdybmZP_4CEptV7-Ba5R",
    ],
  },
  "nawres-chouchene": {
    id: "nawres-chouchene",
    name: "Nawres Chouchene",
    description: "Formation professionnelle en Allemagne",
    badge: "En cours",
    date: "2021 - Présent",
    location: "Allemagne",
    category: "Formation",
    rating: 5,
    fullStory:
      "Nawres a commencé son parcours avec AVS Forma avec une détermination exceptionnelle. Son histoire est celle d'une réussite progressive, marquée par des efforts constants et une volonté de fer.\n\nDès son arrivée en Allemagne, Nawres s'est immergée dans la culture et la langue allemande. Grâce au soutien de l'agence et à sa propre persévérance, elle a rapidement progressé dans son apprentissage.\n\nAujourd'hui, Nawres continue de briller dans sa formation professionnelle, inspirant d'autres jeunes à suivre ses pas. Son parcours démontre que la persévérance et le travail acharné sont les clés du succès.",
    images: [
      "https://drive.google.com/uc?export=view&id=1tmuW0Vn4wR6YBV8TLr-HfE1uuuUI6dn3",
      "https://drive.google.com/uc?export=view&id=1VXLqr6w9zVfD7WiemDPQ3hRFceSCUcZE",
      "https://drive.google.com/uc?export=view&id=1zF1rqGWS4WcnV95kjs6e01B0B608HbA3",
      "https://drive.google.com/uc?export=view&id=10ZWRSownBiGzphr7ZJqOMhRQjBmM1B2u",
      "https://drive.google.com/uc?export=view&id=1962L10Ak-ChLn4KG40Y7pcjimCBzovMz",
      "https://drive.google.com/uc?export=view&id=1RE2UnCfqSmFZGrHs_DBWOJQ0lSK7y6Xg",
      "https://drive.google.com/uc?export=view&id=1t54rCG4eDXtJLpYTo-_TcWz9b4eDamqk",
      "https://drive.google.com/uc?export=view&id=15oRUqRCyBp2iG-eoP1bfwP4egkUctpBw",
      "https://drive.google.com/uc?export=view&id=1dNHIl_ihv_czGULZHEmfsX-u2mkas0Mr",
      "https://drive.google.com/uc?export=view&id=1OU4e6TK9-tnCv6vq1QCkJvOotv7SShgN",
    ],
  },
  "marwa-ben-ahmed": {
    id: "marwa-ben-ahmed",
    name: "Marwa Ben Ahmed",
    description: "Diplômée en soins infirmiers",
    badge: "Diplômée 2024",
    date: "2020 - 2024",
    location: "Allemagne",
    category: "Santé",
    rating: 5,
    fullStory:
      "Sur les traces du succès des étudiants en soins infirmiers d'excellence, nous félicitons Marwa qui a commencé son voyage avec nous en 2020 avec un visa de formation professionnelle en Allemagne.\n\nAujourd'hui, ses efforts sont couronnés par l'obtention de son diplôme d'infirmière dans le pays de ses rêves, l'Allemagne !\n\nÀ tous ceux qui aspirent à réaliser leur rêve dans ce domaine, nous sommes ici pour vous soutenir et vous guider vers le succès. Rejoignez-nous et commencez votre parcours vers l'excellence et la réussite !",
    images: [
      "https://drive.google.com/uc?export=view&id=1xalGPz12-CLMRJkakcIpGz64ZRaM6dVg",
      "https://drive.google.com/uc?export=view&id=1gAsPk8opxA7OmLST188Exh5oKLNPlp7b",
    ],
  },
  "ayman-ammar": {
    id: "ayman-ammar",
    name: "Ayman Ammar",
    description: "Formation technique en Allemagne",
    badge: "En cours",
    date: "2022 - Présent",
    location: "Allemagne",
    category: "Technique",
    rating: 5,
    fullStory:
      "Ayman incarne parfaitement l'esprit de détermination et de passion qui caractérise les jeunes talents tunisiens. Son parcours en Allemagne est une source d'inspiration pour tous ceux qui rêvent de poursuivre une carrière internationale.\n\nGrâce à son engagement et au soutien d'AVS Forma, Ayman a pu développer ses compétences techniques et s'intégrer parfaitement dans le milieu professionnel allemand.\n\nSon histoire démontre qu'avec de la persévérance et un bon accompagnement, il est possible de réaliser ses ambitions professionnelles à l'étranger.",
    images: [
      "https://drive.google.com/uc?export=view&id=1KDrNvcOtCe5JFl3nVZEsHqt_Mr2GSnWB",
      "https://drive.google.com/uc?export=view&id=15z54vj7G7Ed0UKDba_Kf2ERlLzz3e8vO",
    ],
  },
  "amina-sammouda": {
    id: "amina-sammouda",
    name: "Amina Sammouda",
    description: "Parcours d'excellence en Allemagne",
    badge: "Diplômée 2023",
    date: "2019 - 2023",
    location: "Allemagne",
    category: "Santé",
    rating: 5,
    fullStory:
      "Amina est un véritable modèle de réussite pour la jeunesse tunisienne. Son parcours exemplaire en Allemagne est le fruit d'un travail acharné et d'une détermination sans faille.\n\nSon histoire montre que les rêves peuvent devenir réalité avec les bons conseils, le bon accompagnement et beaucoup de persévérance. Amina a su saisir les opportunités qui se sont présentées à elle et les transformer en succès.\n\nNous sommes fiers d'avoir accompagné Amina dans son parcours et nous continuerons à soutenir d'autres jeunes talents comme elle.",
    images: [
      "https://drive.google.com/uc?export=view&id=1kG0vEF8fiftpTo_9v72sF4Tnz2_krlIR",
      "https://drive.google.com/uc?export=view&id=1zLQ5TkDdrOE--ahw2MU21m7LiKWP422Y",
    ],
  },
};

type Props = {
  params: { slug: string };
};

export default function SuccessStoryPage({ params }: Props) {
  const story = successStories[params.slug as keyof typeof successStories];

  if (!story) {
    notFound();
  }

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "Santé":
        return <Heart className="size-5" />;
      case "Formation":
        return <BookOpen className="size-5" />;
      case "Technique":
        return <Briefcase className="size-5" />;
      default:
        return <Star className="size-5" />;
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section with Main Photo */}
      <section className="relative pt-40 pb-8 md:pt-48 md:pb-8 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-brand-imperial blur-3xl"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-1 max-w-4xl">
              <Link
                href="/a-propos/success-stories"
                className="inline-flex items-center gap-2 text-brand-imperial hover:gap-3 transition-all duration-300 mb-4"
              >
                <ArrowLeft className="size-4" />
                <span className="font-medium">Retour aux success stories</span>
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                  {story.category}
                </span>
                {story.badge && (
                  <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                    {story.badge}
                  </span>
                )}
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                {story.name}
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed">
                {story.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                {story.date && (
                  <span className="inline-flex items-center gap-2 text-sm text-on-surface-variant">
                    <Calendar className="size-4" />
                    {story.date}
                  </span>
                )}
                {story.location && (
                  <span className="inline-flex items-center gap-2 text-sm text-on-surface-variant">
                    <MapPin className="size-4" />
                    {story.location}
                  </span>
                )}
                {story.rating && (
                  <span className="inline-flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 max-w-md lg:max-w-lg">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-imperial/20 to-secondary/20 mix-blend-overlay"></div>
                <img
                  src="https://drive.google.com/uc?export=view&id=14V1pJnk49E8yzJWcXT4KuOPUwGjaZaro"
                  alt="IFT Global Success Stories"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-12 pb-section-gap-lg">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-outline-variant/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-brand-imperial/10 rounded-lg">
                  <Quote className="size-5 text-brand-imperial" />
                </div>
                <h2 className="font-headline-lg text-on-surface">Mon histoire</h2>
              </div>
              <div className="prose prose-lg max-w-none text-on-surface-variant leading-relaxed whitespace-pre-line">
                {story.fullStory}
              </div>
              <div className="mt-6 flex items-center gap-2 text-brand-imperial bg-brand-imperial/5 px-4 py-3 rounded-lg">
                <Heart className="size-4 fill-brand-imperial/20" />
                <span className="font-medium">Une histoire inspirante</span>
              </div>
            </div>

            {/* Back button */}
            <div className="mt-6 flex justify-between items-center">
              <Link
                href="/a-propos/success-stories"
                className="inline-flex items-center gap-2 text-brand-imperial font-medium hover:gap-3 transition-all duration-300"
              >
                <ArrowLeft className="size-4" />
                Toutes les success stories
              </Link>
              <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                <span>Partager</span>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Gallery */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-outline-variant/30 sticky top-24">
              <h3 className="font-headline-md text-on-surface mb-4 flex items-center gap-2">
                <span>📸</span> Galerie photos
              </h3>
              <div className="space-y-3">
                {story.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 border border-outline-variant/30 hover:shadow-md transition-shadow duration-300"
                  >
                    <img
                      src={img}
                      alt={`${story.name} - Photo ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='150' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='14'%3E📸 Photo%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {index + 1}/{story.images.length}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link
                  href="/candidature"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-brand-imperial text-white rounded-lg font-medium hover:bg-brand-imperial/90 transition-all duration-300 hover:scale-[1.02]"
                >
                  Rejoindre l'aventure
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}