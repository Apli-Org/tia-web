'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { EditorWrapper } from './editor-wrapper'
import { Newsletter } from '@/components/landing/newsletter'
import type { LandingSection, NewsletterContent } from '@/lib/types/landing.types'

interface NewsletterEditorProps {
  section: LandingSection
  adminId: string
}

const defaultNewsletterContent: NewsletterContent = {
  badgeText: '',
  headline: '',
  subheadline: '',
  inputLabel: '',
  inputPlaceholder: '',
  submitButtonText: '',
  submittingText: '',
  successTitle: '',
  successMessage: '',
  disclaimer: '',
}

export function NewsletterEditor({ section, adminId }: NewsletterEditorProps) {
  const sectionContent = section.content as NewsletterContent
  const [content, setContent] = useState<NewsletterContent>({
    ...defaultNewsletterContent,
    ...sectionContent,
  })

  const updateContent = (updates: Partial<NewsletterContent>) => {
    setContent(prev => ({ ...prev, ...updates }))
  }

  return (
    <EditorWrapper
      section={section}
      adminId={adminId}
      content={content}
      onContentChange={(c) => setContent(c as NewsletterContent)}
      previewComponent={<Newsletter content={content} />}
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="badgeText">Texte du badge</Label>
            <Input
              id="badgeText"
              value={content.badgeText}
              onChange={(e) => updateContent({ badgeText: e.target.value })}
              placeholder="Restez informé"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="headline">Titre</Label>
            <Input
              id="headline"
              value={content.headline}
              onChange={(e) => updateContent({ headline: e.target.value })}
              placeholder="Soyez les premiers informés"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subheadline">Sous-titre</Label>
          <Textarea
            id="subheadline"
            value={content.subheadline}
            onChange={(e) => updateContent({ subheadline: e.target.value })}
            placeholder="Inscrivez-vous à notre newsletter..."
            rows={2}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="inputLabel">Label du champ email</Label>
            <Input
              id="inputLabel"
              value={content.inputLabel}
              onChange={(e) => updateContent({ inputLabel: e.target.value })}
              placeholder="Adresse email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inputPlaceholder">Placeholder du champ email</Label>
            <Input
              id="inputPlaceholder"
              value={content.inputPlaceholder}
              onChange={(e) => updateContent({ inputPlaceholder: e.target.value })}
              placeholder="votre@email.com"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="submitButtonText">Texte du bouton</Label>
            <Input
              id="submitButtonText"
              value={content.submitButtonText}
              onChange={(e) => updateContent({ submitButtonText: e.target.value })}
              placeholder="S'inscrire à la newsletter"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="submittingText">Texte pendant soumission</Label>
            <Input
              id="submittingText"
              value={content.submittingText}
              onChange={(e) => updateContent({ submittingText: e.target.value })}
              placeholder="Inscription en cours..."
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="successTitle">Titre de succès</Label>
            <Input
              id="successTitle"
              value={content.successTitle}
              onChange={(e) => updateContent({ successTitle: e.target.value })}
              placeholder="Merci de votre inscription !"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="successMessage">Message de succès</Label>
            <Input
              id="successMessage"
              value={content.successMessage}
              onChange={(e) => updateContent({ successMessage: e.target.value })}
              placeholder="Vous recevrez bientôt..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="disclaimer">Disclaimer</Label>
          <Textarea
            id="disclaimer"
            value={content.disclaimer}
            onChange={(e) => updateContent({ disclaimer: e.target.value })}
            placeholder="En vous inscrivant, vous acceptez..."
            rows={2}
          />
        </div>
      </div>
    </EditorWrapper>
  )
}
