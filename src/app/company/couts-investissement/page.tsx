"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Euro,
  TrendingDown,
  Users,
  GraduationCap,
  Clock,
  Shield,
  CheckCircle,
  X,
  ChevronRight,
  Calculator,
  PiggyBank,
  Building2,
  FileCheck,
  Sparkles,
} from "lucide-react";
import FirmaNav from "@/components/FirmaNav";
import Image from "next/image";

export default function CoutsInvestissementPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>("premium");
  const [employeeCount, setEmployeeCount] = useState<number>(5);
  const [showSavings, setShowSavings] = useState<boolean>(false);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "À partir de 8 000€",
      description: "Solution essentielle pour vos recrutements",
      features: [
        { name: "Recrutement", included: true },
        { name: "Cours de langue A1-B1", included: true },
        { name: "Cours jusqu'à B2", included: false },
        { name: "Accompagnement reconnaissance", included: "Basique" },
        { name: "Suivi d'intégration", included: "6 mois" },
        { name: "Garantie de remplacement", included: "3 mois" },
      ],
      recommended: false,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "premium",
      name: "Premium",
      price: "À partir de 12 000€",
      description: "Solution complète pour une intégration réussie",
      features: [
        { name: "Recrutement", included: true },
        { name: "Cours de langue A1-B1", included: true },
        { name: "Cours jusqu'à B2", included: true },
        { name: "Accompagnement reconnaissance", included: "Complet" },
        { name: "Suivi d'intégration", included: "12 mois" },
        { name: "Garantie de remplacement", included: "12 mois" },
      ],
      recommended: true,
      color: "from-secondary to-brand-imperial",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Sur mesure",
      description: "Solution personnalisée pour grands recrutements",
      features: [
        { name: "Recrutement", included: true },
        { name: "Cours de langue A1-B1", included: true },
        { name: "Cours jusqu'à B2", included: true },
        { name: "Accompagnement reconnaissance", included: "Complet" },
        { name: "Suivi d'intégration", included: "24 mois" },
        { name: "Garantie de remplacement", included: "24 mois" },
      ],
      recommended: false,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const financingOptions = [
    {
      icon: Building2,
      title: "Financement par la BA",
      description:
        "La Bundesagentur für Arbeit peut financer tout ou partie de votre recrutement.",
    },
    {
      icon: TrendingDown,
      title: "Modèle basé sur la réussite",
      description:
        "50% après signature du contrat, 50% après intégration réussie.",
    },
    {
      icon: Users,
      title: "Réduction pour recrutements groupés",
      description: "Des tarifs préférentiels pour les recrutements de masse.",
    },
  ];

  const savingsData = {
    germanRecruitment: 25000,
    avsRecruitment: 15000,
    savings: 10000,
    savingsPercentage: 40,
    timeToHireGermany: 12,
    timeToHireAVS: 8,
    timeSaved: 4,
    retentionRateGermany: 80,
    retentionRateAVS: 95,
  };

  const calculateSavings = () => {
    const totalGermanCost = savingsData.germanRecruitment * employeeCount;
    const totalAVSCost = savingsData.avsRecruitment * employeeCount;
    const totalSavings = totalGermanCost - totalAVSCost;
    return { totalGermanCost, totalAVSCost, totalSavings };
  };

  const savings = calculateSavings();

  return (
    <>
      <FirmaNav />

      {/* Hero Section - Image on right, content on left */}
      <section className="relative pt-12 md:pt-16 pb-12 md:pb-16 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Left Content */}
            <div className="flex-1 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-brand-imperial/10 rounded-2xl">
                  <Euro className="size-8 text-brand-imperial" />
                </div>
                <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                  Transparence & Économies
                </span>
              </div>

              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial leading-tight">
                Coûts & Investissement
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed max-w-2xl">
                Votre investissement – Transparent & Prévisible
              </p>
              <p className="text-on-surface-variant mt-4 leading-relaxed max-w-2xl">
                Découvrez nos forfaits transparents et calculez vos économies
                potentielles avec AVS Tunisia.
              </p>
            </div>

            {/* Right Image */}
            <div className="flex-1 relative w-full h-64 md:h-96 lg:h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://www.dynamique-mag.com/wp-content/uploads/071dffafdc20fd62bfded73cdb5d2710.jpg"
                alt="Investment and growth"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the component remains the same */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-12 pb-section-gap-lg">
        <div className="grid gap-12">
          {/* Pricing Plans */}
          <div>
            <div className="text-center mb-8">
              <h2 className="font-headline-lg text-on-surface mb-4">
                Nos forfaits
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">
                Choisissez la formule qui correspond le mieux à vos besoins de
                recrutement.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {plans.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                return (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                      plan.recommended
                        ? "border-secondary shadow-lg shadow-secondary/20 relative overflow-hidden"
                        : "border-outline-variant/30 hover:border-secondary/50"
                    } ${isSelected ? "ring-2 ring-secondary" : ""}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.recommended && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-secondary text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded-bl-lg">
                          Recommandé
                        </div>
                      </div>
                    )}
                    <div className="p-6 md:p-8">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${plan.color} text-white inline-block mb-4`}
                      >
                        <Sparkles className="size-6" />
                      </div>
                      <h3 className="font-headline-md text-on-surface mb-1">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-on-surface-variant mb-4">
                        {plan.description}
                      </p>
                      <p className="font-headline-lg text-brand-imperial mb-6">
                        {plan.price}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-on-surface-variant"
                          >
                            {feature.included === true ? (
                              <CheckCircle className="size-4 text-secondary flex-shrink-0" />
                            ) : feature.included === false ? (
                              <X className="size-4 text-on-surface-variant/30 flex-shrink-0" />
                            ) : (
                              <CheckCircle className="size-4 text-secondary flex-shrink-0" />
                            )}
                            <span
                              className={
                                feature.included === false
                                  ? "text-on-surface-variant/50"
                                  : ""
                              }
                            >
                              {feature.name}
                              {typeof feature.included === "string" && (
                                <span className="text-secondary font-medium ml-1">
                                  ({feature.included})
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/candidat/contact"
                        className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] ${
                          plan.recommended
                            ? "bg-secondary text-white hover:bg-secondary/90"
                            : "bg-brand-imperial text-white hover:bg-brand-imperial/90"
                        }`}
                      >
                        Demander un devis
                        <ChevronRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Financing Options */}
          <div className="bg-gradient-to-r from-brand-ice/30 to-brand-imperial/10 rounded-2xl p-8 md:p-12 border border-brand-imperial/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-brand-imperial/10 rounded-lg">
                <PiggyBank className="size-6 text-brand-imperial" />
              </div>
              <h2 className="font-headline-lg text-on-surface">
                💡 Options de financement
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {financingOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-outline-variant/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        <Icon className="size-5 text-secondary" />
                      </div>
                      <h3 className="font-headline-sm text-on-surface">
                        {option.title}
                      </h3>
                    </div>
                    <p className="text-sm text-on-surface-variant">
                      {option.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Savings Calculator */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-outline-variant/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Calculator className="size-6 text-secondary" />
              </div>
              <h2 className="font-headline-lg text-on-surface">
                📊 Calculez vos économies
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Calculator Input */}
              <div>
                <p className="text-on-surface-variant mb-6">
                  Simulez vos économies potentielles avec AVS Tunisia par
                  rapport au recrutement en Allemagne.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">
                      Nombre de collaborateurs à recruter
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={employeeCount}
                        onChange={(e) => {
                          setEmployeeCount(parseInt(e.target.value));
                          setShowSavings(true);
                        }}
                        className="flex-1 h-2 bg-surface-container-low rounded-lg appearance-none cursor-pointer accent-secondary"
                      />
                      <span className="font-headline-md text-secondary min-w-[60px] text-center">
                        {employeeCount}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-on-surface-variant mt-1">
                      <span>1</span>
                      <span>50</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowSavings(!showSavings)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-all duration-300 hover:scale-[1.02]"
                  >
                    {showSavings ? "Masquer les économies" : "Calculer mes économies"}
                    <Calculator className="size-4" />
                  </button>
                </div>

                {showSavings && (
                  <div className="mt-6 p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-on-surface-variant">
                          Coût en Allemagne
                        </p>
                        <p className="font-headline-md text-on-surface">
                          {savings.totalGermanCost.toLocaleString("fr-FR")}€
                        </p>
                      </div>
                      <div>
                        <p className="text-on-surface-variant">
                          Coût AVS Tunisia
                        </p>
                        <p className="font-headline-md text-secondary">
                          {savings.totalAVSCost.toLocaleString("fr-FR")}€
                        </p>
                      </div>
                      <div className="col-span-2 pt-3 border-t border-secondary/20">
                        <p className="text-on-surface-variant">
                          Économies réalisées
                        </p>
                        <p className="font-headline-lg text-brand-imperial">
                          {savings.totalSavings.toLocaleString("fr-FR")}€
                        </p>
                        <p className="text-sm text-secondary font-medium">
                          {savingsData.savingsPercentage}% d&apos;économies
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Savings Stats */}
              <div className="bg-gradient-to-br from-surface-container-low to-brand-ice/30 rounded-xl p-6 border border-outline-variant/30">
                <h3 className="font-headline-sm text-on-surface mb-4">
                  Comparaison des avantages
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
                    <span className="text-sm text-on-surface-variant">
                      Recrutement en Allemagne
                    </span>
                    <span className="text-sm font-medium text-on-surface">
                      {savingsData.germanRecruitment.toLocaleString("fr-FR")}€
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
                    <span className="text-sm text-on-surface-variant">
                      AVS Tunisia
                    </span>
                    <span className="text-sm font-medium text-secondary">
                      {savingsData.avsRecruitment.toLocaleString("fr-FR")}€
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
                    <span className="text-sm text-on-surface-variant">
                      Délai de recrutement (moyen)
                    </span>
                    <span className="text-sm font-medium text-on-surface">
                      {savingsData.timeToHireAVS} mois
                      <span className="text-on-surface-variant text-xs ml-1">
                        (vs {savingsData.timeToHireGermany} mois)
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-on-surface-variant">
                      Taux de rétention
                    </span>
                    <span className="text-sm font-medium text-secondary">
                      {savingsData.retentionRateAVS}%
                      <span className="text-on-surface-variant text-xs ml-1">
                        (vs {savingsData.retentionRateGermany}%)
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-brand-imperial to-brand-imperial/90 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid gap-6 md:grid-cols-4 text-center">
              <div>
                <p className="text-white/70 text-sm">Économies par recrutement</p>
                <p className="font-display-lg text-3xl mt-1">
                  {savingsData.savingsPercentage}%
                </p>
              </div>
              <div>
                <p className="text-white/70 text-sm">Délai de recrutement</p>
                <p className="font-display-lg text-3xl mt-1">
                  {savingsData.timeToHireAVS} mois
                </p>
              </div>
              <div>
                <p className="text-white/70 text-sm">Taux de rétention</p>
                <p className="font-display-lg text-3xl mt-1">
                  {savingsData.retentionRateAVS}%
                </p>
              </div>
              <div>
                <p className="text-white/70 text-sm">Garantie d&apos;intégration</p>
                <p className="font-display-lg text-3xl mt-1">24 mois</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-brand-ice/30 to-brand-imperial/10 rounded-2xl p-8 md:p-12 border border-brand-imperial/20 text-center">
            <h2 className="font-headline-lg text-on-surface mb-4">
              Prêt à investir dans vos futurs talents ?
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto mb-6">
              Contactez-nous pour un devis personnalisé et découvrez comment
              nous pouvons optimiser votre recrutement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/candidat/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-brand-imperial text-white rounded-lg font-medium hover:bg-brand-imperial/90 transition-all duration-300 hover:scale-[1.02]"
              >
                Demander un devis
                <ChevronRight className="size-4" />
              </Link>
              <Link
                href="/candidat/company/cadre-juridique-securite"
                className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-brand-imperial text-brand-imperial rounded-lg font-medium hover:bg-brand-imperial/10 transition-all duration-300 hover:scale-[1.02]"
              >
                Cadre juridique
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Back Navigation */}
          <div className="mt-4">
            <Link
              href="/candidat/company"
              className="inline-flex items-center gap-2 text-brand-imperial font-medium hover:gap-3 transition-all duration-300"
            >
              <ArrowLeft className="size-4" />
              Retour à l&apos;espace entreprise
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}