import { getPushCampaigns, type PushCampaign, type PushFilters } from '@/actions/admin/push.action'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DESTINATIONS, GENDERS, LANGUAGES, TERRITORIES, TIERS, labelFor } from './push-options'

function formatDate(value: string): string {
  return new Date(value).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Indian/Antananarivo',
  })
}

function describeFilters(campaign: PushCampaign): string {
  if (campaign.is_test) return 'Comptes de test'
  const filters: PushFilters = campaign.filters ?? {}
  const parts = [
    filters.territories?.map((value) => labelFor(TERRITORIES, value)).join(', '),
    filters.tiers?.map((value) => labelFor(TIERS, value)).join(', '),
    filters.genders?.map((value) => labelFor(GENDERS, value)).join(', '),
    filters.languages?.map((value) => labelFor(LANGUAGES, value)).join(', '),
    filters.verified === undefined ? undefined : filters.verified ? 'Vérifiés' : 'Non vérifiés',
    filters.registered_from && `Inscrits depuis le ${filters.registered_from}`,
    filters.registered_to && `Inscrits jusqu’au ${filters.registered_to}`,
  ].filter(Boolean)
  return parts.length > 0 ? parts.join(' · ') : 'Tous les membres'
}

function StatusBadge({ campaign }: { campaign: PushCampaign }) {
  if (campaign.status === 'sending') {
    return <Badge variant="secondary" className="bg-blue-100 text-blue-700">En cours</Badge>
  }
  if (campaign.status === 'failed') {
    return <Badge variant="secondary" className="bg-red-100 text-red-700">Échec</Badge>
  }
  return <Badge variant="secondary" className="bg-green-100 text-green-700">Envoyée</Badge>
}

export async function PushCampaignsTable() {
  const result = await getPushCampaigns()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique</CardTitle>
        <CardDescription>Les 20 derniers envois. « Acceptés » = pris en charge par Expo, pas forcément lus.</CardDescription>
      </CardHeader>
      <CardContent>
        {!result.success ? (
          <p className="text-sm text-destructive">{result.error}</p>
        ) : result.data.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucune campagne envoyée pour l’instant.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Cible</TableHead>
                <TableHead className="text-right">Visés</TableHead>
                <TableHead className="text-right">Acceptés</TableHead>
                <TableHead className="text-right">Refusés</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.data.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="whitespace-nowrap align-top">
                    <p>{formatDate(campaign.created_at)}</p>
                    <p className="text-xs text-muted-foreground">
                      {campaign.creator?.full_name ?? campaign.creator?.email ?? '-'}
                    </p>
                  </TableCell>
                  <TableCell className="max-w-sm align-top">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium">{campaign.title_fr}</p>
                      {campaign.is_test && <Badge variant="outline">Test</Badge>}
                      {campaign.category === 'promo' && <Badge variant="outline">Promo</Badge>}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{campaign.body_fr}</p>
                    <p className="text-xs text-muted-foreground">
                      {labelFor(DESTINATIONS, campaign.url ?? 'none')}
                    </p>
                  </TableCell>
                  <TableCell className="max-w-xs align-top text-xs text-muted-foreground">
                    {describeFilters(campaign)}
                  </TableCell>
                  <TableCell className="text-right align-top tabular-nums">
                    {campaign.recipients.toLocaleString('fr-FR')}
                  </TableCell>
                  <TableCell className="text-right align-top tabular-nums">
                    {campaign.sent_count.toLocaleString('fr-FR')}
                  </TableCell>
                  <TableCell className="text-right align-top tabular-nums">
                    {campaign.failed_count.toLocaleString('fr-FR')}
                  </TableCell>
                  <TableCell className="align-top">
                    <StatusBadge campaign={campaign} />
                    {campaign.error_message && (
                      <p className="mt-1 max-w-[12rem] truncate text-xs text-destructive">{campaign.error_message}</p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
