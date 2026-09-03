// src/app/candidature/types.ts

export interface PersonalInformation {
  firstName: string;
  lastName: string;
  birthDate: string;
  birthPlace: string;
  gender: 'male' | 'female' | 'diverse' | '';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | '';
  hasChildren: boolean;
  numberOfChildren: number;
  nationality: string;
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
  hasFamilyOrFriends: boolean;
  familyOrFriendsDetails: string;
  previousVisaApplication: boolean;
  visaType: string;
  visaResult: string;
  visaDate: string;
  previousStay: boolean;
  previousStayDetails: string;
  stays: GermanyStay[];
  otherAgency: string;
}

export interface LanguageSkill {
  level: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'beginner' | '';
  certificate?: string;
  certificateDate?: string;
}

export interface LanguageSkills {
  german: LanguageSkill;
  french: LanguageSkill;
  english: LanguageSkill;
  spanish: LanguageSkill;
  italian: LanguageSkill;
  other: {
    name: string;
    level: string;
  }[];
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
  level: 'expert' | 'advanced' | 'intermediate' | 'beginner' | '';
}

export interface Recognition {
  ihk: boolean;
  ihkDetails: string;
  anabin: boolean;
  anabinDetails: string;
  zab: boolean;
  zabDetails: string;
}

export interface DrivingLicence {
  hasLicence: boolean;
  categories: string[];
  sinceYear: string;
}

export interface CareerObjective {
  desiredAusbildung: string;
  desiredProfession: string;
  currentProfession: string;
  desiredSector: string;      // new
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
  notes: string;
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