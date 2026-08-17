// src/app/a-propos/presse/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";

// YouTube Video Data
const YOUTUBE_VIDEOS = [
  {
    id: 1,
    title: "Visite au Gouvernorat & Stade olympique Sousse",
    description:
      "Dans le cadre du tournoi de football que nous avons organisé, ⚽️ nous souhaitions enrichir l'expérience en y intégrant des éléments culturels et de découverte. 😍 Nous avons eu l'honneur de visiter le Stade Olympique de Sousse et le siège du gouvernorat. 💖\n\nNous adressons nos plus sincères remerciements à M. Wissam Latif 🙏 pour son excellente coordination de la visite du Stade Olympique, qui a rendu cette expérience particulièrement agréable. 🌟\n\n🌍⚽️ Un mélange de sport et de culture à Sousse ! 🇹🇳❤️\n\nDans le cadre du tournoi de football que nous avons organisé, nous avons veillé à diversifier et enrichir l'expérience par une touche culturelle et de découverte. Nous avons ainsi pu visiter la vieille ville de Sousse.\n\nUn grand merci à Omar, propriétaire de Dar Badia, qui nous a accompagnés dans la vieille ville et nous a partagé de précieuses informations sur son histoire.\n\nEt n'oublions pas le talentueux photographe Walid Viva qui a immortalisé ces moments précieux avec son objectif professionnel ! 📸✨\n\nMerci à tous ceux qui ont contribué à rendre cette expérience si enrichissante et agréable ! 🇩🇪⚽️🇹🇳❤️",
    date: "Mar 15, 2025",
    videoUrl: "https://www.youtube.com/watch?v=0IEvgv8E7yE",
    category: "activites, sport, Sousse, Stade olympique",
    tags: ["activites", "sport", "Sousse", "Stade olympique", "Bled El Arbi", "medina"],
  },
  {
    id: 2,
    title: "Tournoi Tunis VS Germany",
    description:
      "📢 Préparez-vous pour le plus grand événement footballistique d'Hergla ! ⚽🔥\n\nVivez une ambiance survoltée et compétitive lors du tournoi amical de football entre la Tunisie et l'Allemagne, qui se déroulera au stade d'Hergla du 4 au 6 mars 2025 ! 🏆🇹🇳🇩🇪\n\n🔥 Des matchs intenses… Une ambiance électrique… et un niveau de jeu exceptionnel ! 🔥\n\n⚽ Qui sera sacré champion ? 🤔 Ne manquez pas cet événement et venez encourager votre équipe favorite !\n\n📍 Lieu : Stade sportif Hergla\n📅 Dates : 4-6 mars 2025\n🔹 Équipes participantes :\n✅ Club sportif Hergla 🔵⚪\n✅ Club Allemand 🇩🇪⚽🟡🔵\n✅ Espoir Sportif D'Hammam Sousse ⚫🟤\n✅ Al Hilal Sportif Akouda 🔴⚪\n\n🎟️ Soyez là ! Ne manquez pas cet événement majeur du football !",
    date: "Feb 2025",
    videoUrl: "https://www.youtube.com/watch?v=9_Iuj4kkDo0",
    category: "activites, sport, Sousse",
    tags: ["activites", "sport", "Sousse", "tsv", "csh"],
  },
  {
    id: 3,
    title: "Visite de nos partenaires allemands à Bled El Arbi",
    description:
      "Nous avons conclu le séjour de nos partenaires allemands en Tunisie par une visite de la vieille ville de Sousse, dont les ruelles sont imprégnées de notre riche histoire et de notre patrimoine culturel ancestral.\n\nNous vous invitons à partager avec nous ces beaux moments et ces détails enchanteurs de ce voyage à travers cette vidéo.\n\nNous espérons que cette expérience et ce moment privilégié leur laisseront un souvenir impérissable.",
    date: "Jan 2024",
    videoUrl: "https://www.youtube.com/watch?v=GRvNyHI7JA8",
    category: "sousse, bled el Arbi, medina, partenaires",
    tags: ["sousse", "bled el Arbi", "medina", "partenaires"],
  },
  {
    id: 4,
    title: "Visite d'une délégation d'investisseurs allemands à l'UTICA Akouda",
    description:
      "Dans le cadre de l'exploration des possibilités d'investissement en Tunisie 🤝, et sous la supervision de l'Administration Générale du Développement Régional, l'équipe de Hergla Forma AVS 🇹🇳, accompagnée d'une délégation d'investisseurs allemands affiliés à l'Association Fédérale Allemande #BEM 🇩🇪, a effectué une visite le jeudi 25.01.2024 à l'Union tunisienne de l'industrie, du commerce et de l'artisanat (#UTICA Akouda). Merci à Monsieur #Ridha_Ali pour l'accueil 🙏",
    date: "Jan 2024",
    videoUrl: "https://www.youtube.com/watch?v=63HrOo_M91I",
    category: "visite, Akouda, UTICA, investisseurs",
    tags: ["visite", "Akouda", "UTICA", "investisseurs"],
  },
  {
    id: 5,
    title: "Visite d'une délégation d'investisseurs allemands au gouvernorat de Sousse",
    description:
      "Dans le cadre de la recherche d'opportunités d'investissement et de la promotion du développement, l'équipe Hergla Forma AVS 🇹🇳, accompagnée d'une délégation d'investisseurs allemands de la Fédération allemande des entreprises (BEM) 🇩🇪 et sous l'égide du Commissariat général au Développement régional, s'est rendue dans le Gouvernorat de Sousse.\n\nLors de cette visite, une réunion importante a rassemblé tous les services régionaux concernés. 💯 Nous tenons à remercier tout particulièrement M. Nabil Ferjani, Gouvernorat de Sousse 🌹, pour son accueil chaleureux et son engagement positif en faveur du renforcement de la coopération et de l'encouragement des investissements dans la région.\n\nNous adressons également nos sincères remerciements à M. Helmi Majri, Délégué de Hergla 🌟, et à M. Nizar Ghazal, Secrétaire général de la Municipalité de Hergla 🌟, pour leur soutien constant.",
    date: "Jan 2024",
    videoUrl: "https://www.youtube.com/watch?v=_MgIOa7iMEY",
    category: "visite, Sousse, investisseurs",
    tags: ["visite", "Sousse", "investisseurs"],
  },
  {
    id: 6,
    title: "Visite d'une délégation d'investisseurs allemands à FIPA Tunis",
    description:
      "Dans le cadre d'explorer les possibilités d'investissement en Tunisie 🤝 l'équipe de Hergla Forma AVS 🇹🇳, accompagnée d'une délégation d'investisseurs allemands affiliés à l'Association Fédérale Allemande #BEM 🇩🇪, a effectué une visite le mercredi 24.01.2024 à FIPA-Tunisia 💯✨ La rencontre a eu lieu en présence de M. #Jalel_Tebib le Directeur Général de #FIPA-TUNISIA, ainsi que de M. #Mhammed_Ben_Abid, Directeur Général du climat des affaires au Ministère de l'Économie et de la Planification et de M. #Fawzi_GHRAB, Directeur Général du Commissariat Général au Développement Régional (#CGDR). Nous exprimons notre gratitude pour l'accueil chaleureux🥰.",
    date: "Jan 2024",
    videoUrl: "https://www.youtube.com/watch?v=eQeDZG77wds",
    category: "Atct, FIPA, investisseurs",
    tags: ["Atct", "FIPA", "investisseurs"],
  },
  {
    id: 7,
    title: "Visite de nos partenaires au Technopôle - Novation city & ENISO Sousse",
    description:
      "Dans le cadre de la recherche d'opportunités d'investissement 🤝 et du renforcement des liens entre la Tunisie 🇹🇳 et l'Allemagne 🇩🇪, l'équipe de Hergla Forma AVS, accompagnée d'une délégation d'investisseurs allemands 🇩🇪 affiliés à l'Association Fédérale Allemande #BEM ✨💯, a effectué une visite le mercredi 24.01.2024 aux entreprises et startups situées au Technopôle de Sousse, Novation City, ainsi qu'à l'ENISo - École Nationale d'ingénieurs de Sousse 👩‍🎓🧑‍🎓 Merci pour l'accueil chaleureux 🌹 et les échanges fructueux lors de cette visite ✈",
    date: "Jan 2024",
    videoUrl: "https://www.youtube.com/watch?v=1Nm8V_9kJdg",
    category: "Novation city, ENISO, Sousse",
    tags: ["Novation city", "ENISO", "Sousse"],
  },
  {
    id: 8,
    title: "Visite de nos partenaires allemands à la FSEG & à l'ISET Sousse",
    description:
      "Dans le cadre de la recherche d'opportunités d'investissement et de la stimulation du développement en Tunisie 🇹🇳, l'équipe Hergla Forma AVS, accompagnée d'une délégation d'investisseurs allemands 🇩🇪 de l'Association fédérale allemande #BEM ✨💯, une association regroupant des professionnels et des chefs d'entreprise des industries mécanique, électronique et électrique 👨‍💼👩‍💼, a visité plusieurs institutions universitaires pertinentes à Sousse, notamment l'Institut supérieur d'études technologiques 🧑‍🔧👩‍🎓 et la Faculté des sciences économiques et de gestion 👨‍🎓 (FSEG Sousse).",
    date: "Jan 2024",
    videoUrl: "https://www.youtube.com/watch?v=C433Ned8TSY",
    category: "FSEG, ISET, Sousse",
    tags: ["FSEG", "ISET", "Sousse"],
  },
  {
    id: 9,
    title: "Convention de partenariat Sportif entre CSH Hergla et le club allemand TSV",
    description:
      "Grâce à la fructueuse collaboration entre le Centre d'entraînement Hergla Forma AVS 🤝 et M. Udo Klausnitzer 🤝 🇩🇪, nous sommes fiers d'annoncer la signature d'un accord de partenariat 📄🖋 le mardi 23 janvier 2024 entre le Hergla Sports Club CSH 🇹🇳 et le club allemand TSV Rechertsoven 🇩🇪.\n\nCette initiative renforce les liens culturels et sportifs entre les deux équipes. 🥰\n\nMerci à tous les membres et partenaires qui ont contribué à cette belle réussite sportive. 🌹\n\nNous adressons nos sincères remerciements à M. Habib Abbassi 🌹, président du Hergla Sports Club ⚽️, à M. Nizar Ghazal et à M. Helmi Majri, pour leur excellente organisation et leur accueil chaleureux. 🙏😍\n\nNous tenons également à remercier tout particulièrement M. Ali Nouira et M. Fathi Boussadia pour nous avoir fourni d'anciennes photos du club issues des archives 📸, qui ont apporté une magnifique touche historique à nos événements. 🙏🌹",
    date: "Jan 2024",
    videoUrl: "https://www.youtube.com/watch?v=rjtF-F6P080",
    category: "CSH, TSV, activites, sport, Hergla",
    tags: ["CSH", "TSV", "activites", "sport", "Hergla"],
  },
  {
    id: 10,
    title: "Journée ouverte à la faculté des sciences économiques et de gestion FSEG",
    description:
      "En partenariat avec la Faculté des sciences économiques et de gestion (FSEG) de Sousse, le Bureau de l'emploi à l'étranger 🇩🇪 #IF_Group, et en collaboration avec Tunisair 🇹🇳, le Centre de formation en langues allemandes et modernes Hergla Forma AVS a organisé une journée portes ouvertes 💯✨ où les opportunités d'études, de formation et de travail en Allemagne ont été présentées 👩‍🏫✈",
    date: "Nov 2023",
    videoUrl: "https://www.youtube.com/watch?v=WBQAJvXTK-k",
    category: "FSEG, faculté",
    tags: ["FSEG", "faculté"],
  },
  {
    id: 11,
    title: "Ministère de l'Economie et de la Planification",
    description:
      "Sous la supervision du ministère de l'Économie et de la Planification, et à la suite d'une session visant à explorer les possibilités de coopération germano-tunisienne à la Délégation générale pour le développement, et à promouvoir davantage le développement durable aux niveaux national, régional et local en Tunisie 🇹🇳, et en reconnaissance du rôle vital des nouvelles générations et de la jeunesse dans tous les domaines du développement et du progrès des nations, cette session s'est concentrée sur plusieurs sujets connexes. 🥰\n\nEn partenariat avec la Faculté des Sciences Économiques et de Gestion de Sousse (FSEG Sousse), le Club Sportif Hergla et le Centre de Formation Hergla Forma AVS, et en collaboration avec l'agence de recrutement allemande #IF_Group 💙\n\nNous sommes ravis d'annoncer la préparation de plusieurs activités, notamment un événement sportif exceptionnel intitulé « #Semaine #Sportive #Tunisienne #Allemande » 🇹🇳 🇩🇪\n\nCet événement proposera des compétitions passionnantes et divers tournois 🏆 dans plusieurs disciplines, dont le football ⚽️, le handball 🏐, le basketball 🏀 et d'autres sports ⛹️‍♂️\n\nRestez connectés pour plus d'informations sur cette semaine sportive spéciale 🤾‍♂️🎖",
    date: "Oct 2023",
    videoUrl: "https://www.youtube.com/watch?v=4mvx3z2p7ng",
    category: "Ministère, planification",
    tags: ["Ministère", "planification"],
  },
  {
    id: 12,
    title: "Coulisse Radio Monastir FM - Podcast avec Ekbeil Ben Lamine",
    description:
      "Mme Iqbal Al-Amin, directrice du centre de formation AVS FORMA, a présenté un aperçu des possibilités offertes aux Tunisiens souhaitant immigrer en Allemagne lors de son intervention sur Radio Monastir.\n\nElle a notamment mis en avant les nouvelles lois encourageant l'immigration de travailleurs qualifiés, ainsi que le potentiel de croissance des investissements allemands en Tunisie.",
    date: "Sep 2023",
    videoUrl: "https://www.youtube.com/watch?v=2kX7f9ma2G0&t=6s",
    category: "radio, monastir, podcast",
    tags: ["radio", "monastir", "podcast"],
  },
  {
    id: 13,
    title: "Watania TV - Projet de partenariat public-privé pour l'enseignement de l'allemand",
    description:
      "Académie nationale de Tunisie : Projet de partenariat public-privé pour l'enseignement de l'allemand, Faculté des sciences économiques et de gestion de Sousse et Centre de formation Hergla Forma AVS 😍",
    date: "Sep 2023",
    videoUrl: "https://www.youtube.com/watch?v=JBr01E-YfSg",
    category: "Watania TV, emission",
    tags: ["Watania TV", "emission"],
  },
  {
    id: 14,
    title: "Partenariat Éducatif entre AVS FORMA et FSEG Sousse",
    description:
      "L'équipe du Centre de formation AVS Forma est heureuse d'annoncer que, dans le cadre de ses efforts continus pour améliorer la qualité de l'enseignement et de l'apprentissage de l'allemand en Tunisie 💙 et faciliter l'insertion professionnelle des diplômés de l'enseignement supérieur sur le marché du travail allemand, un accord de partenariat modèle a été élaboré en collaboration avec la Faculté d'économie et de gestion de Sousse. Cet accord prévoit l'intégration de l'allemand comme cours optionnel dans le cursus de la faculté, sous la supervision de la Direction régionale de la formation professionnelle et de l'emploi de Sousse et du ministère de l'Enseignement supérieur.\n\nNous remercions chaleureusement tous ceux qui ont contribué au succès de ce projet exemplaire, et plus particulièrement le doyen de la faculté, le professeur Anis Bouabid, le professeur Sadek Tbib et l'ensemble du personnel enseignant pour leur accueil chaleureux et leur engagement constant en faveur de l'amélioration du système éducatif tunisien. 🇹🇳🇩🇪",
    date: "Aug 2023",
    videoUrl: "https://www.youtube.com/watch?v=pglDMZJHRzk",
    category: "Educatif, FSEG, Sousse",
    tags: ["Educatif", "FSEG", "Sousse"],
  },
  {
    id: 15,
    title: "Visite de nos partenaires Allemand à la Tunisie",
    description:
      "Points forts de notre visite en Tunisie 🇹🇳 avec nos partenaires allemands 🇩🇪 : plusieurs centres de formation professionnelle 👨‍🔧👩‍🔧 dans différentes régions, ainsi que le centre de formation professionnelle AVS Forma 💙💙\n\nPour ceux qui ont manqué le programme du soir du Ramadan 🇩🇪 🛬 🇹🇳, vous pouvez en voir quelques moments forts ici 🤩😍👇",
    date: "Apr 2023",
    videoUrl: "https://www.youtube.com/watch?v=W_08OeK0UkM",
    category: "Visite",
    tags: ["Visite"],
  },
  {
    id: 16,
    title: "Comment aider le chômeur a trouver un travail ?",
    description:
      "Une réunion d'information sur l'expertise tunisienne s'est tenue au siège du Land à Pfaffenhofen, en Bavière, Allemagne 🤩\n\nCette réunion, qui a eu lieu le vendredi 25 mars 2022, a réuni M. Mohsen Sebaï, consul de Tunisie à Munich, ✨ M. Albert Gürtna, gouverneur du Land de Pfaffenhofen, ✨\n\nM. Schlegel Felter, directeur de l'Office pour la migration et l'intégration, ✨\n\nM. Johannes Höfner, président de l'Association des institutions publiques et privées, ✨\n\nM. Bernd Duchner, président de l'Association d'amitié germano-bavaroise, ✨\n\nM. Wanata Pürzen, responsable de la formation dans les hôpitaux et le secteur de la santé, ✨",
    date: "Apr 2023",
    videoUrl: "https://www.youtube.com/watch?v=_jS2naQhcas",
    category: "Information",
    tags: ["Information"],
  },
  {
    id: 17,
    title: "A7la Lamma - Watania TV",
    description:
      "Intervention de Mme Iqbal Al-Amin dans le programme « Ahla Lama Ali Al-Watania ». Bon suivi ❤",
    date: "Apr 2021",
    videoUrl: "https://www.youtube.com/watch?v=mQFdrQSDa4M",
    category: "Tv, emission, a7lalamma",
    tags: ["Tv", "emission", "a7lalamma"],
  },
  {
    id: 18,
    title: "Radio Zitouna - Intervention de Mme Iqbal Al-Amin",
    description:
      "Intervention de Mme Iqbal Al-Amin sur Radio Al-Zaytouna : Une femme qui réussit dans son travail rencontre-t-elle des obstacles (professionnels ou familiaux) ? Et quelles sont les répercussions de cette réussite sur la famille ?",
    date: "Apr 2021",
    videoUrl: "https://www.youtube.com/watch?v=DyycCfwyfvY",
    category: "Radio",
    tags: ["Radio"],
  },
  {
    id: 19,
    title: "Carthage TV - Zina ghasrenia",
    description: "Zina ghasrenia",
    date: "Apr 2021",
    videoUrl: "https://www.youtube.com/watch?v=VOmlKKCcIgM",
    category: "Emission, tv",
    tags: ["Emission", "tv"],
  },
  {
    id: 20,
    title: "Radio Monastir FM - Donation",
    description: "",
    date: "Nov 2021",
    videoUrl: "https://www.youtube.com/watch?v=Z-U4pgkSW4Q&t=162s",
    category: "Radio, Personal, donation",
    tags: ["Radio", "Personal", "donation"],
  },
  {
    id: 21,
    title: "Watania TV - Donation CORONA",
    description: "",
    date: "Jun 2020",
    videoUrl: "https://www.youtube.com/watch?v=rSW069gy0A8",
    category: "TV, donation, CORONA",
    tags: ["TV", "donation", "CORONA"],
  },
  {
    id: 22,
    title: "Knooz FM - Iqbal Lamine parle de l'initiative",
    description:
      "Iqbal Lamine, propriétaire du centre de formation « AFS Forma », nous parle de cette initiative.",
    date: "May 2020",
    videoUrl: "https://www.youtube.com/watch?v=9AyymeYiNh4",
    category: "Radio, Corona",
    tags: ["Radio", "Corona"],
  },
  {
    id: 23,
    title: "Arabia News - Les réfugiés d'Europe... le rêve allemand",
    description: "Les réfugiés d'Europe... le rêve allemand 🌍",
    date: "Oct 2020",
    videoUrl: "https://www.youtube.com/watch?v=86niUHuTxmA",
    category: "Tv",
    tags: ["Tv"],
  },
  {
    id: 24,
    title: "Watania Tv - 2020",
    description: "",
    date: "May 2020",
    videoUrl: "https://www.youtube.com/watch?v=Gbzab_M2Cos",
    category: "Tv",
    tags: ["Tv"],
  },
  {
    id: 25,
    title: "Maghreb voices - Une Tunisienne aide les réfugiés",
    description:
      "Une Tunisienne aide les réfugiés à s'intégrer dans la société allemande 🌍",
    date: "Mar 2019",
    videoUrl: "https://www.youtube.com/watch?v=2ZkzLCr1C_A",
    category: "TV",
    tags: ["TV"],
  },
  {
    id: 26,
    title: "Al Janoubia TV - Coopération tuniso-allemande",
    description:
      "Le gouvernement bavarois accorde une priorité aux pays du Maghreb, et la Tunisie est toujours au premier plan.\n\nDébut de la coopération tuniso-allemande dans le domaine de la formation et de l'emploi. ❣🌎\nLa Tunisie est plus belle grâce à nous ! ❣",
    date: "Nov 2019",
    videoUrl: "https://www.youtube.com/watch?v=76TLGKb9898",
    category: "Tv",
    tags: ["Tv"],
  },
  {
    id: 27,
    title: "Radio Marina - L'Allemagne a besoin de 600 000 travailleurs qualifiés",
    description:
      "L'Allemagne a besoin de 600 000 travailleurs qualifiés par an à partir de 2020.\n\nAvec AVS, votre avenir est assuré.\n\nLe gouvernement allemand a approuvé une loi autorisant les travailleurs qualifiés à rechercher un emploi.\n\nCette loi a été adoptée après trente ans de débats.\n\nElle vise à attirer les travailleurs qualifiés et les titulaires de certificats de formation professionnelle.\n\nAuparavant, tous les travailleurs qualifiés non européens n'étaient pas autorisés à travailler en Allemagne. La priorité était donnée aux ressortissants de l'Union européenne. Cette condition est désormais supprimée.\n\nL'Allemagne a un besoin urgent de main-d'œuvre qualifiée.\n\nPendant les six mois de recherche d'emploi, les demandeurs d'emploi doivent être autonomes financièrement, car ils ne recevront aucune aide de l'État.\n\nIls peuvent également effectuer une période d'essai de 10 heures par semaine.\n\nS'ils trouvent un emploi pendant cette période, ils peuvent signer un contrat de travail et obtenir un titre de séjour de quatre ans. La principale condition est la maîtrise de l'allemand. Par conséquent, les candidats doivent apprendre l'allemand dans leur pays d'origine et atteindre le niveau B2.\n\nÀ partir de 2020, l'Allemagne aura besoin de 600 000 travailleurs par an.",
    date: "Jan 2019",
    videoUrl: "https://www.youtube.com/watch?v=jWsnlQyVt0Y",
    category: "Radio",
    tags: ["Radio"],
  },
];

// Group videos by year
function groupVideosByYear(videos: typeof YOUTUBE_VIDEOS) {
  const grouped: Record<number, typeof YOUTUBE_VIDEOS> = {};
  
  videos.forEach(video => {
    let year = 0;
    
    // Extract year from date string
    if (video.date.includes("2025")) year = 2025;
    else if (video.date.includes("2024")) year = 2024;
    else if (video.date.includes("2023")) year = 2023;
    else if (video.date.includes("2022")) year = 2022;
    else if (video.date.includes("2021")) year = 2021;
    else if (video.date.includes("2020")) year = 2020;
    else if (video.date.includes("2019")) year = 2019;
    
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(video);
  });
  
  // Sort years descending
  return Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a)
    .map(year => ({
      year,
      items: grouped[year],
    }));
}

const MEDIA_COVERAGE = groupVideosByYear(YOUTUBE_VIDEOS);

// Video Item Component
function VideoItem({
  video,
}: {
  video: typeof YOUTUBE_VIDEOS[0];
}) {
  // Extract video ID from YouTube URL
  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Thumbnail */}
        <div className="flex-shrink-0 md:w-56">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-container-low">
            <iframe
              src={getYouTubeEmbedUrl(video.videoUrl)}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-headline-md text-primary text-base md:text-lg">
              {video.title}
            </h3>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-on-surface-variant">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {video.date}
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex flex-wrap gap-1">
              {video.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-brand-ice/50 text-brand-imperial rounded-full text-xs">
                  #{tag}
                </span>
              ))}
            </span>
          </div>
          
          <p className="font-body-md text-on-surface-variant text-sm leading-relaxed line-clamp-3">
            {video.description}
          </p>
          
          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-secondary font-label-md text-sm hover:gap-2 transition-all"
          >
            Voir la vidéo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

// Year Section Component
function YearSection({
  year,
  items,
  isOpen,
  onToggle,
}: {
  year: number;
  items: typeof YOUTUBE_VIDEOS;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div 
      id={`year-${year}`}
      className="border rounded-2xl border-outline-variant/30 bg-surface-container-lowest overflow-hidden transition-all duration-300 hover:border-outline-variant/60 scroll-mt-24"
    >
      {/* Year Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-surface-container-low transition-colors"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <span className="font-display-lg text-brand-imperial text-2xl md:text-3xl">
            {year}
          </span>
          <span className="text-xs md:text-sm text-on-surface-variant">
            {items.length} vidéo{items.length > 1 ? "s" : ""}
          </span>
          <span className={`w-2 h-2 rounded-full ${items.length > 0 ? 'bg-secondary' : 'bg-outline-variant'}`}></span>
        </div>
        <svg
          className={`w-5 h-5 md:w-6 md:h-6 text-on-surface-variant transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Year Content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 md:px-6 pb-4 md:pb-6 space-y-3 md:space-y-4">
          {items.map((video) => (
            <VideoItem key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Year Navigation Component
function YearNavigation({
  years,
  activeYear,
  onYearClick,
}: {
  years: number[];
  activeYear: number | null;
  onYearClick: (year: number) => void;
}) {
  return (
    <div className="sticky top-24 self-start bg-white/80 backdrop-blur-sm rounded-2xl border border-outline-variant/30 p-4 shadow-lg">
      <h4 className="font-label-md text-on-surface-variant text-xs uppercase tracking-wider mb-3 text-center">
        Années
      </h4>
      <div className="flex flex-col gap-1">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onYearClick(year)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 text-left ${
              activeYear === year
                ? "bg-secondary text-white font-bold shadow-md"
                : "text-on-surface-variant hover:bg-surface-container-low hover:text-secondary"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}

// Media Statistics Component
function MediaStats() {
  const totalVideos = YOUTUBE_VIDEOS.length;
  const totalYears = MEDIA_COVERAGE.length;
  
  // Get unique categories
  const allCategories = YOUTUBE_VIDEOS.flatMap(v => v.tags);
  const uniqueCategories = [...new Set(allCategories)];
  const categoryCount = uniqueCategories.length;

  const stats = [
    { value: `${totalVideos}+`, label: "Vidéos", icon: "📹" },
    { value: totalYears, label: "Années de couverture", icon: "📅" },
    { value: categoryCount, label: "Thèmes abordés", icon: "🏷️" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-4 md:p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30"
        >
          <div className="text-2xl md:text-3xl mb-2">{stat.icon}</div>
          <div className="font-display-lg text-secondary text-xl md:text-2xl">
            {stat.value}
          </div>
          <div className="text-caption text-on-surface-variant mt-1 font-medium uppercase tracking-wider text-xs md:text-sm">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PressePage() {
  // Only the first year is open by default
  const [openYear, setOpenYear] = useState<number | null>(MEDIA_COVERAGE[0]?.year || null);
  const [activeYear, setActiveYear] = useState<number | null>(MEDIA_COVERAGE[0]?.year || null);
  const [isScrolling, setIsScrolling] = useState(false);
  const yearRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const toggleYear = (year: number) => {
    if (openYear === year) {
      setOpenYear(null);
    } else {
      setOpenYear(year);
    }
  };

  const scrollToYear = (year: number) => {
    const element = yearRefs.current[year];
    if (element) {
      setOpenYear(null);
      setActiveYear(year);
      setIsScrolling(true);
      
      setTimeout(() => {
        setOpenYear(year);
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        
        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      }, 150);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isScrolling) {
            const year = parseInt(entry.target.id.replace('year-', ''));
            setActiveYear(year);
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
      }
    );

    Object.values(yearRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isScrolling]);

  const years = MEDIA_COVERAGE.map((data) => data.year);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 md:pt-40 md:pb-8 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-brand-imperial blur-3xl"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="flex-1 max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                  YouTube Channel
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                  Galerie Vidéos
                </span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                Galerie Vidéos
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed">
                Découvrez notre chaîne YouTube avec des vidéos couvrant nos activités, événements, 
                partenariats et apparitions médiatiques de 2019 à 2025.
              </p>
            </div>

            {/* Right Image */}
            <div className="flex-1 max-w-md lg:max-w-lg">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-imperial/20 to-secondary/20 mix-blend-overlay"></div>
                <img
                  src="https://blog.hootsuite.com/wp-content/uploads/2016/04/video-marketing1-1.jpg"
                  alt="Galerie Vidéos - YouTube Channel"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='24' font-weight='bold'%3E🎬 Vidéos%3C/text%3E%3C/svg%3E";
                  }}
                />
                {/* Decorative badge on image */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 text-sm">▶</span>
                    <span className="text-xs font-medium text-on-surface">Voir nos vidéos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg">
        {/* Statistics */}
        <div className="mb-12 md:mb-16">
          <MediaStats />
        </div>

        {/* Videos by Year with Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Content */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 md:mb-6">
              <h2 className="font-headline-lg text-brand-imperial text-xl md:text-2xl">
                Vidéos par Année
              </h2>
              <span className="text-xs md:text-sm text-on-surface-variant">
                {MEDIA_COVERAGE.length} années • {YOUTUBE_VIDEOS.length} vidéos
              </span>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              {MEDIA_COVERAGE.map((yearData) => (
                <div
                  key={yearData.year}
                  ref={(el) => {
                    yearRefs.current[yearData.year] = el;
                  }}
                  id={`year-${yearData.year}`}
                >
                  <YearSection
                    year={yearData.year}
                    items={yearData.items}
                    isOpen={openYear === yearData.year}
                    onToggle={() => toggleYear(yearData.year)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Sidebar */}
          <div className="hidden lg:block">
            <YearNavigation
              years={years}
              activeYear={activeYear}
              onYearClick={scrollToYear}
            />
          </div>
        </div>

        {/* Mobile Year Navigation */}
        <div className="lg:hidden mt-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => scrollToYear(year)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 ${
                  activeYear === year
                    ? "bg-secondary text-white font-bold shadow-md"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-secondary"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Purpose Section */}
        <div className="mt-12 md:mt-16 p-6 md:p-8 rounded-2xl bg-surface-container-low border border-outline-variant/30">
          <h3 className="font-headline-md text-brand-imperial mb-4 text-lg md:text-xl">
            Pourquoi cette section ?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {[
              "Mettre en avant nos activités et événements",
              "Partager nos partenariats et collaborations",
              "Valoriser notre présence médiatique",
              "Témoigner de notre engagement envers la communauté",
            ].map((purpose, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs md:text-sm text-on-surface-variant">
                  {purpose}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}