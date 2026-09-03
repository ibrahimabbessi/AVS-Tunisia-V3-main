// src/app/candidature/sections/Languages.tsx
"use client";

import React from 'react';
import { LanguageSkills, LanguageSkill } from '../types';

interface LanguagesSectionProps {
  data: LanguageSkills;
  updateData: (data: Partial<LanguageSkills>) => void;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  data,
  updateData,
}) => {
  const languageLevels = [
    { value: '', label: 'Bitte wählen (Veuillez choisir)' },
    { value: 'native', label: 'Muttersprache (Langue maternelle)' },
    { value: 'fluent', label: 'Fließend (Courant)' },
    { value: 'advanced', label: 'Fortgeschritten (C1/C2) (Avancé (C1/C2))' },
    { value: 'intermediate', label: 'Mittelstufe (B1/B2) (Intermédiaire (B1/B2))' },
    { value: 'beginner', label: 'Anfänger (A1/A2) (Débutant (A1/A2))' },
  ];

  const updateLanguage = (lang: keyof LanguageSkills, field: keyof LanguageSkill, value: string) => {
    if (lang === 'other') return;
    const current = data[lang] as LanguageSkill;
    updateData({
      [lang]: { ...current, [field]: value }
    });
  };

  const addOtherLanguage = () => {
    updateData({
      other: [...data.other, { name: '', level: '' }]
    });
  };

  const removeOtherLanguage = (index: number) => {
    const newOther = [...data.other];
    newOther.splice(index, 1);
    updateData({ other: newOther });
  };

  const updateOtherLanguage = (index: number, field: 'name' | 'level', value: string) => {
    const newOther = [...data.other];
    newOther[index] = { ...newOther[index], [field]: value };
    updateData({ other: newOther });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-headline-sm text-brand-imperial border-b border-outline-variant/30 pb-2">
          Sprachkenntnisse (Compétences linguistiques)
        </h3>

        {/* German */}
        <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🇩🇪</span>
            <span className="font-label-md text-brand-imperial font-bold">Deutsch (Allemand)</span>
            <span className="text-xs text-on-surface-variant/60">(GER-Zertifikat empfohlen) (Certificat GER recommandé)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block font-label-md text-xs text-brand-imperial">Niveau (Niveau)</label>
              <select
                value={data.german.level}
                onChange={(e) => updateLanguage('german', 'level', e.target.value)}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
              >
                {languageLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block font-label-md text-xs text-brand-imperial">Zertifikat (optional) (Certificat (facultatif))</label>
              <input
                type="text"
                value={data.german.certificate || ''}
                onChange={(e) => updateLanguage('german', 'certificate', e.target.value)}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                placeholder="z.B. Goethe B2, telc C1 (ex. Goethe B2, telc C1)"
              />
            </div>
          </div>
        </div>

        {/* French */}
        <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🇫🇷</span>
            <span className="font-label-md text-brand-imperial font-bold">Französisch (Français)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block font-label-md text-xs text-brand-imperial">Niveau (Niveau)</label>
              <select
                value={data.french.level}
                onChange={(e) => updateLanguage('french', 'level', e.target.value)}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
              >
                {languageLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block font-label-md text-xs text-brand-imperial">Zertifikat (optional) (Certificat (facultatif))</label>
              <input
                type="text"
                value={data.french.certificate || ''}
                onChange={(e) => updateLanguage('french', 'certificate', e.target.value)}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                placeholder="z.B. DELF B2, DALF C1 (ex. DELF B2, DALF C1)"
              />
            </div>
          </div>
        </div>

        {/* English */}
        <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🇬🇧</span>
            <span className="font-label-md text-brand-imperial font-bold">Englisch (Anglais)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block font-label-md text-xs text-brand-imperial">Niveau (Niveau)</label>
              <select
                value={data.english.level}
                onChange={(e) => updateLanguage('english', 'level', e.target.value)}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
              >
                {languageLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block font-label-md text-xs text-brand-imperial">Zertifikat (optional) (Certificat (facultatif))</label>
              <input
                type="text"
                value={data.english.certificate || ''}
                onChange={(e) => updateLanguage('english', 'certificate', e.target.value)}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                placeholder="z.B. IELTS, TOEFL (ex. IELTS, TOEFL)"
              />
            </div>
          </div>
        </div>

        {/* Spanish */}
        <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🇪🇸</span>
            <span className="font-label-md text-brand-imperial font-bold">Spanisch (Espagnol)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block font-label-md text-xs text-brand-imperial">Niveau (Niveau)</label>
              <select
                value={data.spanish.level}
                onChange={(e) => updateLanguage('spanish', 'level', e.target.value)}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
              >
                {languageLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block font-label-md text-xs text-brand-imperial">Zertifikat (optional) (Certificat (facultatif))</label>
              <input
                type="text"
                value={data.spanish.certificate || ''}
                onChange={(e) => updateLanguage('spanish', 'certificate', e.target.value)}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                placeholder="z.B. DELE (ex. DELE)"
              />
            </div>
          </div>
        </div>

        {/* Italian */}
        <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🇮🇹</span>
            <span className="font-label-md text-brand-imperial font-bold">Italienisch (Italien)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block font-label-md text-xs text-brand-imperial">Niveau (Niveau)</label>
              <select
                value={data.italian.level}
                onChange={(e) => updateLanguage('italian', 'level', e.target.value)}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
              >
                {languageLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block font-label-md text-xs text-brand-imperial">Zertifikat (optional) (Certificat (facultatif))</label>
              <input
                type="text"
                value={data.italian.certificate || ''}
                onChange={(e) => updateLanguage('italian', 'certificate', e.target.value)}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                placeholder="z.B. CELI, CILS (ex. CELI, CILS)"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Other Languages */}
      <div className="space-y-4 border-t border-outline-variant/30 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-brand-imperial">Weitere Sprachen (Autres langues)</h3>
          <button
            type="button"
            onClick={addOtherLanguage}
            className="text-sm text-secondary hover:text-secondary/80 font-medium flex items-center gap-1"
          >
            + Sprache hinzufügen (+ Ajouter une langue)
          </button>
        </div>

        {data.other.map((lang, index) => (
          <div key={index} className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
            <div className="flex justify-between items-start mb-3">
              <span className="font-label-md text-sm text-brand-imperial">
                Sprache #{index + 1} (Langue n° {index + 1})
              </span>
              <button
                type="button"
                onClick={() => removeOtherLanguage(index)}
                className="text-error hover:text-error/80 text-sm"
              >
                Entfernen (Supprimer)
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">Sprache (Langue)</label>
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => updateOtherLanguage(index, 'name', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="z.B. Russisch, Chinesisch (ex. russe, chinois)"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">Niveau (Niveau)</label>
                <select
                  value={lang.level}
                  onChange={(e) => updateOtherLanguage(index, 'level', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                >
                  {languageLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};