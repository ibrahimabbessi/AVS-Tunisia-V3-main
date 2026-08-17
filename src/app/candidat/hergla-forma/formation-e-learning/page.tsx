// src/app/hergla-forma/formation-e-learning/page.tsx
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

type FormData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  email: string;
  city: string;
  formation: string;
  message: string;
};

export default function ELearningPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    email: "",
    city: "",
    formation: "",
    message: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Votre demande a été envoyée avec succès !");
    setFormData({
      firstName: "",
      lastName: "",
      birthDate: "",
      phone: "",
      email: "",
      city: "",
      formation: "",
      message: "",
    });
    setShowForm(false);
  };

  const formationCategories = [
    { id: "technique", label: "Formation Technique", icon: "💻" },
    { id: "soft-skills", label: "Soft Skills", icon: "👥" },
    { id: "graphic-design", label: "Graphic Design", icon: "🎨" },
    { id: "marketing-digital", label: "Marketing Digital", icon: "📢" },
    { id: "autres", label: "Autres", icon: "💼" },
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                Hergla Forma
              </span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                E-learning
              </span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
              E-learning
            </h1>
            <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
            <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed max-w-3xl">
              Notre offre E-learning
            </p>
            <p className="font-body-md text-on-surface-variant mt-2 leading-relaxed max-w-3xl">
              AVS Hergla Forma vous offre la possibilité de se former en mode E-learning à travers sa plateforme.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg">
        
        {/* Features Grid */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <div className="card-hover rounded-xl bg-surface-container-lowest p-5 border border-outline-variant/30 shadow-sm transition-all duration-300 flex items-start gap-3">
            <div className="mt-1">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-body-md text-on-surface-variant text-sm">
                Nos formations sont élaborées selon les <span className="font-semibold text-brand-imperial">standards internationaux</span>.
              </p>
            </div>
          </div>

          <div className="card-hover rounded-xl bg-surface-container-lowest p-5 border border-outline-variant/30 shadow-sm transition-all duration-300 flex items-start gap-3">
            <div className="mt-1">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-body-md text-on-surface-variant text-sm">
                Nos formations dispensées à distance sont accessibles partout : sur votre{" "}
                <span className="font-semibold text-brand-imperial">smartphone, tablette ou PC</span> et vous permettent
                d'adapter votre planning de formation à vos contraintes de temps.
              </p>
            </div>
          </div>

          <div className="card-hover rounded-xl bg-surface-container-lowest p-5 border border-outline-variant/30 shadow-sm transition-all duration-300 flex items-start gap-3 sm:col-span-2">
            <div className="mt-1">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-body-md text-on-surface-variant text-sm">
                Nos formations vous confèrent de solides compétences, des capacités d'intégration et de synthèse
                vous facilitant l'intégration aisée dans le milieu professionnel.
              </p>
            </div>
          </div>
        </div>

        {/* Planning Note */}
        <div className="mb-10 rounded-xl bg-brand-ice/30 p-4 text-center border border-secondary/20">
          <p className="font-label-md text-brand-imperial">
            📅 Le planning de formation e-learning est en cours et sera partagé ultérieurement.
          </p>
        </div>

        {/* Formation Categories */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-imperial/10 flex items-center justify-center text-xl">
              📚
            </div>
            <h2 className="font-headline-lg text-brand-imperial">
              Nos formations
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {formationCategories.map((category) => (
              <div
                key={category.id}
                className="card-hover flex items-center gap-3 rounded-xl bg-surface-container-lowest px-4 py-3 border border-outline-variant/30 shadow-sm transition-all duration-300"
              >
                <span className="text-xl">{category.icon}</span>
                <span className="font-body-md text-on-surface-variant text-sm font-medium">
                  {category.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-imperial text-white rounded-xl font-label-md transition-all duration-300 hover:bg-brand-imperial/90 hover:shadow-lg hover:scale-[1.02]"
          >
            <span className="text-xl">💻</span>
            {showForm ? "Fermer le formulaire" : "S'inscrire à une formation"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mt-8 rounded-2xl bg-surface-container-lowest p-6 md:p-8 shadow-lg border border-outline-variant/30 animate-in fade-in slide-in-from-top-5 duration-300">
            <h3 className="font-headline-md text-brand-imperial mb-6">
              Formulaire d'inscription
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                    Prénom <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">👤</span>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-10 py-2.5 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                      placeholder="Votre prénom"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                    Nom <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2.5 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                    Date de naissance <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">📅</span>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-10 py-2.5 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                    Tél./Mobile <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">📱</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-10 py-2.5 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                      placeholder="Votre numéro de téléphone"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                    Email <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">✉️</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-10 py-2.5 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                      placeholder="Votre adresse email"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                    Ville <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">📍</span>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-10 py-2.5 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                      placeholder="Votre ville"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                  Formation souhaitée
                </label>
                <select
                  name="formation"
                  value={formData.formation}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2.5 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                >
                  <option value="">Sélectionnez une formation</option>
                  {formationCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-label-md text-on-surface-variant text-sm mb-1.5 block">
                  Votre message <span className="text-on-surface-variant/60">(facultatif)</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2.5 text-sm transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  placeholder="Écrivez votre message ici..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-outline-variant/30 px-4 py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-imperial text-white rounded-lg font-label-md transition-all duration-300 hover:bg-brand-imperial/90 hover:scale-[1.02] shadow-lg"
                >
                  <span>✉️</span>
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-brand-imperial text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-lg text-center relative z-10">
          <h2 className="font-headline-lg text-white mb-4">
            Prêt à commencer votre parcours ?
          </h2>
          <p className="font-body-lg text-white/80 max-w-2xl mx-auto mb-8">
            Rejoignez-nous et bénéficiez d'un accompagnement personnalisé vers votre réussite professionnelle en Allemagne
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-imperial rounded-xl font-label-md hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] shadow-lg"
            >
              Contactez-nous
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/candidature"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-secondary text-white rounded-xl font-label-md hover:bg-secondary/90 transition-all duration-300 hover:scale-[1.02] shadow-lg glass-highlight"
            >
              Postuler maintenant
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}