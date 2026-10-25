export type CountryStatus = 'available' | 'soon'

export type FlagCode = 'mg' | 're' | 'mu' | 'za'

export type Country = {
  flag: FlagCode
  name: string
  chipLabel: string
  status: CountryStatus
  description: string
}

export const COUNTRY_STATUS_LABELS: Record<CountryStatus, string> = {
  available: 'Disponible',
  soon: 'Bientôt',
}

export const COUNTRIES: Country[] = [
  {
    flag: 'mg',
    name: 'Madagascar',
    chipLabel: 'Madagascar',
    status: 'available',
    description: 'Antananarivo et toute l’île',
  },
  {
    flag: 're',
    name: 'La Réunion',
    chipLabel: 'La Réunion',
    status: 'available',
    description: 'Depuis octobre 2026',
  },
  {
    flag: 'mu',
    name: 'Maurice',
    chipLabel: 'Maurice',
    status: 'soon',
    description: 'On arrive',
  },
  {
    flag: 'za',
    name: 'Afrique du Sud',
    chipLabel: 'South Africa',
    status: 'soon',
    description: 'On arrive',
  },
]
