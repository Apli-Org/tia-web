import { Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getNewsletterSubscriberCount } from '@/actions/admin/newsletter.action'
import { getCurrentAdmin } from '@/actions/admin/auth.action'

export async function NewsletterStats() {
  const admin = await getCurrentAdmin()
  if (!admin) return null

  const result = await getNewsletterSubscriberCount()
  const count = result.success && result.count !== undefined ? result.count : 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Abonnés Newsletter</CardTitle>
        <Mail className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">
          {count > 0 ? 'abonnés actifs' : 'aucun abonné'}
        </p>
      </CardContent>
    </Card>
  )
}
