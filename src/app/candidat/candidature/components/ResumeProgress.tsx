// src/app/candidature/components/ResumeProgress.tsx
"use client";

import React from 'react';
import { FormSection } from '../types';

interface Section {
  id: FormSection;
  label: string;
}

interface ResumeProgressProps {
  sections: Section[];
  currentIndex: number;
  onSectionClick: (index: number) => void;
}

export const ResumeProgress: React.FC<ResumeProgressProps> = ({
  sections,
  currentIndex,
  onSectionClick,
}) => {
  return (
    <div className="relative mb-8">
      {/* Progress Bar Background */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-variant -z-10 -translate-y-1/2"></div>

      {/* Progress Bar Fill */}
      <div
        className="absolute top-1/2 left-0 h-[2px] bg-brand-imperial -z-10 -translate-y-1/2 transition-all duration-500"
        style={{ width: `${((currentIndex) / (sections.length - 1)) * 100}%` }}
      ></div>

      {/* Steps */}
      <div className="flex justify-between items-center relative z-0">
        {sections.map((section, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div
              key={section.id}
              className={`flex flex-col items-center cursor-pointer group transition-all duration-300 ${
                isActive ? 'scale-110' : 'scale-100'
              }`}
              onClick={() => onSectionClick(index)}
            >
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 transition-all duration-300 shadow-sm font-label-md text-label-md ${
                  isActive
                    ? 'bg-brand-imperial text-white border-brand-imperial ring-4 ring-brand-imperial/20'
                    : isCompleted
                    ? 'bg-secondary text-white border-secondary'
                    : 'bg-white border-outline-variant text-on-surface-variant hover:border-brand-imperial'
                }`}
              >
                {isCompleted ? '✓' : index + 1}
              </div>
              <span
                className={`font-label-md text-caption md:text-label-md text-center transition-colors duration-300 hidden sm:block ${
                  isActive ? 'text-brand-imperial font-bold' : 'text-on-surface-variant'
                }`}
              >
                {section.label}
              </span>
              <span className="font-label-md text-[10px] text-center transition-colors duration-300 sm:hidden">
                {index + 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};