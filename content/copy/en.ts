import type { HomeCopy } from '../home-copy'
import { CONTACT_HREF, SECTION_IDS } from '../site'

export const EN: HomeCopy = {
  metadata: {
    title: 'Tia · The dating app for Madagascar and Réunion',
    description:
      'Verified profiles, real people near you. Download Tia for free on iPhone and Android.',
    openGraphTitle: 'Tia · Find your better half',
    openGraphDescription: 'Verified profiles, real people near you. Download Tia for free.',
  },
  language: {
    label: 'Language',
    names: { fr: 'Français', en: 'English' },
  },
  stores: {
    appStore: {
      caption: 'Download on the',
      name: 'App Store',
      label: 'Download Tia on the App Store',
    },
    googlePlay: {
      caption: 'Get it on',
      name: 'Google Play',
      label: 'Get Tia on Google Play',
    },
  },
  nav: {
    label: 'Navigation',
    homeLabel: 'Tia, home',
    links: [
      { label: 'Why Tia', href: `#${SECTION_IDS.whyTia}` },
      { label: 'Safety', href: `#${SECTION_IDS.safety}` },
      { label: 'Plans', href: `#${SECTION_IDS.offers}` },
      { label: 'FAQ', href: `#${SECTION_IDS.faq}` },
    ],
    download: { label: 'Download', href: `#${SECTION_IDS.download}` },
  },
  hero: {
    countriesLabel: 'Countries',
    title: 'Find your',
    highlight: 'better\u00a0half.',
    subtitle: 'Verified profiles, real people near you. One swipe is all it takes to get started.',
    note: 'Free · iPhone and Android',
    scrollLabel: 'Discover',
  },
  whyTia: {
    eyebrow: 'Why Tia',
    title: 'Everything you need for a first\u00a0date.',
    tiles: {
      swipe: {
        kicker: 'Swipe',
        title: 'One swipe, one real face.',
        description: 'Full-screen photos, complete profiles. You know who you’re saying yes to.',
      },
      verified: {
        kicker: 'Verified',
        title: 'Verified profiles',
        description: 'One selfie, one minute, and the badge shows up.',
      },
      heart: {
        kicker: 'Tia Heart',
        title: 'A Heart, not a like',
        description: 'To say “I really like you” before anyone else does.',
      },
      nearby: {
        kicker: 'Around you',
        title: 'Close to home',
        description: 'People from your neighbourhood, not the other end of the country.',
      },
      coach: {
        kicker: 'Coach',
        title: 'Coach Tia',
        description: 'An idea for a first message when you’re stuck.',
      },
      interests: {
        kicker: 'Interests',
        title: 'Things in common',
        description: 'Your interests do the introductions.',
      },
      payment: {
        kicker: 'Payment',
        title: 'Pay your way',
        description: 'Mobile money in Madagascar, card and app stores in Réunion.',
      },
    },
    likeStamp: 'Like',
    coachChat: {
      question: 'No idea what to write to her…',
      coachName: 'Coach Tia',
      answer: 'She loves hiking. Ask her about the best summit she has climbed.',
    },
    interests: [
      ['Hiking', 'Cooking', 'Live music', 'Photography', 'Movies', 'Travel', 'Football', 'Reading'],
      ['Dancing', 'Coffee', 'Fashion', 'Video games', 'Beach', 'Kabary', 'Basketball', 'TV shows'],
    ],
    payments: [
      { region: 'Madagascar', methods: ['MVola', 'Orange Money', 'Airtel Money'] },
      { region: 'Réunion', methods: ['Bank card', 'App Store', 'Google Play'] },
    ],
  },
  steps: {
    eyebrow: 'How it works',
    title: 'Three steps and you’re off.',
    items: [
      {
        title: 'Create your profile',
        description: 'A few photos, a couple of lines about you, what you’re looking for.',
      },
      {
        title: 'Swipe',
        description: 'Right if you like them, left if not. Nobody will know.',
      },
      {
        title: 'Match and chat',
        description: 'When it’s mutual, the conversation opens.',
      },
    ],
  },
  safety: {
    eyebrow: 'Safety',
    title: 'Your safety comes before the\u00a0match.',
    items: {
      verification: {
        title: 'Verification',
        description: 'The verified badge confirms the person is the one in the photos.',
      },
      respect: {
        title: 'Respect',
        description: 'Profiles and photos are moderated. Zero tolerance for harassment.',
      },
      control: {
        title: 'Control',
        description: 'Block, report or hide your profile in two taps.',
      },
      data: {
        title: 'Data',
        description: 'Your email and phone number stay private. Delete everything whenever you want.',
      },
    },
  },
  offers: {
    eyebrow: 'Plans',
    title: 'Free to start. Go further if you\u00a0want.',
    plans: {
      free: { name: 'Free', features: ['Daily swipes', 'Matches and messages', 'Verified profile'] },
      silver: { name: 'Silver', features: ['Unlimited likes', 'Rewind'] },
      gold: { name: 'Gold', features: ['See who liked you', 'Unlimited likes', '5 Tia Hearts a week'] },
      elite: { name: 'Elite', features: ['Everything in Gold', 'Featured profile', 'Unlimited reveals'] },
    },
    note: 'Prices are shown in the app in your local currency: ariary in Madagascar, euro in Réunion.',
  },
  countries: {
    eyebrow: 'Where to find Tia',
    title: 'Already here. Coming to you\u00a0soon.',
    statusLabels: { available: 'Available', soon: 'Soon' },
  },
  testimonials: {
    eyebrow: 'Testimonials',
    title: 'They say it better than we do.',
    translatedNote: 'translated from French',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions?',
    leadBefore: 'Write to us at',
    leadAfter: 'if the answer isn’t here.',
    items: [
      {
        question: 'Is Tia free?',
        answer:
          'Yes. You create your profile, swipe and chat for free. Silver, Gold and Elite add extra options.',
      },
      {
        question: 'How does verification work?',
        answer:
          'You take a selfie in the app. We compare it with your photos, then the verified badge appears on your profile. The selfie is never shown.',
      },
      {
        question: 'Is my data protected?',
        answer:
          'Your email and phone number are never displayed. You can delete your account and your data from the settings.',
      },
      {
        question: 'Can I cancel my subscription?',
        answer:
          'Yes, at any time, from the App Store, Google Play or Tia’s settings, depending on how you pay.',
      },
      {
        question: 'Which phones does it work on?',
        answer: 'iPhone and Android, including entry-level models.',
      },
      {
        question: 'Which countries?',
        answer: 'Madagascar and Réunion. Mauritius and South Africa are coming soon.',
      },
    ],
  },
  finalCta: {
    title: 'Your better half might be',
    highlight: '3\u00a0km\u00a0away.',
    subtitle: 'Download Tia, it’s free.',
  },
  ticker: [
    'Download Tia',
    'It’s free',
    'Madagascar',
    'Réunion',
    'Mauritius',
    'South Africa',
    'Trouve ta moitié',
  ],
  footer: {
    columns: [
      {
        title: 'Legal',
        links: [
          { label: 'Privacy', href: '/privacy' },
          { label: 'Terms of use', href: '/terms' },
          { label: 'Child safety', href: '/child-safety' },
          { label: 'Safety', href: '/dating-safety' },
        ],
      },
      {
        title: 'Tia',
        links: [
          { label: 'Why Tia', href: `#${SECTION_IDS.whyTia}` },
          { label: 'Plans', href: `#${SECTION_IDS.offers}` },
          { label: 'Testimonials', href: `#${SECTION_IDS.testimonials}` },
          { label: 'FAQ', href: `#${SECTION_IDS.faq}` },
          { label: 'Contact', href: CONTACT_HREF },
        ],
      },
    ],
    socialTitle: 'Social',
    instagramLabel: 'Tia on Instagram',
    appTitle: 'Get the app',
    seo: 'Single in Antananarivo, Saint-Denis or elsewhere on the island? Tia is the dating app built for Madagascar and Réunion. Create your profile, verify it in a minute and meet people near you, with real photos and shared interests. Whether you’re looking for something serious, new people to meet or just someone to share a coffee with, it all starts with a swipe. Tia is free on iPhone and Android.',
    bottomLinks: [
      { label: 'FAQ', href: `#${SECTION_IDS.faq}` },
      { label: 'Safety', href: `#${SECTION_IDS.safety}` },
      { label: 'Plans', href: `#${SECTION_IDS.offers}` },
      { label: 'Contact', href: CONTACT_HREF },
    ],
    copyright: '© 2026 Tia, published by APli SARLU',
    legalLinks: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
    locales: 'EN · Madagascar · Réunion',
  },
}
