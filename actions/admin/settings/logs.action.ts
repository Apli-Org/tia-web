'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import type { ActivityLog, ActivityFilters, ActivityStats, PaginatedLogs } from './types'

export async function getActivityStats(): Promise<ActivityStats> {
  const supabase = createAdminClient()

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const [totalResult, todayResult, weekResult, actionsResult, adminsResult] = await Promise.all([
    supabase.from('admin_activity_logs').select('id', { count: 'exact', head: true }),
    supabase.from('admin_activity_logs').select('id', { count: 'exact', head: true }).gte('created_at', todayStart),
    supabase.from('admin_activity_logs').select('id', { count: 'exact', head: true }).gte('created_at', weekStart),
    supabase.from('admin_activity_logs').select('action'),
    supabase.from('admin_activity_logs').select('admin_id, admin_users(full_name, email)'),
  ])

  const actionCounts: Record<string, number> = {}
  for (const log of actionsResult.data || []) {
    actionCounts[log.action] = (actionCounts[log.action] || 0) + 1
  }

  const topActions = Object.entries(actionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([action, count]) => ({ action, count }))

  const adminCounts: Record<string, { name: string; count: number }> = {}
  for (const log of adminsResult.data || []) {
    if (log.admin_id) {
      if (!adminCounts[log.admin_id]) {
        const adminInfo = log.admin_users as unknown as { full_name: string | null; email: string } | null
        adminCounts[log.admin_id] = {
          name: adminInfo?.full_name || adminInfo?.email || 'Admin inconnu',
          count: 0,
        }
      }
      adminCounts[log.admin_id].count++
    }
  }

  const topAdmins = Object.entries(adminCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([admin_id, { name, count }]) => ({ admin_id, admin_name: name, count }))

  return {
    total: totalResult.count || 0,
    todayCount: todayResult.count || 0,
    weekCount: weekResult.count || 0,
    topActions,
    topAdmins,
  }
}

export async function getActivityLogs(
  page: number = 1,
  pageSize: number = 50,
  filters: ActivityFilters = {}
): Promise<PaginatedLogs> {
  const supabase = createAdminClient()
  const offset = (page - 1) * pageSize

  let query = supabase
    .from('admin_activity_logs')
    .select(`
      id, admin_id, action, details, created_at,
      admin_users:admin_id (id, full_name, email)
    `, { count: 'exact' })

  if (filters.admin_id && filters.admin_id !== 'all') {
    query = query.eq('admin_id', filters.admin_id)
  }

  if (filters.action && filters.action !== 'all') {
    query = query.eq('action', filters.action)
  }

  if (filters.dateFrom) {
    query = query.gte('created_at', filters.dateFrom)
  }

  if (filters.dateTo) {
    query = query.lte('created_at', filters.dateTo)
  }

  if (filters.search) {
    query = query.or(`action.ilike.%${filters.search}%`)
  }

  query = query.order('created_at', { ascending: false })
  query = query.range(offset, offset + pageSize - 1)

  const { data, count, error } = await query

  if (error) {
    console.error('Error fetching activity logs:', error)
    return {
      logs: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0,
    }
  }

  const logs: ActivityLog[] = (data || []).map((log) => ({
    id: log.id,
    admin_id: log.admin_id,
    action: log.action,
    details: log.details as Record<string, unknown> | null,
    created_at: log.created_at ?? '',
    admin: log.admin_users as unknown as ActivityLog['admin'],
  }))

  const total = count ?? 0

  return {
    logs,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getDistinctActions(): Promise<string[]> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('admin_activity_logs')
    .select('action')

  if (error) {
    console.error('Error fetching distinct actions:', error)
    return []
  }

  const actions = [...new Set(data.map((d) => d.action))]
  return actions.sort()
}

export async function getAdminsForFilter(): Promise<Array<{ id: string; name: string }>> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('admin_users')
    .select('id, full_name, email')
    .order('full_name')

  if (error) {
    console.error('Error fetching admins:', error)
    return []
  }

  return data.map((admin) => ({
    id: admin.id,
    name: admin.full_name || admin.email,
  }))
}
