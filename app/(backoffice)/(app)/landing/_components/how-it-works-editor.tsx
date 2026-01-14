'use client'

import { useState } from 'react'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { EditorWrapper } from './editor-wrapper'
import { ImageUpload } from './image-upload'
import { HowItWorks } from '@/components/landing/how-it-works'
import type { LandingSection, HowItWorksContent, HowItWorksStep } from '@/lib/types/landing.types'

interface HowItWorksEditorProps {
  section: LandingSection
  adminId: string
}

const defaultHowItWorksContent: HowItWorksContent = {
  sectionTitle: '',
  sectionDescription: '',
  steps: [],
}

export function HowItWorksEditor({ section, adminId }: HowItWorksEditorProps) {
  const sectionContent = section.content as HowItWorksContent
  const [content, setContent] = useState<HowItWorksContent>({
    ...defaultHowItWorksContent,
    ...sectionContent,
    steps: sectionContent?.steps || [],
  })

  const updateContent = (updates: Partial<HowItWorksContent>) => {
    setContent(prev => ({ ...prev, ...updates }))
  }

  const updateStep = (index: number, updates: Partial<HowItWorksStep>) => {
    const newSteps = [...(content.steps || [])]
    newSteps[index] = { ...newSteps[index], ...updates }
    updateContent({ steps: newSteps })
  }

  const addStep = () => {
    const steps = content.steps || []
    const number = String(steps.length + 1).padStart(2, '0')
    updateContent({
      steps: [...steps, { number, title: '', description: '', image: '' }]
    })
  }

  const removeStep = (index: number) => {
    updateContent({
      steps: (content.steps || []).filter((_, i) => i !== index)
    })
  }

  return (
    <EditorWrapper
      section={section}
      adminId={adminId}
      content={content}
      onContentChange={(c) => setContent(c as HowItWorksContent)}
      previewComponent={<HowItWorks content={content} />}
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="sectionTitle">Titre de la section</Label>
            <Input
              id="sectionTitle"
              value={content.sectionTitle}
              onChange={(e) => updateContent({ sectionTitle: e.target.value })}
              placeholder="Comment ça marche"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sectionDescription">Description</Label>
            <Input
              id="sectionDescription"
              value={content.sectionDescription}
              onChange={(e) => updateContent({ sectionDescription: e.target.value })}
              placeholder="3 étapes simples pour trouver l'amour"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Étapes</Label>
            <Button type="button" variant="outline" size="sm" onClick={addStep}>
              <Plus className="h-4 w-4 mr-1" /> Ajouter
            </Button>
          </div>

          {(content.steps || []).map((step, index) => (
            <Card key={index}>
              <CardContent className="pt-4">
                <div className="flex gap-4">
                  <div className="flex items-start pt-2 text-muted-foreground">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-xs">Numéro</Label>
                        <Input
                          value={step.number}
                          onChange={(e) => updateStep(index, { number: e.target.value })}
                          placeholder="01"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Titre</Label>
                        <Input
                          value={step.title}
                          onChange={(e) => updateStep(index, { title: e.target.value })}
                          placeholder="Créez votre profil"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Description</Label>
                      <Textarea
                        value={step.description}
                        onChange={(e) => updateStep(index, { description: e.target.value })}
                        placeholder="Ajoutez vos photos, décrivez-vous..."
                        rows={2}
                      />
                    </div>
                    <ImageUpload
                      label="Screenshot de l'écran"
                      value={step.image}
                      onChange={(url) => updateStep(index, { image: url })}
                      adminId={adminId}
                      phoneFrame
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeStep(index)}
                    className="mt-2"
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
