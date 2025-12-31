import { Suspense } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import {
  Shield,
  IdCard,
  Image,
  MessageSquare,
  User,
  CheckCircle,
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
import { getModerationStats } from "@/actions/admin/reports.action"

async function ModerationStats() {
  const stats = await getModerationStats()

  const cards = [
    {
      title: "Vérifications CIN",
      value: stats.pendingVerifications,
      description: "en attente",
      icon: IdCard,
      iconColor: "text-blue-600",
      href: "/moderation/verifications",
    },
    {
      title: "Photos signalées",
      value: stats.pendingPhotos,
      description: "à examiner",
      icon: Image,
      iconColor: "text-orange-600",
      href: "/moderation/photos",
    },
    {
      title: "Messages signalés",
      value: stats.pendingMessages,
      description: "à examiner",
      icon: MessageSquare,
      iconColor: "text-purple-600",
      href: "/moderation/messages",
    },
    {
      title: "Profils signalés",
      value: stats.pendingProfiles,
      description: "à examiner",
      icon: User,
      iconColor: "text-red-600",
      href: "/moderation/profiles",
    },
    {
      title: "Traités aujourd'hui",
      value: stats.reviewedToday,
      description: "signalements",
      icon: CheckCircle,
      iconColor: "text-green-600",
      href: null,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => (
        <Card key={card.title} className={card.href ? "hover:bg-muted/50 transition-colors" : ""}>
          {card.href ? (
            <Link href={card.href}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className={`h-4 w-4 ${card.iconColor}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {card.value}
                  {card.value > 0 && card.href && (
                    <Badge variant="destructive" className="ml-2 text-xs">
                      En attente
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </Link>
          ) : (
            <>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className={`h-4 w-4 ${card.iconColor}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </>
          )}
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
    title: "Vérifications d'identité",
    description: "Examiner les demandes de vérification CIN des utilisateurs",
    icon: IdCard,
    href: "/moderation/verifications",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Photos signalées",
    description: "Modérer les photos inappropriées signalées",
    icon: Image,
    href: "/moderation/photos",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    title: "Messages signalés",
    description: "Examiner les messages de harcèlement ou spam",
    icon: MessageSquare,
    href: "/moderation/messages",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Profils signalés",
    description: "Vérifier les profils suspects ou faux",
    icon: User,
    href: "/moderation/profiles",
    color: "bg-red-500/10 text-red-600",
  },
]

export default async function ModerationPage() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const canViewReports = await checkAdminAction(admin.id, "view_reports")
  if (!canViewReports) {
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
              <BreadcrumbPage>Modération</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Shield className="h-8 w-8" />
                Modération
              </h1>
              <p className="text-muted-foreground">
                Gérez les signalements et vérifications d&apos;identité
              </p>
            </div>
          </div>

          <Suspense fallback={<StatsSkeleton />}>
            <ModerationStats />
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
