// src/app/candidature/sections/GermanyHistory.tsx
"use client";

import React from 'react';
import { GermanyHistory, GermanyStay } from '../types';

interface GermanyHistorySectionProps {
  data?: GermanyHistory;
  updateData: (data: Partial<GermanyHistory>) => void;
}

const DEFAULT_GERMANY_HISTORY: GermanyHistory = {
  hasFamilyOrFriends: false,
  familyOrFriendsDetails: '',
  familyInGermany: false,
  familyInGermanyDetails: '',
  friendsInGermany: false,
  friendsInGermanyDetails: '',
  previousVisaApplication: false,
  visaType: '',
  visaResult: '',
  visaDate: '',
  visaDateUntil: '',
  previousStay: false,
  previousStayDetails: '',
  previousStayVisaType: '',
  stays: [],
  otherAgency: '',
  appliedToOtherAgency: false,
  otherAgencyName: '',
  otherAgencyDate: '',
};

export const GermanyHistorySection: React.FC<GermanyHistorySectionProps> = ({
  data,
  updateData,
}) => {
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
    const newStay: GermanyStay = { city: '', duration: '', purpose: '' };
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
      {/* ===== FAMILY IN GERMANY ===== */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="font-label-md text-label-md text-brand-imperial">
            Familie in Deutschland? (Famille en Allemagne ?)
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="familyInGermany"
                value="false"
                checked={!safeData.familyInGermany}
                onChange={() => updateData({ familyInGermany: false, familyInGermanyDetails: '' })}
                className="w-4 h-4"
              />
              Nein (Non)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="familyInGermany"
                value="true"
                checked={safeData.familyInGermany}
                onChange={() => updateData({ familyInGermany: true })}
                className="w-4 h-4"
              />
              Ja (Oui)
            </label>
          </div>
        </div>
        {safeData.familyInGermany && (
          <div className="ml-6 space-y-2">
            <label className="block font-label-md text-xs text-brand-imperial">
              Details (Détails)
            </label>
            <textarea
              name="familyInGermanyDetails"
              value={safeData.familyInGermanyDetails || ''}
              onChange={handleChange}
              rows={2}
              className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
              placeholder="Wer? Wo? (Qui ? Où ?)"
            />
          </div>
        )}
      </div>

      {/* ===== FRIENDS IN GERMANY ===== */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="font-label-md text-label-md text-brand-imperial">
            Freunde in Deutschland? (Amis en Allemagne ?)
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="friendsInGermany"
                value="false"
                checked={!safeData.friendsInGermany}
                onChange={() => updateData({ friendsInGermany: false, friendsInGermanyDetails: '' })}
                className="w-4 h-4"
              />
              Nein (Non)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="friendsInGermany"
                value="true"
                checked={safeData.friendsInGermany}
                onChange={() => updateData({ friendsInGermany: true })}
                className="w-4 h-4"
              />
              Ja (Oui)
            </label>
          </div>
        </div>
        {safeData.friendsInGermany && (
          <div className="ml-6 space-y-2">
            <label className="block font-label-md text-xs text-brand-imperial">
              Details (Détails)
            </label>
            <textarea
              name="friendsInGermanyDetails"
              value={safeData.friendsInGermanyDetails || ''}
              onChange={handleChange}
              rows={2}
              className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
              placeholder="Wer? Wo? (Qui ? Où ?)"
            />
          </div>
        )}
      </div>

      {/* ===== VISA APPLICATION ===== */}
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
                onChange={() => updateData({ previousVisaApplication: false, visaType: '', visaResult: '', visaDate: '', visaDateUntil: '' })}
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
                Visumtyp (Type de visa)
              </label>
              <input
                type="text"
                name="visaType"
                value={safeData.visaType || ''}
                onChange={handleChange}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                placeholder="z.B. Schengen, national (ex. Schengen, national)"
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
            {/* ← NEW: From date */}
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-brand-imperial">
                Wann / Von (Quand / De)
              </label>
              <input
                type="date"
                name="visaDate"
                value={safeData.visaDate || ''}
                onChange={handleChange}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
              />
            </div>
            {/* ← NEW: Until date */}
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-brand-imperial">
                Bis (Jusqu'à)
              </label>
              <input
                type="date"
                name="visaDateUntil"
                value={safeData.visaDateUntil || ''}
                onChange={handleChange}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
              />
            </div>
          </div>
        )}
      </div>

      {/* ===== PREVIOUS STAYS ===== */}
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
                onChange={() => updateData({ previousStay: false, previousStayDetails: '', previousStayVisaType: '' })}
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
          <>
            <div className="ml-6 space-y-2">
              <label className="block font-label-md text-label-md text-brand-imperial">
                Details zum Aufenthalt (Détails concernant le séjour)
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
            {/* ← NEW: Visa type for previous stay */}
            <div className="ml-6 space-y-2">
              <label className="block font-label-md text-label-md text-brand-imperial">
                Welche Visa Art (Quel type de visa)
              </label>
              <input
                type="text"
                name="previousStayVisaType"
                value={safeData.previousStayVisaType || ''}
                onChange={handleChange}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                placeholder="z.B. Schengen, Studium (ex. Schengen, études)"
              />
            </div>
          </>
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
              Keine Aufenthalte eingetragen. (Aucun séjour enregistré.)
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

      {/* ===== OTHER AGENCY ===== */}
      <div className="space-y-4 border-t border-outline-variant/30 pt-6">
        <div className="flex items-center gap-4">
          <label className="font-label-md text-label-md text-brand-imperial">
            Haben Sie sich bei einer anderen Vermittlungsagentur beworben? (Avez-vous postulé auprès d'une autre agence de placement ?)
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="appliedToOtherAgency"
                value="false"
                checked={!safeData.appliedToOtherAgency}
                onChange={() => updateData({ appliedToOtherAgency: false, otherAgencyName: '', otherAgencyDate: '' })}
                className="w-4 h-4"
              />
              Nein (Non)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="appliedToOtherAgency"
                value="true"
                checked={safeData.appliedToOtherAgency}
                onChange={() => updateData({ appliedToOtherAgency: true })}
                className="w-4 h-4"
              />
              Ja (Oui)
            </label>
          </div>
        </div>

        {safeData.appliedToOtherAgency && (
          <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-brand-imperial">
                Welche Agentur (Quelle agence)
              </label>
              <input
                type="text"
                name="otherAgencyName"
                value={safeData.otherAgencyName || ''}
                onChange={handleChange}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                placeholder="Name der Agentur (Nom de l'agence)"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-brand-imperial">
                Wann (Quand)
              </label>
              <input
                type="date"
                name="otherAgencyDate"
                value={safeData.otherAgencyDate || ''}
                onChange={handleChange}
                className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};