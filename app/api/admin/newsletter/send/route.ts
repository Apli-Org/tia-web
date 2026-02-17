import { processNewsletterBatches } from '@/lib/newsletter/process-batches'

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    const expectedToken = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { sendId } = await request.json()

    if (!sendId) {
      return Response.json({ success: false, error: 'sendId is required' }, { status: 400 })
    }

    processNewsletterBatches(sendId).catch(err => {
      console.error('Newsletter batch processing error:', err)
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Newsletter send route error:', error)
    return Response.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
