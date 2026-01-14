'use client'

import { useState } from 'react'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { EditorWrapper } from './editor-wrapper'
import { Features } from '@/components/landing/features'
import type { LandingSection, FeaturesContent, FeatureItem } from '@/lib/types/landing.types'

interface FeaturesEditorProps {
  section: LandingSection
  adminId: string
}

const iconOptions = [
  { value: 'sparkles', label: 'Étincelles' },
  { value: 'brain', label: 'Cerveau (IA)' },
  { value: 'shield', label: 'Bouclier' },
  { value: 'heart', label: 'Cœur' },
  { value: 'star', label: 'Étoile' },
  { value: 'zap', label: 'Éclair' },
]

const defaultFeaturesContent: FeaturesContent = {
  sectionTitle: '',
  sectionDescription: '',
  features: [],
}

export function FeaturesEditor({ section, adminId }: FeaturesEditorProps) {
  const sectionContent = section.content as FeaturesContent
  const [content, setContent] = useState<FeaturesContent>({
    ...defaultFeaturesContent,
    ...sectionContent,
    features: sectionContent?.features || [],
  })

  const updateContent = (updates: Partial<FeaturesContent>) => {
    setContent(prev => ({ ...prev, ...updates }))
  }

  const updateFeature = (index: number, updates: Partial<FeatureItem>) => {
    const newFeatures = [...(content.features || [])]
    newFeatures[index] = { ...newFeatures[index], ...updates }
    updateContent({ features: newFeatures })
  }

  const addFeature = () => {
    const features = content.features || []
    const number = String(features.length + 1).padStart(2, '0')
    updateContent({
      features: [...features, { number, title: '', description: '', icon: 'sparkles' }]
    })
  }

  const removeFeature = (index: number) => {
    updateContent({
      features: (content.features || []).filter((_, i) => i !== index)
    })
  }

  return (
    <EditorWrapper
      section={section}
      adminId={adminId}
      content={content}
      onContentChange={(c) => setContent(c as FeaturesContent)}
      previewComponent={<Features content={content} />}
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="sectionTitle">Titre de la section</Label>
            <Input
              id="sectionTitle"
              value={content.sectionTitle}
              onChange={(e) => updateContent({ sectionTitle: e.target.value })}
              placeholder="Fonctionnalités"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sectionDescription">Description</Label>
            <Input
              id="sectionDescription"
              value={content.sectionDescription}
              onChange={(e) => updateContent({ sectionDescription: e.target.value })}
              placeholder="Découvrez ce qui rend TIA unique"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Fonctionnalités</Label>
            <Button type="button" variant="outline" size="sm" onClick={addFeature}>
              <Plus className="h-4 w-4 mr-1" /> Ajouter
            </Button>
          </div>

          {(content.features || []).map((feature, index) => (
            <Card key={index}>
              <CardContent className="pt-4">
                <div className="flex gap-4">
                  <div className="flex items-center text-muted-foreground">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label className="text-xs">Numéro</Label>
                        <Input
                          value={feature.number}
                          onChange={(e) => updateFeature(index, { number: e.target.value })}
                          placeholder="01"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Titre</Label>
                        <Input
                          value={feature.title}
                          onChange={(e) => updateFeature(index, { title: e.target.value })}
                          placeholder="Swipe Immersif"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Icône</Label>
                        <Select
                          value={feature.icon}
                          onValueChange={(v) => updateFeature(index, { icon: v as FeatureItem['icon'] })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {iconOptions.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Description</Label>
                      <Textarea
                        value={feature.description}
                        onChange={(e) => updateFeature(index, { description: e.target.value })}
                        placeholder="Découvrez des profils via une expérience..."
                        rows={2}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFeature(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </EditorWrapper>
  )
}
