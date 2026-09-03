// src/app/candidature/sections/Interests.tsx
"use client";

import React from 'react';

interface InterestsSectionProps {
  data: string;
  updateData: (data: string) => void;
}

export const InterestsSection: React.FC<InterestsSectionProps> = ({
  data,
  updateData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData(e.target.value);
  };

  return (
    <div className="space-y-6">
      <p className="font-body-md text-sm text-on-surface-variant/70">
        Bitte teilen Sie uns Ihre Interessen und Hobbys mit. Diese helfen uns, ein vollständigeres Bild von Ihnen zu erhalten. (Bitteilen Sie uns Ihre Interessen und Hobbys mit. Dies hilft uns, ein umfassenderes Bild von Ihnen zu erhalten.)
      </p>

      <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
        <div className="space-y-3">
          <label className="block font-label-md text-label-md text-brand-imperial">
            Meine Interessen und Hobbys (Mes centres d’intérêt et mes loisirs)
          </label>
          <textarea
            value={data}
            onChange={handleChange}
            rows={6}
            className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
            placeholder="z.B. Sport, Musik, Reisen, Lesen, Kochen, Fotografie, etc. (ex. sport, musique, voyages, lecture, cuisine, photographie, etc.)

Bitte beschreiben Sie Ihre Interessen detailliert: (Veuillez décrire vos centres d’intérêt en détail :)"
          />
          <div className="text-right">
            <span className="font-body-md text-xs text-on-surface-variant/60">
              {data.length} Zeichen (caractères)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-brand-ice/10 rounded-lg border border-brand-imperial/10">
          <div className="text-2xl mb-2">🎯</div>
          <p className="text-sm text-on-surface-variant/70">
            Interessen können Aufschluss über Ihre Persönlichkeit geben (Les centres d’intérêt peuvent donner des indications sur votre personnalité)
          </p>
        </div>
        <div className="p-4 bg-brand-ice/10 rounded-lg border border-brand-imperial/10">
          <div className="text-2xl mb-2">🤝</div>
          <p className="text-sm text-on-surface-variant/70">
            Gemeinsame Interessen helfen bei der Teamfindung (Les centres d’intérêt communs facilitent la constitution d’équipes)
          </p>
        </div>
        <div className="p-4 bg-brand-ice/10 rounded-lg border border-brand-imperial/10">
          <div className="text-2xl mb-2">💡</div>
          <p className="text-sm text-on-surface-variant/70">
            Hobbys zeigen Engagement und Leidenschaft (Les loisirs témoignent de votre engagement et de votre passion)
          </p>
        </div>
      </div>
    </div>
  );
};