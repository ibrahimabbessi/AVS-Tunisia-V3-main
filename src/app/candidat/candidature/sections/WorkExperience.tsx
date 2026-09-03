// src/app/candidature/sections/WorkExperience.tsx
"use client";

import React from 'react';
import { WorkExperience } from '../types';

interface WorkExperienceSectionProps {
  data: WorkExperience[];
  updateData: (data: WorkExperience[]) => void;
}

export const WorkExperienceSection: React.FC<WorkExperienceSectionProps> = ({
  data,
  updateData,
}) => {
  const addExperience = () => {
    const newExperience: WorkExperience = {
      profession: '',
      company: '',
      city: '',
      startDate: '',
      endDate: '',
      tasks: '',
    };
    updateData([...data, newExperience]);
  };

  const removeExperience = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };

  const updateExperience = (index: number, field: keyof WorkExperience, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateData(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-body-md text-sm text-on-surface-variant/70">
          Berufserfahrung in chronologischer Reihenfolge (neueste zuerst) (Expérience professionnelle par ordre chronologique (la plus récente en premier))
        </p>
        <button
          type="button"
          onClick={addExperience}
          className="bg-secondary hover:bg-secondary/90 text-white font-label-md text-label-md py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
        >
          <span>+</span>
          Erfahrung hinzufügen (Ajouter une expérience)
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-on-surface-variant/50 border-2 border-dashed border-outline-variant/30 rounded-xl">
          <span className="text-2xl block mb-2">💼</span>
          <p className="font-body-md text-sm">Keine Berufserfahrung eingetragen (Aucune expérience professionnelle enregistrée)</p>
          <p className="font-body-md text-xs">Klicken Sie auf &quot;Erfahrung hinzufügen&quot;, um zu beginnen (Cliquez sur « Ajouter une expérience » pour commencer)</p>
        </div>
      ) : (
        data.map((exp, index) => (
          <div key={index} className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-md text-brand-imperial">
                Berufserfahrung #{index + 1} (Expérience professionnelle n° {index + 1})
              </span>
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="text-error hover:text-error/80 text-sm"
              >
                Entfernen (Supprimer)
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Beruf / Position (Profession / Poste) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={exp.profession}
                  onChange={(e) => updateExperience(index, 'profession', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="z.B. Softwareentwickler, Krankenschwester (ex. développeur logiciel, infirmière)"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Unternehmen (Entreprise) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="Name des Unternehmens (Nom de l’entreprise)"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Stadt (Ville) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={exp.city}
                  onChange={(e) => updateExperience(index, 'city', e.target.value)}
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
                  value={exp.startDate}
                  onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
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
                  value={exp.endDate}
                  onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Tätigkeiten (Aufgaben / Missions) <span className="text-error">*</span>
                </label>
                <textarea
                  value={exp.tasks}
                  onChange={(e) => updateExperience(index, 'tasks', e.target.value)}
                  rows={3}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="Beschreiben Sie Ihre Hauptaufgaben und Verantwortlichkeiten (Décrivez vos principales tâches et responsabilités)"
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