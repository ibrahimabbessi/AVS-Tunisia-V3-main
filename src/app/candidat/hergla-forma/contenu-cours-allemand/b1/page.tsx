// src/app/hergla-forma/contenu-cours-allemand/b1/page.tsx
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

const b1Data: SubLevel[] = [
  {
    id: "b1-1",
    title: "B1.1",
    items: [
      {
        id: "voyage",
        title: "1. Bon voyage !",
        content: {
          description: "Vacances sur une longue plage. Je veux à la fois faire de la randonnée et nager. Tout cela à cause du chaos à l'aéroport !",
          objectives: [
            "Parler des offres et conditions spéciales",
            "Informations plus complexes, par ex. sur le logement ou à partir d'annonces, comprenez",
            "Évaluer les différentes options",
            "Insatisfaction et contrariété, par ex. à propos des retards",
          ],
          grammar: [
            "Adjectifs au datif",
            "Les conjonctions bipartites soit...ou bien..., mais et les deux... et moi",
            "La préposition à cause de + génitif",
          ],
        },
      },
      {
        id: "voisins",
        title: "2. Chers voisins...",
        content: {
          description: "Il est interdit de fumer dans la cage d'escalier. C'est totalement injuste ! J'arrête même si j'aime mon appartement.",
          objectives: [
            "Proposer des solutions aux conflits",
            "Signaler les événements et défendez vos droits",
            "Utiliser des modules de texte formels dans les communications écrites",
            "Résilier un contrat de location",
          ],
          grammar: [
            "Infinitif avec à",
            "Les particules vraiment, tout à fait, totalement, entièrement, vraiment, pas du tout",
            "Pas surtout pas du tout je relie les phrases avec bien que",
          ],
        },
      },
      {
        id: "environnement",
        title: "3. Un projet scolaire sur la protection de l'environnement",
        content: {
          description: "Que pouvons-nous faire pour protéger l'environnement ? Il s'agit d'un déchet dangereux car toxique. Nous partons en voyage.",
          objectives: [
            "Comprendre les informations et les faits importants lors des soirées des parents",
            "Justifier, discuter des faits et faire des contre-suggestions",
            "Parler des peurs, des inquiétudes et des insécurités dans la garde des enfants",
            "Discuter des différences pour échanger des expériences nationales et interculturelles sur le thème de la protection de l'environnement",
          ],
          grammar: [
            "Phrases avec pour à l'infinitif, sans infinitif, (in) au lieu de à + infinitif",
            "Combiner les phrases avec da",
            "Le futur I achats en ligne",
          ],
        },
      },
      {
        id: "achat",
        title: "4. Achat en ligne",
        content: {
          description: "Faire des achats sur Internet. Quand sera-t-elle livrée ? Conditions générales et retours.",
          objectives: [
            "Connaître les avantages et les inconvénients de certaines options d'achat ou de paiement échange",
            "Passer des commandes",
            "Modalités de paiement et conditions de livraison clarifier",
            "Je comprends AGBS",
          ],
          grammar: [
            "Compléments au datif et à l'accusatif",
            "Relier les phrases avec if",
            "Le présent passif",
            "Le présent passif avec les verbes modaux",
          ],
        },
      },
      {
        id: "television",
        title: "5. Télévision et divertissement",
        content: {
          description: "J'aime non seulement les romans policiers, mais aussi les comédies. Je regarde la télévision pour apprendre l'allemand plus rapidement. Tout ce qu'il faut savoir sur le football.",
          objectives: [
            "Parler de l'expérience médiatique et des habitudes de visionnage",
            "À propos de la télévision",
            "Améliorer les compétences en langue allemande",
            "Petite discussion sur les événements sportifs",
            "Parler des expériences et des comportements interculturels et comparez l'Allemagne avec ceux de votre pays d'origine",
          ],
          grammar: [
            "Les conjonctions en deux parties ni... ni... et pas seulement..., mais aussi...",
            "Je relie les phrases avec donc",
            "Les propositions relatives avec quoi",
          ],
        },
      },
      {
        id: "epoque",
        title: "6. C'était comme ça à l'époque...",
        content: {
          description: "Quand j'étais petit... L'Allemagne a été divisée et réunifiée. Pays étranger, nouvelle langue.",
          objectives: [
            "Comprendre et rendre compte de problèmes plus complexes",
            "En parlant d'événements passés et de souvenirs",
            "Parlez de vos expériences avec votre propre situation migratoire",
          ],
          grammar: [
            "Passé des verbes réguliers, irréguliers et mixtes",
            "Le passé passif",
          ],
        },
      },
    ],
  },
  {
    id: "b1-2",
    title: "B1.2",
    items: [
      {
        id: "patrie",
        title: "7. La deuxième patrie de l'Allemagne ?",
        content: {
          description: "Quand je suis arrivé en Allemagne, je ne connaissais pas un mot d'allemand. Savez-vous si ma formation est reconnue ? Je dois faire traduire le document.",
          objectives: [
            "Échanger des expériences interculturelles",
            "Décrire des comportements et des situations inhabituelles perçues comme étrangères",
            "Exprimer des sentiments tels que la joie, la déception, les espoirs et les regrets",
            "Demander des informations sur la reconnaissance de la formation",
          ],
          grammar: [
            "Reliez les phrases avec comme et si",
            "Le verbe laisser",
            "Questions indirectes : si, où, quoi, lequel, -r, -s",
          ],
        },
      },
      {
        id: "travail",
        title: "8. Un nouveau travail",
        content: {
          description: "Je voudrais plus d'informations. Je postule pour le poste. Durant mes études...",
          objectives: [
            "Les exigences et qualifications nécessaires pour les profils professionnels",
            "Je comprends le CV et la lettre de motivation à l'aide d'un modèle écrire",
            "Préparez-vous à un entretien",
          ],
          grammar: [
            "Verbes avec prépositions (datif/accusatif)",
            "Phrases avec avant, tandis que, après, puisque relier",
            "Subjonctif II d'avoir, être",
            "Serait, infinitif, pourrait + infinitif",
            "L'emploi du subjonctif II : demande polie, souhait, conseil",
          ],
        },
      },
      {
        id: "bureau",
        title: "9. La vie de bureau",
        content: {
          description: "Nous pouvons économiser sur les coûts de chauffage en aérant correctement. Si j'avais le temps, je le ferais moi-même. Vous n'avez pas besoin de faire ça !",
          objectives: [
            "Parlez aux supérieurs des tâches assignées et faites des suggestions alternatives",
            "Concluez des accords sur les étapes de travail individuelles",
            "Les vôtres lors des réunions formulez votre position",
            "Formulez des avis de résiliation écrits",
          ],
          grammar: [
            "Reliez les phrases avec par",
            "Phrases conditionnelles irréelles",
            "Le verbe besoin + infinitif",
          ],
        },
      },
      {
        id: "alimentation",
        title: "10. Alimentation saine",
        content: {
          description: "Souhaitez-vous acheter davantage de produits biologiques ? Bon goût – j'y prête beaucoup d'attention. C'est ainsi que mangent les Allemands.",
          objectives: [
            "Parler de santé et de nutrition",
            "Recommandations pour une bonne santé",
            "Fournir de la nutrition et comprendre les informations provenant d'études et de statistiques",
          ],
          grammar: [
            "Subjonctif du passé",
            "Adverbes prépositionnels",
            "Les pronoms indéfinis quelqu'un, quelqu'un, personne",
          ],
        },
      },
      {
        id: "assure",
        title: "11. Bien assuré !",
        content: {
          description: "Mieux vaut être bien assuré. Plus c'est rapide, mieux c'est ? Nous venions de partir...",
          objectives: [
            "Comprendre les informations essentielles sur l'assurance",
            "Fournir aux salariés de l'assurance les informations nécessaires",
            "Déclarer un accident avec dégâts",
          ],
          grammar: [
            "La conjonction en deux parties je... plus/d'autant plus",
            "Le plus-que-parfait",
            "Le participe II comme adjectif",
          ],
        },
      },
      {
        id: "examen",
        title: "12. Prêt pour l'examen",
        content: {
          description: "La partie écoute de l'examen. La partie lecture de l'examen. La partie écrite de l'examen. La partie orale de l'examen.",
          objectives: [
            "Familiarisez-vous avec la situation de l'examen",
            "Connaître les formats de tâches pertinents pour l'examen",
            "Connaître le langage pertinent pour l'examen",
            "Faire des conseils pour l'examen",
          ],
          grammar: [
            "Révision complète de la grammaire B1",
            "Exercices d'écoute avec informations sur la piste",
          ],
        },
      },
    ],
  },
];

export default function B1Page() {
  const [activeLevel, setActiveLevel] = useState<string>("b1-1");
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

  const currentLevel = b1Data.find((level) => level.id === activeLevel);

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
                  Niveau B1
                </span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                Programme pour le niveau d'allemand B1
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
                  src="https://www.enalingua-frankfurt.de/wp-content/uploads/2022/03/B1-Deutsch-Prufung.jpg"
                  alt="Niveau B1 - Apprendre l'allemand"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='24'%3EB1%3C/text%3E%3C/svg%3E";
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
            {b1Data.map((level) => (
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
              Cours d'allemand B1
            </h2>
          </div>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            Dans les cours d'allemand de niveau B1 à Berlin, tu seras capable de comprendre les points 
            importants d'une conversation lorsque ton interlocuteur utilise un langage clair et précis. 
            Cela concernera des sujets familiers tels que le travail, l'école, les loisirs, etc. Tu seras 
            en mesure de faire face à la plupart des situations, par exemple lors de voyages dans des 
            régions germanophones. Tu pourras t'exprimer de manière simple et cohérente sur des sujets 
            familiers et des sujets qui t'intéressent personnellement. Tu pourras parler de tes expériences 
            et événements passés, décrire tes rêves et tes objectifs dans la vie, ainsi que donner des 
            explications brèves sur des projets et exprimer tes opinions.
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

        {/* Footer Note */}
        <div className="mt-8 rounded-xl bg-surface-container-low p-4 border border-outline-variant/30 text-center">
          <p className="text-sm text-on-surface-variant">
            Chez nous, le niveau B2 est divisé en deux parties : B2.1 et B2.2, conformément au 
            Cadre européen commun de référence pour les langues. Dans la section suivante, tu 
            découvriras les principaux thèmes abordés.
          </p>
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