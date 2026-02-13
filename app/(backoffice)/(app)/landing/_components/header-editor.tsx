'use client'

import { useState } from 'react'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { EditorWrapper } from './editor-wrapper'
import { ImageUpload } from './image-upload'
import { Header } from '@/components/landing/header'
import type { LandingSection, HeaderContent, NavItem } from '@/lib/types/landing.types'

interface HeaderEditorProps {
  section: LandingSection
  adminId: string
}

const defaultHeaderContent: HeaderContent = {
  logo: '',
  navItems: [],
  ctaButton: { text: '', href: '' },
}

export function HeaderEditor({ section, adminId }: HeaderEditorProps) {
  const sectionContent = section.content as HeaderContent
  const [content, setContent] = useState<HeaderContent>({
    ...defaultHeaderContent,
    ...sectionContent,
    navItems: sectionContent?.navItems || [],
    ctaButton: {
      text: sectionContent?.ctaButton?.text || '',
      href: sectionContent?.ctaButton?.href || '',
    },
  })

  const updateContent = (updates: Partial<HeaderContent>) => {
    setContent(prev => ({ ...prev, ...updates }))
  }

  const updateCTAButton = (updates: Partial<HeaderContent['ctaButton']>) => {
    setContent(prev => ({
      ...prev,
      ctaButton: { ...(prev.ctaButton || {}), ...updates }
    }))
  }

  const updateNavItem = (index: number, updates: Partial<NavItem>) => {
    const newItems = [...(content.navItems || [])]
    newItems[index] = { ...newItems[index], ...updates }
    updateContent({ navItems: newItems })
  }

  const addNavItem = () => {
    updateContent({
      navItems: [...(content.navItems || []), { label: '', href: '' }]
    })
  }

  const removeNavItem = (index: number) => {
    updateContent({
      navItems: (content.navItems || []).filter((_, i) => i !== index)
    })
  }

  return (
    <EditorWrapper
      section={section}
      adminId={adminId}
      content={content}
      onContentChange={(c) => setContent(c as HeaderContent)}
      previewComponent={<Header content={content} />}
    >
      <div className="space-y-6">
        <ImageUpload
          label="Logo"
          value={content.logo}
          onChange={(url) => updateContent({ logo: url })}
          adminId={adminId}
        />

        <div className="border rounded-lg p-4 space-y-4">
          <Label className="text-base font-semibold">Bouton CTA</Label>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ctaText">Texte du bouton</Label>
              <Input
                id="ctaText"
                value={content.ctaButton?.text || ''}
                onChange={(e) => updateCTAButton({ text: e.target.value })}
                placeholder="Télécharger"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaHref">Lien du bouton</Label>
              <Input
                id="ctaHref"
                value={content.ctaButton?.href || ''}
                onChange={(e) => updateCTAButton({ href: e.target.value })}
                placeholder="https://play.google.com/... ou #section"
              />
              <p className="text-xs text-muted-foreground">Utilisez https://... pour un lien externe (nouvel onglet) ou #section pour un ancre interne</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Liens de navigation</Label>
            <Button type="button" variant="outline" size="sm" onClick={addNavItem}>
              <Plus className="h-4 w-4 mr-1" /> Ajouter
            </Button>
          </div>
          {(content.navItems || []).map((item, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex items-center text-muted-foreground">
                <GripVertical className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <Label className="text-xs">Label</Label>
                <Input
                  value={item.label}
                  onChange={(e) => updateNavItem(index, { label: e.target.value })}
                  placeholder="Fonctionnalités"
                />
              </div>
              <div className="flex-1">
                <Label className="text-xs">Lien (href)</Label>
                <Input
                  value={item.href}
                  onChange={(e) => updateNavItem(index, { href: e.target.value })}
                  placeholder="#features"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeNavItem(index)}
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
