// src/app/candidature/components/CompactResumeProgress.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FormSection } from '../types';

interface Section {
  id: FormSection;
  label: string;
}

interface CompactResumeProgressProps {
  sections: Section[];
  currentIndex: number;
  onSectionClick: (index: number) => void;
}

export const CompactResumeProgress: React.FC<CompactResumeProgressProps> = ({
  sections,
  currentIndex,
  onSectionClick,
}) => {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active section
  useEffect(() => {
    if (containerRef.current) {
      const activeButton = containerRef.current.querySelector(
        `[data-index="${currentIndex}"]`
      ) as HTMLElement;
      if (activeButton) {
        const container = containerRef.current;
        const scrollLeft = activeButton.offsetLeft - container.offsetWidth / 2 + activeButton.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  const visibleSections = showAll ? sections : sections;

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {visibleSections.map((section, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <button
              key={section.id}
              data-index={index}
              onClick={() => onSectionClick(index)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                isActive
                  ? 'bg-brand-imperial text-white shadow-md scale-105'
                  : isCompleted
                  ? 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                  : 'bg-surface-container-low text-on-surface-variant/60 hover:bg-surface-container hover:text-on-surface-variant'
              }`}
            >
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : isCompleted
                    ? 'bg-secondary text-white'
                    : 'bg-surface-variant text-on-surface-variant/40'
                }`}
              >
                {isCompleted ? '✓' : index + 1}
              </span>
              <span className="hidden sm:inline">{section.label}</span>
              <span className="sm:hidden">{section.label.substring(0, 3)}</span>
            </button>
          );
        })}
      </div>

      {/* Toggle button for showing all sections */}
      {sections.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-6 h-6 flex items-center justify-center text-xs text-brand-imperial border border-outline-variant/30 hover:bg-brand-ice/20 transition-colors"
        >
          {showAll ? '◀' : '▶'}
        </button>
      )}
    </div>
  );
};