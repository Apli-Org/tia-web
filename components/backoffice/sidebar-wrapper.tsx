"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/backoffice/app-sidebar"
import { PageTransition } from "@/components/backoffice/page-transition"
import type { CurrentAdmin } from "@/actions/admin/auth.action"

type SidebarWrapperProps = {
  children: React.ReactNode
  admin: CurrentAdmin | null
}

export function SidebarWrapper({ children, admin }: SidebarWrapperProps) {
  return (
    <SidebarProvider>
      <AppSidebar admin={admin} />
      <SidebarInset>
        <PageTransition>{children}</PageTransition>
      </SidebarInset>
    </SidebarProvider>
  )
}
