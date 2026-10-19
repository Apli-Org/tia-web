import { getPublishedLandingContent } from "@/actions/landing-public.action";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Newsletter } from "@/components/landing/newsletter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter - Tia | Rejoignez la communauté",
  description:
    "Inscrivez-vous à la newsletter Tia pour recevoir les dernières actualités et offres exclusives.",
};

export default async function InscriptionPage() {
  const content = await getPublishedLandingContent();

  return (
    <div className="min-h-screen bg-white">
      <Header content={content.header} />
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Newsletter content={content.newsletter} />
      </main>
      <Footer content={content.footer} />
    </div>
  );
}
