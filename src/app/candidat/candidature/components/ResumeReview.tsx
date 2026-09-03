// src/app/candidature/components/ResumeReview.tsx
"use client";

import React, { useState } from 'react';
import { Candidate } from '../types';
import { downloadPDF } from '../services/pdfGenerator';

interface ResumeReviewProps {
  data: Candidate | null | undefined;
  updateData?: (data: Candidate) => void;
  allData?: Candidate;
  onGeneratePDF?: () => void;
}

// Default empty candidate for safety
const EMPTY_CANDIDATE: Candidate = {
  personal: {
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    gender: '',
    maritalStatus: '',
    hasChildren: false,
    numberOfChildren: 0,
    nationality: '',
  },
  contact: {
    address: '',
    postalCode: '',
    city: '',
    country: '',
    phone: '',
    email: '',
    skype: '',
    availableFrom: '',
  },
  germany: {
    hasFamilyOrFriends: false,
    familyOrFriendsDetails: '',
    previousVisaApplication: false,
    visaType: '',
    visaResult: '',
    visaDate: '',
    previousStay: false,
    previousStayDetails: '',
    stays: [],
    otherAgency: '',
  },
  languages: {
    german: { level: '' },
    french: { level: '' },
    english: { level: '' },
    spanish: { level: '' },
    italian: { level: '' },
    other: [],
  },
  germanCourses: [],
  schoolEducation: [],
  vocationalEducation: [],
  universityEducation: [],
  workExperience: [],
  internships: [],
  computerSkills: [],
  recognition: {
    ihk: false,
    ihkDetails: '',
    anabin: false,
    anabinDetails: '',
    zab: false,
    zabDetails: '',
  },
  drivingLicence: {
    hasLicence: false,
    categories: [],
    sinceYear: '',
  },
  career: {
    desiredAusbildung: '',
    desiredProfession: '',
    currentProfession: '',
    desiredSector: '',
    otherPreferences: '',
  },
  interests: '',
  notes: '',
  declarations: {
    healthDeclaration: false,
    informationCorrect: false,
    documentsAuthentic: false,
    noFalseIntentions: false,
    informAgencyIfPlacementNoLongerNeeded: false,
    feesAccepted: false,
  },
};

// Helper to safely access nested data with fallbacks
const safeGet = <T,>(obj: any, path: string, fallback: T): T => {
  try {
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
      if (current === undefined || current === null || !Object.prototype.hasOwnProperty.call(current, key)) {
        return fallback;
      }
      current = current[key];
    }
    return (current ?? fallback) as T;
  } catch {
    return fallback;
  }
};

export const ResumeReview: React.FC<ResumeReviewProps> = ({ 
  data = EMPTY_CANDIDATE, 
  onGeneratePDF 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  // Ensure data is always defined
  const safeData = data || EMPTY_CANDIDATE;

  const getGenderLabel = (gender: string) => {
    const map: Record<string, string> = {
      male: 'Männlich',
      female: 'Weiblich',
      diverse: 'Divers',
    };
    return map[gender] || gender || '-';
  };

  const getMaritalStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      single: 'Ledig',
      married: 'Verheiratet',
      divorced: 'Geschieden',
      widowed: 'Verwitwet',
    };
    return map[status] || status || '-';
  };

  const getLanguageLevelLabel = (level: string) => {
    const map: Record<string, string> = {
      native: 'Muttersprache',
      fluent: 'Fließend',
      advanced: 'Fortgeschritten (C1/C2)',
      intermediate: 'Mittelstufe (B1/B2)',
      beginner: 'Anfänger (A1/A2)',
    };
    return map[level] || level || '-';
  };

  const formatDate = (date: string) => {
    if (!date) return '-';
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return date;
      return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return date || '-';
    }
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const lastName = safeGet(safeData, 'personal.lastName', 'Bewerber');
      const firstName = safeGet(safeData, 'personal.firstName', '');
      const filename = `Bewerberfragebogen_${lastName}_${firstName}.pdf`;
      await downloadPDF(safeData, filename);
      setPdfGenerated(true);
      if (onGeneratePDF) onGeneratePDF();
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Fehler beim Generieren des PDFs. Bitte versuchen Sie es erneut.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Safety check - if no data, show loading/empty state
  if (!safeData || !safeData.personal) {
    return (
      <div className="space-y-8">
        <div className="bg-brand-ice/10 p-6 rounded-lg border border-brand-imperial/10">
          <p className="text-center text-on-surface-variant/60">
            ⏳ Lade Daten...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* PDF Generation Button */}
      <div className="bg-brand-ice/10 p-6 rounded-lg border border-brand-imperial/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-headline-sm text-brand-imperial text-sm font-bold">
              📄 PDF generieren
            </h3>
            <p className="text-sm text-on-surface-variant/60">
              Erstellen Sie einen vollständigen Fragebogen als PDF mit allen Ihren Angaben.
            </p>
          </div>
          <button
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className={`px-6 py-3 rounded-lg font-label-md text-label-md transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              isGenerating
                ? 'bg-surface-container-low text-on-surface-variant/40 cursor-not-allowed'
                : pdfGenerated
                ? 'bg-secondary/10 text-secondary hover:bg-secondary/20 border border-secondary/30'
                : 'bg-brand-imperial hover:bg-brand-imperial/90 text-white shadow-sm hover:shadow-md'
            }`}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generiere...
              </>
            ) : pdfGenerated ? (
              <>
                <span>✅</span>
                PDF erstellt
              </>
            ) : (
              <>
                <span>📄</span>
                PDF herunterladen
              </>
            )}
          </button>
        </div>
        {pdfGenerated && (
          <p className="text-sm text-secondary mt-2">
            ✅ Das PDF wurde erfolgreich generiert und heruntergeladen.
          </p>
        )}
      </div>

      <div className="bg-brand-ice/10 p-4 rounded-lg border border-brand-imperial/10">
        <p className="text-sm text-on-surface-variant/70 flex items-center gap-2">
          <span className="text-brand-imperial">✅</span>
          Bitte überprüfen Sie alle Ihre Angaben sorgfältig, bevor Sie die Bewerbung absenden.
        </p>
      </div>

      {/* Personal Information */}
      <div className="border-b border-outline-variant/30 pb-6">
        <h3 className="font-headline-sm text-brand-imperial mb-4">1. Persönliche Angaben</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <div><span className="font-label-md text-on-surface-variant/60">Vorname:</span> <span className="font-body-md">{safeData.personal.firstName || '-'}</span></div>
          <div><span className="font-label-md text-on-surface-variant/60">Nachname:</span> <span className="font-body-md">{safeData.personal.lastName || '-'}</span></div>
          <div><span className="font-label-md text-on-surface-variant/60">Geburtsdatum:</span> <span className="font-body-md">{formatDate(safeData.personal.birthDate)}</span></div>
          <div><span className="font-label-md text-on-surface-variant/60">Geburtsort:</span> <span className="font-body-md">{safeData.personal.birthPlace || '-'}</span></div>
          <div><span className="font-label-md text-on-surface-variant/60">Geschlecht:</span> <span className="font-body-md">{getGenderLabel(safeData.personal.gender)}</span></div>
          <div><span className="font-label-md text-on-surface-variant/60">Familienstand:</span> <span className="font-body-md">{getMaritalStatusLabel(safeData.personal.maritalStatus)}</span></div>
          <div><span className="font-label-md text-on-surface-variant/60">Kinder:</span> <span className="font-body-md">{safeData.personal.hasChildren ? `Ja (${safeData.personal.numberOfChildren})` : 'Nein'}</span></div>
          <div><span className="font-label-md text-on-surface-variant/60">Nationalität:</span> <span className="font-body-md">{safeData.personal.nationality || '-'}</span></div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="border-b border-outline-variant/30 pb-6">
        <h3 className="font-headline-sm text-brand-imperial mb-4">2. Kontakt</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <div><span className="font-label-md text-on-surface-variant/60">Adresse:</span> <span className="font-body-md">{safeData.contact.address || '-'}</span></div>
          <div><span className="font-label-md text-on-surface-variant/60">PLZ:</span> <span className="font-body-md">{safeData.contact.postalCode || '-'}</span></div>
          <div><span className="font-label-md text-on-surface-variant/60">Stadt:</span> <span className="font-body-md">{safeData.contact.city || '-'}</span></div>
          <div><span className="font-label-md text-on-surface-variant/60">Land:</span> <span className="font-body-md">{safeData.contact.country || '-'}</span></div>
          <div><span className="font-label-md text-on-surface-variant/60">Telefon:</span> <span className="font-body-md">{safeData.contact.phone || '-'}</span></div>
          <div><span className="font-label-md text-on-surface-variant/60">E-Mail:</span> <span className="font-body-md">{safeData.contact.email || '-'}</span></div>
          <div><span className="font-label-md text-on-surface-variant/60">Skype:</span> <span className="font-body-md">{safeData.contact.skype || '-'}</span></div>
          <div><span className="font-label-md text-on-surface-variant/60">Verfügbar ab:</span> <span className="font-body-md">{formatDate(safeData.contact.availableFrom)}</span></div>
        </div>
      </div>

      {/* Languages */}
      <div className="border-b border-outline-variant/30 pb-6">
        <h3 className="font-headline-sm text-brand-imperial mb-4">3. Sprachkenntnisse</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {safeData.languages?.german?.level && (
            <div className="p-3 bg-surface-container-low rounded-lg">
              <span className="font-label-md text-brand-imperial">🇩🇪 Deutsch:</span>
              <span className="ml-2 font-body-md">{getLanguageLevelLabel(safeData.languages.german.level)}</span>
              {safeData.languages.german.certificate && <span className="block text-sm text-on-surface-variant/60">Zertifikat: {safeData.languages.german.certificate}</span>}
            </div>
          )}
          {safeData.languages?.french?.level && (
            <div className="p-3 bg-surface-container-low rounded-lg">
              <span className="font-label-md text-brand-imperial">🇫🇷 Französisch:</span>
              <span className="ml-2 font-body-md">{getLanguageLevelLabel(safeData.languages.french.level)}</span>
              {safeData.languages.french.certificate && <span className="block text-sm text-on-surface-variant/60">Zertifikat: {safeData.languages.french.certificate}</span>}
            </div>
          )}
          {safeData.languages?.english?.level && (
            <div className="p-3 bg-surface-container-low rounded-lg">
              <span className="font-label-md text-brand-imperial">🇬🇧 Englisch:</span>
              <span className="ml-2 font-body-md">{getLanguageLevelLabel(safeData.languages.english.level)}</span>
              {safeData.languages.english.certificate && <span className="block text-sm text-on-surface-variant/60">Zertifikat: {safeData.languages.english.certificate}</span>}
            </div>
          )}
          {safeData.languages?.spanish?.level && (
            <div className="p-3 bg-surface-container-low rounded-lg">
              <span className="font-label-md text-brand-imperial">🇪🇸 Spanisch:</span>
              <span className="ml-2 font-body-md">{getLanguageLevelLabel(safeData.languages.spanish.level)}</span>
              {safeData.languages.spanish.certificate && <span className="block text-sm text-on-surface-variant/60">Zertifikat: {safeData.languages.spanish.certificate}</span>}
            </div>
          )}
          {safeData.languages?.italian?.level && (
            <div className="p-3 bg-surface-container-low rounded-lg">
              <span className="font-label-md text-brand-imperial">🇮🇹 Italienisch:</span>
              <span className="ml-2 font-body-md">{getLanguageLevelLabel(safeData.languages.italian.level)}</span>
              {safeData.languages.italian.certificate && <span className="block text-sm text-on-surface-variant/60">Zertifikat: {safeData.languages.italian.certificate}</span>}
            </div>
          )}
          {safeData.languages?.other?.map((lang, idx) => (
            <div key={idx} className="p-3 bg-surface-container-low rounded-lg">
              <span className="font-label-md text-brand-imperial">🌐 {lang.name}:</span>
              <span className="ml-2 font-body-md">{getLanguageLevelLabel(lang.level)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience Summary */}
      <div className="border-b border-outline-variant/30 pb-6">
        <h3 className="font-headline-sm text-brand-imperial mb-4">4. Berufserfahrung ({safeData.workExperience?.length || 0} Einträge)</h3>
        {!safeData.workExperience || safeData.workExperience.length === 0 ? (
          <p className="text-on-surface-variant/50 text-sm">Keine Berufserfahrung eingetragen.</p>
        ) : (
          safeData.workExperience.map((exp, idx) => (
            <div key={idx} className="p-3 bg-surface-container-low rounded-lg mb-2">
              <div className="font-body-md font-medium text-brand-imperial">{exp.profession}</div>
              <div className="text-sm text-on-surface-variant">{exp.company}, {exp.city}</div>
              <div className="text-sm text-on-surface-variant/60">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
              {exp.tasks && <div className="text-sm mt-1 text-on-surface-variant/70">{exp.tasks}</div>}
            </div>
          ))
        )}
      </div>

      {/* Education Summary */}
      <div className="border-b border-outline-variant/30 pb-6">
        <h3 className="font-headline-sm text-brand-imperial mb-4">5. Ausbildung</h3>
        {safeData.schoolEducation && safeData.schoolEducation.length > 0 && (
          <div className="mb-4">
            <div className="font-label-md text-on-surface-variant/60">Schulausbildung:</div>
            {safeData.schoolEducation.map((edu, idx) => (
              <div key={idx} className="p-2 text-sm">
                {edu.schoolName} ({edu.type}) - {formatDate(edu.startDate)} bis {formatDate(edu.endDate)}
              </div>
            ))}
          </div>
        )}
        {safeData.vocationalEducation && safeData.vocationalEducation.length > 0 && (
          <div className="mb-4">
            <div className="font-label-md text-on-surface-variant/60">Berufsausbildung:</div>
            {safeData.vocationalEducation.map((edu, idx) => (
              <div key={idx} className="p-2 text-sm">
                {edu.profession} - {edu.institution}
              </div>
            ))}
          </div>
        )}
        {safeData.universityEducation && safeData.universityEducation.length > 0 && (
          <div className="mb-4">
            <div className="font-label-md text-on-surface-variant/60">Hochschulausbildung:</div>
            {safeData.universityEducation.map((edu, idx) => (
              <div key={idx} className="p-2 text-sm">
                {edu.field} - {edu.university} ({edu.degree})
              </div>
            ))}
          </div>
        )}
        {safeData.germanCourses && safeData.germanCourses.length > 0 && (
          <div>
            <div className="font-label-md text-on-surface-variant/60">Deutschkurse:</div>
            {safeData.germanCourses.map((course, idx) => (
              <div key={idx} className="p-2 text-sm">
                {course.institution} - Niveau {course.level} ({formatDate(course.startDate)} - {formatDate(course.endDate)})
                {course.certificate && ' ✅ Zertifikat erhalten'}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Computer Skills */}
      {safeData.computerSkills && safeData.computerSkills.length > 0 && (
        <div className="border-b border-outline-variant/30 pb-6">
          <h3 className="font-headline-sm text-brand-imperial mb-4">6. EDV-Kenntnisse</h3>
          <div className="flex flex-wrap gap-2">
            {safeData.computerSkills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-surface-container-low rounded-full text-sm">
                {skill.skill}: {skill.level}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Career Objective */}
      <div className="border-b border-outline-variant/30 pb-6">
        <h3 className="font-headline-sm text-brand-imperial mb-4">7. Berufliches Ziel</h3>
        <div className="grid grid-cols-1 gap-2">
          <div><span className="font-label-md text-on-surface-variant/60">Gewünschte Ausbildung:</span> <span className="font-body-md">{safeData.career?.desiredAusbildung || '-'}</span></div>
          <div><span className="font-label-md text-on-surface-variant/60">Gewünschter Beruf:</span> <span className="font-body-md">{safeData.career?.desiredProfession || '-'}</span></div>
          <div><span className="font-label-md text-on-surface-variant/60">Aktueller Beruf:</span> <span className="font-body-md">{safeData.career?.currentProfession || '-'}</span></div>
          {safeData.career?.otherPreferences && (
            <div><span className="font-label-md text-on-surface-variant/60">Weitere Präferenzen:</span> <span className="font-body-md">{safeData.career.otherPreferences}</span></div>
          )}
        </div>
      </div>

      {/* Interests */}
      {safeData.interests && (
        <div className="border-b border-outline-variant/30 pb-6">
          <h3 className="font-headline-sm text-brand-imperial mb-4">8. Interessen</h3>
          <p className="text-sm">{safeData.interests}</p>
        </div>
      )}

      {/* Declarations */}
      <div className="pb-4">
        <h3 className="font-headline-sm text-brand-imperial mb-4">9. Erklärungen</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={safeData.declarations?.healthDeclaration ? 'text-secondary' : 'text-error'}>
              {safeData.declarations?.healthDeclaration ? '✅' : '❌'}
            </span>
            <span className="font-body-md text-sm">Gesundheitliche Erklärung</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={safeData.declarations?.informationCorrect ? 'text-secondary' : 'text-error'}>
              {safeData.declarations?.informationCorrect ? '✅' : '❌'}
            </span>
            <span className="font-body-md text-sm">Informationen sind korrekt</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={safeData.declarations?.documentsAuthentic ? 'text-secondary' : 'text-error'}>
              {safeData.declarations?.documentsAuthentic ? '✅' : '❌'}
            </span>
            <span className="font-body-md text-sm">Dokumente sind authentisch</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={safeData.declarations?.noFalseIntentions ? 'text-secondary' : 'text-error'}>
              {safeData.declarations?.noFalseIntentions ? '✅' : '❌'}
            </span>
            <span className="font-body-md text-sm">Keine falschen Absichten</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={safeData.declarations?.informAgencyIfPlacementNoLongerNeeded ? 'text-secondary' : 'text-error'}>
              {safeData.declarations?.informAgencyIfPlacementNoLongerNeeded ? '✅' : '❌'}
            </span>
            <span className="font-body-md text-sm">Agentur informieren bei Nichtbedarf</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={safeData.declarations?.feesAccepted ? 'text-secondary' : 'text-error'}>
              {safeData.declarations?.feesAccepted ? '✅' : '❌'}
            </span>
            <span className="font-body-md text-sm">Gebühren akzeptiert</span>
          </div>
        </div>
      </div>
    </div>
  );
};