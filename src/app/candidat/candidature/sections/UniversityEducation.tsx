// src/app/candidature/sections/UniversityEducation.tsx
"use client";

import React from 'react';
import { UniversityEducation } from '../types';

interface UniversityEducationSectionProps {
  data: UniversityEducation[];
  updateData: (data: UniversityEducation[]) => void;
}

export const UniversityEducationSection: React.FC<UniversityEducationSectionProps> = ({
  data,
  updateData,
}) => {
  const addEntry = () => {
    const newEntry: UniversityEducation = {
      field: '',
      university: '',
      location: '',
      degree: '',
      startDate: '',
      endDate: '',
    };
    updateData([...data, newEntry]);
  };

  const removeEntry = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };

  const updateEntry = (index: number, field: keyof UniversityEducation, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateData(newData);
  };

  const degreeTypes = [
    { value: '', label: 'Bitte wählen (Veuillez choisir)' },
    { value: 'bachelor', label: 'Bachelor (Licence)' },
    { value: 'master', label: 'Master (Master)' },
    { value: 'diplom', label: 'Diplom (Diplôme)' },
    { value: 'magister', label: 'Magister (Magistère)' },
    { value: 'doctorate', label: 'Doktor / PhD (Doctorat / PhD)' },
    { value: 'licence', label: 'Licence (Licence)' },
    { value: 'maitrise', label: 'Maîtrise (Maîtrise)' },
    { value: 'ingenieur', label: 'Ingenieur (Ingénieur)' },
    { value: 'other', label: 'Andere (Autre)' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-body-md text-sm text-on-surface-variant/70">
          Bitte alle Hochschulausbildungen angeben (Studiengänge). (Veuillez indiquer toutes vos formations universitaires (cursus d’études).)
        </p>
        <button
          type="button"
          onClick={addEntry}
          className="bg-secondary hover:bg-secondary/90 text-white font-label-md text-label-md py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
        >
          <span>+</span>
          Studium hinzufügen (Ajouter une formation)
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-on-surface-variant/50 border-2 border-dashed border-outline-variant/30 rounded-xl">
          <span className="text-2xl block mb-2">🎓</span>
          <p className="font-body-md text-sm">Keine Hochschulausbildung eingetragen (Aucune formation universitaire enregistrée)</p>
          <p className="font-body-md text-xs">Klicken Sie auf &quot;Studium hinzufügen&quot;, um zu beginnen (Cliquez sur « Ajouter une formation » pour commencer)</p>
        </div>
      ) : (
        data.map((entry, index) => (
          <div key={index} className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-md text-brand-imperial">
                Studium #{index + 1} (Formation n° {index + 1})
              </span>
              <button
                type="button"
                onClick={() => removeEntry(index)}
                className="text-error hover:text-error/80 text-sm"
              >
                Entfernen (Supprimer)
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Studienfach (Domaine d’études) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={entry.field}
                  onChange={(e) => updateEntry(index, 'field', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="z.B. Maschinenbau, Informatik (ex. génie mécanique, informatique)"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Hochschule / Universität (Établissement / Université) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={entry.university}
                  onChange={(e) => updateEntry(index, 'university', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="Name der Hochschule (Nom de l’établissement)"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Ort (Lieu) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={entry.location}
                  onChange={(e) => updateEntry(index, 'location', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="Stadt, Land (Ville, Pays)"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Abschluss (Diplôme) <span className="text-error">*</span>
                </label>
                <select
                  value={entry.degree}
                  onChange={(e) => updateEntry(index, 'degree', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  required
                >
                  {degreeTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Von (De) <span className="text-error">*</span>
                </label>
                <input
                  type="date"
                  value={entry.startDate}
                  onChange={(e) => updateEntry(index, 'startDate', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Bis (Jusqu’au) <span className="text-error">*</span>
                </label>
                <input
                  type="date"
                  value={entry.endDate}
                  onChange={(e) => updateEntry(index, 'endDate', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  required
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};