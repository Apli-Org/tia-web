export const SITE_METADATA = {
  title: 'Tia · L’appli de rencontre à Madagascar et à La Réunion',
  description:
    'Des profils vérifiés, des vrais gens près de chez toi. Télécharge Tia gratuitement sur iPhone et Android.',
  openGraphTitle: 'Tia · Trouve ta moitié',
  openGraphDescription:
    'Des profils vérifiés, des vrais gens près de chez toi. Télécharge Tia gratuitement.',
  url: 'https://tia-meet.com/',
  themeColor: '#1A0A28',
  favicon: '/images/favicon.png',
  appleTouchIcon: '/images/apple-touch-icon.png',
} as const

export const BRAND_NAME = 'Tia'

export const PHOTOS = {
  fanja: '/images/fanja.jpg',
  hery: '/images/hery.jpg',
  lova: '/images/lova.jpg',
  mamy: '/images/mamy.jpg',
  mialy: '/images/mialy.jpg',
  tojo: '/images/tojo.jpg',
} as const

export type PhotoId = keyof typeof PHOTOS

export const STORE_LINKS = {
  appStore: 'https://apps.apple.com/app/id6758033706',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.rdh36.tiaapp',
} as const

export const CONTACT_EMAIL = 'contact@apli.mg'
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`
export const INSTAGRAM_URL = 'https://www.instagram.com/tia.meet/'

export const STORES = [
  {
    href: STORE_LINKS.appStore,
    icon: 'apple',
    caption: 'Télécharger dans',
    name: 'l’App Store',
    label: 'Télécharger Tia sur l’App Store',
  },
  {
    href: STORE_LINKS.googlePlay,
    icon: 'google-play',
    caption: 'Disponible sur',
    name: 'Google Play',
    label: 'Télécharger Tia sur Google Play',
  },
] as const

type SiteLink = {
  label: string
  href: string
}

export const NAV = {
  label: 'Navigation',
  homeLabel: 'Tia, accueil',
  links: [
    { label: 'Pourquoi Tia', href: '#pourquoi' },
    { label: 'Sécurité', href: '#securite' },
    { label: 'Offres', href: '#offres' },
    { label: 'FAQ', href: '#faq' },
  ],
  language: 'FR',
  download: { label: 'Télécharger', href: '#telecharger' },
} as const

type MosaicColumn = {
  duration: number
  photos: PhotoId[]
}

const HERO_MOSAIC: MosaicColumn[] = [
  { duration: 38, photos: ['fanja', 'hery', 'lova', 'tojo', 'mialy', 'mamy'] },
  { duration: 42, photos: ['mamy', 'mialy', 'tojo', 'fanja', 'hery', 'lova'] },
  { duration: 46, photos: ['lova', 'tojo', 'fanja', 'mamy', 'hery', 'mialy'] },
  { duration: 50, photos: ['hery', 'fanja', 'mamy', 'lova', 'tojo', 'mialy'] },
  { duration: 54, photos: ['mialy', 'lova', 'hery', 'tojo', 'mamy', 'fanja'] },
]

export const HERO = {
  countriesLabel: 'Pays',
  title: 'Trouve ta',
  highlight: 'moitié.',
  subtitle:
    'Des profils vérifiés, des vrais gens près de chez toi. Il suffit d’un swipe pour commencer.',
  note: 'Gratuit · iPhone et Android',
  scroll: { label: 'Découvrir', href: '#pourquoi', arrow: '↓' },
  disclaimer: 'Photos de modèles, à titre d’illustration.',
  mosaic: HERO_MOSAIC,
} as const

export type TileId = 'swipe' | 'verified' | 'heart' | 'nearby' | 'coach' | 'interests' | 'payment'

type Tile = {
  id: TileId
  kicker: string
  title: string
  description: string
}

type SwipeProfile = {
  photo: PhotoId
  name: string
  age: number
  place: string
}

type NearbyPin = {
  photo: PhotoId
  label: string | null
}

const WHY_TIA_TILES: Tile[] = [
  {
    id: 'swipe',
    kicker: 'Swipe',
    title: 'Un swipe, un vrai visage.',
    description: 'Photos plein écran, profils complets. Tu sais à qui tu dis oui.',
  },
  {
    id: 'verified',
    kicker: 'Vérifié',
    title: 'Profils vérifiés',
    description: 'Un selfie, une minute, et le badge apparaît.',
  },
  {
    id: 'heart',
    kicker: 'Cœur Tia',
    title: 'Un Cœur, pas un like',
    description: 'Pour dire «\u00a0tu m’as vraiment plu\u00a0» avant tout le monde.',
  },
  {
    id: 'nearby',
    kicker: 'Autour de toi',
    title: 'Près de chez toi',
    description: 'Des gens de ton quartier, pas à l’autre bout du pays.',
  },
  {
    id: 'coach',
    kicker: 'Coach',
    title: 'Coach Tia',
    description: 'Une idée de premier message quand tu bloques.',
  },
  {
    id: 'interests',
    kicker: 'Affinités',
    title: 'Des points communs',
    description: 'Tes centres d’intérêt font les présentations.',
  },
  {
    id: 'payment',
    kicker: 'Paiement',
    title: 'Paie comme tu veux',
    description: 'Mobile money à Madagascar, carte et stores à La Réunion.',
  },
]

const SWIPE_PROFILES: SwipeProfile[] = [
  { photo: 'fanja', name: 'Fanja', age: 26, place: 'Ivandry · 3 km' },
  { photo: 'hery', name: 'Hery', age: 29, place: 'Saint-Denis · 4 km' },
  { photo: 'mialy', name: 'Miora', age: 24, place: 'Analakely · 2 km' },
]

const SELFIE_PHOTO: PhotoId = 'mialy'

const NEARBY_PINS: NearbyPin[] = [
  { photo: 'fanja', label: 'Fanja · 3 km' },
  { photo: 'hery', label: 'Hery · 5 km' },
  { photo: 'lova', label: 'Lova · 2 km' },
  { photo: 'tojo', label: null },
]

export const WHY_TIA = {
  id: 'pourquoi',
  eyebrow: 'Pourquoi Tia',
  title: 'Tout ce qu’il faut pour un premier rendez-vous.',
  tiles: WHY_TIA_TILES,
  swipeProfiles: SWIPE_PROFILES,
  likeStamp: 'J’aime',
  selfie: SELFIE_PHOTO,
  nearbyPins: NEARBY_PINS,
  coachChat: {
    question: 'Je sais pas quoi lui écrire…',
    coachName: 'Coach Tia',
    answer: 'Elle adore la rando. Demande-lui son plus beau sommet.',
  },
  interests: [
    ['Randonnée', 'Cuisine', 'Musique live', 'Photo', 'Cinéma', 'Voyage', 'Football', 'Lecture'],
    ['Danse', 'Café', 'Mode', 'Jeux vidéo', 'Plage', 'Kabary', 'Basket', 'Séries'],
  ],
  payments: [
    { region: 'Madagascar', isLocal: true, methods: ['MVola', 'Orange Money', 'Airtel Money'] },
    { region: 'La Réunion', isLocal: false, methods: ['Carte bancaire', 'App Store', 'Google Play'] },
  ],
} as const

export const STEPS = {
  eyebrow: 'Comment ça marche',
  title: 'Trois étapes, et c’est parti.',
  items: [
    {
      number: '01',
      title: 'Crée ton profil',
      description: 'Quelques photos, deux lignes sur toi, ce que tu cherches.',
    },
    {
      number: '02',
      title: 'Swipe',
      description: 'À droite si ça te plaît, à gauche sinon. Personne ne le sait.',
    },
    {
      number: '03',
      title: 'Matche et écris',
      description: 'Quand c’est réciproque, la conversation s’ouvre.',
    },
  ],
} as const

export const SAFETY = {
  id: 'securite',
  eyebrow: 'Sécurité',
  title: 'Ta sécurité passe avant le match.',
  items: [
    {
      icon: 'shield',
      title: 'Vérification',
      description: 'Le badge vérifié confirme que la personne est bien celle des photos.',
    },
    {
      icon: 'heart',
      title: 'Respect',
      description: 'Profils et photos modérés. Zéro tolérance pour le harcèlement.',
    },
    {
      icon: 'ban',
      title: 'Contrôle',
      description: 'Bloque, signale ou masque ton profil en deux touches.',
    },
    {
      icon: 'lock',
      title: 'Données',
      description: 'Ton e-mail et ton numéro restent privés. Tu supprimes tout quand tu veux.',
    },
  ],
} as const

export const OFFERS = {
  id: 'offres',
  eyebrow: 'Offres',
  title: 'Gratuit pour commencer. Plus loin si tu veux.',
  plans: [
    {
      name: 'Gratuit',
      isHighlighted: false,
      features: ['Swipes chaque jour', 'Matchs et messages', 'Profil vérifié'],
    },
    {
      name: 'Silver',
      isHighlighted: false,
      features: ['Likes illimités', 'Retour en arrière'],
    },
    {
      name: 'Gold',
      isHighlighted: true,
      features: ['Vois qui t’a liké', 'Likes illimités', '5 Cœurs Tia par semaine'],
    },
    {
      name: 'Elite',
      isHighlighted: false,
      features: ['Tout Gold', 'Profil mis en avant', 'Révélations illimitées'],
    },
  ],
  note: 'Prix affichés dans l’appli, en monnaie locale\u00a0: ariary à Madagascar, euro à La Réunion.',
} as const

export const COUNTRIES_SECTION = {
  eyebrow: 'Où trouver Tia',
  title: 'Déjà là. Et bientôt chez toi.',
} as const

export const TESTIMONIALS_SECTION = {
  id: 'temoignages',
  eyebrow: 'Témoignages',
  title: 'Ils en parlent mieux que nous.',
  ageSuffix: 'ans',
} as const

export const FAQ = {
  id: 'faq',
  eyebrow: 'FAQ',
  title: 'Des questions\u00a0?',
  leadBefore: 'Écris-nous à',
  leadAfter: 'si la réponse n’est pas ici.',
  toggleSymbol: '+',
  items: [
    {
      question: 'Tia est-elle gratuite\u00a0?',
      answer:
        'Oui. Tu crées ton profil, tu swipes et tu discutes gratuitement. Silver, Gold et Elite ajoutent des options.',
    },
    {
      question: 'Comment marche la vérification\u00a0?',
      answer:
        'Tu prends un selfie dans l’appli. On le compare à tes photos, puis le badge vérifié apparaît sur ton profil. Le selfie n’est jamais affiché.',
    },
    {
      question: 'Mes données sont-elles protégées\u00a0?',
      answer:
        'Ton e-mail et ton numéro ne s’affichent jamais. Tu peux supprimer ton compte et tes données depuis les réglages.',
    },
    {
      question: 'Je peux arrêter mon abonnement\u00a0?',
      answer:
        'Oui, à tout moment, depuis l’App Store, Google Play ou les réglages de Tia selon ton moyen de paiement.',
    },
    {
      question: 'Sur quels téléphones\u00a0?',
      answer: 'iPhone et Android, y compris les modèles d’entrée de gamme.',
    },
    {
      question: 'Dans quels pays\u00a0?',
      answer: 'Madagascar et La Réunion. Maurice et l’Afrique du Sud arrivent bientôt.',
    },
  ],
} as const

export const FINAL_CTA = {
  id: 'telecharger',
  title: 'Ta moitié est peut-être',
  highlight: 'à\u00a03\u00a0km.',
  subtitle: 'Télécharge Tia, c’est gratuit.',
} as const

export const TICKER = {
  separator: '✦',
  items: [
    'Télécharge Tia',
    'C’est gratuit',
    'Madagascar',
    'La Réunion',
    'Maurice',
    'South Africa',
    'Find your better half',
  ],
} as const

type FooterColumn = {
  title: string
  links: SiteLink[]
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Légal',
    links: [
      { label: 'Confidentialité', href: '/privacy' },
      { label: 'Conditions d’utilisation', href: '/terms' },
      { label: 'Protection des enfants', href: '/child-safety' },
      { label: 'Sécurité', href: '#securite' },
    ],
  },
  {
    title: 'Tia',
    links: [
      { label: 'Pourquoi Tia', href: '#pourquoi' },
      { label: 'Offres', href: '#offres' },
      { label: 'Témoignages', href: '#temoignages' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: CONTACT_HREF },
    ],
  },
]

export const FOOTER = {
  columns: FOOTER_COLUMNS,
  socialTitle: 'Réseaux',
  instagramLabel: 'Instagram de Tia',
  appTitle: 'Télécharge l’appli',
  seo: 'Célibataire à Antananarivo, à Saint-Denis ou ailleurs sur l’île\u00a0? Tia est l’appli de rencontre pensée pour Madagascar et La Réunion. Crée ton profil, vérifie-le en une minute et découvre des gens près de chez toi, avec de vraies photos et des centres d’intérêt en commun. Que tu cherches une histoire sérieuse, de nouvelles rencontres ou simplement quelqu’un avec qui partager un café, tout commence par un swipe. Tia est gratuite sur iPhone et Android.',
  bottomLinks: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Sécurité', href: '#securite' },
    { label: 'Offres', href: '#offres' },
    { label: 'Contact', href: CONTACT_HREF },
  ],
  copyright: '© 2026 Tia, édité par APli SARLU',
  legalLinks: [
    { label: 'Confidentialité', href: '/privacy' },
    { label: 'Conditions', href: '/terms' },
  ],
  locales: 'FR · Madagascar · La Réunion',
} as const
