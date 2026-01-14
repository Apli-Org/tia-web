import { Suspense } from "react"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

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
import { Card, CardContent } from "@/components/ui/card"
import { getLandingSection } from "@/actions/admin/landing.action"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import { checkAdminAction } from "@/actions/admin/roles.action"
import { SECTION_METADATA, type SectionKey } from "@/lib/types/landing.types"

import { HeroEditor } from "../_components/hero-editor"
import { FeaturesEditor } from "../_components/features-editor"
import { HowItWorksEditor } from "../_components/how-it-works-editor"
import { TestimonialsEditor } from "../_components/testimonials-editor"
import { FAQEditor } from "../_components/faq-editor"
import { CTAEditor } from "../_components/cta-editor"
import { NewsletterEditor } from "../_components/newsletter-editor"
import { FooterEditor } from "../_components/footer-editor"
import { HeaderEditor } from "../_components/header-editor"

const validSections: SectionKey[] = [
  'header', 'hero', 'features', 'how_it_works',
  'testimonials', 'faq', 'cta', 'newsletter', 'footer'
]

interface PageProps {
  params: Promise<{ section: string }>
}

async function SectionEditor({ sectionKey, adminId }: { sectionKey: SectionKey; adminId: string }) {
  const section = await getLandingSection(sectionKey)

  if (!section) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Section non trouvée</p>
        </CardContent>
      </Card>
    )
  }

  const editorProps = {
    section,
    adminId,
  }

  switch (sectionKey) {
    case 'header':
      return <HeaderEditor {...editorProps} />
    case 'hero':
      return <HeroEditor {...editorProps} />
    case 'features':
      return <FeaturesEditor {...editorProps} />
    case 'how_it_works':
      return <HowItWorksEditor {...editorProps} />
    case 'testimonials':
      return <TestimonialsEditor {...editorProps} />
    case 'faq':
      return <FAQEditor {...editorProps} />
    case 'cta':
      return <CTAEditor {...editorProps} />
    case 'newsletter':
      return <NewsletterEditor {...editorProps} />
    case 'footer':
      return <FooterEditor {...editorProps} />
    default:
      return (
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Éditeur non disponible pour cette section</p>
          </CardContent>
        </Card>
      )
  }
}

function EditorSkeleton() {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-32" />
      </CardContent>
    </Card>
  )
}

export default async function SectionPage({ params }: PageProps) {
  const { section } = await params

  // Validate section key
  if (!validSections.includes(section as SectionKey)) {
    notFound()
  }

  const sectionKey = section as SectionKey

  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const canManageLanding = await checkAdminAction(admin.id, "manage_landing_page")
  if (!canManageLanding) {
    redirect("/dashboard")
  }

  const metadata = SECTION_METADATA.find(m => m.key === sectionKey)

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/landing">Landing Page</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{metadata?.name || sectionKey}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/landing">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {metadata?.name || sectionKey}
              </h1>
              <p className="text-muted-foreground">
                {metadata?.description || 'Modifiez le contenu de cette section'}
              </p>
            </div>
          </div>

          <Suspense fallback={<EditorSkeleton />}>
            <SectionEditor sectionKey={sectionKey} adminId={admin.id} />
          </Suspense>
        </div>
      </main>
    </>
  )
}
