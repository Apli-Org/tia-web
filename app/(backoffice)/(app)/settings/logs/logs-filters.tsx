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
import { type ActivityFilters, actionLabels } from "@/actions/admin/settings"

type LogsFiltersProps = {
  filters: ActivityFilters
  admins: Array<{ id: string; name: string }>
  actions: string[]
}

export function LogsFilters({ filters, admins, actions }: LogsFiltersProps) {
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
        router.push(`/settings/logs?${params.toString()}`)
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
      router.push("/settings/logs")
    })
  }

  const hasFilters =
    filters.admin_id ||
    filters.action ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.search

  return (
    <div className="flex flex-wrap items-center gap-4 sticky top-0 bg-background py-4 z-10">
      <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-sm">
        <Input
          placeholder="Rechercher..."
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
        value={filters.admin_id || "all"}
        onValueChange={(value) => updateFilters("admin_id", value)}
        disabled={isPending}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Admin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les admins</SelectItem>
          {admins.map((admin) => (
            <SelectItem key={admin.id} value={admin.id}>
              {admin.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.action || "all"}
        onValueChange={(value) => updateFilters("action", value)}
        disabled={isPending}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Action" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les actions</SelectItem>
          {actions.map((action) => (
            <SelectItem key={action} value={action}>
              {actionLabels[action] || action}
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
