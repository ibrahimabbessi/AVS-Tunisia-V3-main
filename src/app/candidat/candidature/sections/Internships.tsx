// src/app/candidature/sections/Internships.tsx
"use client";

import React from 'react';
import { Internship } from '../types';

interface InternshipsSectionProps {
  data: Internship[];
  updateData: (data: Internship[]) => void;
}

export const InternshipsSection: React.FC<InternshipsSectionProps> = ({
  data,
  updateData,
}) => {
  const addEntry = () => {
    const newEntry: Internship = {
      profession: '',
      company: '',
      city: '',
      startDate: '',
      endDate: '',
      tasks: '',
    };
    updateData([...data, newEntry]);
  };

  const removeEntry = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };

  const updateEntry = (index: number, field: keyof Internship, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateData(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-body-md text-sm text-on-surface-variant/70">
          Bitte alle absolvierten Praktika angeben. (Veuillez indiquer tous les stages que vous avez effectués.)
        </p>
        <button
          type="button"
          onClick={addEntry}
          className="bg-secondary hover:bg-secondary/90 text-white font-label-md text-label-md py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
        >
          <span>+</span>
          Praktikum hinzufügen (Ajouter un stage)
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-on-surface-variant/50 border-2 border-dashed border-outline-variant/30 rounded-xl">
          <span className="text-2xl block mb-2">💡</span>
          <p className="font-body-md text-sm">Keine Praktika eingetragen (Aucun stage enregistré)</p>
          <p className="font-body-md text-xs">Klicken Sie auf &quot;Praktikum hinzufügen&quot;, um zu beginnen (Cliquez sur « Ajouter un stage » pour commencer)</p>
        </div>
      ) : (
        data.map((entry, index) => (
          <div key={index} className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-md text-brand-imperial">
                Praktikum #{index + 1} (Stage n° {index + 1})
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
                  Tätigkeit / Position (Fonction / Poste) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={entry.profession}
                  onChange={(e) => updateEntry(index, 'profession', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="z.B. Praktikant im Marketing (ex. stagiaire en marketing)"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Unternehmen (Entreprise) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={entry.company}
                  onChange={(e) => updateEntry(index, 'company', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="Name des Unternehmens (Nom de l’entreprise)"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Ort (Lieu) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={entry.city}
                  onChange={(e) => updateEntry(index, 'city', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="Stadt, Land (Ville, Pays)"
                  required
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
              <div className="space-y-2 md:col-span-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Tätigkeiten (Tâches / Missions) <span className="text-error">*</span>
                </label>
                <textarea
                  value={entry.tasks}
                  onChange={(e) => updateEntry(index, 'tasks', e.target.value)}
                  rows={3}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="Beschreiben Sie Ihre Hauptaufgaben während des Praktikums (Décrivez vos principales tâches pendant le stage)"
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