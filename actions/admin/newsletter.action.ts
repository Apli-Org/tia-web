'use server'

import { getAuthorizedAdmin, PERMISSION_DENIED } from '@/lib/auth/admin-guard'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { render } from '@react-email/render'
import { Resend } from 'resend'
import NewsletterEmail from '@/emails/newsletter'
import { processNewsletterBatches } from '@/lib/newsletter/process-batches'

const resend = new Resend(process.env.RESEND_API_KEY)

export type NewsletterResult = {
  success: boolean
  count?: number
  sent?: number
  failed?: number
  error?: string
}

export async function getNewsletterSubscriberCount(): Promise<NewsletterResult> {
  const admin = await getAuthorizedAdmin('send_newsletter')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  const supabase = createAdminClient()

  const { count, error } = await supabase
    .from('newsletter_subscribers')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('Error fetching subscriber count:', error)
    return { success: false, error: 'Erreur lors du comptage des abonnés' }
  }

  return { success: true, count: count || 0 }
}

export async function sendNewsletter(
  subject: string,
  htmlContent: string
): Promise<NewsletterResult> {
  const admin = await getAuthorizedAdmin('send_newsletter')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  if (!subject || !subject.trim()) {
    return { success: false, error: 'Le sujet est requis' }
  }

  if (!htmlContent || !htmlContent.trim()) {
    return { success: false, error: 'Le contenu est requis' }
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured')
    return { success: false, error: 'Service email non configuré' }
  }

  const supabase = createAdminClient()

  const { data: subscribers, error: fetchError } = await supabase
    .from('newsletter_subscribers')
    .select('email')
    .order('email')

  if (fetchError) {
    console.error('Error fetching subscribers:', fetchError)
    return { success: false, error: 'Erreur lors de la récupération des abonnés' }
  }

  if (!subscribers || subscribers.length === 0) {
    return { success: false, error: 'Aucun abonné trouvé' }
  }

  try {
    const emailHtml = await render(
      NewsletterEmail({ subject, htmlContent })
    )

    let totalSent = 0
    let totalFailed = 0

    const chunkSize = 100
    const chunks: string[][] = []
    for (let i = 0; i < subscribers.length; i += chunkSize) {
      chunks.push(subscribers.slice(i, i + chunkSize).map(s => s.email))
    }

    for (const chunk of chunks) {
      try {
        const { data, error } = await resend.batch.send(
          chunk.map(email => ({
            from: process.env.RESEND_FROM_EMAIL || 'TIA <newsletter@send.tia-meet.com>',
            to: [email],
            subject: subject,
            html: emailHtml,
          }))
        )

        if (error) {
          console.error('Batch send error:', error)
          totalFailed += chunk.length
        } else {
          totalSent += chunk.length
        }
      } catch (error) {
        console.error('Batch send exception:', error)
        totalFailed += chunk.length
      }

      if (chunks.indexOf(chunk) < chunks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }

    await supabase.from('admin_activity_logs').insert({
      admin_id: admin.id,
      action: 'send_newsletter',
      details: {
        subject,
        total_subscribers: subscribers.length,
        sent: totalSent,
        failed: totalFailed,
      },
    })

    revalidatePath('/newsletter')

    if (totalFailed > 0 && totalSent === 0) {
      return {
        success: false,
        error: `Échec de l'envoi à tous les abonnés`,
        sent: totalSent,
        failed: totalFailed,
      }
    }

    return {
      success: true,
      sent: totalSent,
      failed: totalFailed,
    }
  } catch (error) {
    console.error('Unexpected error sending newsletter:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    }
  }
}

// --- New types and actions for improved newsletter system ---

export type SubscriberListResult = {
  success: boolean
  subscribers?: Array<{
    id: string
    email: string
    prenom: string | null
    numero: string | null
    subscribed_at: string
  }>
  total?: number
  totalPages?: number
  error?: string
}

export type InitiateSendResult = {
  success: boolean
  sendId?: string
  error?: string
}

export type SendStatusResult = {
  success: boolean
  status?: string
  total_recipients?: number
  sent_count?: number
  failed_count?: number
  completed_at?: string | null
  is_simulation?: boolean
  error?: string
}

export async function getNewsletterSubscribers(
  page: number,
  pageSize: number,
  search?: string
): Promise<SubscriberListResult> {
  const admin = await getAuthorizedAdmin('send_newsletter')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  const supabase = createAdminClient()

  const offset = (page - 1) * pageSize

  let query = supabase
    .from('newsletter_subscribers')
    .select('id, email, prenom, numero, subscribed_at', { count: 'exact' })

  if (search) {
    query = query.or(`email.ilike.%${search}%,prenom.ilike.%${search}%`)
  }

  query = query.order('subscribed_at', { ascending: false })
  query = query.range(offset, offset + pageSize - 1)

  const { data, count, error } = await query

  if (error) {
    console.error('Error fetching newsletter subscribers:', error)
    return { success: false, error: 'Erreur lors de la récupération des abonnés' }
  }

  const total = count ?? 0

  return {
    success: true,
    subscribers: data ?? [],
    total,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function initiateNewsletterSend(
  subject: string,
  htmlContent: string,
  subscriberIds?: string[],
  simulation?: boolean
): Promise<InitiateSendResult> {
  const admin = await getAuthorizedAdmin('send_newsletter')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  if (!subject || !subject.trim()) {
    return { success: false, error: 'Le sujet est requis' }
  }

  if (!htmlContent || !htmlContent.trim()) {
    return { success: false, error: 'Le contenu est requis' }
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured')
    return { success: false, error: 'Service email non configuré' }
  }

  const supabase = createAdminClient()

  let totalCount: number

  if (subscriberIds && subscriberIds.length > 0) {
    totalCount = subscriberIds.length
  } else {
    const { count, error: countError } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.error('Error counting subscribers:', countError)
      return { success: false, error: 'Erreur lors du comptage des abonnés' }
    }

    totalCount = count ?? 0
  }

  if (totalCount === 0) {
    return { success: false, error: 'Aucun abonné trouvé' }
  }

  const { data: insertedRecord, error: insertError } = await supabase
    .from('newsletter_sends')
    .insert({
      admin_id: admin.id,
      subject,
      html_content: htmlContent,
      status: 'pending',
      total_recipients: totalCount,
      subscriber_ids: subscriberIds && subscriberIds.length > 0 ? subscriberIds : null,
      is_simulation: simulation ?? false,
    })
    .select('id')
    .single()

  if (insertError || !insertedRecord) {
    console.error('Error creating newsletter send record:', insertError)
    return { success: false, error: "Erreur lors de la création de l'envoi" }
  }

  // Fire and forget - start batch processing in background
  processNewsletterBatches(insertedRecord.id).catch(err =>
    console.error('Newsletter batch processing error:', err)
  )

  return { success: true, sendId: insertedRecord.id }
}

export async function getNewsletterSendStatus(
  sendId: string
): Promise<SendStatusResult> {
  const admin = await getAuthorizedAdmin('send_newsletter')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('newsletter_sends')
    .select('status, total_recipients, sent_count, failed_count, completed_at, is_simulation')
    .eq('id', sendId)
    .single()

  if (error || !data) {
    console.error('Error fetching newsletter send status:', error)
    return { success: false, error: "Erreur lors de la récupération du statut d'envoi" }
  }

  return {
    success: true,
    status: data.status,
    total_recipients: data.total_recipients,
    sent_count: data.sent_count,
    failed_count: data.failed_count,
    completed_at: data.completed_at,
    is_simulation: data.is_simulation,
  }
}

export async function exportNewsletterSubscribersCSV(): Promise<{ success: boolean; data?: string; error?: string }> {
  const admin = await getAuthorizedAdmin('send_newsletter')
  if (!admin) return { success: false, error: PERMISSION_DENIED }

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('email, numero, prenom, subscribed_at')
    .order('subscribed_at', { ascending: false })

  if (error) {
    console.error('Error exporting newsletter subscribers:', error)
    return { success: false, error: 'Erreur lors de l\'export' }
  }

  const headers = [
    'Email',
    'Numéro',
    'Prénom',
    'Date d\'inscription',
  ]

  const rows = (data ?? []).map((subscriber) => [
    subscriber.email,
    subscriber.numero ?? '',
    subscriber.prenom ?? '',
    subscriber.subscribed_at
      ? new Date(subscriber.subscribed_at).toLocaleDateString('fr-FR')
      : '',
  ])

  const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')

  return { success: true, data: csv }
}
