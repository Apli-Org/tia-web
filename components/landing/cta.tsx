"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { HeartIcon, Users } from "lucide-react";
import Image from "next/image";
import type { CTAContent } from "@/lib/types/landing.types";

// Default content
const defaultContent = {
  badgeText: "Rejoignez-nous",
  headline: "Prêt à trouver",
  headlineHighlight: "l'amour ?",
  subheadline: "Téléchargez Tia dès maintenant et commencez votre aventure",
  googlePlayBadge: "/images/logo/google-play-badge.webp",
  appStoreBadge: "/images/logo/app-store-badge.webp",
  googlePlayTooltip: "Télécharger sur Google Play",
  googlePlayHref: "https://play.google.com/store/apps/details?id=com.rdh36.tiaapp",
  appStoreTooltip: "Télécharger sur l'App Store",
  appStoreHref: "https://apps.apple.com/mg/app/tia/id6758033706",
  stats: {
    users: "10k+",
    usersLabel: "Utilisateurs actifs",
    status: "Disponible",
  },
};

interface CTAProps {
  content?: CTAContent | null;
}

export function CTA({ content }: CTAProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const badgeText = content?.badgeText || defaultContent.badgeText;
  const headline = content?.headline || defaultContent.headline;
  const headlineHighlight = content?.headlineHighlight || defaultContent.headlineHighlight;
  const subheadline = content?.subheadline || defaultContent.subheadline;
  const googlePlayBadge = content?.googlePlayBadge || defaultContent.googlePlayBadge;
  const appStoreBadge = content?.appStoreBadge || defaultContent.appStoreBadge;
  const googlePlayTooltip = content?.googlePlayTooltip || defaultContent.googlePlayTooltip;
  const appStoreTooltip = content?.appStoreTooltip || defaultContent.appStoreTooltip;
  const googlePlayHref = content?.googlePlayHref || defaultContent.googlePlayHref || '';
  const appStoreHref = content?.appStoreHref || defaultContent.appStoreHref || '';
  const stats = content?.stats || defaultContent.stats;

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden"
    >
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-5xl px-4 text-center relative z-10">
        <div className="space-y-10">
          <div
            className={`inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-sm font-semibold">{badgeText}</span>
          </div>

          <h2
            className={`text-5xl md:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {headline} <br />
            <span className="bg-linear-to-r from-primary to-pink-400 bg-clip-text text-transparent">
              {headlineHighlight}
            </span>
          </h2>

          <p
            className={`text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {subheadline}
          </p>

          <div
            className={`flex flex-row gap-4 sm:gap-6 justify-center pt-4 transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {googlePlayHref ? (
              <a href={googlePlayHref} target="_blank" rel="noopener noreferrer" className="relative group transform hover:scale-105 transition-transform duration-300">
                <Image
                  src={googlePlayBadge}
                  alt="Télécharger sur Google Play"
                  width={836}
                  height={250}
                  className="h-[42px] sm:h-[50px] w-auto transition-all duration-300"
                />
              </a>
            ) : (
              <div className="relative group cursor-pointer transform hover:scale-105 transition-transform duration-300">
                <Image
                  src={googlePlayBadge}
                  alt="Bientôt sur Google Play"
                  width={836}
                  height={250}
                  className="h-[42px] sm:h-[50px] w-auto grayscale opacity-70 transition-all duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                  <span className="text-white text-sm font-medium">
                    Bientôt disponible
                  </span>
                </div>
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-12 left-1/2 -translate-x-1/2 w-52 p-2 bg-gray-900 text-white text-xs rounded-lg text-center shadow-lg">
                  {googlePlayTooltip}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>
            )}
            {appStoreHref ? (
              <a href={appStoreHref} target="_blank" rel="noopener noreferrer" className="relative group transform hover:scale-105 transition-transform duration-300">
                <Image
                  src={appStoreBadge}
                  alt="Télécharger sur App Store"
                  width={791}
                  height={250}
                  className="h-[42px] sm:h-[50px] w-auto transition-all duration-300"
                />
              </a>
            ) : (
              <div className="relative group cursor-pointer transform hover:scale-105 transition-transform duration-300">
                <Image
                  src={appStoreBadge}
                  alt="Bientôt sur App Store"
                  width={791}
                  height={250}
                  className="h-[42px] sm:h-[50px] w-auto grayscale opacity-70 transition-all duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                  <span className="text-white text-sm font-medium">
                    Bientôt disponible
                  </span>
                </div>
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-12 left-1/2 -translate-x-1/2 w-52 p-2 bg-gray-900 text-white text-xs rounded-lg text-center shadow-lg">
                  {appStoreTooltip}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>
            )}
          </div>

          <div
            className={`flex items-center justify-center gap-8 pt-8 text-sm text-gray-400 transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm font-medium text-white">{stats.users}</span>
              </div>
              <div className="flex items-center">
                <HeartIcon className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm font-medium text-white">
                  {stats.usersLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
