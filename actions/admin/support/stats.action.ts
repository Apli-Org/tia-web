'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import type { SupportStats } from './types'

export async function getSupportStats(): Promise<SupportStats> {
  const supabase = createAdminClient()

  const { data: tickets, error } = await supabase
    .from('support_tickets')
    .select('status, assigned_to, created_at, resolved_at')

  if (error) {
    console.error('Error fetching support stats:', error)
    return {
      pending: 0,
      inProgress: 0,
      resolved: 0,
      closed: 0,
      unassigned: 0,
      avgResolutionHours: null,
    }
  }

  const stats: SupportStats = {
    pending: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
    unassigned: 0,
    avgResolutionHours: null,
  }

  let totalResolutionMs = 0
  let resolvedCount = 0

  for (const ticket of tickets) {
    switch (ticket.status) {
      case 'pending':
        stats.pending++
        break
      case 'in_progress':
        stats.inProgress++
        break
      case 'resolved':
        stats.resolved++
        break
      case 'closed':
        stats.closed++
        break
    }

    if (!ticket.assigned_to) {
      stats.unassigned++
    }

    if (ticket.resolved_at && ticket.created_at) {
      const created = new Date(ticket.created_at).getTime()
      const resolved = new Date(ticket.resolved_at).getTime()
      totalResolutionMs += resolved - created
      resolvedCount++
    }
  }

  if (resolvedCount > 0) {
    stats.avgResolutionHours = Math.round((totalResolutionMs / resolvedCount) / (1000 * 60 * 60))
  }

  return stats
}
