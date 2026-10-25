import type { Metadata, Viewport } from 'next'
import { HOME_COPY } from '@/content/home-copy'
import { LOCALE_PATHS, LOCALES, OPEN_GRAPH_LOCALES, type Locale } from '@/content/i18n'
import { SITE_ASSETS, SITE_URL } from '@/content/site'

function getHomeUrl(locale: Locale) {
  return `${SITE_URL}${LOCALE_PATHS[locale]}`
}

export function getHomeMetadata(locale: Locale): Metadata {
  const { metadata } = HOME_COPY[locale]
  const url = getHomeUrl(locale)

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LOCALES.map((option) => [option, getHomeUrl(option)])),
        'x-default': getHomeUrl('fr'),
      },
    },
    openGraph: {
      title: metadata.openGraphTitle,
      description: metadata.openGraphDescription,
      locale: OPEN_GRAPH_LOCALES[locale],
      alternateLocale: LOCALES.filter((option) => option !== locale).map((option) => OPEN_GRAPH_LOCALES[option]),
      type: 'website',
      url,
    },
    twitter: {
      card: 'summary',
      title: metadata.openGraphTitle,
      description: metadata.openGraphDescription,
    },
    icons: {
      icon: { url: SITE_ASSETS.favicon, type: 'image/png' },
      apple: SITE_ASSETS.appleTouchIcon,
    },
  }
}

export const HOME_VIEWPORT: Viewport = {
  themeColor: SITE_ASSETS.themeColor,
}
