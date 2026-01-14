import { CTA } from "@/components/landing/cta";
import { FAQ } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Newsletter } from "@/components/landing/newsletter";
import { Testimonials } from "@/components/landing/testimonials";
import { getPublishedLandingContent } from "@/actions/landing-public.action";

export default async function LandingPage() {
  const content = await getPublishedLandingContent();

  return (
    <div className="min-h-screen bg-white">
      <Header content={content.header} />
      <main>
        <Hero content={content.hero} />
        <Features content={content.features} />
        <HowItWorks content={content.how_it_works} />
        <Testimonials content={content.testimonials} />
        <Newsletter content={content.newsletter} />
        <FAQ content={content.faq} />
        <CTA content={content.cta} />
      </main>
      <Footer content={content.footer} />
    </div>
  );
}
