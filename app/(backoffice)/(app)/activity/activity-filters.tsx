"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState, useTransition } from "react"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type UserActivityFilters } from "@/actions/admin/activity.action"

type ActivityFiltersProps = {
  filters: UserActivityFilters
  activityTypes: Array<{ value: string; label: string }>
}

export function ActivityFilters({ filters, activityTypes }: ActivityFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState(filters.search || "")

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== "all") {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete("page")
      startTransition(() => {
        router.push(`/activity?${params.toString()}`)
      })
    },
    [router, searchParams]
  )

  const handleSearch = () => {
    updateFilters("search", search)
  }

  const clearFilters = () => {
    setSearch("")
    startTransition(() => {
      router.push("/activity")
    })
  }

  const hasFilters =
    filters.type ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.search

  return (
    <div className="flex flex-wrap items-center gap-4 sticky top-0 bg-background py-4 z-10">
      <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-sm">
        <Input
          placeholder="Rechercher un utilisateur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          disabled={isPending}
        />
        <Button
          variant="secondary"
          size="icon"
          onClick={handleSearch}
          disabled={isPending}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <Select
        value={filters.type || "all"}
        onValueChange={(value) => updateFilters("type", value)}
        disabled={isPending}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type d'activite" />
        </SelectTrigger>
        <SelectContent>
          {activityTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="date"
        value={filters.dateFrom || ""}
        onChange={(e) => updateFilters("dateFrom", e.target.value)}
        disabled={isPending}
        className="w-[150px]"
        placeholder="Du"
      />

      <Input
        type="date"
        value={filters.dateTo || ""}
        onChange={(e) => updateFilters("dateTo", e.target.value)}
        disabled={isPending}
        className="w-[150px]"
        placeholder="Au"
      />

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          disabled={isPending}
        >
          <X className="h-4 w-4 mr-1" />
          Effacer
        </Button>
      )}
    </div>
  )
}
