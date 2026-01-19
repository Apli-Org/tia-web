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
  getAllUserActivities,
  type UserActivityFilters,
  type ActivityType,
} from "@/actions/admin/activity.action"

type ActivityTableProps = {
  page: number
  filters: UserActivityFilters
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function getTypeVariant(type: ActivityType): "default" | "secondary" | "destructive" | "outline" {
  switch (type) {
    case "upgrade":
      return "default"
    case "subscription":
      return "secondary"
    case "purchase":
      return "outline"
    case "registration":
      return "default"
    case "report":
      return "destructive"
    default:
      return "outline"
  }
}

function getTypeLabel(type: ActivityType): string {
  switch (type) {
    case "upgrade":
      return "Upgrade"
    case "subscription":
      return "Abonnement"
    case "purchase":
      return "Achat"
    case "registration":
      return "Inscription"
    case "report":
      return "Signalement"
    default:
      return type
  }
}

export async function ActivityTable({ page, filters }: ActivityTableProps) {
  const { activities, total } = await getAllUserActivities(page, 20, filters)

  if (activities.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">Aucune activite trouvee</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activites ({total})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={`${activity.type}-${activity.id}`}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {getInitials(activity.user_name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {activity.user_name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getTypeVariant(activity.type)}>
                    {getTypeLabel(activity.type)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium">
                    {activity.action}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground max-w-[200px] truncate block">
                    {activity.details}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {activity.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {format(new Date(activity.created_at), "dd MMM yyyy", { locale: fr })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(activity.created_at), "HH:mm:ss", { locale: fr })}
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
