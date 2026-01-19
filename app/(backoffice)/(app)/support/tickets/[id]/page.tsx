import { Suspense } from "react"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, MessageSquare } from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import { checkAdminAction } from "@/actions/admin/roles.action"
import {
  getTicketById,
  getTicketMessages,
  getAssignableAdmins,
} from "@/actions/admin/support"
import { TicketHeader } from "./ticket-header"
import { TicketConversation } from "./ticket-conversation"
import { RefreshButton } from "@/components/backoffice/refresh-button"

type Params = Promise<{ id: string }>

function TicketSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  )
}

export default async function TicketDetailPage({
  params,
}: {
  params: Params
}) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const canViewTickets = await checkAdminAction(admin.id, "view_tickets")
  if (!canViewTickets) {
    redirect("/dashboard")
  }

  const { id } = await params
  const ticket = await getTicketById(id)

  if (!ticket) {
    notFound()
  }

  const canManageTickets = await checkAdminAction(admin.id, "manage_tickets")
  const [messages, admins] = await Promise.all([
    getTicketMessages(id),
    getAssignableAdmins(),
  ])

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/support">Support</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/support/tickets">Tickets</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>#{ticket.id.slice(0, 8)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <RefreshButton />
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href="/support/tickets">
                <Button variant="ghost" size="sm" className="-ml-2">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Retour
                </Button>
              </Link>
            </div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              {ticket.subject}
            </h1>
            <p className="text-muted-foreground">
              Ticket #{ticket.id.slice(0, 8)}
            </p>
          </div>

          <Suspense fallback={<TicketSkeleton />}>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <TicketConversation
                  ticket={ticket}
                  messages={messages}
                  canManage={canManageTickets}
                  currentAdminId={admin.id}
                />
              </div>
              <div>
                <TicketHeader
                  ticket={ticket}
                  admins={admins}
                  canManage={canManageTickets}
                  currentAdminId={admin.id}
                />
              </div>
            </div>
          </Suspense>
        </div>
      </main>
    </>
  )
}
