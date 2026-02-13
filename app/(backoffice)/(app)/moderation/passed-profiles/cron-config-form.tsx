"use client"

import { useState } from "react"
import { Loader2, Save, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { updateCronSetting, runResetNow, type CronSetting, type PassedProfilesStats } from "@/actions/admin/cron.action"

interface CronConfigFormProps {
  settings: CronSetting[]
  stats: PassedProfilesStats
  adminId: string
}

export function CronConfigForm({ settings, stats, adminId }: CronConfigFormProps) {
  const initialDays = parseInt(
    settings.find((s) => s.key === "reset_passed_profiles_days")?.value ?? "30"
  )
  const initialEnabled = settings.find((s) => s.key === "reset_passed_profiles_days")?.is_enabled ?? true

  const [days, setDays] = useState(initialDays)
  const [isEnabled, setIsEnabled] = useState(initialEnabled)
  const [loading, setLoading] = useState(false)
  const [runLoading, setRunLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSave = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const result = await updateCronSetting(
        adminId,
        'reset_passed_profiles_days',
        days.toString(),
        isEnabled
      )

      if (result.success) {
        setMessage("Configuration sauvegardée avec succès")
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage(`Erreur: ${result.error || "Impossible de sauvegarder les paramètres"}`)
      }
    } catch (error) {
      setMessage("Une erreur est survenue lors de la sauvegarde")
    } finally {
      setLoading(false)
    }
  }

  const handleRunNow = async () => {
    setRunLoading(true)
    setMessage(null)

    try {
      const result = await runResetNow(adminId)

      if (result.success) {
        setMessage("Réinitialisation exécutée avec succès")
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage(`Erreur: ${result.error || "Impossible d'exécuter la réinitialisation"}`)
      }
    } catch (error) {
      setMessage("Une erreur est survenue lors de l'exécution")
    } finally {
      setRunLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-lg text-sm ${
            message.startsWith("Erreur")
              ? "bg-red-50 text-red-800 border border-red-200 dark:bg-red-950 dark:text-red-200"
              : "bg-green-50 text-green-800 border border-green-200 dark:bg-green-950 dark:text-green-200"
          }`}
        >
          {message}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Configuration de la réinitialisation</CardTitle>
          <CardDescription>Paramètres du cron de réinitialisation des profils</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="days">Période de réinitialisation (jours)</Label>
            <Input
              id="days"
              type="number"
              value={days}
              onChange={(e) => setDays(Math.max(1, Math.min(365, parseInt(e.target.value) || 1)))}
              min="1"
              max="365"
              disabled={loading}
            />
            <p className="text-sm text-muted-foreground">
              Les profils passés depuis plus de {days} jour{days > 1 ? "s" : ""} seront à nouveau visibles dans les suggestions
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="cron-enabled" className="cursor-pointer">
                Cron activé
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Exécution automatique tous les jours à 3h00
              </p>
            </div>
            <Switch
              id="cron-enabled"
              checked={isEnabled}
              onCheckedChange={setIsEnabled}
              disabled={loading}
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={loading || (days === initialDays && isEnabled === initialEnabled)}
            className="w-full sm:w-auto"
          >
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            <Save className="h-4 w-4 mr-2" />
            Enregistrer
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exécution manuelle</CardTitle>
          <CardDescription>
            Exécuter immédiatement la réinitialisation des profils passés
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <span className="font-medium">{stats.toBeReset}</span> profil{stats.toBeReset > 1 ? "s" : ""} de plus de{" "}
              <span className="font-medium">{days}</span> jour{days > 1 ? "s" : ""} seront réinitialisés
            </p>
          </div>

          {runLoading ? (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <p className="text-sm font-medium">Réinitialisation en cours...</p>
            </div>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Play className="h-4 w-4 mr-2" />
                  Exécuter maintenant
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmer l&apos;exécution</AlertDialogTitle>
                  <AlertDialogDescription>
                    Êtes-vous sûr de vouloir réinitialiser tous les profils passés ?
                    Cette action ne peut pas être annulée.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRunNow}>
                    Exécuter
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
