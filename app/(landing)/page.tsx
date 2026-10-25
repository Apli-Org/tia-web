import { HomePage } from '@/components/home/home-page'
import { getHomeMetadata, HOME_VIEWPORT } from '@/lib/home-metadata'

export const metadata = getHomeMetadata('fr')

export const viewport = HOME_VIEWPORT

export default function FrenchHomePage() {
  return <HomePage locale="fr" />
}
