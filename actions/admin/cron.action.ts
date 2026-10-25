'use server'

import { getAuthorizedAdmin, requireAdminAction, PERMISSION_DENIED } from '@/lib/auth/admin-guard'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export type CronSetting = {
  id: string
  key: string
  value: string
  description: string | null
  is_enabled: boolean
  updated_at: string
  updated_by: string | null
}

export type PassedProfilesStats = {
  totalPassed: number
  toBeReset: number
  resetDays: number
}

export async function getCronSettings(): Promise<CronSetting[]> {
  await requireAdminAction('manage_cron_settings')

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('cron_config')
    .select('*')
    .order('key')

  if (error) {
    console.error('Error fetching cron settings:', error)
    return []
  }

  return data || []
}

export async function updateCronSetting(
  key: string,
  value: string,
  isEnabled?: boolean
): Promise<{ success: boolean; error?: string }> {
  const admin = await getAuthorizedAdmin('manage_cron_settings')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  const supabase = createAdminClient()

  // Get current value for logging
  const { data: current } = await supabase
    .from('cron_config')
    .select('value, is_enabled')
    .eq('key', key)
    .single()

  const updateData: Record<string, unknown> = {
    value,
    updated_at: new Date().toISOString(),
    updated_by: admin.id,
  }

  if (isEnabled !== undefined) {
    updateData.is_enabled = isEnabled
  }

  const { error } = await supabase
    .from('cron_config')
    .update(updateData)
    .eq('key', key)

  if (error) {
    console.error('Error updating cron setting:', error)
    return { success: false, error: 'Erreur lors de la mise à jour' }
  }

  // Log activity
  await supabase.from('admin_activity_logs').insert({
    admin_id: admin.id,
    action: 'cron_settings_updated',
    details: {
      key,
      previous_value: current?.value,
      new_value: value,
      previous_enabled: current?.is_enabled,
      new_enabled: isEnabled,
    },
  })

  revalidatePath('/moderation/passed-profiles')
  return { success: true }
}

export async function getPassedProfilesStats(): Promise<PassedProfilesStats> {
  await requireAdminAction('manage_cron_settings')

  const supabase = createAdminClient()

  // Get config
  const { data: config } = await supabase
    .from('cron_config')
    .select('value')
    .eq('key', 'reset_passed_profiles_days')
    .single()

  const resetDays = config ? parseInt(config.value, 10) : 30

  // Count total passed profiles
  const { count: totalPassed } = await supabase
    .from('passed_profiles')
    .select('*', { count: 'exact', head: true })

  // Count profiles that would be reset (older than X days)
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - resetDays)

  const { count: toBeReset } = await supabase
    .from('passed_profiles')
    .select('*', { count: 'exact', head: true })
    .lt('created_at', cutoffDate.toISOString())

  return {
    totalPassed: totalPassed || 0,
    toBeReset: toBeReset || 0,
    resetDays,
  }
}

export async function runResetNow(): Promise<{ success: boolean; deletedCount?: number; error?: string }> {
  const admin = await getAuthorizedAdmin('manage_cron_settings')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  const supabase = createAdminClient()

  // Compte avant suppression
  const { count: totalBefore } = await supabase
    .from('passed_profiles')
    .select('*', { count: 'exact', head: true })

  // Supprime TOUS les profils passés
  const { error } = await supabase
    .from('passed_profiles')
    .delete()
    .not('id', 'is', null)

  if (error) {
    console.error('Error running reset:', error)
    return { success: false, error: 'Erreur lors de la réinitialisation' }
  }

  const deletedCount = totalBefore || 0

  // Log activity
  await supabase.from('admin_activity_logs').insert({
    admin_id: admin.id,
    action: 'cron_manual_reset_passed_profiles',
    details: {
      deleted_count: deletedCount,
      triggered_manually: true,
    },
  })

  revalidatePath('/moderation/passed-profiles')
  return { success: true, deletedCount }
}
