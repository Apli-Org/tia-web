"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Clock } from "lucide-react";
import Image from "next/image";

export function Testimonials() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const testimonials = [
    {
      name: "Sophie",
      age: 28,
      avatar: "/images/avatars/avatar-1.jpg",
      quote:
        "J'attends TIA avec impatience ! L'idée d'avoir une IA qui m'aide à briser la glace, c'est exactement ce qu'il me fallait.",
    },
    {
      name: "Marc",
      age: 32,
      avatar: "/images/avatars/avatar-2.jpg",
      quote:
        "Les apps de rencontres actuelles me lassent. TIA a l'air vraiment différent avec son approche IA. Vivement le lancement !",
    },
    {
      name: "Léa",
      age: 25,
      avatar: "/images/avatars/avatar-3.jpg",
      quote:
        "Le concept de swipe façon TikTok + IA pour les matchs ? Je suis inscrite sur la liste d'attente depuis le premier jour !",
    },
    {
      name: "Thomas",
      age: 30,
      avatar: "/images/avatars/avatar-4.jpg",
      quote:
        "Enfin une app qui promet de comprendre vraiment ce qu'on recherche. J'ai hâte de tester TIA en 2026 !",
    },
  ];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 font-semibold text-sm">
            Communauté
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Ils attendent TIA avec impatience
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Rejoignez les milliers de célibataires qui attendent le lancement
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100 + 200}ms` : "0ms",
              }}
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-linear-to-br from-primary to-pink-500 p-0.5">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {testimonial.name}, {testimonial.age} ans
                  </p>
                  <div className="flex items-center gap-1 text-primary">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs font-medium">
                      Sur liste d&apos;attente
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-gray-600 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
