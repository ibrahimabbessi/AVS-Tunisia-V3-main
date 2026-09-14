// src/app/candidature/sections/PersonalInformation.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { PersonalInformation } from '../types';

interface PersonalInformationSectionProps {
  data?: PersonalInformation;
  updateData: (data: Partial<PersonalInformation>) => void;
  compact?: boolean;
}

const defaultData: PersonalInformation = {
  firstName: '',
  lastName: '',
  birthDate: '',
  birthPlace: '',
  gender: '',
  maritalStatus: '',
  hasChildren: false,
  numberOfChildren: 0,
  nationality: '',
  joinDate: '', // ← NEW
};

export const PersonalInformationSection: React.FC<PersonalInformationSectionProps> = ({
  data,
  updateData,
  compact = true,
}) => {
  const prevDataRef = useRef(data);
  
  useEffect(() => {
    if (prevDataRef.current !== data) {
      prevDataRef.current = data;
    }
  });

  const safeData = useMemo(() => ({
    firstName: data?.firstName ?? '',
    lastName: data?.lastName ?? '',
    birthDate: data?.birthDate ?? '',
    birthPlace: data?.birthPlace ?? '',
    gender: data?.gender ?? '',
    maritalStatus: data?.maritalStatus ?? '',
    hasChildren: data?.hasChildren ?? false,
    numberOfChildren: data?.numberOfChildren ?? 0,
    nationality: data?.nationality ?? '',
    joinDate: data?.joinDate ?? '', // ← NEW
  }), [data]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      updateData({ [name]: checked });
    } else if (name === 'hasChildren') {
      const boolValue = value === 'true';
      updateData({ 
        hasChildren: boolValue,
        numberOfChildren: boolValue ? safeData.numberOfChildren || 1 : 0 
      });
    } else if (type === 'number') {
      const numValue = value === '' ? 0 : parseInt(value, 10);
      updateData({ [name]: numValue });
    } else {
      updateData({ [name]: value });
    }
  }, [updateData, safeData.numberOfChildren]);

  const inputClasses = compact
    ? "w-full bg-white border border-outline-variant rounded-lg px-3 py-2 font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
    : "w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow";

  const labelClasses = compact
    ? "block font-label-md text-xs text-brand-imperial"
    : "block font-label-md text-label-md text-brand-imperial";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelClasses}>
            Vorname (Prénom) <span className="text-error">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={safeData.firstName}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Vorname (Prénom)"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className={labelClasses}>
            Nachname (Nom de famille) <span className="text-error">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={safeData.lastName}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Nachname (Nom de famille)"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className={labelClasses}>
            Geburtsdatum (Date de naissance) <span className="text-error">*</span>
          </label>
          <input
            type="date"
            name="birthDate"
            value={safeData.birthDate}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className={labelClasses}>
            Geburtsort (Lieu de naissance) <span className="text-error">*</span>
          </label>
          <input
            type="text"
            name="birthPlace"
            value={safeData.birthPlace}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Stadt, Land (Ville, Pays)"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className={labelClasses}>
            Geschlecht (Sexe) <span className="text-error">*</span>
          </label>
          <select
            name="gender"
            value={safeData.gender}
            onChange={handleChange}
            className={inputClasses}
            required
          >
            <option value="">Bitte wählen (Veuillez choisir)</option>
            <option value="male">Männlich (Masculin)</option>
            <option value="female">Weiblich (Féminin)</option>
            <option value="diverse">Divers (Divers)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className={labelClasses}>
            Familienstand (Situation familiale) <span className="text-error">*</span>
          </label>
          <select
            name="maritalStatus"
            value={safeData.maritalStatus}
            onChange={handleChange}
            className={inputClasses}
            required
          >
            <option value="">Bitte wählen (Veuillez choisir)</option>
            <option value="single">Ledig (Célibataire)</option>
            <option value="married">Verheiratet (Marié(e))</option>
            <option value="divorced">Geschieden (Divorcé(e))</option>
            <option value="widowed">Verwitwet (Veuf/Veuve)</option>
          </select>
        </div>

        {/* ← NEW: Beitrittsdatum */}
        <div className="space-y-1.5">
          <label className={labelClasses}>
            Beitrittsdatum (Date d'adhésion)
          </label>
          <input
            type="date"
            name="joinDate"
            value={safeData.joinDate}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <label className={labelClasses}>
            Kinder (Enfants):
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="hasChildren"
                value="false"
                checked={!safeData.hasChildren}
                onChange={handleChange}
                className="w-4 h-4"
              />
              Nein (Non)
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="hasChildren"
                value="true"
                checked={safeData.hasChildren}
                onChange={handleChange}
                className="w-4 h-4"
              />
              Ja (Oui)
            </label>
          </div>
        </div>

        {safeData.hasChildren && (
          <div className="ml-6 space-y-1.5">
            <label className={labelClasses}>
              Anzahl Kinder (Nombre d'enfants)
            </label>
            <input
              type="number"
              name="numberOfChildren"
              value={safeData.numberOfChildren || ''}
              onChange={handleChange}
              min="1"
              max="20"
              className={`${inputClasses} max-w-xs`}
            />
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <label className={labelClasses}>
          Nationalität (Nationalité) <span className="text-error">*</span>
        </label>
        <input
          type="text"
          name="nationality"
          value={safeData.nationality}
          onChange={handleChange}
          className={inputClasses}
          placeholder="z.B. Tunesisch (ex. Tunisienne)"
          required
        />
      </div>
    </div>
  );
};