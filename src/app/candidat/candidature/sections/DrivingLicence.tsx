// src/app/candidature/sections/DrivingLicence.tsx
"use client";

import React from 'react';
import { DrivingLicence } from '../types';

interface DrivingLicenceSectionProps {
  data: DrivingLicence;
  updateData: (data: Partial<DrivingLicence>) => void;
}

export const DrivingLicenceSection: React.FC<DrivingLicenceSectionProps> = ({
  data,
  updateData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox') {
      if (name === 'hasLicence') {
        updateData({ [name]: checked });
      } else {
        // Handle category checkboxes
        const categories = [...data.categories];
        if (checked) {
          categories.push(value);
        } else {
          const index = categories.indexOf(value);
          if (index > -1) {
            categories.splice(index, 1);
          }
        }
        updateData({ categories });
      }
    } else {
      updateData({ [name]: value });
    }
  };

  const licenceCategories = [
    { value: 'A', label: 'A - Motorrad (Motocyclette)' },
    { value: 'A1', label: 'A1 - Leichtkraftrad (Motocyclette légère)' },
    { value: 'B', label: 'B - PKW (Voiture particulière)' },
    { value: 'B1', label: 'B1 - PKW bis 3,5t (Voiture particulière jusqu’à 3,5 t)' },
    { value: 'C', label: 'C - LKW (Poids lourd)' },
    { value: 'C1', label: 'C1 - LKW bis 7,5t (Poids lourd jusqu’à 7,5 t)' },
    { value: 'CE', label: 'CE - LKW mit Anhänger (Poids lourd avec remorque)' },
    { value: 'D', label: 'D - Bus (Autobus)' },
    { value: 'D1', label: 'D1 - Bus bis 16 Pers. (Autobus jusqu’à 16 personnes)' },
    { value: 'BE', label: 'BE - PKW mit Anhänger (Voiture particulière avec remorque)' },
  ];

  return (
    <div className="space-y-6">
      <p className="font-body-md text-sm text-on-surface-variant/70">
        Angaben zum Führerschein (für viele Berufe in Deutschland wichtig). (Informations concernant le permis de conduire, important pour de nombreux métiers en Allemagne.)
      </p>

      <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="font-label-md text-label-md text-brand-imperial">
              Besitzen Sie einen Führerschein? (Possédez-vous un permis de conduire ?)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasLicence"
                  value="true"
                  checked={data.hasLicence === true}
                  onChange={() => updateData({ hasLicence: true })}
                  className="w-4 h-4"
                />
                Ja (Oui)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasLicence"
                  value="false"
                  checked={data.hasLicence === false}
                  onChange={() => updateData({ hasLicence: false, categories: [], sinceYear: '' })}
                  className="w-4 h-4"
                />
                Nein (Non)
              </label>
            </div>
          </div>

          {data.hasLicence && (
            <>
              <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block font-label-md text-xs text-brand-imperial">
                    Führerschein seit (Permis obtenu depuis) <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    name="sinceYear"
                    value={data.sinceYear}
                    onChange={handleChange}
                    min="1950"
                    max={new Date().getFullYear()}
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                    placeholder="z.B. 2015 (ex. 2015)"
                    required
                  />
                </div>
              </div>

              <div className="ml-6 space-y-3">
                <label className="block font-label-md text-xs text-brand-imperial">
                  Führerscheinklassen (Catégories de permis) <span className="text-error">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {licenceCategories.map((cat) => (
                    <label key={cat.value} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-brand-ice/20 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        name="category"
                        value={cat.value}
                        checked={data.categories.includes(cat.value)}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary transition-colors"
                      />
                      <span className="font-body-md text-sm text-on-surface-variant">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 p-4 bg-brand-ice/10 rounded-lg border border-brand-imperial/10">
        <p className="text-sm text-on-surface-variant/70 flex items-center gap-2">
          <span className="text-brand-imperial">ℹ️</span>
          Ein gültiger Führerschein ist für viele Berufe in Deutschland eine wichtige Voraussetzung. (Un permis de conduire valide est une condition importante pour de nombreux métiers en Allemagne.)
        </p>
      </div>
    </div>
  );
};