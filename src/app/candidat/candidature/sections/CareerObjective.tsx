// src/app/candidature/sections/CareerObjective.tsx
"use client";

import React from 'react';
import { CareerObjective } from '../types';

interface CareerObjectiveSectionProps {
  data: CareerObjective;
  updateData: (data: Partial<CareerObjective>) => void;
}

export const CareerObjectiveSection: React.FC<CareerObjectiveSectionProps> = ({
  data,
  updateData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const ausbildungTypes = [
    { value: '', label: 'Bitte wählen (Veuillez choisir)' },
    { value: 'duales-studium', label: 'Duales Studium (Études en alternance)' },
    { value: 'betriebliche-ausbildung', label: 'Betriebliche Ausbildung (Formation professionnelle en entreprise)' },
    { value: 'schulische-ausbildung', label: 'Schulische Ausbildung (Formation professionnelle scolaire)' },
    { value: 'umschulung', label: 'Umschulung (Reconversion professionnelle)' },
    { value: 'weiterbildung', label: 'Weiterbildung (Formation continue)' },
    { value: 'other', label: 'Andere (Autre)' },
  ];

  const sectors = [
    { value: '', label: 'Bitte wählen (Veuillez choisir)' },
    { value: 'healthcare', label: 'Gesundheitswesen (Secteur de la santé)' },
    { value: 'tourism', label: 'Tourismus (Tourisme)' },
    { value: 'hospitality', label: 'Gastronomie / Hotellerie (Restauration / Hôtellerie)' },
    { value: 'automotive', label: 'Automobil / Mechanik (Automobile / Mécanique)' },
    { value: 'industry', label: 'Industrie (Industrie)' },
    { value: 'it', label: 'IT / Software (Informatique / Logiciel)' },
    { value: 'construction', label: 'Bau / Handwerk (Construction / Artisanat)' },
    { value: 'logistics', label: 'Logistik / Transport (Logistique / Transport)' },
    { value: 'education', label: 'Bildung / Pädagogik (Éducation / Pédagogie)' },
    { value: 'retail', label: 'Handel / Vertrieb (Commerce / Vente)' },
    { value: 'other', label: 'Andere (Autre)' },
  ];

  return (
    <div className="space-y-6">
      <p className="font-body-md text-sm text-on-surface-variant/70">
        Bitte geben Sie Ihr berufliches Ziel und Ihre Präferenzen an. (Veuillez indiquer votre objectif professionnel et vos préférences.)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-brand-imperial">
            Art der Ausbildung (Type de formation) <span className="text-error">*</span>
          </label>
          <select
            name="desiredAusbildung"
            value={data.desiredAusbildung}
            onChange={handleChange}
            className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
            required
          >
            {ausbildungTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-brand-imperial">
            Gewünschter Beruf (Profession souhaitée) <span className="text-error">*</span>
          </label>
          <input
            type="text"
            name="desiredProfession"
            value={data.desiredProfession}
            onChange={handleChange}
            className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
            placeholder="z.B. Pflegefachkraft, Softwareentwickler (ex. infirmier/infirmière, développeur logiciel)"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-brand-imperial">
            Aktueller Beruf (Profession actuelle) <span className="text-error">*</span>
          </label>
          <input
            type="text"
            name="currentProfession"
            value={data.currentProfession}
            onChange={handleChange}
            className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
            placeholder="Aktuelle berufliche Tätigkeit (Activité professionnelle actuelle)"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-brand-imperial">
            Gewünschte Branche (Secteur souhaité)
          </label>
          <select
            name="otherPreferences"
            value={data.otherPreferences}
            onChange={handleChange}
            className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
          >
            {sectors.map(sector => (
              <option key={sector.value} value={sector.value}>{sector.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block font-label-md text-label-md text-brand-imperial">
          Weitere Präferenzen (Autres préférences)
        </label>
        <textarea
          name="otherPreferences"
          value={data.otherPreferences}
          onChange={handleChange}
          rows={3}
          className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
          placeholder="z.B. gewünschte Region, Gehaltsvorstellungen, Arbeitszeiten, etc. (ex. région souhaitée, prétentions salariales, horaires de travail, etc.)"
        />
      </div>

      <div className="mt-4 p-4 bg-brand-ice/10 rounded-lg border border-brand-imperial/10">
        <p className="text-sm text-on-surface-variant/70 flex items-center gap-2">
          <span className="text-brand-imperial">ℹ️</span>
          Diese Angaben helfen uns, die passende Stelle für Sie zu finden. (Ces informations nous aident à trouver le poste qui vous correspond.)
        </p>
      </div>
    </div>
  );
};