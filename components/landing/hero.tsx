"use client";

import MobileFrame from "@/components/mobile-frame";
import { Clock, Heart, HeartIcon, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroContent } from "@/lib/types/landing.types";

// Default content
const defaultContent = {
  badge: "La révolution des rencontres",
  headline: "Swipez vers",
  headlineHighlight: "votre avenir à deux",
  subheadline: "TIA révolutionne les rencontres avec une expérience",
  subheadlineKeywords: ["immersive", "sécurisée", "intelligente"],
  phoneImage: "/images/screen/8.jpg",
  floatingBadges: [
    { text: "Match!", icon: "heart", position: "top-right" },
    { text: "IA Active", icon: "sparkles", position: "left" },
    { text: "Super Like", icon: "emoji", position: "right" },
  ],
  socialProof: [
    { value: "2k+", label: "Intéressés", icon: "users" },
    { value: "IA", label: "Powered", icon: "heart" },
    { value: "2026", label: "Lancement", icon: "clock" },
  ],
  appStoreBadges: {
    googlePlay: {
      image: "/images/logo/google-play-badge.png",
      tooltip: "Application en cours d'approbation sur le Google Play Store",
    },
    appStore: {
      image: "/images/logo/app-store-badge.png",
      tooltip: "Application en cours de développement pour iOS",
    },
  },
  scrollIndicatorText: "Découvrir",
};

interface HeroProps {
  content?: HeroContent | null;
}

export function Hero({ content }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const badge = content?.badge || defaultContent.badge;
  const headline = content?.headline || defaultContent.headline;
  const headlineHighlight = content?.headlineHighlight || defaultContent.headlineHighlight;
  const subheadline = content?.subheadline || defaultContent.subheadline;
  const subheadlineKeywords = (content?.subheadlineKeywords?.length ? content.subheadlineKeywords : null) || defaultContent.subheadlineKeywords;
  const phoneImage = content?.phoneImage || defaultContent.phoneImage;
  const floatingBadges = (content?.floatingBadges?.length ? content.floatingBadges : null) || defaultContent.floatingBadges;
  const socialProof = (content?.socialProof?.length ? content.socialProof : null) || defaultContent.socialProof;
  const scrollIndicatorText = content?.scrollIndicatorText || defaultContent.scrollIndicatorText;

  // Handle appStoreBadges with proper fallback for empty images
  const googlePlayImage = content?.appStoreBadges?.googlePlay?.image || defaultContent.appStoreBadges.googlePlay.image;
  const googlePlayTooltip = content?.appStoreBadges?.googlePlay?.tooltip || defaultContent.appStoreBadges.googlePlay.tooltip;
  const appStoreImage = content?.appStoreBadges?.appStore?.image || defaultContent.appStoreBadges.appStore.image;
  const appStoreTooltip = content?.appStoreBadges?.appStore?.tooltip || defaultContent.appStoreBadges.appStore.tooltip;
  const googlePlayHref = content?.appStoreBadges?.googlePlay?.href || '';
  const appStoreHref = content?.appStoreBadges?.appStore?.href || '';

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

      <div className="container mx-auto max-w-7xl px-4 flex flex-col lg:flex-row items-center py-12 sm:py-16 md:py-20 gap-8 sm:gap-12 lg:gap-16">
        {/* Left side - Text content */}
        <div className="lg:w-1/2 mb-8 sm:mb-10 lg:mb-0 z-10 space-y-6 sm:space-y-8 text-center lg:text-left">
          {/* Badge */}
          <div className="flex justify-center lg:justify-start">
            <div
              className={`inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-primary/15 to-pink-100 rounded-full transition-all duration-1000 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="font-semibold text-sm text-primary">
                {badge}
              </span>
            </div>
          </div>

          {/* Main headline */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight sm:leading-[1.1] transition-all duration-1000 delay-100 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {headline}{" "}
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
                {headlineHighlight}
              </span>
              <svg
                className="absolute -bottom-1 sm:-bottom-2 left-0 w-full"
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
            className={`text-base sm:text-sm md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 transition-all duration-1000 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {subheadline}{" "}
            {subheadlineKeywords.map((keyword, index) => (
              <span key={`keyword-${index}`}>
                <span className={index === subheadlineKeywords.length - 1 ? "font-semibold text-primary" : "font-semibold text-gray-800"}>
                  {keyword}
                </span>
                {index < subheadlineKeywords.length - 2 && ", "}
                {index === subheadlineKeywords.length - 2 && " et "}
                {index === subheadlineKeywords.length - 1 && "."}
              </span>
            ))}
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-300 justify-center lg:justify-start ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            role="group"
            aria-label="Actions principales"
          >
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {googlePlayImage && (
                googlePlayHref ? (
                  <a href={googlePlayHref} target="_blank" rel="noopener noreferrer" className="relative group transform hover:scale-105 transition-transform duration-300">
                    <Image
                      src={googlePlayImage}
                      alt="Télécharger sur Google Play"
                      width={160}
                      height={60}
                      className="h-12 sm:h-14 object-contain transition-all duration-300"
                    />
                  </a>
                ) : (
                  <div className="relative group cursor-pointer transform hover:scale-105 transition-transform duration-300">
                    <Image
                      src={googlePlayImage}
                      alt="Bientôt sur Google Play"
                      width={160}
                      height={60}
                      className="h-12 sm:h-14 object-contain grayscale opacity-70 transition-all duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                      <span className="text-white text-xs sm:text-sm font-medium">
                        Bientôt disponible
                      </span>
                    </div>
                    <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-12 left-1/2 -translate-x-1/2 w-52 p-2 bg-gray-900 text-white text-xs rounded-lg text-center shadow-lg">
                      {googlePlayTooltip}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </div>
                )
              )}
              {appStoreImage && (
                appStoreHref ? (
                  <a href={appStoreHref} target="_blank" rel="noopener noreferrer" className="relative group transform hover:scale-105 transition-transform duration-300">
                    <Image
                      src={appStoreImage}
                      alt="Télécharger sur App Store"
                      width={160}
                      height={60}
                      className="h-12 sm:h-14 object-contain transition-all duration-300"
                    />
                  </a>
                ) : (
                  <div className="relative group cursor-pointer transform hover:scale-105 transition-transform duration-300">
                    <Image
                      src={appStoreImage}
                      alt="Bientôt sur App Store"
                      width={160}
                      height={60}
                      className="h-12 sm:h-14 object-contain grayscale opacity-70 transition-all duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                      <span className="text-white text-xs sm:text-sm font-medium">
                        Bientôt disponible
                      </span>
                    </div>
                    <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-12 left-1/2 -translate-x-1/2 w-52 p-2 bg-gray-900 text-white text-xs rounded-lg text-center shadow-lg">
                      {appStoreTooltip}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Social proof */}
          <div
            className={`transition-all duration-1000 delay-500 flex justify-center lg:justify-start ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div
              className="inline-flex items-center bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-2xl shadow-lg border border-gray-100"
              role="complementary"
              aria-label="Intérêt de la communauté"
            >
              <div className="flex items-center gap-3 sm:gap-6">
                {socialProof.map((item, index) => (
                  <div key={`social-${index}`} className="flex items-center gap-1.5 sm:gap-2">
                    {index > 0 && <div className="w-px h-8 bg-gray-200 mr-3 sm:mr-6"></div>}
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                      item.icon === 'users' ? 'bg-blue-100' :
                      item.icon === 'heart' ? 'bg-red-100' : 'bg-amber-100'
                    }`}>
                      {item.icon === 'users' && <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />}
                      {item.icon === 'heart' && <HeartIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500" />}
                      {item.icon === 'clock' && <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" />}
                    </div>
                    <div>
                      <span className="text-base sm:text-lg font-bold text-gray-900">
                        {item.value}
                      </span>
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
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
                  src={phoneImage}
                  alt="TIA App - Interface de découverte"
                  width={300}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </MobileFrame>

              {/* Floating badges around phone */}
              {floatingBadges[0] && (
                <div className="absolute -top-4 -right-4 z-80 bg-white rounded-2xl p-3 shadow-xl animate-float border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary fill-primary" />
                    <span className="text-sm font-bold text-gray-800">
                      {floatingBadges[0].text}
                    </span>
                  </div>
                </div>
              )}

              {floatingBadges[1] && (
                <div
                  className="absolute top-1/4 -left-8 z-80 bg-white rounded-2xl p-3 shadow-xl animate-float border border-gray-100"
                  style={{ animationDelay: "-1.5s" }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-bold text-gray-800">
                      {floatingBadges[1].text}
                    </span>
                  </div>
                </div>
              )}

              {floatingBadges[2] && (
                <div
                  className="absolute bottom-1/4 -right-6 z-80 bg-linear-to-r from-primary to-pink-500 rounded-2xl p-3 shadow-xl animate-float"
                  style={{ animationDelay: "-3s" }}
                >
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-lg">💕</span>
                    <span className="text-sm font-bold">{floatingBadges[2].text}</span>
                  </div>
                </div>
              )}
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
        <span className="text-sm text-gray-400">{scrollIndicatorText}</span>
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
