import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/backoffice/app-sidebar"
import { PageTransition } from "@/components/backoffice/page-transition"
import { getCurrentAdmin } from "@/actions/admin/auth.action"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await getCurrentAdmin()

  return (
    <SidebarProvider>
      <AppSidebar admin={admin} />
      <SidebarInset>
        <PageTransition>{children}</PageTransition>
      </SidebarInset>
    </SidebarProvider>
  )
}
