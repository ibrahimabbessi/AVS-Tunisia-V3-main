"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Shield,
  FileText,
  Scale,
  Gavel,
  Users,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Calendar,
  BadgeCheck,
  Lock,
  ChevronRight,
  Globe,
  Award,
} from "lucide-react";
import FirmaNav from "@/components/FirmaNav";

// ============================================================
// COMPONENT
// ============================================================

export default function CadreJuridiqueSecuritePage() {
  const pageData = {
    title: "Cadre Juridique & Sécurité",
    subtitle: "Comment nous sécurisons votre collaboration",
    description:
      "AVS Tunisia vous offre une sécurité juridique complète à chaque étape du recrutement. Découvrez comment nous protégeons votre entreprise et vos futurs talents.",
  };

  // Updated sections with images
  const sections = [
    {
      icon: FileText,
      title: "Contrat de travail",
      color: "from-blue-500 to-blue-600",
      image: "https://f.hellowork.com/edito/sites/3/2022/06/Contrat-travail-1200x600.jpeg",
      items: [
        "Conforme au droit allemand (AVR, conventions collectives)",
        "Traduction en arabe pour une compréhension parfaite",
        "Révision juridique par des avocats allemands",
      ],
    },
    {
      icon: Scale,
      title: "Procédure de reconnaissance",
      color: "from-purple-500 to-purple-600",
      image: "https://www.facilitiesnet.com/resources/editorial/2026/21076_stacks_shutterstock_2197526607.jpg",
      items: [
        "Accompagnement complet auprès des autorités compétentes",
        "Documents de remplacement en cas de pièces manquantes",
        "Recours en cas de refus",
      ],
    },
    {
      icon: Globe,
      title: "Visa & Séjour",
      color: "from-green-500 to-green-600",
      image: "https://www.cambodge.campusfrance.org/sites/pays/files/cambodge/styles/mobile_visuel_principal_page/public/medias/images/2017-09/visa%20schengen.jpg?itok=EYavuvHd",
      items: [
        "100% de réussite aux demandes de visa",
        "Procédure accélérée (accord préalable possible)",
        "Accompagnement jusqu'à l'arrivée en Allemagne",
      ],
    },
    {
      icon: Shield,
      title: "Période d'essai & Garantie",
      color: "from-red-500 to-red-600",
      image: "https://img.magnific.com/vecteurs-premium/sceau-garantie-vert-insigne-satisfaction-100-icone-garantie-du-produit_818003-9790.jpg?semt=ais_hybrid&w=740&q=80",
      items: [
        "Remplacement gratuit en cas d'échec de la période d'essai",
        "24 mois de garantie sur l'intégration réussie",
        "Protection juridique par notre assurance",
      ],
    },
  ];

  const benefits = [
    {
      icon: Lock,
      title: "Sécurité juridique totale",
      image: "https://i0.wp.com/fc-abogados.com/wp-content/uploads/2021/11/Diseno-sin-titulo-33.png?fit=590%2C332&ssl=1",
      description:
        "Tous nos contrats et procédures sont conformes aux lois allemandes et tunisiennes.",
    },
    {
      icon: BadgeCheck,
      title: "Accompagnement personnalisé",
      image: "https://cdn.prod.website-files.com/67a35c390bae120d855876dc/692ec65a0060d6c3bc0ac174_main-blog-projet-accompagnement-personnalise-essms.webp",
      description:
        "Un expert juridique dédié vous suit tout au long du processus.",
    },
    {
      icon: Users,
      title: "Protection des deux parties",
      image: "https://vtcorporatefinance.com/wp-content/uploads/2025/10/Le-role-de-la-Garantie-dActif-et-de-Passif-dans-la-reprise-dentreprise-2.png",
      description:
        "Nous protégeons les intérêts de votre entreprise et de vos futurs talents.",
    },
  ];

  const garanties = [
    {
      title: "100% des démarches administratives",
      description:
        "Nous prenons en charge l'intégralité des procédures administratives, de la reconnaissance des diplômes à l'obtention des visas.",
    },
    {
      title: "24 mois de garantie d'intégration",
      description:
        "Nous assurons un suivi personnalisé pendant 24 mois pour garantir une intégration réussie.",
    },
    {
      title: "Remplacement gratuit",
      description:
        "En cas d'échec de la période d'essai, nous vous proposons un candidat de remplacement sans frais supplémentaires.",
    },
  ];

  return (
    <>
      <FirmaNav />
      {/* Hero Section with image on the right - Space Removed */}
      <section className="relative pt-20 pb-12 md:pt-24 md:pb-16 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Left content */}
            <div className="flex-1 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-brand-imperial/10 rounded-2xl">
                  <Shield className="size-8 text-brand-imperial" />
                </div>
                <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                  Sécurité & Conformité
                </span>
              </div>

              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial leading-tight">
                {pageData.title}
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed max-w-2xl">
                {pageData.subtitle}
              </p>
              <p className="text-on-surface-variant mt-4 leading-relaxed max-w-2xl">
                {pageData.description}
              </p>
            </div>

            {/* Right image */}
            <div className="flex-1 w-full max-w-md md:max-w-lg">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://www.oecd.org/adobe/dynamicmedia/deliver/dm-aid--393825a2-47ad-4a79-898a-6417e4f97dd1/l3-tax-certainty-and-policy-implementation-shutterstock-2246128253-2024.jpg?preferwebp=true&quality=80"
                  alt="Sécurité juridique"
                  className="w-full h-auto object-cover aspect-[4/3]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-imperial/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-12 pb-section-gap-lg">
        <div className="grid gap-12">
          {/* Legal Framework Cards with Images */}
          <div>
            <h2 className="font-headline-lg text-on-surface mb-4 flex items-center gap-3">
              <Gavel className="size-7 text-brand-imperial" />
              Sécurité juridique à chaque étape
            </h2>
            <p className="text-on-surface-variant mb-8 max-w-2xl">
              Nous garantissons une conformité totale avec les exigences légales
              allemandes et tunisiennes pour chaque étape du processus de
              recrutement.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg border border-outline-variant/30 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] group overflow-hidden"
                  >
                    {/* Image at the top of each card */}
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='24'%3E${encodeURIComponent(section.title)}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${section.color} text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="size-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-headline-md text-on-surface mb-3">
                            {section.title}
                          </h3>
                          <ul className="space-y-2">
                            {section.items.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-sm text-on-surface-variant"
                              >
                                <ChevronRight className="size-4 text-secondary flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guarantees Section with Banner */}
          <div className="bg-gradient-to-r from-brand-ice/30 to-brand-imperial/10 rounded-2xl p-8 md:p-12 border border-brand-imperial/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-brand-imperial/10 rounded-lg">
                <Lock className="size-6 text-brand-imperial" />
              </div>
              <h2 className="font-headline-lg text-on-surface">
                🔒 Votre responsabilité : Nous prenons en charge 100% des
                démarches administratives
              </h2>
            </div>

            {/* Banner Image */}
            <div className="w-full rounded-xl overflow-hidden mb-6 shadow-lg">
              <img
                src="https://t4.ftcdn.net/jpg/04/97/78/41/360_F_497784186_40i4zJgNesO0uP3RzGVYaf04QLc4rmX7.jpg"
                alt="Administrative support banner"
                className="w-full h-auto max-h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=300&fit=crop";
                }}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-3 mt-6">
              {garanties.map((garantie, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-outline-variant/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="size-5 text-secondary" />
                    <h3 className="font-headline-sm text-on-surface">
                      {garantie.title}
                    </h3>
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    {garantie.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section with Images */}
          <div>
            <h2 className="font-headline-lg text-on-surface mb-8 text-center">
              Nos atouts juridiques
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg border border-outline-variant/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Image at the top of each benefit card */}
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={benefit.image}
                        alt={benefit.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='24'%3E${encodeURIComponent(benefit.title)}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                    </div>
                    <div className="p-6 md:p-8 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-secondary/10 rounded-full">
                          <Icon className="size-7 text-secondary" />
                        </div>
                      </div>
                      <h3 className="font-headline-sm text-on-surface mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-on-surface-variant">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-brand-imperial to-brand-imperial/90 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="font-headline-lg mb-4">
              Prêt à sécuriser votre recrutement ?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-6">
              Contactez-nous pour un entretien de conseil personnalisé et
              découvrez comment nous pouvons sécuriser votre collaboration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/candidat/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-brand-imperial rounded-lg font-medium hover:bg-white/90 transition-all duration-300 hover:scale-[1.02]"
              >
                Demander un conseil
                <ArrowLeft className="size-4 rotate-180" />
              </Link>
              <Link
                href="/candidat/company/couts-investissement"
                className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
              >
                Découvrir nos tarifs
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}