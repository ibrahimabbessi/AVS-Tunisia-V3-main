// src/app/contact/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";

// Function to calculate Ramadan dates for any year
function getRamadanDates(year: number): { start: Date; end: Date } | null {
  // Ramadan moves back approximately 10-11 days each year in the Gregorian calendar
  // This is an astronomical approximation based on known Ramadan dates
  
  // Known reference points:
  // Ramadan 2025: ~March 1, 2025
  // Ramadan 2026: ~February 18, 2026
  // Ramadan 2027: ~February 8, 2027
  // Ramadan 2028: ~January 28, 2028
  // Ramadan 2029: ~January 16, 2029
  
  // Calculate approximate start date using a formula
  // Base year: 2025, Ramadan starts around March 1
  const baseYear = 2025;
  const baseStart = new Date(2025, 2, 1); // March 1, 2025
  
  // Each year, Ramadan starts about 10-11 days earlier
  const yearDiff = year - baseYear;
  const daysShift = Math.round(yearDiff * 10.875); // Average shift
  
  const estimatedStart = new Date(baseStart);
  estimatedStart.setDate(estimatedStart.getDate() - daysShift);
  
  // Ramadan lasts 29-30 days, we'll use 30 days as approximation
  const estimatedEnd = new Date(estimatedStart);
  estimatedEnd.setDate(estimatedEnd.getDate() + 30);
  
  // For exact known years, use precise dates
  const exactDates: Record<number, { start: [number, number, number]; end: [number, number, number] }> = {
    2025: { start: [2025, 2, 1], end: [2025, 3, 30] }, // March 1 - March 30, 2025
    2026: { start: [2026, 1, 18], end: [2026, 2, 18] }, // February 18 - March 18, 2026
    2027: { start: [2027, 1, 8], end: [2027, 2, 9] }, // February 8 - March 9, 2027
    2028: { start: [2028, 0, 28], end: [2028, 1, 27] }, // January 28 - February 27, 2028
    2029: { start: [2029, 0, 16], end: [2029, 1, 14] }, // January 16 - February 14, 2029
    2030: { start: [2030, 0, 5], end: [2030, 1, 4] }, // January 5 - February 4, 2030
    2031: { start: [2030, 11, 26], end: [2031, 0, 24] }, // December 26, 2030 - January 24, 2031
  };
  
  if (exactDates[year]) {
    const exact = exactDates[year];
    return {
      start: new Date(exact.start[0], exact.start[1], exact.start[2]),
      end: new Date(exact.end[0], exact.end[1], exact.end[2])
    };
  }
  
  // For years beyond our exact data, use the estimation
  // Make sure we don't go before 2025 or too far ahead
  if (year < 2025 || year > 2035) {
    return null;
  }
  
  return {
    start: estimatedStart,
    end: estimatedEnd
  };
}

// Function to check if current date is during Ramadan
function isCurrentlyRamadan(): { isRamadan: boolean; startDate: Date | null; endDate: Date | null } {
  const now = new Date();
  const year = now.getFullYear();
  
  // Check current year
  const ramadanThisYear = getRamadanDates(year);
  if (ramadanThisYear) {
    if (now >= ramadanThisYear.start && now <= ramadanThisYear.end) {
      return { isRamadan: true, startDate: ramadanThisYear.start, endDate: ramadanThisYear.end };
    }
  }
  
  // Check next year (in case Ramadan spans across years)
  const ramadanNextYear = getRamadanDates(year + 1);
  if (ramadanNextYear) {
    if (now >= ramadanNextYear.start && now <= ramadanNextYear.end) {
      return { isRamadan: true, startDate: ramadanNextYear.start, endDate: ramadanNextYear.end };
    }
  }
  
  // Check previous year
  const ramadanPrevYear = getRamadanDates(year - 1);
  if (ramadanPrevYear) {
    if (now >= ramadanPrevYear.start && now <= ramadanPrevYear.end) {
      return { isRamadan: true, startDate: ramadanPrevYear.start, endDate: ramadanPrevYear.end };
    }
  }
  
  return { isRamadan: false, startDate: null, endDate: null };
}

// Helper to format date nicely
function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  return date.toLocaleDateString('fr-FR', options);
}

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"candidate">("candidate");
  const [isSummer, setIsSummer] = useState(false);
  const [isRamadan, setIsRamadan] = useState(false);
  const [ramadanStart, setRamadanStart] = useState<Date | null>(null);
  const [ramadanEnd, setRamadanEnd] = useState<Date | null>(null);

  useEffect(() => {
    const checkSchedules = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth(); // 0 = January
      const day = now.getDate();

      // Check Summer (July = 6, August = 7)
      const isSummerActive = month === 6 || month === 7;
      setIsSummer(isSummerActive);

      // Check Ramadan using the dynamic function
      const ramadanCheck = isCurrentlyRamadan();
      setIsRamadan(ramadanCheck.isRamadan);
      setRamadanStart(ramadanCheck.startDate);
      setRamadanEnd(ramadanCheck.endDate);

      // If Ramadan is active, summer should be inactive (priority to Ramadan)
      if (ramadanCheck.isRamadan && isSummerActive) {
        setIsSummer(false);
      }
    };
    
    checkSchedules();
    // Update every hour to be safe
    const interval = setInterval(checkSchedules, 3600000);
    return () => clearInterval(interval);
  }, []);

  // Helper to format date range for display
  const getRamadanDateRange = (): string => {
    if (ramadanStart && ramadanEnd) {
      return `${formatDate(ramadanStart)} - ${formatDate(ramadanEnd)}`;
    }
    return "";
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section with Image */}
      <section className="relative pt-32 pb-8 md:pt-40 md:pb-12 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                Contactez-nous
              </span>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                Get in Touch
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed max-w-3xl">
                Whether you're a candidate seeking global opportunities or a corporate partner looking 
                for top-tier talent, we are here to connect.
              </p>
            </div>
            <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1740560051533-3acef26ace95?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Contact us"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='24'%3EContact%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-imperial/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards with Maps */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* AVS Hergla Forma */}
          <div className="card-hover rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm transition-all duration-300 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-imperial/10 flex items-center justify-center text-lg">
                  🏢
                </div>
                <h2 className="font-headline-md text-brand-imperial">AVS Hergla Forma</h2>
              </div>
              <div className="space-y-3">
                <p className="font-body-md text-on-surface-variant flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-ice/50 flex items-center justify-center text-sm">📞</span>
                  <span>98 449 976</span>
                </p>
                <p className="font-body-md text-on-surface-variant flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-ice/50 flex items-center justify-center text-sm">📞</span>
                  <span>70 287 540</span>
                </p>
                <p className="font-body-md text-on-surface-variant flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-ice/50 flex items-center justify-center text-sm mt-0.5">📍</span>
                  <span>Menchia, Immeuble Marché de gros 2ème étage, 4011 Hammam Sousse</span>
                </p>
              </div>
            </div>
            <div className="h-56 w-full bg-surface-container-low">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.123456789012!2d10.6001406!3d35.8575375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd8bd329077df9%3A0xd764d0a1332e2f11!2sVJ52%2B236%2C%20Hammam%20Sousse!5e0!3m2!1sen!2stn!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AVS Hergla Forma Location"
              ></iframe>
            </div>
          </div>

          {/* IFT Global */}
          <div className="card-hover rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm transition-all duration-300 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-imperial/10 flex items-center justify-center text-lg">
                  🌍
                </div>
                <h2 className="font-headline-md text-brand-imperial">IFT Global</h2>
              </div>
              <div className="space-y-3">
                <p className="font-body-md text-on-surface-variant flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-ice/50 flex items-center justify-center text-sm">📞</span>
                  <span>99 658 637</span>
                </p>
                <p className="font-body-md text-on-surface-variant flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-ice/50 flex items-center justify-center text-sm">📞</span>
                  <span>73 251 010</span>
                </p>
                <p className="font-body-md text-on-surface-variant flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-ice/50 flex items-center justify-center text-sm mt-0.5">📍</span>
                  <span>Avenue Habib Bourguiba, 4012 Hergla</span>
                </p>
              </div>
            </div>
            <div className="h-56 w-full bg-surface-container-low">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.123456789012!2d10.5015753!3d36.0312531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd8bd329077df9%3A0xd764d0a1332e2f11!2sAvenue%20Habib%20Bourguiba%2C%20Hergla!5e0!3m2!1sen!2stn!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="IFT Global Location"
              ></iframe>
            </div>
          </div>
        </div>



        {/* Help Text */}
        <div className="bg-gradient-to-br from-brand-ice/10 to-brand-imperial/5 rounded-2xl p-6 md:p-8 mb-12 border border-brand-imperial/10">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <div className="rounded-full bg-brand-imperial/10 p-2.5">
                <span className="text-xl">💡</span>
              </div>
            </div>
            <div>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                Nous sommes là pour vous aider ! N'hésitez pas à nous contacter pour toute question, demande de devis ou assistance dont vous pourriez avoir besoin. Remplissez simplement le formulaire ci-dessous ou utilisez les informations de contact fournies.
              </p>
            </div>
          </div>
        </div>

        {/* Availability with Calendar Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h3 className="font-headline-md text-brand-imperial mb-4 flex items-center gap-2">
              <span className="text-2xl">🕐</span> Nous sommes disponibles
              {isRamadan && (
                <span className="ml-3 inline-flex items-center px-3 py-1 bg-emerald-400/20 text-emerald-700 border border-emerald-400/30 rounded-full text-xs font-bold animate-pulse">
                  🌙 Horaire Ramadan
                </span>
              )}
              {isSummer && !isRamadan && (
                <span className="ml-3 inline-flex items-center px-3 py-1 bg-yellow-400/20 text-yellow-700 border border-yellow-400/30 rounded-full text-xs font-bold animate-pulse">
                  ☀️ Horaire d'été
                </span>
              )}
            </h3>
            <div className="space-y-4">
              {/* Regular Schedule - Always visible */}
              <div className={`p-4 rounded-xl border ${(isSummer || isRamadan) ? 'bg-gray-50/50 border-gray-200/50' : 'bg-brand-ice/10 border-brand-imperial/10'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-on-surface-variant">📅 Horaire régulier</span>
                  {!isSummer && !isRamadan && (
                    <span className="ml-auto inline-flex items-center px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      ✓ Actif
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="font-body-md text-on-surface-variant flex items-center gap-3">
                    <span className="bg-brand-imperial text-white px-3 py-1 rounded-full text-xs font-label-md">Lun - Ven</span>
                    <span>08h00 - 12h30 / 13h30 - 17h00</span>
                  </p>
                  <p className="font-body-md text-on-surface-variant flex items-center gap-3">
                    <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-label-md">Samedi</span>
                    <span>08h00 - 12h00</span>
                  </p>
                </div>
              </div>

              {/* Summer Schedule - Active in July & August */}
              <div className={`p-4 rounded-xl border ${isSummer && !isRamadan ? 'bg-yellow-50/70 border-yellow-400/40 shadow-md' : 'bg-gray-50/30 border-gray-200/30'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold flex items-center gap-1">
                    <span>☀️</span> Horaire d'été
                  </span>
                  {isSummer && !isRamadan ? (
                    <span className="ml-auto inline-flex items-center px-2 py-0.5 bg-yellow-400/80 text-yellow-900 rounded-full text-xs font-bold animate-pulse">
                      ✓ Actif (Juillet - Août)
                    </span>
                  ) : (
                    <span className="ml-auto inline-flex items-center px-2 py-0.5 bg-gray-200 text-gray-500 rounded-full text-xs">
                      Juillet - Août
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="font-body-md text-on-surface-variant flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-label-md ${isSummer && !isRamadan ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                      Lun - Ven
                    </span>
                    <span className={isSummer && !isRamadan ? 'font-semibold text-yellow-800' : 'text-gray-400'}>
                      08h00 - 14h00
                    </span>
                  </p>
                  <p className="font-body-md text-on-surface-variant flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-label-md ${isSummer && !isRamadan ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                      Samedi
                    </span>
                    <span className={isSummer && !isRamadan ? 'font-semibold text-yellow-800' : 'text-gray-400'}>
                      08h00 - 12h00
                    </span>
                  </p>
                  {isSummer && !isRamadan && (
                    <div className="mt-2 p-2 bg-yellow-200/50 border border-yellow-300/50 rounded-lg">
                      <p className="font-body-md text-xs text-yellow-800 flex items-center gap-2">
                        <span>📌</span>
                        <span>Horaire d'été applicable en juillet et août</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Ramadan Schedule - Dynamic based on calculated dates */}
              <div className={`p-4 rounded-xl border ${isRamadan ? 'bg-emerald-50/70 border-emerald-400/40 shadow-md' : 'bg-gray-50/30 border-gray-200/30'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold flex items-center gap-1">
                    <span>🌙</span> Horaire Ramadan
                  </span>
                  {isRamadan ? (
                    <span className="ml-auto inline-flex items-center px-2 py-0.5 bg-emerald-400/80 text-emerald-900 rounded-full text-xs font-bold animate-pulse">
                      ✓ Actif
                    </span>
                  ) : (
                    <span className="ml-auto inline-flex items-center px-2 py-0.5 bg-gray-200 text-gray-500 rounded-full text-xs">
                      {ramadanStart && ramadanEnd ? getRamadanDateRange() : "Période variable"}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="font-body-md text-on-surface-variant flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-label-md ${isRamadan ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                      Lun - Ven
                    </span>
                    <span className={isRamadan ? 'font-semibold text-emerald-800' : 'text-gray-400'}>
                      08h00 - 14h00
                    </span>
                  </p>
                  <p className="font-body-md text-on-surface-variant flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-label-md ${isRamadan ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                      Samedi
                    </span>
                    <span className={isRamadan ? 'font-semibold text-emerald-800' : 'text-gray-400'}>
                      08h00 - 12h00
                    </span>
                  </p>
                  {isRamadan && ramadanStart && ramadanEnd && (
                    <div className="mt-2 p-2 bg-emerald-200/50 border border-emerald-300/50 rounded-lg">
                      <p className="font-body-md text-xs text-emerald-800 flex items-center gap-2">
                        <span>📌</span>
                        <span>Horaire du Ramadan {ramadanStart.getFullYear()} : {getRamadanDateRange()}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[200px] lg:h-[250px] rounded-2xl overflow-hidden shadow-lg">
            <img
              src={isRamadan 
                ? "https://media.istockphoto.com/id/2018101881/fr/photo/ramadan-kareem-photographie-lanterne-en-forme-de-croissant-de-lune-sur-la-plage.jpg?s=612x612&w=0&k=20&c=YbOav-WSFePd-CtKQQu7jADs-o1adyh34T37XzZPTrA="
                : isSummer
                ? "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                : "https://images.unsplash.com/photo-1633526543814-9718c8922b7a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={isRamadan ? "Ramadan Kareem - Horaire Ramadan" : isSummer ? "Summer schedule - Plage" : "Calendar - Disponibilité"}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='24'%3E📅%3C/text%3E%3C/svg%3E";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-imperial/10 to-transparent"></div>
            {isRamadan ? (
              <div className="absolute top-4 right-4 bg-emerald-400/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <span className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                  <span>🌙</span> Ramadan {ramadanStart?.getFullYear() || ""}
                </span>
              </div>
            ) : isSummer ? (
              <div className="absolute top-4 right-4 bg-yellow-400/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <span className="text-sm font-bold text-yellow-900 flex items-center gap-2">
                  <span>☀️</span> Été
                </span>
              </div>
            ) : null}
          </div>
        </div>

        <hr className="border-outline-variant/30 my-8" />

        {/* Form - Only For Candidates */}
        <div className="glass-panel rounded-2xl p-6 md:p-10 border border-outline-variant/30 max-w-4xl mx-auto mb-12">
          <div className="flex border-b border-outline-variant/30 mb-8">
            <button
              className="font-label-md text-label-md py-4 px-8 focus:outline-none transition-colors w-full text-center text-secondary border-b-2 border-secondary font-bold"
            >
              For Candidates
            </button>
          </div>

          {/* Candidate Form */}
          <div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-md text-label-md text-brand-imperial mb-2">
                    First Name <span className="text-error">*</span>
                  </label>
                  <input
                    className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    placeholder="John"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-brand-imperial mb-2">
                    Last Name <span className="text-error">*</span>
                  </label>
                  <input
                    className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    placeholder="Doe"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-brand-imperial mb-2">
                  Email Address <span className="text-error">*</span>
                </label>
                <input
                  className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  placeholder="john.doe@example.com"
                  type="email"
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-brand-imperial mb-2">
                  Area of Interest
                </label>
                <select className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 text-on-surface-variant">
                  <option>Training Programs</option>
                  <option>International Employment</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-brand-imperial mb-2">
                  Message
                </label>
                <textarea
                  className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-4 py-3 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  placeholder="How can we help your career?"
                  rows={4}
                ></textarea>
              </div>
              <button
                className="bg-brand-imperial text-white font-label-md text-label-md px-8 py-3 rounded-lg hover:bg-brand-imperial/90 transition-all duration-300 hover:scale-[1.02] w-full md:w-auto shadow-lg"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <hr className="border-outline-variant/30 my-8" />

        {/* Social Media */}
        <div className="mb-12">
          <h3 className="font-headline-md text-brand-imperial mb-4 flex items-center gap-2">
            <span className="text-2xl">📱</span> Suivez-nous sur nos réseaux sociaux :
          </h3>
          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-secondary border border-secondary/30 rounded-full hover:bg-secondary hover:text-white transition-all duration-300 font-label-md text-sm"
            >
              <span>📘</span> Facebook
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-pink-600 border border-pink-600/30 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 font-label-md text-sm"
            >
              <span>📸</span> Instagram
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-red-600 border border-red-600/30 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 font-label-md text-sm"
            >
              <span>▶️</span> YouTube
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[#1DA1F2] border border-[#1DA1F2]/30 rounded-full hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 font-label-md text-sm"
            >
              <span>🐦</span> Twitter
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[#0A66C2] border border-[#0A66C2]/30 rounded-full hover:bg-[#0A66C2] hover:text-white transition-all duration-300 font-label-md text-sm"
            >
              <span>💼</span> LinkedIn
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-black border border-black/30 rounded-full hover:bg-black hover:text-white transition-all duration-300 font-label-md text-sm"
            >
              <span>🎵</span> TikTok
            </a>
          </div>
        </div>

        <hr className="border-outline-variant/30 my-8" />

        {/* Submit Button */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-brand-imperial to-brand-imperial/90 text-white font-label-md text-label-md px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] inline-flex items-center gap-3">
            Envoyer
            <span className="text-lg">→</span>
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}