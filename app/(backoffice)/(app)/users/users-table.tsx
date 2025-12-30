import {
  Ban,
  CheckCircle,
  XCircle,
  Crown,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUsers, type UsersFilter } from "@/actions/admin/users.action"
import { UserActions } from "./user-actions"
import { Pagination } from "./pagination"

type UsersTableProps = {
  page: number
  filters: UsersFilter
  canModify: boolean
}

function getTierBadge(tier: string | null) {
  switch (tier) {
    case "elite":
      return (
        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
          <Crown className="mr-1 h-3 w-3" />
          Elite
        </Badge>
      )
    case "gold":
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
          <Crown className="mr-1 h-3 w-3" />
          Gold
        </Badge>
      )
    case "silver":
      return (
        <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">
          <Crown className="mr-1 h-3 w-3" />
          Silver
        </Badge>
      )
    default:
      return (
        <Badge variant="outline">Base</Badge>
      )
  }
}

function getStatusBadge(isActive: boolean, bannedUntil: string | null) {
  if (bannedUntil && new Date(bannedUntil) > new Date()) {
    return (
      <Badge variant="destructive">
        <Ban className="mr-1 h-3 w-3" />
        Banni
      </Badge>
    )
  }
  if (!isActive) {
    return (
      <Badge variant="secondary">
        <XCircle className="mr-1 h-3 w-3" />
        Inactif
      </Badge>
    )
  }
  return (
    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
      <CheckCircle className="mr-1 h-3 w-3" />
      Actif
    </Badge>
  )
}

function calculateAge(birthdate: string | null): number | null {
  if (!birthdate) return null
  const today = new Date()
  const birth = new Date(birthdate)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

export async function UsersTable({ page, filters, canModify }: UsersTableProps) {
  const { users, total, totalPages } = await getUsers(page, 20, filters)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Liste des utilisateurs</CardTitle>
        <div className="text-sm text-muted-foreground">
          {total.toLocaleString("fr-FR")} utilisateur{total > 1 ? "s" : ""}
        </div>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucun utilisateur trouvé
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Âge / Genre</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Inscription</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.profilePhoto || undefined} />
                          <AvatarFallback>
                            {user.firstName?.charAt(0)?.toUpperCase() || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {user.firstName || "Sans nom"}
                          </div>
                          {user.is_verified && (
                            <Badge variant="outline" className="text-xs text-blue-600 border-blue-600">
                              Vérifié
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      {calculateAge(user.birthdate) ?? "-"} ans
                      {user.gender && (
                        <span className="text-muted-foreground ml-1">
                          / {user.gender === "homme" ? "H" : user.gender === "femme" ? "F" : "A"}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.location || "-"}
                    </TableCell>
                    <TableCell>{getTierBadge(user.current_tier)}</TableCell>
                    <TableCell>
                      {getStatusBadge(user.is_active, user.banned_until)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell>
                      <UserActions user={user} canModify={canModify} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                filters={filters}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
