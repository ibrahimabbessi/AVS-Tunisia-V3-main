// src/app/candidature/sections/SchoolEducation.tsx
"use client";

import React from 'react';
import { SchoolEducation } from '../types';

interface SchoolEducationSectionProps {
  data: SchoolEducation[];
  updateData: (data: SchoolEducation[]) => void;
}

export const SchoolEducationSection: React.FC<SchoolEducationSectionProps> = ({
  data,
  updateData,
}) => {
  const addEntry = () => {
    const newEntry: SchoolEducation = {
      schoolName: '',
      location: '',
      type: '',
      startDate: '',
      endDate: '',
      degree: '',
    };
    updateData([...data, newEntry]);
  };

  const removeEntry = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };

  const updateEntry = (index: number, field: keyof SchoolEducation, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateData(newData);
  };

  const schoolTypes = [
    { value: '', label: 'Bitte wählen (Veuillez choisir)' },
    { value: 'grundschule', label: 'Grundschule (École primaire)' },
    { value: 'mittelschule', label: 'Mittelschule (Collège)' },
    { value: 'gymnasium', label: 'Gymnasium (Lycée)' },
    { value: 'realschule', label: 'Realschule (École secondaire)' },
    { value: 'hauptschule', label: 'Hauptschule (École secondaire générale)' },
    { value: 'gesamtschule', label: 'Gesamtschule (École polyvalente)' },
    { value: 'berufsschule', label: 'Berufsschule (École professionnelle)' },
    { value: 'college', label: 'Collège (Collège)' },
    { value: 'lycee', label: 'Lycée (Lycée)' },
    { value: 'other', label: 'Andere (Autre)' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-body-md text-sm text-on-surface-variant/70">
          Bitte alle Stationen Ihrer Schulausbildung angeben (in chronologischer Reihenfolge). (Veuillez indiquer toutes les étapes de votre scolarité, dans l’ordre chronologique.)
        </p>
        <button
          type="button"
          onClick={addEntry}
          className="bg-secondary hover:bg-secondary/90 text-white font-label-md text-label-md py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
        >
          <span>+</span>
          Schule hinzufügen (Ajouter une école)
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-on-surface-variant/50 border-2 border-dashed border-outline-variant/30 rounded-xl">
          <span className="text-2xl block mb-2">🏫</span>
          <p className="font-body-md text-sm">Keine Schulausbildung eingetragen (Aucune formation scolaire enregistrée)</p>
          <p className="font-body-md text-xs">Klicken Sie auf &quot;Schule hinzufügen&quot;, um zu beginnen (Cliquez sur « Ajouter une école » pour commencer)</p>
        </div>
      ) : (
        data.map((entry, index) => (
          <div key={index} className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-md text-brand-imperial">
                Schule #{index + 1} (École n° {index + 1})
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
                  Name der Schule (Nom de l’école) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={entry.schoolName}
                  onChange={(e) => updateEntry(index, 'schoolName', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="Name der Schule (Nom de l’école)"
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
                  Schultyp (Type d’établissement scolaire) <span className="text-error">*</span>
                </label>
                <select
                  value={entry.type}
                  onChange={(e) => updateEntry(index, 'type', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  required
                >
                  {schoolTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Abschluss (Diplôme)
                </label>
                <input
                  type="text"
                  value={entry.degree}
                  onChange={(e) => updateEntry(index, 'degree', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="z.B. Abitur, Baccalauréat (ex. Abitur, Baccalauréat)"
                />
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