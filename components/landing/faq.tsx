"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function FAQ() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const faqs = [
    {
      q: "TIA est-elle vraiment gratuite ?",
      a: "Oui, la version Base est 100% gratuite. Vous pouvez upgrader pour débloquer des fonctionnalités premium comme les swipes illimités, les filtres avancés et le mode incognito.",
    },
    {
      q: "Comment fonctionne la vérification d'identité ?",
      a: "Vous pouvez uploader votre pièce d'identité pour obtenir un badge certifié, garantissant votre authenticité aux autres utilisateurs.",
    },
    {
      q: "Mes données sont-elles sécurisées ?",
      a: "Absolument. Nous utilisons un chiffrement de niveau bancaire et ne partageons jamais vos données personnelles avec des tiers.",
    },
    {
      q: "Puis-je annuler mon abonnement à tout moment ?",
      a: "Oui, sans frais ni pénalités. Vous pouvez annuler votre abonnement premium à tout moment depuis les paramètres de l'application.",
    },
    {
      q: "Sur quels appareils TIA est-elle disponible ?",
      a: "TIA sera disponible sur iOS (iPhone), Android, et bientôt le Web.",
    },
    {
      q: "Comment fonctionne l'IA de TIA ?",
      a: "Notre IA analyse vos préférences, comportements et profils likés pour suggérer des matchs pertinents et générer des messages d'ouverture uniques.",
    },
  ];

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gray-50 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-200/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-4xl px-4 relative z-10">
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 font-semibold text-sm">
            FAQ
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Questions fréquentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tout ce que vous devez savoir sur TIA
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={`bg-white border-2 border-gray-200 rounded-2xl px-8 py-2 hover:border-primary/30 transition-all duration-500 hover:shadow-lg ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100 + 200}ms` : "0ms",
              }}
            >
              <AccordionTrigger className="text-left hover:no-underline font-semibold text-lg text-gray-900 py-6">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed pb-6">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
