"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { useState, useTransition } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function StaffFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [search, setSearch] = useState(searchParams.get("search") ?? "")

  const currentRole = searchParams.get("role") ?? ""
  const currentStatus = searchParams.get("status") ?? ""

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    startTransition(() => {
      router.push(`/staff?${params.toString()}`)
    })
  }

  const handleSearch = () => {
    updateFilters("search", search)
  }

  const clearFilters = () => {
    setSearch("")
    startTransition(() => {
      router.push("/staff")
    })
  }

  const hasFilters = currentRole || currentStatus || searchParams.get("search")

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-sm">
        <Input
          placeholder="Rechercher par nom ou email..."
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
        value={currentRole || "all"}
        onValueChange={(value) => updateFilters("role", value)}
        disabled={isPending}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Rôle" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les rôles</SelectItem>
          <SelectItem value="super_admin">Super Admin</SelectItem>
          <SelectItem value="admin">Administrateur</SelectItem>
          <SelectItem value="moderator">Modérateur</SelectItem>
          <SelectItem value="support">Support</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={currentStatus || "all"}
        onValueChange={(value) => updateFilters("status", value)}
        disabled={isPending}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous</SelectItem>
          <SelectItem value="active">Actifs</SelectItem>
          <SelectItem value="inactive">Inactifs</SelectItem>
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
