import { Shield } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getStaffMembers } from "@/actions/admin/staff.action"
import { StaffActions } from "./staff-actions"

type StaffTableProps = {
  role?: string
  status?: "active" | "inactive"
  search?: string
  currentAdminId: string
}

function formatDate(dateString: string | null) {
  if (!dateString) return "Jamais"
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString))
}

function getInitials(name: string | null, email: string): string {
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

function getRoleColor(roleCode: string): string {
  const colors: Record<string, string> = {
    super_admin: "bg-red-100 text-red-700 border-red-200",
    admin: "bg-purple-100 text-purple-700 border-purple-200",
    moderator: "bg-blue-100 text-blue-700 border-blue-200",
    support: "bg-green-100 text-green-700 border-green-200",
  }
  return colors[roleCode] || "bg-gray-100 text-gray-700 border-gray-200"
}

export async function StaffTable({ role, status, search, currentAdminId }: StaffTableProps) {
  const staff = await getStaffMembers({ role, status, search })

  if (staff.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          Aucun membre du personnel trouvé
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {staff.length} membre{staff.length > 1 ? "s" : ""} du personnel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {staff.map((member) => (
            <div
              key={member.id}
              className={`flex items-center gap-4 p-4 rounded-lg border ${
                !member.is_active ? "opacity-50 bg-muted/50" : "bg-card"
              }`}
            >
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(member.full_name, member.email)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">
                    {member.full_name || "Sans nom"}
                  </p>
                  {member.id === currentAdminId && (
                    <Badge variant="secondary" className="text-xs">
                      Vous
                    </Badge>
                  )}
                  {!member.is_active && (
                    <Badge variant="outline" className="text-xs">
                      Inactif
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {member.email}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Dernière connexion: {formatDate(member.last_login)}
                </p>
              </div>

              <Badge className={`${getRoleColor(member.role)} flex items-center gap-1`}>
                <Shield className="h-3 w-3" />
                {member.role_name || member.role}
              </Badge>

              <StaffActions member={member} currentAdminId={currentAdminId} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
