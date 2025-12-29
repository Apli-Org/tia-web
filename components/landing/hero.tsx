"use client";

import MobileFrame from "@/components/mobile-frame";
import { Clock, Heart, HeartIcon, Users } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      aria-label="Section principale"
    >
      {/* Enhanced background linear */}
      <div className="absolute inset-0 bg-linear-to-br from-pink-50 via-white to-purple-50 -z-10"></div>

      {/* Animated decorative background elements */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-linear-to-br from-primary/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-linear-to-tr from-purple-200/30 to-primary/20 rounded-full blur-3xl animate-pulse"
        aria-hidden="true"
      ></div>
      <div
        className="absolute top-1/3 right-1/4 w-8 h-8 bg-primary/40 rounded-full animate-ping hidden md:block"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-pink-400/40 rounded-full animate-ping hidden md:block"
        aria-hidden="true"
      ></div>
      <div
        className="absolute top-1/2 right-1/3 w-4 h-4 bg-purple-400/40 rounded-full animate-ping delay-75 hidden md:block"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center py-20 gap-12">
        {/* Left side - Text content */}
        <div className="md:w-1/2 mb-10 md:mb-0 z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-linear-to-r from-primary/10 to-pink-100 rounded-full mb-2">
            <Heart className="w-4 h-4 text-primary animate-pulse" />
            <span className="font-semibold text-sm text-primary">
              Bientôt disponible
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Trouvez l&apos;amour avec{" "}
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent">
                TIA
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M1 10C50 5 150 5 199 10"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="text-primary/50"
                />
              </svg>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-lg">
            La nouvelle génération de rencontres basée sur l&apos;IA. Rencontrez
            des personnes qui vous correspondent{" "}
            <span className="font-semibold text-primary">vraiment</span>.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 mb-8"
            role="group"
            aria-label="Actions principales"
          >
            {/* Store badges */}
            <div className="mt-4 flex  flex-col flex-wrap gap-4">
              <div className="flex flex-wrap gap-4">
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
                    Application en cours d&apos;approbation sur le Google Play
                    Store
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
              <div
                className="flex items-center bg-white/70 backdrop-blur-sm p-3 rounded-lg shadow-sm w-fit"
                role="complementary"
                aria-label="Intérêt de la communauté"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-sm font-medium text-gray-700">
                      2k+
                    </span>
                  </div>
                  <div className="flex items-center">
                    <HeartIcon className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-sm font-medium text-gray-700">
                      Intéressés
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-amber-500 mr-1" />
                    <span className="text-sm font-medium text-gray-700">
                      Bientôt
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Mobile mockup */}
        <div className="md:w-1/2 flex justify-center relative z-10">
          <div className="relative group">
            <div className="hover:scale-105 transition-transform duration-500">
              <MobileFrame>
                <Image
                  src="/images/screen/6.jpg"
                  alt="TIA App"
                  width={300}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </MobileFrame>
            </div>

            {/* Enhanced floating decorative elements */}
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-linear-to-br from-pink-300/40 to-rose-400/40 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-linear-to-tr from-primary/40 to-purple-400/40 rounded-full blur-2xl animate-pulse delay-75"></div>
            <div className="absolute top-1/2 -left-20 w-32 h-32 bg-linear-to-r from-purple-300/30 to-pink-300/30 rounded-full blur-xl animate-pulse delay-100 hidden lg:block"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
