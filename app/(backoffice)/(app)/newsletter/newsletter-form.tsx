'use client'

import { useState } from 'react'
import { Mail, Loader2, Eye, Send, CheckCircle2 } from 'lucide-react'
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
import { RichTextEditor } from '@/components/newsletter/rich-text-editor'
import { NewsletterPreview } from '@/components/newsletter/newsletter-preview'
import { sendNewsletter } from '@/actions/admin/newsletter.action'

type NewsletterFormProps = {
  adminId: string
  subscriberCount: number
}

export function NewsletterForm({ adminId, subscriberCount }: NewsletterFormProps) {
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('<p>Écrivez votre newsletter ici...</p>')
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ sent: number; failed?: number } | null>(null)

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
    if (subscriberCount === 0) {
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

    const result = await sendNewsletter(adminId, subject, content)

    if (result.success) {
      setSuccess({ sent: result.sent || 0, failed: result.failed })
      setSubject('')
      setContent('<p>Écrivez votre newsletter ici...</p>')
      setShowConfirmation(false)
    } else {
      setError(result.error || 'Une erreur est survenue')
    }

    setIsLoading(false)
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
            disabled={isLoading || subscriberCount === 0}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Envoyer à {subscriberCount} abonné{subscriberCount > 1 ? 's' : ''}
              </>
            )}
          </Button>
        </div>

        {subscriberCount === 0 && (
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
            <AlertDialogTitle>Confirmer l'envoi</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir envoyer cette newsletter à{' '}
              <strong>{subscriberCount} abonné(s)</strong> ?<br />
              <br />
              Cette action ne peut pas être annulée.
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
