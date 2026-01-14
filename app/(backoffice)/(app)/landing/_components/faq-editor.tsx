'use client'

import { useState } from 'react'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { EditorWrapper } from './editor-wrapper'
import { FAQ } from '@/components/landing/faq'
import type { LandingSection, FAQContent, FAQItem } from '@/lib/types/landing.types'

interface FAQEditorProps {
  section: LandingSection
  adminId: string
}

const defaultFAQContent: FAQContent = {
  sectionTitle: '',
  sectionDescription: '',
  faqs: [],
}

export function FAQEditor({ section, adminId }: FAQEditorProps) {
  const sectionContent = section.content as FAQContent
  const [content, setContent] = useState<FAQContent>({
    ...defaultFAQContent,
    ...sectionContent,
    faqs: sectionContent?.faqs || [],
  })

  const updateContent = (updates: Partial<FAQContent>) => {
    setContent(prev => ({ ...prev, ...updates }))
  }

  const updateFAQ = (index: number, updates: Partial<FAQItem>) => {
    const newFAQs = [...(content.faqs || [])]
    newFAQs[index] = { ...newFAQs[index], ...updates }
    updateContent({ faqs: newFAQs })
  }

  const addFAQ = () => {
    updateContent({
      faqs: [...(content.faqs || []), { question: '', answer: '' }]
    })
  }

  const removeFAQ = (index: number) => {
    updateContent({
      faqs: (content.faqs || []).filter((_, i) => i !== index)
    })
  }

  return (
    <EditorWrapper
      section={section}
      adminId={adminId}
      content={content}
      onContentChange={(c) => setContent(c as FAQContent)}
      previewComponent={<FAQ content={content} />}
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="sectionTitle">Titre de la section</Label>
            <Input
              id="sectionTitle"
              value={content.sectionTitle}
              onChange={(e) => updateContent({ sectionTitle: e.target.value })}
              placeholder="Questions fréquentes"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sectionDescription">Description</Label>
            <Input
              id="sectionDescription"
              value={content.sectionDescription}
              onChange={(e) => updateContent({ sectionDescription: e.target.value })}
              placeholder="Tout ce que vous devez savoir sur TIA"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Questions / Réponses</Label>
            <Button type="button" variant="outline" size="sm" onClick={addFAQ}>
              <Plus className="h-4 w-4 mr-1" /> Ajouter
            </Button>
          </div>

          {(content.faqs || []).map((faq, index) => (
            <Card key={index}>
              <CardContent className="pt-4">
                <div className="flex gap-4">
                  <div className="flex items-start pt-2 text-muted-foreground">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Question</Label>
                      <Input
                        value={faq.question}
                        onChange={(e) => updateFAQ(index, { question: e.target.value })}
                        placeholder="TIA est-elle gratuite ?"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Réponse</Label>
                      <Textarea
                        value={faq.answer}
                        onChange={(e) => updateFAQ(index, { answer: e.target.value })}
                        placeholder="Oui, TIA propose une version gratuite..."
                        rows={4}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFAQ(index)}
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
