"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Eye, UserPlus, UserMinus, CheckCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  type SupportTicket,
  assignTicket,
  updateTicketStatus,
} from "@/actions/admin/support"

type TicketActionsProps = {
  ticket: SupportTicket
  canManage: boolean
  currentAdminId: string
}

export function TicketActions({ ticket, canManage, currentAdminId }: TicketActionsProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleAssignToMe = () => {
    startTransition(async () => {
      const result = await assignTicket(ticket.id, currentAdminId)
      if (!result.success) {
        alert(result.error)
      }
    })
  }

  const handleUnassign = () => {
    startTransition(async () => {
      const result = await assignTicket(ticket.id, null)
      if (!result.success) {
        alert(result.error)
      }
    })
  }

  const handleMarkResolved = () => {
    startTransition(async () => {
      const result = await updateTicketStatus(ticket.id, "resolved")
      if (!result.success) {
        alert(result.error)
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MoreHorizontal className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(`/support/tickets/${ticket.id}`)}>
          <Eye className="h-4 w-4 mr-2" />
          Voir détails
        </DropdownMenuItem>

        {canManage && (
          <>
            <DropdownMenuSeparator />

            {!ticket.assigned_to ? (
              <DropdownMenuItem onClick={handleAssignToMe}>
                <UserPlus className="h-4 w-4 mr-2" />
                M&apos;assigner
              </DropdownMenuItem>
            ) : ticket.assigned_to === currentAdminId ? (
              <DropdownMenuItem onClick={handleUnassign}>
                <UserMinus className="h-4 w-4 mr-2" />
                Me désassigner
              </DropdownMenuItem>
            ) : null}

            {ticket.status !== "resolved" && ticket.status !== "closed" && (
              <DropdownMenuItem onClick={handleMarkResolved}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Marquer résolu
              </DropdownMenuItem>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
