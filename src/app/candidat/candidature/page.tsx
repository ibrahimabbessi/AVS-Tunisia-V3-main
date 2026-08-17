// src/app/candidature/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function CandidaturePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    email: "",
    city: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [hoveredDocIndex, setHoveredDocIndex] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // New state for checkboxes
  const [agreements, setAgreements] = useState({
    age: false,
    dataCorrect: false,
    rejectionAccept: false,
    feesNonRefundable: false,
  });

  // Auto-animation for steps
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % 6);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, files, agreements });
    alert("Votre candidature a été envoyée avec succès !");
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Check if all agreements are checked
  const allAgreementsChecked = Object.values(agreements).every(value => value === true);

  // Steps for the application process with images - 4x size - swapped 2 & 3
  const applicationSteps = [
    { 
      id: 1, 
      label: "Téléchargez le document", 
      image: "https://previews.123rf.com/images/arcady31/arcady311609/arcady31160900156/64136621-pdf-document-download-icon.jpg"
    },
    { 
      id: 2, 
      label: "Imprimez le document", 
      image: "https://www.usscplus.com/wp-content/uploads/2021/09/imprimer-document-ordinateur.jpg"
    },
    { 
      id: 3, 
      label: "Remplissez le document", 
      image: "https://thumbs.dreamstime.com/b/remplir-documents-39095061.jpg"
    },
    { 
      id: 4, 
      label: "Signez le document", 
      image: "https://www.leportagesalarial.com/wp-content/uploads/2021/03/signature-documents.jpg"
    },
    { 
      id: 5, 
      label: "Scannez le document", 
      image: "https://www.laposte.fr/ecom/occ/ecommerce/medias/sys_master/productsmedias/hf9/h01/30985916579870/1200Wx1200H_mp-500039798_media/mp-500039798_media.jpg"
    },
    { 
      id: 6, 
      label: "Remplissez le formulaire", 
      image: "https://formulaire-interactif.fr/wp-content/uploads/2022/11/ecran_home_V2.gif"
    },
  ];

  // Document sample images for Step 2
  const documentImages = [
    { id: 1, url: "https://static.onlinecv.fr/wp-content/uploads/sites/36/2023/12/12113530/FRE_Munich_Photo-1040x1433.webp", label: "Photo d'identité" },
    { id: 2, url: "https://thumbs.dreamstime.com/b/un-jeune-br%C3%A9silien-portant-tshirt-bleu-debout-sur-fond-blanc-isol%C3%A9-visage-joyeux-souriant-aux-bras-crois%C3%A9s-regardant-la-cam%C3%A9ra-228325198.jpg", label: "Photo portrait" },
    { id: 3, url: "https://www.leconomistemaghrebin.com/wp-content/uploads/2026/07/passeportt.jpg", label: "Passeport" },
    { id: 4, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8eMKn143bHBKxv-c7uJpOCBvsFe2RSnpfgZsiawVsmn8uKAUttIRe8WPm&s=10", label: "Diplôme" },
    { id: 5, url: "https://imgv2-1-f.scribdassets.com/img/document/95226756/original/90995a27a4/1?v=1", label: "Certificat de stage" },
    { id: 6, url: "https://www.linguaviva-dortmund.de/assets/images/telc-musterzertifikat-b1-451x640.jpg", label: "Certificat de langue" },
  ];

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <main className="flex-grow pt-28 pb-section-gap-lg px-margin-mobile md:px-gutter">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                  Candidature
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                  En ligne
                </span>
              </div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
                Application Hub
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Commencez votre parcours vers des opportunités globales. Complétez votre profil avec soin pour nous aider à vous proposer les meilleurs parcours de carrière.
              </p>
            </div>

            {/* Steps - Process in order with images - 4x size with auto-animation */}
            <div className="mb-8 rounded-2xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/30">
              <h2 className="font-headline-md text-brand-imperial mb-4">Étapes à suivre :</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {applicationSteps.map((step, index) => {
                  const isActive = index === activeStepIndex;
                  return (
                    <div 
                      key={step.id} 
                      className={`group flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 transition-all duration-300 hover:shadow-md ${
                        isActive 
                          ? 'border-secondary/70 shadow-lg scale-[1.02] bg-secondary/5' 
                          : 'hover:border-secondary/50'
                      }`}
                      style={{
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <div className={`flex-shrink-0 w-48 h-48 rounded-lg overflow-hidden border border-outline-variant/30 transition-all duration-300 ${
                        isActive ? 'shadow-xl ring-2 ring-secondary/40' : ''
                      }`}>
                        <img
                          src={step.image}
                          alt={step.label}
                          className={`w-full h-full object-cover transition-all duration-300 ${
                            isActive ? 'scale-110 brightness-110' : 'group-hover:scale-110'
                          }`}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='12'%3E" + step.id + "%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <span className={`font-body-md text-sm text-center transition-all duration-300 ${
                        isActive ? 'text-secondary font-bold' : 'text-on-surface-variant'
                      }`}>
                        {step.id}/ {step.label}
                      </span>
                      {isActive && (
                        <div className="w-12 h-1 bg-secondary rounded-full animate-pulse" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progress Steps */}
            <div className="glass-panel rounded-xl shadow-[0_20px_40px_rgba(3,4,94,0.05)] p-6 md:p-10 relative overflow-hidden border border-outline-variant/30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

              {/* Steps Indicator */}
              <div className="mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-variant -z-10 -translate-y-1/2"></div>
                <div 
                  className="absolute top-1/2 left-0 h-[2px] bg-brand-imperial -z-10 -translate-y-1/2 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                ></div>
                <div className="flex justify-between items-center relative z-0">
                  {[
                    { num: 1, label: "Personal Info" },
                    { num: 2, label: "Documents" },
                    { num: 3, label: "Sector" },
                    { num: 4, label: "Upload" },
                  ].map((step) => (
                    <div 
                      key={step.num}
                      className={`flex flex-col items-center cursor-pointer ${
                        currentStep === step.num ? "step-active" : "step-inactive"
                      }`}
                      onClick={() => setCurrentStep(step.num)}
                    >
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 transition-colors duration-300 shadow-sm font-label-md text-label-md ${
                        currentStep === step.num 
                          ? "bg-brand-imperial text-white border-brand-imperial"
                          : "bg-white border-outline-variant text-on-surface-variant hover:border-brand-imperial"
                      }`}>
                        {step.num}
                      </div>
                      <span className={`font-label-md text-caption md:text-label-md text-center ${
                        currentStep === step.num ? "text-brand-imperial font-bold" : "text-on-surface-variant"
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="font-headline-md text-headline-md text-brand-imperial border-b border-outline-variant/30 pb-2">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-brand-imperial" htmlFor="firstName">
                          Prénom <span className="text-error">*</span>
                        </label>
                        <input
                          className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-brand-imperial" htmlFor="lastName">
                          Nom <span className="text-error">*</span>
                        </label>
                        <input
                          className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="block font-label-md text-label-md text-brand-imperial" htmlFor="email">
                          Email <span className="text-error">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-outline pointer-events-none">
                            ✉️
                          </span>
                          <input
                            className="w-full bg-white border border-outline-variant rounded-lg pl-10 pr-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                            id="email"
                            name="email"
                            placeholder="john.doe@example.com"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-brand-imperial" htmlFor="phone">
                          Téléphone <span className="text-error">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-outline pointer-events-none">
                            📱
                          </span>
                          <input
                            className="w-full bg-white border border-outline-variant rounded-lg pl-10 pr-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                            id="phone"
                            name="phone"
                            placeholder="55 555 555"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block font-label-md text-label-md text-brand-imperial" htmlFor="birthDate">
                          Date de naissance <span className="text-error">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-outline pointer-events-none">
                            📅
                          </span>
                          <input
                            className="w-full bg-white border border-outline-variant rounded-lg pl-10 pr-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow text-on-surface-variant"
                            id="birthDate"
                            name="birthDate"
                            type="date"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="block font-label-md text-label-md text-brand-imperial" htmlFor="city">
                          Ville <span className="text-error">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-outline pointer-events-none">
                            📍
                          </span>
                          <input
                            className="w-full bg-white border border-outline-variant rounded-lg pl-10 pr-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                            id="city"
                            name="city"
                            placeholder="Tunis"
                            type="text"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end pt-6 mt-8 border-t border-outline-variant/30">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-brand-imperial hover:bg-brand-imperial/90 text-white font-label-md text-label-md py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center"
                      >
                        Étape suivante
                        <span className="ml-2">→</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Documents */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="font-headline-md text-headline-md text-brand-imperial border-b border-outline-variant/30 pb-2">
                      Documents
                    </h2>
                    
                    {/* Document to download */}
                    <div className="rounded-xl bg-brand-ice/20 p-4 border border-brand-imperial/10">
                      <p className="mb-2 font-body-md text-sm font-medium text-brand-imperial">
                        Téléchargez le questionnaire à remplir :
                      </p>
                      <a
                        href="/Fragenbogen-fur-potentielle-Bewerber-questionnaire-pour-les-candidats-potentiels-Fragenbogen-fuer-potentielle-Bewerber-V3-juin-2025.pdf"
                        download
                        className="inline-flex items-center gap-2 rounded-lg bg-brand-imperial px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-imperial/90"
                      >
                        <span>📄</span>
                        Questionnaire IFT Global
                      </a>
                      <p className="mt-1 font-body-md text-xs text-on-surface-variant/60">
                        Veuillez remplir ce questionnaire et le joindre à votre dossier
                      </p>
                    </div>

                    {/* Documents to send - with image gallery - show half initially, expand on hover */}
                    <div>
                      <p className="mb-3 font-body-md text-sm font-medium text-on-surface-variant">
                        Documents à fournir (exemples) :
                      </p>
                      <div className="flex flex-wrap gap-4 justify-center">
                        {documentImages.map((doc, index) => {
                          const isHovered = hoveredDocIndex === index;
                          return (
                            <div 
                              key={doc.id}
                              className="relative rounded-lg overflow-hidden border border-outline-variant/30 bg-surface-container-low transition-all duration-500 ease-in-out cursor-pointer"
                              style={{
                                flex: isHovered ? '0 0 220px' : '0 0 100px',
                                height: isHovered ? '320px' : '200px',
                                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                zIndex: isHovered ? 10 : 1,
                                boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.2)' : 'none',
                              }}
                              onMouseEnter={() => setHoveredDocIndex(index)}
                              onMouseLeave={() => setHoveredDocIndex(null)}
                            >
                              <div className="w-full h-full overflow-hidden relative">
                                <img
                                  src={doc.url}
                                  alt={doc.label}
                                  className="w-full h-full object-cover transition-all duration-500"
                                  style={{
                                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                                    objectPosition: isHovered ? 'center' : 'center 30%',
                                  }}
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='267'%3E%3Crect width='200' height='267' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='14'%3E" + doc.label + "%3C/text%3E%3C/svg%3E";
                                  }}
                                />
                                {/* Overlay that hides the bottom portion of the image when not hovered */}
                                <div 
                                  className="absolute bottom-0 left-0 right-0 transition-all duration-500"
                                  style={{
                                    height: isHovered ? '0%' : '50%',
                                    background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 100%)',
                                  }}
                                />
                              </div>
                              <div 
                                className="absolute bottom-0 left-0 right-0 p-3 transition-all duration-500"
                                style={{
                                  background: isHovered 
                                    ? 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' 
                                    : 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
                                }}
                              >
                                <span className={`text-white font-body-md text-center block transition-all duration-500 ${
                                  isHovered ? 'text-sm font-bold' : 'text-xs'
                                }`}>
                                  {doc.label}
                                </span>
                                {isHovered && (
                                  <span className="text-white/80 text-xs block text-center mt-1 animate-fade-in">
                                    ✨ Voir en détail
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <p className="mt-4 font-body-md text-xs text-on-surface-variant/60 italic text-center">
                        * Passez votre souris sur chaque document pour le voir en détail
                      </p>
                    </div>

                    <div className="flex justify-between pt-6 mt-8 border-t border-outline-variant/30">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="bg-transparent hover:bg-surface-container-low text-on-surface-variant font-label-md text-label-md py-3 px-8 rounded-lg transition-all duration-300 flex items-center"
                      >
                        <span className="mr-2">←</span>
                        Retour
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-brand-imperial hover:bg-brand-imperial/90 text-white font-label-md text-label-md py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center"
                      >
                        Étape suivante
                        <span className="ml-2">→</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Sector */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="font-headline-md text-headline-md text-brand-imperial border-b border-outline-variant/30 pb-2">
                      Target Sector & Message
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block font-label-md text-label-md text-brand-imperial mb-2">
                          Secteur d'intérêt
                        </label>
                        <select className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow text-on-surface-variant">
                          <option value="">Sélectionnez un secteur</option>
                          <option value="sante">Secteur de la santé</option>
                          <option value="tourisme">Secteur du tourisme</option>
                          <option value="restauration">Secteur de la restauration</option>
                          <option value="mecanique">Secteur de la mécanique automobile</option>
                          <option value="industrie">Secteur de l'industrie</option>
                          <option value="autres">Autres secteurs</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-label-md text-label-md text-brand-imperial mb-2">
                          Message <span className="text-on-surface-variant/60">(facultatif)</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow"
                          placeholder="Écrivez votre message ici..."
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-6 mt-8 border-t border-outline-variant/30">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="bg-transparent hover:bg-surface-container-low text-on-surface-variant font-label-md text-label-md py-3 px-8 rounded-lg transition-all duration-300 flex items-center"
                      >
                        <span className="mr-2">←</span>
                        Retour
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-brand-imperial hover:bg-brand-imperial/90 text-white font-label-md text-label-md py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center"
                      >
                        Étape suivante
                        <span className="ml-2">→</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Upload */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="font-headline-md text-headline-md text-brand-imperial border-b border-outline-variant/30 pb-2">
                      Upload Documents
                    </h2>
                    
                    {/* Agreements Section */}
                    <div className="rounded-xl bg-brand-ice/10 p-6 border border-brand-imperial/10">
                      <h3 className="font-headline-sm text-brand-imperial mb-4 text-sm font-bold">
                        📋 Confirmation & Engagements
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-start gap-3 cursor-pointer group hover:bg-brand-ice/20 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            name="age"
                            checked={agreements.age}
                            onChange={handleCheckboxChange}
                            className="mt-0.5 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary transition-colors cursor-pointer flex-shrink-0"
                          />
                          <span className="font-body-md text-sm text-on-surface-variant group-hover:text-brand-imperial transition-colors">
                            Je confirme que j'ai moins de 35 ans.
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group hover:bg-brand-ice/20 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            name="dataCorrect"
                            checked={agreements.dataCorrect}
                            onChange={handleCheckboxChange}
                            className="mt-0.5 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary transition-colors cursor-pointer flex-shrink-0"
                          />
                          <span className="font-body-md text-sm text-on-surface-variant group-hover:text-brand-imperial transition-colors">
                            Je confirme que les données fournies seront remplies correctement.
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group hover:bg-brand-ice/20 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            name="rejectionAccept"
                            checked={agreements.rejectionAccept}
                            onChange={handleCheckboxChange}
                            className="mt-0.5 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary transition-colors cursor-pointer flex-shrink-0"
                          />
                          <span className="font-body-md text-sm text-on-surface-variant group-hover:text-brand-imperial transition-colors">
                            Je suis d'accord que ma candidature sera immédiatement rejetée en cas où les informations fournies sont incorrectes.
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group hover:bg-brand-ice/20 p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            name="feesNonRefundable"
                            checked={agreements.feesNonRefundable}
                            onChange={handleCheckboxChange}
                            className="mt-0.5 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary transition-colors cursor-pointer flex-shrink-0"
                          />
                          <span className="font-body-md text-sm text-on-surface-variant group-hover:text-brand-imperial transition-colors">
                            Je suis d'accord que les frais de dossier ne sont pas remboursables.
                          </span>
                        </label>
                      </div>
                      
                      {/* Progress indicator for agreements */}
                      <div className="mt-4 pt-4 border-t border-outline-variant/20">
                        <div className="flex items-center justify-between">
                          <span className="font-body-md text-xs text-on-surface-variant/60">
                            Progression: {Object.values(agreements).filter(v => v).length}/4 confirmations
                          </span>
                          <span className={`font-label-md text-xs font-bold transition-colors duration-300 ${
                            allAgreementsChecked ? 'text-secondary' : 'text-on-surface-variant/40'
                          }`}>
                            {allAgreementsChecked ? '✅ Tous les engagements sont acceptés' : '⚠️ Veuillez accepter tous les engagements'}
                          </span>
                        </div>
                        <div className="mt-2 w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-secondary transition-all duration-500 rounded-full"
                            style={{ width: `${(Object.values(agreements).filter(v => v).length / 4) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Upload Section - Disabled until all agreements checked */}
                    <div className={`relative transition-all duration-500 ${!allAgreementsChecked ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                      {!allAgreementsChecked && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 rounded-xl flex items-center justify-center">
                          <div className="bg-white/90 px-6 py-3 rounded-lg shadow-lg border border-outline-variant/30">
                            <p className="font-body-md text-sm text-on-surface-variant flex items-center gap-2">
                              <span>🔒</span>
                              Veuillez accepter tous les engagements pour activer l'upload
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <div
                        className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                          isDragging
                            ? "border-secondary bg-brand-ice/30"
                            : "border-outline-variant hover:border-secondary/50"
                        }`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleFileDrop}
                      >
                        <input
                          type="file"
                          multiple
                          onChange={handleFileSelect}
                          className="absolute inset-0 cursor-pointer opacity-0"
                          accept=".pdf,.doc,.docx,.txt,.jpeg,.jpg,.png"
                          disabled={!allAgreementsChecked}
                        />
                        <span className="text-4xl mb-2 block">📤</span>
                        <p className="font-body-md text-sm text-on-surface-variant">
                          Glissez-déposez vos fichiers ici ou <span className="text-secondary font-medium">parcourez</span>
                        </p>
                        <p className="font-body-md text-xs text-on-surface-variant/60 mt-1">
                          PDF, DOC, DOCX, TXT, JPG, PNG • Max 10MB
                        </p>
                      </div>
                    </div>

                    {/* File list */}
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-lg bg-surface-container-low px-4 py-2.5 border border-outline-variant/30"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-secondary">📄</span>
                              <span className="font-body-md text-sm text-on-surface-variant">{file.name}</span>
                              <span className="font-body-md text-xs text-on-surface-variant/60">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-sm text-error hover:text-error/80"
                              disabled={!allAgreementsChecked}
                            >
                              Supprimer
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between pt-6 mt-8 border-t border-outline-variant/30">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="bg-transparent hover:bg-surface-container-low text-on-surface-variant font-label-md text-label-md py-3 px-8 rounded-lg transition-all duration-300 flex items-center"
                      >
                        <span className="mr-2">←</span>
                        Retour
                      </button>
                      <button
                        type="submit"
                        disabled={!allAgreementsChecked}
                        className={`font-label-md text-label-md py-3 px-8 rounded-lg shadow-sm transition-all duration-300 flex items-center ${
                          allAgreementsChecked
                            ? 'bg-brand-imperial hover:bg-brand-imperial/90 text-white hover:shadow-md cursor-pointer'
                            : 'bg-surface-container-low text-on-surface-variant/40 cursor-not-allowed border border-outline-variant/30'
                        }`}
                      >
                        ✉️
                        Envoyer ma candidature
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </main>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.4s ease-out forwards;
          }
        ` }} />
      </div>
      <Footer />
    </>
  );
}