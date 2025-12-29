import { Heart, MessageSquare, Sparkles } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Heart,
      title: "Swipe Immersif",
      description:
        "Une expérience de découverte fluide et addictive pour trouver votre match parfait",
      linear: "from-pink-500 to-rose-500",
    },
    {
      icon: Sparkles,
      title: "Matchs Intelligents",
      description:
        "Notre IA analyse vos préférences pour vous suggérer les profils les plus compatibles",
      linear: "from-purple-500 to-pink-500",
    },
    {
      icon: MessageSquare,
      title: "Messages IA",
      description:
        "Des suggestions de premiers messages personnalisés pour briser la glace facilement",
      linear: "from-blue-500 to-purple-500",
    },
  ];

  return (
    <section id="features" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 font-semibold text-sm">
            Fonctionnalités
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Trouvez l&apos;amour autrement
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Des outils intelligents pour des rencontres authentiques
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary/30 hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-linear-to-br ${feature.linear} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover linear effect */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
