// src/app/candidature/sections/VocationalEducation.tsx
"use client";

import React from 'react';
import { VocationalEducation } from '../types';

interface VocationalEducationSectionProps {
  data: VocationalEducation[];
  updateData: (data: VocationalEducation[]) => void;
}

export const VocationalEducationSection: React.FC<VocationalEducationSectionProps> = ({
  data,
  updateData,
}) => {
  const addEntry = () => {
    const newEntry: VocationalEducation = {
      profession: '',
      institution: '',
      location: '',
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

  const updateEntry = (index: number, field: keyof VocationalEducation, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateData(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-body-md text-sm text-on-surface-variant/70">
          Bitte alle abgeschlossenen Berufsausbildungen angeben. (Veuillez indiquer toutes les formations professionnelles que vous avez terminées.)
        </p>
        <button
          type="button"
          onClick={addEntry}
          className="bg-secondary hover:bg-secondary/90 text-white font-label-md text-label-md py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
        >
          <span>+</span>
          Ausbildung hinzufügen (Ajouter une formation)
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-on-surface-variant/50 border-2 border-dashed border-outline-variant/30 rounded-xl">
          <span className="text-2xl block mb-2">🔧</span>
          <p className="font-body-md text-sm">Keine Berufsausbildung eingetragen (Aucune formation professionnelle enregistrée)</p>
          <p className="font-body-md text-xs">Klicken Sie auf &quot;Ausbildung hinzufügen&quot;, um zu beginnen (Cliquez sur « Ajouter une formation » pour commencer)</p>
        </div>
      ) : (
        data.map((entry, index) => (
          <div key={index} className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-md text-brand-imperial">
                Ausbildung #{index + 1} (Formation n° {index + 1})
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
                  Beruf (Profession) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={entry.profession}
                  onChange={(e) => updateEntry(index, 'profession', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="z.B. Kaufmann, Krankenpfleger (ex. commercial, infirmier)"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Ausbildungsstätte (Établissement de formation) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={entry.institution}
                  onChange={(e) => updateEntry(index, 'institution', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="Name der Ausbildungsstätte (Nom de l’établissement de formation)"
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
                  Abschluss (Diplôme)
                </label>
                <input
                  type="text"
                  value={entry.degree}
                  onChange={(e) => updateEntry(index, 'degree', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="z.B. Gesellenbrief, Facharbeiter (ex. certificat d’apprentissage, ouvrier qualifié)"
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