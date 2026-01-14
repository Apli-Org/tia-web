import { Suspense } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import {
  Layout,
  Star,
  Sparkles,
  ListOrdered,
  Quote,
  HelpCircle,
  Megaphone,
  Mail,
  Menu,
  Check,
  X,
  ArrowRight,
} from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAllLandingSections } from "@/actions/admin/landing.action"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import { checkAdminAction } from "@/actions/admin/roles.action"
import type { SectionKey } from "@/lib/types/landing.types"

const sectionIcons: Record<SectionKey, React.ReactNode> = {
  header: <Menu className="h-5 w-5" />,
  hero: <Star className="h-5 w-5" />,
  features: <Sparkles className="h-5 w-5" />,
  how_it_works: <ListOrdered className="h-5 w-5" />,
  testimonials: <Quote className="h-5 w-5" />,
  faq: <HelpCircle className="h-5 w-5" />,
  cta: <Megaphone className="h-5 w-5" />,
  newsletter: <Mail className="h-5 w-5" />,
  footer: <Layout className="h-5 w-5" />,
}

const sectionColors: Record<SectionKey, string> = {
  header: "bg-slate-100 text-slate-600",
  hero: "bg-yellow-100 text-yellow-600",
  features: "bg-purple-100 text-purple-600",
  how_it_works: "bg-blue-100 text-blue-600",
  testimonials: "bg-pink-100 text-pink-600",
  faq: "bg-green-100 text-green-600",
  cta: "bg-orange-100 text-orange-600",
  newsletter: "bg-indigo-100 text-indigo-600",
  footer: "bg-gray-100 text-gray-600",
}

async function SectionsList() {
  const sections = await getAllLandingSections()

  const publishedCount = sections.filter(s => s.is_published).length

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sections totales</CardTitle>
            <Layout className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sections.length}</div>
            <p className="text-xs text-muted-foreground">sections configurées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publiées</CardTitle>
            <Check className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{publishedCount}</div>
            <p className="text-xs text-muted-foreground">sections actives</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non publiées</CardTitle>
            <X className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{sections.length - publishedCount}</div>
            <p className="text-xs text-muted-foreground">sections masquées</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const sectionKey = section.section_key as SectionKey
          return (
            <Card key={section.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${sectionColors[sectionKey]}`}>
                      {sectionIcons[sectionKey]}
                    </div>
                    <div>
                      <CardTitle className="text-base">{section.section_name}</CardTitle>
                      <CardDescription className="text-xs">
                        {section.section_key}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={section.is_published ? "default" : "secondary"}>
                    {section.is_published ? "Publié" : "Brouillon"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  Dernière modification:{" "}
                  {new Date(section.updated_at).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <Link href={`/landing/${section.section_key}`}>
                  <Button className="w-full" size="sm">
                    Modifier
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function SectionsListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-9 w-full mt-3" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default async function LandingPage() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const canManageLanding = await checkAdminAction(admin.id, "manage_landing_page")
  if (!canManageLanding) {
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
              <BreadcrumbPage>Landing Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Gestion du Landing Page</h1>
              <p className="text-muted-foreground">
                Modifiez le contenu de chaque section du landing page
              </p>
            </div>
            <Link href="/" target="_blank">
              <Button variant="outline">
                Voir le site
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <Suspense fallback={<SectionsListSkeleton />}>
            <SectionsList />
          </Suspense>
        </div>
      </main>
    </>
  )
}
