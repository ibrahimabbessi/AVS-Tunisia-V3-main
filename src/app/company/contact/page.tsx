// app/company/kontakt-beratung/page.tsx
"use client";

import { Mail, Phone, MapPin, Clock, Send, User, Building, MessageSquare, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import FirmaNav from "@/components/FirmaNav";
import Footer from "@/components/Footer";

export default function KontaktBeratungPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    interest: "recruitment"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSummer, setIsSummer] = useState(false);

  useEffect(() => {
    const checkSummer = () => {
      const now = new Date();
      const month = now.getMonth();
      setIsSummer(month === 6 || month === 7);
    };
    
    checkSummer();
    const interval = setInterval(checkSummer, 3600000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Téléphone",
      value: "99 658 637 / 73 251 010",
      href: "tel:+21699658637"
    },
    {
      icon: Mail,
      label: "E-Mail",
      value: "info@avstunisia.com",
      href: "mailto:info@avstunisia.com"
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: "Ave. Habib Bourguiba, Hergla 4012, Tunisie",
      href: "https://maps.google.com"
    },
    {
      icon: Clock,
      label: "Horaires d'ouverture",
      value: "Lun - Ven: 08:00 - 18:00",
      href: null
    }
  ];

  return (
    <>
      <FirmaNav />

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-16 pb-12 md:pb-16 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1">
              <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                Contact & Conseil
              </span>
              <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                Contactez-nous
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
              <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed max-w-3xl">
                Vous avez des questions sur la collaboration ou souhaitez un entretien de conseil personnalisé ? 
                Contactez-nous – nous sommes à votre disposition.
              </p>
            </div>
            <div className="flex-1 relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl">
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

      {/* Main Content */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-12 pb-section-gap-lg">
        {/* Contact Cards with Maps */}
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
              {isSummer && (
                <span className="ml-3 inline-flex items-center px-3 py-1 bg-yellow-400/20 text-yellow-700 border border-yellow-400/30 rounded-full text-xs font-bold animate-pulse">
                  ☀️ Horaire d'été
                </span>
              )}
            </h3>
            <div className="space-y-4">
              {/* Regular Schedule */}
              <div className={`p-4 rounded-xl border ${isSummer ? 'bg-gray-50/50 border-gray-200/50' : 'bg-brand-ice/10 border-brand-imperial/10'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-on-surface-variant">📅 Horaire régulier</span>
                  {!isSummer && (
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

              {/* Summer Schedule */}
              <div className={`p-4 rounded-xl border ${isSummer ? 'bg-yellow-50/70 border-yellow-400/40 shadow-md' : 'bg-gray-50/30 border-gray-200/30'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold flex items-center gap-1">
                    <span>☀️</span> Horaire d'été
                  </span>
                  {isSummer ? (
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
                    <span className={`px-3 py-1 rounded-full text-xs font-label-md ${isSummer ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                      Lun - Ven
                    </span>
                    <span className={isSummer ? 'font-semibold text-yellow-800' : 'text-gray-400'}>
                      08h00 - 14h00
                    </span>
                  </p>
                  <p className="font-body-md text-on-surface-variant flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-label-md ${isSummer ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                      Samedi
                    </span>
                    <span className={isSummer ? 'font-semibold text-yellow-800' : 'text-gray-400'}>
                      08h00 - 12h00
                    </span>
                  </p>
                  {isSummer && (
                    <div className="mt-2 p-2 bg-yellow-200/50 border border-yellow-300/50 rounded-lg">
                      <p className="font-body-md text-xs text-yellow-800 flex items-center gap-2">
                        <span>📌</span>
                        <span>Horaire d'été applicable en juillet et août</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[200px] lg:h-[250px] rounded-2xl overflow-hidden shadow-lg">
            <img
              src={isSummer 
                ? "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                : "https://images.unsplash.com/photo-1633526543814-9718c8922b7a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={isSummer ? "Summer schedule - Plage" : "Calendar - Disponibilité"}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='24'%3E📅%3C/text%3E%3C/svg%3E";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-imperial/10 to-transparent"></div>
            {isSummer && (
              <div className="absolute top-4 right-4 bg-yellow-400/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <span className="text-sm font-bold text-yellow-900 flex items-center gap-2">
                  <span>☀️</span> Été
                </span>
              </div>
            )}
          </div>
        </div>

        <hr className="border-outline-variant/30 my-8" />

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((info) => (
              <div key={info.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#0a2a88]/10 rounded-lg">
                    <info.icon className="h-4 w-4 text-[#0a2a88]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{info.label}</div>
                    {info.href ? (
                      <a href={info.href} className="text-sm font-medium text-gray-900 hover:text-[#0a2a88] transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-sm font-medium text-gray-900">{info.value}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Team Contact */}
            <div className="bg-gradient-to-br from-[#0a2a88] to-[#3b8bc4] rounded-xl p-6 text-white">
              <h4 className="font-semibold mb-3">Vos interlocuteurs</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Ikbal Lamine Ben Said</p>
                  <p className="text-sm text-white/70">Coach & Consultant International</p>
                  <a href="mailto:ikbal@avstunisia.com" className="text-xs text-white/60 hover:text-white transition-colors">
                    ikbal@avstunisia.com
                  </a>
                </div>
                <div>
                  <p className="font-medium">Mohamed Ben Said</p>
                  <p className="text-sm text-white/70">Chef de Projet</p>
                  <a href="mailto:mohamed@avstunisia.com" className="text-xs text-white/60 hover:text-white transition-colors">
                    mohamed@avstunisia.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Demande de conseil</h3>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Merci !</h4>
                  <p className="text-gray-600">
                    Votre demande a été transmise avec succès. Nous vous contacterons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Votre nom *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a2a88]/20 focus:border-[#0a2a88] outline-none transition-all"
                          placeholder="Votre nom complet"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Entreprise *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a2a88]/20 focus:border-[#0a2a88] outline-none transition-all"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Adresse e-mail *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a2a88]/20 focus:border-[#0a2a88] outline-none transition-all"
                          placeholder="votre@email.fr"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Numéro de téléphone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a2a88]/20 focus:border-[#0a2a88] outline-none transition-all"
                          placeholder="Votre numéro de téléphone"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Je suis intéressé par *
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a2a88]/20 focus:border-[#0a2a88] outline-none transition-all"
                    >
                      <option value="recruitment">Recrutement de talents</option>
                      <option value="partnership">Partenariat général</option>
                      <option value="training">Formation linguistique</option>
                      <option value="consulting">Entretien de conseil</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Votre message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a2a88]/20 focus:border-[#0a2a88] outline-none transition-all resize-none"
                        placeholder="Décrivez votre demande ou vos questions..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-brand-imperial text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-imperial/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Envoyer la demande
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    * Champs obligatoires. Nous traitons vos données de manière confidentielle et conformément à notre politique de confidentialité.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12">
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
      </section>

      <Footer />
    </>
  );
}