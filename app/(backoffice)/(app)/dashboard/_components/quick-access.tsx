"use client"

import { NAV_ITEMS } from "@/components/backoffice/nav-items"
import { HoverEffect } from "@/components/ui/hover-effect"
import { DashboardTile } from "./dashboard-tile"

const DASHBOARD_URL = "/dashboard"

type QuickAccessProps = {
  actions: string[]
  delayStep: number
  className?: string
}

export function QuickAccess({ actions, delayStep, className }: QuickAccessProps) {
  const items = NAV_ITEMS.filter((item) => item.url !== DASHBOARD_URL && actions.includes(item.action)).map(
    ({ title, description, url, icon }) => ({ title, description, href: url, icon })
  )

  if (items.length === 0) return null

  return (
    <DashboardTile title="Accès rapide" description="Les sections de votre rôle" delayStep={delayStep} className={className}>
      <HoverEffect items={items} className="-m-1" />
    </DashboardTile>
  )
}
