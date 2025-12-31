import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  getTickets,
  type TicketFilters,
  type TicketStatus,
  type TicketPriority,
  statusLabels,
  priorityLabels,
  categoryLabels,
} from "@/actions/admin/support"
import { TicketActions } from "./ticket-actions"

type TicketsTableProps = {
  page: number
  filters: TicketFilters
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

function getInitials(name: string | null | undefined, email: string): string {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }
  return email.slice(0, 2).toUpperCase()
}

export async function TicketsTable({ page, filters, canManage, currentAdminId }: TicketsTableProps) {
  const { tickets, total } = await getTickets(page, 20, filters)

  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">Aucun ticket trouvé</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets ({total})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Sujet</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Assigné à</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {ticket.user
                          ? getInitials(ticket.user.firstName, ticket.user.email)
                          : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {ticket.user?.firstName || "Utilisateur"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {ticket.user?.email || "Email inconnu"}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/support/tickets/${ticket.id}`}
                    className="font-medium hover:underline"
                  >
                    {ticket.subject}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {categoryLabels[ticket.category] || ticket.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getPriorityVariant(ticket.priority)}>
                    {priorityLabels[ticket.priority]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(ticket.status)}>
                    {statusLabels[ticket.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  {ticket.assignee ? (
                    <span className="text-sm">
                      {ticket.assignee.full_name || ticket.assignee.email}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">Non assigné</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(ticket.created_at), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <TicketActions
                    ticket={ticket}
                    canManage={canManage}
                    currentAdminId={currentAdminId}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
