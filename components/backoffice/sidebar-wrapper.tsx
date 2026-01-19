"use client"

import { Suspense } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/backoffice/app-sidebar"
import { PageTransition } from "@/components/backoffice/page-transition"
import { NavigationProgress } from "@/components/backoffice/navigation-progress"
import type { CurrentAdmin } from "@/actions/admin/auth.action"

type SidebarWrapperProps = {
  children: React.ReactNode
  admin: CurrentAdmin | null
}

export function SidebarWrapper({ children, admin }: SidebarWrapperProps) {
  return (
    <SidebarProvider>
      <Suspense fallback={null}>
        <NavigationProgress />
      </Suspense>
      <AppSidebar admin={admin} />
      <SidebarInset>
        <PageTransition>{children}</PageTransition>
      </SidebarInset>
    </SidebarProvider>
  )
}
