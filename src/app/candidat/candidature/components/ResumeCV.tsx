// src/app/candidature/components/ResumeCV.tsx (FIXED VERSION)
"use client";

import React, { useState, useCallback } from 'react';
import { Candidate, FormSection } from '../types';
import { PersonalInformationSection } from '../sections/PersonalInformation';
import { ContactInformationSection } from '../sections/ContactInformation';
import { GermanyHistorySection } from '../sections/GermanyHistory';
import { LanguagesSection } from '../sections/Languages';
import { GermanCoursesSection } from '../sections/GermanCourses';
import { SchoolEducationSection } from '../sections/SchoolEducation';
import { VocationalEducationSection } from '../sections/VocationalEducation';
import { UniversityEducationSection } from '../sections/UniversityEducation';
import { WorkExperienceSection } from '../sections/WorkExperience';
import { InternshipsSection } from '../sections/Internships';
import { ComputerSkillsSection } from '../sections/ComputerSkills';
import { RecognitionSection } from '../sections/Recognition';
import { DrivingLicenceSection } from '../sections/DrivingLicence';
import { CareerObjectiveSection } from '../sections/CareerObjective';
import { InterestsSection } from '../sections/Interests';
import { DeclarationsSection } from '../sections/Declarations';
import { ResumeReview } from './ResumeReview';
import { CompactResumeProgress } from './CompactResumeProgress';

interface ResumeCVProps {
  onComplete: (data: Candidate) => void;
  initialData?: Partial<Candidate>;
  isOpen?: boolean;
  onClose?: () => void;
}

// Default values for each section
const defaultPersonal: Candidate['personal'] = {
  firstName: '',
  lastName: '',
  birthDate: '',
  birthPlace: '',
  gender: '',
  maritalStatus: '',
  hasChildren: false,
  numberOfChildren: 0,
  nationality: '',
};

const defaultContact: Candidate['contact'] = {
  address: '',
  postalCode: '',
  city: '',
  country: '',
  phone: '',
  email: '',
  skype: '',
  availableFrom: '',
};

const defaultGermany: Candidate['germany'] = {
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
};

const defaultLanguages: Candidate['languages'] = {
  german: { level: '' },
  french: { level: '' },
  english: { level: '' },
  spanish: { level: '' },
  italian: { level: '' },
  other: [],
};

const defaultRecognition: Candidate['recognition'] = {
  ihk: false,
  ihkDetails: '',
  anabin: false,
  anabinDetails: '',
  zab: false,
  zabDetails: '',
};

const defaultDrivingLicence: Candidate['drivingLicence'] = {
  hasLicence: false,
  categories: [],
  sinceYear: '',
};

const defaultCareer: Candidate['career'] = {
  desiredAusbildung: '',
  desiredProfession: '',
  currentProfession: '',
  desiredSector: '',
  otherPreferences: '',
};

const defaultDeclarations: Candidate['declarations'] = {
  healthDeclaration: false,
  informationCorrect: false,
  documentsAuthentic: false,
  noFalseIntentions: false,
  informAgencyIfPlacementNoLongerNeeded: false,
  feesAccepted: false,
};

// Helper function to safely merge initialData with defaults
const createDefaultCandidate = (initialData?: Partial<Candidate>): Candidate => {
  return {
    personal: { ...defaultPersonal, ...(initialData?.personal || {}) },
    contact: { ...defaultContact, ...(initialData?.contact || {}) },
    germany: { ...defaultGermany, ...(initialData?.germany || {}) },
    languages: { 
      ...defaultLanguages, 
      ...(initialData?.languages || {}),
      german: { ...defaultLanguages.german, ...(initialData?.languages?.german || {}) },
      french: { ...defaultLanguages.french, ...(initialData?.languages?.french || {}) },
      english: { ...defaultLanguages.english, ...(initialData?.languages?.english || {}) },
      spanish: { ...defaultLanguages.spanish, ...(initialData?.languages?.spanish || {}) },
      italian: { ...defaultLanguages.italian, ...(initialData?.languages?.italian || {}) },
      other: initialData?.languages?.other || [],
    },
    germanCourses: initialData?.germanCourses || [],
    schoolEducation: initialData?.schoolEducation || [],
    vocationalEducation: initialData?.vocationalEducation || [],
    universityEducation: initialData?.universityEducation || [],
    workExperience: initialData?.workExperience || [],
    internships: initialData?.internships || [],
    computerSkills: initialData?.computerSkills || [],
    recognition: { ...defaultRecognition, ...(initialData?.recognition || {}) },
    drivingLicence: { ...defaultDrivingLicence, ...(initialData?.drivingLicence || {}) },
    career: { ...defaultCareer, ...(initialData?.career || {}) },
    interests: initialData?.interests || '',
    notes: initialData?.notes || '',
    declarations: { ...defaultDeclarations, ...(initialData?.declarations || {}) },
  };
};

// 🔑 FIX: Add isReview flag to sections
interface Section {
  id: FormSection;
  label: string;
  component: React.ComponentType<any>;
  isReview?: boolean;
}

const sections: Section[] = [
  { id: 'personal', label: 'Persönlich', component: PersonalInformationSection },
  { id: 'contact', label: 'Kontakt', component: ContactInformationSection },
  { id: 'germany', label: 'Deutschland', component: GermanyHistorySection },
  { id: 'languages', label: 'Sprachen', component: LanguagesSection },
  { id: 'germanCourses', label: 'Deutschkurse', component: GermanCoursesSection },
  { id: 'schoolEducation', label: 'Schule', component: SchoolEducationSection },
  { id: 'vocationalEducation', label: 'Berufsausbildung', component: VocationalEducationSection },
  { id: 'universityEducation', label: 'Studium', component: UniversityEducationSection },
  { id: 'workExperience', label: 'Berufserfahrung', component: WorkExperienceSection },
  { id: 'internships', label: 'Praktika', component: InternshipsSection },
  { id: 'computerSkills', label: 'EDV', component: ComputerSkillsSection },
  { id: 'recognition', label: 'Anerkennung', component: RecognitionSection },
  { id: 'drivingLicence', label: 'Führerschein', component: DrivingLicenceSection },
  { id: 'career', label: 'Berufsziel', component: CareerObjectiveSection },
  { id: 'interests', label: 'Interessen', component: InterestsSection },
  { id: 'declarations', label: 'Erklärungen', component: DeclarationsSection },
  { id: 'review', label: 'Übersicht', component: ResumeReview, isReview: true }, // 🔑 Mark as review
];

export const ResumeCV: React.FC<ResumeCVProps> = ({ 
  onComplete, 
  initialData,
  isOpen = true,
  onClose 
}) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [candidateData, setCandidateData] = useState<Candidate>(() => 
    createDefaultCandidate(initialData)
  );

  const updateSection = useCallback(<K extends keyof Candidate>(
    section: K,
    data: Partial<Candidate[K]>
  ) => {
    setCandidateData(prev => {
      const currentValue = prev[section];

      // Arrays (workExperience, schoolEducation, etc.) are always
      // rebuilt in full by their section components — replace directly.
      if (Array.isArray(currentValue)) {
        return { ...prev, [section]: data as Candidate[K] };
      }

      // Strings (interests, notes) also arrive in full.
      if (typeof currentValue === 'string') {
        return { ...prev, [section]: data as Candidate[K] };
      }

      // Object-typed sections (personal, contact, germany, languages,
      // recognition, drivingLicence, career, declarations) receive
      // partial updates per keystroke — merge instead of overwrite.
      return {
        ...prev,
        [section]: { ...(currentValue as object), ...(data as object) } as Candidate[K],
      };
    });
  }, []);

  const currentSection = sections[currentSectionIndex];
  const CurrentComponent = currentSection.component;

  // 🔑 FIX: For review section, pass the full candidate data
  // For other sections, pass the section-specific data
  const sectionData = currentSection.isReview 
    ? candidateData 
    : candidateData[currentSection.id as keyof Candidate];

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    } else {
      onComplete(candidateData);
      if (onClose) onClose();
    }
  };

  const handleBack = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const handleSectionChange = (index: number) => {
    if (index <= currentSectionIndex + 1) {
      setCurrentSectionIndex(index);
    }
  };

  // If not open, return null
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header with close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 bg-surface-container-lowest flex-shrink-0">
          <div>
            <h2 className="font-headline-md text-brand-imperial text-lg">
              📋 Bewerberfragebogen
            </h2>
            <p className="font-body-md text-xs text-on-surface-variant/60">
              {currentSectionIndex + 1} von {sections.length} • {currentSection.label}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-container-low rounded-lg transition-colors text-on-surface-variant hover:text-brand-imperial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Compact Progress */}
        <div className="px-6 py-3 bg-surface-container-low border-b border-outline-variant/20 flex-shrink-0">
          <CompactResumeProgress
            sections={sections}
            currentIndex={currentSectionIndex}
            onSectionClick={handleSectionChange}
          />
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in">
            <CurrentComponent
              data={sectionData}
              updateData={(data: any) => {
                // 🔑 FIX: Review section doesn't update data
                if (currentSection.isReview) return;
                updateSection(currentSection.id as keyof Candidate, data);
              }}
              allData={candidateData}
            />
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-outline-variant/30 bg-surface-container-lowest flex-shrink-0">
          <button
            type="button"
            onClick={handleBack}
            className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all duration-300 flex items-center ${
              currentSectionIndex === 0
                ? 'text-on-surface-variant/40 cursor-not-allowed'
                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-brand-imperial'
            }`}
            disabled={currentSectionIndex === 0}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="bg-brand-imperial hover:bg-brand-imperial/90 text-white font-label-md text-label-md px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
          >
            {currentSectionIndex === sections.length - 1 ? (
              <>
                <span>✅</span>
                Abschließen
              </>
            ) : (
              <>
                <span>Weiter</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};