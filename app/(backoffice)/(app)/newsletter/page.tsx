import { Suspense } from 'react'
import { redirect } from 'next/navigation'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getCurrentAdmin } from '@/actions/admin/auth.action'
import { checkAdminAction } from '@/actions/admin/roles.action'
import { getNewsletterSubscriberCount } from '@/actions/admin/newsletter.action'
import { NewsletterStats } from './newsletter-stats'
import { NewsletterForm } from './newsletter-form'
import { RefreshButton } from '@/components/backoffice/refresh-button'

function StatsSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-3 w-24 mt-1" />
      </CardContent>
    </Card>
  )
}

function FormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-4 w-96 mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </CardContent>
    </Card>
  )
}

async function NewsletterFormWrapper() {
  const admin = await getCurrentAdmin()
  if (!admin) return null

  const result = await getNewsletterSubscriberCount(admin.id)
  const count = result.success && result.count !== undefined ? result.count : 0

  return <NewsletterForm adminId={admin.id} subscriberCount={count} />
}

export default async function NewsletterPage() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect('/login')
  }

  const canSendNewsletter = await checkAdminAction(admin.id, 'send_newsletter')
  if (!canSendNewsletter) {
    redirect('/dashboard')
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Newsletter</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <RefreshButton />
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Newsletter</h1>
            <p className="text-muted-foreground">
              Envoyez des emails personnalisés à tous les abonnés
            </p>
          </div>

          <Suspense fallback={<StatsSkeleton />}>
            <NewsletterStats />
          </Suspense>

          <Suspense fallback={<FormSkeleton />}>
            <NewsletterFormWrapper />
          </Suspense>
        </div>
      </main>
    </>
  )
}
