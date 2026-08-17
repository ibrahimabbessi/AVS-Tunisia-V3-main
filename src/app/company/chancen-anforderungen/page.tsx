// app/company/chancen-anforderungen/page.tsx
"use client";

import { Building2, Heart, Users, Laptop, Plane, Briefcase, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ChancenAnforderungenPage() {
  const sectors = [
    { icon: Building2, name: "Industrie", description: "Production, Fabrication, Génie mécanique, Industrie automobile" },
    { icon: Heart, name: "Santé", description: "Soins, Médecine, Système de santé, Thérapie" },
    { icon: Users, name: "Tourisme", description: "Hôtellerie, Restauration, Voyages, Gestion d'événements" },
    { icon: Laptop, name: "IT & Technologie", description: "Développement logiciel, Support IT, Analyse de données" },
    { icon: Plane, name: "Logistique", description: "Chaîne d'approvisionnement, Transport, Gestion des stocks" },
    { icon: Briefcase, name: "Autres domaines", description: "Artisanat, Commerce, Finance, Éducation" }
  ];

  const requirements = [
    {
      category: "Compétences linguistiques",
      items: [
        "Niveau B1 minimum en allemand (norme CECR)",
        "B2 pour les postes académiques ou spécialisés",
        "Justification par des tests de langue certifiés"
      ]
    },
    {
      category: "Qualifications professionnelles",
      items: [
        "Formation professionnelle achevée ou diplôme universitaire",
        "Expérience professionnelle (selon le poste)",
        "Certificats spécifiques au domaine"
      ]
    },
    {
      category: "Qualités personnelles",
      items: [
        "Motivation et engagement",
        "Esprit d'équipe et compétences en communication",
        "Ouverture culturelle et capacité d'adaptation"
      ]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Soumission de la candidature",
      description: "Les candidats intéressés soumettent leurs dossiers via notre portail."
    },
    {
      step: "2",
      title: "Test de langue & Entretien",
      description: "Nous réalisons des tests de niveau linguistique et des entretiens structurés."
    },
    {
      step: "3",
      title: "Sélection & Préparation",
      description: "Les meilleurs candidats sont sélectionnés pour l'entreprise spécifique."
    },
    {
      step: "4",
      title: "Contrat & Placement",
      description: "Signature du contrat de travail et accompagnement lors de l'intégration."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-[#0a2a88]/10 rounded-lg">
            <Building2 className="h-6 w-6 text-[#0a2a88]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Opportunités & Exigences</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous recrutons des talents qualifiés dans différents secteurs. Découvrez ici 
              quels profils vous attendent et quelles exigences nos candidats remplissent.
            </p>
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Secteurs dans lesquels nous recrutons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sector) => (
            <div key={sector.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#0a2a88]/10 rounded-lg">
                  <sector.icon className="h-5 w-5 text-[#0a2a88]" />
                </div>
                <h4 className="font-semibold text-gray-900">{sector.name}</h4>
              </div>
              <p className="text-sm text-gray-600">{sector.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Exigences pour nos candidats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {requirements.map((req) => (
            <div key={req.category} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">{req.category}</h4>
              <ul className="space-y-2">
                {req.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-gradient-to-r from-[#0a2a88] to-[#3b8bc4] rounded-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6 text-center">Le chemin vers votre nouveau talent</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {processSteps.map((step) => (
            <div key={step.step} className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                {step.step}
              </div>
              <h4 className="font-semibold mb-1">{step.title}</h4>
              <p className="text-sm text-white/70">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Prêt pour la prochaine réussite ?
        </h3>
        <p className="text-gray-600 mb-6">
          Contactez-nous et trouvez vos talents.
        </p>
        <Link
          href="/company/kontakt-beratung"
          className="inline-flex items-center gap-2 bg-[#0a2a88] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0a2a88]/90 transition-colors"
        >
          Demander maintenant
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}