'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export type AdminAction = {
  id: string
  code: string
  name: string
  description: string | null
  category: string
}

export type AdminRole = {
  id: string
  code: string
  name: string
  description: string | null
  is_system: boolean
  created_at: string
  staff_count?: number
  actions?: AdminAction[]
}

export type RoleWithActions = AdminRole & {
  actions: AdminAction[]
}

async function verifyManageRolesPermission(adminId: string): Promise<{ allowed: boolean; error?: string }> {
  const supabase = createAdminClient()

  const { data: admin } = await supabase
    .from('admin_users')
    .select(`
      is_active,
      role_id,
      admin_roles!inner (
        admin_role_actions!inner (
          admin_actions!inner (code)
        )
      )
    `)
    .eq('id', adminId)
    .single()

  if (!admin) {
    return { allowed: false, error: 'Admin non trouvé' }
  }

  if (!admin.is_active) {
    return { allowed: false, error: 'Compte désactivé' }
  }

  const actions = (admin.admin_roles as any)?.admin_role_actions?.map(
    (ra: any) => ra.admin_actions?.code
  ) || []

  if (!actions.includes('manage_roles')) {
    return { allowed: false, error: 'Permission insuffisante' }
  }

  return { allowed: true }
}

export async function getAllActions(): Promise<AdminAction[]> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('admin_actions')
    .select('*')
    .order('category')
    .order('name')

  if (error) {
    console.error('Error fetching actions:', error)
    return []
  }

  return data
}

export async function getActionsByCategory(): Promise<Record<string, AdminAction[]>> {
  const actions = await getAllActions()
  return actions.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = []
    }
    acc[action.category].push(action)
    return acc
  }, {} as Record<string, AdminAction[]>)
}

export async function getAllRoles(): Promise<AdminRole[]> {
  const supabase = createAdminClient()

  const { data: roles, error } = await supabase
    .from('admin_roles')
    .select('*')
    .order('is_system', { ascending: false })
    .order('name')

  if (error) {
    console.error('Error fetching roles:', error)
    return []
  }

  const { data: staffCounts } = await supabase
    .from('admin_users')
    .select('role_id')

  const countMap: Record<string, number> = {}
  staffCounts?.forEach((s) => {
    if (s.role_id) {
      countMap[s.role_id] = (countMap[s.role_id] || 0) + 1
    }
  })

  return roles.map((role) => ({
    ...role,
    staff_count: countMap[role.id] || 0,
  }))
}

export async function getRoleWithActions(roleId: string): Promise<RoleWithActions | null> {
  const supabase = createAdminClient()

  const { data: role, error: roleError } = await supabase
    .from('admin_roles')
    .select('*')
    .eq('id', roleId)
    .single()

  if (roleError || !role) {
    console.error('Error fetching role:', roleError)
    return null
  }

  const { data: roleActions, error: actionsError } = await supabase
    .from('admin_role_actions')
    .select('admin_actions(*)')
    .eq('role_id', roleId)

  if (actionsError) {
    console.error('Error fetching role actions:', actionsError)
    return { ...role, actions: [] }
  }

  const actions = roleActions
    .map((ra) => ra.admin_actions as unknown as AdminAction)
    .filter(Boolean)

  return { ...role, actions }
}

export async function createRole(
  data: { code: string; name: string; description?: string; actionIds: string[] },
  createdBy: string
): Promise<{ success: boolean; error?: string; id?: string }> {
  const permission = await verifyManageRolesPermission(createdBy)
  if (!permission.allowed) {
    return { success: false, error: permission.error }
  }

  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from('admin_roles')
    .select('id')
    .eq('code', data.code)
    .single()

  if (existing) {
    return { success: false, error: 'Ce code de rôle existe déjà' }
  }

  const { data: newRole, error: insertError } = await supabase
    .from('admin_roles')
    .insert({
      code: data.code,
      name: data.name,
      description: data.description || null,
      is_system: false,
    })
    .select('id')
    .single()

  if (insertError) {
    return { success: false, error: insertError.message }
  }

  if (data.actionIds.length > 0) {
    const roleActions = data.actionIds.map((actionId) => ({
      role_id: newRole.id,
      action_id: actionId,
    }))

    const { error: actionsError } = await supabase
      .from('admin_role_actions')
      .insert(roleActions)

    if (actionsError) {
      await supabase.from('admin_roles').delete().eq('id', newRole.id)
      return { success: false, error: actionsError.message }
    }
  }

  await supabase.from('admin_activity_logs').insert({
    admin_id: createdBy,
    action: 'create_role',
    target_type: 'admin_role',
    target_id: newRole.id,
    details: { code: data.code, name: data.name, action_count: data.actionIds.length },
  })

  revalidatePath('/staff/roles')
  return { success: true, id: newRole.id }
}

export async function updateRole(
  roleId: string,
  data: { name?: string; description?: string; actionIds?: string[] },
  updatedBy: string
): Promise<{ success: boolean; error?: string }> {
  const permission = await verifyManageRolesPermission(updatedBy)
  if (!permission.allowed) {
    return { success: false, error: permission.error }
  }

  const supabase = createAdminClient()

  const { data: current } = await supabase
    .from('admin_roles')
    .select('*')
    .eq('id', roleId)
    .single()

  if (!current) {
    return { success: false, error: 'Rôle non trouvé' }
  }

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (data.name !== undefined) updates.name = data.name
  if (data.description !== undefined) updates.description = data.description

  const { error: updateError } = await supabase
    .from('admin_roles')
    .update(updates)
    .eq('id', roleId)

  if (updateError) {
    return { success: false, error: updateError.message }
  }

  if (data.actionIds !== undefined) {
    await supabase.from('admin_role_actions').delete().eq('role_id', roleId)

    if (data.actionIds.length > 0) {
      const roleActions = data.actionIds.map((actionId) => ({
        role_id: roleId,
        action_id: actionId,
      }))

      const { error: actionsError } = await supabase
        .from('admin_role_actions')
        .insert(roleActions)

      if (actionsError) {
        return { success: false, error: actionsError.message }
      }
    }
  }

  await supabase.from('admin_activity_logs').insert({
    admin_id: updatedBy,
    action: 'update_role',
    target_type: 'admin_role',
    target_id: roleId,
    details: { previous: current, updates: data },
  })

  revalidatePath('/staff/roles')
  return { success: true }
}

export async function deleteRole(
  roleId: string,
  deletedBy: string
): Promise<{ success: boolean; error?: string }> {
  const permission = await verifyManageRolesPermission(deletedBy)
  if (!permission.allowed) {
    return { success: false, error: permission.error }
  }

  const supabase = createAdminClient()

  const { data: role } = await supabase
    .from('admin_roles')
    .select('code, name, is_system')
    .eq('id', roleId)
    .single()

  if (!role) {
    return { success: false, error: 'Rôle non trouvé' }
  }

  if (role.is_system) {
    return { success: false, error: 'Impossible de supprimer un rôle système' }
  }

  const { count } = await supabase
    .from('admin_users')
    .select('id', { count: 'exact', head: true })
    .eq('role_id', roleId)

  if (count && count > 0) {
    return { success: false, error: `Ce rôle est assigné à ${count} membre(s). Réassignez-les d'abord.` }
  }

  const { error: deleteError } = await supabase
    .from('admin_roles')
    .delete()
    .eq('id', roleId)

  if (deleteError) {
    return { success: false, error: deleteError.message }
  }

  await supabase.from('admin_activity_logs').insert({
    admin_id: deletedBy,
    action: 'delete_role',
    target_type: 'admin_role',
    target_id: roleId,
    details: { code: role.code, name: role.name },
  })

  revalidatePath('/staff/roles')
  return { success: true }
}

export async function getRolesStats(): Promise<{
  total: number
  system: number
  custom: number
  totalActions: number
}> {
  const supabase = createAdminClient()

  const [rolesResult, actionsResult] = await Promise.all([
    supabase.from('admin_roles').select('is_system'),
    supabase.from('admin_actions').select('id', { count: 'exact', head: true }),
  ])

  const roles = rolesResult.data || []
  const systemCount = roles.filter((r) => r.is_system).length

  return {
    total: roles.length,
    system: systemCount,
    custom: roles.length - systemCount,
    totalActions: actionsResult.count || 0,
  }
}

export async function checkAdminAction(adminId: string, actionCode: string): Promise<boolean> {
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

  if (!data || !data.is_active) {
    return false
  }

  const actions = (data.admin_roles as any)?.admin_role_actions?.map(
    (ra: any) => ra.admin_actions?.code
  ) || []

  return actions.includes(actionCode)
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

  if (!data || !data.is_active) {
    return []
  }

  return (data.admin_roles as any)?.admin_role_actions?.map(
    (ra: any) => ra.admin_actions?.code
  ) || []
}
