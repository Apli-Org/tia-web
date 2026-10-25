'use server'

import { getAuthorizedAdmin, requireAdminAction, PERMISSION_DENIED } from '@/lib/auth/admin-guard'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export type StaffMember = {
  id: string
  email: string
  role: string
  role_id: string | null
  role_name: string | null
  full_name: string | null
  is_active: boolean
  created_at: string
  last_login: string | null
}

export type StaffStats = {
  total: number
  active: number
  byRole: Record<string, number>
}

export type StaffFilters = {
  role?: string       // Role code (e.g., 'super_admin')
  role_id?: string    // Role UUID
  status?: 'active' | 'inactive'
  search?: string
}

// Get all staff members with filters
export async function getStaffMembers(filters?: StaffFilters): Promise<StaffMember[]> {
  await requireAdminAction('view_staff', 'manage_staff')

  const supabase = createAdminClient()

  let query = supabase
    .from('admin_users')
    .select(`
      id, email, role, role_id, full_name, is_active, created_at, last_login,
      admin_roles (name)
    `)
    .order('full_name')

  if (filters?.role_id) {
    query = query.eq('role_id', filters.role_id)
  } else if (filters?.role) {
    query = query.eq('role', filters.role)
  }

  if (filters?.status === 'active') {
    query = query.eq('is_active', true)
  } else if (filters?.status === 'inactive') {
    query = query.eq('is_active', false)
  }

  if (filters?.search) {
    query = query.or(`email.ilike.%${filters.search}%,full_name.ilike.%${filters.search}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching staff members:', error)
    return []
  }

  return data.map((member) => ({
    id: member.id,
    email: member.email,
    role: member.role,
    role_id: member.role_id,
    role_name: (member.admin_roles as any)?.name || member.role,
    full_name: member.full_name,
    is_active: member.is_active ?? true,
    created_at: member.created_at ?? '',
    last_login: member.last_login,
  }))
}

// Get staff member by ID
export async function getStaffById(id: string): Promise<StaffMember | null> {
  await requireAdminAction('view_staff', 'manage_staff')

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('admin_users')
    .select(`
      id, email, role, role_id, full_name, is_active, created_at, last_login,
      admin_roles (name)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching staff member:', error)
    return null
  }

  return {
    id: data.id,
    email: data.email,
    role: data.role,
    role_id: data.role_id,
    role_name: (data.admin_roles as any)?.name || data.role,
    full_name: data.full_name,
    is_active: data.is_active ?? true,
    created_at: data.created_at ?? '',
    last_login: data.last_login,
  }
}

// Get staff statistics
export async function getStaffStats(): Promise<StaffStats> {
  await requireAdminAction('view_staff', 'manage_staff')

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('admin_users')
    .select(`
      is_active,
      role,
      admin_roles (code, name)
    `)

  if (error) {
    console.error('Error fetching staff stats:', error)
    return {
      total: 0,
      active: 0,
      byRole: {},
    }
  }

  const stats: StaffStats = {
    total: data.length,
    active: data.filter(s => s.is_active).length,
    byRole: {},
  }

  for (const member of data) {
    const roleCode = (member.admin_roles as any)?.code || member.role || 'unknown'
    stats.byRole[roleCode] = (stats.byRole[roleCode] || 0) + 1
  }

  return stats
}

// Create new staff member
export async function createStaffMember(
  data: {
    email: string
    password: string
    full_name: string
    role_id: string
  }
): Promise<{ success: boolean; error?: string; id?: string }> {
  const admin = await getAuthorizedAdmin('manage_staff')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  const supabase = createAdminClient()

  const { data: role } = await supabase
    .from('admin_roles')
    .select('code, name')
    .eq('id', data.role_id)
    .single()

  if (!role) {
    return { success: false, error: 'Rôle non trouvé' }
  }

  const { data: existing } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', data.email)
    .single()

  if (existing) {
    return { success: false, error: 'Cet email est déjà utilisé' }
  }

  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
  })

  if (authError) {
    return { success: false, error: authError.message }
  }

  const { data: newMember, error: insertError } = await supabase
    .from('admin_users')
    .insert({
      id: authUser.user.id,
      email: data.email,
      full_name: data.full_name,
      role: role.code,
      role_id: data.role_id,
      is_active: true,
    })
    .select('id')
    .single()

  if (insertError) {
    await supabase.auth.admin.deleteUser(authUser.user.id)
    return { success: false, error: insertError.message }
  }

  await supabase.from('admin_activity_logs').insert({
    admin_id: admin.id,
    action: 'create_staff',
    target_type: 'admin_user',
    target_id: newMember.id,
    details: { email: data.email, role: role.name },
  })

  revalidatePath('/staff')
  return { success: true, id: newMember.id }
}

// Update staff member
export async function updateStaffMember(
  id: string,
  updates: {
    full_name?: string
    role_id?: string
  }
): Promise<{ success: boolean; error?: string }> {
  const admin = await getAuthorizedAdmin('manage_staff')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  const supabase = createAdminClient()

  const { data: current } = await supabase
    .from('admin_users')
    .select('*, admin_roles(code, is_system)')
    .eq('id', id)
    .single()

  if (!current) {
    return { success: false, error: 'Membre non trouvé' }
  }

  const dbUpdates: Record<string, unknown> = {}
  if (updates.full_name !== undefined) {
    dbUpdates.full_name = updates.full_name
  }

  if (updates.role_id !== undefined) {
    const isCurrentSuperAdmin = (current.admin_roles as any)?.code === 'super_admin'

    if (isCurrentSuperAdmin) {
      const { data: newRole } = await supabase
        .from('admin_roles')
        .select('code')
        .eq('id', updates.role_id)
        .single()

      if (newRole?.code !== 'super_admin') {
        const { count } = await supabase
          .from('admin_users')
          .select('id', { count: 'exact', head: true })
          .eq('role', 'super_admin')
          .eq('is_active', true)

        if (count && count <= 1) {
          return { success: false, error: 'Impossible de rétrograder le dernier Super Admin' }
        }
      }
    }

    const { data: role } = await supabase
      .from('admin_roles')
      .select('code')
      .eq('id', updates.role_id)
      .single()

    if (role) {
      dbUpdates.role_id = updates.role_id
      dbUpdates.role = role.code
    }
  }

  if (Object.keys(dbUpdates).length === 0) {
    return { success: true }
  }

  const { error } = await supabase
    .from('admin_users')
    .update(dbUpdates)
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  await supabase.from('admin_activity_logs').insert({
    admin_id: admin.id,
    action: 'update_staff',
    target_type: 'admin_user',
    target_id: id,
    details: { previous: current, updates },
  })

  revalidatePath('/staff')
  return { success: true }
}

// Toggle staff active status
export async function toggleStaffStatus(
  id: string,
  isActive: boolean
): Promise<{ success: boolean; error?: string }> {
  const admin = await getAuthorizedAdmin('manage_staff')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  const supabase = createAdminClient()

  const { data: current } = await supabase
    .from('admin_users')
    .select('role, is_active')
    .eq('id', id)
    .single()

  if (!current) {
    return { success: false, error: 'Membre non trouvé' }
  }

  if (current.role === 'super_admin' && !isActive) {
    const { count } = await supabase
      .from('admin_users')
      .select('id', { count: 'exact', head: true })
      .eq('role', 'super_admin')
      .eq('is_active', true)

    if (count && count <= 1) {
      return { success: false, error: 'Impossible de désactiver le dernier Super Admin' }
    }
  }

  // Prevent self-deactivation
  if (id === admin.id && !isActive) {
    return { success: false, error: 'Vous ne pouvez pas vous désactiver vous-même' }
  }

  const { error } = await supabase
    .from('admin_users')
    .update({ is_active: isActive })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  // Log the action
  await supabase.from('admin_activity_logs').insert({
    admin_id: admin.id,
    action: isActive ? 'activate_staff' : 'deactivate_staff',
    target_type: 'admin_user',
    target_id: id,
  })

  revalidatePath('/staff')
  return { success: true }
}

// Delete staff member (soft delete = deactivate)
export async function deleteStaffMember(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const admin = await getAuthorizedAdmin('manage_staff')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  // We use soft delete (deactivate) instead of hard delete
  return toggleStaffStatus(id, false)
}

// Get staff activity logs
export async function getStaffActivityLogs(
  staffId: string,
  limit = 20
): Promise<Array<{
  id: string
  action: string
  target_type: string | null
  target_id: string | null
  details: Record<string, unknown> | null
  created_at: string
}>> {
  await requireAdminAction('view_staff', 'manage_staff')

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('admin_activity_logs')
    .select('id, action, target_type, target_id, details, created_at')
    .eq('admin_id', staffId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching staff activity logs:', error)
    return []
  }

  return data
}

// Reset staff password
export async function resetStaffPassword(
  id: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const admin = await getAuthorizedAdmin('reset_passwords')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  const supabase = createAdminClient()

  const { error } = await supabase.auth.admin.updateUserById(id, {
    password: newPassword,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  await supabase.from('admin_activity_logs').insert({
    admin_id: admin.id,
    action: 'reset_password',
    target_type: 'admin_user',
    target_id: id,
  })

  return { success: true }
}
