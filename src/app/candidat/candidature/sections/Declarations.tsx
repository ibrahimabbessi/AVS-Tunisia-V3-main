// src/app/candidature/sections/Declarations.tsx
"use client";

import React from 'react';
import { Declarations } from '../types';

interface DeclarationsSectionProps {
  data: Declarations;
  updateData: (data: Partial<Declarations>) => void;
}

export const DeclarationsSection: React.FC<DeclarationsSectionProps> = ({
  data,
  updateData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateData({ [name]: checked });
  };

  // Ensure all values are boolean with fallback to false
  const safeData = {
    healthDeclaration: data?.healthDeclaration ?? false,
    informationCorrect: data?.informationCorrect ?? false,
    documentsAuthentic: data?.documentsAuthentic ?? false,
    noFalseIntentions: data?.noFalseIntentions ?? false,
    informAgencyIfPlacementNoLongerNeeded: data?.informAgencyIfPlacementNoLongerNeeded ?? false,
    feesAccepted: data?.feesAccepted ?? false,
  };

  const allChecked = Object.values(safeData).every(value => value === true);

  return (
    <div className="space-y-6">
      <div className="bg-brand-ice/10 p-4 rounded-lg border border-brand-imperial/10">
        <p className="font-body-md text-sm text-on-surface-variant/70">
          Bitte lesen Sie jede Erklärung sorgfältig durch und bestätigen Sie diese. (Veuillez lire attentivement chaque déclaration et la confirmer.)
          <span className="block mt-1 text-error font-medium">
            Alle Erklärungen müssen akzeptiert werden, um die Bewerbung abschließen zu können. (Toutes les déclarations doivent être acceptées pour pouvoir finaliser la candidature.)
          </span>
        </p>
      </div>

      <div className="space-y-4">
        {/* Health Declaration */}
        <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
          safeData.healthDeclaration 
            ? 'border-secondary/50 bg-secondary/5' 
            : 'border-outline-variant/30 bg-surface-container-low'
        }`}>
          <label className="flex items-start gap-4 cursor-pointer group">
            <input
              type="checkbox"
              name="healthDeclaration"
              checked={safeData.healthDeclaration}
              onChange={handleChange}
              className="mt-0.5 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary transition-colors cursor-pointer flex-shrink-0"
            />
            <div>
              <span className="font-body-md text-sm text-on-surface-variant group-hover:text-brand-imperial transition-colors">
                <span className="font-bold">Gesundheitliche Erklärung (Déclaration relative à la santé)</span>
              </span>
              <p className="text-xs text-on-surface-variant/60 mt-1">
                Ich bestätige, dass ich gesundheitlich in der Lage bin, die angestrebte Tätigkeit auszuüben 
                und dass mir keine gesundheitlichen Einschränkungen bekannt sind, die einer Ausübung des Berufs entgegenstehen.
                (Je confirme être en bonne santé et capable d'exercer l'activité souhaitée et ne connaître aucune restriction de santé faisant obstacle à l'exercice de cette profession.)
              </p>
            </div>
          </label>
        </div>

        {/* Information Correct */}
        <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
          safeData.informationCorrect 
            ? 'border-secondary/50 bg-secondary/5' 
            : 'border-outline-variant/30 bg-surface-container-low'
        }`}>
          <label className="flex items-start gap-4 cursor-pointer group">
            <input
              type="checkbox"
              name="informationCorrect"
              checked={safeData.informationCorrect}
              onChange={handleChange}
              className="mt-0.5 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary transition-colors cursor-pointer flex-shrink-0"
            />
            <div>
              <span className="font-body-md text-sm text-on-surface-variant group-hover:text-brand-imperial transition-colors">
                <span className="font-bold">Richtigkeit der Angaben (Exactitude des informations)</span>
              </span>
              <p className="text-xs text-on-surface-variant/60 mt-1">
                Ich bestätige, dass alle von mir gemachten Angaben vollständig und wahrheitsgemäß sind 
                und dass ich keine relevanten Informationen verschwiegen habe.
                (Je confirme que toutes les informations que j'ai fournies sont complètes et véridiques et que je n'ai dissimulé aucune information pertinente.)
              </p>
            </div>
          </label>
        </div>

        {/* Documents Authentic */}
        <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
          safeData.documentsAuthentic 
            ? 'border-secondary/50 bg-secondary/5' 
            : 'border-outline-variant/30 bg-surface-container-low'
        }`}>
          <label className="flex items-start gap-4 cursor-pointer group">
            <input
              type="checkbox"
              name="documentsAuthentic"
              checked={safeData.documentsAuthentic}
              onChange={handleChange}
              className="mt-0.5 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary transition-colors cursor-pointer flex-shrink-0"
            />
            <div>
              <span className="font-body-md text-sm text-on-surface-variant group-hover:text-brand-imperial transition-colors">
                <span className="font-bold">Echtheit der Dokumente (Authenticité des documents)</span>
              </span>
              <p className="text-xs text-on-surface-variant/60 mt-1">
                Ich bestätige, dass alle eingereichten Dokumente authentisch sind und dass ich 
                im Falle von Fälschungen mit rechtlichen Konsequenzen rechnen muss.
                (Je confirme que tous les documents soumis sont authentiques et que toute falsification peut entraîner des conséquences juridiques.)
              </p>
            </div>
          </label>
        </div>

        {/* No False Intentions */}
        <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
          safeData.noFalseIntentions 
            ? 'border-secondary/50 bg-secondary/5' 
            : 'border-outline-variant/30 bg-surface-container-low'
        }`}>
          <label className="flex items-start gap-4 cursor-pointer group">
            <input
              type="checkbox"
              name="noFalseIntentions"
              checked={safeData.noFalseIntentions}
              onChange={handleChange}
              className="mt-0.5 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary transition-colors cursor-pointer flex-shrink-0"
            />
            <div>
              <span className="font-body-md text-sm text-on-surface-variant group-hover:text-brand-imperial transition-colors">
                <span className="font-bold">Keine falschen Absichten (Aucune fausse intention)</span>
              </span>
              <p className="text-xs text-on-surface-variant/60 mt-1">
                Ich bestätige, dass ich die Bewerbung in gutem Glauben einreiche und dass 
                ich beabsichtige, die Stelle im Falle einer Zusage anzutreten.
                (Je confirme que je soumets ma candidature de bonne foi et que j'ai l'intention d'occuper le poste en cas d'acceptation.)
              </p>
            </div>
          </label>
        </div>

        {/* Inform Agency */}
        <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
          safeData.informAgencyIfPlacementNoLongerNeeded 
            ? 'border-secondary/50 bg-secondary/5' 
            : 'border-outline-variant/30 bg-surface-container-low'
        }`}>
          <label className="flex items-start gap-4 cursor-pointer group">
            <input
              type="checkbox"
              name="informAgencyIfPlacementNoLongerNeeded"
              checked={safeData.informAgencyIfPlacementNoLongerNeeded}
              onChange={handleChange}
              className="mt-0.5 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary transition-colors cursor-pointer flex-shrink-0"
            />
            <div>
              <span className="font-body-md text-sm text-on-surface-variant group-hover:text-brand-imperial transition-colors">
                <span className="font-bold">Information bei Nichtbedarf (Information en cas de non-besoin)</span>
              </span>
              <p className="text-xs text-on-surface-variant/60 mt-1">
                Ich verpflichte mich, die Agentur unverzüglich zu informieren, falls ich 
                die Vermittlung nicht mehr benötige oder anderweitig eine Stelle gefunden habe.
                (Je m'engage à informer immédiatement l'agence si je n'ai plus besoin du service de placement ou si j'ai trouvé un emploi par un autre moyen.)
              </p>
            </div>
          </label>
        </div>

        {/* Fees Accepted */}
        <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
          safeData.feesAccepted 
            ? 'border-secondary/50 bg-secondary/5' 
            : 'border-outline-variant/30 bg-surface-container-low'
        }`}>
          <label className="flex items-start gap-4 cursor-pointer group">
            <input
              type="checkbox"
              name="feesAccepted"
              checked={safeData.feesAccepted}
              onChange={handleChange}
              className="mt-0.5 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary transition-colors cursor-pointer flex-shrink-0"
            />
            <div>
              <span className="font-body-md text-sm text-on-surface-variant group-hover:text-brand-imperial transition-colors">
                <span className="font-bold">Gebühren akzeptiert (Acceptation des frais)</span>
              </span>
              <p className="text-xs text-on-surface-variant/60 mt-1">
                Ich bestätige, dass ich die anfallenden Gebühren für die Bearbeitung meiner 
                Bewerbung akzeptiere und dass diese nicht erstattungsfähig sind.
                (Je confirme accepter les frais applicables au traitement de ma candidature et reconnais que ceux-ci ne sont pas remboursables.)
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="mt-6 pt-6 border-t border-outline-variant/20">
        <div className="flex items-center justify-between">
          <span className="font-body-md text-sm text-on-surface-variant/60">
            Fortschritt (Progression): {Object.values(safeData).filter(v => v).length}/{Object.keys(safeData).length} Erklärungen akzeptiert (déclarations acceptées)
          </span>
          <span className={`font-label-md text-sm font-bold transition-colors duration-300 ${
            allChecked ? 'text-secondary' : 'text-on-surface-variant/40'
          }`}>
            {allChecked 
              ? '✅ Alle Erklärungen akzeptiert (Toutes les déclarations sont acceptées)' 
              : '⚠️ Bitte alle Erklärungen akzeptieren (Veuillez accepter toutes les déclarations)'}
          </span>
        </div>
        <div className="mt-2 w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
          <div 
            className="h-full bg-secondary transition-all duration-500 rounded-full"
            style={{ width: `${(Object.values(safeData).filter(v => v).length / Object.keys(safeData).length) * 100}%` }}
          />
        </div>
      </div>

      {allChecked && (
        <div className="mt-4 p-4 bg-secondary/10 border border-secondary/30 rounded-lg animate-fade-in">
          <p className="text-secondary font-medium flex items-center gap-2">
            <span>✅</span>
            Alle Erklärungen wurden akzeptiert. Sie können nun die Bewerbung abschließen. (Toutes les déclarations ont été acceptées. Vous pouvez maintenant finaliser votre candidature.)
          </p>
        </div>
      )}
    </div>
  );
};