import { Clock, HeartIcon, Users } from "lucide-react";
import Image from "next/image";

export function CTA() {
  return (
    <section className="py-32 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-5xl px-4 text-center relative z-10">
        <div className="space-y-10">
          <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <span className="text-sm font-semibold">Rejoignez-nous</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Prêt à trouver <br />
            <span className="bg-linear-to-r from-primary to-pink-400 bg-clip-text text-transparent">
              l&apos;amour ?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Téléchargez TIA dès maintenant et commencez votre aventure
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
            <div className="relative group cursor-pointer">
              <Image
                src="/images/logo/google-play-badge.png"
                alt="Bientôt sur Google Play"
                width={160}
                height={60}
                className="h-14 object-contain grayscale opacity-70 transition-all duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                <span className="text-white text-sm font-medium">
                  Bientôt disponible
                </span>
              </div>
              <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-10 left-0 right-0 mx-auto w-48 p-2 bg-black/80 text-white text-xs rounded text-center">
                Application en cours d&apos;approbation sur le Google Play Store
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <Image
                src="/images/logo/app-store-badge.png"
                alt="Bientôt sur App Store"
                width={160}
                height={60}
                className="h-14 object-contain grayscale opacity-70 transition-all duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                <span className="text-white text-sm font-medium">
                  Bientôt disponible
                </span>
              </div>
              <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-10 left-0 right-0 mx-auto w-48 p-2 bg-black/80 text-white text-xs rounded text-center">
                Application en cours de développement pour iOS
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-gray-400">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm font-medium text-white">2k+</span>
              </div>
              <div className="flex items-center">
                <HeartIcon className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm font-medium text-white">
                  Intéressés
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-amber-500 mr-1" />
                <span className="text-sm font-medium text-white">Bientôt</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
