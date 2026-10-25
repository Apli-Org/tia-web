'use client'

import { useState } from 'react'
import { Mail, Loader2, Eye, Send, CheckCircle2, FlaskConical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { RichTextEditor } from '@/components/newsletter/rich-text-editor'
import { NewsletterPreview } from '@/components/newsletter/newsletter-preview'
import { initiateNewsletterSend } from '@/actions/admin/newsletter.action'
import { SendProgress } from './send-progress'

type NewsletterFormProps = {
  subscriberCount: number
  selectedSubscriberIds: string[]
}

export function NewsletterForm({ subscriberCount, selectedSubscriberIds }: NewsletterFormProps) {
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('<p>Écrivez votre newsletter ici...</p>')
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ sent: number; failed?: number } | null>(null)
  const [activeSendId, setActiveSendId] = useState<string | null>(null)
  const [isSimulation, setIsSimulation] = useState(false)

  const handlePreview = () => {
    if (!subject.trim()) {
      setError('Le sujet est requis')
      return
    }
    if (!content.trim() || content.trim() === '<p></p>') {
      setError('Le contenu est requis')
      return
    }
    setError(null)
    setShowPreview(true)
  }

  const handleSendClick = () => {
    if (!subject.trim()) {
      setError('Le sujet est requis')
      return
    }
    if (!content.trim() || content.trim() === '<p></p>') {
      setError('Le contenu est requis')
      return
    }
    if (subscriberCount === 0 && selectedSubscriberIds.length === 0) {
      setError('Aucun abonné à la newsletter')
      return
    }
    setError(null)
    setShowConfirmation(true)
  }

  const handleSend = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    const result = await initiateNewsletterSend(
      subject,
      content,
      selectedSubscriberIds.length > 0 ? selectedSubscriberIds : undefined,
      isSimulation
    )

    if (result.success && result.sendId) {
      setActiveSendId(result.sendId)
      setShowConfirmation(false)
    } else {
      setError(result.error || 'Une erreur est survenue')
    }

    setIsLoading(false)
  }

  const handleSendComplete = () => {
    setActiveSendId(null)
    setSuccess({ sent: 0 })
    setSubject('')
    setContent('<p>Écrivez votre newsletter ici...</p>')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Mail className="h-6 w-6" />
          Composer une newsletter
        </CardTitle>
        <CardDescription>
          Envoyez un email personnalisé à tous les abonnés
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Newsletter envoyée avec succès à {success.sent} abonné(s)
              {success.failed && success.failed > 0 && ` (${success.failed} échec(s))`}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="subject">Sujet</Label>
          <Input
            id="subject"
            type="text"
            placeholder="Ex: Nouveautés de la semaine"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Contenu</Label>
          <RichTextEditor
            content={content}
            onChange={setContent}
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-orange-300 bg-orange-50">
          <Checkbox
            id="simulation"
            checked={isSimulation}
            onCheckedChange={(checked) => setIsSimulation(checked === true)}
          />
          <label htmlFor="simulation" className="flex items-center gap-2 text-sm cursor-pointer">
            <FlaskConical className="h-4 w-4 text-orange-600" />
            <span className="font-medium text-orange-700">Mode test (simulation)</span>
            <span className="text-muted-foreground">- Aucun email ne sera envoyé, simule le processus de batch</span>
          </label>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handlePreview}
            disabled={isLoading}
          >
            <Eye className="h-4 w-4 mr-2" />
            Prévisualiser
          </Button>
          <Button
            type="button"
            onClick={handleSendClick}
            disabled={isLoading || activeSendId !== null || (subscriberCount === 0 && selectedSubscriberIds.length === 0)}
            className={`flex-1 ${isSimulation ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Envoi en cours...
              </>
            ) : isSimulation ? (
              <>
                <FlaskConical className="h-4 w-4 mr-2" />
                Simuler l&apos;envoi à {selectedSubscriberIds.length > 0 ? `${selectedSubscriberIds.length} sélectionné${selectedSubscriberIds.length > 1 ? 's' : ''}` : `${subscriberCount} abonné${subscriberCount > 1 ? 's' : ''}`}
              </>
            ) : selectedSubscriberIds.length > 0 ? (
              <>
                <Send className="h-4 w-4 mr-2" />
                Envoyer à {selectedSubscriberIds.length} sélectionné{selectedSubscriberIds.length > 1 ? 's' : ''}
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Envoyer à {subscriberCount} abonné{subscriberCount > 1 ? 's' : ''}
              </>
            )}
          </Button>
        </div>

        {activeSendId && (
          <SendProgress
            sendId={activeSendId}
            onComplete={handleSendComplete}
          />
        )}

        {subscriberCount === 0 && selectedSubscriberIds.length === 0 && (
          <Alert>
            <AlertDescription>
              Aucun abonné inscrit à la newsletter pour le moment.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle>Prévisualisation de l'email</DialogTitle>
            <DialogDescription>
              Voici exactement à quoi ressemblera votre newsletter dans la boîte de réception
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            <NewsletterPreview subject={subject} content={content} />
          </div>
          <DialogFooter className="px-6 pb-6 pt-4">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{isSimulation ? 'Confirmer la simulation' : "Confirmer l'envoi"}</AlertDialogTitle>
            <AlertDialogDescription>
              {isSimulation ? (
                <>
                  Lancer une <strong>simulation de test</strong> pour{' '}
                  <strong>
                    {selectedSubscriberIds.length > 0
                      ? `${selectedSubscriberIds.length} abonné(s) sélectionné(s)`
                      : `${subscriberCount} abonné(s)`}
                  </strong> ?<br />
                  <br />
                  Aucun email ne sera réellement envoyé. Le processus de batch sera simulé pour tester le flux.
                </>
              ) : (
                <>
                  Êtes-vous sûr de vouloir envoyer cette newsletter à{' '}
                  <strong>
                    {selectedSubscriberIds.length > 0
                      ? `${selectedSubscriberIds.length} abonné(s) sélectionné(s)`
                      : `${subscriberCount} abonné(s)`}
                  </strong> ?<br />
                  <br />
                  L&apos;envoi sera effectué en arrière-plan par lots de 10 emails.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleSend} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Envoi...
                </>
              ) : (
                "Confirmer l'envoi"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
