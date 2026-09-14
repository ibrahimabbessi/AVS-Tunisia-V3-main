// src/app/candidature/types.ts

export interface PersonalInformation {
  firstName: string;
  lastName: string;
  birthDate: string;
  birthPlace: string;
  gender: string;
  maritalStatus: string;
  hasChildren: boolean;
  numberOfChildren: number;
  nationality: string;
  joinDate?: string; // ← NEW: Beitrittsdatum
}

export interface ContactInformation {
  address: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  skype: string;
  availableFrom: string;
}

export interface GermanyStay {
  city: string;
  duration: string;
  purpose: string;
}

export interface GermanyHistory {
  // Family & Friends
  hasFamilyOrFriends: boolean;
  familyOrFriendsDetails: string;
  // NEW: Separate family/friends
  familyInGermany?: boolean;
  familyInGermanyDetails?: string;
  friendsInGermany?: boolean;
  friendsInGermanyDetails?: string;
  // Visa
  previousVisaApplication: boolean;
  visaType: string;
  visaResult: string;
  visaDate: string;
  visaDateUntil?: string; // ← NEW
  // Previous stays
  previousStay: boolean;
  previousStayDetails: string;
  previousStayVisaType?: string; // ← NEW
  stays: GermanyStay[];
  // Other agency
  otherAgency: string;
  appliedToOtherAgency?: boolean; // ← NEW
  otherAgencyName?: string; // ← NEW
  otherAgencyDate?: string; // ← NEW
}

export interface LanguageSkill {
  level: string;
  certificate?: string;
}

export interface LanguageSkills {
  german: LanguageSkill;
  french: LanguageSkill;
  english: LanguageSkill;
  spanish: LanguageSkill;
  italian: LanguageSkill;
  other: Array<{ name: string; level: string }>;
  // NEW: German course info
  germanCourse?: {
    schoolName?: string;   // ← made optional
    city?: string;         // ← made optional
    startDate?: string;    // ← made optional
    endDate?: string;      // ← made optional
  };
  otherNotes?: string; // ← NEW
}

export interface GermanCourse {
  institution: string;
  location: string;
  level: string;
  startDate: string;
  endDate: string;
  certificate: boolean;
}

export interface SchoolEducation {
  schoolName: string;
  location: string;
  type: string;
  startDate: string;
  endDate: string;
  degree: string;
  abiturSubject?: string; // ← NEW
  abiturYear?: string; // ← NEW
}

export interface VocationalEducation {
  profession: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  degree: string;
}

export interface UniversityEducation {
  field: string;
  university: string;
  location: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface WorkExperience {
  profession: string;
  company: string;
  city: string;
  startDate: string;
  endDate: string;
  tasks: string;
}

export interface Internship {
  profession: string;
  company: string;
  city: string;
  startDate: string;
  endDate: string;
  tasks: string;
}

export interface ComputerSkill {
  skill: string;
  level: string;
}

export interface Recognition {
  ihk: boolean;
  ihkDetails: string;
  ihkDate?: string; // ← NEW
  ihkLocation?: string; // ← NEW
  anabin: boolean;
  anabinDetails: string;
  anabinDate?: string; // ← NEW
  anabinLocation?: string; // ← NEW
  zab: boolean;
  zabDetails: string;
}

export interface DrivingLicence {
  hasLicence: boolean;
  categories: string[];
  sinceYear: string;
  categoriesText?: string; // ← NEW: free text for "Welche"
}

export interface CareerObjective {
  desiredAusbildung: string;
  desiredProfession: string;
  currentProfession: string;
  desiredSector: string;
  otherPreferences: string;
}

export interface Declarations {
  healthDeclaration: boolean;
  informationCorrect: boolean;
  documentsAuthentic: boolean;
  noFalseIntentions: boolean;
  informAgencyIfPlacementNoLongerNeeded: boolean;
  feesAccepted: boolean;
}

export interface Candidate {
  personal: PersonalInformation;
  contact: ContactInformation;
  germany: GermanyHistory;
  languages: LanguageSkills;
  germanCourses: GermanCourse[];
  schoolEducation: SchoolEducation[];
  vocationalEducation: VocationalEducation[];
  universityEducation: UniversityEducation[];
  workExperience: WorkExperience[];
  internships: Internship[];
  computerSkills: ComputerSkill[];
  recognition: Recognition;
  drivingLicence: DrivingLicence;
  career: CareerObjective;
  interests: string;
  hobbies?: string; // ← NEW
  notes: string;
  otherNotes?: string; // ← NEW
  declarations: Declarations;
}

export type FormSection =
  | 'personal'
  | 'contact'
  | 'germany'
  | 'languages'
  | 'germanCourses'
  | 'schoolEducation'
  | 'vocationalEducation'
  | 'universityEducation'
  | 'workExperience'
  | 'internships'
  | 'computerSkills'
  | 'recognition'
  | 'drivingLicence'
  | 'career'
  | 'interests'
  | 'declarations'
  | 'review';