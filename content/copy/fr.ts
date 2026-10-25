import type { HomeCopy } from '../home-copy'
import { CONTACT_HREF, SECTION_IDS } from '../site'

export const FR: HomeCopy = {
  metadata: {
    title: 'Tia · L’appli de rencontre à Madagascar et à La Réunion',
    description:
      'Des profils vérifiés, des vrais gens près de chez toi. Télécharge Tia gratuitement sur iPhone et Android.',
    openGraphTitle: 'Tia · Trouve ta moitié',
    openGraphDescription:
      'Des profils vérifiés, des vrais gens près de chez toi. Télécharge Tia gratuitement.',
  },
  language: {
    label: 'Langue',
    names: { fr: 'Français', en: 'English' },
  },
  stores: {
    appStore: {
      caption: 'Télécharger dans',
      name: 'l’App Store',
      label: 'Télécharger Tia sur l’App Store',
    },
    googlePlay: {
      caption: 'Disponible sur',
      name: 'Google Play',
      label: 'Télécharger Tia sur Google Play',
    },
  },
  nav: {
    label: 'Navigation',
    homeLabel: 'Tia, accueil',
    links: [
      { label: 'Pourquoi Tia', href: `#${SECTION_IDS.whyTia}` },
      { label: 'Sécurité', href: `#${SECTION_IDS.safety}` },
      { label: 'Offres', href: `#${SECTION_IDS.offers}` },
      { label: 'FAQ', href: `#${SECTION_IDS.faq}` },
    ],
    download: { label: 'Télécharger', href: `#${SECTION_IDS.download}` },
  },
  hero: {
    countriesLabel: 'Pays',
    title: 'Trouve ta',
    highlight: 'moitié.',
    subtitle:
      'Des profils vérifiés, des vrais gens près de chez toi. Il suffit d’un swipe pour commencer.',
    note: 'Gratuit · iPhone et Android',
    scrollLabel: 'Découvrir',
  },
  whyTia: {
    eyebrow: 'Pourquoi Tia',
    title: 'Tout ce qu’il faut pour un premier rendez-vous.',
    tiles: {
      swipe: {
        kicker: 'Swipe',
        title: 'Un swipe, un vrai visage.',
        description: 'Photos plein écran, profils complets. Tu sais à qui tu dis oui.',
      },
      verified: {
        kicker: 'Vérifié',
        title: 'Profils vérifiés',
        description: 'Un selfie, une minute, et le badge apparaît.',
      },
      heart: {
        kicker: 'Cœur Tia',
        title: 'Un Cœur, pas un like',
        description: 'Pour dire «\u00a0tu m’as vraiment plu\u00a0» avant tout le monde.',
      },
      nearby: {
        kicker: 'Autour de toi',
        title: 'Près de chez toi',
        description: 'Des gens de ton quartier, pas à l’autre bout du pays.',
      },
      coach: {
        kicker: 'Coach',
        title: 'Coach Tia',
        description: 'Une idée de premier message quand tu bloques.',
      },
      interests: {
        kicker: 'Affinités',
        title: 'Des points communs',
        description: 'Tes centres d’intérêt font les présentations.',
      },
      payment: {
        kicker: 'Paiement',
        title: 'Paie comme tu veux',
        description: 'Mobile money à Madagascar, carte et stores à La Réunion.',
      },
    },
    likeStamp: 'J’aime',
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
      { region: 'Madagascar', methods: ['MVola', 'Orange Money', 'Airtel Money'] },
      { region: 'La Réunion', methods: ['Carte bancaire', 'App Store', 'Google Play'] },
    ],
  },
  steps: {
    eyebrow: 'Comment ça marche',
    title: 'Trois étapes, et c’est parti.',
    items: [
      {
        title: 'Crée ton profil',
        description: 'Quelques photos, deux lignes sur toi, ce que tu cherches.',
      },
      {
        title: 'Swipe',
        description: 'À droite si ça te plaît, à gauche sinon. Personne ne le sait.',
      },
      {
        title: 'Matche et écris',
        description: 'Quand c’est réciproque, la conversation s’ouvre.',
      },
    ],
  },
  safety: {
    eyebrow: 'Sécurité',
    title: 'Ta sécurité passe avant le match.',
    items: {
      verification: {
        title: 'Vérification',
        description: 'Le badge vérifié confirme que la personne est bien celle des photos.',
      },
      respect: {
        title: 'Respect',
        description: 'Profils et photos modérés. Zéro tolérance pour le harcèlement.',
      },
      control: {
        title: 'Contrôle',
        description: 'Bloque, signale ou masque ton profil en deux touches.',
      },
      data: {
        title: 'Données',
        description: 'Ton e-mail et ton numéro restent privés. Tu supprimes tout quand tu veux.',
      },
    },
  },
  offers: {
    eyebrow: 'Offres',
    title: 'Gratuit pour commencer. Plus loin si tu veux.',
    plans: {
      free: { name: 'Gratuit', features: ['Swipes chaque jour', 'Matchs et messages', 'Profil vérifié'] },
      silver: { name: 'Silver', features: ['Likes illimités', 'Retour en arrière'] },
      gold: { name: 'Gold', features: ['Vois qui t’a liké', 'Likes illimités', '5 Cœurs Tia par semaine'] },
      elite: { name: 'Elite', features: ['Tout Gold', 'Profil mis en avant', 'Révélations illimitées'] },
    },
    note: 'Prix affichés dans l’appli, en monnaie locale\u00a0: ariary à Madagascar, euro à La Réunion.',
  },
  countries: {
    eyebrow: 'Où trouver Tia',
    title: 'Déjà là. Et bientôt chez toi.',
    statusLabels: { available: 'Disponible', soon: 'Bientôt' },
  },
  testimonials: {
    eyebrow: 'Témoignages',
    title: 'Ils en parlent mieux que nous.',
    translatedNote: 'traduit de l’anglais',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Des questions\u00a0?',
    leadBefore: 'Écris-nous à',
    leadAfter: 'si la réponse n’est pas ici.',
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
  },
  finalCta: {
    title: 'Ta moitié est peut-être',
    highlight: 'à\u00a03\u00a0km.',
    subtitle: 'Télécharge Tia, c’est gratuit.',
  },
  ticker: [
    'Télécharge Tia',
    'C’est gratuit',
    'Madagascar',
    'La Réunion',
    'Maurice',
    'South Africa',
    'Find your better half',
  ],
  footer: {
    columns: [
      {
        title: 'Légal',
        links: [
          { label: 'Confidentialité', href: '/privacy' },
          { label: 'Conditions d’utilisation', href: '/terms' },
          { label: 'Protection des enfants', href: '/child-safety' },
          { label: 'Sécurité', href: '/dating-safety' },
        ],
      },
      {
        title: 'Tia',
        links: [
          { label: 'Pourquoi Tia', href: `#${SECTION_IDS.whyTia}` },
          { label: 'Offres', href: `#${SECTION_IDS.offers}` },
          { label: 'Témoignages', href: `#${SECTION_IDS.testimonials}` },
          { label: 'FAQ', href: `#${SECTION_IDS.faq}` },
          { label: 'Contact', href: CONTACT_HREF },
        ],
      },
    ],
    socialTitle: 'Réseaux',
    instagramLabel: 'Instagram de Tia',
    appTitle: 'Télécharge l’appli',
    seo: 'Célibataire à Antananarivo, à Saint-Denis ou ailleurs sur l’île\u00a0? Tia est l’appli de rencontre pensée pour Madagascar et La Réunion. Crée ton profil, vérifie-le en une minute et découvre des gens près de chez toi, avec de vraies photos et des centres d’intérêt en commun. Que tu cherches une histoire sérieuse, de nouvelles rencontres ou simplement quelqu’un avec qui partager un café, tout commence par un swipe. Tia est gratuite sur iPhone et Android.',
    bottomLinks: [
      { label: 'FAQ', href: `#${SECTION_IDS.faq}` },
      { label: 'Sécurité', href: `#${SECTION_IDS.safety}` },
      { label: 'Offres', href: `#${SECTION_IDS.offers}` },
      { label: 'Contact', href: CONTACT_HREF },
    ],
    copyright: '© 2026 Tia, édité par APli SARLU',
    legalLinks: [
      { label: 'Confidentialité', href: '/privacy' },
      { label: 'Conditions', href: '/terms' },
    ],
    locales: 'FR · Madagascar · La Réunion',
  },
}
