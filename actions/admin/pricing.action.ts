'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

// Types
export type PricingConfig = {
  id: string
  product_type: 'subscription' | 'consumable'
  product_code: string
  name: string
  description: string | null
  tier: 'silver' | 'gold' | 'elite' | null
  duration_months: number | null
  consumable_type: 'tia_heart' | 'boost' | 'reveal_like' | null
  quantity: number | null
  price: number
  original_price: number | null
  currency: string
  features: string[]
  is_active: boolean
  is_featured: boolean
  sort_order: number
  valid_from: string | null
  valid_until: string | null
  created_at: string
  updated_at: string
}

export type PricingHistory = {
  id: string
  pricing_config_id: string
  action: 'created' | 'updated' | 'activated' | 'deactivated' | 'deleted'
  previous_price: number | null
  new_price: number | null
  previous_values: Record<string, unknown> | null
  new_values: Record<string, unknown> | null
  changed_by: string | null
  change_reason: string | null
  created_at: string
  admin?: {
    email: string
    full_name: string | null
  }
}

export type PricingStats = {
  // Catalog stats
  totalProducts: number
  activeProducts: number
  // Real sales stats
  totalSubscriptions: number
  totalMicroPurchases: number
  subscriptionRevenue: number
  consumableRevenue: number
}

// Get all subscription pricing
export async function getSubscriptionPricing(): Promise<PricingConfig[]> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('pricing_config')
    .select('*')
    .eq('product_type', 'subscription')
    .order('tier')
    .order('duration_months')

  if (error) {
    console.error('Error fetching subscription pricing:', error)
    return []
  }

  return data as PricingConfig[]
}

// Get all consumable pricing
export async function getConsumablePricing(): Promise<PricingConfig[]> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('pricing_config')
    .select('*')
    .eq('product_type', 'consumable')
    .order('consumable_type')
    .order('quantity')

  if (error) {
    console.error('Error fetching consumable pricing:', error)
    return []
  }

  return data as PricingConfig[]
}

// Get a single pricing config by ID
export async function getPricingById(id: string): Promise<PricingConfig | null> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('pricing_config')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching pricing:', error)
    return null
  }

  return data as PricingConfig
}

// Update pricing config
export async function updatePricing(
  id: string,
  updates: Partial<Omit<PricingConfig, 'id' | 'created_at' | 'updated_at'>>,
  adminId: string,
  reason?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  // Get current values for history
  const { data: currentPricing, error: fetchError } = await supabase
    .from('pricing_config')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchError || !currentPricing) {
    return { success: false, error: 'Tarif non trouvé' }
  }

  // Update the pricing
  const { error: updateError } = await supabase
    .from('pricing_config')
    .update(updates)
    .eq('id', id)

  if (updateError) {
    return { success: false, error: updateError.message }
  }

  // Log the change in history
  await supabase.from('pricing_history').insert({
    pricing_config_id: id,
    action: 'updated',
    previous_price: currentPricing.price,
    new_price: updates.price ?? currentPricing.price,
    previous_values: currentPricing,
    new_values: { ...currentPricing, ...updates },
    changed_by: adminId,
    change_reason: reason,
  })

  revalidatePath('/pricing')
  revalidatePath('/pricing/subscriptions')
  revalidatePath('/pricing/consumables')

  return { success: true }
}

// Create new pricing config
export async function createPricing(
  pricing: Omit<PricingConfig, 'id' | 'created_at' | 'updated_at'>,
  adminId: string
): Promise<{ success: boolean; error?: string; id?: string }> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('pricing_config')
    .insert({
      ...pricing,
      created_by: adminId,
    })
    .select('id')
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  // Log the creation in history
  await supabase.from('pricing_history').insert({
    pricing_config_id: data.id,
    action: 'created',
    new_price: pricing.price,
    new_values: pricing,
    changed_by: adminId,
  })

  revalidatePath('/pricing')
  revalidatePath('/pricing/subscriptions')
  revalidatePath('/pricing/consumables')

  return { success: true, id: data.id }
}

// Toggle pricing active status
export async function togglePricingStatus(
  id: string,
  isActive: boolean,
  adminId: string,
  reason?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('pricing_config')
    .update({ is_active: isActive })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  // Log the status change
  await supabase.from('pricing_history').insert({
    pricing_config_id: id,
    action: isActive ? 'activated' : 'deactivated',
    changed_by: adminId,
    change_reason: reason,
  })

  revalidatePath('/pricing')
  revalidatePath('/pricing/subscriptions')
  revalidatePath('/pricing/consumables')

  return { success: true }
}

// Delete pricing config (soft delete - just deactivate)
export async function deletePricing(
  id: string,
  adminId: string,
  reason?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  // We don't actually delete, just deactivate
  const { error } = await supabase
    .from('pricing_config')
    .update({ is_active: false })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  // Log the deletion
  await supabase.from('pricing_history').insert({
    pricing_config_id: id,
    action: 'deleted',
    changed_by: adminId,
    change_reason: reason,
  })

  revalidatePath('/pricing')
  revalidatePath('/pricing/subscriptions')
  revalidatePath('/pricing/consumables')

  return { success: true }
}

// Get pricing history for a specific config
export async function getPricingHistory(
  pricingId: string,
  limit = 50
): Promise<PricingHistory[]> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('pricing_history')
    .select(`
      *,
      admin:admin_users!changed_by(email, full_name)
    `)
    .eq('pricing_config_id', pricingId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching pricing history:', error)
    return []
  }

  return data as PricingHistory[]
}

// Get all pricing history (for history page)
export async function getAllPricingHistory(
  page = 1,
  limit = 20
): Promise<{ history: PricingHistory[]; total: number }> {
  const supabase = createAdminClient()
  const offset = (page - 1) * limit

  const { data, error, count } = await supabase
    .from('pricing_history')
    .select(`
      *,
      admin:admin_users!changed_by(email, full_name),
      pricing:pricing_config!pricing_config_id(name, product_code)
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching all pricing history:', error)
    return { history: [], total: 0 }
  }

  return {
    history: data as PricingHistory[],
    total: count ?? 0,
  }
}

// Get pricing statistics
export async function getPricingStats(): Promise<PricingStats> {
  const supabase = createAdminClient()

  // Use current calendar month (same as dashboard)
  const now = new Date()
  const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0))

  const [
    productsResult,
    activeProductsResult,
    subscriptionsResult,
    microPurchasesResult,
    subRevenueResult,
    microRevenueResult,
  ] = await Promise.all([
    // Total products in catalog
    supabase
      .from('pricing_config')
      .select('id', { count: 'exact', head: true }),
    // Active products in catalog
    supabase
      .from('pricing_config')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true),
    // Real subscriptions count (this month)
    supabase
      .from('subscriptions')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', startOfMonth.toISOString()),
    // Real micro purchases count (this month)
    supabase
      .from('micro_purchases')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'completed')
      .gte('created_at', startOfMonth.toISOString()),
    // Subscription revenue (this month)
    supabase
      .from('subscriptions')
      .select('amount_paid')
      .gte('created_at', startOfMonth.toISOString()),
    // Micro purchases revenue (this month)
    supabase
      .from('micro_purchases')
      .select('price_paid')
      .eq('status', 'completed')
      .gte('created_at', startOfMonth.toISOString()),
  ])

  const subscriptionRevenue = subRevenueResult.data?.reduce((sum, s) => sum + (s.amount_paid || 0), 0) ?? 0
  const consumableRevenue = microRevenueResult.data?.reduce((sum, m) => sum + (m.price_paid || 0), 0) ?? 0

  return {
    totalProducts: productsResult.count ?? 0,
    activeProducts: activeProductsResult.count ?? 0,
    totalSubscriptions: subscriptionsResult.count ?? 0,
    totalMicroPurchases: microPurchasesResult.count ?? 0,
    subscriptionRevenue,
    consumableRevenue,
  }
}

export async function getTestMode(): Promise<boolean> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('app_config')
    .select('value')
    .eq('key', 'test_mode_enabled')
    .single()

  if (error) {
    console.error('Error fetching test mode:', error)
    return false
  }

  return data?.value ?? false
}

export async function toggleTestMode(
  enabled: boolean,
  adminId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('app_config')
    .update({ value: enabled })
    .eq('key', 'test_mode_enabled')

  if (error) {
    return { success: false, error: error.message }
  }

  await supabase.from('admin_activity_logs').insert({
    admin_id: adminId,
    action: enabled ? 'test_mode_enabled' : 'test_mode_disabled',
    details: { test_mode_enabled: enabled },
  })

  revalidatePath('/pricing')
  revalidatePath('/pricing/subscriptions')
  revalidatePath('/pricing/consumables')

  return { success: true }
}

