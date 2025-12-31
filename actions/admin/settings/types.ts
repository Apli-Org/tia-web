export type ActivityLog = {
  id: string
  admin_id: string | null
  action: string
  details: Record<string, unknown> | null
  created_at: string
  admin?: {
    id: string
    full_name: string | null
    email: string
  } | null
}

export type ActivityFilters = {
  admin_id?: string | 'all'
  action?: string | 'all'
  dateFrom?: string
  dateTo?: string
  search?: string
}

export type ActivityStats = {
  total: number
  todayCount: number
  weekCount: number
  topActions: Array<{ action: string; count: number }>
  topAdmins: Array<{ admin_id: string; admin_name: string; count: number }>
}

export type PaginatedLogs = {
  logs: ActivityLog[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export const actionLabels: Record<string, string> = {
  login: 'Connexion',
  logout: 'Déconnexion',
  create_staff: 'Création personnel',
  update_staff: 'Modification personnel',
  activate_staff: 'Activation personnel',
  deactivate_staff: 'Désactivation personnel',
  reset_password: 'Réinitialisation mot de passe',
  create_role: 'Création rôle',
  update_role: 'Modification rôle',
  delete_role: 'Suppression rôle',
  ban_user: 'Bannissement utilisateur',
  unban_user: 'Débannissement utilisateur',
  delete_user: 'Suppression utilisateur',
  verify_cin: 'Vérification CIN approuvée',
  reject_cin: 'Vérification CIN rejetée',
  report_reviewed: 'Signalement traité',
  update_pricing: 'Modification tarif',
  assign_ticket: 'Assignation ticket',
  unassign_ticket: 'Désassignation ticket',
  update_ticket_status: 'Modification statut ticket',
  update_ticket_priority: 'Modification priorité ticket',
  reply_ticket: 'Réponse ticket',
}
