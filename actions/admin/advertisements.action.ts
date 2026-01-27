'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import type {
  Advertisement,
  AdvertisementWithStats,
  AdClick,
  AdStats,
  AdvertisementFilters,
  CreateAdvertisementData,
  UpdateAdvertisementData,
  AdvertisementListResult,
  AdvertisementStatsResult,
} from '@/lib/types/advertisements.types'

// Get all advertisements with filters and stats
export async function getAdvertisements(
  filters: AdvertisementFilters = {}
): Promise<AdvertisementListResult> {
  const supabase = createAdminClient()
  const { search, status = 'all', page = 1, limit = 10 } = filters
  const offset = (page - 1) * limit

  let query = supabase
    .from('advertisements')
    .select('*', { count: 'exact' })

  // Apply search filter
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
  }

  // Apply status filter
  if (status === 'active') {
    query = query.eq('is_active', true)
  } else if (status === 'inactive') {
    query = query.eq('is_active', false)
  }

  // Apply pagination and ordering
  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching advertisements:', error)
    return { data: [], total: 0, page, limit, totalPages: 0 }
  }

  // Get stats for each advertisement
  const adsWithStats: AdvertisementWithStats[] = await Promise.all(
    (data || []).map(async (ad) => {
      const [impressionsResult, clicksResult, uniqueUsersResult] = await Promise.all([
        supabase
          .from('ad_impressions')
          .select('id', { count: 'exact', head: true })
          .eq('ad_id', ad.id),
        supabase
          .from('ad_clicks')
          .select('id', { count: 'exact', head: true })
          .eq('ad_id', ad.id),
        supabase
          .from('ad_clicks')
          .select('user_id')
          .eq('ad_id', ad.id)
          .not('user_id', 'is', null),
      ])

      const impressions = impressionsResult.count ?? 0
      const clicks = clicksResult.count ?? 0
      const uniqueUsers = new Set(uniqueUsersResult.data?.map(c => c.user_id)).size

      return {
        ...ad,
        impressions_count: impressions,
        clicks_count: clicks,
        unique_users: uniqueUsers,
        ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
      }
    })
  )

  const total = count ?? 0
  return {
    data: adsWithStats,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}

// Get a single advertisement by ID
export async function getAdvertisementById(id: string): Promise<Advertisement | null> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('advertisements')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching advertisement:', error)
    return null
  }

  return data as Advertisement
}

// Get detailed statistics for an advertisement
export async function getAdvertisementStats(id: string): Promise<AdStats | null> {
  const supabase = createAdminClient()

  // Get total counts
  const [impressionsResult, clicksResult] = await Promise.all([
    supabase
      .from('ad_impressions')
      .select('id, user_id, session_id, created_at')
      .eq('ad_id', id),
    supabase
      .from('ad_clicks')
      .select(`
        id, user_id, session_id, referrer, created_at,
        user:users!ad_clicks_user_id_fkey(id, email, firstName)
      `)
      .eq('ad_id', id)
      .order('created_at', { ascending: false }),
  ])

  if (impressionsResult.error || clicksResult.error) {
    console.error('Error fetching ad stats:', impressionsResult.error || clicksResult.error)
    return null
  }

  const impressions = impressionsResult.data || []
  const clicks = clicksResult.data || []

  // Calculate unique counts
  const uniqueImpressionUsers = new Set(impressions.filter(i => i.user_id).map(i => i.user_id)).size
  const uniqueImpressionSessions = new Set(impressions.filter(i => i.session_id).map(i => i.session_id)).size
  const uniqueClickUsers = new Set(clicks.filter(c => c.user_id).map(c => c.user_id)).size
  const uniqueClickSessions = new Set(clicks.filter(c => c.session_id).map(c => c.session_id)).size

  // Calculate impressions by day
  const impressionsByDay = impressions.reduce((acc, imp) => {
    const date = new Date(imp.created_at).toISOString().split('T')[0]
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Calculate clicks by day
  const clicksByDay = clicks.reduce((acc, click) => {
    const date = new Date(click.created_at).toISOString().split('T')[0]
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Get top referrers
  const referrerCounts = clicks
    .filter(c => c.referrer)
    .reduce((acc, click) => {
      const referrer = click.referrer || 'Direct'
      acc[referrer] = (acc[referrer] || 0) + 1
      return acc
    }, {} as Record<string, number>)

  const topReferrers = Object.entries(referrerCounts)
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Format recent clicks with user info
  const recentClicks: AdClick[] = clicks.slice(0, 20).map(click => {
    // Handle Supabase join result (can be object or array)
    const userData = Array.isArray(click.user) ? click.user[0] : click.user
    return {
      id: click.id,
      ad_id: id,
      user_id: click.user_id,
      session_id: click.session_id,
      ip_address: null,
      user_agent: null,
      referrer: click.referrer,
      created_at: click.created_at,
      user: userData ? {
        id: userData.id,
        email: userData.email,
        full_name: userData.firstName,
      } : undefined,
    }
  })

  const totalImpressions = impressions.length
  const totalClicks = clicks.length

  return {
    total_impressions: totalImpressions,
    total_clicks: totalClicks,
    unique_impressions: uniqueImpressionUsers + uniqueImpressionSessions,
    unique_clicks: uniqueClickUsers + uniqueClickSessions,
    ctr: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
    impressions_by_day: Object.entries(impressionsByDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date)),
    clicks_by_day: Object.entries(clicksByDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date)),
    top_referrers: topReferrers,
    recent_clicks: recentClicks,
  }
}

// Create a new advertisement
export async function createAdvertisement(
  data: CreateAdvertisementData,
  adminId: string
): Promise<{ success: boolean; error?: string; id?: string }> {
  const supabase = createAdminClient()

  const { data: newAd, error } = await supabase
    .from('advertisements')
    .insert({
      title: data.title,
      description: data.description || null,
      image_url: data.image_url,
      target_url: data.target_url || null,
      is_active: data.is_active ?? true,
      start_date: data.start_date || null,
      end_date: data.end_date || null,
      created_by: adminId,
    })
    .select('id')
    .single()

  if (error) {
    console.error('Error creating advertisement:', error)
    return { success: false, error: error.message }
  }

  // Log the action
  await supabase.from('admin_activity_logs').insert({
    admin_id: adminId,
    action: 'advertisement_created',
    details: {
      advertisement_id: newAd.id,
      title: data.title,
    },
  })

  revalidatePath('/advertisements')
  return { success: true, id: newAd.id }
}

// Update an advertisement
export async function updateAdvertisement(
  data: UpdateAdvertisementData,
  adminId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  const { id, ...updates } = data

  // Get current values for logging
  const { data: currentAd, error: fetchError } = await supabase
    .from('advertisements')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchError || !currentAd) {
    return { success: false, error: 'Publicité non trouvée' }
  }

  const { error: updateError } = await supabase
    .from('advertisements')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (updateError) {
    console.error('Error updating advertisement:', updateError)
    return { success: false, error: updateError.message }
  }

  // Log the action
  await supabase.from('admin_activity_logs').insert({
    admin_id: adminId,
    action: 'advertisement_updated',
    details: {
      advertisement_id: id,
      title: currentAd.title,
      changes: updates,
    },
  })

  revalidatePath('/advertisements')
  return { success: true }
}

// Toggle advertisement active status
export async function toggleAdvertisementStatus(
  id: string,
  isActive: boolean,
  adminId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  const { data: currentAd, error: fetchError } = await supabase
    .from('advertisements')
    .select('title')
    .eq('id', id)
    .single()

  if (fetchError || !currentAd) {
    return { success: false, error: 'Publicité non trouvée' }
  }

  const { error } = await supabase
    .from('advertisements')
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    console.error('Error toggling advertisement status:', error)
    return { success: false, error: error.message }
  }

  // Log the action
  await supabase.from('admin_activity_logs').insert({
    admin_id: adminId,
    action: isActive ? 'advertisement_activated' : 'advertisement_deactivated',
    details: {
      advertisement_id: id,
      title: currentAd.title,
    },
  })

  revalidatePath('/advertisements')
  return { success: true }
}

// Delete an advertisement
export async function deleteAdvertisement(
  id: string,
  adminId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  const { data: currentAd, error: fetchError } = await supabase
    .from('advertisements')
    .select('title')
    .eq('id', id)
    .single()

  if (fetchError || !currentAd) {
    return { success: false, error: 'Publicité non trouvée' }
  }

  // Check if ad has statistics (soft delete) or can be hard deleted
  const { count: statsCount } = await supabase
    .from('ad_clicks')
    .select('id', { count: 'exact', head: true })
    .eq('ad_id', id)

  if (statsCount && statsCount > 0) {
    // Soft delete - just deactivate
    const { error } = await supabase
      .from('advertisements')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      return { success: false, error: error.message }
    }
  } else {
    // Hard delete
    const { error } = await supabase
      .from('advertisements')
      .delete()
      .eq('id', id)

    if (error) {
      return { success: false, error: error.message }
    }
  }

  // Log the action
  await supabase.from('admin_activity_logs').insert({
    admin_id: adminId,
    action: 'advertisement_deleted',
    details: {
      advertisement_id: id,
      title: currentAd.title,
      soft_deleted: (statsCount ?? 0) > 0,
    },
  })

  revalidatePath('/advertisements')
  return { success: true }
}

// Get overall statistics for the dashboard
export async function getAdvertisementDashboardStats(): Promise<AdvertisementStatsResult> {
  const supabase = createAdminClient()

  const [
    totalResult,
    activeResult,
    impressionsResult,
    clicksResult,
  ] = await Promise.all([
    supabase
      .from('advertisements')
      .select('id', { count: 'exact', head: true }),
    supabase
      .from('advertisements')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true),
    supabase
      .from('ad_impressions')
      .select('id', { count: 'exact', head: true }),
    supabase
      .from('ad_clicks')
      .select('id', { count: 'exact', head: true }),
  ])

  const totalImpressions = impressionsResult.count ?? 0
  const totalClicks = clicksResult.count ?? 0

  return {
    total_ads: totalResult.count ?? 0,
    active_ads: activeResult.count ?? 0,
    total_impressions: totalImpressions,
    total_clicks: totalClicks,
    overall_ctr: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
  }
}

// Upload advertisement image
export async function uploadAdvertisementImage(
  formData: FormData,
  adminId: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  const supabase = createAdminClient()

  const file = formData.get('file') as File
  if (!file) {
    return { success: false, error: 'Aucun fichier fourni' }
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return { success: false, error: 'Type de fichier non autorisé. Utilisez JPEG, PNG, WebP ou GIF.' }
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return { success: false, error: 'Fichier trop volumineux. Maximum 5MB.' }
  }

  // Generate unique filename
  const ext = file.name.split('.').pop()
  const filename = `${crypto.randomUUID()}.${ext}`

  // Convert file to buffer for Vercel compatibility
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  const { error: uploadError } = await supabase.storage
    .from('advertisements')
    .upload(filename, buffer, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    console.error('Error uploading advertisement image:', uploadError)
    return { success: false, error: uploadError.message }
  }

  const { data: { publicUrl } } = supabase.storage
    .from('advertisements')
    .getPublicUrl(filename)

  // Log the upload
  await supabase.from('admin_activity_logs').insert({
    admin_id: adminId,
    action: 'advertisement_image_uploaded',
    details: { filename, url: publicUrl },
  })

  return { success: true, url: publicUrl }
}

// Delete advertisement image from storage
export async function deleteAdvertisementImage(
  imageUrl: string,
  adminId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  // Extract filename from URL
  const urlParts = imageUrl.split('/')
  const filename = urlParts[urlParts.length - 1]

  const { error } = await supabase.storage
    .from('advertisements')
    .remove([filename])

  if (error) {
    console.error('Error deleting advertisement image:', error)
    return { success: false, error: error.message }
  }

  // Log the deletion
  await supabase.from('admin_activity_logs').insert({
    admin_id: adminId,
    action: 'advertisement_image_deleted',
    details: { filename },
  })

  return { success: true }
}
