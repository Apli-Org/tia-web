import MobileFrame from "@/components/mobile-frame";
import Image from "next/image";

export function AppPreview() {
  const screens = [
    {
      title: "Découverte",
      image: "/images/screen/2.jpg",
      description: "Parcourez des profils compatibles",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Likes/Matchs",
      image: "/images/screen/3.jpg",
      description: "Donnez des likes facilement",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Messages",
      image: "/images/screen/1.jpg",
      description: "Discutez en toute simplicité",
      color: "from-blue-500 to-purple-500",
    },
  ];

  return (
    <section className="py-32 bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-linear-to-r from-primary/10 to-pink-100 text-primary rounded-full mb-4 font-semibold text-sm">
            Interface
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Aperçu de l&apos;application
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Une expérience utilisateur pensée pour vous
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl">
            {screens.map((screen, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="relative w-full max-w-[280px] transition-transform duration-500 group-hover:scale-105">
                  <MobileFrame>
                    <Image
                      src={screen.image}
                      alt={screen.title}
                      width={300}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </MobileFrame>
                  {/* Glow effect on hover */}
                  <div
                    className={`absolute -inset-4 bg-linear-to-r ${screen.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10 rounded-full`}
                  ></div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {screen.title}
                  </h3>
                  <p className="text-gray-600">{screen.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
