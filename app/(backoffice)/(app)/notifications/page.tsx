import { Suspense } from 'react'
import { redirect } from 'next/navigation'

import { getCurrentAdmin } from '@/actions/admin/auth.action'
import { RefreshButton } from '@/components/backoffice/refresh-button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { PushCampaignsTable } from './push-campaigns-table'
import { PushComposer } from './push-composer'

function HistorySkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}

export default async function NotificationsPage() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect('/login')
  }

  if (!admin.actions.includes('send_push')) {
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
              <BreadcrumbPage>Notifications push</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <RefreshButton />
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications push</h1>
            <p className="text-muted-foreground">Envoyez un push aux membres de l’app</p>
          </div>

          <PushComposer />

          <Suspense fallback={<HistorySkeleton />}>
            <PushCampaignsTable />
          </Suspense>
        </div>
      </main>
    </>
  )
}
