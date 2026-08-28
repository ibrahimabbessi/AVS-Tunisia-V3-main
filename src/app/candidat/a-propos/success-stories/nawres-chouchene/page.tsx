// src/app/candidat/a-propos/success-stories/nawres-chouchene/page.tsx

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    ArrowLeft,
    Calendar,
    MapPin,
    Award,
    Heart,
    Quote,
    Star,
    Share2,
    ThumbsUp,
    MessageCircle,
    FileText,
} from "lucide-react";

// ============================================================
// IMAGE GALLERY COMPONENT
// ============================================================

function ImageGallery({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imgError, setImgError] = useState<Record<number, boolean>>({});
    const [isPaused, setIsPaused] = useState(false);
    const [thumbErrors, setThumbErrors] = useState<Record<number, boolean>>({});

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleImageError = (id: number) => {
        setImgError(prev => ({ ...prev, [id]: true }));
    };

    const handleThumbError = (id: number) => {
        setThumbErrors(prev => ({ ...prev, [id]: true }));
    };

    // Auto-slide effect every 3 seconds
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            nextImage();
        }, 3000);

        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Main Slider */}
            <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden bg-surface-container-low">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        {!imgError[index] ? (
                            <img
                                src={image}
                                alt={`Photo ${index + 1}`}
                                className="w-full h-full object-contain"
                                onError={() => handleImageError(index)}
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-brand-imperial/10 to-secondary/10 flex items-center justify-center">
                                <span className="text-on-surface-variant text-sm">Image non disponible</span>
                            </div>
                        )}
                    </div>
                ))}

                {isPaused && (
                    <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        ⏸ Pause
                    </div>
                )}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-4">
                <button
                    onClick={prevImage}
                    className="p-2 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors"
                    aria-label="Previous image"
                >
                    <svg className="w-5 h-5 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-on-surface-variant">
                        {currentIndex + 1} / {images.length}
                    </span>
                    <div className="flex gap-1">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all ${index === currentIndex
                                        ? "w-6 bg-secondary"
                                        : "w-2 bg-outline-variant hover:bg-outline"
                                    }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <button
                    onClick={nextImage}
                    className="p-2 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors"
                    aria-label="Next image"
                >
                    <svg className="w-5 h-5 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${index === currentIndex
                                    ? "border-secondary shadow-lg shadow-secondary/20 scale-105"
                                    : "border-outline-variant hover:border-secondary/50"
                                }`}
                        >
                            {!thumbErrors[index] ? (
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={() => handleThumbError(index)}
                                />
                            ) : (
                                <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
                                    <span className="text-[8px] text-on-surface-variant/50">{index + 1}</span>
                                </div>
                            )}
                            {index === currentIndex && (
                                <div className="absolute inset-0 ring-2 ring-secondary ring-inset"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============================================================
// PRESS DOCUMENT COMPONENT
// ============================================================

function PressDocument({ pressUrl }: { pressUrl: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [imgError, setImgError] = useState(false);

    return (
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-outline-variant/30">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-secondary/10 rounded-lg">
                    <FileText className="size-5 text-secondary" />
                </div>
                <h2 className="font-headline-lg text-on-surface">📰 Presse & Médias</h2>
            </div>

            {/* Press Document Display */}
            <div className="relative">
                {!imgError ? (
                    <div className="relative">
                        <img
                            src={pressUrl}
                            alt="Article de presse - Nawres Chouchene"
                            className="w-full h-auto rounded-lg border border-outline-variant/30 shadow-md"
                            onError={() => setImgError(true)}
                            style={{ maxHeight: '600px', objectFit: 'contain' }}
                        />
                        {/* Gradient overlay for better readability on smaller screens */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none rounded-lg"></div>
                    </div>
                ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-secondary/10 to-brand-imperial/10 rounded-lg flex items-center justify-center">
                        <span className="text-on-surface-variant">Document non disponible</span>
                    </div>
                )}

                {/* View Full Size Button */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-all duration-300 hover:scale-[1.02]"
                >
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    Voir en plein écran
                </button>
            </div>

            {/* Full Screen Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full z-10"
                            aria-label="Close full screen view"
                        >
                            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={pressUrl}
                            alt="Article de presse - Nawres Chouchene"
                            className="w-full h-full object-contain rounded-lg"
                            onError={() => setImgError(true)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

// ============================================================
// COMPONENT
// ============================================================

export default function NawresChouchenePage() {
    // Cloudinary URLs directly
    const story = {
        id: "nawres-chouchene",
        name: "Nawres Chouchene",
        description: "Ausbildung en Allemagne - Infirmière",
        badge: "Diplômée 2024",
        date: "2020 - 2024",
        location: "Allemagne",
        category: "Santé",
        rating: 5,
        fullStory: `Nawras, 24 ans, originaire de Tunisie

Nawras, une Tunisienne de 24 ans, est déjà mécanicienne automobile qualifiée. Elle a décidé de poursuivre une formation en Allemagne pour devenir mécanicienne industrielle.

Elle effectue sa formation au sein de la Sächsische Dampfschifffahrt, à Dresde. Son futur lieu de travail est la salle des machines, où elle travaille sur les équipements et les installations mécaniques des bateaux.

« Je me réjouis beaucoup de cette nouvelle expérience », explique Nawras, tout en reconnaissant être un peu nerveuse au début.`,
        // All Cloudinary image URLs
        images: [
            "https://res.cloudinary.com/girgi5fd/image/upload/v1787730386/Copie_de_84.Nawres_Chouchene.png",      // Main picture
            "https://res.cloudinary.com/girgi5fd/image/upload/v1787730394/Copie_de_image6.jpg",                // Image 2
            "https://res.cloudinary.com/girgi5fd/image/upload/v1787730379/Copie_de_Nawres_Chouchene_1.png",   // Image 3
            "https://res.cloudinary.com/girgi5fd/image/upload/v1787730382/Copie_de_Nawres_Chouchene.png",     // Image 4
            "https://res.cloudinary.com/girgi5fd/image/upload/v1787730386/Copie_de_Nawres.jpg",               // Image 5
            "https://res.cloudinary.com/girgi5fd/image/upload/v1787730379/Copie_de_Nawres2.jpg",              // Image 6
            "https://res.cloudinary.com/girgi5fd/image/upload/v1787730381/Copie_de_WhatsApp_Image_2023-08-02_%C3%A0_08.20.572.jpg", // Image 7
            "https://res.cloudinary.com/girgi5fd/image/upload/v1787730382/Copie_de_WhatsApp_Image_2023-08-02_%C3%A0_08.20.575.jpg", // Image 8
        ],
        // Press document URL
        pressUrl: "https://res.cloudinary.com/girgi5fd/image/upload/v1787730401/Copie_de_Article.png",
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-8 md:pt-48 md:pb-8 bg-gradient-to-b from-brand-imperial/5 via-surface-container-low to-transparent overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
                    <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
                    <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-brand-imperial blur-3xl"></div>
                </div>
                <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                        <div className="flex-1 max-w-4xl">
                            <Link
                                href="/candidat/a-propos/success-stories"
                                className="inline-flex items-center gap-2 text-brand-imperial hover:gap-3 transition-all duration-300 mb-4 font-medium"
                            >
                                <ArrowLeft className="size-4" />
                                Retour aux success stories
                            </Link>
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="inline-flex items-center px-4 py-1.5 bg-brand-imperial/10 text-brand-imperial uppercase tracking-wider rounded-full font-label-md text-xs font-bold border border-brand-imperial/20 backdrop-blur-sm">
                                    {story.category}
                                </span>
                                {story.badge && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-xs font-bold border border-secondary/20">
                                        <Award className="size-3" />
                                        {story.badge}
                                    </span>
                                )}
                            </div>
                            <h1 className="font-display-lg-mobile md:font-display-lg text-brand-imperial mt-6 leading-tight">
                                {story.name}
                            </h1>
                            <div className="w-20 h-1 bg-secondary rounded-full mt-6"></div>
                            <p className="font-body-lg text-on-surface-variant mt-6 leading-relaxed">
                                {story.description}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-4">
                                {story.date && (
                                    <span className="inline-flex items-center gap-2 text-sm text-on-surface-variant">
                                        <Calendar className="size-4" />
                                        {story.date}
                                    </span>
                                )}
                                {story.location && (
                                    <span className="inline-flex items-center gap-2 text-sm text-on-surface-variant">
                                        <MapPin className="size-4" />
                                        {story.location}
                                    </span>
                                )}
                                {story.rating && (
                                    <span className="inline-flex items-center gap-1 text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="size-4 fill-current" />
                                        ))}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Gallery - Using the ImageGallery component */}
                        <div className="flex-1 max-w-lg">
                            <ImageGallery images={story.images} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Content */}
            <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-12 pb-section-gap-lg">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-outline-variant/30">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-brand-imperial/10 rounded-lg">
                                    <Quote className="size-5 text-brand-imperial" />
                                </div>
                                <h2 className="font-headline-lg text-on-surface">Mon histoire</h2>
                            </div>
                            <div className="prose prose-lg max-w-none text-on-surface-variant leading-relaxed whitespace-pre-line">
                                {story.fullStory}
                            </div>
                            <div className="mt-6 flex items-center gap-2 text-brand-imperial bg-brand-imperial/5 px-4 py-3 rounded-lg">
                                <Heart className="size-4 fill-brand-imperial/20" />
                                <span className="font-medium">Une histoire inspirante</span>
                            </div>
                        </div>

                        {/* Press Document Section */}
                        <PressDocument pressUrl={story.pressUrl} />

                        {/* Back and Share */}
                        <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
                            <Link
                                href="/candidat/a-propos/success-stories"
                                className="inline-flex items-center gap-2 text-brand-imperial font-medium hover:gap-3 transition-all duration-300"
                            >
                                <ArrowLeft className="size-4" />
                                Toutes les success stories
                            </Link>
                            <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                                <span>Partager</span>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Share2 className="size-4" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <ThumbsUp className="size-4" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <MessageCircle className="size-4" />
                                </button>
                            </div>
                        </div>

                        {/* Related Stories CTA */}
                        <div className="mt-8 p-6 bg-gradient-to-r from-brand-ice/30 to-brand-imperial/10 rounded-2xl border border-brand-imperial/20">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-headline-md text-on-surface">
                                        ✨ D'autres success stories
                                    </h3>
                                    <p className="text-sm text-on-surface-variant">
                                        Découvrez les parcours inspirants d'autres talents
                                    </p>
                                </div>
                                <Link
                                    href="/candidat/a-propos/success-stories"
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-imperial text-white rounded-lg font-medium hover:bg-brand-imperial/90 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Voir toutes
                                    <ArrowLeft className="size-4 rotate-180" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - CTA Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-outline-variant/30 sticky top-24">
                            <h3 className="font-headline-md text-on-surface mb-4 flex items-center gap-2">
                                <span>🚀</span> Rejoignez l'aventure
                            </h3>
                            <p className="text-sm text-on-surface-variant mb-6">
                                Vous aussi, réalisez votre rêve de partir étudier ou travailler en Allemagne.
                            </p>

                            {/* CTA Section */}
                            <div className="space-y-3">
                                <Link
                                    href="/candidat/candidature"
                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-brand-imperial text-white rounded-lg font-medium hover:bg-brand-imperial/90 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Rejoindre l'aventure
                                    <svg
                                        className="size-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </Link>
                                <Link
                                    href="/candidat/contact"
                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Contactez-nous
                                    <MessageCircle className="size-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}