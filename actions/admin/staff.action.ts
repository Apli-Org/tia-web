'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

// Types
export type AdminRole = 'super_admin' | 'admin' | 'moderator' | 'support'

export type StaffMember = {
  id: string
  email: string
  role: AdminRole
  full_name: string | null
  is_active: boolean
  created_at: string
  last_login: string | null
}

export type StaffStats = {
  total: number
  active: number
  byRole: {
    super_admin: number
    admin: number
    moderator: number
    support: number
  }
}

export type StaffFilters = {
  role?: AdminRole
  status?: 'active' | 'inactive'
  search?: string
}

// Role labels in French
export const roleLabels: Record<AdminRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Administrateur',
  moderator: 'Modérateur',
  support: 'Support',
}

// Get all staff members with filters
export async function getStaffMembers(filters?: StaffFilters): Promise<StaffMember[]> {
  const supabase = createAdminClient()

  let query = supabase
    .from('admin_users')
    .select('*')
    .order('role')
    .order('full_name')

  if (filters?.role) {
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

  return data as StaffMember[]
}

// Get staff member by ID
export async function getStaffById(id: string): Promise<StaffMember | null> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching staff member:', error)
    return null
  }

  return data as StaffMember
}

// Get staff statistics
export async function getStaffStats(): Promise<StaffStats> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('admin_users')
    .select('role, is_active')

  if (error) {
    console.error('Error fetching staff stats:', error)
    return {
      total: 0,
      active: 0,
      byRole: { super_admin: 0, admin: 0, moderator: 0, support: 0 },
    }
  }

  const stats: StaffStats = {
    total: data.length,
    active: data.filter(s => s.is_active).length,
    byRole: { super_admin: 0, admin: 0, moderator: 0, support: 0 },
  }

  for (const member of data) {
    const role = member.role as AdminRole
    if (role in stats.byRole) {
      stats.byRole[role]++
    }
  }

  return stats
}

// Create new staff member
export async function createStaffMember(
  data: {
    email: string
    password: string
    full_name: string
    role: AdminRole
  },
  createdBy: string
): Promise<{ success: boolean; error?: string; id?: string }> {
  const supabase = createAdminClient()

  // Check if email already exists in admin_users
  const { data: existing } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', data.email)
    .single()

  if (existing) {
    return { success: false, error: 'Cet email est déjà utilisé' }
  }

  // Create user in Supabase Auth
  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
  })

  if (authError) {
    return { success: false, error: authError.message }
  }

  // Create entry in admin_users
  const { data: newMember, error: insertError } = await supabase
    .from('admin_users')
    .insert({
      id: authUser.user.id,
      email: data.email,
      full_name: data.full_name,
      role: data.role,
      is_active: true,
    })
    .select('id')
    .single()

  if (insertError) {
    // Rollback: delete auth user if admin_users insert fails
    await supabase.auth.admin.deleteUser(authUser.user.id)
    return { success: false, error: insertError.message }
  }

  // Log the action
  await supabase.from('admin_activity_logs').insert({
    admin_id: createdBy,
    action: 'create_staff',
    target_type: 'admin_user',
    target_id: newMember.id,
    details: { email: data.email, role: data.role },
  })

  revalidatePath('/staff')
  return { success: true, id: newMember.id }
}

// Update staff member
export async function updateStaffMember(
  id: string,
  updates: {
    full_name?: string
    role?: AdminRole
  },
  updatedBy: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  // Get current data for logging
  const { data: current } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', id)
    .single()

  if (!current) {
    return { success: false, error: 'Membre non trouvé' }
  }

  // Prevent demoting the last super_admin
  if (current.role === 'super_admin' && updates.role && updates.role !== 'super_admin') {
    const { count } = await supabase
      .from('admin_users')
      .select('id', { count: 'exact', head: true })
      .eq('role', 'super_admin')
      .eq('is_active', true)

    if (count && count <= 1) {
      return { success: false, error: 'Impossible de rétrograder le dernier Super Admin' }
    }
  }

  const { error } = await supabase
    .from('admin_users')
    .update(updates)
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  // Log the action
  await supabase.from('admin_activity_logs').insert({
    admin_id: updatedBy,
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
  isActive: boolean,
  toggledBy: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  // Get current data
  const { data: current } = await supabase
    .from('admin_users')
    .select('role, is_active')
    .eq('id', id)
    .single()

  if (!current) {
    return { success: false, error: 'Membre non trouvé' }
  }

  // Prevent deactivating the last active super_admin
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
  if (id === toggledBy && !isActive) {
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
    admin_id: toggledBy,
    action: isActive ? 'activate_staff' : 'deactivate_staff',
    target_type: 'admin_user',
    target_id: id,
  })

  revalidatePath('/staff')
  return { success: true }
}

// Delete staff member (soft delete = deactivate)
export async function deleteStaffMember(
  id: string,
  deletedBy: string
): Promise<{ success: boolean; error?: string }> {
  // We use soft delete (deactivate) instead of hard delete
  return toggleStaffStatus(id, false, deletedBy)
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
  newPassword: string,
  resetBy: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  const { error } = await supabase.auth.admin.updateUserById(id, {
    password: newPassword,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  // Log the action
  await supabase.from('admin_activity_logs').insert({
    admin_id: resetBy,
    action: 'reset_password',
    target_type: 'admin_user',
    target_id: id,
  })

  return { success: true }
}
