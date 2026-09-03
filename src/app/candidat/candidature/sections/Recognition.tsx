// src/app/candidature/sections/Recognition.tsx
"use client";

import React from 'react';
import { Recognition } from '../types';

interface RecognitionSectionProps {
  data: Recognition;
  updateData: (data: Partial<Recognition>) => void;
}

export const RecognitionSection: React.FC<RecognitionSectionProps> = ({
  data,
  updateData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox') {
      updateData({ [name]: checked });
    } else {
      updateData({ [name]: value });
    }
  };

  return (
    <div className="space-y-6">
      <p className="font-body-md text-sm text-on-surface-variant/70">
        Informationen zur Anerkennung Ihrer Qualifikationen in Deutschland. (Informations concernant la reconnaissance de vos qualifications en Allemagne.)
      </p>

      {/* IHK Recognition */}
      <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
        <h3 className="font-headline-sm text-brand-imperial mb-3 text-sm">
          IHK Anerkennung (Reconnaissance IHK)
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="font-label-md text-label-md text-brand-imperial">
              Ist Ihr Beruf bei der IHK anerkannt? (Votre profession est-elle reconnue par la IHK ?)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="ihk"
                  value="true"
                  checked={data.ihk === true}
                  onChange={() => updateData({ ihk: true })}
                  className="w-4 h-4"
                />
                Ja (Oui)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="ihk"
                  value="false"
                  checked={data.ihk === false}
                  onChange={() => updateData({ ihk: false, ihkDetails: '' })}
                  className="w-4 h-4"
                />
                Nein (Non)
              </label>
            </div>
          </div>

          {data.ihk && (
            <div className="ml-6 space-y-2">
              <label className="block font-label-md text-xs text-brand-imperial">
                Details zur IHK Anerkennung (Détails concernant la reconnaissance IHK)
              </label>
              <textarea
                name="ihkDetails"
                value={data.ihkDetails}
                onChange={handleChange}
                rows={2}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                placeholder="Welcher Beruf? Welche IHK? Wann anerkannt? (Quelle profession ? Quelle IHK ? Quand a-t-elle été reconnue ?)"
              />
            </div>
          )}
        </div>
      </div>

      {/* Anabin Recognition */}
      <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
        <h3 className="font-headline-sm text-brand-imperial mb-3 text-sm">
          Anabin Eintrag (Inscription dans Anabin)
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="font-label-md text-label-md text-brand-imperial">
              Ist Ihre Hochschule im Anabin gelistet? (Votre établissement d’enseignement supérieur est-il répertorié dans Anabin ?)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="anabin"
                  value="true"
                  checked={data.anabin === true}
                  onChange={() => updateData({ anabin: true })}
                  className="w-4 h-4"
                />
                Ja (Oui)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="anabin"
                  value="false"
                  checked={data.anabin === false}
                  onChange={() => updateData({ anabin: false, anabinDetails: '' })}
                  className="w-4 h-4"
                />
                Nein (Non)
              </label>
            </div>
          </div>

          {data.anabin && (
            <div className="ml-6 space-y-2">
              <label className="block font-label-md text-xs text-brand-imperial">
                Details zum Anabin Eintrag (Détails concernant l’inscription dans Anabin)
              </label>
              <textarea
                name="anabinDetails"
                value={data.anabinDetails}
                onChange={handleChange}
                rows={2}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                placeholder="Hochschulname, Status, etc. (Nom de l’établissement, statut, etc.)"
              />
            </div>
          )}
        </div>
      </div>

      {/* ZAB Recognition */}
      <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
        <h3 className="font-headline-sm text-brand-imperial mb-3 text-sm">
          ZAB (Zentralstelle für ausländisches Bildungswesen) (Service central pour l’enseignement étranger)
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="font-label-md text-label-md text-brand-imperial">
              Haben Sie eine Zeugnisbewertung von der ZAB? (Avez-vous obtenu une évaluation de diplôme de la ZAB ?)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="zab"
                  value="true"
                  checked={data.zab === true}
                  onChange={() => updateData({ zab: true })}
                  className="w-4 h-4"
                />
                Ja (Oui)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="zab"
                  value="false"
                  checked={data.zab === false}
                  onChange={() => updateData({ zab: false, zabDetails: '' })}
                  className="w-4 h-4"
                />
                Nein (Non)
              </label>
            </div>
          </div>

          {data.zab && (
            <div className="ml-6 space-y-2">
              <label className="block font-label-md text-xs text-brand-imperial">
                Details zur ZAB Bewertung (Détails concernant l’évaluation ZAB)
              </label>
              <textarea
                name="zabDetails"
                value={data.zabDetails}
                onChange={handleChange}
                rows={2}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                placeholder="Welches Zeugnis? Ergebnis? Datum? (Quel diplôme ? Résultat ? Date ?)"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 p-4 bg-brand-ice/10 rounded-lg border border-brand-imperial/10">
        <p className="text-sm text-on-surface-variant/70 flex items-center gap-2">
          <span className="text-brand-imperial">ℹ️</span>
          Diese Informationen helfen bei der Einschätzung der Anerkennung Ihrer Qualifikationen in Deutschland. (Ces informations aident à évaluer la reconnaissance de vos qualifications en Allemagne.)
        </p>
      </div>
    </div>
  );
};