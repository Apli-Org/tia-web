'use server'

import { revalidatePath } from 'next/cache'

import { createAdminClient } from '@/lib/supabase/admin'
import { getCurrentAdmin } from './auth.action'

export type PushCategory = 'info' | 'promo'

export type PushFilters = {
  territories?: string[]
  tiers?: string[]
  genders?: string[]
  languages?: string[]
  verified?: boolean
  registered_from?: string
  registered_to?: string
}

export type PushMessage = {
  category: PushCategory
  titleFr: string
  bodyFr: string
  titleEn: string
  bodyEn: string
  url: string | null
  filters: PushFilters
}

export type PushCampaignStatus = 'sending' | 'sent' | 'failed'

export type PushCampaign = {
  id: string
  category: PushCategory
  title_fr: string
  body_fr: string
  title_en: string
  body_en: string
  url: string | null
  filters: PushFilters
  is_test: boolean
  status: PushCampaignStatus
  recipients: number
  sent_count: number
  failed_count: number
  error_message: string | null
  created_at: string
  completed_at: string | null
  creator: { email: string; full_name: string | null } | null
}

type ActionResult<T> = { success: true; data: T } | { success: false; error: string }

const NO_AUDIENCE_ERROR = 'no reachable member matches this campaign'

async function getPushAdmin() {
  const admin = await getCurrentAdmin()
  if (!admin || !admin.actions.includes('send_push')) return null
  return admin
}

function validateMessage(message: PushMessage): string | null {
  if (message.category !== 'info' && message.category !== 'promo') return 'Catégorie invalide'
  const texts = [message.titleFr, message.bodyFr, message.titleEn, message.bodyEn]
  if (texts.some((text) => !text.trim())) return 'Les titres et textes FR et EN sont requis'
  if ([message.titleFr, message.titleEn].some((title) => title.trim().length > 100)) {
    return 'Un titre dépasse 100 caractères'
  }
  if ([message.bodyFr, message.bodyEn].some((body) => body.trim().length > 500)) {
    return 'Un texte dépasse 500 caractères'
  }
  if (message.url && !message.url.startsWith('tiaapp://')) return 'Lien de destination invalide'
  return null
}

function cleanFilters(filters: PushFilters): PushFilters {
  const cleaned: PushFilters = {}
  if (filters.territories?.length) cleaned.territories = filters.territories
  if (filters.tiers?.length) cleaned.tiers = filters.tiers
  if (filters.genders?.length) cleaned.genders = filters.genders
  if (filters.languages?.length) cleaned.languages = filters.languages
  if (typeof filters.verified === 'boolean') cleaned.verified = filters.verified
  if (filters.registered_from) cleaned.registered_from = filters.registered_from
  if (filters.registered_to) cleaned.registered_to = filters.registered_to
  return cleaned
}

function rpcArgs(message: PushMessage, adminId: string) {
  return {
    p_category: message.category,
    p_title_fr: message.titleFr,
    p_body_fr: message.bodyFr,
    p_title_en: message.titleEn,
    p_body_en: message.bodyEn,
    p_url: message.url,
    p_filters: cleanFilters(message.filters),
    p_created_by: adminId,
  }
}

export async function countPushAudience(
  category: PushCategory,
  filters: PushFilters
): Promise<ActionResult<number>> {
  if (!(await getPushAdmin())) return { success: false, error: 'Permission insuffisante' }

  const { data, error } = await createAdminClient().rpc('count_push_campaign_audience', {
    p_category: category,
    p_filters: cleanFilters(filters),
  })

  if (error) {
    console.error('Error counting push audience:', error)
    return { success: false, error: "Impossible de calculer l'audience" }
  }

  return { success: true, data: data as number }
}

export async function sendPushCampaign(message: PushMessage): Promise<ActionResult<string>> {
  const admin = await getPushAdmin()
  if (!admin) return { success: false, error: 'Permission insuffisante' }

  const invalid = validateMessage(message)
  if (invalid) return { success: false, error: invalid }

  const { data, error } = await createAdminClient().rpc('send_push_campaign', rpcArgs(message, admin.id))

  if (error) {
    console.error('Error sending push campaign:', error)
    return {
      success: false,
      error: error.message.includes(NO_AUDIENCE_ERROR)
        ? 'Aucun membre joignable ne correspond à ces critères'
        : "Erreur lors de l'envoi de la campagne",
    }
  }

  revalidatePath('/notifications')
  return { success: true, data: data as string }
}

/**
 * Sends the message to the app accounts behind the given emails only, ignoring the
 * filters. Fails without sending when an email has no account or no push token.
 */
export async function sendPushTest(
  message: PushMessage,
  emails: string[]
): Promise<ActionResult<string>> {
  const admin = await getPushAdmin()
  if (!admin) return { success: false, error: 'Permission insuffisante' }

  const invalid = validateMessage(message)
  if (invalid) return { success: false, error: invalid }

  const normalized = [...new Set(emails.map((email) => email.trim().toLowerCase()).filter(Boolean))]
  if (normalized.length === 0) return { success: false, error: 'Ajoutez au moins un email de test' }
  if (normalized.length > 10) return { success: false, error: '10 comptes de test maximum' }

  const supabase = createAdminClient()
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('id, email, tokenPush')
    .in('email', normalized)

  if (usersError) {
    console.error('Error fetching push test accounts:', usersError)
    return { success: false, error: 'Impossible de retrouver les comptes de test' }
  }

  const unknown = normalized.filter((email) => !users?.some((user) => user.email.toLowerCase() === email))
  if (unknown.length > 0) return { success: false, error: `Compte introuvable : ${unknown.join(', ')}` }

  const unreachable = (users ?? []).filter((user) => !user.tokenPush).map((user) => user.email)
  if (unreachable.length > 0) {
    return {
      success: false,
      error: `Notifications désactivées dans l'app pour : ${unreachable.join(', ')}`,
    }
  }

  const { data, error } = await supabase.rpc('send_push_campaign', {
    ...rpcArgs(message, admin.id),
    p_test_user_ids: (users ?? []).map((user) => user.id),
  })

  if (error) {
    console.error('Error sending push test:', error)
    return { success: false, error: "Erreur lors de l'envoi du test" }
  }

  revalidatePath('/notifications')
  return { success: true, data: data as string }
}

const CAMPAIGN_COLUMNS = `
  id, category, title_fr, body_fr, title_en, body_en, url, filters, is_test, status,
  recipients, sent_count, failed_count, error_message, created_at, completed_at,
  creator:admin_users (email, full_name)
`

export async function getPushCampaign(id: string): Promise<ActionResult<PushCampaign>> {
  if (!(await getPushAdmin())) return { success: false, error: 'Permission insuffisante' }

  const { data, error } = await createAdminClient()
    .from('push_campaigns')
    .select(CAMPAIGN_COLUMNS)
    .eq('id', id)
    .single()

  if (error || !data) return { success: false, error: 'Campagne introuvable' }
  return { success: true, data: data as unknown as PushCampaign }
}

export async function getPushCampaigns(limit = 20): Promise<ActionResult<PushCampaign[]>> {
  if (!(await getPushAdmin())) return { success: false, error: 'Permission insuffisante' }

  const { data, error } = await createAdminClient()
    .from('push_campaigns')
    .select(CAMPAIGN_COLUMNS)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching push campaigns:', error)
    return { success: false, error: "Impossible de charger l'historique" }
  }

  return { success: true, data: (data ?? []) as unknown as PushCampaign[] }
}
