'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { EditorWrapper } from './editor-wrapper'
import { ImageUpload } from './image-upload'
import { Testimonials } from '@/components/landing/testimonials'
import type { LandingSection, TestimonialsContent, TestimonialItem } from '@/lib/types/landing.types'

interface TestimonialsEditorProps {
  section: LandingSection
  adminId: string
}

const defaultTestimonialsContent: TestimonialsContent = {
  sectionTitle: '',
  sectionDescription: '',
  badgeText: '',
  testimonials: [],
}

export function TestimonialsEditor({ section, adminId }: TestimonialsEditorProps) {
  const sectionContent = section.content as TestimonialsContent
  const [content, setContent] = useState<TestimonialsContent>({
    ...defaultTestimonialsContent,
    ...sectionContent,
    testimonials: sectionContent?.testimonials || [],
  })

  const updateContent = (updates: Partial<TestimonialsContent>) => {
    setContent(prev => ({ ...prev, ...updates }))
  }

  const updateTestimonial = (index: number, updates: Partial<TestimonialItem>) => {
    const newTestimonials = [...(content.testimonials || [])]
    newTestimonials[index] = { ...newTestimonials[index], ...updates }
    updateContent({ testimonials: newTestimonials })
  }

  const addTestimonial = () => {
    updateContent({
      testimonials: [...(content.testimonials || []), { quote: '', name: '', age: 25, avatar: '' }]
    })
  }

  const removeTestimonial = (index: number) => {
    updateContent({
      testimonials: (content.testimonials || []).filter((_, i) => i !== index)
    })
  }

  return (
    <EditorWrapper
      section={section}
      adminId={adminId}
      content={content}
      onContentChange={(c) => setContent(c as TestimonialsContent)}
      previewComponent={<Testimonials content={content} />}
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="sectionTitle">Titre de la section</Label>
            <Input
              id="sectionTitle"
              value={content.sectionTitle}
              onChange={(e) => updateContent({ sectionTitle: e.target.value })}
              placeholder="Témoignages"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sectionDescription">Description</Label>
            <Input
              id="sectionDescription"
              value={content.sectionDescription}
              onChange={(e) => updateContent({ sectionDescription: e.target.value })}
              placeholder="Ils ont testé Tia en avant-première"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="badgeText">Texte du badge</Label>
            <Input
              id="badgeText"
              value={content.badgeText}
              onChange={(e) => updateContent({ badgeText: e.target.value })}
              placeholder="Sur liste d'attente"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Témoignages</Label>
            <Button type="button" variant="outline" size="sm" onClick={addTestimonial}>
              <Plus className="h-4 w-4 mr-1" /> Ajouter
            </Button>
          </div>

          {(content.testimonials || []).map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-4">
                <div className="flex gap-4">
                  <div className="w-32 shrink-0">
                    <ImageUpload
                      label="Avatar"
                      value={testimonial.avatar}
                      onChange={(url) => updateTestimonial(index, { avatar: url })}
                      adminId={adminId}
                      className="[&>div]:h-32"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-xs">Nom</Label>
                        <Input
                          value={testimonial.name}
                          onChange={(e) => updateTestimonial(index, { name: e.target.value })}
                          placeholder="Marie"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Âge</Label>
                        <Input
                          type="number"
                          value={testimonial.age}
                          onChange={(e) => updateTestimonial(index, { age: parseInt(e.target.value) || 25 })}
                          placeholder="28"
                          min={18}
                          max={99}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Citation</Label>
                      <Textarea
                        value={testimonial.quote}
                        onChange={(e) => updateTestimonial(index, { quote: e.target.value })}
                        placeholder="J'ai hâte de découvrir Tia..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTestimonial(index)}
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
