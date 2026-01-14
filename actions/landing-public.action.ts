'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { unstable_cache } from 'next/cache'
import type {
  HeaderContent,
  HeroContent,
  FeaturesContent,
  HowItWorksContent,
  TestimonialsContent,
  FAQContent,
  CTAContent,
  NewsletterContent,
  FooterContent,
  SectionKey,
} from '@/lib/types/landing.types'

// Type for all landing content
export interface AllLandingContent {
  header: HeaderContent | null
  hero: HeroContent | null
  features: FeaturesContent | null
  how_it_works: HowItWorksContent | null
  testimonials: TestimonialsContent | null
  faq: FAQContent | null
  cta: CTAContent | null
  newsletter: NewsletterContent | null
  footer: FooterContent | null
}

// Get all published landing content (cached for 60 seconds)
// Uses admin client to avoid cookies() which is incompatible with unstable_cache
export const getPublishedLandingContent = unstable_cache(
  async (): Promise<AllLandingContent> => {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('landing_sections')
      .select('section_key, content')
      .eq('is_published', true)

    if (error) {
      console.error('Error fetching landing content:', error)
      return {
        header: null,
        hero: null,
        features: null,
        how_it_works: null,
        testimonials: null,
        faq: null,
        cta: null,
        newsletter: null,
        footer: null,
      }
    }

    // Build the content object
    const content: AllLandingContent = {
      header: null,
      hero: null,
      features: null,
      how_it_works: null,
      testimonials: null,
      faq: null,
      cta: null,
      newsletter: null,
      footer: null,
    }

    for (const section of data || []) {
      const key = section.section_key as SectionKey
      if (key in content) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (content as any)[key] = section.content
      }
    }

    return content
  },
  ['landing-content'],
  { revalidate: 60, tags: ['landing-content'] }
)

// Get a single published section
// Uses admin client to bypass RLS for public read access
export async function getPublishedSection<T>(sectionKey: SectionKey): Promise<T | null> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('landing_sections')
    .select('content')
    .eq('section_key', sectionKey)
    .eq('is_published', true)
    .single()

  if (error || !data) {
    console.error(`Error fetching section ${sectionKey}:`, error)
    return null
  }

  return data.content as T
}
