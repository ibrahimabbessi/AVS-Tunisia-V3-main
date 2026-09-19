// app/components/FirmaFooter.tsx

import Link from "next/link";
import { MapPin, Phone, ChevronRight, Briefcase } from "lucide-react";

const BASE_PATH = "/company";

const linkClass =
  "group flex items-center gap-1.5 text-[11px] text-on-surface-variant hover:text-secondary transition-all duration-300";

const headingClass =
  "font-label-md text-[10px] text-primary uppercase tracking-[0.08em] mb-3";

export default function FirmaFooter() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10">

          {/* Brand */}
          <div className="flex flex-col">
            <Link
              href={BASE_PATH}
              className="font-headline-md text-primary tracking-tight hover:text-secondary transition-colors duration-300"
            >
              AVS Tunisia
            </Link>

            <div className="mt-2 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-secondary" />
              <span className="text-[10px] font-medium text-secondary">
                Entreprises
              </span>
            </div>

            <p className="font-caption text-on-surface-variant max-w-xs mt-3 leading-relaxed">
              Votre partenaire pour le recrutement et l&apos;accompagnement
              des talents internationaux.
            </p>

            {/* Small accent */}
            <div className="mt-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-sapphire" />

              <span className="text-[10px] text-on-surface-variant">
                Talents & recrutement international
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col">
            <h3 className={headingClass}>Navigation</h3>

            <Link
              href={BASE_PATH}
              className={linkClass}
            >
              Pourquoi AVS ?
            </Link>

            <Link
              href={`${BASE_PATH}/notre-modele`}
              className={linkClass}
            >
              Notre Modèle
            </Link>

            <Link
              href={`${BASE_PATH}/nos-succes`}
              className={linkClass}
            >
              Nos Succès
            </Link>

            <Link
              href={`${BASE_PATH}/opportunites`}
              className={linkClass}
            >
              Opportunités
            </Link>

            <Link
              href={`${BASE_PATH}/cadre-juridique-securite`}
              className={linkClass}
            >
              Cadre Juridique & Sécurité
            </Link>
          </div>

          {/* Entreprises */}
          <div className="flex flex-col">
            <h3 className={headingClass}>Entreprises</h3>

            <Link
              href={`${BASE_PATH}/notre-modele`}
              className={linkClass}
            >
              Notre modèle de collaboration
              <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>

            <Link
              href={`${BASE_PATH}/opportunites`}
              className={linkClass}
            >
              Opportunités de recrutement
            </Link>

            <Link
              href={`${BASE_PATH}/nos-succes`}
              className={linkClass}
            >
              Nos partenariats
            </Link>

            <Link
              href={`${BASE_PATH}/cadre-juridique-securite`}
              className={linkClass}
            >
              Cadre juridique & sécurité
            </Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <h3 className={headingClass}>Contact</h3>

            <Link
              href={`${BASE_PATH}/contact`}
              className="group inline-flex items-center justify-center gap-2 w-fit bg-brand-imperial text-white hover:bg-brand-imperial/90 px-4 py-2.5 rounded-lg font-label-md text-[10px] transition-all duration-300 hover:scale-[1.02] glass-highlight"
            >
              Contactez-nous
              <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            {/* Contact information */}
            <div className="mt-4 pt-4 border-t border-outline-variant/30 space-y-2">

              {/* Address */}
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-secondary mt-0.5 shrink-0" />

                <div className="text-[10px] text-on-surface-variant leading-relaxed">
                  <span className="block">
                    Ave. Habib Bourguiba
                  </span>

                  <span className="block">
                    Hergla 4012, Tunisie
                  </span>
                </div>
              </div>

              {/* Phone 1 */}
              <a
                href="tel:+21699658637"
                className="flex items-center gap-2 text-[10px] text-on-surface-variant hover:text-secondary transition-colors duration-300"
              >
                <Phone className="w-3.5 h-3.5 text-secondary" />
                99 658 637
              </a>

              {/* Phone 2 */}
              <a
                href="tel:+21673251010"
                className="flex items-center gap-2 text-[10px] text-on-surface-variant hover:text-secondary transition-colors duration-300"
              >
                <Phone className="w-3.5 h-3.5 text-secondary" />
                73 251 010
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-outline-variant/30 py-4 flex flex-col md:flex-row items-center justify-between gap-3">

          {/* Copyright */}
          <p className="font-caption text-on-surface-variant text-[10px]">
            © 2026 AVS Tunisia Group. Tous droits réservés.
          </p>

          {/* Bottom Links */}
          <div className="flex items-center gap-1">

            <Link
              href={BASE_PATH}
              className="px-2.5 py-1.5 rounded-md text-[10px] text-on-surface-variant hover:text-secondary hover:bg-surface-container-low transition-all duration-300"
            >
              Pourquoi AVS ?
            </Link>

            <Link
              href={`${BASE_PATH}/opportunites`}
              className="px-2.5 py-1.5 rounded-md text-[10px] text-on-surface-variant hover:text-secondary hover:bg-surface-container-low transition-all duration-300"
            >
              Opportunités
            </Link>

            <Link
              href={`${BASE_PATH}/contact`}
              className="px-2.5 py-1.5 rounded-md text-[10px] text-on-surface-variant hover:text-secondary hover:bg-surface-container-low transition-all duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

