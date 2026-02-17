'use client'

import { useState, useEffect, useRef } from 'react'
import { Loader2, CheckCircle2, AlertCircle, FlaskConical } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getNewsletterSendStatus } from '@/actions/admin/newsletter.action'

type SendProgressProps = {
  adminId: string
  sendId: string
  onComplete: () => void
}

export function SendProgress({ adminId, sendId, onComplete }: SendProgressProps) {
  const [status, setStatus] = useState<string>('pending')
  const [totalRecipients, setTotalRecipients] = useState(0)
  const [sentCount, setSentCount] = useState(0)
  const [failedCount, setFailedCount] = useState(0)
  const [isSimulation, setIsSimulation] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const poll = async () => {
      const result = await getNewsletterSendStatus(adminId, sendId)
      if (!result.success) return

      setStatus(result.status ?? 'pending')
      setTotalRecipients(result.total_recipients ?? 0)
      setSentCount(result.sent_count ?? 0)
      setFailedCount(result.failed_count ?? 0)
      setIsSimulation(result.is_simulation ?? false)

      if (result.status === 'completed' || result.status === 'failed') {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        setTimeout(() => onComplete(), 1000)
      }
    }

    poll()
    intervalRef.current = setInterval(poll, 2000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [adminId, sendId, onComplete])

  const progress = totalRecipients > 0
    ? Math.round(((sentCount + failedCount) / totalRecipients) * 100)
    : 0

  if (status === 'completed') {
    return (
      <Alert className={isSimulation ? 'border-orange-500 bg-orange-50' : 'border-green-500 bg-green-50'}>
        {isSimulation ? (
          <FlaskConical className="h-4 w-4 text-orange-600" />
        ) : (
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        )}
        <AlertDescription className={isSimulation ? 'text-orange-800' : 'text-green-800'}>
          {isSimulation ? (
            <>Simulation terminée - {sentCount} email{sentCount > 1 ? 's' : ''} simulé{sentCount > 1 ? 's' : ''} (aucun email envoyé)</>
          ) : (
            <>
              Newsletter envoyée avec succès à {sentCount} abonné{sentCount > 1 ? 's' : ''}
              {failedCount > 0 && ` (${failedCount} échec(s))`}
            </>
          )}
        </AlertDescription>
      </Alert>
    )
  }

  if (status === 'failed') {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Échec de l&apos;envoi de la newsletter
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardContent className="py-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>
              {isSimulation ? 'Simulation en cours...' : 'Envoi en cours...'} {sentCount}/{totalRecipients} emails {isSimulation ? 'simulés' : 'envoyés'}
            </span>
            {isSimulation && (
              <span className="inline-flex items-center gap-1 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                <FlaskConical className="h-3 w-3" />
                TEST
              </span>
            )}
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {failedCount > 0 && (
            <p className="text-sm text-orange-600">{failedCount} échec(s)</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
