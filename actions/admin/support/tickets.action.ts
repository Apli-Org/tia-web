'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { checkAdminAction } from '../roles.action'
import type {
  SupportTicket,
  TicketFilters,
  TicketStatus,
  TicketPriority,
  PaginatedTickets,
} from './types'

async function verifyPermission(adminId: string, actionCode: string): Promise<{ allowed: boolean; error?: string }> {
  const hasPermission = await checkAdminAction(adminId, actionCode)
  if (!hasPermission) {
    return { allowed: false, error: 'Permission insuffisante' }
  }
  return { allowed: true }
}

export async function getTickets(
  page: number = 1,
  pageSize: number = 20,
  filters: TicketFilters = {}
): Promise<PaginatedTickets> {
  const supabase = createAdminClient()
  const offset = (page - 1) * pageSize

  let query = supabase
    .from('support_tickets')
    .select(`
      *,
      users:user_id (id, firstName, email),
      admin_users:assigned_to (id, full_name, email)
    `, { count: 'exact' })

  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }

  if (filters.priority && filters.priority !== 'all') {
    query = query.eq('priority', filters.priority)
  }

  if (filters.category && filters.category !== 'all') {
    query = query.eq('category', filters.category)
  }

  if (filters.assigned_to) {
    if (filters.assigned_to === 'unassigned') {
      query = query.is('assigned_to', null)
    } else if (filters.assigned_to !== 'all') {
      query = query.eq('assigned_to', filters.assigned_to)
    }
  }

  if (filters.search) {
    query = query.or(`subject.ilike.%${filters.search}%,id.ilike.%${filters.search}%`)
  }

  const sortBy = filters.sortBy || 'created_at'
  const sortOrder = filters.sortOrder || 'desc'

  if (sortBy === 'priority') {
    query = query.order('priority', { ascending: sortOrder === 'asc' })
  } else {
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })
  }

  query = query.range(offset, offset + pageSize - 1)

  const { data, count, error } = await query

  if (error) {
    console.error('Error fetching tickets:', error)
    return {
      tickets: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0,
    }
  }

  const tickets: SupportTicket[] = (data || []).map((ticket) => ({
    id: ticket.id,
    subject: ticket.subject,
    status: ticket.status as TicketStatus,
    priority: ticket.priority as TicketPriority,
    category: ticket.category,
    user_id: ticket.user_id,
    assigned_to: ticket.assigned_to,
    created_at: ticket.created_at ?? '',
    updated_at: ticket.updated_at ?? '',
    resolved_at: ticket.resolved_at,
    user: ticket.users as SupportTicket['user'],
    assignee: ticket.admin_users as SupportTicket['assignee'],
  }))

  const total = count ?? 0

  return {
    tickets,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getTicketById(id: string): Promise<SupportTicket | null> {
  const supabase = createAdminClient()

  const { data: ticket, error } = await supabase
    .from('support_tickets')
    .select(`
      *,
      users:user_id (id, firstName, email),
      admin_users:assigned_to (id, full_name, email)
    `)
    .eq('id', id)
    .single()

  if (error || !ticket) {
    console.error('Error fetching ticket:', error)
    return null
  }

  const { count: messageCount } = await supabase
    .from('ticket_messages')
    .select('id', { count: 'exact', head: true })
    .eq('ticket_id', id)

  return {
    id: ticket.id,
    subject: ticket.subject,
    status: ticket.status as TicketStatus,
    priority: ticket.priority as TicketPriority,
    category: ticket.category,
    user_id: ticket.user_id,
    assigned_to: ticket.assigned_to,
    created_at: ticket.created_at ?? '',
    updated_at: ticket.updated_at ?? '',
    resolved_at: ticket.resolved_at,
    user: ticket.users as SupportTicket['user'],
    assignee: ticket.admin_users as SupportTicket['assignee'],
    message_count: messageCount ?? 0,
  }
}

export async function assignTicket(
  ticketId: string,
  assigneeId: string | null,
  assignedBy: string
): Promise<{ success: boolean; error?: string }> {
  const permission = await verifyPermission(assignedBy, 'manage_tickets')
  if (!permission.allowed) {
    return { success: false, error: permission.error }
  }

  const supabase = createAdminClient()

  const { data: ticket } = await supabase
    .from('support_tickets')
    .select('assigned_to, status')
    .eq('id', ticketId)
    .single()

  if (!ticket) {
    return { success: false, error: 'Ticket non trouvé' }
  }

  const updates: Record<string, unknown> = {
    assigned_to: assigneeId,
    updated_at: new Date().toISOString(),
  }

  if (assigneeId && ticket.status === 'pending') {
    updates.status = 'in_progress'
  }

  const { error } = await supabase
    .from('support_tickets')
    .update(updates)
    .eq('id', ticketId)

  if (error) {
    return { success: false, error: error.message }
  }

  await supabase.from('admin_activity_logs').insert({
    admin_id: assignedBy,
    action: assigneeId ? 'assign_ticket' : 'unassign_ticket',
    details: { ticket_id: ticketId, assigned_to: assigneeId },
  })

  revalidatePath('/support')
  revalidatePath('/support/tickets')
  revalidatePath(`/support/tickets/${ticketId}`)
  return { success: true }
}

export async function updateTicketStatus(
  ticketId: string,
  status: TicketStatus,
  updatedBy: string
): Promise<{ success: boolean; error?: string }> {
  const permission = await verifyPermission(updatedBy, 'manage_tickets')
  if (!permission.allowed) {
    return { success: false, error: permission.error }
  }

  const supabase = createAdminClient()

  const { data: ticket } = await supabase
    .from('support_tickets')
    .select('status')
    .eq('id', ticketId)
    .single()

  if (!ticket) {
    return { success: false, error: 'Ticket non trouvé' }
  }

  const updates: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  }

  if (status === 'resolved' || status === 'closed') {
    updates.resolved_at = new Date().toISOString()
  }

  const { error } = await supabase
    .from('support_tickets')
    .update(updates)
    .eq('id', ticketId)

  if (error) {
    return { success: false, error: error.message }
  }

  await supabase.from('admin_activity_logs').insert({
    admin_id: updatedBy,
    action: 'update_ticket_status',
    details: { ticket_id: ticketId, previous_status: ticket.status, new_status: status },
  })

  revalidatePath('/support')
  revalidatePath('/support/tickets')
  revalidatePath(`/support/tickets/${ticketId}`)
  return { success: true }
}

export async function updateTicketPriority(
  ticketId: string,
  priority: TicketPriority,
  updatedBy: string
): Promise<{ success: boolean; error?: string }> {
  const permission = await verifyPermission(updatedBy, 'manage_tickets')
  if (!permission.allowed) {
    return { success: false, error: permission.error }
  }

  const supabase = createAdminClient()

  const { data: ticket } = await supabase
    .from('support_tickets')
    .select('priority')
    .eq('id', ticketId)
    .single()

  if (!ticket) {
    return { success: false, error: 'Ticket non trouvé' }
  }

  const { error } = await supabase
    .from('support_tickets')
    .update({
      priority,
      updated_at: new Date().toISOString(),
    })
    .eq('id', ticketId)

  if (error) {
    return { success: false, error: error.message }
  }

  await supabase.from('admin_activity_logs').insert({
    admin_id: updatedBy,
    action: 'update_ticket_priority',
    details: { ticket_id: ticketId, previous_priority: ticket.priority, new_priority: priority },
  })

  revalidatePath('/support')
  revalidatePath('/support/tickets')
  revalidatePath(`/support/tickets/${ticketId}`)
  return { success: true }
}

export async function getAssignableAdmins(): Promise<Array<{ id: string; full_name: string | null; email: string }>> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('admin_users')
    .select('id, full_name, email')
    .eq('is_active', true)
    .order('full_name')

  if (error) {
    console.error('Error fetching assignable admins:', error)
    return []
  }

  return data
}
