"use client"

import { useState, useTransition } from "react"
import { formatDistanceToNow, format } from "date-fns"
import { fr } from "date-fns/locale"
import { User, Calendar, Clock, Loader2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  type SupportTicket,
  type TicketStatus,
  type TicketPriority,
  statusLabels,
  priorityLabels,
  categoryLabels,
  assignTicket,
  updateTicketStatus,
  updateTicketPriority,
} from "@/actions/admin/support"

type TicketHeaderProps = {
  ticket: SupportTicket
  admins: Array<{ id: string; full_name: string | null; email: string }>
  canManage: boolean
  currentAdminId: string
}

function getStatusVariant(status: TicketStatus): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "pending":
      return "destructive"
    case "in_progress":
      return "default"
    case "resolved":
      return "secondary"
    case "closed":
      return "outline"
    default:
      return "outline"
  }
}

function getPriorityVariant(priority: TicketPriority): "default" | "secondary" | "destructive" | "outline" {
  switch (priority) {
    case "urgent":
      return "destructive"
    case "high":
      return "default"
    case "medium":
      return "secondary"
    case "low":
      return "outline"
    default:
      return "outline"
  }
}

export function TicketHeader({ ticket, admins, canManage, currentAdminId }: TicketHeaderProps) {
  const [isPending, startTransition] = useTransition()

  const handleStatusChange = (value: string) => {
    startTransition(async () => {
      const result = await updateTicketStatus(ticket.id, value as TicketStatus, currentAdminId)
      if (!result.success) {
        alert(result.error)
      }
    })
  }

  const handlePriorityChange = (value: string) => {
    startTransition(async () => {
      const result = await updateTicketPriority(ticket.id, value as TicketPriority, currentAdminId)
      if (!result.success) {
        alert(result.error)
      }
    })
  }

  const handleAssigneeChange = (value: string) => {
    startTransition(async () => {
      const assigneeId = value === "unassigned" ? null : value
      const result = await assignTicket(ticket.id, assigneeId, currentAdminId)
      if (!result.success) {
        alert(result.error)
      }
    })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center justify-between">
            Informations
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Statut</Label>
            {canManage ? (
              <Select
                value={ticket.status}
                onValueChange={handleStatusChange}
                disabled={isPending}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Badge variant={getStatusVariant(ticket.status)}>
                {statusLabels[ticket.status]}
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <Label>Priorité</Label>
            {canManage ? (
              <Select
                value={ticket.priority}
                onValueChange={handlePriorityChange}
                disabled={isPending}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(priorityLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Badge variant={getPriorityVariant(ticket.priority)}>
                {priorityLabels[ticket.priority]}
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <Label>Catégorie</Label>
            <Badge variant="outline">
              {categoryLabels[ticket.category] || ticket.category}
            </Badge>
          </div>

          <div className="space-y-2">
            <Label>Assigné à</Label>
            {canManage ? (
              <Select
                value={ticket.assigned_to || "unassigned"}
                onValueChange={handleAssigneeChange}
                disabled={isPending}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Non assigné" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Non assigné</SelectItem>
                  {admins.map((admin) => (
                    <SelectItem key={admin.id} value={admin.id}>
                      {admin.full_name || admin.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm">
                {ticket.assignee?.full_name || ticket.assignee?.email || "Non assigné"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Utilisateur</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {ticket.user?.firstName || "Utilisateur"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {ticket.user?.email || "Email inconnu"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Dates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              <p>Créé le {format(new Date(ticket.created_at), "dd MMM yyyy", { locale: fr })}</p>
              <p className="text-muted-foreground">
                {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true, locale: fr })}
              </p>
            </div>
          </div>
          {ticket.resolved_at && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p>Résolu le {format(new Date(ticket.resolved_at), "dd MMM yyyy", { locale: fr })}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
