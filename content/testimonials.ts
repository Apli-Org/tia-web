// Uniquement de vrais utilisateurs ayant donné leur accord écrit. Jamais de photo générée associée à un témoignage.

import type { Locale } from './i18n'

export type Testimonial = {
  author: string
  rating: number
  source: string
  publishedAt: string
  originalLocale: Locale
  quote: Record<Locale, string>
}

export const TESTIMONIALS: Testimonial[] = [
  {
    author: 'Aina R.',
    rating: 5,
    source: 'Google Play',
    publishedAt: '2026-03-01',
    originalLocale: 'fr',
    quote: {
      fr: 'Une application simple à utiliser, rapide et efficace pour des rencontres.',
      en: 'An app that’s easy to use, fast and effective for meeting people.',
    },
  },
  {
    author: 'Hansia B.',
    rating: 5,
    source: 'Google Play',
    publishedAt: '2026-03-01',
    originalLocale: 'fr',
    quote: {
      fr: 'Honnêtement, Tia dépasse toutes les autres applis que j’ai testées, c’est de loin la meilleure',
      en: 'Honestly, Tia beats every other app I’ve tried, it’s by far the best',
    },
  },
  {
    author: 'Johanna R.',
    rating: 5,
    source: 'Google Play',
    publishedAt: '2026-03-01',
    originalLocale: 'fr',
    quote: {
      fr: "Certes c'est payant, mais c'est le moins cher sur le marché, super appli en tout cas",
      en: 'Sure, it’s paid, but it’s the cheapest on the market, great app anyway',
    },
  },
]
