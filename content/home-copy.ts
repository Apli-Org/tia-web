import type { CountryStatus } from './countries'
import { EN } from './copy/en'
import { FR } from './copy/fr'
import type { Locale } from './i18n'
import type { PlanId, SafetyItemId, TileId } from './site'

type Link = {
  label: string
  href: string
}

type TextBlock = {
  title: string
  description: string
}

type StoreCopy = {
  caption: string
  name: string
  label: string
}

export type HomeCopy = {
  metadata: {
    title: string
    description: string
    openGraphTitle: string
    openGraphDescription: string
  }
  language: {
    label: string
    names: Record<Locale, string>
  }
  stores: {
    appStore: StoreCopy
    googlePlay: StoreCopy
  }
  nav: {
    label: string
    homeLabel: string
    links: Link[]
    download: Link
  }
  hero: {
    countriesLabel: string
    title: string
    highlight: string
    subtitle: string
    note: string
    scrollLabel: string
    disclaimer: string
  }
  whyTia: {
    eyebrow: string
    title: string
    tiles: Record<TileId, TextBlock & { kicker: string }>
    likeStamp: string
    coachChat: {
      question: string
      coachName: string
      answer: string
    }
    interests: string[][]
    payments: { region: string; methods: string[] }[]
  }
  steps: {
    eyebrow: string
    title: string
    items: TextBlock[]
  }
  safety: {
    eyebrow: string
    title: string
    items: Record<SafetyItemId, TextBlock>
  }
  offers: {
    eyebrow: string
    title: string
    plans: Record<PlanId, { name: string; features: string[] }>
    note: string
  }
  countries: {
    eyebrow: string
    title: string
    statusLabels: Record<CountryStatus, string>
  }
  testimonials: {
    eyebrow: string
    title: string
    translatedNote: string
  }
  faq: {
    eyebrow: string
    title: string
    leadBefore: string
    leadAfter: string
    items: { question: string; answer: string }[]
  }
  finalCta: {
    title: string
    highlight: string
    subtitle: string
  }
  ticker: string[]
  footer: {
    columns: { title: string; links: Link[] }[]
    socialTitle: string
    instagramLabel: string
    appTitle: string
    seo: string
    bottomLinks: Link[]
    copyright: string
    legalLinks: Link[]
    locales: string
  }
}

export const HOME_COPY: Record<Locale, HomeCopy> = {
  fr: FR,
  en: EN,
}
