// src/app/hergla-forma/contenu-cours-allemand/a1/page.tsx
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

const a1Data: SubLevel[] = [
  {
    id: "a1-1",
    title: "A1.1",
    items: [
      {
        id: "hello",
        title: "1. Bonjour comment ça va ?",
        content: {
          description: "Bonjour. Je m'appelle. Comment allez-vous ? Est-ce que vous parlez Allemand ?",
          objectives: [
            "Se présenter et demander son nom",
            "Dire et demander d'où l'on vient",
            "Se saluer et prendre congé",
            "Demander comment on va et parler de son état de santé",
            "Dire quelle(s) langue(s) on parle",
          ],
          grammar: [
            "La place du verbe dans les phrases déclaratives, les questions en W et les questions oui/non",
            "Conjugaison au présent du singulier et forme de politesse de venir, s'appeler, parler, être",
          ],
        },
      },
      {
        id: "family",
        title: "2. Ma famille et moi",
        content: {
          description: "Voici ma famille. Voici mon adresse. Quel âge avez-vous ?",
          objectives: [
            "Présenter et demander les membres de la famille",
            "Donner des renseignements sur l'état civil",
            "Épeler le nom",
            "Donner l'âge, l'adresse et le numéro de téléphone et les comprendre",
          ],
          grammar: [
            "Articles possessifs mon, ma",
            "Ils, vous et elle",
            "Conjugaison avancée au présent de haben, wohnen, leben, sein",
          ],
        },
      },
      {
        id: "course",
        title: "3. En cours d'allemand",
        content: {
          description: "Qu'est-ce que tu aimes manger ? Qu'est-ce qu'il y a en promotion aujourd'hui ? Est-ce qu'il y a autre chose ?",
          objectives: [
            "Nommer les objets et demander leur signification en allemand",
            "Nommer les activités en classe",
            "Comprendre les consignes de travail",
            "Demander des explications et les comprendre",
            "Demander de répéter ce qui a été dit",
          ],
          grammar: [
            "L'article défini et indéfini au singulier",
            "La négation avec nicht et kein/keine",
            "Les questions oui/non et les questions en W avec Was ?",
            "La formation des mots : les composés",
            "Conjugaison complète au présent d'être, faire, parler, lire",
          ],
        },
      },
      {
        id: "supermarché",
        title: "4. Au supermarché",
        content: {
          description: "Comment cela se dit-il en allemand ? Qu'est-ce que vous apprenez aujourd'hui ? Chaque jour est différent",
          objectives: [
            "Demander des informations sur les aliments",
            "Exprimer son plaisir, son mécontentement et ses préférences",
            "Demander des informations sur les prix, les offres spéciales et les quantités et comprendre les indications données",
          ],
          grammar: [
            "Les articles au nominatif et à l'accusatif",
            "Les questions oui/non et les questions en W avec Combien ?",
            "Noms au pluriel",
            "Les verbes avoir besoin, acheter, manger, aimer au présent de l'indicatif",
          ],
        },
      },
      {
        id: "morning-evening",
        title: "5. Du matin jusqu'au soir",
        content: {
          description: "Que fais-tu aujourd'hui ? Quelle heure est-il ? Je planifie ma journée",
          objectives: [
            "Décrire le déroulement de la journée",
            "Demander et répondre à l'heure",
            "Parler de la journée",
            "Parler du plan de la journée",
            "Prendre rendez-vous, accepter ou non les propositions de rendez-vous",
            "Refuser la proposition",
          ],
          grammar: [
            "La place des adverbes temporels toujours, souvent, parfois, jamais dans la phrase",
            "Les verbes séparables appeler, faire les courses, se lever, regarder la télévision",
          ],
        },
      },
      {
        id: "appartement",
        title: "6. À la recherche d'un appartement",
        content: {
          description: "4 ZKB libre de suite. Cet appartement est parfait ! Nous avons besoin de nouveaux meubles.",
          objectives: [
            "Parler des possibilités de recherche de logement",
            "Comprendre les indications et les abréviations dans les annonces de logement",
            "Exprimer sa satisfaction et son mécontentement",
            "Écrire des objets d'ameublement et des pièces d'habitation",
          ],
          grammar: [
            "Les pronoms personnels à la 3e personne du singulier et du pluriel",
            "Les articles possessifs mon(-e), ton(-e), leur(-e), votre(-e)",
          ],
        },
      },
    ],
  },
  {
    id: "a1-2",
    title: "A1.2",
    items: [
      {
        id: "city",
        title: "7. Se déplacer en ville",
        content: {
          description: "Prenons le bus ! Où se trouve la banque ? Comment aller à la gare ?",
          objectives: [
            "Demander le meilleur moyen de transport",
            "Comprendre les horaires de départ et les tarifs",
            "Demander son chemin et comprendre les indications",
          ],
          grammar: [
            "Les prépositions au datif avec, à, à, chez, en",
            "Les prépositions locales",
            "L'impératif (vous)",
            "Les verbes conduire, prendre, aller au présent de l'indicatif",
          ],
        },
      },
      {
        id: "profession",
        title: "8. Mon métier",
        content: {
          description: "Que faites-vous dans la vie ? Ce que je dois encore faire. Ce poste me convient.",
          objectives: [
            "Dire ce que l'on fait soi-même professionnellement",
            "Parler de ses connaissances professionnelles, de ses capacités et de ses souhaits",
            "Se mettre d'accord sur les horaires de travail",
          ],
          grammar: [
            "Les verbes modaux pouvoir et devoir au présent de l'indicatif et leur place dans la phrase",
            "Le verbe séparable commencer au présent de l'indicatif",
          ],
        },
      },
      {
        id: "doctor",
        title: "9. Chez le médecin",
        content: {
          description: "J'ai mal ! Dans la salle de consultation. Je dois me faire porter malade.",
          objectives: [
            "Communiquer ce qui fait mal et parler de son état",
            "Comprendre les recommandations et les instructions du médecin",
            "Prendre un rendez-vous chez le médecin",
            "Se faire porter pâle",
          ],
          grammar: [
            "Les pronoms possessifs au nominatif",
            "Les verbes de modalité devoir et pouvoir",
            "L'impératif (nouveau : vous et vous)",
          ],
        },
      },
      {
        id: "yesterday",
        title: "10. Hier et aujourd'hui",
        content: {
          description: "Qu'est-ce que tu as fait hier ? Hier, je suis... Comment se sont passées tes vacances ?",
          objectives: [
            "Dire ce que l'on a fait la veille/la semaine dernière/le mois dernier/l'année dernière",
            "Parler de ses origines",
            "Décrire comment était la journée/le week-end/un événement passé",
          ],
          grammar: [
            "Le parfait avec avoir et être",
            "Le participe II",
            "La position du verbe au parfait",
            "Le prétérit avec être et avoir",
          ],
        },
      },
      {
        id: "shopping",
        title: "11. Nous allons faire du shopping !",
        content: {
          description: "J'ai besoin de nouveaux vêtements. Est-ce que vous avez une taille en plus ? Quelle couleur me va mieux ?",
          objectives: [
            "Demander des informations et de l'aide à une vendeuse",
            "Parler de tailles et de couleurs de vêtements",
            "Rechercher sur Internet des possibilités de commande",
            "Exprimer ses préférences et ses aversions",
            "Faire une réclamation",
          ],
          grammar: [
            "L'article indéfini au datif",
            "Les pronoms personnels au datif",
            "Le comparatif et le superlatif des adjectifs",
            "Les pronoms interrogatifs et démonstratifs Quel et Ce au nominatif et à l'accusatif",
            "Les verbes à l'accusatif et les verbes au datif",
          ],
        },
      },
      {
        id: "spring",
        title: "12. Enfin le printemps !",
        content: {
          description: "Aujourd'hui, il peut pleuvoir, faire de la tempête ou neiger... Fêtes et saisons. Nous faisons la fête.",
          objectives: [
            "Parler du temps et des saisons",
            "Donner des indications de date et comprendre",
            "Rédiger, accepter et annuler des invitations",
          ],
          grammar: [
            "Le verbe modal vouloir",
            "La formation des mots : les composés",
            "Les prépositions temporelles au datif",
            "Les nombres ordinaux",
          ],
        },
      },
    ],
  },
];

export default function A1Page() {
  const [activeLevel, setActiveLevel] = useState<string>("a1-1");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  const currentLevel = a1Data.find((level) => level.id === activeLevel);

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
                  Niveau A1
                </span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                Programme pour le niveau d'allemand A1
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
                  src="https://toafl.com/wp-content/uploads/2018/07/A1.png"
                  alt="Niveau A1 - Apprendre l'allemand"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='24'%3EA1%3C/text%3E%3C/svg%3E";
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
            {a1Data.map((level) => (
              <button
                key={level.id}
                onClick={() => setActiveLevel(level.id)}
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
              COURS D'ALLEMAND A1
            </h2>
          </div>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            Pendant les cours d'allemand allant du niveau A1 à AVS Forma, tu seras familiarisé avec des 
            expressions courantes du quotidien et des phrases extrêmement simples qui seront utiles pour 
            répondre à des besoins spécifiques. Tu acquerras la capacité de te présenter et de poser des 
            questions simples à propos des autres personnes, comme leur lieu de résidence, leurs connaissances 
            ou leurs possessions.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {currentLevel?.items.map((item) => {
            const isOpen = openItems.has(item.id);
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