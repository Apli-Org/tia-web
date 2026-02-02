'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { checkAdminAction } from './roles.action'
import { render } from '@react-email/render'
import { Resend } from 'resend'
import NewsletterEmail from '@/emails/newsletter'

const resend = new Resend(process.env.RESEND_API_KEY)

export type NewsletterResult = {
  success: boolean
  count?: number
  sent?: number
  failed?: number
  error?: string
}

export async function getNewsletterSubscriberCount(
  adminId: string
): Promise<NewsletterResult> {
  const hasPermission = await checkAdminAction(adminId, 'send_newsletter')
  if (!hasPermission) {
    return { success: false, error: 'Permission insuffisante' }
  }

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
  adminId: string,
  subject: string,
  htmlContent: string
): Promise<NewsletterResult> {
  const hasPermission = await checkAdminAction(adminId, 'send_newsletter')
  if (!hasPermission) {
    return { success: false, error: 'Permission insuffisante' }
  }

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
            from: process.env.RESEND_FROM_EMAIL || 'TIA <newsletter@tia-meet.com>',
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
      admin_id: adminId,
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

export async function exportNewsletterSubscribersCSV(
  adminId: string
): Promise<{ success: boolean; data?: string; error?: string }> {
  const hasPermission = await checkAdminAction(adminId, 'send_newsletter')
  if (!hasPermission) {
    return { success: false, error: 'Permission insuffisante' }
  }

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
