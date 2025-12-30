'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type LoginResult = {
  success: boolean
  error?: string
  isAdmin?: boolean
}

export async function loginAdmin(
  email: string,
  password: string
): Promise<LoginResult> {
  const supabase = await createClient()

  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    })

  if (authError || !authData.user || !authData.session) {
    return {
      success: false,
      error: 'Email ou mot de passe incorrect',
    }
  }

  await supabase.auth.setSession({
    access_token: authData.session.access_token,
    refresh_token: authData.session.refresh_token,
  })

  // Use admin client to bypass RLS and verify admin status
  const adminClient = createAdminClient()

  const { data: adminUser, error: adminError } = await adminClient
    .from('admin_users')
    .select('*')
    .eq('id', authData.user.id)
    .eq('is_active', true)
    .single()

  if (adminError || !adminUser) {
    await supabase.auth.signOut()
    return {
      success: false,
      error: 'Accès refusé : compte administrateur non trouvé ou inactif',
      isAdmin: false,
    }
  }

  // Update last_login using admin client
  await adminClient
    .from('admin_users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', adminUser.id)

  // Log the login action
  await adminClient.from('admin_activity_logs').insert({
    admin_id: adminUser.id,
    action: 'admin_login',
    details: {
      email: adminUser.email,
      role: adminUser.role,
    },
  })

  revalidatePath('/dashboard')

  return {
    success: true,
    isAdmin: true,
  }
}

export async function logoutAdmin() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await supabase.from('admin_activity_logs').insert({
      admin_id: user.id,
      action: 'admin_logout',
      details: {},
    })
  }

  await supabase.auth.signOut()

  revalidatePath('/')
  redirect('/login')
}
