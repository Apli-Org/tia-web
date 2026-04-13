"use client";

import MobileFrame from "@/components/mobile-frame";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Image from "next/image";
import type { HowItWorksContent } from "@/lib/types/landing.types";

// Default content
const defaultSteps = [
  {
    number: "01",
    title: "Créez votre profil",
    description:
      "Ajoutez vos photos, centres d'intérêt et laissez notre IA vous aider",
    image: "/images/screen/4.jpg",
  },
  {
    number: "02",
    title: "Découvrez & Swipez",
    description: "Parcourez des profils compatibles et likez en un geste",
    image: "/images/screen/9.jpg",
  },
  {
    number: "03",
    title: "Matchez & Discutez",
    description:
      "Démarrez la conversation avec des suggestions IA personnalisées",
    image: "/images/screen/10.jpg",
  },
];

interface HowItWorksProps {
  content?: HowItWorksContent | null;
}

export function HowItWorks({ content }: HowItWorksProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation({
    threshold: 0.15,
  });

  const steps = content?.steps || defaultSteps;

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-linear-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 font-semibold text-sm">
            Comment ça marche
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Trouvez l&apos;amour en 3 étapes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Simple, rapide et efficace
          </p>
        </div>

        {/* Mobile layout: badge + phone + text per step */}
        <div className="flex flex-col gap-12 md:hidden max-w-sm mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center group transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150 + 200}ms` : "0ms",
              }}
            >
              {/* Badge */}
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary to-pink-500 flex items-center justify-center shadow-lg shadow-primary/30 ring-4 ring-white mb-6">
                <span className="text-white font-bold text-lg">{step.number}</span>
              </div>

              {/* Phone */}
              <div className="relative flex justify-center w-full mb-6">
                <div className="relative transform group-hover:scale-105 transition-transform duration-500">
                  <MobileFrame>
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={280}
                      height={560}
                      className="w-full h-full object-cover"
                    />
                  </MobileFrame>
                </div>
              </div>

              {/* Text */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop layout: 3 separate rows */}
        <div className="hidden md:block max-w-6xl mx-auto">
          {/* Phone screens row */}
          <div className="grid grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center group transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 150 + 200}ms` : "0ms",
                }}
              >
                <div className="relative flex justify-center w-full">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-pink-400/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90"></div>
                  <div className="relative transform group-hover:scale-105 transition-transform duration-500">
                    <MobileFrame>
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={280}
                        height={560}
                        className="w-full h-full object-cover"
                      />
                    </MobileFrame>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Badges row with connector line */}
          <div className="relative my-10">
            <div
              className={`absolute top-1/2 -translate-y-1/2 left-[16.67%] right-[16.67%] h-[3px] z-10 transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
            >
              <div className="w-full h-full bg-gradient-to-r from-primary/30 via-pink-400/50 to-primary/30 rounded-full" />
            </div>
            <div className="grid grid-cols-3 gap-8 lg:gap-12">
              {steps.map((step, index) => (
                <div key={`badge-${index}`} className="flex justify-center">
                  <div className="relative z-20">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-pink-500 flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform duration-300 ring-4 ring-white">
                      <span className="text-white font-bold text-xl">{step.number}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text content row */}
          <div className="grid grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={`text-${index}`} className="text-center space-y-3">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
