import { getCurrentAdmin, type CurrentAdmin } from '@/actions/admin/auth.action'
import { createAdminClient } from '@/lib/supabase/admin'

export const PERMISSION_DENIED = 'Permission insuffisante'

type AdminActionsRow = {
  is_active: boolean | null
  admin_roles: {
    admin_role_actions: { admin_actions: { code: string } | null }[]
  } | null
}

export async function getAuthorizedAdmin(
  action: string,
  ...alternatives: string[]
): Promise<CurrentAdmin | null> {
  const admin = await getCurrentAdmin()
  if (!admin) return null

  const allowed = [action, ...alternatives].some((code) => admin.actions.includes(code))
  return allowed ? admin : null
}

export async function requireAdminAction(
  action: string,
  ...alternatives: string[]
): Promise<CurrentAdmin> {
  const admin = await getAuthorizedAdmin(action, ...alternatives)
  if (!admin) throw new Error(PERMISSION_DENIED)
  return admin
}

export async function requireSignedInAdmin(): Promise<CurrentAdmin> {
  const admin = await getCurrentAdmin()
  if (!admin) throw new Error(PERMISSION_DENIED)
  return admin
}

export async function getAdminActions(adminId: string): Promise<string[]> {
  const supabase = createAdminClient()

  const { data } = await supabase
    .from('admin_users')
    .select(`
      is_active,
      admin_roles!inner (
        admin_role_actions!inner (
          admin_actions!inner (code)
        )
      )
    `)
    .eq('id', adminId)
    .single()

  const row = data as AdminActionsRow | null
  if (!row?.is_active || !row.admin_roles) return []

  return row.admin_roles.admin_role_actions
    .map((roleAction) => roleAction.admin_actions?.code)
    .filter((code): code is string => Boolean(code))
}

export async function checkAdminAction(adminId: string, actionCode: string): Promise<boolean> {
  const actions = await getAdminActions(adminId)
  return actions.includes(actionCode)
}
