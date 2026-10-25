import type { Metadata } from 'next'
import { BRAND_NAME, SITE_ASSETS } from '@/content/site'

export function getLegalMetadata(title: string, description: string): Metadata {
  return {
    title: `${title} · ${BRAND_NAME}`,
    description,
    icons: {
      icon: { url: SITE_ASSETS.favicon, type: 'image/png' },
      apple: SITE_ASSETS.appleTouchIcon,
    },
  }
}
