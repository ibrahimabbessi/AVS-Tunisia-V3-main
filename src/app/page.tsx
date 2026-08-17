"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-imperial to-brand-sapphire p-8">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 md:p-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-brand-imperial mb-4">
          Herzlich Willkommen
        </h1>
        <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
          Wählen Sie Ihren Zugang / Choisissez votre accès
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Company Card */}
          <Link
            href="/company"
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="aspect-video bg-gradient-to-br from-brand-sapphire/20 to-brand-ice/20 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <Image
                    src="https://thumbs.dreamstime.com/b/modern-business-buildings-downtown-corporate-district-architecture-concept-glass-reflective-office-skyscrapers-against-blue-sky-31267261.jpg"
                    alt="Company"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    sizes="128px"
                  />
                </div>
                <h2 className="text-2xl font-bold text-brand-imperial group-hover:text-brand-sapphire transition-colors">
                  Firma / Entreprise
                </h2>
                <p className="text-sm text-on-surface-variant mt-2">
                  Für Unternehmen / Pour les entreprises
                </p>
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-sapphire rounded-2xl transition-colors"></div>
          </Link>

          {/* Candidat Card */}
          <Link
            href="/candidat"
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="aspect-video bg-gradient-to-br from-brand-imperial/20 to-brand-ice/20 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <Image
                    src="https://static.vecteezy.com/ti/fotos-kostenlos/p2/48887574-jung-mann-im-weiss-t-shirt-foto.jpg"
                    alt="Candidate"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    sizes="128px"
                  />
                </div>
                <h2 className="text-2xl font-bold text-brand-imperial group-hover:text-brand-sapphire transition-colors">
                  Kandidat / Candidat
                </h2>
                <p className="text-sm text-on-surface-variant mt-2">
                  Für Bewerber / Pour les candidats
                </p>
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-sapphire rounded-2xl transition-colors"></div>
          </Link>
        </div>

        {/* Decorative footer */}
        <div className="mt-12 text-sm text-on-surface-variant/60">
          AVS Tunisia Group © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}