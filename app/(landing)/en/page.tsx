import { HomePage } from '@/components/home/home-page'
import { getHomeMetadata, HOME_VIEWPORT } from '@/lib/home-metadata'

export const metadata = getHomeMetadata('en')

export const viewport = HOME_VIEWPORT

export default function EnglishHomePage() {
  return <HomePage locale="en" />
}
