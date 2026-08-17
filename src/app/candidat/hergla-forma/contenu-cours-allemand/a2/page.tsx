// src/app/hergla-forma/contenu-cours-allemand/a2/page.tsx
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

const a2Data: SubLevel[] = [
  {
    id: "a2-1",
    title: "A2.1",
    items: [
      {
        id: "chat",
        title: "1. Chatter, envoyer des e-mails, s'informer",
        content: {
          description: "Va donc voir sur Internet ! Tu veux qu'on se rencontre ? Que se passe-t-il en ville ?",
          objectives: [
            "Extraire des informations pertinentes de la radio et d'Internet",
            "Se repérer sur les sites web",
            "Prendre des rendez-vous et réagir",
          ],
          grammar: [
            "Le pronom man",
            "Les pronoms personnels à l'accusatif",
            "Le verbe télécharger",
            "Pronom indéfini à l'accusatif",
          ],
        },
      },
      {
        id: "bus-train",
        title: "2. En bus et en train",
        content: {
          description: "Nous nous mettons en route. Quelle est la meilleure liaison ? En route en bus ou en train ?",
          objectives: [
            "S'informer sur les possibilités de voyage et les comparer",
            "Lire les horaires",
            "Comprendre les informations importantes dans les annonces à la gare",
          ],
          grammar: [
            "Le comparatif et le superlatif des adjectifs",
            "Les prépositions locales au datif et à l'accusatif",
            "Les pronoms indéfinis au nominatif",
            "Les propositions subordonnées avec donc",
          ],
        },
      },
      {
        id: "appartement",
        title: "3. Notre nouvel appartement",
        content: {
          description: "Nous cherchons un appartement. Où mettre toutes ces affaires ? Au bon voisinage !",
          objectives: [
            "S'informer sur le marché du logement",
            "Comprendre les indications et les abréviations des annonces de logement",
            "Comprendre les annonces",
            "Prendre rendez-vous pour une visite",
            "Comprendre des messages",
          ],
          grammar: [
            "Prépositions alternées",
            "Verbes à l'accusatif et au datif",
            "Adverbes temporels d'abord, ensuite, après",
            "Pronoms personnels au datif",
          ],
        },
      },
      {
        id: "office",
        title: "4. À l'office",
        content: {
          description: "Quel est le service compétent ? Puis-je vous présenter ? Ma famille. Comment dois-je remplir le formulaire ?",
          objectives: [
            "S'informer sur les compétences des administrations",
            "Demander et donner des renseignements dans les administrations",
            "Parler des structures familiales et des proches",
            "Remplir des formulaires et faire des demandes",
          ],
          grammar: [
            "Le génitif des noms",
            "Les pronoms indéfinis tout, quelque chose, rien",
            "Les phrases subordonnées avec si",
          ],
        },
      },
      {
        id: "school",
        title: "5. L'école, et alors ?",
        content: {
          description: "Je suis en Allemagne depuis peu. Je suis en train de suivre une formation. De bonnes raisons pour suivre une formation continue !",
          objectives: [
            "S'informer sur le système de formation initiale et continue",
            "Décrire sa propre formation",
            "Décrire son parcours de formation et de vie",
            "Discuter des différences avec le système de formation de son pays d'origine",
          ],
          grammar: [
            "Les prépositions au datif depuis, avant, après",
            "Le parfait des verbes séparables",
            "Parfait sans ge",
          ],
        },
      },
      {
        id: "job",
        title: "6. À la recherche d'un emploi",
        content: {
          description: "Où puis-je postuler ? Quelle offre d'emploi me convient ? Voici mon CV.",
          objectives: [
            "S'informer sur les possibilités d'emploi",
            "Participer à des entretiens de conseil",
            "Parler de son expérience professionnelle",
            "Rédiger un CV sous forme de tableau",
          ],
          grammar: [
            "Verbes réflexifs",
            "Relier les phrases avec car et parce que",
            "Indications de temps avec les prépositions jusqu'à, à partir de, pour",
          ],
        },
      },
    ],
  },
  {
    id: "a2-2",
    title: "A2.2",
    items: [
      {
        id: "shopping",
        title: "7. Une séance de shopping",
        content: {
          description: "Comment aimes-tu ce pantalon ? À quel étage trouve-t-on quelque chose ? Allons manger quelque chose !",
          objectives: [
            "Demander des informations sur les produits",
            "Décrire les vêtements et les personnes",
            "Exprimer son plaisir ou son mécontentement",
            "Commander des plats et des boissons",
          ],
          grammar: [
            "Les pronoms démonstratifs le, la, l'",
            "La déclinaison des adjectifs définis",
            "L'article indéfini au nominatif et à l'accusatif",
          ],
        },
      },
      {
        id: "work",
        title: "8. Au travail",
        content: {
          description: "Voici mes tâches au bureau. La sécurité au travail passe avant tout ! Il y a beaucoup à faire !",
          objectives: [
            "S'informer sur les processus de travail",
            "Savoir comment travailler et comprendre les messages des collègues",
            "Comprendre et réagir à des collègues",
            "Règlements (de sécurité) et documents importants",
            "Comprendre les documents de travail",
            "Se concerter",
          ],
          grammar: [
            "Le verbe modal pouvoir + négation",
            "L'impératif",
            "Les pronoms possessifs au datif",
            "Les verbes au datif",
            "Le subjonctif II",
          ],
        },
      },
      {
        id: "school2",
        title: "9. À l'école",
        content: {
          description: "Maintenant, je comprends le système scolaire allemand ! Mes matières préférées à l'époque étaient... Parfois, les parents doivent aussi aller à l'école.",
          objectives: [
            "Comprendre des informations sur les types d'écoles et les offres extrascolaires",
            "Comparer les types d'écoles et en discuter",
            "Comprendre des messages de l'école",
            "Parler de sa propre scolarité",
          ],
          grammar: [
            "Relier les phrases avec que",
            "Le pronom indéfini chaque",
            "Les verbes de modalité vouloir, pouvoir, devoir au prétérit",
          ],
        },
      },
      {
        id: "health",
        title: "10. Être en bonne santé et le rester",
        content: {
          description: "Je fais beaucoup de choses pour ma santé. Avec ça, ça va vite mieux ! Voici comment ma caisse-maladie me soutient.",
          objectives: [
            "Comprendre les informations sur les possibilités de traitement",
            "Demander conseil ou conseiller quelqu'un, par exemple sur l'alimentation ou les remèdes maison",
            "Communiquer avec la caisse-maladie",
            "Comprendre les instructions et y réagir",
          ],
          grammar: [
            "Articles possessifs à l'accusatif",
            "Phrases subordonnées avec damit",
            "Verbes au datif",
          ],
        },
      },
      {
        id: "bank",
        title: "11. Sur le banc",
        content: {
          description: "Qu'est-ce que je peux faire à la banque ? J'ai beaucoup de questions à poser à ma banque. Au distributeur automatique de billets.",
          objectives: [
            "S'informer sur les prestations des banques",
            "Informations importantes dans les brochures",
            "Parler des symboles de la chance et les comparer avec ceux du pays d'origine",
          ],
          grammar: [
            "Pronoms relatifs au nominatif, à l'accusatif et au datif",
            "Relier des phrases avec des pronoms relatifs",
            "Questions indirectes avec quoi, comment, où",
            "Passif présent",
          ],
        },
      },
      {
        id: "leisure",
        title: "12. Les loisirs",
        content: {
          description: "Il y a tellement de possibilités de loisirs ! Mes hobbies sont importants pour moi. De bons moments avec de bons amis.",
          objectives: [
            "Comprendre les indications sur les manifestations",
            "Parler des possibilités de loisirs et des hobbies",
            "Planifier des activités communes",
          ],
          grammar: [
            "Les pronoms indéfinis un et quel",
            "Les verbes réfléchis",
            "Révision : la déclinaison de l'adjectif à l'accusatif",
            "Les conjonctions donc et néanmoins",
          ],
        },
      },
    ],
  },
];

export default function A2Page() {
  const [activeLevel, setActiveLevel] = useState<string>("a2-1");
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

  const currentLevel = a2Data.find((level) => level.id === activeLevel);

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
                  Niveau A2
                </span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                Programme pour le niveau d'allemand A2
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
                  src="https://www.enalingua-frankfurt.de/wp-content/uploads/2022/03/A2-Deutsch-Prufung-1024x1024.jpg"
                  alt="Niveau A2 - Apprendre l'allemand"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='24'%3EA2%3C/text%3E%3C/svg%3E";
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
            {a2Data.map((level) => (
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
              Cours d'allemand A2
            </h2>
          </div>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            Pendant les cours d'allemand au niveau A2 à Berlin, tu peux comprendre des phrases et des 
            expressions liées à des sujets pertinents tels que les informations personnelles, familiales 
            ou les achats. Tu pourras également communiquer dans des situations simples, par exemple en 
            échangeant directement des informations sur des sujets familiers et du quotidien.
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