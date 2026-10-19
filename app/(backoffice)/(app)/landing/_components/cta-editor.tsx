'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { EditorWrapper } from './editor-wrapper'
import { ImageUpload } from './image-upload'
import { CTA } from '@/components/landing/cta'
import type { LandingSection, CTAContent } from '@/lib/types/landing.types'

interface CTAEditorProps {
  section: LandingSection
  adminId: string
}

const defaultCTAContent: CTAContent = {
  badgeText: '',
  headline: '',
  headlineHighlight: '',
  subheadline: '',
  googlePlayBadge: '',
  appStoreBadge: '',
  googlePlayTooltip: '',
  appStoreTooltip: '',
  googlePlayHref: '',
  appStoreHref: '',
  stats: { users: '', usersLabel: '', status: '' },
}

export function CTAEditor({ section, adminId }: CTAEditorProps) {
  const sectionContent = section.content as CTAContent
  const [content, setContent] = useState<CTAContent>({
    ...defaultCTAContent,
    ...sectionContent,
    stats: {
      users: sectionContent?.stats?.users || '',
      usersLabel: sectionContent?.stats?.usersLabel || '',
      status: sectionContent?.stats?.status || '',
    },
  })

  const updateContent = (updates: Partial<CTAContent>) => {
    setContent(prev => ({ ...prev, ...updates }))
  }

  const updateStats = (updates: Partial<CTAContent['stats']>) => {
    setContent(prev => ({
      ...prev,
      stats: { ...(prev.stats || {}), ...updates }
    }))
  }

  return (
    <EditorWrapper
      section={section}
      adminId={adminId}
      content={content}
      onContentChange={(c) => setContent(c as CTAContent)}
      previewComponent={<CTA content={content} />}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="badgeText">Texte du badge</Label>
          <Input
            id="badgeText"
            value={content.badgeText}
            onChange={(e) => updateContent({ badgeText: e.target.value })}
            placeholder="Rejoignez-nous"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="headline">Titre</Label>
            <Input
              id="headline"
              value={content.headline}
              onChange={(e) => updateContent({ headline: e.target.value })}
              placeholder="Prêt à trouver"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="headlineHighlight">Titre (partie mise en valeur)</Label>
            <Input
              id="headlineHighlight"
              value={content.headlineHighlight}
              onChange={(e) => updateContent({ headlineHighlight: e.target.value })}
              placeholder="l'amour ?"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subheadline">Sous-titre</Label>
          <Textarea
            id="subheadline"
            value={content.subheadline}
            onChange={(e) => updateContent({ subheadline: e.target.value })}
            placeholder="Téléchargez Tia dès maintenant..."
            rows={2}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ImageUpload
            label="Badge Google Play"
            value={content.googlePlayBadge}
            onChange={(url) => updateContent({ googlePlayBadge: url })}
            adminId={adminId}
          />
          <ImageUpload
            label="Badge App Store"
            value={content.appStoreBadge}
            onChange={(url) => updateContent({ appStoreBadge: url })}
            adminId={adminId}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="googlePlayTooltip">Tooltip Google Play</Label>
            <Input
              id="googlePlayTooltip"
              value={content.googlePlayTooltip}
              onChange={(e) => updateContent({ googlePlayTooltip: e.target.value })}
              placeholder="Application en cours d'approbation..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="appStoreTooltip">Tooltip App Store</Label>
            <Input
              id="appStoreTooltip"
              value={content.appStoreTooltip}
              onChange={(e) => updateContent({ appStoreTooltip: e.target.value })}
              placeholder="Application en cours de développement..."
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="googlePlayHref">Lien Google Play</Label>
            <Input
              id="googlePlayHref"
              value={content.googlePlayHref || ''}
              onChange={(e) => updateContent({ googlePlayHref: e.target.value })}
              placeholder="https://play.google.com/store/apps/details?id=..."
            />
            <p className="text-xs text-muted-foreground">Laissez vide pour afficher &quot;Bientôt disponible&quot;</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="appStoreHref">Lien App Store</Label>
            <Input
              id="appStoreHref"
              value={content.appStoreHref || ''}
              onChange={(e) => updateContent({ appStoreHref: e.target.value })}
              placeholder="https://apps.apple.com/app/..."
            />
            <p className="text-xs text-muted-foreground">Laissez vide pour afficher &quot;Bientôt disponible&quot;</p>
          </div>
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <Label className="text-base font-semibold">Statistiques</Label>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="statsUsers">Nombre d&apos;utilisateurs</Label>
              <Input
                id="statsUsers"
                value={content.stats?.users || ''}
                onChange={(e) => updateStats({ users: e.target.value })}
                placeholder="2k+"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="statsUsersLabel">Label utilisateurs</Label>
              <Input
                id="statsUsersLabel"
                value={content.stats?.usersLabel || ''}
                onChange={(e) => updateStats({ usersLabel: e.target.value })}
                placeholder="Intéressés"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="statsStatus">Statut</Label>
              <Input
                id="statsStatus"
                value={content.stats?.status || ''}
                onChange={(e) => updateStats({ status: e.target.value })}
                placeholder="Bientôt"
              />
            </div>
          </div>
        </div>
      </div>
    </EditorWrapper>
  )
}
