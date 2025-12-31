import { format } from "date-fns"
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
  getActivityLogs,
  type ActivityFilters,
  actionLabels,
} from "@/actions/admin/settings"

type LogsTableProps = {
  page: number
  filters: ActivityFilters
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

function getActionVariant(action: string): "default" | "secondary" | "destructive" | "outline" {
  if (action.includes("delete") || action.includes("ban") || action.includes("reject")) {
    return "destructive"
  }
  if (action.includes("create") || action.includes("verify")) {
    return "default"
  }
  if (action.includes("update") || action.includes("assign")) {
    return "secondary"
  }
  return "outline"
}

function formatDetails(details: Record<string, unknown> | null): string {
  if (!details) return "-"

  const parts: string[] = []

  if (details.email) parts.push(`Email: ${details.email}`)
  if (details.role) parts.push(`Rôle: ${details.role}`)
  if (details.ticket_id) parts.push(`Ticket: #${String(details.ticket_id).slice(0, 8)}`)
  if (details.previous_status && details.new_status) {
    parts.push(`${details.previous_status} → ${details.new_status}`)
  }
  if (details.action) parts.push(`Action: ${details.action}`)

  return parts.length > 0 ? parts.join(", ") : "-"
}

export async function LogsTable({ page, filters }: LogsTableProps) {
  const { logs, total } = await getActivityLogs(page, 50, filters)

  if (logs.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">Aucune activité trouvée</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activités ({total})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Admin</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Détails</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {log.admin
                          ? getInitials(log.admin.full_name, log.admin.email)
                          : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {log.admin?.full_name || "Admin"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {log.admin?.email || "Email inconnu"}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getActionVariant(log.action)}>
                    {actionLabels[log.action] || log.action}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground max-w-[300px] truncate block">
                    {formatDetails(log.details)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {format(new Date(log.created_at), "dd MMM yyyy", { locale: fr })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(log.created_at), "HH:mm:ss", { locale: fr })}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
