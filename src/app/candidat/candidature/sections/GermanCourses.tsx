// src/app/candidature/sections/GermanCourses.tsx
"use client";

import React from 'react';
import { GermanCourse } from '../types';

interface GermanCoursesSectionProps {
  data: GermanCourse[];
  updateData: (data: GermanCourse[]) => void;
}

export const GermanCoursesSection: React.FC<GermanCoursesSectionProps> = ({
  data,
  updateData,
}) => {
  const addCourse = () => {
    const newCourse: GermanCourse = {
      institution: '',
      location: '',
      level: '',
      startDate: '',
      endDate: '',
      certificate: false,
    };
    updateData([...data, newCourse]);
  };

  const removeCourse = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };

  const updateCourse = (index: number, field: keyof GermanCourse, value: string | boolean) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateData(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-body-md text-sm text-on-surface-variant/70">
          Bitte alle Deutschkurse auflisten, die Sie besucht haben. (Veuillez indiquer tous les cours d’allemand que vous avez suivis.)
        </p>
        <button
          type="button"
          onClick={addCourse}
          className="bg-secondary hover:bg-secondary/90 text-white font-label-md text-label-md py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
        >
          <span>+</span>
          Kurs hinzufügen (Ajouter un cours)
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-on-surface-variant/50 border-2 border-dashed border-outline-variant/30 rounded-xl">
          <span className="text-2xl block mb-2">📚</span>
          <p className="font-body-md text-sm">Keine Deutschkurse eingetragen (Aucun cours d’allemand enregistré)</p>
          <p className="font-body-md text-xs">Klicken Sie auf &quot;Kurs hinzufügen&quot;, um zu beginnen (Cliquez sur « Ajouter un cours » pour commencer)</p>
        </div>
      ) : (
        data.map((course, index) => (
          <div key={index} className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-md text-brand-imperial">
                Deutschkurs #{index + 1} (Cours d’allemand n° {index + 1})
              </span>
              <button
                type="button"
                onClick={() => removeCourse(index)}
                className="text-error hover:text-error/80 text-sm"
              >
                Entfernen (Supprimer)
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Institut / Einrichtung (Institut / Établissement) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={course.institution}
                  onChange={(e) => updateCourse(index, 'institution', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="z.B. Goethe-Institut, Volkshochschule (ex. Goethe-Institut, Volkshochschule)"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Ort (Lieu) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={course.location}
                  onChange={(e) => updateCourse(index, 'location', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="Stadt, Land (Ville, Pays)"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Niveau (Niveau) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={course.level}
                  onChange={(e) => updateCourse(index, 'level', e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                  placeholder="z.B. A1, A2, B1, B2, C1, C2 (ex. A1, A2, B1, B2, C1, C2)"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Zertifikat erhalten? (Certificat obtenu ?)
                </label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={course.certificate === true}
                      onChange={() => updateCourse(index, 'certificate', true)}
                      className="w-4 h-4"
                    />
                    Ja (Oui)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={course.certificate === false}
                      onChange={() => updateCourse(index, 'certificate', false)}
                      className="w-4 h-4"
                    />
                    Nein (Non)
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Von (De) <span className="text-error">*</span>
                </label>
                <input
                  type="date"
                  value={course.startDate}
                  onChange={(e) => updateCourse(index, 'startDate', e.target.value)}
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
                  value={course.endDate}
                  onChange={(e) => updateCourse(index, 'endDate', e.target.value)}
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