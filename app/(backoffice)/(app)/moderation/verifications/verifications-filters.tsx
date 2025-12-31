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

type Props = {
  status?: string
}

export function VerificationsFilters({ status }: Props) {
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
        router.push(`/moderation/verifications?${params.toString()}`)
      })
    },
    [router, searchParams]
  )

  const clearFilters = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    startTransition(() => {
      router.push("/moderation/verifications")
    })
  }, [router])

  const hasFilters = status && status !== "all"

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
          <SelectItem value="approved">Approuvées</SelectItem>
          <SelectItem value="rejected">Rejetées</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" onClick={clearFilters} disabled={isPending}>
          Effacer les filtres
        </Button>
      )}

      {isPending && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
    </div>
  )
}
