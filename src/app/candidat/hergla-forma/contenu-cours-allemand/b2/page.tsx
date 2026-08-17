// src/app/hergla-forma/contenu-cours-allemand/b2/page.tsx
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

type AccordionItem = {
  id: string;
  title: string;
  content: {
    description?: string;
    objectives?: string[];
    grammar?: string[];
  };
};

type SubLevel = {
  id: string;
  title: string;
  items: AccordionItem[];
};

const b2Data: SubLevel[] = [
  {
    id: "b2-1",
    title: "B2.1",
    items: [
      {
        id: "accueillir",
        title: "Accueillir",
        content: {
          description: "Nous nous présentons. Profils. Où nous travaillons.",
          objectives: [
            "Faites connaissance avec les personnes impliquées et leur environnement professionnel",
            "Présentez-vous et parlez de votre chemin de vie",
            "Un petit profil Créer",
            "Concevoir un croquis pour une page d'accueil",
          ],
          grammar: [],
        },
      },
      {
        id: "carriere",
        title: "1. Présentez votre carrière",
        content: {
          description: "Toi et ils. Les industries et les métiers évoluent. Structures d'entreprise : qui fait quoi ?",
          objectives: [
            "Apprenez à connaître et à évaluer vos conventions de la vie professionnelle quotidienne dans les secteurs",
            "Attribuer des métiers",
            "Parcours professionnel actuel",
            "Faire connaissance avec les services d'une entreprise",
            "Décrivez vos propres tâches et activités",
          ],
          grammar: [
            "Parfait : haben und sein + Participe III",
            "Présent Passif",
            "Le verbe werden",
            "Verbes séparables au présent et au parfait",
            "Article au nominatif, accusatif et datif",
          ],
        },
      },
      {
        id: "application",
        title: "2. Application",
        content: {
          description: "Recherche d'emploi et CV et candidature à l'Agence fédérale pour l'emploi. Lettre de candidature et entretien.",
          objectives: [
            "Recherche d'offres d'emploi sur des portails en ligne (agence pour l'emploi)",
            "Détails sur les offres d'emploi",
            "Demander des descriptions de poste au BA évaluer",
            "Des exemples de documents de candidature",
            "Analyser Rédiger une candidature",
          ],
          grammar: [
            "Questions avec pronoms interrogatifs quand, comment, qui",
            "Questions oui/non et questions indirectes",
            "Je perfectionne et passé",
          ],
        },
      },
      {
        id: "travail-famille",
        title: "3. Travail et famille",
        content: {
          description: "Travail quotidien. Difficultés au travail. Entre travail et famille.",
          objectives: [
            "Discutez des modèles de temps de travail",
            "Activités de routine et de votre propre travail quotidien",
            "Décrire Évaluer les contributions au forum de travail",
            "Discuter de votre propre satisfaction au travail",
            "Rechercher et discuter des options de garde d'enfants",
          ],
          grammar: [
            "Adverbe temporel en premier dans la phrase",
            "La n-déclinaison",
            "Les articles possessifs mon, votre, son, vous, notre, le vôtre",
            "Déclinaison de l'article possessif notre",
          ],
        },
      },
      {
        id: "voyage-affaires",
        title: "4. Voyage d'affaires",
        content: {
          description: "Planifier un voyage d'affaires. Flux de travail et organisation. Instructions de travail et conseils.",
          objectives: [
            "Trouver un hôtel et réserver une chambre",
            "Préparer le voyage",
            "Connaître les processus de travail sur le chantier, en discuter et les appliquer à sa propre situation",
            "Comprendre et formuler des instructions et des conseils de manière culturelle",
          ],
          grammar: [
            "Verbes modaux",
            "Prépositions modales",
            "Subjonctif",
            "Prépositions locales",
            "Prépositions interchangeables",
          ],
        },
      },
      {
        id: "arguments",
        title: "5. Arguments de vente et petites discussions",
        content: {
          description: "Une visite au salon. Rencontrer des réunions avec les clients et des petits accords de conversation.",
          objectives: [
            "Rechercher des salons et comprendre les raisons de participer",
            "Se préparer à une visite au salon",
            "Planifier et pratiquer des discussions avec les clients",
            "Comprendre et appliquer des bavardages dans un contexte culturel",
            "Passer des accords",
            "Rédiger des lettres commerciales",
          ],
          grammar: [
            "Déclinaison des adjectifs à article défini et indéfini",
            "Déclinaison du pronom réfléchi des adjectifs sans article",
            "Verbes réfléchis",
            "Déclinaison accords et négociations",
          ],
        },
      },
      {
        id: "offre",
        title: "6. Lettre d'offre",
        content: {
          description: "Négociations sur les conditions de livraison et de paiement.",
          objectives: [
            "Traiter les demandes et formuler les offres",
            "Comprendre et mener les négociations (au téléphone)",
            "Comprendre et appliquer les conditions de livraison et de paiement",
            "Evaluer et discuter des offres d'achat",
          ],
          grammar: [
            "Clauses conditionnelles avec si et si",
            "Prépositions temporelles avec accusatif : datif et génitif",
          ],
        },
      },
      {
        id: "commande",
        title: "7. Commandez et payez",
        content: {
          description: "Commander. Se renseigner par téléphone. Payer ses factures.",
          objectives: [
            "Traiter les demandes et formuler les offres",
            "Comprendre et mener les négociations (au téléphone)",
            "Comprendre et appliquer les conditions de livraison et de paiement",
            "Evaluer et discuter des offres d'achat",
          ],
          grammar: [
            "Clauses conditionnelles avec si et si",
            "Prépositions temporelles avec accusatif : datif et génitif",
          ],
        },
      },
      {
        id: "conflits",
        title: "8. Conflits et griefs",
        content: {
          description: "Conflits et malentendus. Critiques et discussions conflictuelles. Gestion de la qualité.",
          objectives: [
            "Comprendre et formuler des réclamations orales et écrites",
            "Répondre aux réclamations",
            "Sensibiliser aux conflits dans un contexte culturel",
            "Mener des échanges constructifs",
            "Comprendre l'importance de la gestion de la qualité et de la normalisation",
          ],
          grammar: [
            "Subjonctif de être, doit, peut, volonté et utilisation au discours indirect",
            "Subjonctif II de être, avoir, peut, peut, comme, doit, devrait, vouloir",
            "Passif",
          ],
        },
      },
      {
        id: "reunion",
        title: "9. Planifier une réunion",
        content: {
          description: "Organiser une réunion. Assister à une réunion. Prévisions et procès-verbaux.",
          objectives: [
            "Coordonner les rendez-vous dans le contexte de la hiérarchie opérationnelle : faire des suggestions, annuler, reporter",
            "Définir des points à l'ordre du jour",
            "Lire, interpréter et discuter des prévisions",
            "Apprentissage des types de protocoles",
            "Prépositions temporelles et modales avec prépositions accusatives et datives, causales",
          ],
          grammar: [
            "avec génitif",
            "Comparatif et superlatif",
            "Futur",
          ],
        },
      },
      {
        id: "reglementations",
        title: "10. Réglementations sur le lieu de travail",
        content: {
          description: "Instructions techniques. Formalités et règlements. Risques d'accidents et règles de sécurité.",
          objectives: [
            "Comprendre et rédiger un manuel d'instructions",
            "Suivre et donner les consignes techniques",
            "Comprendre et appliquer les règles du contrat de travail (vacances, horaires de travail, arrêt maladie)",
            "Connaître les vêtements de travail",
            "Comprendre les règles de sécurité et les pictogrammes",
            "Signaler un accident du travail",
          ],
          grammar: [
            "Impératif",
            "Verbes séparables à l'impératif",
            "Verbes séparables et non séparables avec à",
            "Je nie avec non",
          ],
        },
      },
      {
        id: "contrat",
        title: "11. Contrat de travail, impôts, devoirs",
        content: {
          description: "Contrats de travail. Paie, comité d'entreprise. Licenciement et nouvelle recherche d'emploi.",
          objectives: [
            "Comprendre les contrats de travail (emploi permanent, contrat de travail, travail temporaire...)",
            "Connaître l'importance de la conformité",
            "Connaître la paie et les impôts et prélèvements les plus importants",
            "Comprendre les missions du comité d'entreprise",
            "Connaître la procédure de rupture d'entreprise",
            "Faire des recherches possibilités de formation continue",
          ],
          grammar: [
            "Constructions de participes avec le participe II : usage attributif avec adjectival",
            "Déclinaison",
          ],
        },
      },
      {
        id: "examen-b2",
        title: "12. Prêt pour l'examen",
        content: {
          description: "La partie écoute de l'examen. Le Centre d'examen de lecture et de langue. La partie écrite et orale de l'examen.",
          objectives: [
            "Familiarisez-vous avec l'examen à l'aide du test pratique",
            "Connaître les formats de tâches",
            "Connaître le langage pertinent pour l'examen faire",
            "Apprenez à utiliser des astuces pour les différentes parties de l'examen",
          ],
          grammar: [
            "Révision complète de la grammaire B2",
          ],
        },
      },
    ],
  },
  {
    id: "b2-2",
    title: "B2.2",
    items: [
      {
        id: "themes",
        title: "Thèmes principaux",
        content: {
          description: "Nous nous présentons. Profils Où nous travaillons.",
          objectives: [
            "Travail quotidien: emails et appels téléphoniques",
            "Activités et loisirs",
            "Université",
            "Histoire et politique",
          ],
          grammar: [
            "Faites connaissance avec les personnes impliquées et leur environnement professionnel",
            "Présentez-vous et parlez de votre chemin de vie",
            "Un petit profil Créer",
            "Accord des verbes",
            "L'ordre des mots dans une phrase",
            "Indicateurs de temps",
            "Utilisation du conditionnel",
            "Subjonctif I: Discours indirect",
            "Subjonctif I Formes de substitution",
            "Noms – Verbe – Connexions",
            "Concevoir un croquis pour une page d'accueil",
          ],
        },
      },
    ],
  },
];

export default function B2Page() {
  const [activeLevel, setActiveLevel] = useState<string>("b2-1");
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const toggleItem = (itemId: string) => {
    // If the clicked item is already open, close it
    if (openItemId === itemId) {
      setOpenItemId(null);
    } else {
      // Otherwise, open the clicked item and close any other
      setOpenItemId(itemId);
    }
  };

  const currentLevel = b2Data.find((level) => level.id === activeLevel);

  return (
    <>
      <Navbar />
      
      {/* Hero Section with Image */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                  Cours d'Allemand
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                  Niveau B2
                </span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                Programme pour le niveau d'allemand B2
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed max-w-3xl">
                Pour avoir une idée du vocabulaire et des thèmes que nous aborderons dans nos cours d'allemand 
                du niveau A1 au niveau B2. Pour déterminer quelle grammaire vous apprendrez, réviserez et 
                approfondirez.
              </p>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://www.enalingua-frankfurt.de/wp-content/uploads/2022/03/B2-Deutsch-Prufung-1024x1024.jpg"
                  alt="Niveau B2 - Apprendre l'allemand"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='24'%3EB2%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-imperial/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg">
        {/* Level Navigation */}
        <div className="mb-8">
          <p className="font-body-md text-on-surface-variant mb-4">
            Pour plus d'informations, cliquez sur le niveau approprié dans le menu suivant :
          </p>
          <div className="flex flex-wrap gap-3">
            {b2Data.map((level) => (
              <button
                key={level.id}
                onClick={() => {
                  setActiveLevel(level.id);
                  setOpenItemId(null); // Close any open accordion when switching levels
                }}
                className={`px-6 py-2.5 rounded-lg font-label-md text-label-md transition-all duration-200 ${
                  activeLevel === level.id
                    ? "bg-brand-imperial text-white shadow-md"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/30"
                }`}
              >
                {level.title}
              </button>
            ))}
          </div>
        </div>

        {/* Course Title */}
        <div className="mb-10 rounded-2xl bg-gradient-to-r from-brand-imperial/5 to-secondary/5 border border-outline-variant/30 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-brand-imperial/10 flex items-center justify-center text-xl">
              🎓
            </div>
            <h2 className="font-headline-md text-brand-imperial">
              Cours d'allemand B2
            </h2>
          </div>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            Dans les cours d'allemand de niveau B2 à Berlin, tu apprendras à saisir l'idée générale de 
            textes plus complexes, comme des documents spécialisés dans des domaines particuliers. Voici 
            ce que tu pourras faire :
          </p>
          <ul className="mt-3 space-y-1.5">
            <li className="flex items-start gap-2 text-sm text-on-surface-variant">
              <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Communiquer de manière spontanée et sans difficulté avec des locuteurs natifs allemands.</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-on-surface-variant">
              <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Exprimer clairement ton propre point de vue ainsi que les raisons qui le soutiennent.</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-on-surface-variant">
              <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Parler aisément de faits concernant des sujets qui t'intéressent.</span>
            </li>
          </ul>
          <p className="font-body-md text-on-surface-variant mt-3">
            Le cours d'allemand B2 à AVS Forma ne présentera que quelques structures grammaticales nouvelles, 
            mais il approfondira les connaissances acquises au niveau B1.
          </p>
          <p className="font-body-md text-on-surface-variant mt-2 text-sm">
            Chez nous, le niveau B2 est divisé en deux parties : B2.1 et B2.2, conformément au 
            Cadre européen commun de référence pour les langues. Dans la section suivante, tu 
            découvriras les principaux thèmes abordés.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {currentLevel?.items.map((item) => {
            const isOpen = openItemId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest overflow-hidden transition-all duration-300 hover:border-outline-variant/60"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 md:px-8 md:py-5 flex items-center justify-between text-left hover:bg-surface-container-low/50 transition-colors"
                >
                  <h3 className="font-headline-md text-primary text-base md:text-lg">
                    {item.title}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-on-surface-variant transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 space-y-5">
                    {/* Description */}
                    {item.content.description && (
                      <div className="rounded-xl bg-brand-ice/20 p-4 md:p-5 border border-brand-imperial/10">
                        <p className="font-body-md text-on-surface-variant italic">
                          "{item.content.description}"
                        </p>
                      </div>
                    )}

                    {/* Objectives */}
                    {item.content.objectives && item.content.objectives.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg">🎯</span>
                          <h4 className="font-label-md text-brand-imperial uppercase tracking-wider text-sm">
                            Objectifs d'apprentissage
                          </h4>
                        </div>
                        <ul className="space-y-2">
                          {item.content.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm text-on-surface-variant">
                              <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Grammar */}
                    {item.content.grammar && item.content.grammar.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg">📚</span>
                          <h4 className="font-label-md text-brand-imperial uppercase tracking-wider text-sm">
                            Grammaire
                          </h4>
                        </div>
                        <ul className="space-y-2">
                          {item.content.grammar.map((grammar, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm text-on-surface-variant">
                              <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{grammar}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-brand-imperial text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg text-center relative z-10">
          <h2 className="font-headline-lg text-white mb-4">
            Prêt à commencer votre parcours ?
          </h2>
          <p className="font-body-lg text-white/80 max-w-2xl mx-auto mb-8">
            Rejoignez-nous et bénéficiez d'un accompagnement personnalisé vers votre réussite professionnelle en Allemagne
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-imperial rounded-xl font-label-md hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] shadow-lg"
            >
              Contactez-nous
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/candidature"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-secondary text-white rounded-xl font-label-md hover:bg-secondary/90 transition-all duration-300 hover:scale-[1.02] shadow-lg glass-highlight"
            >
              Postuler maintenant
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}