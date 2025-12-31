'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { checkAdminAction } from '../roles.action'
import type { TicketMessage } from './types'

async function verifyPermission(adminId: string, actionCode: string): Promise<{ allowed: boolean; error?: string }> {
  const hasPermission = await checkAdminAction(adminId, actionCode)
  if (!hasPermission) {
    return { allowed: false, error: 'Permission insuffisante' }
  }
  return { allowed: true }
}

export async function getTicketMessages(ticketId: string): Promise<TicketMessage[]> {
  const supabase = createAdminClient()

  const { data: messages, error } = await supabase
    .from('ticket_messages')
    .select('*')
    .eq('ticket_id', ticketId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching ticket messages:', error)
    return []
  }

  const adminSenderIds = messages.filter((m) => m.sender_type === 'admin').map((m) => m.sender_id)
  const userSenderIds = messages.filter((m) => m.sender_type === 'user').map((m) => m.sender_id)

  const [adminData, userData] = await Promise.all([
    adminSenderIds.length > 0
      ? supabase.from('admin_users').select('id, full_name, email').in('id', adminSenderIds)
      : { data: [] },
    userSenderIds.length > 0
      ? supabase.from('users').select('id, firstName, email').in('id', userSenderIds)
      : { data: [] },
  ])

  const adminMap = new Map((adminData.data || []).map((a) => [a.id, a]))
  const userMap = new Map((userData.data || []).map((u) => [u.id, u]))

  return messages.map((msg) => {
    let sender: TicketMessage['sender'] = null
    if (msg.sender_type === 'admin') {
      const admin = adminMap.get(msg.sender_id)
      if (admin) {
        sender = { full_name: admin.full_name, email: admin.email }
      }
    } else {
      const user = userMap.get(msg.sender_id)
      if (user) {
        sender = { firstName: user.firstName, email: user.email }
      }
    }

    return {
      id: msg.id,
      ticket_id: msg.ticket_id ?? '',
      sender_id: msg.sender_id,
      sender_type: msg.sender_type as 'user' | 'admin',
      content: msg.content,
      attachments: msg.attachments as unknown[] | null,
      created_at: msg.created_at ?? '',
      sender,
    }
  })
}

export async function addTicketMessage(
  ticketId: string,
  content: string,
  adminId: string
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  const permission = await verifyPermission(adminId, 'manage_tickets')
  if (!permission.allowed) {
    return { success: false, error: permission.error }
  }

  const supabase = createAdminClient()

  const { data: ticket } = await supabase
    .from('support_tickets')
    .select('id, status')
    .eq('id', ticketId)
    .single()

  if (!ticket) {
    return { success: false, error: 'Ticket non trouvé' }
  }

  const { data: message, error: msgError } = await supabase
    .from('ticket_messages')
    .insert({
      ticket_id: ticketId,
      sender_id: adminId,
      sender_type: 'admin',
      content,
    })
    .select('id')
    .single()

  if (msgError) {
    return { success: false, error: msgError.message }
  }

  const ticketUpdates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  if (ticket.status === 'pending') {
    ticketUpdates.status = 'in_progress'
  }

  await supabase
    .from('support_tickets')
    .update(ticketUpdates)
    .eq('id', ticketId)

  await supabase.from('admin_activity_logs').insert({
    admin_id: adminId,
    action: 'reply_ticket',
    details: { ticket_id: ticketId, message_id: message.id },
  })

  revalidatePath(`/support/tickets/${ticketId}`)
  return { success: true, messageId: message.id }
}
