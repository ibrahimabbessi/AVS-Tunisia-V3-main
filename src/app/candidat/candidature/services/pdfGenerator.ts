// src/app/candidature/services/pdfGenerator.ts
import { Candidate } from '../types';
import jsPDF from 'jspdf';

// ============================================================
// CONSTANTS — Match template styling
// ============================================================
const COLORS = {
  primary: [0, 51, 102] as [number, number, number],      // Dark blue (header)
  red: [200, 0, 0] as [number, number, number],            // Red separator line
  gray: [120, 120, 120] as [number, number, number],       // Gray text
  lightGray: [220, 220, 220] as [number, number, number],  // Table borders
  black: [0, 0, 0] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
};

const FONT_SIZES = {
  title: 16,
  sectionHeader: 12,
  subHeader: 10,
  body: 9,
  small: 8,
  tiny: 7,
};

// ============================================================
// HELPERS
// ============================================================

const formatDate = (date?: string): string => {
  if (!date) return '-';
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return date;
    return d.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return date || '-';
  }
};

const getLanguageLevelLabel = (level: string): string => {
  const map: Record<string, string> = {
    native: 'Muttersprache',
    fluent: 'Fließend',
    advanced: 'Fortgeschritten (C1/C2)',
    intermediate: 'Mittelstufe (B1/B2)',
    beginner: 'Anfänger (A1/A2)',
  };
  return map[level] || level || '-';
};

const getGenderLabel = (gender: string): string => {
  const map: Record<string, string> = {
    male: 'Männlich / Masculin',
    female: 'Weiblich / Féminin',
    diverse: 'Divers / Divers',
  };
  return map[gender] || gender || '-';
};

const getMaritalStatusLabel = (status: string): string => {
  const map: Record<string, string> = {
    single: 'Ledig / Célibataire',
    married: 'Verheiratet / Marié(e)',
    divorced: 'Geschieden / Divorcé(e)',
    widowed: 'Verwitwet / Veuf(ve)',
  };
  return map[status] || status || '-';
};

const yesNo = (value: boolean | undefined): string => {
  if (value === undefined || value === null) return '-';
  return value ? 'Ja / Oui' : 'Nein / Non';
};

// ============================================================
// MAIN GENERATOR
// ============================================================

export const generatePDF = async (data: Candidate): Promise<Blob> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;
  let currentPage = 1; // ✅ Manual page counter
  const lineHeight = 5.5;

  // ----------------------------------------------------------
  // LAYOUT HELPERS
  // ----------------------------------------------------------

  const addFooter = () => {
    const footerY = pageHeight - 10;
    doc.setDrawColor(...COLORS.red);
    doc.setLineWidth(0.5);
    doc.line(margin, footerY - 3, pageWidth - margin, footerY - 3);
    doc.setLineWidth(0.2);
    doc.setFontSize(FONT_SIZES.tiny);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.gray);
    doc.text('AVS Forma Team – © Alle Rechte vorbehalten', margin, footerY);
    // ✅ Use manual page counter
    doc.text(`Seite / Page ${currentPage}`, pageWidth - margin, footerY, { align: 'right' });
    doc.setTextColor(...COLORS.black);
  };

  const checkPageBreak = (needed: number = 10): boolean => {
    if (y + needed > pageHeight - margin - 10) {
      addFooter();
      doc.addPage();
      currentPage++; // ✅ Increment page counter
      y = margin;
      addPageHeader();
      return true;
    }
    return false;
  };

  const addPageHeader = () => {
    doc.setFontSize(FONT_SIZES.small);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(...COLORS.gray);
    doc.text('AVS Forma – Bewerberfragebogen / Questionnaire pour les candidats', margin, y);
    y += lineHeight;
    doc.setDrawColor(...COLORS.lightGray);
    doc.line(margin, y, pageWidth - margin, y);
    y += lineHeight;
    doc.setTextColor(...COLORS.black);
  };

  const addSectionHeader = (de: string, fr: string) => {
    checkPageBreak(12);
    doc.setFontSize(FONT_SIZES.sectionHeader);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.primary);
    doc.text(de, margin, y);
    y += lineHeight;
    doc.setFontSize(FONT_SIZES.small);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(...COLORS.gray);
    doc.text(fr, margin, y);
    y += lineHeight;
    doc.setDrawColor(...COLORS.red);
    doc.setLineWidth(0.4);
    doc.line(margin, y, pageWidth - margin, y);
    doc.setLineWidth(0.2);
    y += lineHeight;
    doc.setFontSize(FONT_SIZES.body);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.black);
  };

  const addSubHeader = (text: string) => {
    checkPageBreak(8);
    doc.setFontSize(FONT_SIZES.subHeader);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.primary);
    doc.text(text, margin, y);
    y += lineHeight;
    doc.setFontSize(FONT_SIZES.body);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.black);
  };

  const addField = (
    labelDe: string,
    labelFr: string,
    value: string | number | boolean | undefined,
    indent: number = 0
  ) => {
    checkPageBreak(6);
    const display =
      value === undefined || value === null || value === '' ? '-' : String(value);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(FONT_SIZES.body);
    doc.text(`${labelDe} / ${labelFr}:`, margin + indent, y);
    const labelWidth = doc.getTextWidth(`${labelDe} / ${labelFr}:`);
    doc.setFont('helvetica', 'normal');
    doc.text(display, margin + indent + labelWidth + 2, y);
    y += lineHeight;
  };

  const addMultiLineField = (
    labelDe: string,
    labelFr: string,
    value: string | undefined,
    indent: number = 0
  ) => {
    if (!value) return;
    checkPageBreak(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(FONT_SIZES.body);
    doc.text(`${labelDe} / ${labelFr}:`, margin + indent, y);
    y += lineHeight;
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(value, contentWidth - indent - 4);
    for (const line of lines) {
      checkPageBreak(5);
      doc.text(line, margin + indent + 3, y);
      y += lineHeight;
    }
  };

  const addBullet = (text: string, indent: number = 4) => {
    checkPageBreak(5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(FONT_SIZES.body);
    const lines = doc.splitTextToSize(text, contentWidth - indent - 6);
    doc.text('•', margin + indent, y);
    for (let i = 0; i < lines.length; i++) {
      if (i > 0) checkPageBreak(5);
      doc.text(lines[i], margin + indent + 4, y);
      y += lineHeight;
    }
  };

  const addCheckbox = (
    labelDe: string,
    labelFr: string,
    checked: boolean,
    indent: number = 0
  ) => {
    checkPageBreak(6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(FONT_SIZES.body);
    const box = checked ? '☑' : '☐';
    doc.text(`${box}  ${labelDe} / ${labelFr}`, margin + indent, y);
    y += lineHeight;
  };

  // ----------------------------------------------------------
  // TITLE BLOCK
  // ----------------------------------------------------------
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, pageWidth, 25, 'F');
  doc.setTextColor(...COLORS.white);
  doc.setFontSize(FONT_SIZES.title);
  doc.setFont('helvetica', 'bold');
  doc.text('BEWERBERFRAGEBOGEN', pageWidth / 2, 12, { align: 'center' });
  doc.setFontSize(FONT_SIZES.subHeader);
  doc.setFont('helvetica', 'normal');
  doc.text('Questionnaire pour les candidats potentiels', pageWidth / 2, 19, {
    align: 'center',
  });
  doc.setTextColor(...COLORS.black);
  y = 32;

  // Generated date
  doc.setFontSize(FONT_SIZES.small);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...COLORS.gray);
  doc.text(
    `Generiert am / Généré le: ${new Date().toLocaleDateString('de-DE')}`,
    pageWidth - margin,
    y,
    { align: 'right' }
  );
  y += lineHeight;
  doc.setTextColor(...COLORS.black);

  // ============================================================
  // 1. PERSONAL INFORMATION
  // ============================================================
  addSectionHeader('1. PERSÖNLICHE ANGABEN', 'Informations personnelles');
  const p = data.personal || ({} as any);
  addField('Vorname', 'Prénom', p.firstName);
  addField('Nachname', 'Nom de famille', p.lastName);
  addField('Geburtsdatum', 'Date de naissance', formatDate(p.birthDate));
  addField('Geburtsort', 'Lieu de naissance', p.birthPlace);
  addField('Geschlecht', 'Sexe', getGenderLabel(p.gender));
  addField('Familienstand', 'Situation familiale', getMaritalStatusLabel(p.maritalStatus));
  addField(
    'Kinder',
    'Enfants',
    p.hasChildren ? `Ja / Oui (${p.numberOfChildren || 0})` : 'Nein / Non'
  );
  addField('Staatsangehörigkeit', 'Nationalité', p.nationality);
  addField('Beitrittsdatum', "Date d'adhésion", formatDate(p.joinDate || ''));
  y += lineHeight / 2;

  // ============================================================
  // 2. CONTACT
  // ============================================================
  addSectionHeader('2. KONTAKT', 'Coordonnées');
  const c = data.contact || ({} as any);
  addField('Adresse (Straße)', 'Adresse (Rue)', c.address);
  addField('Postleitzahl', 'Code postal', c.postalCode);
  addField('Stadt', 'Ville', c.city);
  addField('Land', 'Pays', c.country);
  addField('Telefonnummer', 'Téléphone', c.phone);
  addField('Mailadresse', 'Email', c.email);
  addField('Skypeadresse', 'Skype', c.skype);
  addField('Verfügbar ab', 'Disponible à partir de', formatDate(c.availableFrom));
  y += lineHeight / 2;

  // ============================================================
  // 3. GENERAL QUESTIONS
  // ============================================================
  addSectionHeader('3. ALLGEMEINE FRAGEN', 'Questions générales');
  const g = data.germany || ({} as any);

  addField('Familie in Deutschland', 'Famille en Allemagne', yesNo(g.familyInGermany));
  if (g.familyInGermany && g.familyInGermanyDetails) {
    addBullet(g.familyInGermanyDetails, 6);
  }
  addField('Freunde in Deutschland', 'Amis en Allemagne', yesNo(g.friendsInGermany));
  if (g.friendsInGermany && g.friendsInGermanyDetails) {
    addBullet(g.friendsInGermanyDetails, 6);
  }

  y += 2;
  addSubHeader('Visa / Visa');
  addField('Schon einmal Visa beantragt?', 'Déjà demandé un visa ?', yesNo(g.previousVisaApplication));
  if (g.previousVisaApplication) {
    addField('Welche Visa Art', 'Quel type de visa', g.visaType, 6);
    addField(
      'Ablehnung / Erfolg',
      'Refus / réussite',
      g.visaResult === 'denied'
        ? 'Abgelehnt / Refusé'
        : g.visaResult === 'granted'
        ? 'Erfolg / Réussi'
        : '-',
      6
    );
    addField(
      'Wann / Datum',
      'Quand / date',
      `${formatDate(g.visaDate || '')} bis / à ${formatDate(g.visaDateUntil || '')}`,
      6
    );
  }

  y += 2;
  addSubHeader('Frühere Aufenthalte in Deutschland / Séjours antérieurs en Allemagne');
  addField('Aufenthalt gehabt?', 'Avez-vous séjourné ?', yesNo(g.previousStay));
  if (g.previousStay) {
    addField('Details', 'Détails', g.previousStayDetails, 6);
    // Use stays array for detailed info
    if (g.stays && g.stays.length > 0) {
      for (const stay of g.stays) {
        addBullet(`${stay.city || '-'} | ${stay.duration || '-'} | ${stay.purpose || '-'}`, 6);
      }
    }
    if (g.previousStayVisaType) {
      addField('Welche Visa Art', 'Quel type de visa', g.previousStayVisaType, 6);
    }
  }

  y += 2;
  addSubHeader('Andere Vermittlungsagentur / Autre agence de placement');
  addField(
    'Bei anderer Agentur beworben?',
    "Postulé auprès d'une autre agence ?",
    yesNo(g.appliedToOtherAgency)
  );
  if (g.appliedToOtherAgency) {
    addField('Welche Agentur', 'Quelle agence', g.otherAgencyName, 6);
    addField('Wann', 'Quand', formatDate(g.otherAgencyDate || ''), 6);
  }
  y += lineHeight / 2;

  // ============================================================
  // 4. LANGUAGE PROFICIENCY
  // ============================================================
  addSectionHeader('4. SPRACHKENNTNISSE', 'Niveau de langue');
  const langs = data.languages || ({} as any);
  const langMap: Array<{ key: keyof typeof langs; de: string; fr: string }> = [
    { key: 'german', de: 'Deutsch', fr: 'Allemand' },
    { key: 'french', de: 'Französisch', fr: 'Français' },
    { key: 'english', de: 'Englisch', fr: 'Anglais' },
    { key: 'spanish', de: 'Spanisch', fr: 'Espagnol' },
    { key: 'italian', de: 'Italienisch', fr: 'Italien' },
  ];

  for (const { key, de, fr } of langMap) {
    const lang = langs[key] as { level: string; certificate?: string } | undefined;
    if (lang && lang.level) {
      const cert = lang.certificate ? ` (Zertifikat / Certificat: ${lang.certificate})` : '';
      addField(de, fr, `${getLanguageLevelLabel(lang.level)}${cert}`, 4);
    }
  }

  if (langs.other && langs.other.length > 0) {
    addSubHeader('Sonstige Sprachkenntnisse / Autres langues');
    for (const l of langs.other) {
      if (l.name) addField(l.name, l.name, getLanguageLevelLabel(l.level), 4);
    }
  }

  y += 2;
  addSubHeader("Deutsch Unterricht / Cours d'allemand");
  const gc = langs.germanCourse;
  if (gc && (gc.schoolName || gc.city)) {
    addField('Name der Sprachschule', "Nom de l'école de langue", gc.schoolName, 4);
    addField('Stadt', 'Ville', gc.city, 4);
    addField(
      'Wann',
      'Quand',
      `${formatDate(gc.startDate)} bis / à ${formatDate(gc.endDate)}`,
      4
    );
  } else {
    addBullet('Keine Angaben / Aucune information', 4);
  }

  if (langs.otherNotes) {
    addMultiLineField('Sonstiges', 'Autres', langs.otherNotes, 4);
  }
  y += lineHeight / 2;

  // ============================================================
  // 5. SCHOOL EDUCATION
  // ============================================================
  addSectionHeader('5. SCHULBILDUNG', 'Éducation scolaire');
  if (data.schoolEducation && data.schoolEducation.length > 0) {
    for (const edu of data.schoolEducation) {
      addSubHeader(edu.schoolName || '-');
      addField('Typ', 'Type', edu.type, 4);
      addField('Stadt', 'Ville', edu.location, 4);
      addField(
        'Zeitraum',
        'Période',
        `${formatDate(edu.startDate)} bis / à ${formatDate(edu.endDate)}`,
        4
      );
      if (edu.degree) addField('Abschluss', 'Diplôme', edu.degree, 4);
      if (edu.abiturSubject) addField('Abitur Fach', 'Spécialité Abitur', edu.abiturSubject, 4);
      if (edu.abiturYear) addField('Abitur Jahr', 'Année Abitur', edu.abiturYear, 4);
      y += lineHeight / 2;
    }
  } else {
    addBullet('Keine Angaben / Aucune information');
  }

  // ============================================================
  // 6. VOCATIONAL EDUCATION
  // ============================================================
  addSectionHeader('6. BERUFSAUSBILDUNG', 'Formation professionnelle');
  if (data.vocationalEducation && data.vocationalEducation.length > 0) {
    for (const edu of data.vocationalEducation) {
      addSubHeader(edu.profession || '-');
      addField('Institut', 'Institut', edu.institution, 4);
      addField('Stadt', 'Ville', edu.location, 4);
      addField(
        'Zeitraum',
        'Période',
        `${formatDate(edu.startDate)} bis / à ${formatDate(edu.endDate)}`,
        4
      );
      if (edu.degree) addField('Abschluss', 'Diplôme', edu.degree, 4);
      y += lineHeight / 2;
    }
  } else {
    addBullet('Keine Angaben / Aucune information');
  }

  // ============================================================
  // 7. UNIVERSITY EDUCATION
  // ============================================================
  addSectionHeader('7. HOCHSCHULAUSBILDUNG', 'Études universitaires');
  if (data.universityEducation && data.universityEducation.length > 0) {
    for (const edu of data.universityEducation) {
      addSubHeader(edu.field || '-');
      addField('Universität', 'Université', edu.university, 4);
      addField('Stadt', 'Ville', edu.location, 4);
      addField('Abschluss', 'Diplôme', edu.degree, 4);
      addField(
        'Zeitraum',
        'Période',
        `${formatDate(edu.startDate)} bis / à ${formatDate(edu.endDate)}`,
        4
      );
      y += lineHeight / 2;
    }
  } else {
    addBullet('Keine Angaben / Aucune information');
  }

  // ============================================================
  // 8. GERMAN COURSES
  // ============================================================
  if (data.germanCourses && data.germanCourses.length > 0) {
    addSectionHeader('8. DEUTSCHKURSE', "Cours d'allemand");
    for (const course of data.germanCourses) {
      addSubHeader(course.institution || '-');
      addField('Niveau', 'Niveau', course.level, 4);
      addField('Stadt', 'Ville', course.location, 4);
      addField(
        'Zeitraum',
        'Période',
        `${formatDate(course.startDate)} bis / à ${formatDate(course.endDate)}`,
        4
      );
      if (course.certificate) addBullet('Zertifikat erhalten / Certificat obtenu', 4);
      y += lineHeight / 2;
    }
  }

  // ============================================================
  // 9. WORK EXPERIENCE
  // ============================================================
  addSectionHeader('9. BERUFSERFAHRUNG', 'Expérience professionnelle');
  doc.setFontSize(FONT_SIZES.small);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...COLORS.gray);
  doc.text(
    'Chronologisch: oben aktuell, unten Vergangenheit / Chronologiquement : en haut actuel, en bas passé',
    margin,
    y
  );
  y += lineHeight;
  doc.setTextColor(...COLORS.black);
  doc.setFont('helvetica', 'normal');

  if (data.workExperience && data.workExperience.length > 0) {
    for (const exp of data.workExperience) {
      checkPageBreak(20);
      addSubHeader(exp.profession || '-');
      addField('Firma', 'Société', exp.company, 4);
      addField('Stadt', 'Ville', exp.city, 4);
      addField(
        'Datum',
        'Date',
        `${formatDate(exp.startDate)} bis / à ${formatDate(exp.endDate)}`,
        4
      );
      if (exp.tasks) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(FONT_SIZES.body);
        doc.text('Aufgabenbeschreibung / Description des tâches:', margin + 4, y);
        y += lineHeight;
        doc.setFont('helvetica', 'normal');
        const taskLines = exp.tasks.split('\n').filter((t) => t.trim());
        for (const task of taskLines) {
          addBullet(task.replace(/^[-•*]\s*/, ''), 6);
        }
      }
      y += lineHeight / 2;
    }
  } else {
    addBullet('Keine Berufserfahrung / Aucune expérience professionnelle');
  }

  // ============================================================
  // 10. INTERNSHIPS
  // ============================================================
  addSectionHeader('10. PRAKTIKA', 'Stages');
  doc.setFontSize(FONT_SIZES.small);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...COLORS.gray);
  doc.text(
    'Chronologisch: oben aktuell, unten Vergangenheit / Chronologiquement : en haut actuel, en bas passé',
    margin,
    y
  );
  y += lineHeight;
  doc.setTextColor(...COLORS.black);
  doc.setFont('helvetica', 'normal');

  if (data.internships && data.internships.length > 0) {
    for (const intern of data.internships) {
      checkPageBreak(20);
      addSubHeader(intern.profession || '-');
      addField('Firma', 'Société', intern.company, 4);
      addField('Stadt', 'Ville', intern.city, 4);
      addField(
        'Datum',
        'Date',
        `${formatDate(intern.startDate)} bis / à ${formatDate(intern.endDate)}`,
        4
      );
      if (intern.tasks) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(FONT_SIZES.body);
        doc.text('Aufgabenbeschreibung / Description des tâches:', margin + 4, y);
        y += lineHeight;
        doc.setFont('helvetica', 'normal');
        const taskLines = intern.tasks.split('\n').filter((t) => t.trim());
        for (const task of taskLines) {
          addBullet(task.replace(/^[-•*]\s*/, ''), 6);
        }
      }
      y += lineHeight / 2;
    }
  } else {
    addBullet('Keine Praktika / Aucun stage');
  }

  // ============================================================
  // 11. COMPUTER SKILLS
  // ============================================================
  if (data.computerSkills && data.computerSkills.length > 0) {
    addSectionHeader('11. EDV-KENNTNISSE', "Connaissance de l'informatique");
    for (const skill of data.computerSkills) {
      addField(skill.skill || '-', skill.skill || '-', skill.level || '-', 4);
    }
    y += lineHeight / 2;
  }

  // ============================================================
  // 12. CAREER OBJECTIVE
  // ============================================================
  addSectionHeader('12. BERUFLICHES ZIEL', 'Objectif professionnel');
  const career = data.career || ({} as any);
  doc.setFontSize(FONT_SIZES.small);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...COLORS.gray);
  doc.text(
    'Ich will eine Ausbildung oder Tätigkeit als Fachkraft / Je veux suivre une formation ou travailler en tant que professionnel',
    margin,
    y
  );
  y += lineHeight;
  doc.setTextColor(...COLORS.black);
  doc.setFont('helvetica', 'normal');

  addField('Gewünschte Ausbildung', 'Formation visée', career.desiredAusbildung, 4);
  addField('Gewünschter Beruf', 'Profession visée', career.desiredProfession, 4);
  addField('Aktueller Beruf', 'Profession actuelle', career.currentProfession, 4);
  if (career.desiredSector) addField('Gewünschte Branche', 'Secteur visé', career.desiredSector, 4);
  if (career.otherPreferences)
    addMultiLineField('Weitere Präferenzen', 'Autres préférences', career.otherPreferences, 4);
  y += lineHeight / 2;

  // ============================================================
  // 13. RECOGNITION
  // ============================================================
  addSectionHeader('13. ANERKENNUNG', 'Reconnaissance');
  const rec = data.recognition || ({} as any);
  addSubHeader("Anerkennung Handwerk / Reconnaissance de l'artisanat");
  addCheckbox('IHK / Handwerkskammer', 'IHK / Chambre des métiers', rec.ihk, 4);
  if (rec.ihk) {
    addField('Wann', 'Quand', formatDate(rec.ihkDate || ''), 8);
    addField('Wo', 'Où', rec.ihkLocation, 8);
  }
  addSubHeader('Anerkennung ANABIN (ZAB) / Reconnaissance ANABIN (ZAB)');
  addCheckbox('ANABIN (ZAB)', 'ANABIN (ZAB)', rec.anabin, 4);
  if (rec.anabin) {
    addField('Wann', 'Quand', formatDate(rec.anabinDate || ''), 8);
    addField('Wo', 'Où', rec.anabinLocation, 8);
  }
  y += lineHeight / 2;

  // ============================================================
  // 14. DRIVER'S LICENSE
  // ============================================================
  addSectionHeader('14. FÜHRERSCHEIN', 'Permis de conduire');
  const dl = data.drivingLicence || ({} as any);
  addCheckbox('Führerschein in Tunesien', 'Permis de conduire en Tunisie', dl.hasLicence, 0);
  if (dl.hasLicence) {
    const cats = (dl.categories && dl.categories.length > 0)
      ? dl.categories.join(', ')
      : dl.categoriesText || '';
    if (cats) addField('Welche', 'Lesquels', cats, 4);
  }
  y += lineHeight / 2;

  // ============================================================
  // 15. INTERESTS AND HOBBIES
  // ============================================================
  addSectionHeader('15. INTERESSEN UND HOBBYS', 'Intérêts et hobbies');
  if (data.interests) {
    addMultiLineField('Interessen', 'Intérêts', data.interests, 0);
  }
  if (data.hobbies) {
    addMultiLineField('Hobbys', 'Hobbies', data.hobbies, 0);
  }
  if (!data.interests && !data.hobbies) {
    addBullet('Keine Angaben / Aucune information');
  }
  y += lineHeight / 2;

  // ============================================================
  // 16. OTHER NOTES
  // ============================================================
  addSectionHeader('16. WEITERE WICHTIGE ANMERKUNGEN', 'Autres remarques importantes');
  if (data.otherNotes) {
    addMultiLineField('Anmerkungen', 'Remarques', data.otherNotes, 0);
  } else {
    addBullet('Keine Angaben / Aucune information');
  }
  y += lineHeight;

  // ============================================================
  // 17. DECLARATIONS
  // ============================================================
  checkPageBreak(60);
  addSectionHeader('17. ERKLÄRUNGEN', 'Déclarations');

  // German legal text
  doc.setFontSize(FONT_SIZES.small);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('Im Rahmen der Registrierung bei AVS Tunisia Group:', margin, y);
  y += lineHeight;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.black);

  const declItems = [
    'Ich bin körperlich gesund, um an dieser Aktivität teilzunehmen.',
    'Ich habe keine gesundheitlichen Gründe oder Probleme.',
    'Ich habe keine falschen Angaben im Lebenslauf gemacht.',
    'Meine Diplome, Praktika und Arbeitsnachweise sind im Original oder ins Deutsche übersetzt, richtig und nicht gefälscht.',
    'Ich habe keine Falschabsichten.',
    'Wenn der Vermittlungsbedarf entfällt, insbesondere durch persönliche Gründe, informiert der Kandidat AVS Forma unverzüglich formlos schriftlich oder per E-Mail.',
    'Ich muss die Anmeldegebühr (Lebenslauf, Übersetzung, Botschaftsantrag...) von 500 Tunesischen Dinar einmalig und ohne Rückgabe bezahlen.',
  ];
  for (const item of declItems) {
    addBullet(item, 4);
  }
  y += lineHeight / 2;

  // French legal text
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text("Dans le cadre de l'enregistrement auprès de l'AVS Tunisia Group :", margin, y);
  y += lineHeight;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.black);

  const declItemsFr = [
    "Je suis en bonne santé physique pour participer à cette activité.",
    "Je n'ai pas de raisons ou de problèmes de santé.",
    "Je n'ai fait aucune fausse déclaration dans mon curriculum vitae.",
    "Mes diplômes, certificats de stage et de travail, en original ou traduits en allemand, sont corrects et non falsifiés.",
    "Je n'ai pas de fausses intentions.",
    "Si le besoin de placement cesse d'exister, notamment pour des raisons personnelles, le candidat en informe immédiatement AVS Forma par écrit ou par e-mail.",
    "Je dois payer une fois et sans retour les frais de dossier (CV, traduction, demande d'ambassade...) de 500 dinars tunisiens.",
  ];
  for (const item of declItemsFr) {
    addBullet(item, 4);
  }
  y += lineHeight;

  // Checkboxes for declarations
  addSubHeader('Bestätigung / Confirmation');
  const d = data.declarations || ({} as any);
  addCheckbox('Gesundheitliche Erklärung', 'Déclaration de santé', d.healthDeclaration, 4);
  addCheckbox('Richtigkeit der Angaben', 'Exactitude des informations', d.informationCorrect, 4);
  addCheckbox('Echtheit der Dokumente', 'Authenticité des documents', d.documentsAuthentic, 4);
  addCheckbox('Keine falschen Absichten', 'Aucune fausse intention', d.noFalseIntentions, 4);
  addCheckbox(
    'Information bei Nichtbedarf',
    'Information en cas de non-besoin',
    d.informAgencyIfPlacementNoLongerNeeded,
    4
  );
  addCheckbox('Gebühren akzeptiert', 'Frais acceptés', d.feesAccepted, 4);
  y += lineHeight;

  // ============================================================
  // 18. DATA PRIVACY STATEMENT
  // ============================================================
  checkPageBreak(50);
  addSectionHeader('18. DATENSCHUTZERKLÄRUNG', 'Déclaration de confidentialité');

  doc.setFontSize(FONT_SIZES.small);
  doc.setFont('helvetica', 'normal');
  const privacyDe =
    'Unvollständige Eintragungen und/oder falsche Angaben führen leider dazu, dass Ihre Bewerbung ausgeschlossen wird. ' +
    'Durch die Einreichung Ihrer Angaben erklären Sie sich einverstanden, dass diese ohne Ihre personenbezogenen Daten wie Nachnamen, ' +
    'Wohnort, Telefonnummer, Mail- und Skypeadresse sowie aktuelle Arbeitgeber an Kunden der AVS Forma im Zuge der Vermittlung weitergegeben werden. ' +
    'Nach erfolgreichem Vorstellungsgespräch und einer Ausbildung-/Arbeitszusage seitens des Arbeitgebers und Ihnen als Bewerber werden die ' +
    'notwendigen personenbezogenen Daten an den Arbeitgeber übermittelt. Bei Fragen wenden Sie sich gerne an uns.';
  const privacyDeLines = doc.splitTextToSize(privacyDe, contentWidth - 4);
  for (const line of privacyDeLines) {
    checkPageBreak(5);
    doc.text(line, margin + 2, y);
    y += lineHeight;
  }
  y += lineHeight / 2;

  const privacyFr =
    "Toute inscription incomplète et/ou toute fausse information entraînera malheureusement l'exclusion de votre candidature. " +
    "En soumettant vos données, vous acceptez que celles-ci soient transmises aux clients d'AVS Forma dans le cadre d'un placement, " +
    "sans vos données personnelles telles que votre nom de famille, votre lieu de résidence, votre numéro de téléphone, votre adresse e-mail " +
    "et Skype ainsi que votre employeur actuel. Après un entretien d'embauche réussi et une promesse de formation/d'emploi de la part de " +
    "l'employeur et de vous-même en tant que candidat, les données personnelles nécessaires seront transmises à l'employeur. " +
    "Si vous avez des questions, n'hésitez pas à nous contacter.";
  const privacyFrLines = doc.splitTextToSize(privacyFr, contentWidth - 4);
  for (const line of privacyFrLines) {
    checkPageBreak(5);
    doc.text(line, margin + 2, y);
    y += lineHeight;
  }
  y += lineHeight;

  // ============================================================
  // 19. SIGNATURE BLOCK
  // ============================================================
  checkPageBreak(40);
  addSectionHeader('19. UNTERSCHRIFT', 'Signature');

  const today = new Date().toLocaleDateString('de-DE');
  const city = data.contact?.city || '_________________________';

  y += lineHeight;
  doc.setFontSize(FONT_SIZES.body);
  doc.setFont('helvetica', 'normal');

  // Date line
  doc.text('Datum / Date:', margin, y);
  doc.setDrawColor(...COLORS.black);
  doc.line(margin + 25, y + 1, margin + 80, y + 1);
  doc.text(today, margin + 28, y);
  y += lineHeight * 2;

  // City line
  doc.text('Stadt / Ville:', margin, y);
  doc.line(margin + 25, y + 1, margin + 80, y + 1);
  doc.text(city, margin + 28, y);
  y += lineHeight * 3;

  // Signature line
  doc.text('Unterschrift des Kandidaten / Signature du candidat:', margin, y);
  y += lineHeight * 2;
  doc.line(margin, y, margin + 80, y);
  y += lineHeight;

  // ============================================================
  // FINAL FOOTER ON LAST PAGE
  // ============================================================
  addFooter();

  return doc.output('blob');
};

// ============================================================
// DOWNLOAD HELPER
// ============================================================

export const downloadPDF = async (
  data: Candidate,
  filename: string = 'AVS_Forma_Bewerberfragebogen.pdf'
) => {
  try {
    const blob = await generatePDF(data);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};