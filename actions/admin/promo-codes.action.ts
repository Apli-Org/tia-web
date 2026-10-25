'use server'

import { getAuthorizedAdmin, requireAdminAction, PERMISSION_DENIED } from '@/lib/auth/admin-guard'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

// Types
export type PromoCode = {
  id: string
  code: string
  discount_percent: number
  valid_from: string | null
  valid_until: string | null
  max_uses: number | null
  current_uses: number
  is_active: boolean
  min_amount: number | null
  applicable_products: string[] | null
  description: string | null
  created_at: string
  updated_at: string
  created_by: string | null
  creator?: {
    email: string
    full_name: string | null
  }
}

export type PromoCodeUsage = {
  id: string
  promo_code_id: string
  user_id: string
  transaction_id: string | null
  original_amount: number
  discount_amount: number
  final_amount: number
  created_at: string
  user?: {
    email: string
    firstName: string | null
  }
}

export type PromoCodeStats = {
  totalCodes: number
  activeCodes: number
  totalUsages: number
  totalDiscountGiven: number
}

export type PromoCodeFilters = {
  search?: string
  status?: 'all' | 'active' | 'inactive' | 'expired'
  page?: number
  limit?: number
}

// Get all promo codes with filters
export async function getPromoCodes(
  filters: PromoCodeFilters = {}
): Promise<{ codes: PromoCode[]; total: number }> {
  await requireAdminAction('manage_promo_codes')

  const supabase = createAdminClient()
  const { search, status = 'all', page = 1, limit = 10 } = filters
  const offset = (page - 1) * limit

  let query = supabase
    .from('promo_codes')
    .select(`
      *,
      creator:admin_users!created_by(email, full_name)
    `, { count: 'exact' })

  // Apply search filter
  if (search) {
    query = query.ilike('code', `%${search}%`)
  }

  // Apply status filter
  const now = new Date().toISOString()
  if (status === 'active') {
    query = query
      .eq('is_active', true)
      .or(`valid_until.is.null,valid_until.gte.${now}`)
  } else if (status === 'inactive') {
    query = query.eq('is_active', false)
  } else if (status === 'expired') {
    query = query.lt('valid_until', now)
  }

  // Apply pagination and ordering
  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching promo codes:', error)
    return { codes: [], total: 0 }
  }

  return {
    codes: data as PromoCode[],
    total: count ?? 0,
  }
}

// Get a single promo code by ID
export async function getPromoCodeById(id: string): Promise<PromoCode | null> {
  await requireAdminAction('manage_promo_codes')

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('promo_codes')
    .select(`
      *,
      creator:admin_users!created_by(email, full_name)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching promo code:', error)
    return null
  }

  return data as PromoCode
}

// Get promo code usages
export async function getPromoCodeUsages(
  promoCodeId: string,
  limit = 50
): Promise<PromoCodeUsage[]> {
  await requireAdminAction('manage_promo_codes')

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('promo_code_usages')
    .select(`
      *,
      user:users!user_id(email, firstName)
    `)
    .eq('promo_code_id', promoCodeId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching promo code usages:', error)
    return []
  }

  return data as PromoCodeUsage[]
}

// Create a new promo code
export async function createPromoCode(
  promoCode: Omit<PromoCode, 'id' | 'created_at' | 'updated_at' | 'current_uses' | 'creator' | 'created_by'>
): Promise<{ success: boolean; error?: string; id?: string }> {
  const admin = await getAuthorizedAdmin('manage_promo_codes')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  const supabase = createAdminClient()

  // Check if code already exists
  const { data: existing } = await supabase
    .from('promo_codes')
    .select('id')
    .eq('code', promoCode.code.toUpperCase())
    .single()

  if (existing) {
    return { success: false, error: 'Ce code promo existe déjà' }
  }

  const { data, error } = await supabase
    .from('promo_codes')
    .insert({
      ...promoCode,
      code: promoCode.code.toUpperCase(),
      current_uses: 0,
      created_by: admin.id,
    })
    .select('id')
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  // Log the action
  await supabase.from('admin_activity_logs').insert({
    admin_id: admin.id,
    action: 'promo_code_created',
    details: {
      promo_code_id: data.id,
      code: promoCode.code.toUpperCase(),
      discount_percent: promoCode.discount_percent,
    },
  })

  revalidatePath('/promo-codes')
  return { success: true, id: data.id }
}

// Update a promo code
export async function updatePromoCode(
  id: string,
  updates: Partial<Omit<PromoCode, 'id' | 'created_at' | 'updated_at' | 'creator' | 'created_by'>>
): Promise<{ success: boolean; error?: string }> {
  const admin = await getAuthorizedAdmin('manage_promo_codes')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  const supabase = createAdminClient()

  // Get current values for logging
  const { data: currentCode, error: fetchError } = await supabase
    .from('promo_codes')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchError || !currentCode) {
    return { success: false, error: 'Code promo non trouvé' }
  }

  // If code is being changed, check for duplicates
  if (updates.code && updates.code.toUpperCase() !== currentCode.code) {
    const { data: existing } = await supabase
      .from('promo_codes')
      .select('id')
      .eq('code', updates.code.toUpperCase())
      .single()

    if (existing) {
      return { success: false, error: 'Ce code promo existe déjà' }
    }
  }

  const updateData = {
    ...updates,
    ...(updates.code && { code: updates.code.toUpperCase() }),
    updated_at: new Date().toISOString(),
  }

  const { error: updateError } = await supabase
    .from('promo_codes')
    .update(updateData)
    .eq('id', id)

  if (updateError) {
    return { success: false, error: updateError.message }
  }

  // Log the action
  await supabase.from('admin_activity_logs').insert({
    admin_id: admin.id,
    action: 'promo_code_updated',
    details: {
      promo_code_id: id,
      code: currentCode.code,
      previous_values: currentCode,
      new_values: updateData,
    },
  })

  revalidatePath('/promo-codes')
  return { success: true }
}

// Toggle promo code active status
export async function togglePromoCodeStatus(
  id: string,
  isActive: boolean
): Promise<{ success: boolean; error?: string }> {
  const admin = await getAuthorizedAdmin('manage_promo_codes')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  const supabase = createAdminClient()

  const { data: currentCode, error: fetchError } = await supabase
    .from('promo_codes')
    .select('code')
    .eq('id', id)
    .single()

  if (fetchError || !currentCode) {
    return { success: false, error: 'Code promo non trouvé' }
  }

  const { error } = await supabase
    .from('promo_codes')
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  // Log the action
  await supabase.from('admin_activity_logs').insert({
    admin_id: admin.id,
    action: isActive ? 'promo_code_activated' : 'promo_code_deactivated',
    details: {
      promo_code_id: id,
      code: currentCode.code,
    },
  })

  revalidatePath('/promo-codes')
  return { success: true }
}

// Delete a promo code (soft delete - deactivate)
export async function deletePromoCode(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const admin = await getAuthorizedAdmin('manage_promo_codes')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  const supabase = createAdminClient()

  const { data: currentCode, error: fetchError } = await supabase
    .from('promo_codes')
    .select('code, current_uses')
    .eq('id', id)
    .single()

  if (fetchError || !currentCode) {
    return { success: false, error: 'Code promo non trouvé' }
  }

  // If the code has been used, just deactivate it
  if (currentCode.current_uses > 0) {
    const { error } = await supabase
      .from('promo_codes')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      return { success: false, error: error.message }
    }
  } else {
    // If never used, we can delete it
    const { error } = await supabase
      .from('promo_codes')
      .delete()
      .eq('id', id)

    if (error) {
      return { success: false, error: error.message }
    }
  }

  // Log the action
  await supabase.from('admin_activity_logs').insert({
    admin_id: admin.id,
    action: 'promo_code_deleted',
    details: {
      promo_code_id: id,
      code: currentCode.code,
      was_used: currentCode.current_uses > 0,
    },
  })

  revalidatePath('/promo-codes')
  return { success: true }
}

// Get promo code statistics
export async function getPromoCodeStats(): Promise<PromoCodeStats> {
  await requireAdminAction('manage_promo_codes')

  const supabase = createAdminClient()
  const now = new Date().toISOString()

  const [
    totalResult,
    activeResult,
    usagesResult,
    discountResult,
  ] = await Promise.all([
    // Total codes
    supabase
      .from('promo_codes')
      .select('id', { count: 'exact', head: true }),
    // Active codes (not expired and is_active = true)
    supabase
      .from('promo_codes')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true)
      .or(`valid_until.is.null,valid_until.gte.${now}`),
    // Total usages
    supabase
      .from('promo_code_usages')
      .select('id', { count: 'exact', head: true }),
    // Total discount given
    supabase
      .from('promo_code_usages')
      .select('discount_amount'),
  ])

  const totalDiscountGiven = discountResult.data?.reduce(
    (sum, u) => sum + (u.discount_amount || 0),
    0
  ) ?? 0

  return {
    totalCodes: totalResult.count ?? 0,
    activeCodes: activeResult.count ?? 0,
    totalUsages: usagesResult.count ?? 0,
    totalDiscountGiven,
  }
}

