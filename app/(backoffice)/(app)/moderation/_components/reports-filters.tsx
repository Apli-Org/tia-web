"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTransition, useCallback } from "react"
import { Loader2 } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { ReportStatus, ReportReason } from "@/actions/admin/moderation-types"

type Props = {
  basePath: string
  status?: ReportStatus | "all"
  reason?: ReportReason | "all"
  showReasonFilter?: boolean
}

export function ReportsFilters({ basePath, status, reason, showReasonFilter = true }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== "all") {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete("page")
      window.scrollTo({ top: 0, behavior: "smooth" })
      startTransition(() => {
        router.push(`${basePath}?${params.toString()}`)
      })
    },
    [router, searchParams, basePath]
  )

  const clearFilters = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    startTransition(() => {
      router.push(basePath)
    })
  }, [router, basePath])

  const hasFilters = (status && status !== "all") || (reason && reason !== "all")

  return (
    <div className="flex flex-wrap items-center gap-4 sticky top-0 bg-background py-4 z-10 border-b mb-4">
      <Select
        value={status || "all"}
        onValueChange={(value) => updateFilter("status", value)}
        disabled={isPending}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="pending">En attente</SelectItem>
          <SelectItem value="reviewing">En cours</SelectItem>
          <SelectItem value="approved">Faux signalement</SelectItem>
          <SelectItem value="removed">Supprimé</SelectItem>
          <SelectItem value="user_warned">Averti</SelectItem>
          <SelectItem value="user_banned">Banni</SelectItem>
        </SelectContent>
      </Select>

      {showReasonFilter && (
        <Select
          value={reason || "all"}
          onValueChange={(value) => updateFilter("reason", value)}
          disabled={isPending}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Raison" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les raisons</SelectItem>
            <SelectItem value="nudity">Nudité</SelectItem>
            <SelectItem value="harassment">Harcèlement</SelectItem>
            <SelectItem value="fake">Faux profil</SelectItem>
            <SelectItem value="spam">Spam</SelectItem>
            <SelectItem value="violence">Violence</SelectItem>
            <SelectItem value="hate_speech">Discours haineux</SelectItem>
            <SelectItem value="minor">Mineur</SelectItem>
            <SelectItem value="other">Autre</SelectItem>
          </SelectContent>
        </Select>
      )}

      {hasFilters && (
        <Button variant="ghost" onClick={clearFilters} disabled={isPending}>
          Effacer les filtres
        </Button>
      )}

      {isPending && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
    </div>
  )
}
