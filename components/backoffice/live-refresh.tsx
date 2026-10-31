"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const DEFAULT_INTERVAL_MS = 15_000

type LiveRefreshProps = {
  intervalMs?: number
  className?: string
}

export function LiveRefresh({ intervalMs = DEFAULT_INTERVAL_MS, className }: LiveRefreshProps) {
  const router = useRouter()

  useEffect(() => {
    const refreshIfVisible = () => {
      if (document.visibilityState === "visible") router.refresh()
    }

    const interval = window.setInterval(refreshIfVisible, intervalMs)
    document.addEventListener("visibilitychange", refreshIfVisible)

    return () => {
      window.clearInterval(interval)
      document.removeEventListener("visibilitychange", refreshIfVisible)
    }
  }, [router, intervalMs])

  return (
    <span className={cn("inline-flex items-center gap-2 text-[12px] font-semibold text-tia-plum-600", className)}>
      <span className="relative flex size-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-tia-violet-400 opacity-75 motion-reduce:animate-none" />
        <span className="relative size-2 rounded-full bg-tia-violet-500" />
      </span>
      En direct
    </span>
  )
}
