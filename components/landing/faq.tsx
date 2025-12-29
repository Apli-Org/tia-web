import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      q: "Comment fonctionne le système de matchs ?",
      a: "Swipez à droite sur les profils qui vous plaisent, à gauche sur ceux qui ne vous intéressent pas. Si deux personnes swipent à droite mutuellement, c'est un match ! Vous pouvez alors commencer à discuter.",
    },
    {
      q: "Qu'est-ce que le Super Like ?",
      a: "Le Super Like permet de montrer à quelqu'un qu'il/elle vous plaît vraiment avant même d'avoir un match. La personne sera notifiée et pourra voir que vous l'avez Super Liké.",
    },
    {
      q: "Comment fonctionne la vérification d'identité ?",
      a: "Pour obtenir le badge vérifié, il suffit de prendre un selfie qui sera comparé aux photos de votre profil. Cela garantit votre authenticité et inspire confiance aux autres utilisateurs.",
    },
    {
      q: "Mes données sont-elles sécurisées ?",
      a: "Absolument. Nous utilisons un chiffrement de niveau bancaire, des serveurs sécurisés et ne partageons jamais vos données personnelles avec des tiers.",
    },
  ];

  return (
    <section id="faq" className="py-32 bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-20">
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
              className="bg-white border-2 border-gray-200 rounded-2xl px-8 py-2 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
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
