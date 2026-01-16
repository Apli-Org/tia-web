'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath, revalidateTag } from 'next/cache'
import { checkAdminAction } from './roles.action'
import type {
  LandingSection,
  LandingSectionHistory,
  LandingSectionContent,
  SectionKey,
} from '@/lib/types/landing.types'

// Get all landing sections
export async function getAllLandingSections(): Promise<LandingSection[]> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('landing_sections')
    .select(`
      *,
      updated_by_admin:admin_users!landing_sections_updated_by_fkey(email, full_name)
    `)
    .order('section_key')

  if (error) {
    console.error('Error fetching landing sections:', error)
    return []
  }

  return data as LandingSection[]
}

// Get a single landing section by key
export async function getLandingSection(sectionKey: SectionKey): Promise<LandingSection | null> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('landing_sections')
    .select('*')
    .eq('section_key', sectionKey)
    .single()

  if (error) {
    console.error(`Error fetching landing section ${sectionKey}:`, error)
    return null
  }

  return data as LandingSection
}

// Update a landing section
export async function updateLandingSection(
  sectionKey: SectionKey,
  content: LandingSectionContent,
  adminId: string,
  reason?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  // Check permission
  const hasPermission = await checkAdminAction(adminId, 'manage_landing_page')
  if (!hasPermission) {
    return { success: false, error: 'Permission insuffisante' }
  }

  // Get current content for history
  const { data: currentSection, error: fetchError } = await supabase
    .from('landing_sections')
    .select('id, content')
    .eq('section_key', sectionKey)
    .single()

  if (fetchError || !currentSection) {
    return { success: false, error: 'Section non trouvée' }
  }

  // Update section
  const { error: updateError } = await supabase
    .from('landing_sections')
    .update({
      content,
      updated_by: adminId,
      updated_at: new Date().toISOString(),
    })
    .eq('section_key', sectionKey)

  if (updateError) {
    console.error('Error updating landing section:', updateError)
    return { success: false, error: 'Erreur lors de la mise à jour' }
  }

  // Log to history
  await supabase.from('landing_section_history').insert({
    section_id: currentSection.id,
    previous_content: currentSection.content,
    new_content: content,
    changed_by: adminId,
    change_reason: reason || null,
  })

  // Log activity
  await supabase.from('admin_activity_logs').insert({
    admin_id: adminId,
    action: 'landing_section_updated',
    details: {
      section_key: sectionKey,
      reason,
    },
  })

  revalidatePath('/landing')
  revalidatePath('/')
  revalidateTag('landing-content', { expire: 0 })

  return { success: true }
}

// Publish a landing section
export async function publishLandingSection(
  sectionKey: SectionKey,
  adminId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  // Check permission
  const hasPermission = await checkAdminAction(adminId, 'manage_landing_page')
  if (!hasPermission) {
    return { success: false, error: 'Permission insuffisante' }
  }

  const { error } = await supabase
    .from('landing_sections')
    .update({
      is_published: true,
      published_at: new Date().toISOString(),
      updated_by: adminId,
    })
    .eq('section_key', sectionKey)

  if (error) {
    console.error('Error publishing landing section:', error)
    return { success: false, error: 'Erreur lors de la publication' }
  }

  // Log activity
  await supabase.from('admin_activity_logs').insert({
    admin_id: adminId,
    action: 'landing_section_published',
    details: { section_key: sectionKey },
  })

  revalidatePath('/landing')
  revalidatePath('/')
  revalidateTag('landing-content', { expire: 0 })

  return { success: true }
}

// Unpublish a landing section
export async function unpublishLandingSection(
  sectionKey: SectionKey,
  adminId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  // Check permission
  const hasPermission = await checkAdminAction(adminId, 'manage_landing_page')
  if (!hasPermission) {
    return { success: false, error: 'Permission insuffisante' }
  }

  const { error } = await supabase
    .from('landing_sections')
    .update({
      is_published: false,
      updated_by: adminId,
    })
    .eq('section_key', sectionKey)

  if (error) {
    console.error('Error unpublishing landing section:', error)
    return { success: false, error: 'Erreur lors de la dépublication' }
  }

  // Log activity
  await supabase.from('admin_activity_logs').insert({
    admin_id: adminId,
    action: 'landing_section_unpublished',
    details: { section_key: sectionKey },
  })

  revalidatePath('/landing')
  revalidatePath('/')
  revalidateTag('landing-content', { expire: 0 })

  return { success: true }
}

// Get section history
export async function getLandingSectionHistory(
  sectionKey: SectionKey,
  limit: number = 10
): Promise<LandingSectionHistory[]> {
  const supabase = createAdminClient()

  // First get the section ID
  const { data: section, error: sectionError } = await supabase
    .from('landing_sections')
    .select('id')
    .eq('section_key', sectionKey)
    .single()

  if (sectionError || !section) {
    console.error('Error fetching section:', sectionError)
    return []
  }

  const { data, error } = await supabase
    .from('landing_section_history')
    .select(`
      *,
      changed_by_admin:admin_users!landing_section_history_changed_by_fkey(email, full_name)
    `)
    .eq('section_id', section.id)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching section history:', error)
    return []
  }

  return data as LandingSectionHistory[]
}

// Revert to a previous version
export async function revertLandingSection(
  sectionKey: SectionKey,
  historyId: string,
  adminId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  // Check permission
  const hasPermission = await checkAdminAction(adminId, 'manage_landing_page')
  if (!hasPermission) {
    return { success: false, error: 'Permission insuffisante' }
  }

  // Get the history entry
  const { data: historyEntry, error: historyError } = await supabase
    .from('landing_section_history')
    .select('previous_content')
    .eq('id', historyId)
    .single()

  if (historyError || !historyEntry || !historyEntry.previous_content) {
    return { success: false, error: 'Version non trouvée' }
  }

  // Update with the previous content
  return updateLandingSection(
    sectionKey,
    historyEntry.previous_content as LandingSectionContent,
    adminId,
    `Restauration depuis la version ${historyId.slice(0, 8)}`
  )
}

// Upload image to landing-images bucket
export async function uploadLandingImage(
  file: File,
  adminId: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  const supabase = createAdminClient()

  // Check permission
  const hasPermission = await checkAdminAction(adminId, 'manage_landing_page')
  if (!hasPermission) {
    return { success: false, error: 'Permission insuffisante' }
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return { success: false, error: 'Type de fichier non autorisé' }
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    return { success: false, error: 'Fichier trop volumineux (max 5MB)' }
  }

  // Generate unique filename
  const timestamp = Date.now()
  const extension = file.name.split('.').pop()
  const filename = `${timestamp}-${Math.random().toString(36).slice(2)}.${extension}`

  // Upload to storage
  const { error: uploadError } = await supabase.storage
    .from('landing-images')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    console.error('Error uploading image:', uploadError)
    // Return specific error message based on error type
    let errorMessage = 'Erreur lors du téléchargement'
    if (uploadError.message?.includes('exceeded')) {
      errorMessage = 'Fichier trop volumineux pour le serveur'
    } else if (uploadError.message?.includes('bucket') || uploadError.message?.includes('not found')) {
      errorMessage = 'Bucket de stockage non configuré'
    } else if (uploadError.message?.includes('permission') || uploadError.message?.includes('authorized')) {
      errorMessage = 'Permission de stockage refusée'
    } else if (uploadError.message) {
      errorMessage = `Erreur: ${uploadError.message}`
    }
    return { success: false, error: errorMessage }
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('landing-images')
    .getPublicUrl(filename)

  // Log activity
  await supabase.from('admin_activity_logs').insert({
    admin_id: adminId,
    action: 'landing_image_uploaded',
    details: { filename },
  })

  return { success: true, url: urlData.publicUrl }
}

// Delete image from landing-images bucket
export async function deleteLandingImage(
  imageUrl: string,
  adminId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient()

  // Check permission
  const hasPermission = await checkAdminAction(adminId, 'manage_landing_page')
  if (!hasPermission) {
    return { success: false, error: 'Permission insuffisante' }
  }

  // Extract filename from URL
  const filename = imageUrl.split('/').pop()
  if (!filename) {
    return { success: false, error: 'URL invalide' }
  }

  const { error } = await supabase.storage
    .from('landing-images')
    .remove([filename])

  if (error) {
    console.error('Error deleting image:', error)
    return { success: false, error: 'Erreur lors de la suppression' }
  }

  return { success: true }
}
