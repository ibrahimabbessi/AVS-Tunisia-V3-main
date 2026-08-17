// app/company/kontakt-beratung/page.tsx
"use client";

import { Mail, Phone, MapPin, Clock, Send, User, Building, MessageSquare, CheckCircle2 } from "lucide-react";
import { useState } from "react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
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
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-[#0a2a88]/10 rounded-lg">
            <Mail className="h-6 w-6 text-[#0a2a88]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact & Conseil</h2>
            <p className="text-gray-600 leading-relaxed">
              Vous avez des questions sur la collaboration ou souhaitez un entretien de conseil personnalisé ? 
              Contactez-nous – nous sommes à votre disposition.
            </p>
          </div>
        </div>
      </section>

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
                  className="w-full flex items-center justify-center gap-2 bg-[#0a2a88] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0a2a88]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
    </div>
  );
}