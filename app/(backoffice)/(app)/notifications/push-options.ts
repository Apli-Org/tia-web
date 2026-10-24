export type Option = { value: string; label: string }

export const TERRITORIES: Option[] = [
  { value: 'MG', label: 'Madagascar' },
  { value: 'RE', label: 'La Réunion' },
  { value: 'MU', label: 'Maurice' },
  { value: 'YT', label: 'Mayotte' },
  { value: 'KM', label: 'Comores' },
]

export const TIERS: Option[] = [
  { value: 'base', label: 'Gratuit' },
  { value: 'silver', label: 'Silver' },
  { value: 'gold', label: 'Gold' },
  { value: 'elite', label: 'Elite' },
]

export const GENDERS: Option[] = [
  { value: 'femme', label: 'Femmes' },
  { value: 'homme', label: 'Hommes' },
]

export const LANGUAGES: Option[] = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'Anglais' },
]

export const DESTINATIONS: Option[] = [
  { value: 'none', label: "Ouvrir l'app" },
  { value: 'tiaapp://discover', label: 'Discover' },
  { value: 'tiaapp://matches', label: 'Matchs' },
  { value: 'tiaapp://messages', label: 'Messages' },
  { value: 'tiaapp://payment', label: 'Abonnements' },
  { value: 'tiaapp://profile', label: 'Profil' },
]

export const TITLE_SOFT_LIMIT = 40
export const BODY_SOFT_LIMIT = 120

export function labelFor(options: Option[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? value
}
