// src/app/candidature/sections/GermanyHistory.tsx
"use client";

import React from 'react';
import { GermanyHistory, GermanyStay } from '../types';

interface GermanyHistorySectionProps {
  data?: GermanyHistory;
  updateData: (data: Partial<GermanyHistory>) => void;
}

// Default values outside component to prevent recreation
const DEFAULT_GERMANY_HISTORY: GermanyHistory = {
  hasFamilyOrFriends: false,
  familyOrFriendsDetails: '',
  previousVisaApplication: false,
  visaType: '',
  visaResult: '',
  visaDate: '',
  previousStay: false,
  previousStayDetails: '',
  stays: [],
  otherAgency: '',
};

export const GermanyHistorySection: React.FC<GermanyHistorySectionProps> = ({
  data,
  updateData,
}) => {
  // Use a safe data object with fallbacks
  const safeData = React.useMemo(() => ({
    ...DEFAULT_GERMANY_HISTORY,
    ...data,
    stays: data?.stays || [],
  }), [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox') {
      updateData({ [name]: checked });
    } else {
      updateData({ [name]: value });
    }
  };

  const addStay = () => {
    const newStay: GermanyStay = {
      city: '',
      duration: '',
      purpose: '',
    };
    updateData({ stays: [...safeData.stays, newStay] });
  };

  const removeStay = (index: number) => {
    const newStays = [...safeData.stays];
    newStays.splice(index, 1);
    updateData({ stays: newStays });
  };

  const updateStay = (index: number, field: keyof GermanyStay, value: string) => {
    const newStays = [...safeData.stays];
    if (newStays[index]) {
      newStays[index] = { ...newStays[index], [field]: value };
      updateData({ stays: newStays });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="font-label-md text-label-md text-brand-imperial">
            Haben Sie Familie oder Freunde in Deutschland? (Avez-vous de la famille ou des amis en Allemagne ?)
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasFamilyOrFriends"
                value="false"
                checked={!safeData.hasFamilyOrFriends}
                onChange={() => updateData({ hasFamilyOrFriends: false, familyOrFriendsDetails: '' })}
                className="w-4 h-4"
              />
              Nein (Non)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasFamilyOrFriends"
                value="true"
                checked={safeData.hasFamilyOrFriends}
                onChange={() => updateData({ hasFamilyOrFriends: true })}
                className="w-4 h-4"
              />
              Ja (Oui)
            </label>
          </div>
        </div>

        {safeData.hasFamilyOrFriends && (
          <div className="ml-6 space-y-2">
            <label className="block font-label-md text-label-md text-brand-imperial">
              Details zu Familie/Freunden (Détails concernant la famille/les amis)
            </label>
            <textarea
              name="familyOrFriendsDetails"
              value={safeData.familyOrFriendsDetails || ''}
              onChange={handleChange}
              rows={3}
              className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
              placeholder="Wer? Wo? Seit wann? (Qui ? Où ? Depuis quand ?)"
            />
          </div>
        )}
      </div>

      <div className="space-y-4 border-t border-outline-variant/30 pt-6">
        <h3 className="font-headline-sm text-brand-imperial">
          Frühere Visumanträge (Demandes de visa précédentes)
        </h3>

        <div className="flex items-center gap-4">
          <label className="font-label-md text-label-md text-brand-imperial">
            Haben Sie schon einmal ein Visum beantragt? (Avez-vous déjà demandé un visa ?)
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="previousVisaApplication"
                value="false"
                checked={!safeData.previousVisaApplication}
                onChange={() => updateData({ previousVisaApplication: false, visaType: '', visaResult: '', visaDate: '' })}
                className="w-4 h-4"
              />
              Nein (Non)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="previousVisaApplication"
                value="true"
                checked={safeData.previousVisaApplication}
                onChange={() => updateData({ previousVisaApplication: true })}
                className="w-4 h-4"
              />
              Ja (Oui)
            </label>
          </div>
        </div>

        {safeData.previousVisaApplication && (
          <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-brand-imperial">
                Visumtyp (Art des visa)
              </label>
              <input
                type="text"
                name="visaType"
                value={safeData.visaType || ''}
                onChange={handleChange}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                placeholder="z.B. Schengen, national, etc. (ex. Schengen, national, etc.)"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-brand-imperial">
                Ergebnis (Résultat)
              </label>
              <select
                name="visaResult"
                value={safeData.visaResult || ''}
                onChange={handleChange}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
              >
                <option value="">Bitte wählen (Veuillez choisir)</option>
                <option value="granted">Erteilt (Accordé)</option>
                <option value="denied">Abgelehnt (Refusé)</option>
                <option value="pending">Ausstehend (En attente)</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block font-label-md text-label-md text-brand-imperial">
                Datum (Date)
              </label>
              <input
                type="date"
                name="visaDate"
                value={safeData.visaDate || ''}
                onChange={handleChange}
                className="w-full max-w-xs bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 border-t border-outline-variant/30 pt-6">
        <h3 className="font-headline-sm text-brand-imperial">
          Aufenthalt in Deutschland (Séjour en Allemagne)
        </h3>

        <div className="flex items-center gap-4">
          <label className="font-label-md text-label-md text-brand-imperial">
            Waren Sie schon einmal in Deutschland? (Avez-vous déjà séjourné en Allemagne ?)
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="previousStay"
                value="false"
                checked={!safeData.previousStay}
                onChange={() => updateData({ previousStay: false, previousStayDetails: '' })}
                className="w-4 h-4"
              />
              Nein (Non)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="previousStay"
                value="true"
                checked={safeData.previousStay}
                onChange={() => updateData({ previousStay: true })}
                className="w-4 h-4"
              />
              Ja (Oui)
            </label>
          </div>
        </div>

        {safeData.previousStay && (
          <div className="ml-6 space-y-2">
            <label className="block font-label-md text-label-md text-brand-imperial">
              Details zum Aufenthalt (Details concernant le séjour)
            </label>
            <textarea
              name="previousStayDetails"
              value={safeData.previousStayDetails || ''}
              onChange={handleChange}
              rows={2}
              className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
              placeholder="Wann? Wo? Wie lange? Zweck? (Quand ? Où ? Combien de temps ? Motif ?)"
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-label-md text-label-md text-brand-imperial">
              Aufenthalte in Deutschland (detailliert) (Séjours en Allemagne, en détail)
            </label>
            <button
              type="button"
              onClick={addStay}
              className="text-sm text-secondary hover:text-secondary/80 font-medium flex items-center gap-1"
            >
              + Weitere hinzufügen (+ Ajouter un autre)
            </button>
          </div>

          {safeData.stays.length === 0 ? (
            <p className="text-sm text-on-surface-variant/60 py-4 text-center">
              Keine Aufenthalte eingetragen. Klicken Sie auf &quot;Weitere hinzufügen&quot;, um einen Eintrag zu erstellen. (Aucun séjour enregistré. Cliquez sur « Ajouter un autre » pour créer une entrée.)
            </p>
          ) : (
            safeData.stays.map((stay, index) => (
              <div key={index} className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-label-md text-sm text-brand-imperial">
                    Aufenthalt #{index + 1} (Séjour n° {index + 1})
                  </span>
                  <button
                    type="button"
                    onClick={() => removeStay(index)}
                    className="text-error hover:text-error/80 text-sm"
                  >
                    Entfernen (Supprimer)
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block font-label-md text-xs text-brand-imperial">
                      Stadt (Ville)
                    </label>
                    <input
                      type="text"
                      value={stay.city || ''}
                      onChange={(e) => updateStay(index, 'city', e.target.value)}
                      className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                      placeholder="Stadt (Ville)"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-label-md text-xs text-brand-imperial">
                      Dauer (Durée)
                    </label>
                    <input
                      type="text"
                      value={stay.duration || ''}
                      onChange={(e) => updateStay(index, 'duration', e.target.value)}
                      className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                      placeholder="z.B. 3 Monate (ex. 3 mois)"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-label-md text-xs text-brand-imperial">
                      Zweck (Motif)
                    </label>
                    <input
                      type="text"
                      value={stay.purpose || ''}
                      onChange={(e) => updateStay(index, 'purpose', e.target.value)}
                      className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                      placeholder="z.B. Urlaub, Studium (ex. Vacances, études)"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="space-y-2 border-t border-outline-variant/30 pt-6">
        <label className="block font-label-md text-label-md text-brand-imperial">
          Haben Sie sich schon bei einer anderen Agentur/Personalvermittlung für Deutschland beworben? (Avez-vous déjà postulé auprès d’une autre agence ou société de recrutement pour l’Allemagne ?)
        </label>
        <input
          type="text"
          name="otherAgency"
          value={safeData.otherAgency || ''}
          onChange={handleChange}
          className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
          placeholder="Wenn ja, bitte angeben (Si oui, veuillez préciser)"
        />
      </div>
    </div>
  );
};