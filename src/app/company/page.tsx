// app/company/page.tsx
"use client";

import { CheckCircle2, Shield, Users, GraduationCap, Globe2, Clock, ArrowRight, Target } from "lucide-react";
import Link from "next/link";

export default function CompanyPage() {
  const benefits = [
    {
      icon: Users,
      title: "Talents qualifiés",
      description: "Nous vous proposons des jeunes talents motivés et parfaitement formés de Tunisie, prêts à travailler en Allemagne."
    },
    {
      icon: Shield,
      title: "Guichet unique",
      description: "Du recrutement à la formation linguistique en passant par le placement – nous prenons en charge l'intégralité du processus pour vous."
    },
    {
      icon: GraduationCap,
      title: "Formation certifiée",
      description: "Nos candidats suivent un programme de formation structuré avec des cours d'allemand certifiés selon la norme CECR."
    },
    {
      icon: Globe2,
      title: "Expérience internationale",
      description: "Notre équipe possède une longue expérience dans le recrutement international et la collaboration interculturelle."
    },
    {
      icon: Clock,
      title: "Placement rapide & fiable",
      description: "Grâce à nos processus efficaces et nos réseaux établis, nous trouvons rapidement les talents adaptés à votre entreprise."
    },
    {
      icon: CheckCircle2,
      title: "Assurance qualité",
      description: "Nous garantissons les plus hauts standards de qualité grâce à un suivi et un accompagnement continus de nos candidats."
    }
  ];

  const steps = [
    { number: "01", title: "Analyse des besoins", description: "Nous analysons vos besoins spécifiques et créons un profil personnalisé." },
    { number: "02", title: "Recrutement", description: "Nous trouvons et sélectionnons les meilleurs candidats pour vos postes ouverts." },
    { number: "03", title: "Formation linguistique", description: "Nos candidats suivent des cours intensifs d'allemand jusqu'au niveau requis." },
    { number: "04", title: "Placement", description: "Nous accompagnons l'ensemble du processus de recrutement et soutenons l'intégration." }
  ];

  return (
    <div className="space-y-12">
      {/* Introduction Section */}
      <section className="glass-panel rounded-xl shadow-sm border border-outline-variant/30 p-8 ambient-shadow">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-brand-imperial/10 rounded-lg">
            <Target className="h-6 w-6 text-brand-imperial" />
          </div>
          <div>
            <h2 className="font-headline-lg text-on-surface mb-3">
              Pourquoi AVS TUNISIA ?
            </h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              AVS TUNISIA GROUP est votre partenaire de confiance pour le recrutement de talents qualifiés de Tunisie. 
              Grâce à notre double atout – AVS Hergla Forma pour la formation linguistique et IFT Global pour le recrutement – 
              nous vous offrons une solution complète pour vos besoins en personnel.
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-secondary-container/20 rounded-lg border border-secondary-container/30">
          <p className="font-body-md text-secondary font-medium">
            💡 Nous vous proposons des jeunes talents qualifiés et motivés de Tunisie – 
            nous réduisons les risques et la complexité pour votre entreprise.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section>
        <h3 className="font-headline-md text-on-surface mb-6">Vos avantages en un coup d'œil</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="glass-panel rounded-xl shadow-sm border border-outline-variant/30 p-6 card-hover ambient-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-brand-imperial/10 rounded-lg group-hover:bg-brand-imperial transition-colors">
                  <benefit.icon className="h-5 w-5 text-brand-imperial group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-headline-md text-sm text-on-surface mb-1">{benefit.title}</h4>
                  <p className="font-body-md text-sm text-on-surface-variant">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Process Overview */}
      <section className="bg-gradient-to-r from-brand-imperial via-brand-sapphire to-brand-ice rounded-xl p-8 text-white">
        <h3 className="font-headline-md text-white mb-6 text-center">La collaboration en toute simplicité</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="text-4xl font-bold text-white/20 mb-2">{step.number}</div>
              <h4 className="font-headline-md text-sm font-semibold mb-1">{step.title}</h4>
              <p className="font-body-md text-sm text-white/70">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/company/unser-modell"
            className="inline-flex items-center gap-2 bg-white text-brand-imperial px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors btn-primary"
          >
            En savoir plus sur notre modèle
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="glass-panel rounded-xl shadow-sm border border-outline-variant/30 p-8 text-center ambient-shadow">
        <h3 className="font-headline-md text-on-surface mb-3">
          Prêt pour un partenariat réussi ?
        </h3>
        <p className="font-body-lg text-on-surface-variant mb-6">
          Contactez-nous pour un entretien de conseil sans engagement.
        </p>
        <Link
          href="/company/kontakt-beratung"
          className="inline-flex items-center gap-2 bg-brand-imperial text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-imperial/90 transition-colors btn-primary glass-highlight"
        >
          Prendre contact maintenant
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}