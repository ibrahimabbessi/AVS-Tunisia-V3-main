// app/company/unser-modell/page.tsx
"use client";

import { FileText, Users, GraduationCap, Briefcase, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function UnserModellPage() {
  const processSteps = [
    {
      step: 1,
      icon: FileText,
      title: "Analyse des besoins",
      description: "Nous réalisons une analyse détaillée de vos besoins pour comprendre précisément quelles qualifications et combien de candidats vous recherchez.",
      details: [
        "Analyse de vos postes ouverts",
        "Définition des qualifications requises",
        "Détermination du niveau de langue souhaité",
        "Création d'un profil de candidat personnalisé"
      ]
    },
    {
      step: 2,
      icon: Users,
      title: "Recrutement & Présélection",
      description: "Nous identifions et sélectionnons les candidats les plus prometteurs en fonction de vos critères spécifiques.",
      details: [
        "Recherche active via notre réseau",
        "Entretiens et évaluations",
        "Tests techniques et professionnels",
        "Établissement d'une liste de présélection"
      ]
    },
    {
      step: 3,
      icon: GraduationCap,
      title: "Formation linguistique & Qualification",
      description: "Nos candidats suivent un programme linguistique intensif et certifié chez AVS Hergla Forma.",
      details: [
        "Cours d'allemand de A1 à B2 (norme CECR)",
        "Formation linguistique spécialisée",
        "Formation interculturelle",
        "Contrôles de progression réguliers"
      ]
    },
    {
      step: 4,
      icon: Briefcase,
      title: "Placement & Accompagnement",
      description: "IFT Global gère l'ensemble des démarches administratives et accompagne l'intégration en Allemagne.",
      details: [
        "Élaboration et signature des contrats",
        "Assistance pour les procédures de visa et d'autorisation",
        "Accompagnement lors de l'arrivée et des premières semaines",
        "Suivi continu et retours d'expérience"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="glass-panel rounded-xl shadow-sm border border-outline-variant/30 p-8 ambient-shadow">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-brand-imperial/10 rounded-lg">
            <Users className="h-6 w-6 text-brand-imperial" />
          </div>
          <div>
            <h2 className="font-headline-lg text-on-surface mb-3">Notre Modèle</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Nous proposons un processus continu, de l'analyse des besoins à l'intégration réussie 
              de vos nouveaux talents. Découvrez étape par étape comment fonctionne notre collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <div className="space-y-6">
        {processSteps.map((step, index) => (
          <div key={step.step} className="relative">
            {/* Connector Line */}
            {index < processSteps.length - 1 && (
              <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-brand-imperial to-brand-sapphire opacity-20" />
            )}
            
            <div className="glass-panel rounded-xl shadow-sm border border-outline-variant/30 p-8 relative card-hover ambient-shadow">
              <div className="flex items-start gap-6">
                {/* Step Number Circle */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-imperial to-brand-sapphire rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-imperial/20">
                    <div className="text-center">
                      <div className="font-caption text-white/75">ÉTAPE</div>
                      <div className="font-headline-md text-xl">{step.step}</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-brand-imperial/10 rounded-lg">
                      <step.icon className="h-5 w-5 text-brand-imperial" />
                    </div>
                    <h3 className="font-headline-md text-on-surface">{step.title}</h3>
                  </div>
                  
                  <p className="font-body-lg text-on-surface-variant mb-4">{step.description}</p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 font-body-md text-sm">
                        <CheckCircle2 className="h-4 w-4 text-brand-sapphire mt-0.5 flex-shrink-0" />
                        <span className="text-on-surface-variant">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="glass-panel rounded-xl shadow-sm border border-outline-variant/30 p-8 text-center ambient-shadow">
        <h3 className="font-headline-md text-on-surface mb-3">
          Intéressé par une collaboration ?
        </h3>
        <p className="font-body-lg text-on-surface-variant mb-6">
          Nous vous conseillons volontiers sur vos possibilités.
        </p>
        <Link
          href="/company/kontakt-beratung"
          className="inline-flex items-center gap-2 bg-brand-imperial text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-imperial/90 transition-colors btn-primary glass-highlight"
        >
          Demander un conseil
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}