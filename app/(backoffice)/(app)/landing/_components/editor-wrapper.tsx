'use client'

import { useState } from 'react'
import { Loader2, Save, Eye, EyeOff, RotateCcw, PartyPopper, ExternalLink, Check, Monitor, Tablet, Smartphone } from 'lucide-react'
import { PreviewFrame } from './preview-frame'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  updateLandingSection,
  publishLandingSection,
  unpublishLandingSection,
} from '@/actions/admin/landing.action'
import type { LandingSection, LandingSectionContent, SectionKey } from '@/lib/types/landing.types'

interface EditorWrapperProps {
  section: LandingSection
  adminId: string
  children: React.ReactNode
  content: LandingSectionContent
  onContentChange: (content: LandingSectionContent) => void
  previewComponent?: React.ReactNode
}

export function EditorWrapper({
  section,
  adminId,
  children,
  content,
  onContentChange,
  previewComponent,
}: EditorWrapperProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    const result = await updateLandingSection(
      section.section_key as SectionKey,
      content,
      adminId
    )

    if (result.success) {
      setSuccess('Modifications enregistrées')
      setTimeout(() => setSuccess(null), 3000)
    } else {
      setError(result.error || 'Erreur lors de la sauvegarde')
    }

    setIsSaving(false)
  }

  const handlePublish = async () => {
    setIsPublishing(true)
    setError(null)
    setSuccess(null)

    // First save the content, then publish
    const saveResult = await updateLandingSection(
      section.section_key as SectionKey,
      content,
      adminId
    )

    if (!saveResult.success) {
      setError(saveResult.error || 'Erreur lors de la sauvegarde')
      setIsPublishing(false)
      return
    }

    const publishResult = await publishLandingSection(section.section_key as SectionKey, adminId)

    if (publishResult.success) {
      setShowSuccessDialog(true)
    } else {
      setError(publishResult.error || 'Erreur lors de la publication')
    }

    setIsPublishing(false)
  }

  const handleUnpublish = async () => {
    setIsPublishing(true)
    setError(null)
    setSuccess(null)

    const result = await unpublishLandingSection(section.section_key as SectionKey, adminId)

    if (result.success) {
      setSuccess('Section dépubliée')
      setTimeout(() => setSuccess(null), 3000)
    } else {
      setError(result.error || 'Erreur')
    }

    setIsPublishing(false)
  }

  const handleReset = () => {
    onContentChange(section.content as LandingSectionContent)
    setSuccess('Modifications annulées')
    setTimeout(() => setSuccess(null), 3000)
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500 bg-green-50">
          <AlertDescription className="text-green-700">{success}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="sticky top-0 z-10 bg-card border-b py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <CardTitle>{section.section_name}</CardTitle>
                <CardDescription>
                  Modifiez le contenu de cette section
                </CardDescription>
              </div>
              <Badge variant={section.is_published ? "default" : "secondary"}>
                {section.is_published ? "Publié" : "Brouillon"}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={isSaving || isPublishing}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Annuler</span>
              </Button>

              {previewComponent && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(true)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Prévisualiser</span>
                </Button>
              )}

              {section.is_published && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUnpublish}
                  disabled={isPublishing}
                >
                  {isPublishing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <EyeOff className="h-4 w-4 mr-1" />
                  )}
                  <span className="hidden sm:inline">Dépublier</span>
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={isSaving || isPublishing}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-1" />
                )}
                <span className="hidden sm:inline">Sauvegarder</span>
              </Button>

              <Button
                size="sm"
                onClick={handlePublish}
                disabled={isSaving || isPublishing}
                className="bg-green-600 hover:bg-green-700"
              >
                {isPublishing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 mr-1" />
                )}
                <span className="hidden sm:inline">{section.is_published ? 'Mettre à jour' : 'Publier'}</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {children}
        </CardContent>
      </Card>

      {previewComponent && (
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="!max-w-[calc(100vw-2rem)] !w-[calc(100vw-2rem)] !max-h-[calc(100vh-2rem)] !h-[calc(100vh-2rem)] flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle>Prévisualisation</DialogTitle>
                  <DialogDescription>
                    Aperçu de la section avec le contenu actuel
                  </DialogDescription>
                </div>
                <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
                  <Button
                    variant={previewViewport === 'desktop' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setPreviewViewport('desktop')}
                    className="h-8 px-3"
                  >
                    <Monitor className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Desktop</span>
                  </Button>
                  <Button
                    variant={previewViewport === 'tablet' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setPreviewViewport('tablet')}
                    className="h-8 px-3"
                  >
                    <Tablet className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Tablette</span>
                  </Button>
                  <Button
                    variant={previewViewport === 'mobile' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setPreviewViewport('mobile')}
                    className="h-8 px-3"
                  >
                    <Smartphone className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Mobile</span>
                  </Button>
                </div>
              </div>
            </DialogHeader>
            <div className="flex-1 overflow-hidden bg-gray-100 rounded-lg p-4 flex justify-center items-start">
              <div className="w-full h-full flex justify-center">
                <PreviewFrame viewport={previewViewport}>
                  {previewComponent}
                </PreviewFrame>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <PartyPopper className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">
              Félicitations !
            </DialogTitle>
            <DialogDescription className="text-center">
              La section <strong>{section.section_name}</strong> a été {section.is_published ? 'mise à jour' : 'publiée'} avec succès sur votre site.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowSuccessDialog(false)}
              className="w-full sm:w-auto"
            >
              Continuer à éditer
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
            >
              <a href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Voir le site
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
