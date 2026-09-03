// src/app/candidature/sections/ComputerSkills.tsx
"use client";

import React from 'react';
import { ComputerSkill } from '../types';

interface ComputerSkillsSectionProps {
  data: ComputerSkill[];
  updateData: (data: ComputerSkill[]) => void;
}

export const ComputerSkillsSection: React.FC<ComputerSkillsSectionProps> = ({
  data,
  updateData,
}) => {
  const addSkill = () => {
    const newSkill: ComputerSkill = {
      skill: '',
      level: '',
    };
    updateData([...data, newSkill]);
  };

  const removeSkill = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };

  const updateSkill = (index: number, field: keyof ComputerSkill, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateData(newData);
  };

  const skillLevels = [
    { value: '', label: 'Bitte wählen (Veuillez choisir)' },
    { value: 'expert', label: 'Experte (Expert)' },
    { value: 'advanced', label: 'Fortgeschritten (Avancé)' },
    { value: 'intermediate', label: 'Mittelstufe (Intermédiaire)' },
    { value: 'beginner', label: 'Anfänger (Débutant)' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-body-md text-sm text-on-surface-variant/70">
          Bitte geben Sie Ihre EDV-Kenntnisse an (Software, Programmiersprachen, Tools, etc.). (Veuillez indiquer vos connaissances en informatique (logiciels, langages de programmation, outils, etc.).)
        </p>
        <button
          type="button"
          onClick={addSkill}
          className="bg-secondary hover:bg-secondary/90 text-white font-label-md text-label-md py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
        >
          <span>+</span>
          Kenntnis hinzufügen (Ajouter une compétence)
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-on-surface-variant/50 border-2 border-dashed border-outline-variant/30 rounded-xl">
          <span className="text-2xl block mb-2">💻</span>
          <p className="font-body-md text-sm">
            Keine EDV-Kenntnisse eingetragen (Aucune compétence informatique renseignée)
          </p>
          <p className="font-body-md text-xs">
            Klicken Sie auf &quot;Kenntnis hinzufügen&quot; um zu beginnen (Cliquez sur « Ajouter une compétence » pour commencer)
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((skill, index) => (
            <div key={index} className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
              <div className="flex justify-between items-start mb-3">
                <span className="font-label-md text-brand-imperial text-sm">
                  Kenntnis #{index + 1} (Compétence #{index + 1})
                </span>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-error hover:text-error/80 text-sm"
                >
                  Entfernen (Supprimer)
                </button>
              </div>
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="block font-label-md text-xs text-brand-imperial">
                    Kenntnis (Compétence) <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    value={skill.skill}
                    onChange={(e) => updateSkill(index, 'skill', e.target.value)}
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                    placeholder="z.B. Microsoft Office, Python, SAP (ex. Microsoft Office, Python, SAP)"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-label-md text-xs text-brand-imperial">
                    Niveau (Niveau) <span className="text-error">*</span>
                  </label>
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(index, 'level', e.target.value)}
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                    required
                  >
                    {skillLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};