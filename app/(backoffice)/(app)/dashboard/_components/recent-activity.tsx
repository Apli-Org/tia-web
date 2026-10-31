import Link from "next/link"
import { ArrowUpRight, Crown, ShieldAlert, ShoppingBag, UserPlus, type LucideIcon } from "lucide-react"
import type { RecentActivity as RecentActivityEntry } from "@/actions/admin/dashboard.action"
import { cn } from "@/lib/utils"
import { DashboardTile } from "./dashboard-tile"

const ROW_ENTRANCE_MS = 70
const ROW_ENTRANCE_OFFSET_MS = 300

const KINDS: { prefix: string; icon: LucideIcon; chip: string }[] = [
  { prefix: "Signalement", icon: ShieldAlert, chip: "bg-tia-coral-50 text-tia-coral-600" },
  { prefix: "Achat", icon: ShoppingBag, chip: "bg-tia-plum-100 text-tia-orchid" },
  { prefix: "Inscription", icon: UserPlus, chip: "bg-tia-violet-100 text-tia-violet-600" },
]

const SUBSCRIPTION_KIND = { icon: Crown, chip: "bg-tia-violet-500 text-tia-plum-50" }

const STATUS_STYLES: Record<string, string> = {
  "En attente": "bg-tia-coral-50 text-tia-coral-700",
  "En cours": "bg-tia-violet-100 text-tia-violet-700",
  "Complété": "bg-tia-plum-100 text-tia-plum-700",
  "Vérifié": "bg-tia-plum-100 text-tia-plum-700",
}

const DEFAULT_STATUS_STYLE = "bg-tia-plum-100 text-tia-plum-600"

function getKind(action: string) {
  return KINDS.find((kind) => action.startsWith(kind.prefix)) ?? SUBSCRIPTION_KIND
}

type RecentActivityProps = {
  activities: RecentActivityEntry[]
  delayStep: number
  className?: string
}

export function RecentActivity({ activities, delayStep, className }: RecentActivityProps) {
  return (
    <DashboardTile
      title="Activité récente"
      description="Les dernières actions sur la plateforme"
      delayStep={delayStep}
      className={className}
      action={
        <Link
          href="/activity"
          className="group/link inline-flex h-8 shrink-0 items-center gap-1 rounded-full bg-tia-plum-100 px-3 text-[13px] font-semibold text-tia-plum-700 transition-colors hover:bg-tia-violet-500 hover:text-tia-plum-50"
        >
          Voir tout
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      }
    >
      {activities.length === 0 ? (
        <p className="flex flex-1 items-center justify-center rounded-2xl bg-tia-plum-100 py-10 text-[14px] text-tia-plum-500">
          Aucune activité récente
        </p>
      ) : (
        <ul className="-mx-2 flex flex-col">
          {activities.map((activity, index) => {
            const kind = getKind(activity.action)
            return (
              <li
                key={activity.id}
                className="group/row flex animate-tia-rise items-center gap-3 rounded-2xl px-2 py-2.5 transition-colors hover:bg-tia-plum-100 motion-reduce:animate-none"
                style={{ animationDelay: `${ROW_ENTRANCE_OFFSET_MS + index * ROW_ENTRANCE_MS}ms` }}
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 ease-tia-spring group-hover/row:scale-110",
                    kind.chip
                  )}
                >
                  <kind.icon className="size-4.5" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[14px] font-bold text-tia-plum-800">
                    {activity.user}
                    <span className="font-medium text-tia-plum-500"> · {activity.action}</span>
                  </span>
                  <span className="truncate text-[12px] text-tia-plum-500">
                    {activity.target} · {activity.time}
                  </span>
                </div>
                <span
                  className={cn(
                    "inline-flex h-6.5 shrink-0 items-center rounded-full px-2.5 text-[11px] font-bold",
                    STATUS_STYLES[activity.status] ?? DEFAULT_STATUS_STYLE
                  )}
                >
                  {activity.status}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </DashboardTile>
  )
}
