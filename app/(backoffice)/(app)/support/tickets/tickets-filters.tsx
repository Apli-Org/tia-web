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
import {
  type TicketFilters,
  statusLabels,
  priorityLabels,
  categoryLabels,
} from "@/actions/admin/support"

type TicketsFiltersProps = {
  filters: TicketFilters
  admins: Array<{ id: string; full_name: string | null; email: string }>
}

export function TicketsFilters({ filters, admins }: TicketsFiltersProps) {
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
        router.push(`/support/tickets?${params.toString()}`)
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
      router.push("/support/tickets")
    })
  }

  const hasFilters =
    filters.status ||
    filters.priority ||
    filters.category ||
    filters.assigned_to ||
    filters.search

  return (
    <div className="flex flex-wrap items-center gap-4 sticky top-0 bg-background py-4 z-10">
      <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-sm">
        <Input
          placeholder="Rechercher par sujet..."
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
        value={filters.status || "all"}
        onValueChange={(value) => updateFilters("status", value)}
        disabled={isPending}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          {Object.entries(statusLabels).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.priority || "all"}
        onValueChange={(value) => updateFilters("priority", value)}
        disabled={isPending}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Priorité" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes priorités</SelectItem>
          {Object.entries(priorityLabels).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.category || "all"}
        onValueChange={(value) => updateFilters("category", value)}
        disabled={isPending}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes catégories</SelectItem>
          {Object.entries(categoryLabels).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.assigned_to || "all"}
        onValueChange={(value) => updateFilters("assigned_to", value)}
        disabled={isPending}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Assigné à" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous</SelectItem>
          <SelectItem value="unassigned">Non assignés</SelectItem>
          {admins.map((admin) => (
            <SelectItem key={admin.id} value={admin.id}>
              {admin.full_name || admin.email}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
