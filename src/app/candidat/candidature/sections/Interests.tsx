// src/app/candidature/sections/Interests.tsx
"use client";

import React from 'react';

interface InterestsSectionProps {
  data: { interests: string; hobbies: string };
  updateData: (data: { interests: string; hobbies: string }) => void;
}

export const InterestsSection: React.FC<InterestsSectionProps> = ({
  data,
  updateData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateData({ ...data, [name]: value });
  };

  return (
    <div className="space-y-6">
      <p className="font-body-md text-sm text-on-surface-variant/70">
        Bitte teilen Sie uns Ihre Interessen und Hobbys mit. (Veuillez nous faire part de vos centres d'intérêt et de vos loisirs.)
      </p>

      {/* ← NEW: Interests */}
      <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
        <div className="space-y-3">
          <label className="block font-label-md text-label-md text-brand-imperial">
            Interessen (Intérêts)
          </label>
          <textarea
            name="interests"
            value={data.interests || ''}
            onChange={handleChange}
            rows={4}
            className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
            placeholder="z.B. Sport, Musik, Reisen, Lesen (ex. sport, musique, voyages, lecture)"
          />
        </div>
      </div>

      {/* ← NEW: Hobbies */}
      <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
        <div className="space-y-3">
          <label className="block font-label-md text-label-md text-brand-imperial">
            Hobbys (Loisirs)
          </label>
          <textarea
            name="hobbies"
            value={data.hobbies || ''}
            onChange={handleChange}
            rows={4}
            className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
            placeholder="z.B. Fußball, Fotografie, Kochen (ex. football, photographie, cuisine)"
          />
        </div>
      </div>
    </div>
  );
};