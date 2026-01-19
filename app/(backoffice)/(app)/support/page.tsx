import { Suspense } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import {
  Headphones,
  Ticket,
  Clock,
  CheckCircle,
  AlertCircle,
  UserX,
} from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import { checkAdminAction } from "@/actions/admin/roles.action"
import { getSupportStats } from "@/actions/admin/support"
import { RefreshButton } from "@/components/backoffice/refresh-button"

async function SupportStats() {
  const stats = await getSupportStats()

  const cards = [
    {
      title: "En attente",
      value: stats.pending,
      description: "tickets non traités",
      icon: Clock,
      iconColor: "text-yellow-600",
      showBadge: stats.pending > 0,
    },
    {
      title: "En cours",
      value: stats.inProgress,
      description: "en traitement",
      icon: AlertCircle,
      iconColor: "text-blue-600",
      showBadge: false,
    },
    {
      title: "Résolus",
      value: stats.resolved,
      description: "tickets fermés",
      icon: CheckCircle,
      iconColor: "text-green-600",
      showBadge: false,
    },
    {
      title: "Non assignés",
      value: stats.unassigned,
      description: "à prendre en charge",
      icon: UserX,
      iconColor: "text-red-600",
      showBadge: stats.unassigned > 0,
    },
    {
      title: "Temps moyen",
      value: stats.avgResolutionHours !== null ? `${stats.avgResolutionHours}h` : "-",
      description: "de résolution",
      icon: Clock,
      iconColor: "text-purple-600",
      showBadge: false,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className={`h-4 w-4 ${card.iconColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {card.value}
              {card.showBadge && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  Action requise
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-3 w-20 mt-1" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const quickLinks = [
  {
    title: "Tous les tickets",
    description: "Voir et gérer tous les tickets de support",
    icon: Ticket,
    href: "/support/tickets",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Tickets en attente",
    description: "Tickets non encore pris en charge",
    icon: Clock,
    href: "/support/tickets?status=pending",
    color: "bg-yellow-500/10 text-yellow-600",
  },
  {
    title: "Tickets urgents",
    description: "Tickets nécessitant une attention immédiate",
    icon: AlertCircle,
    href: "/support/tickets?priority=urgent",
    color: "bg-red-500/10 text-red-600",
  },
  {
    title: "Non assignés",
    description: "Tickets à assigner à un membre de l'équipe",
    icon: UserX,
    href: "/support/tickets?assigned_to=unassigned",
    color: "bg-orange-500/10 text-orange-600",
  },
]

export default async function SupportPage() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const canViewTickets = await checkAdminAction(admin.id, "view_tickets")
  if (!canViewTickets) {
    redirect("/dashboard")
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Support</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <RefreshButton />
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Headphones className="h-8 w-8" />
                Support
              </h1>
              <p className="text-muted-foreground">
                Gérez les tickets de support des utilisateurs
              </p>
            </div>
          </div>

          <Suspense fallback={<StatsSkeleton />}>
            <SupportStats />
          </Suspense>

          <div className="grid gap-4 md:grid-cols-2">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                  <CardHeader className="flex flex-row items-start gap-4">
                    <div className={`p-2 rounded-lg ${link.color}`}>
                      <link.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{link.title}</CardTitle>
                      <CardDescription>{link.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
