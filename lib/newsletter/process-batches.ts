import { createAdminClient } from '@/lib/supabase/admin'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import NewsletterEmail from '@/emails/newsletter'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function processNewsletterBatches(sendId: string) {
  const supabase = createAdminClient()

  const { data: sendRecord, error: fetchError } = await supabase
    .from('newsletter_sends')
    .select('*')
    .eq('id', sendId)
    .single()

  if (fetchError || !sendRecord) {
    console.error('Failed to fetch send record:', fetchError)
    return
  }

  if (sendRecord.status !== 'pending') {
    console.error('Send record not in pending status:', sendRecord.status)
    return
  }

  await supabase
    .from('newsletter_sends')
    .update({ status: 'sending' })
    .eq('id', sendId)

  let subscribers: { id: string; email: string }[]

  if (sendRecord.subscriber_ids && Array.isArray(sendRecord.subscriber_ids) && sendRecord.subscriber_ids.length > 0) {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('id, email')
      .in('id', sendRecord.subscriber_ids)

    if (error || !data) {
      console.error('Failed to fetch selected subscribers:', error)
      await supabase
        .from('newsletter_sends')
        .update({ status: 'failed', error_message: 'Failed to fetch subscribers', completed_at: new Date().toISOString() })
        .eq('id', sendId)
      return
    }
    subscribers = data
  } else {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('id, email')
      .order('email')

    if (error || !data) {
      console.error('Failed to fetch all subscribers:', error)
      await supabase
        .from('newsletter_sends')
        .update({ status: 'failed', error_message: 'Failed to fetch subscribers', completed_at: new Date().toISOString() })
        .eq('id', sendId)
      return
    }
    subscribers = data
  }

  if (subscribers.length === 0) {
    await supabase
      .from('newsletter_sends')
      .update({ status: 'completed', total_recipients: 0, completed_at: new Date().toISOString() })
      .eq('id', sendId)
    return
  }

  await supabase
    .from('newsletter_sends')
    .update({ total_recipients: subscribers.length })
    .eq('id', sendId)

  const emailHtml = await render(
    NewsletterEmail({ subject: sendRecord.subject, htmlContent: sendRecord.html_content })
  )

  const BATCH_SIZE = 10
  let totalSent = 0
  let totalFailed = 0
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'TIA <newsletter@tia-meet.com>'
  const isSimulation = sendRecord.is_simulation === true

  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE)

    if (isSimulation) {
      await new Promise(resolve => setTimeout(resolve, 500))
      totalSent += batch.length
      console.log(`[SIMULATION] Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} emails simulated`)
    } else {
      try {
        const { error } = await resend.batch.send(
          batch.map(subscriber => ({
            from: fromEmail,
            to: [subscriber.email],
            subject: sendRecord.subject,
            html: emailHtml,
          }))
        )

        if (error) {
          console.error('Batch send error:', error)
          totalFailed += batch.length
        } else {
          totalSent += batch.length
        }
      } catch (error) {
        console.error('Batch send exception:', error)
        totalFailed += batch.length
      }
    }

    await supabase
      .from('newsletter_sends')
      .update({
        sent_count: totalSent,
        failed_count: totalFailed,
      })
      .eq('id', sendId)

    if (i + BATCH_SIZE < subscribers.length) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  const finalStatus = totalSent === 0 && totalFailed > 0 ? 'failed' : 'completed'
  await supabase
    .from('newsletter_sends')
    .update({
      status: finalStatus,
      sent_count: totalSent,
      failed_count: totalFailed,
      completed_at: new Date().toISOString(),
      ...(finalStatus === 'failed' ? { error_message: 'All emails failed to send' } : {}),
    })
    .eq('id', sendId)

  await supabase.from('admin_activity_logs').insert({
    admin_id: sendRecord.admin_id,
    action: 'send_newsletter',
    details: {
      send_id: sendId,
      subject: sendRecord.subject,
      total_subscribers: subscribers.length,
      sent: totalSent,
      failed: totalFailed,
      selected_recipients: sendRecord.subscriber_ids ? true : false,
      simulation: isSimulation,
    },
  })
}
