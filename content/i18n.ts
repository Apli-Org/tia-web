import type { FlagCode } from './countries'

export const LOCALES = ['fr', 'en'] as const

export type Locale = (typeof LOCALES)[number]

export const LOCALE_PATHS: Record<Locale, string> = {
  fr: '/',
  en: '/en',
}

export const OPEN_GRAPH_LOCALES: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
}

export const LANGUAGE_FLAGS: Record<Locale, FlagCode> = {
  fr: 'mg',
  en: 'za',
}
