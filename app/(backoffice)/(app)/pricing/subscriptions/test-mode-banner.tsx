import { Alert, AlertDescription } from '@/components/ui/alert'
import { TestTube } from 'lucide-react'

interface TestModeBannerProps {
  enabled: boolean
}

export function TestModeBanner({ enabled }: TestModeBannerProps) {
  if (!enabled) return null

  return (
    <Alert className="border-orange-600 bg-orange-50 dark:bg-orange-950/20">
      <TestTube className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-900 dark:text-orange-100">
        <strong>Mode Test Activé</strong> - Tous les prix sont fixés à 300 Ar pour l&apos;app mobile.
        Les prix affichés ici sont ceux de production (non affectés).
      </AlertDescription>
    </Alert>
  )
}
