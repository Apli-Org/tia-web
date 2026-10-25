import type { Locale } from './i18n'

export type CountryStatus = 'available' | 'soon'

export type FlagCode = 'mg' | 're' | 'mu' | 'za'

type Country = {
  flag: FlagCode
  status: CountryStatus
  name: Record<Locale, string>
  chipLabel: Record<Locale, string>
  description: Record<Locale, string>
}

export const COUNTRIES: Country[] = [
  {
    flag: 'mg',
    status: 'available',
    name: { fr: 'Madagascar', en: 'Madagascar' },
    chipLabel: { fr: 'Madagascar', en: 'Madagascar' },
    description: { fr: 'Antananarivo et toute l’île', en: 'Antananarivo and the whole island' },
  },
  {
    flag: 're',
    status: 'available',
    name: { fr: 'La Réunion', en: 'Réunion' },
    chipLabel: { fr: 'La Réunion', en: 'Réunion' },
    description: { fr: 'Depuis octobre 2026', en: 'Since October 2026' },
  },
  {
    flag: 'mu',
    status: 'soon',
    name: { fr: 'Maurice', en: 'Mauritius' },
    chipLabel: { fr: 'Maurice', en: 'Mauritius' },
    description: { fr: 'On arrive', en: 'On our way' },
  },
  {
    flag: 'za',
    status: 'soon',
    name: { fr: 'Afrique du Sud', en: 'South Africa' },
    chipLabel: { fr: 'South Africa', en: 'South Africa' },
    description: { fr: 'On arrive', en: 'On our way' },
  },
]
