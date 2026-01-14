"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import type { FeaturesContent } from "@/lib/types/landing.types";

// Default content (fallback if CMS content not available)
const defaultFeatures = [
  {
    number: "01",
    title: "Swipe Immersif",
    description:
      "Une expérience de découverte inspirée de TikTok, fluide et addictive",
    icon: "sparkles" as const,
  },
  {
    number: "02",
    title: "Matchs Intelligents",
    description:
      "Notre IA analyse vos préférences pour des suggestions toujours plus pertinentes",
    icon: "brain" as const,
  },
  {
    number: "03",
    title: "Sécurité Garantie",
    description:
      "Vérification d'identité et modération pour une expérience sûre",
    icon: "shield" as const,
  },
];

interface FeaturesProps {
  content?: FeaturesContent | null;
}

export function Features({ content }: FeaturesProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const features = content?.features || defaultFeatures;

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 font-semibold text-sm">
            Fonctionnalités
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Pourquoi TIA change tout
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Des outils intelligents pour des rencontres authentiques
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-linear-to-br from-white to-gray-50/50 rounded-3xl border border-gray-200/80 backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/30 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "700ms",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDelay: isVisible ? `${index * 100 + 200}ms` : "0ms",
              }}
            >
              <div className="relative p-10 md:p-12">
                <div className="absolute top-10 right-10 text-7xl font-bold text-gray-100 group-hover:text-primary/10 transition-colors duration-500">
                  {index + 1}
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-5 text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
