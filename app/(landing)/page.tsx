import type { Metadata, Viewport } from 'next'
import { Countries } from '@/components/home/countries'
import { Faq } from '@/components/home/faq'
import { FinalCta } from '@/components/home/final-cta'
import { borel, raleway } from '@/components/home/fonts'
import { Footer } from '@/components/home/footer'
import { Hero } from '@/components/home/hero'
import { Navbar } from '@/components/home/navbar'
import { Offers } from '@/components/home/offers'
import { Safety } from '@/components/home/safety'
import { Steps } from '@/components/home/steps'
import { Testimonials } from '@/components/home/testimonials'
import { Ticker } from '@/components/home/ticker'
import { WhyTia } from '@/components/home/why-tia'
import { SITE_METADATA } from '@/content/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  openGraph: {
    title: SITE_METADATA.openGraphTitle,
    description: SITE_METADATA.openGraphDescription,
    locale: 'fr_FR',
    type: 'website',
    url: SITE_METADATA.url,
  },
  twitter: {
    card: 'summary',
    title: SITE_METADATA.openGraphTitle,
    description: SITE_METADATA.openGraphDescription,
  },
  icons: {
    icon: { url: SITE_METADATA.favicon, type: 'image/png' },
    apple: SITE_METADATA.appleTouchIcon,
  },
}

export const viewport: Viewport = {
  themeColor: SITE_METADATA.themeColor,
}

export default function HomePage() {
  return (
    <div
      id="top"
      className={cn(
        raleway.variable,
        borel.variable,
        'bg-tia-plum-50 font-tia text-tia-plum-800 antialiased lining-nums motion-reduce:**:animate-none',
      )}
    >
      <Navbar />
      <div className="relative overflow-hidden @container">
        <main>
          <Hero />
          <WhyTia />
          <Steps />
          <Safety />
          <Offers />
          <Countries />
          <Testimonials />
          <Faq />
          <FinalCta />
        </main>
        <Ticker />
        <Footer />
      </div>
    </div>
  )
}
