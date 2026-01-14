// Landing page content types for CMS

// Section keys
export type SectionKey =
  | 'header'
  | 'hero'
  | 'features'
  | 'how_it_works'
  | 'testimonials'
  | 'faq'
  | 'cta'
  | 'newsletter'
  | 'footer'

// Header content
export interface NavItem {
  href: string
  label: string
}

export interface CTAButton {
  text: string
  href: string
}

export interface HeaderContent {
  logo: string
  navItems: NavItem[]
  ctaButton: CTAButton
}

// Hero content
export interface FloatingBadge {
  text: string
  icon: 'heart' | 'sparkles' | 'emoji'
  position: 'top-right' | 'left' | 'right'
}

export interface SocialProofItem {
  value: string
  label: string
  icon: 'users' | 'heart' | 'clock'
}

export interface AppStoreBadge {
  image: string
  tooltip: string
}

export interface AppStoreBadges {
  googlePlay: AppStoreBadge
  appStore: AppStoreBadge
}

export interface HeroContent {
  badge: string
  headline: string
  headlineHighlight: string
  subheadline: string
  subheadlineKeywords: string[]
  phoneImage: string
  floatingBadges: FloatingBadge[]
  socialProof: SocialProofItem[]
  appStoreBadges: AppStoreBadges
  scrollIndicatorText: string
}

// Features content
export interface FeatureItem {
  number: string
  title: string
  description: string
  icon: 'sparkles' | 'brain' | 'shield' | 'heart' | 'star' | 'zap'
}

export interface FeaturesContent {
  sectionTitle: string
  sectionDescription: string
  features: FeatureItem[]
}

// How It Works content
export interface HowItWorksStep {
  number: string
  title: string
  description: string
  image: string
}

export interface HowItWorksContent {
  sectionTitle: string
  sectionDescription: string
  steps: HowItWorksStep[]
}

// Testimonials content
export interface TestimonialItem {
  quote: string
  name: string
  age: number
  avatar: string
}

export interface TestimonialsContent {
  sectionTitle: string
  sectionDescription: string
  badgeText: string
  testimonials: TestimonialItem[]
}

// FAQ content
export interface FAQItem {
  question: string
  answer: string
}

export interface FAQContent {
  sectionTitle: string
  sectionDescription: string
  faqs: FAQItem[]
}

// CTA content
export interface CTAStats {
  users: string
  usersLabel: string
  status: string
}

export interface CTAContent {
  badgeText: string
  headline: string
  headlineHighlight: string
  subheadline: string
  googlePlayBadge: string
  appStoreBadge: string
  googlePlayTooltip: string
  appStoreTooltip: string
  stats: CTAStats
}

// Newsletter content
export interface NewsletterContent {
  badgeText: string
  headline: string
  subheadline: string
  inputLabel: string
  inputPlaceholder: string
  submitButtonText: string
  submittingText: string
  successTitle: string
  successMessage: string
  disclaimer: string
}

// Footer content
export interface SocialLink {
  name: string
  href: string
}

export interface NavigationLink {
  label: string
  href: string
}

export interface LegalLink {
  name: string
  href: string
}

export interface FooterContent {
  logo: string
  description: string
  socialLinks: SocialLink[]
  navigationLinks: NavigationLink[]
  contactEmail: string
  legalLinks: LegalLink[]
  copyright: string
  madeBy: string
}

// Union type for all section content types
export type LandingSectionContent =
  | HeaderContent
  | HeroContent
  | FeaturesContent
  | HowItWorksContent
  | TestimonialsContent
  | FAQContent
  | CTAContent
  | NewsletterContent
  | FooterContent

// Database row type
export interface LandingSection {
  id: string
  section_key: SectionKey
  section_name: string
  content: LandingSectionContent
  is_published: boolean
  published_at: string | null
  updated_at: string
  updated_by: string | null
  created_at: string
}

// Database row type for history
export interface LandingSectionHistory {
  id: string
  section_id: string
  previous_content: LandingSectionContent | null
  new_content: LandingSectionContent
  changed_by: string | null
  change_reason: string | null
  created_at: string
}

// Helper type for getting content type by section key
export type ContentBySection = {
  header: HeaderContent
  hero: HeroContent
  features: FeaturesContent
  how_it_works: HowItWorksContent
  testimonials: TestimonialsContent
  faq: FAQContent
  cta: CTAContent
  newsletter: NewsletterContent
  footer: FooterContent
}

// All landing content for public page
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

// Section metadata for UI
export interface SectionMetadata {
  key: SectionKey
  name: string
  description: string
  icon: string
}

export const SECTION_METADATA: SectionMetadata[] = [
  { key: 'header', name: 'En-tête', description: 'Logo, navigation et bouton CTA', icon: 'menu' },
  { key: 'hero', name: 'Hero', description: 'Section principale avec titre et image', icon: 'star' },
  { key: 'features', name: 'Fonctionnalités', description: 'Les 3 fonctionnalités clés', icon: 'sparkles' },
  { key: 'how_it_works', name: 'Comment ça marche', description: 'Les étapes du processus', icon: 'list-ordered' },
  { key: 'testimonials', name: 'Témoignages', description: 'Avis des utilisateurs', icon: 'quote' },
  { key: 'faq', name: 'FAQ', description: 'Questions fréquentes', icon: 'help-circle' },
  { key: 'cta', name: 'Appel à l\'action', description: 'Section de conversion', icon: 'megaphone' },
  { key: 'newsletter', name: 'Newsletter', description: 'Inscription à la newsletter', icon: 'mail' },
  { key: 'footer', name: 'Pied de page', description: 'Liens et informations', icon: 'layout' },
]
