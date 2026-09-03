// src/app/candidature/services/pdfGenerator.ts
import { Candidate } from '../types';
import jsPDF from 'jspdf';

// Helper function to format date
const formatDate = (date: string): string => {
  if (!date) return '-';
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return date;
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return date || '-';
  }
};

// Helper to get language level label
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

// Helper to get gender label
const getGenderLabel = (gender: string): string => {
  const map: Record<string, string> = {
    male: 'Männlich',
    female: 'Weiblich',
    diverse: 'Divers',
  };
  return map[gender] || gender || '-';
};

// Helper to get marital status label
const getMaritalStatusLabel = (status: string): string => {
  const map: Record<string, string> = {
    single: 'Ledig',
    married: 'Verheiratet',
    divorced: 'Geschieden',
    widowed: 'Verwitwet',
  };
  return map[status] || status || '-';
};

export const generatePDF = async (data: Candidate): Promise<Blob> => {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let y = margin;
  const lineHeight = 7;
  const defaultFontSize = 10;
  const headerFontSize = 14;
  const subHeaderFontSize = 12;

  // 🔥 FIX: Renamed parameter to avoid self-reference
  const addText = (text: string, x: number = margin, yPos: number = y, fontSize: number = defaultFontSize) => {
    doc.setFontSize(fontSize);
    doc.text(text, x, yPos);
    return yPos + lineHeight;
  };

  // Helper to add a new page if needed
  const checkPageBreak = (neededLines: number = 5) => {
    if (y + (neededLines * lineHeight) > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  // Helper to add a section header
  const addSectionHeader = (title: string) => {
    checkPageBreak(3);
    doc.setFontSize(headerFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, y);
    y += lineHeight;
    doc.setFontSize(defaultFontSize);
    doc.setFont('helvetica', 'normal');
    // Add a line under the header
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y - 2, pageWidth - margin, y - 2);
    y += lineHeight / 2;
  };

  // Helper to add a field with label
  const addField = (label: string, value: string | number | boolean) => {
    checkPageBreak(1);
    const displayValue = value === undefined || value === null || value === '' ? '-' : String(value);
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, margin, y);
    const labelWidth = doc.getTextWidth(`${label}:`);
    doc.setFont('helvetica', 'normal');
    doc.text(displayValue, margin + labelWidth + 2, y);
    y += lineHeight;
  };

  // Helper to add a multi-line field
  const addMultiLineField = (label: string, value: string) => {
    if (!value) return;
    checkPageBreak(3);
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, margin, y);
    y += lineHeight;
    doc.setFont('helvetica', 'normal');
    
    // Split value into lines
    const lines = doc.splitTextToSize(value, pageWidth - (margin * 2));
    for (const line of lines) {
      checkPageBreak(1);
      doc.text(line, margin + 3, y);
      y += lineHeight;
    }
  };

  // Helper to add a card/list item
  const addListItem = (text: string, indent: number = 5) => {
    checkPageBreak(1);
    doc.setFont('helvetica', 'normal');
    doc.text(`• ${text}`, margin + indent, y);
    y += lineHeight;
  };

  // --- HEADER ---
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 51, 102);
  doc.text('BEWERBERFRAGEBOGEN', pageWidth / 2, y, { align: 'center' });
  y += lineHeight * 2;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(defaultFontSize);
  doc.setFont('helvetica', 'normal');

  const generatedDate = new Date().toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  doc.text(`Generiert am: ${generatedDate}`, margin, y);
  y += lineHeight * 2;

  // --- 1. PERSONAL INFORMATION ---
  addSectionHeader('1. PERSÖNLICHE ANGABEN');
  
  const personal = data.personal;
  if (personal) {
    addField('Vorname', personal.firstName);
    addField('Nachname', personal.lastName);
    addField('Geburtsdatum', formatDate(personal.birthDate));
    addField('Geburtsort', personal.birthPlace);
    addField('Geschlecht', getGenderLabel(personal.gender));
    addField('Familienstand', getMaritalStatusLabel(personal.maritalStatus));
    addField('Kinder', personal.hasChildren ? `Ja (${personal.numberOfChildren})` : 'Nein');
    addField('Nationalität', personal.nationality);
  }
  y += lineHeight;

  // --- 2. CONTACT INFORMATION ---
  addSectionHeader('2. KONTAKT');
  
  const contact = data.contact;
  if (contact) {
    addField('Adresse', contact.address);
    addField('PLZ', contact.postalCode);
    addField('Stadt', contact.city);
    addField('Land', contact.country);
    addField('Telefon', contact.phone);
    addField('E-Mail', contact.email);
    addField('Skype', contact.skype);
    addField('Verfügbar ab', formatDate(contact.availableFrom));
  }
  y += lineHeight;

  // --- 3. LANGUAGES ---
  addSectionHeader('3. SPRACHKENNTNISSE');
  
  const languages = data.languages;
  if (languages) {
    const langMap = [
      { key: 'german', label: '🇩🇪 Deutsch' },
      { key: 'french', label: '🇫🇷 Französisch' },
      { key: 'english', label: '🇬🇧 Englisch' },
      { key: 'spanish', label: '🇪🇸 Spanisch' },
      { key: 'italian', label: '🇮🇹 Italienisch' },
    ];
    
    let hasLanguages = false;
    for (const { key, label } of langMap) {
      const lang = languages[key as keyof typeof languages] as { level: string; certificate?: string };
      if (lang && lang.level) {
        hasLanguages = true;
        const certText = lang.certificate ? ` (Zertifikat: ${lang.certificate})` : '';
        addField(label, `${getLanguageLevelLabel(lang.level)}${certText}`);
      }
    }
    
    // Other languages
    if (languages.other && languages.other.length > 0) {
      for (const lang of languages.other) {
        if (lang.name && lang.level) {
          hasLanguages = true;
          addField(`🌐 ${lang.name}`, getLanguageLevelLabel(lang.level));
        }
      }
    }
    
    if (!hasLanguages) {
      addField('Sprachen', 'Keine Angaben');
    }
  }
  y += lineHeight;

  // --- 4. WORK EXPERIENCE ---
  if (data.workExperience && data.workExperience.length > 0) {
    addSectionHeader(`4. BERUFSERFAHRUNG (${data.workExperience.length} Einträge)`);
    
    for (const exp of data.workExperience) {
      if (checkPageBreak(5)) {
        y = margin;
      }
      doc.setFont('helvetica', 'bold');
      doc.text(exp.profession || '-', margin, y);
      y += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(`${exp.company || '-'} • ${exp.city || '-'}`, margin + 3, y);
      y += lineHeight;
      doc.text(`${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`, margin + 3, y);
      y += lineHeight;
      doc.setFontSize(defaultFontSize);
      if (exp.tasks) {
        const lines = doc.splitTextToSize(exp.tasks, pageWidth - (margin * 2) - 6);
        for (const line of lines) {
          doc.text(line, margin + 3, y);
          y += lineHeight;
        }
      }
      y += lineHeight / 2;
    }
  } else {
    addSectionHeader('4. BERUFSERFAHRUNG');
    addField('', 'Keine Berufserfahrung eingetragen.');
  }

  // --- 5. EDUCATION ---
  if (data.schoolEducation && data.schoolEducation.length > 0) {
    addSectionHeader('5. SCHULAUSBILDUNG');
    for (const edu of data.schoolEducation) {
      if (checkPageBreak(3)) {
        y = margin;
      }
      doc.setFont('helvetica', 'bold');
      doc.text(edu.schoolName || '-', margin, y);
      y += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(`${edu.type || '-'} • ${edu.location || '-'}`, margin + 3, y);
      y += lineHeight;
      doc.text(`Zeitraum: ${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`, margin + 3, y);
      y += lineHeight;
      if (edu.degree) {
        doc.text(`Abschluss: ${edu.degree}`, margin + 3, y);
        y += lineHeight;
      }
      doc.setFontSize(defaultFontSize);
      y += lineHeight / 2;
    }
  }

  // Vocational Education
  if (data.vocationalEducation && data.vocationalEducation.length > 0) {
    addSectionHeader('6. BERUFSAUSBILDUNG');
    for (const edu of data.vocationalEducation) {
      if (checkPageBreak(4)) {
        y = margin;
      }
      doc.setFont('helvetica', 'bold');
      doc.text(edu.profession || '-', margin, y);
      y += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(`${edu.institution || '-'} • ${edu.location || '-'}`, margin + 3, y);
      y += lineHeight;
      doc.text(`Zeitraum: ${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`, margin + 3, y);
      y += lineHeight;
      if (edu.degree) {
        doc.text(`Abschluss: ${edu.degree}`, margin + 3, y);
        y += lineHeight;
      }
      doc.setFontSize(defaultFontSize);
      y += lineHeight / 2;
    }
  }

  // University Education
  if (data.universityEducation && data.universityEducation.length > 0) {
    addSectionHeader('7. HOCHSCHULAUSBILDUNG');
    for (const edu of data.universityEducation) {
      if (checkPageBreak(4)) {
        y = margin;
      }
      doc.setFont('helvetica', 'bold');
      doc.text(edu.field || '-', margin, y);
      y += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(`${edu.university || '-'} • ${edu.location || '-'}`, margin + 3, y);
      y += lineHeight;
      doc.text(`${edu.degree || '-'} • ${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`, margin + 3, y);
      y += lineHeight;
      doc.setFontSize(defaultFontSize);
      y += lineHeight / 2;
    }
  }

  // --- 6. GERMAN COURSES ---
  if (data.germanCourses && data.germanCourses.length > 0) {
    addSectionHeader('8. DEUTSCHKURSE');
    for (const course of data.germanCourses) {
      if (checkPageBreak(3)) {
        y = margin;
      }
      doc.setFont('helvetica', 'bold');
      doc.text(course.institution || '-', margin, y);
      y += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(`Niveau: ${course.level || '-'} • ${course.location || '-'}`, margin + 3, y);
      y += lineHeight;
      doc.text(`${formatDate(course.startDate)} - ${formatDate(course.endDate)} ${course.certificate ? '✅ Zertifikat erhalten' : ''}`, margin + 3, y);
      y += lineHeight;
      doc.setFontSize(defaultFontSize);
      y += lineHeight / 2;
    }
  }

  // --- 7. INTERNSHIPS ---
  if (data.internships && data.internships.length > 0) {
    addSectionHeader('9. PRAKTIKA');
    for (const intern of data.internships) {
      if (checkPageBreak(4)) {
        y = margin;
      }
      doc.setFont('helvetica', 'bold');
      doc.text(intern.profession || '-', margin, y);
      y += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(`${intern.company || '-'} • ${intern.city || '-'}`, margin + 3, y);
      y += lineHeight;
      doc.text(`${formatDate(intern.startDate)} - ${formatDate(intern.endDate)}`, margin + 3, y);
      y += lineHeight;
      if (intern.tasks) {
        const lines = doc.splitTextToSize(intern.tasks, pageWidth - (margin * 2) - 6);
        for (const line of lines) {
          doc.text(line, margin + 3, y);
          y += lineHeight;
        }
      }
      doc.setFontSize(defaultFontSize);
      y += lineHeight / 2;
    }
  }

  // --- 8. COMPUTER SKILLS ---
  if (data.computerSkills && data.computerSkills.length > 0) {
    addSectionHeader('10. EDV-KENNTNISSE');
    for (const skill of data.computerSkills) {
      addField(skill.skill || '-', skill.level || '-');
    }
    y += lineHeight;
  }

  // --- 9. CAREER OBJECTIVE ---
  addSectionHeader('11. BERUFLICHES ZIEL');
  
  const career = data.career;
  if (career) {
    addField('Gewünschte Ausbildung', career.desiredAusbildung);
    addField('Gewünschter Beruf', career.desiredProfession);
    addField('Aktueller Beruf', career.currentProfession);
    if (career.desiredSector) {
      addField('Gewünschte Branche', career.desiredSector);
    }
    if (career.otherPreferences) {
      addMultiLineField('Weitere Präferenzen', career.otherPreferences);
    }
  }
  y += lineHeight;

  // --- 10. INTERESTS ---
  if (data.interests) {
    addSectionHeader('12. INTERESSEN');
    const lines = doc.splitTextToSize(data.interests, pageWidth - (margin * 2));
    for (const line of lines) {
      doc.text(line, margin + 3, y);
      y += lineHeight;
    }
    y += lineHeight / 2;
  }

  // --- 11. DECLARATIONS ---
  addSectionHeader('13. ERKLÄRUNGEN');
  
  const declarations = data.declarations;
  if (declarations) {
    addField('Gesundheitliche Erklärung', declarations.healthDeclaration ? '✅ Akzeptiert' : '❌ Nicht akzeptiert');
    addField('Richtigkeit der Angaben', declarations.informationCorrect ? '✅ Akzeptiert' : '❌ Nicht akzeptiert');
    addField('Echtheit der Dokumente', declarations.documentsAuthentic ? '✅ Akzeptiert' : '❌ Nicht akzeptiert');
    addField('Keine falschen Absichten', declarations.noFalseIntentions ? '✅ Akzeptiert' : '❌ Nicht akzeptiert');
    addField('Information bei Nichtbedarf', declarations.informAgencyIfPlacementNoLongerNeeded ? '✅ Akzeptiert' : '❌ Nicht akzeptiert');
    addField('Gebühren akzeptiert', declarations.feesAccepted ? '✅ Akzeptiert' : '❌ Nicht akzeptiert');
  }

  // --- FOOTER ---
  y += lineHeight;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += lineHeight;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('Dieses Dokument wurde automatisch generiert.', pageWidth / 2, y, { align: 'center' });
  y += lineHeight;
  doc.text('© IFT Global - Alle Rechte vorbehalten.', pageWidth / 2, y, { align: 'center' });

  // Return as PDF blob
  return doc.output('blob');
};

// Helper function to download the PDF
export const downloadPDF = async (data: Candidate, filename: string = 'Bewerberfragebogen.pdf') => {
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