import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function Pricing() {
  const tiers = [
    {
      name: "Base",
      price: "Gratuit",
      features: [
        "20 swipes par jour",
        "Découverte de profils",
        "Matchs de base",
        "Messagerie standard",
      ],
      linear: "from-gray-400 to-gray-500",
    },
    {
      name: "Silver",
      price: "4,99€",
      period: "/mois",
      features: [
        "Swipes illimités",
        "Filtres avancés",
        "Voir qui vous like (1x/mois)",
        "5 Super Likes/jour",
      ],
      linear: "from-gray-300 to-gray-400",
    },
    {
      name: "Gold",
      price: "9,99€",
      period: "/mois",
      features: [
        "Tout Silver inclus",
        "Voir qui vous like (illimité)",
        "Accusés de lecture",
        "Mode prioritaire",
        "Rewind illimité",
      ],
      popular: true,
      linear: "from-amber-400 to-yellow-500",
    },
    {
      name: "Elite",
      price: "19,99€",
      period: "/mois",
      features: [
        "Tout Gold inclus",
        "Filtres ultra-précis",
        "Mode incognito",
        "Priorité maximale",
        "Messages avant match",
      ],
      linear: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section
      id="pricing"
      className="py-32 bg-linear-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 font-semibold text-sm">
            Tarifs
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Choisissez votre formule
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Des options adaptées à vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                tier.popular
                  ? "border-primary scale-105 hover:scale-110"
                  : "border-gray-200 hover:border-primary/30 hover:-translate-y-2"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-6 py-2 bg-linear-to-r from-primary to-pink-500 text-white rounded-full font-bold text-sm shadow-lg">
                    ⭐ Populaire
                  </span>
                </div>
              )}

              <div
                className={`inline-block px-4 py-2 bg-linear-to-r ${tier.linear} text-white rounded-full font-bold text-sm mb-6`}
              >
                {tier.name}
              </div>

              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-gray-500 text-lg ml-1">
                    {tier.period}
                  </span>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-6 rounded-xl font-semibold text-base ${
                  tier.popular
                    ? "bg-linear-to-r from-primary to-pink-500 hover:shadow-xl"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
              >
                Choisir {tier.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
