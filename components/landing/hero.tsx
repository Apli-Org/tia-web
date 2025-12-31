"use client";

import MobileFrame from "@/components/mobile-frame";
import { Clock, Heart, HeartIcon, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      aria-label="Section principale"
    >
      {/* Enhanced animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-pink-50 via-white to-purple-50 -z-10"></div>

      {/* Animated gradient orbs */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-linear-to-br from-primary/30 to-pink-300/30 rounded-full blur-3xl animate-gradient"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-linear-to-tr from-purple-200/40 to-primary/30 rounded-full blur-3xl animate-gradient"
        style={{ animationDelay: "-2s" }}
        aria-hidden="true"
      ></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 right-1/4 w-3 h-3 bg-primary/60 rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/5 w-2 h-2 bg-pink-400/60 rounded-full animate-float"
          style={{ animationDelay: "-1s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-purple-400/50 rounded-full animate-float"
          style={{ animationDelay: "-2s" }}
        ></div>
        <div
          className="absolute top-2/3 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-float"
          style={{ animationDelay: "-3s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/5 w-3 h-3 bg-pink-300/50 rounded-full animate-float"
          style={{ animationDelay: "-4s" }}
        ></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 flex flex-col lg:flex-row items-center py-20 gap-12 lg:gap-16">
        {/* Left side - Text content */}
        <div className="lg:w-1/2 mb-10 lg:mb-0 z-10 space-y-8">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-primary/15 to-pink-100 rounded-full transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="font-semibold text-sm text-primary">
              La révolution des rencontres
            </span>
          </div>

          {/* Main headline */}
          <h1
            className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] transition-all duration-1000 delay-100 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Rencontrez l&apos;âme sœur{" "}
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
                grâce à l&apos;IA
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M1 10C50 5 150 5 199 10"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0">
                    <stop offset="0%" stopColor="#E94057" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl transition-all duration-1000 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            TIA révolutionne les rencontres avec une expérience{" "}
            <span className="font-semibold text-gray-800">immersive</span>,{" "}
            <span className="font-semibold text-gray-800">sécurisée</span> et{" "}
            <span className="font-semibold text-primary">intelligente</span>.
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            role="group"
            aria-label="Actions principales"
          >
            <div className="flex flex-wrap gap-4">
              <div className="relative group cursor-pointer transform hover:scale-105 transition-transform duration-300">
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
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-12 left-1/2 -translate-x-1/2 w-52 p-2 bg-gray-900 text-white text-xs rounded-lg text-center shadow-lg">
                  Application en cours d&apos;approbation sur le Google Play
                  Store
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>
              <div className="relative group cursor-pointer transform hover:scale-105 transition-transform duration-300">
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
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-12 left-1/2 -translate-x-1/2 w-52 p-2 bg-gray-900 text-white text-xs rounded-lg text-center shadow-lg">
                  Application en cours de développement pour iOS
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div
              className="inline-flex items-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100"
              role="complementary"
              aria-label="Intérêt de la communauté"
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-gray-900">2k+</span>
                    <p className="text-xs text-gray-500">Intéressés</p>
                  </div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <HeartIcon className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-gray-900">IA</span>
                    <p className="text-xs text-gray-500">Powered</p>
                  </div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      2026
                    </span>
                    <p className="text-xs text-gray-500">Lancement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Mobile mockup */}
        <div className="lg:w-1/2 flex justify-center relative z-10">
          <div
            className={`relative group transition-all duration-1000 delay-300 ${
              isLoaded
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-95"
            }`}
          >
            {/* Glow effects */}
            <div className="absolute -inset-8 bg-linear-to-r from-primary/30 via-pink-400/30 to-purple-500/30 rounded-[4rem] blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

            {/* Phone */}
            <div className="relative z-80 hover:scale-[1.02] transition-transform duration-500 animate-float">
              <MobileFrame>
                <Image
                  src="/images/screen/6.jpg"
                  alt="TIA App - Interface de découverte"
                  width={300}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </MobileFrame>

              {/* Floating badges around phone */}
              <div className="absolute -top-4 -right-4 z-80 bg-white rounded-2xl p-3 shadow-xl animate-float border border-gray-100">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary fill-primary" />
                  <span className="text-sm font-bold text-gray-800">
                    Match!
                  </span>
                </div>
              </div>

              <div
                className="absolute top-1/4 -left-8 z-80 bg-white rounded-2xl p-3 shadow-xl animate-float border border-gray-100"
                style={{ animationDelay: "-1.5s" }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-bold text-gray-800">
                    IA Active
                  </span>
                </div>
              </div>

              <div
                className="absolute bottom-1/4 -right-6 z-80 bg-linear-to-r from-primary to-pink-500 rounded-2xl p-3 shadow-xl animate-float"
                style={{ animationDelay: "-3s" }}
              >
                <div className="flex items-center gap-2 text-white">
                  <span className="text-lg">💕</span>
                  <span className="text-sm font-bold">Super Like</span>
                </div>
              </div>
            </div>

            {/* Decorative rings (static) */}
            <div className="absolute -inset-6 border-2 border-dashed border-primary/10 rounded-[3rem] z-0"></div>
            <div className="absolute -inset-12 border border-dashed border-pink-200/30 rounded-[4rem] z-0"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="text-sm text-gray-400">Découvrir</span>
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
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
