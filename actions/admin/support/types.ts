export type TicketStatus = 'pending' | 'in_progress' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TicketCategory = 'billing' | 'technical' | 'account' | 'report' | 'other'

export type SupportTicket = {
  id: string
  subject: string
  status: TicketStatus
  priority: TicketPriority
  category: TicketCategory
  user_id: string | null
  assigned_to: string | null
  created_at: string
  updated_at: string
  resolved_at: string | null
  user?: {
    id: string
    firstName: string | null
    email: string
  } | null
  assignee?: {
    id: string
    full_name: string | null
    email: string
  } | null
  message_count?: number
}

export type TicketMessage = {
  id: string
  ticket_id: string
  sender_id: string
  sender_type: 'user' | 'admin'
  content: string
  attachments: unknown[] | null
  created_at: string
  sender?: {
    firstName?: string | null
    full_name?: string | null
    email: string
  } | null
}

export type TicketFilters = {
  status?: TicketStatus | 'all'
  priority?: TicketPriority | 'all'
  category?: TicketCategory | 'all'
  assigned_to?: string | 'all' | 'unassigned'
  search?: string
  sortBy?: 'created_at' | 'updated_at' | 'priority'
  sortOrder?: 'asc' | 'desc'
}

export type SupportStats = {
  pending: number
  inProgress: number
  resolved: number
  closed: number
  unassigned: number
  avgResolutionHours: number | null
}

export type PaginatedTickets = {
  tickets: SupportTicket[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export const statusLabels: Record<TicketStatus, string> = {
  pending: 'En attente',
  in_progress: 'En cours',
  resolved: 'Résolu',
  closed: 'Fermé',
}

export const priorityLabels: Record<TicketPriority, string> = {
  low: 'Basse',
  medium: 'Moyenne',
  high: 'Haute',
  urgent: 'Urgente',
}

export const categoryLabels: Record<TicketCategory, string> = {
  billing: 'Facturation',
  technical: 'Technique',
  account: 'Compte',
  report: 'Signalement',
  other: 'Autre',
}
