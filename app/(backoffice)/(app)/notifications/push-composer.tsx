'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertTriangle, BellRing, FlaskConical, Loader2, Send, Users } from 'lucide-react'
import { toast } from 'sonner'

import {
  countPushAudience,
  getPushCampaign,
  sendPushCampaign,
  sendPushTest,
  type PushCampaign,
  type PushCategory,
  type PushFilters,
  type PushMessage,
} from '@/actions/admin/push.action'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { PushPreview } from './push-preview'
import {
  BODY_SOFT_LIMIT,
  DESTINATIONS,
  GENDERS,
  LANGUAGES,
  TERRITORIES,
  TIERS,
  TITLE_SOFT_LIMIT,
  type Option,
} from './push-options'

type Lang = 'fr' | 'en'
type VerifiedFilter = 'all' | 'yes' | 'no'

const TEST_EMAILS_STORAGE_KEY = 'tia-bo-push-test-emails'

function isQuietHours(): boolean {
  const hour = Number(
    new Intl.DateTimeFormat('fr-FR', { hour: 'numeric', hour12: false, timeZone: 'Indian/Antananarivo' }).format(
      new Date()
    )
  )
  return hour >= 22 || hour < 8
}

function CharCount({ value, soft, max }: { value: string; soft: number; max: number }) {
  const length = value.trim().length
  return (
    <span
      className={cn(
        'text-xs tabular-nums',
        length > soft ? 'text-orange-600' : 'text-muted-foreground'
      )}
    >
      {length}/{soft}
      {length > soft && length <= max && ' · risque d’être coupé'}
    </span>
  )
}

function OptionGroup({
  label,
  options,
  selected,
  onChange,
  disabled,
}: {
  label: string
  options: Option[]
  selected: string[]
  onChange: (values: string[]) => void
  disabled: boolean
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex cursor-pointer items-center gap-2 text-sm">
            <Checkbox
              checked={selected.includes(option.value)}
              disabled={disabled}
              onCheckedChange={(checked) =>
                onChange(
                  checked === true
                    ? [...selected, option.value]
                    : selected.filter((value) => value !== option.value)
                )
              }
            />
            {option.label}
          </label>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {selected.length === 0 ? 'Tous' : `${selected.length} sélectionné${selected.length > 1 ? 's' : ''}`}
      </p>
    </div>
  )
}

function CampaignProgress({ campaign }: { campaign: PushCampaign }) {
  const done = campaign.sent_count + campaign.failed_count
  const percent = campaign.recipients > 0 ? Math.round((done / campaign.recipients) * 100) : 0

  if (campaign.status === 'sending') {
    return (
      <Alert>
        <Loader2 className="h-4 w-4 animate-spin" />
        <AlertDescription>
          <div className="w-full space-y-2">
            <p>
              Envoi en cours : {done} / {campaign.recipients} traités ({percent} %)
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-primary transition-all" style={{ width: `${percent}%` }} />
            </div>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  if (campaign.status === 'failed') {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Envoi interrompu : {campaign.error_message ?? 'erreur inconnue'}. {campaign.sent_count} acceptés par
          Expo avant l’arrêt.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
      <BellRing className="h-4 w-4 text-green-600" />
      <AlertDescription className="text-green-800 dark:text-green-200">
        {campaign.is_test ? 'Test envoyé' : 'Campagne envoyée'} : {campaign.sent_count} accepté
        {campaign.sent_count > 1 ? 's' : ''} par Expo
        {campaign.failed_count > 0 && `, ${campaign.failed_count} refusé${campaign.failed_count > 1 ? 's' : ''}`}{' '}
        sur {campaign.recipients}.
      </AlertDescription>
    </Alert>
  )
}

export function PushComposer() {
  const router = useRouter()

  const [category, setCategory] = useState<PushCategory>('info')
  const [titleFr, setTitleFr] = useState('')
  const [bodyFr, setBodyFr] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [bodyEn, setBodyEn] = useState('')
  const [destination, setDestination] = useState('none')
  const [lang, setLang] = useState<Lang>('fr')

  const [territories, setTerritories] = useState<string[]>([])
  const [tiers, setTiers] = useState<string[]>([])
  const [genders, setGenders] = useState<string[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [verified, setVerified] = useState<VerifiedFilter>('all')
  const [registeredFrom, setRegisteredFrom] = useState('')
  const [registeredTo, setRegisteredTo] = useState('')

  const [audience, setAudience] = useState<number | null>(null)
  const [audienceLoading, setAudienceLoading] = useState(false)

  const [testEmails, setTestEmails] = useState('')
  const [isTesting, setIsTesting] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeCampaignId, setActiveCampaignId] = useState<string | null>(null)
  const [activeCampaign, setActiveCampaign] = useState<PushCampaign | null>(null)

  const filters = useMemo<PushFilters>(
    () => ({
      territories,
      tiers,
      genders,
      languages,
      verified: verified === 'all' ? undefined : verified === 'yes',
      registered_from: registeredFrom || undefined,
      registered_to: registeredTo || undefined,
    }),
    [territories, tiers, genders, languages, verified, registeredFrom, registeredTo]
  )

  const message: PushMessage = {
    category,
    titleFr,
    bodyFr,
    titleEn,
    bodyEn,
    url: destination === 'none' ? null : destination,
    filters,
  }

  const isSendingCampaign = activeCampaign?.status === 'sending' || (activeCampaignId !== null && !activeCampaign)
  const busy = isTesting || isSending || isSendingCampaign

  useEffect(() => {
    try {
      setTestEmails(localStorage.getItem(TEST_EMAILS_STORAGE_KEY) ?? '')
    } catch {}
  }, [])

  useEffect(() => {
    let cancelled = false
    setAudienceLoading(true)
    const timeout = setTimeout(async () => {
      const result = await countPushAudience(category, filters)
      if (cancelled) return
      setAudience(result.success ? result.data : null)
      if (!result.success) setError(result.error)
      setAudienceLoading(false)
    }, 400)
    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [category, filters])

  useEffect(() => {
    if (!activeCampaignId) return
    let stopped = false
    const poll = async () => {
      const result = await getPushCampaign(activeCampaignId)
      if (stopped || !result.success) return
      setActiveCampaign(result.data)
      if (result.data.status !== 'sending') {
        stopped = true
        clearInterval(interval)
        router.refresh()
      }
    }
    poll()
    const interval = setInterval(poll, 3000)
    return () => {
      stopped = true
      clearInterval(interval)
    }
  }, [activeCampaignId, router])

  const validate = (): boolean => {
    if (!titleFr.trim() || !bodyFr.trim() || !titleEn.trim() || !bodyEn.trim()) {
      setError('Les titres et textes FR et EN sont requis')
      setLang(!titleFr.trim() || !bodyFr.trim() ? 'fr' : 'en')
      return false
    }
    setError(null)
    return true
  }

  const startTracking = (campaignId: string) => {
    setActiveCampaign(null)
    setActiveCampaignId(campaignId)
  }

  const handleTest = async () => {
    if (!validate()) return
    const emails = testEmails.split(/[\s,;]+/).filter(Boolean)
    setIsTesting(true)
    const result = await sendPushTest(message, emails)
    setIsTesting(false)
    if (!result.success) {
      setError(result.error)
      return
    }
    try {
      localStorage.setItem(TEST_EMAILS_STORAGE_KEY, testEmails)
    } catch {}
    toast.success('Test lancé')
    startTracking(result.data)
  }

  const handleSendClick = () => {
    if (!validate()) return
    if (!audience) {
      setError('Aucun membre joignable ne correspond à ces critères')
      return
    }
    setShowConfirmation(true)
  }

  const handleSend = async () => {
    setIsSending(true)
    const result = await sendPushCampaign(message)
    setIsSending(false)
    setShowConfirmation(false)
    if (!result.success) {
      setError(result.error)
      return
    }
    toast.success('Campagne lancée')
    startTracking(result.data)
  }

  const resetFilters = () => {
    setTerritories([])
    setTiers([])
    setGenders([])
    setLanguages([])
    setVerified('all')
    setRegisteredFrom('')
    setRegisteredTo('')
  }

  const previewTitle = lang === 'fr' ? titleFr : titleEn
  const previewBody = lang === 'fr' ? bodyFr : bodyEn
  const audienceLabel = audience === null ? '…' : audience.toLocaleString('fr-FR')
  const plural = (audience ?? 0) > 1 ? 's' : ''

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Message</CardTitle>
            <CardDescription>Chaque membre le reçoit dans la langue de son app.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Type</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                {(
                  [
                    { value: 'info', title: 'Info', description: 'Annonce de service, envoyée à tous les membres ciblés' },
                    {
                      value: 'promo',
                      title: 'Promo',
                      description: 'Offre ou nouveauté, seulement aux membres qui l’ont acceptée dans l’app',
                    },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    disabled={busy}
                    onClick={() => setCategory(option.value)}
                    className={cn(
                      'rounded-lg border p-3 text-left transition-colors',
                      category === option.value ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                    )}
                  >
                    <p className="text-sm font-medium">{option.title}</p>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <Tabs value={lang} onValueChange={(value) => setLang(value as Lang)}>
              <TabsList>
                <TabsTrigger value="fr">Français</TabsTrigger>
                <TabsTrigger value="en">Anglais</TabsTrigger>
              </TabsList>
              {(
                [
                  { value: 'fr', title: titleFr, setTitle: setTitleFr, body: bodyFr, setBody: setBodyFr },
                  { value: 'en', title: titleEn, setTitle: setTitleEn, body: bodyEn, setBody: setBodyEn },
                ] as const
              ).map((fields) => (
                <TabsContent key={fields.value} value={fields.value} className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`title-${fields.value}`}>Titre</Label>
                      <CharCount value={fields.title} soft={TITLE_SOFT_LIMIT} max={100} />
                    </div>
                    <Input
                      id={`title-${fields.value}`}
                      value={fields.title}
                      maxLength={100}
                      disabled={busy}
                      onChange={(event) => fields.setTitle(event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`body-${fields.value}`}>Texte</Label>
                      <CharCount value={fields.body} soft={BODY_SOFT_LIMIT} max={500} />
                    </div>
                    <Textarea
                      id={`body-${fields.value}`}
                      value={fields.body}
                      maxLength={500}
                      rows={3}
                      disabled={busy}
                      onChange={(event) => fields.setBody(event.target.value)}
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="space-y-2">
              <Label>Au tap, ouvrir</Label>
              <Select value={destination} onValueChange={setDestination} disabled={busy}>
                <SelectTrigger className="w-56">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DESTINATIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1.5">
              <CardTitle>Ciblage</CardTitle>
              <CardDescription>
                Sans filtre, tous les membres joignables. Comptes bannis, désactivés ou en suppression exclus.
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={resetFilters} disabled={busy}>
              Réinitialiser
            </Button>
          </CardHeader>
          <CardContent className="space-y-5">
            <OptionGroup label="Pays" options={TERRITORIES} selected={territories} onChange={setTerritories} disabled={busy} />
            <OptionGroup label="Offre" options={TIERS} selected={tiers} onChange={setTiers} disabled={busy} />
            <div className="grid gap-5 sm:grid-cols-2">
              <OptionGroup label="Genre" options={GENDERS} selected={genders} onChange={setGenders} disabled={busy} />
              <OptionGroup
                label="Langue de l'app"
                options={LANGUAGES}
                selected={languages}
                onChange={setLanguages}
                disabled={busy}
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Identité vérifiée</Label>
                <Select value={verified} onValueChange={(value) => setVerified(value as VerifiedFilter)} disabled={busy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="yes">Vérifiés</SelectItem>
                    <SelectItem value="no">Non vérifiés</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="registered-from">Inscrits depuis le</Label>
                <Input
                  id="registered-from"
                  type="date"
                  value={registeredFrom}
                  disabled={busy}
                  onChange={(event) => setRegisteredFrom(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registered-to">Inscrits jusqu’au</Label>
                <Input
                  id="registered-to"
                  type="date"
                  value={registeredTo}
                  disabled={busy}
                  onChange={(event) => setRegisteredTo(event.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6 xl:sticky xl:top-6 xl:self-start">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Aperçu</CardTitle>
            <Tabs value={lang} onValueChange={(value) => setLang(value as Lang)}>
              <TabsList>
                <TabsTrigger value="fr">FR</TabsTrigger>
                <TabsTrigger value="en">EN</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <PushPreview title={previewTitle} body={previewBody} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Envoi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-2xl font-semibold tabular-nums">
                  {audienceLoading && audience === null ? <Loader2 className="h-5 w-5 animate-spin" /> : audienceLabel}
                </p>
                <p className="text-xs text-muted-foreground">
                  membre{plural} joignable{plural}
                  {category === 'promo' && ', ayant accepté les promos'}
                </p>
              </div>
              {audienceLoading && audience !== null && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
            </div>

            <div className="space-y-2 rounded-lg border border-dashed p-4">
              <Label htmlFor="test-emails" className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                Envoi test
              </Label>
              <Input
                id="test-emails"
                placeholder="emails des comptes de l’équipe dans l’app"
                value={testEmails}
                disabled={busy}
                onChange={(event) => setTestEmails(event.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Seuls ces comptes reçoivent le test, sans tenir compte du ciblage.
              </p>
              <Button variant="outline" className="w-full" onClick={handleTest} disabled={busy || !testEmails.trim()}>
                {isTesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FlaskConical className="mr-2 h-4 w-4" />}
                Envoyer le test
              </Button>
            </div>

            {isQuietHours() && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>Il est entre 22 h et 8 h à Madagascar.</AlertDescription>
              </Alert>
            )}

            <Button className="w-full" onClick={handleSendClick} disabled={busy || audienceLoading || !audience}>
              <Send className="mr-2 h-4 w-4" />
              Envoyer à {audienceLabel} membre{plural}
            </Button>

            {activeCampaign && <CampaignProgress campaign={activeCampaign} />}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Envoyer la campagne ?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2">
                <p>
                  <strong>{audienceLabel}</strong> membre{plural} {plural ? 'vont' : 'va'} recevoir « {titleFr.trim()} »
                  {category === 'promo' ? ' (promo).' : '.'}
                </p>
                <p>L’envoi ne peut pas être annulé une fois lancé.</p>
                {isQuietHours() && <p className="text-orange-600">Il est entre 22 h et 8 h à Madagascar.</p>}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSending}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault()
                handleSend()
              }}
              disabled={isSending}
            >
              {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Envoyer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
