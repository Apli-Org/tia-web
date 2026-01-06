import { SidebarWrapper } from "@/components/backoffice/sidebar-wrapper"
import { getCurrentAdmin } from "@/actions/admin/auth.action"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await getCurrentAdmin()

  return <SidebarWrapper admin={admin}>{children}</SidebarWrapper>
}
