import { Shield } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllRoles } from "@/actions/admin/roles.action"
import { RoleRow } from "./role-row"

type RolesTableProps = {
  adminId: string
}

export async function RolesTable({ adminId }: RolesTableProps) {
  const roles = await getAllRoles()

  if (roles.length === 0) {
    return (
      <Card>
        <CardContent className="py-10">
          <p className="text-center text-muted-foreground">Aucun rôle trouvé</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {roles.length} rôle{roles.length > 1 ? "s" : ""}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {roles.map((role) => (
            <RoleRow key={role.id} role={role} adminId={adminId} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
