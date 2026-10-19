'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EditorWrapper } from './editor-wrapper'
import { ImageUpload } from './image-upload'
import { Hero } from '@/components/landing/hero'
import type { LandingSection, HeroContent, FloatingBadge, SocialProofItem } from '@/lib/types/landing.types'

interface HeroEditorProps {
  section: LandingSection
  adminId: string
}

const defaultHeroContent: HeroContent = {
  badge: '',
  headline: '',
  headlineHighlight: '',
  subheadline: '',
  subheadlineKeywords: [],
  phoneImage: '',
  floatingBadges: [],
  socialProof: [],
  appStoreBadges: {
    googlePlay: { image: '', tooltip: '', href: '' },
    appStore: { image: '', tooltip: '', href: '' },
  },
  scrollIndicatorText: '',
}

export function HeroEditor({ section, adminId }: HeroEditorProps) {
  const sectionContent = section.content as HeroContent
  const [content, setContent] = useState<HeroContent>({
    ...defaultHeroContent,
    ...sectionContent,
    subheadlineKeywords: sectionContent?.subheadlineKeywords || [],
    floatingBadges: sectionContent?.floatingBadges || [],
    socialProof: sectionContent?.socialProof || [],
    appStoreBadges: {
      googlePlay: {
        image: sectionContent?.appStoreBadges?.googlePlay?.image || '',
        tooltip: sectionContent?.appStoreBadges?.googlePlay?.tooltip || '',
        href: sectionContent?.appStoreBadges?.googlePlay?.href || '',
      },
      appStore: {
        image: sectionContent?.appStoreBadges?.appStore?.image || '',
        tooltip: sectionContent?.appStoreBadges?.appStore?.tooltip || '',
        href: sectionContent?.appStoreBadges?.appStore?.href || '',
      },
    },
  })

  const updateContent = (updates: Partial<HeroContent>) => {
    setContent(prev => ({ ...prev, ...updates }))
  }

  const updateAppStoreBadge = (store: 'googlePlay' | 'appStore', updates: { image?: string; tooltip?: string; href?: string }) => {
    setContent(prev => ({
      ...prev,
      appStoreBadges: {
        ...prev.appStoreBadges,
        [store]: { ...prev.appStoreBadges[store], ...updates }
      }
    }))
  }

  const updateFloatingBadge = (index: number, updates: Partial<FloatingBadge>) => {
    const newBadges = [...(content.floatingBadges || [])]
    newBadges[index] = { ...newBadges[index], ...updates }
    updateContent({ floatingBadges: newBadges })
  }

  const addFloatingBadge = () => {
    updateContent({
      floatingBadges: [...(content.floatingBadges || []), { text: '', icon: 'heart', position: 'top-right' }]
    })
  }

  const removeFloatingBadge = (index: number) => {
    updateContent({
      floatingBadges: (content.floatingBadges || []).filter((_, i) => i !== index)
    })
  }

  const updateSocialProof = (index: number, updates: Partial<SocialProofItem>) => {
    const newItems = [...(content.socialProof || [])]
    newItems[index] = { ...newItems[index], ...updates }
    updateContent({ socialProof: newItems })
  }

  const addSocialProof = () => {
    updateContent({
      socialProof: [...(content.socialProof || []), { value: '', label: '', icon: 'users' }]
    })
  }

  const removeSocialProof = (index: number) => {
    updateContent({
      socialProof: (content.socialProof || []).filter((_, i) => i !== index)
    })
  }

  const updateSubheadlineKeyword = (index: number, value: string) => {
    const newKeywords = [...(content.subheadlineKeywords || [])]
    newKeywords[index] = value
    updateContent({ subheadlineKeywords: newKeywords })
  }

  const addSubheadlineKeyword = () => {
    updateContent({
      subheadlineKeywords: [...(content.subheadlineKeywords || []), '']
    })
  }

  const removeSubheadlineKeyword = (index: number) => {
    updateContent({
      subheadlineKeywords: (content.subheadlineKeywords || []).filter((_, i) => i !== index)
    })
  }

  return (
    <EditorWrapper
      section={section}
      adminId={adminId}
      content={content}
      onContentChange={(c) => setContent(c as HeroContent)}
      previewComponent={<Hero content={content} />}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="badge">Badge</Label>
          <Input
            id="badge"
            value={content.badge}
            onChange={(e) => updateContent({ badge: e.target.value })}
            placeholder="La révolution des rencontres"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="headline">Titre principal</Label>
            <Input
              id="headline"
              value={content.headline}
              onChange={(e) => updateContent({ headline: e.target.value })}
              placeholder="Swipez vers"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="headlineHighlight">Titre (partie mise en valeur)</Label>
            <Input
              id="headlineHighlight"
              value={content.headlineHighlight}
              onChange={(e) => updateContent({ headlineHighlight: e.target.value })}
              placeholder="votre avenir à deux"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subheadline">Sous-titre (texte avant mots-clés)</Label>
          <Textarea
            id="subheadline"
            value={content.subheadline}
            onChange={(e) => updateContent({ subheadline: e.target.value })}
            placeholder="Tia révolutionne les rencontres avec une expérience"
            rows={2}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Mots-clés du sous-titre</Label>
            <Button type="button" variant="outline" size="sm" onClick={addSubheadlineKeyword}>
              <Plus className="h-4 w-4 mr-1" /> Ajouter
            </Button>
          </div>
          {content.subheadlineKeywords?.map((keyword, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <Input
                  value={keyword}
                  onChange={(e) => updateSubheadlineKeyword(index, e.target.value)}
                  placeholder="immersive"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSubheadlineKeyword(index)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="scrollIndicatorText">Texte indicateur de scroll</Label>
          <Input
            id="scrollIndicatorText"
            value={content.scrollIndicatorText}
            onChange={(e) => updateContent({ scrollIndicatorText: e.target.value })}
            placeholder="Découvrir"
          />
        </div>

        <ImageUpload
          label="Image du téléphone"
          value={content.phoneImage}
          onChange={(url) => updateContent({ phoneImage: url })}
          adminId={adminId}
          phoneFrame
        />

        <div className="border rounded-lg p-4 space-y-4">
          <Label className="text-base font-semibold">Badges App Store</Label>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <ImageUpload
                label="Image Google Play"
                value={content.appStoreBadges?.googlePlay?.image || ''}
                onChange={(url) => updateAppStoreBadge('googlePlay', { image: url })}
                adminId={adminId}
              />
              <div className="space-y-2">
                <Label>Tooltip Google Play</Label>
                <Input
                  value={content.appStoreBadges?.googlePlay?.tooltip || ''}
                  onChange={(e) => updateAppStoreBadge('googlePlay', { tooltip: e.target.value })}
                  placeholder="Application en cours d'approbation..."
                />
              </div>
              <div className="space-y-2">
                <Label>Lien Google Play</Label>
                <Input
                  value={content.appStoreBadges?.googlePlay?.href || ''}
                  onChange={(e) => updateAppStoreBadge('googlePlay', { href: e.target.value })}
                  placeholder="https://play.google.com/store/apps/details?id=..."
                />
                <p className="text-xs text-muted-foreground">Laissez vide pour afficher &quot;Bientôt disponible&quot;</p>
              </div>
            </div>
            <div className="space-y-4">
              <ImageUpload
                label="Image App Store"
                value={content.appStoreBadges?.appStore?.image || ''}
                onChange={(url) => updateAppStoreBadge('appStore', { image: url })}
                adminId={adminId}
              />
              <div className="space-y-2">
                <Label>Tooltip App Store</Label>
                <Input
                  value={content.appStoreBadges?.appStore?.tooltip || ''}
                  onChange={(e) => updateAppStoreBadge('appStore', { tooltip: e.target.value })}
                  placeholder="Application en cours de développement..."
                />
              </div>
              <div className="space-y-2">
                <Label>Lien App Store</Label>
                <Input
                  value={content.appStoreBadges?.appStore?.href || ''}
                  onChange={(e) => updateAppStoreBadge('appStore', { href: e.target.value })}
                  placeholder="https://apps.apple.com/app/..."
                />
                <p className="text-xs text-muted-foreground">Laissez vide pour afficher &quot;Bientôt disponible&quot;</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Badges flottants</Label>
            <Button type="button" variant="outline" size="sm" onClick={addFloatingBadge}>
              <Plus className="h-4 w-4 mr-1" /> Ajouter
            </Button>
          </div>
          {content.floatingBadges?.map((badge, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label className="text-xs">Texte</Label>
                <Input
                  value={badge.text}
                  onChange={(e) => updateFloatingBadge(index, { text: e.target.value })}
                  placeholder="Match!"
                />
              </div>
              <div className="w-32">
                <Label className="text-xs">Icône</Label>
                <Select
                  value={badge.icon}
                  onValueChange={(v) => updateFloatingBadge(index, { icon: v as FloatingBadge['icon'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heart">Coeur</SelectItem>
                    <SelectItem value="sparkles">Étoiles</SelectItem>
                    <SelectItem value="emoji">Emoji</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-32">
                <Label className="text-xs">Position</Label>
                <Select
                  value={badge.position}
                  onValueChange={(v) => updateFloatingBadge(index, { position: v as FloatingBadge['position'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top-right">Haut droite</SelectItem>
                    <SelectItem value="left">Gauche</SelectItem>
                    <SelectItem value="right">Droite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFloatingBadge(index)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Preuves sociales</Label>
            <Button type="button" variant="outline" size="sm" onClick={addSocialProof}>
              <Plus className="h-4 w-4 mr-1" /> Ajouter
            </Button>
          </div>
          {content.socialProof?.map((item, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="w-24">
                <Label className="text-xs">Valeur</Label>
                <Input
                  value={item.value}
                  onChange={(e) => updateSocialProof(index, { value: e.target.value })}
                  placeholder="2k+"
                />
              </div>
              <div className="flex-1">
                <Label className="text-xs">Label</Label>
                <Input
                  value={item.label}
                  onChange={(e) => updateSocialProof(index, { label: e.target.value })}
                  placeholder="Utilisateurs intéressés"
                />
              </div>
              <div className="w-32">
                <Label className="text-xs">Icône</Label>
                <Select
                  value={item.icon}
                  onValueChange={(v) => updateSocialProof(index, { icon: v as SocialProofItem['icon'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="users">Utilisateurs</SelectItem>
                    <SelectItem value="heart">Coeur</SelectItem>
                    <SelectItem value="clock">Horloge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSocialProof(index)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </EditorWrapper>
  )
}
