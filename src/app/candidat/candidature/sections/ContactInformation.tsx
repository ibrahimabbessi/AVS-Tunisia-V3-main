// src/app/candidature/sections/ContactInformation.tsx
"use client";

import React from 'react';
import { ContactInformation } from '../types';

interface ContactInformationSectionProps {
  data: ContactInformation;
  updateData: (data: Partial<ContactInformation>) => void;
}

export const ContactInformationSection: React.FC<ContactInformationSectionProps> = ({
  data,
  updateData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <label className="block font-label-md text-label-md text-brand-imperial">
            Adresse (Adresse) <span className="text-error">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={data.address}
            onChange={handleChange}
            className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
            placeholder="Straße, Hausnummer (Rue, numéro)"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-brand-imperial">
            PLZ (Code postal) <span className="text-error">*</span>
          </label>
          <input
            type="text"
            name="postalCode"
            value={data.postalCode}
            onChange={handleChange}
            className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
            placeholder="PLZ (Code postal)"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-brand-imperial">
            Stadt (Ville) <span className="text-error">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={handleChange}
            className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
            placeholder="Stadt (Ville)"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-brand-imperial">
            Land (Pays)
          </label>
          <input
            type="text"
            name="country"
            value={data.country}
            onChange={handleChange}
            className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
            placeholder="Land (Pays)"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-brand-imperial">
            Telefon (Téléphone) <span className="text-error">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
            placeholder="+216 12 345 678"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-brand-imperial">
            E-Mail (E-mail) <span className="text-error">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
            placeholder="name@beispiel.com (nom@exemple.com)"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-brand-imperial">
            Skype
          </label>
          <input
            type="text"
            name="skype"
            value={data.skype}
            onChange={handleChange}
            className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
            placeholder="Skype-Benutzername (Nom d'utilisateur Skype)"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-label-md text-label-md text-brand-imperial">
            Verfügbar ab (Disponible à partir de) <span className="text-error">*</span>
          </label>
          <input
            type="date"
            name="availableFrom"
            value={data.availableFrom}
            onChange={handleChange}
            className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
            required
          />
        </div>
      </div>

      <div className="mt-4 p-4 bg-brand-ice/10 rounded-lg border border-brand-imperial/10">
        <p className="text-sm text-on-surface-variant/70 flex items-center gap-2">
          <span className="text-brand-imperial">ℹ️</span>
          Diese Kontaktdaten werden für die Kommunikation bezüglich Ihrer Bewerbung verwendet. (Ces coordonnées seront utilisées pour communiquer avec vous concernant votre candidature.)
        </p>
      </div>
    </div>
  );
};