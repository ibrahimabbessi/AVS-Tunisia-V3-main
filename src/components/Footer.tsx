import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest py-16 px-6 border-t border-outline-variant mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4">
          <span className="font-headline-md text-primary font-bold">
            AVS Tunisia Group
          </span>
          <p className="font-caption text-on-surface-variant max-w-xs">
            &copy; 2026 AVS Tunisia Group. Excellence en formation et
            recrutement international.
          </p>
        </div>
        <div className="flex flex-col space-y-3 font-body-md text-on-surface">
          <span className="font-bold text-sm text-primary mb-1 uppercase tracking-wider">
            Établissements
          </span>
          <Link
            className="text-on-surface-variant hover:text-primary hover:underline transition-all outline-none"
            href="/hergla-forma"
          >
            AVS Hergla Forma
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary hover:underline transition-all outline-none"
            href="/ift-global"
          >
            IFT Global
          </Link>
        </div>
        <div className="flex flex-col space-y-3 font-body-md text-on-surface">
          <span className="font-bold text-sm text-primary mb-1 uppercase tracking-wider">
            Pôles & Secteurs
          </span>
          <Link
            className="text-on-surface-variant hover:text-primary hover:underline transition-all outline-none"
            href="/formations"
          >
            Programmes Santé
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary hover:underline transition-all outline-none"
            href="/formations"
          >
            Pôle IT & Ingénierie
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary hover:underline transition-all outline-none"
            href="/formations"
          >
            Industrie 4.0
          </Link>
        </div>
        <div className="flex flex-col space-y-3 font-body-md text-on-surface">
          <span className="font-bold text-sm text-primary mb-1 uppercase tracking-wider">
            Ressources
          </span>
          <Link
            className="text-on-surface-variant hover:text-primary hover:underline transition-all outline-none"
            href="/candidature"
          >
            Candidature en Ligne
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary hover:underline transition-all outline-none"
            href="/contact"
          >
            Contactez-nous
          </Link>
        </div>
      </div>
    </footer>
  );
}
