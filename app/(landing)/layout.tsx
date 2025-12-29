import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TIA - Rencontrez l'âme sœur",
  description: "La nouvelle génération de rencontres basée sur l'IA",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
