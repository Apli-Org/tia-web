"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Heart, MessageSquare, Shield, Sparkles } from "lucide-react";

export function Features() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const features = [
    {
      icon: Heart,
      title: "Swipe Immersif",
      description:
        "Une expérience de découverte inspirée de TikTok, fluide et addictive",
      linear: "from-pink-500 to-rose-500",
    },
    {
      icon: Sparkles,
      title: "Matchs Intelligents",
      description:
        "Notre IA analyse vos préférences pour des suggestions toujours plus pertinentes",
      linear: "from-purple-500 to-pink-500",
    },
    {
      icon: MessageSquare,
      title: "Messages IA",
      description:
        "L'IA vous suggère des messages d'ouverture uniques basés sur les profils",
      linear: "from-blue-500 to-purple-500",
    },
    {
      icon: Shield,
      title: "Sécurité Garantie",
      description:
        "Vérification d'identité et modération pour une expérience sûre",
      linear: "from-green-500 to-emerald-500",
    },
  ];

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
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-6 md:p-8 border border-gray-100 ${
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
              {/* Card with smooth hover */}
              <div className="relative z-10 h-full transition-transform duration-300 ease-out group-hover:-translate-y-1">
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-linear-to-br ${feature.linear} flex items-center justify-center mb-5 md:mb-6 shadow-lg transition-transform duration-300 ease-out group-hover:scale-110`}
                >
                  <feature.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </div>

              {/* Background effects */}
              <div className="absolute inset-0 rounded-2xl shadow-lg transition-shadow duration-300 ease-out group-hover:shadow-2xl pointer-events-none"></div>
              <div className="absolute inset-0 rounded-2xl border border-transparent transition-colors duration-300 ease-out group-hover:border-primary/30 pointer-events-none"></div>
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
