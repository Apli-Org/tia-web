import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col items-center gap-8">
          <Image
            src="/images/TiaLogo.png"
            alt="TIA Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              CGU
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Mentions légales
            </a>
            <a href="mailto:support@tia.app" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </a>
          </div>
          <p className="text-sm text-gray-600">
            © 2025 TIA. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
