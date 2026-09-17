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
// SPACING CONSTANTS (tweak here for global spacing changes)
// ============================================================
const SPACING = {
  afterSection: 6,        // Space after each major section
  afterSubSection: 3,     // Space after sub-sections
  afterField: 5.5,        // Line height for fields
  beforeSection: 4,       // Extra space before a new section header
  afterSectionHeader: 3,  // Space after section header line
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
    male: 'Männlich',
    female: 'Weiblich',
    diverse: 'Divers',
  };
  return map[gender] || gender || '-';
};

const getMaritalStatusLabel = (status: string): string => {
  const map: Record<string, string> = {
    single: 'Ledig',
    married: 'Verheiratet',
    divorced: 'Geschieden',
    widowed: 'Verwitwet',
  };
  return map[status] || status || '-';
};

const yesNo = (value: boolean | undefined): string => {
  if (value === undefined || value === null) return '-';
  return value ? 'Ja' : 'Nein';
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
  let currentPage = 1;
  const lineHeight = SPACING.afterField;

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
    doc.text(`Seite ${currentPage}`, pageWidth - margin, footerY, { align: 'right' });
    doc.setTextColor(...COLORS.black);
  };

  const checkPageBreak = (needed: number = 10): boolean => {
    if (y + needed > pageHeight - margin - 10) {
      addFooter();
      doc.addPage();
      currentPage++;
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
    doc.text('AVS Forma – Bewerberfragebogen', margin, y);
    y += lineHeight;
    doc.setDrawColor(...COLORS.lightGray);
    doc.line(margin, y, pageWidth - margin, y);
    y += lineHeight + 2; // extra breathing room
    doc.setTextColor(...COLORS.black);
  };

  const addSectionHeader = (de: string) => {
    // Add space before section (except at very top of page)
    if (y > margin + 5) {
      y += SPACING.beforeSection;
    }
    checkPageBreak(14);
    doc.setFontSize(FONT_SIZES.sectionHeader);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.primary);
    doc.text(de, margin, y);
    y += lineHeight;
    doc.setDrawColor(...COLORS.red);
    doc.setLineWidth(0.4);
    doc.line(margin, y, pageWidth - margin, y);
    doc.setLineWidth(0.2);
    y += lineHeight + SPACING.afterSectionHeader;
    doc.setFontSize(FONT_SIZES.body);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.black);
  };

  const addSubHeader = (text: string) => {
    y += SPACING.afterSubSection;
    checkPageBreak(10);
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
    label: string,
    value: string | number | boolean | undefined,
    indent: number = 0
  ) => {
    checkPageBreak(6);
    const display =
      value === undefined || value === null || value === '' ? '-' : String(value);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(FONT_SIZES.body);
    doc.text(`${label}:`, margin + indent, y);
    const labelWidth = doc.getTextWidth(`${label}:`);
    doc.setFont('helvetica', 'normal');
    doc.text(display, margin + indent + labelWidth + 2, y);
    y += lineHeight;
  };

  const addMultiLineField = (
    label: string,
    value: string | undefined,
    indent: number = 0
  ) => {
    if (!value) return;
    checkPageBreak(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(FONT_SIZES.body);
    doc.text(`${label}:`, margin + indent, y);
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
    label: string,
    checked: boolean,
    indent: number = 0
  ) => {
    checkPageBreak(6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(FONT_SIZES.body);
    const box = checked ? '☑' : '☐';
    doc.text(`${box}  ${label}`, margin + indent, y);
    y += lineHeight;
  };

  const addSpacer = (amount: number = SPACING.afterSection) => {
    y += amount;
  };

  // ----------------------------------------------------------
  // TITLE BLOCK
  // ----------------------------------------------------------
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, pageWidth, 25, 'F');
  doc.setTextColor(...COLORS.white);
  doc.setFontSize(FONT_SIZES.title);
  doc.setFont('helvetica', 'bold');
  doc.text('BEWERBERFRAGEBOGEN', pageWidth / 2, 14, { align: 'center' });
  doc.setTextColor(...COLORS.black);
  y = 34;

  // Generated date
  doc.setFontSize(FONT_SIZES.small);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...COLORS.gray);
  doc.text(
    `Generiert am: ${new Date().toLocaleDateString('de-DE')}`,
    pageWidth - margin,
    y,
    { align: 'right' }
  );
  y += lineHeight + 4;
  doc.setTextColor(...COLORS.black);

  // ============================================================
  // 1. PERSONAL INFORMATION
  // ============================================================
  addSectionHeader('1. PERSÖNLICHE ANGABEN');
  const p = data.personal || ({} as any);
  addField('Vorname', p.firstName);
  addField('Nachname', p.lastName);
  addField('Geburtsdatum', formatDate(p.birthDate));
  addField('Geburtsort', p.birthPlace);
  addField('Geschlecht', getGenderLabel(p.gender));
  addField('Familienstand', getMaritalStatusLabel(p.maritalStatus));
  addField(
    'Kinder',
    p.hasChildren ? `Ja (${p.numberOfChildren || 0})` : 'Nein'
  );
  addField('Staatsangehörigkeit', p.nationality);
  addField('Beitrittsdatum', formatDate(p.joinDate || ''));
  addSpacer();

  // ============================================================
  // 2. CONTACT
  // ============================================================
  addSectionHeader('2. KONTAKT');
  const c = data.contact || ({} as any);
  addField('Adresse (Straße)', c.address);
  addField('Postleitzahl', c.postalCode);
  addField('Stadt', c.city);
  addField('Land', c.country);
  addField('Telefonnummer', c.phone);
  addField('Mailadresse', c.email);
  addField('Skypeadresse', c.skype);
  addField('Verfügbar ab', formatDate(c.availableFrom));
  addSpacer();

  // ============================================================
  // 3. GENERAL QUESTIONS
  // ============================================================
  addSectionHeader('3. ALLGEMEINE FRAGEN');
  const g = data.germany || ({} as any);

  addField('Familie in Deutschland', yesNo(g.familyInGermany));
  if (g.familyInGermany && g.familyInGermanyDetails) {
    addBullet(g.familyInGermanyDetails, 6);
  }
  addField('Freunde in Deutschland', yesNo(g.friendsInGermany));
  if (g.friendsInGermany && g.friendsInGermanyDetails) {
    addBullet(g.friendsInGermanyDetails, 6);
  }

  y += 2;
  addSubHeader('Visa');
  addField('Schon einmal Visa beantragt?', yesNo(g.previousVisaApplication));
  if (g.previousVisaApplication) {
    addField('Welche Visa Art', g.visaType, 6);
    addField(
      'Ablehnung / Erfolg',
      g.visaResult === 'denied'
        ? 'Abgelehnt'
        : g.visaResult === 'granted'
        ? 'Erfolg'
        : '-',
      6
    );
    addField(
      'Wann / Datum',
      `${formatDate(g.visaDate || '')} bis ${formatDate(g.visaDateUntil || '')}`,
      6
    );
  }

  y += 2;
  addSubHeader('Frühere Aufenthalte in Deutschland');
  addField('Aufenthalt gehabt?', yesNo(g.previousStay));
  if (g.previousStay) {
    addField('Details', g.previousStayDetails, 6);
    if (g.stays && g.stays.length > 0) {
      for (const stay of g.stays) {
        addBullet(`${stay.city || '-'} | ${stay.duration || '-'} | ${stay.purpose || '-'}`, 6);
      }
    }
    if (g.previousStayVisaType) {
      addField('Welche Visa Art', g.previousStayVisaType, 6);
    }
  }

  y += 2;
  addSubHeader('Andere Vermittlungsagentur');
  addField('Bei anderer Agentur beworben?', yesNo(g.appliedToOtherAgency));
  if (g.appliedToOtherAgency) {
    addField('Welche Agentur', g.otherAgencyName, 6);
    addField('Wann', formatDate(g.otherAgencyDate || ''), 6);
  }
  addSpacer();

  // ============================================================
  // 4. LANGUAGE PROFICIENCY
  // ============================================================
  addSectionHeader('4. SPRACHKENNTNISSE');
  const langs = data.languages || ({} as any);
  const langMap: Array<{ key: keyof typeof langs; label: string }> = [
    { key: 'german', label: 'Deutsch' },
    { key: 'french', label: 'Französisch' },
    { key: 'english', label: 'Englisch' },
    { key: 'spanish', label: 'Spanisch' },
    { key: 'italian', label: 'Italienisch' },
  ];

  for (const { key, label } of langMap) {
    const lang = langs[key] as { level: string; certificate?: string } | undefined;
    if (lang && lang.level) {
      const cert = lang.certificate ? ` (Zertifikat: ${lang.certificate})` : '';
      addField(label, `${getLanguageLevelLabel(lang.level)}${cert}`, 4);
    }
  }

  if (langs.other && langs.other.length > 0) {
    addSubHeader('Sonstige Sprachkenntnisse');
    for (const l of langs.other) {
      if (l.name) addField(l.name, getLanguageLevelLabel(l.level), 4);
    }
  }

  y += 2;
  addSubHeader('Deutsch Unterricht');
  const gc = langs.germanCourse;
  if (gc && (gc.schoolName || gc.city)) {
    addField('Name der Sprachschule', gc.schoolName, 4);
    addField('Stadt', gc.city, 4);
    addField(
      'Wann',
      `${formatDate(gc.startDate)} bis ${formatDate(gc.endDate)}`,
      4
    );
  } else {
    addBullet('Keine Angaben', 4);
  }

  if (langs.otherNotes) {
    addMultiLineField('Sonstiges', langs.otherNotes, 4);
  }
  addSpacer();

  // ============================================================
  // 5. SCHOOL EDUCATION
  // ============================================================
  addSectionHeader('5. SCHULBILDUNG');
  if (data.schoolEducation && data.schoolEducation.length > 0) {
    for (const edu of data.schoolEducation) {
      addSubHeader(edu.schoolName || '-');
      addField('Typ', edu.type, 4);
      addField('Stadt', edu.location, 4);
      addField(
        'Zeitraum',
        `${formatDate(edu.startDate)} bis ${formatDate(edu.endDate)}`,
        4
      );
      if (edu.degree) addField('Abschluss', edu.degree, 4);
      if (edu.abiturSubject) addField('Abitur Fach', edu.abiturSubject, 4);
      if (edu.abiturYear) addField('Abitur Jahr', edu.abiturYear, 4);
      y += lineHeight / 2;
    }
  } else {
    addBullet('Keine Angaben');
  }
  addSpacer();

  // ============================================================
  // 6. VOCATIONAL EDUCATION
  // ============================================================
  addSectionHeader('6. BERUFSAUSBILDUNG');
  if (data.vocationalEducation && data.vocationalEducation.length > 0) {
    for (const edu of data.vocationalEducation) {
      addSubHeader(edu.profession || '-');
      addField('Institut', edu.institution, 4);
      addField('Stadt', edu.location, 4);
      addField(
        'Zeitraum',
        `${formatDate(edu.startDate)} bis ${formatDate(edu.endDate)}`,
        4
      );
      if (edu.degree) addField('Abschluss', edu.degree, 4);
      y += lineHeight / 2;
    }
  } else {
    addBullet('Keine Angaben');
  }
  addSpacer();

  // ============================================================
  // 7. UNIVERSITY EDUCATION
  // ============================================================
  addSectionHeader('7. HOCHSCHULAUSBILDUNG');
  if (data.universityEducation && data.universityEducation.length > 0) {
    for (const edu of data.universityEducation) {
      addSubHeader(edu.field || '-');
      addField('Universität', edu.university, 4);
      addField('Stadt', edu.location, 4);
      addField('Abschluss', edu.degree, 4);
      addField(
        'Zeitraum',
        `${formatDate(edu.startDate)} bis ${formatDate(edu.endDate)}`,
        4
      );
      y += lineHeight / 2;
    }
  } else {
    addBullet('Keine Angaben');
  }
  addSpacer();

  // ============================================================
  // 8. GERMAN COURSES
  // ============================================================
  if (data.germanCourses && data.germanCourses.length > 0) {
    addSectionHeader('8. DEUTSCHKURSE');
    for (const course of data.germanCourses) {
      addSubHeader(course.institution || '-');
      addField('Niveau', course.level, 4);
      addField('Stadt', course.location, 4);
      addField(
        'Zeitraum',
        `${formatDate(course.startDate)} bis ${formatDate(course.endDate)}`,
        4
      );
      if (course.certificate) addBullet('Zertifikat erhalten', 4);
      y += lineHeight / 2;
    }
    addSpacer();
  }

  // ============================================================
  // 9. WORK EXPERIENCE
  // ============================================================
  addSectionHeader('9. BERUFSERFAHRUNG');
  doc.setFontSize(FONT_SIZES.small);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...COLORS.gray);
  doc.text(
    'Chronologisch: oben aktuell, unten Vergangenheit',
    margin,
    y
  );
  y += lineHeight + 2;
  doc.setTextColor(...COLORS.black);
  doc.setFont('helvetica', 'normal');

  if (data.workExperience && data.workExperience.length > 0) {
    for (const exp of data.workExperience) {
      checkPageBreak(20);
      addSubHeader(exp.profession || '-');
      addField('Firma', exp.company, 4);
      addField('Stadt', exp.city, 4);
      addField(
        'Datum',
        `${formatDate(exp.startDate)} bis ${formatDate(exp.endDate)}`,
        4
      );
      if (exp.tasks) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(FONT_SIZES.body);
        doc.text('Aufgabenbeschreibung:', margin + 4, y);
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
    addBullet('Keine Berufserfahrung');
  }
  addSpacer();

  // ============================================================
  // 10. INTERNSHIPS
  // ============================================================
  addSectionHeader('10. PRAKTIKA');
  doc.setFontSize(FONT_SIZES.small);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...COLORS.gray);
  doc.text(
    'Chronologisch: oben aktuell, unten Vergangenheit',
    margin,
    y
  );
  y += lineHeight + 2;
  doc.setTextColor(...COLORS.black);
  doc.setFont('helvetica', 'normal');

  if (data.internships && data.internships.length > 0) {
    for (const intern of data.internships) {
      checkPageBreak(20);
      addSubHeader(intern.profession || '-');
      addField('Firma', intern.company, 4);
      addField('Stadt', intern.city, 4);
      addField(
        'Datum',
        `${formatDate(intern.startDate)} bis ${formatDate(intern.endDate)}`,
        4
      );
      if (intern.tasks) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(FONT_SIZES.body);
        doc.text('Aufgabenbeschreibung:', margin + 4, y);
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
    addBullet('Keine Praktika');
  }
  addSpacer();

  // ============================================================
  // 11. COMPUTER SKILLS
  // ============================================================
  if (data.computerSkills && data.computerSkills.length > 0) {
    addSectionHeader('11. EDV-KENNTNISSE');
    for (const skill of data.computerSkills) {
      addField(skill.skill || '-', skill.level || '-', 4);
    }
    addSpacer();
  }

  // ============================================================
  // 12. CAREER OBJECTIVE
  // ============================================================
  addSectionHeader('12. BERUFLICHES ZIEL');
  const career = data.career || ({} as any);
  doc.setFontSize(FONT_SIZES.small);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...COLORS.gray);
  doc.text(
    'Ich will eine Ausbildung oder Tätigkeit als Fachkraft',
    margin,
    y
  );
  y += lineHeight + 2;
  doc.setTextColor(...COLORS.black);
  doc.setFont('helvetica', 'normal');

  addField('Gewünschte Ausbildung', career.desiredAusbildung, 4);
  addField('Gewünschter Beruf', career.desiredProfession, 4);
  addField('Aktueller Beruf', career.currentProfession, 4);
  if (career.desiredSector) addField('Gewünschte Branche', career.desiredSector, 4);
  if (career.otherPreferences)
    addMultiLineField('Weitere Präferenzen', career.otherPreferences, 4);
  addSpacer();

  // ============================================================
  // 13. RECOGNITION
  // ============================================================
  addSectionHeader('13. ANERKENNUNG');
  const rec = data.recognition || ({} as any);
  addSubHeader('Anerkennung Handwerk');
  addCheckbox('IHK / Handwerkskammer', rec.ihk, 4);
  if (rec.ihk) {
    addField('Wann', formatDate(rec.ihkDate || ''), 8);
    addField('Wo', rec.ihkLocation, 8);
  }
  addSubHeader('Anerkennung ANABIN (ZAB)');
  addCheckbox('ANABIN (ZAB)', rec.anabin, 4);
  if (rec.anabin) {
    addField('Wann', formatDate(rec.anabinDate || ''), 8);
    addField('Wo', rec.anabinLocation, 8);
  }
  addSpacer();

  // ============================================================
  // 14. DRIVER'S LICENSE
  // ============================================================
  addSectionHeader('14. FÜHRERSCHEIN');
  const dl = data.drivingLicence || ({} as any);
  addCheckbox('Führerschein in Tunesien', dl.hasLicence, 0);
  if (dl.hasLicence) {
    const cats = (dl.categories && dl.categories.length > 0)
      ? dl.categories.join(', ')
      : dl.categoriesText || '';
    if (cats) addField('Welche', cats, 4);
  }
  addSpacer();

  // ============================================================
  // 15. INTERESTS AND HOBBIES
  // ============================================================
  addSectionHeader('15. INTERESSEN UND HOBBYS');
  if (data.interests) {
    addMultiLineField('Interessen', data.interests, 0);
  }
  if (data.hobbies) {
    addMultiLineField('Hobbys', data.hobbies, 0);
  }
  if (!data.interests && !data.hobbies) {
    addBullet('Keine Angaben');
  }
  addSpacer();

  // ============================================================
  // 16. OTHER NOTES
  // ============================================================
  addSectionHeader('16. WEITERE WICHTIGE ANMERKUNGEN');
  if (data.otherNotes) {
    addMultiLineField('Anmerkungen', data.otherNotes, 0);
  } else {
    addBullet('Keine Angaben');
  }
  addSpacer();

  // ============================================================
  // 17. DECLARATIONS
  // ============================================================
  checkPageBreak(60);
  addSectionHeader('17. ERKLÄRUNGEN');

  // German legal text
  doc.setFontSize(FONT_SIZES.small);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.primary);
  doc.text('Im Rahmen der Registrierung bei AVS Tunisia Group:', margin, y);
  y += lineHeight + 2;
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
  addSpacer();

  // Checkboxes for declarations
  addSubHeader('Bestätigung');
  const d = data.declarations || ({} as any);
  addCheckbox('Gesundheitliche Erklärung', d.healthDeclaration, 4);
  addCheckbox('Richtigkeit der Angaben', d.informationCorrect, 4);
  addCheckbox('Echtheit der Dokumente', d.documentsAuthentic, 4);
  addCheckbox('Keine falschen Absichten', d.noFalseIntentions, 4);
  addCheckbox(
    'Information bei Nichtbedarf',
    d.informAgencyIfPlacementNoLongerNeeded,
    4
  );
  addCheckbox('Gebühren akzeptiert', d.feesAccepted, 4);
  addSpacer();

  // ============================================================
  // 18. DATA PRIVACY STATEMENT
  // ============================================================
  checkPageBreak(50);
  addSectionHeader('18. DATENSCHUTZERKLÄRUNG');

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
  addSpacer();

  // ============================================================
  // 19. SIGNATURE BLOCK
  // ============================================================
  checkPageBreak(40);
  addSectionHeader('19. UNTERSCHRIFT');

  const today = new Date().toLocaleDateString('de-DE');
  const city = data.contact?.city || '_________________________';

  y += lineHeight + 2;
  doc.setFontSize(FONT_SIZES.body);
  doc.setFont('helvetica', 'normal');

  // Date line
  doc.text('Datum:', margin, y);
  doc.setDrawColor(...COLORS.black);
  doc.line(margin + 25, y + 1, margin + 80, y + 1);
  doc.text(today, margin + 28, y);
  y += lineHeight * 2.5;

  // City line
  doc.text('Stadt:', margin, y);
  doc.line(margin + 25, y + 1, margin + 80, y + 1);
  doc.text(city, margin + 28, y);
  y += lineHeight * 3.5;

  // Signature line
  doc.text('Unterschrift des Kandidaten:', margin, y);
  y += lineHeight * 2.5;
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