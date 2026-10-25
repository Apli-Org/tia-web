import { HOME_COPY } from '@/content/home-copy'
import type { Locale } from '@/content/i18n'
import { cn } from '@/lib/utils'
import { Countries } from './countries'
import { Faq } from './faq'
import { FinalCta } from './final-cta'
import { borel, raleway } from './fonts'
import { Footer } from './footer'
import { Hero } from './hero'
import { Navbar } from './navbar'
import { Offers } from './offers'
import { Safety } from './safety'
import { Steps } from './steps'
import { Testimonials } from './testimonials'
import { Ticker } from './ticker'
import { WhyTia } from './why-tia'

type HomePageProps = {
  locale: Locale
}

export function HomePage({ locale }: HomePageProps) {
  const copy = HOME_COPY[locale]

  return (
    <div
      id="top"
      lang={locale}
      className={cn(
        raleway.variable,
        borel.variable,
        'bg-tia-plum-50 font-tia text-tia-plum-800 antialiased lining-nums motion-reduce:**:animate-none',
      )}
    >
      <Navbar locale={locale} copy={copy.nav} languageCopy={copy.language} />
      <div className="relative overflow-hidden @container">
        <main>
          <Hero
            locale={locale}
            copy={copy.hero}
            storesCopy={copy.stores}
            statusLabels={copy.countries.statusLabels}
          />
          <WhyTia copy={copy.whyTia} />
          <Steps copy={copy.steps} />
          <Safety copy={copy.safety} />
          <Offers copy={copy.offers} />
          <Countries locale={locale} copy={copy.countries} />
          <Testimonials locale={locale} copy={copy.testimonials} />
          <Faq copy={copy.faq} />
          <FinalCta copy={copy.finalCta} storesCopy={copy.stores} />
        </main>
        <Ticker items={copy.ticker} />
        <Footer locale={locale} copy={copy.footer} storesCopy={copy.stores} languageCopy={copy.language} />
      </div>
    </div>
  )
}
