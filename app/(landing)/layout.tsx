import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://tia.app"),
  title: "TIA - Rencontres Intelligentes avec l'IA | App de Dating",
  description:
    "TIA révolutionne les rencontres avec l'IA. Swipes immersifs, matchs intelligents, messages suggérés. Téléchargez gratuitement sur iOS et Android.",
  keywords: [
    "rencontre",
    "dating",
    "IA",
    "intelligence artificielle",
    "match",
    "amour",
    "application rencontre",
    "TIA",
  ],
  authors: [{ name: "TIA" }],
  creator: "TIA",
  publisher: "TIA",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://tia.app",
    siteName: "TIA",
    title: "TIA - Rencontres Intelligentes",
    description:
      "Trouvez l'amour avec TIA, l'app de rencontre nouvelle génération",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TIA - Rencontres Intelligentes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TIA - Rencontres Intelligentes avec l'IA",
    description:
      "TIA révolutionne les rencontres avec l'IA. Swipes immersifs, matchs intelligents, messages suggérés.",
    images: ["/og-image.png"],
    creator: "@tia_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
