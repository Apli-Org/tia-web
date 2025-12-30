// Types
export type AdminRole = 'super_admin' | 'admin' | 'moderator' | 'support'

// Role labels in French
export const roleLabels: Record<AdminRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Administrateur',
  moderator: 'Modérateur',
  support: 'Support',
}

// Role hierarchy for permission checks
export const roleHierarchy: Record<AdminRole, number> = {
  super_admin: 4,
  admin: 3,
  moderator: 2,
  support: 1,
}

// Check if a role has at least the required permission level
export function hasPermission(userRole: AdminRole, requiredRole: AdminRole): boolean {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}
