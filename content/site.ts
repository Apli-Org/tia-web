export const SITE_URL = 'https://tia-meet.com'

export const SITE_ASSETS = {
  themeColor: '#1A0A28',
  favicon: '/images/favicon.png',
  appleTouchIcon: '/images/apple-touch-icon.png',
} as const

export const BRAND_NAME = 'Tia'

export const PHOTOS = {
  ali: '/images/ali.jpg',
  harena: '/images/harena.jpg',
  loic: '/images/loic.jpg',
  tiavina: '/images/tiavina.jpg',
  'factuel-1': '/images/factuel-1.jpg',
  'factuel-2': '/images/factuel-2.jpg',
} as const

export type PhotoId = keyof typeof PHOTOS

export const STORE_LINKS = {
  appStore: 'https://apps.apple.com/app/id6758033706',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.rdh36.tiaapp',
} as const

export const CONTACT_EMAIL = 'contact@apli.mg'
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`
export const INSTAGRAM_URL = 'https://www.instagram.com/tia.meet/'

export const SECTION_IDS = {
  whyTia: 'pourquoi',
  safety: 'securite',
  offers: 'offres',
  testimonials: 'temoignages',
  faq: 'faq',
  download: 'telecharger',
} as const

export const SCROLL_ARROW = '↓'
export const TICKER_SEPARATOR = '✦'
export const FAQ_TOGGLE_SYMBOL = '+'

export const TILE_IDS = ['swipe', 'verified', 'heart', 'nearby', 'coach', 'interests', 'payment'] as const

export type TileId = (typeof TILE_IDS)[number]

export const SAFETY_ITEM_IDS = ['verification', 'respect', 'control', 'data'] as const

export type SafetyItemId = (typeof SAFETY_ITEM_IDS)[number]

export const PLAN_IDS = ['free', 'silver', 'gold', 'elite'] as const

export type PlanId = (typeof PLAN_IDS)[number]

export const HIGHLIGHTED_PLAN: PlanId = 'gold'

type MosaicColumn = {
  duration: number
  photos: PhotoId[]
}

export const HERO_MOSAIC: MosaicColumn[] = [
  { duration: 38, photos: ['factuel-2', 'ali', 'tiavina', 'factuel-1', 'harena', 'loic'] },
  { duration: 42, photos: ['loic', 'harena', 'factuel-1', 'factuel-2', 'ali', 'tiavina'] },
  { duration: 46, photos: ['tiavina', 'factuel-1', 'factuel-2', 'loic', 'ali', 'harena'] },
  { duration: 50, photos: ['ali', 'factuel-2', 'loic', 'tiavina', 'factuel-1', 'harena'] },
  { duration: 54, photos: ['harena', 'tiavina', 'ali', 'factuel-1', 'loic', 'factuel-2'] },
]

type SwipeProfile = {
  photo: PhotoId
  name: string
  age: number
  place: string
}

export const SWIPE_PROFILES: SwipeProfile[] = [
  { photo: 'factuel-2', name: 'Fanja', age: 26, place: 'Ivandry · 3 km' },
  { photo: 'ali', name: 'Hery', age: 29, place: 'Saint-Denis · 4 km' },
  { photo: 'tiavina', name: 'Miora', age: 24, place: 'Analakely · 2 km' },
]

export const SELFIE_PHOTO: PhotoId = 'loic'

type NearbyPin = {
  photo: PhotoId
  label: string | null
}

export const NEARBY_PINS: NearbyPin[] = [
  { photo: 'factuel-2', label: 'Fanja · 3 km' },
  { photo: 'loic', label: 'Hery · 5 km' },
  { photo: 'tiavina', label: 'Lova · 2 km' },
  { photo: 'factuel-1', label: null },
]
