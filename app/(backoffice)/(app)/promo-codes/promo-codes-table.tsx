import { getPromoCodes, type PromoCodeFilters } from "@/actions/admin/promo-codes.action"
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
import { PromoCodeActions } from "./promo-code-actions"
import { Pagination } from "./pagination"

type PromoCodesTableProps = {
  page: number
  filters: {
    search?: string
    status?: "all" | "active" | "inactive" | "expired"
  }
  adminId: string
}

function getStatusBadge(code: {
  is_active: boolean
  valid_until: string | null
}) {
  const now = new Date()
  const isExpired = code.valid_until && new Date(code.valid_until) < now

  if (isExpired) {
    return (
      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
        Expiré
      </Badge>
    )
  }

  if (code.is_active) {
    return (
      <Badge variant="secondary" className="bg-green-100 text-green-700">
        Actif
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" className="bg-red-100 text-red-700">
      Inactif
    </Badge>
  )
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "-"
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export async function PromoCodesTable({
  page,
  filters,
  adminId,
}: PromoCodesTableProps) {
  const queryFilters: PromoCodeFilters = {
    page,
    limit: 10,
    search: filters.search,
    status: filters.status,
  }

  const { codes, total } = await getPromoCodes(queryFilters)
  const totalPages = Math.ceil(total / 10)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des Codes Promo ({total})</CardTitle>
      </CardHeader>
      <CardContent>
        {codes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucun code promo trouvé
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Réduction</TableHead>
                  <TableHead>Validité</TableHead>
                  <TableHead>Utilisations</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codes.map((code) => (
                  <TableRow key={code.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-mono font-bold text-primary">
                          {code.code}
                        </span>
                        {code.description && (
                          <span className="text-xs text-muted-foreground truncate max-w-48">
                            {code.description}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        -{code.discount_percent}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        <span>Du: {formatDate(code.valid_from)}</span>
                        <span>Au: {formatDate(code.valid_until)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{code.current_uses}</span>
                        <span className="text-muted-foreground">
                          / {code.max_uses ?? "∞"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(code)}</TableCell>
                    <TableCell className="text-right">
                      <PromoCodeActions
                        promoCode={code}
                        adminId={adminId}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination page={page} totalPages={totalPages} />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
