'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Minus,
  Undo,
  Redo,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  disabled?: boolean
}

export function RichTextEditor({ content, onChange, disabled }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editable: !disabled,
    editorProps: {
      attributes: {
        class: 'prose prose-base max-w-none focus:outline-none min-h-[500px] p-6',
      },
    },
  })

  if (!editor) {
    return null
  }

  const ToolbarButton = ({
    onClick,
    isActive,
    disabled,
    icon: Icon,
    label
  }: {
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    icon: any
    label: string
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className={`h-9 w-9 p-0 ${isActive ? 'bg-muted' : ''}`}
      title={label}
    >
      <Icon className="h-4 w-4" />
    </Button>
  )

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="border-b bg-muted/30 p-2">
        <div className="flex flex-wrap gap-1 items-center">
          {/* Format de texte */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().setParagraph().run()}
              isActive={editor.isActive('paragraph')}
              disabled={disabled}
              icon={Type}
              label="Paragraphe"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive('heading', { level: 1 })}
              disabled={disabled}
              icon={Heading1}
              label="Titre 1"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive('heading', { level: 2 })}
              disabled={disabled}
              icon={Heading2}
              label="Titre 2"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor.isActive('heading', { level: 3 })}
              disabled={disabled}
              icon={Heading3}
              label="Titre 3"
            />
          </div>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Style de texte */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              disabled={!editor.can().chain().focus().toggleBold().run() || disabled}
              icon={Bold}
              label="Gras"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
              disabled={!editor.can().chain().focus().toggleItalic().run() || disabled}
              icon={Italic}
              label="Italique"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive('strike')}
              disabled={disabled}
              icon={Strikethrough}
              label="Barré"
            />
          </div>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Listes */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
              disabled={disabled}
              icon={List}
              label="Liste à puces"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
              disabled={disabled}
              icon={ListOrdered}
              label="Liste numérotée"
            />
          </div>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Autres */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive('blockquote')}
              disabled={disabled}
              icon={Quote}
              label="Citation"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              disabled={disabled}
              icon={Minus}
              label="Ligne horizontale"
            />
          </div>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Undo/Redo */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run() || disabled}
              icon={Undo}
              label="Annuler"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run() || disabled}
              icon={Redo}
              label="Rétablir"
            />
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="bg-white">
        <EditorContent
          editor={editor}
          className="newsletter-editor"
        />
      </div>

      <style jsx global>{`
        .newsletter-editor .ProseMirror {
          min-height: 500px;
          padding: 2rem;
          font-size: 16px;
          line-height: 1.75;
          color: #1f2937;
        }

        .newsletter-editor .ProseMirror:focus {
          outline: none;
        }

        .newsletter-editor .ProseMirror > * + * {
          margin-top: 0.75em;
        }

        .newsletter-editor .ProseMirror h1 {
          font-size: 2em;
          font-weight: 700;
          line-height: 1.2;
          color: #111827;
          margin-top: 1em;
          margin-bottom: 0.5em;
        }

        .newsletter-editor .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: 600;
          line-height: 1.3;
          color: #111827;
          margin-top: 1em;
          margin-bottom: 0.5em;
        }

        .newsletter-editor .ProseMirror h3 {
          font-size: 1.25em;
          font-weight: 600;
          line-height: 1.4;
          color: #374151;
          margin-top: 1em;
          margin-bottom: 0.5em;
        }

        .newsletter-editor .ProseMirror p {
          margin: 0.75em 0;
        }

        .newsletter-editor .ProseMirror ul,
        .newsletter-editor .ProseMirror ol {
          padding-left: 1.5em;
          margin: 0.75em 0;
        }

        .newsletter-editor .ProseMirror ul li,
        .newsletter-editor .ProseMirror ol li {
          margin: 0.25em 0;
          padding-left: 0.25em;
        }

        .newsletter-editor .ProseMirror ul {
          list-style-type: disc;
        }

        .newsletter-editor .ProseMirror ol {
          list-style-type: decimal;
        }

        .newsletter-editor .ProseMirror blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1em;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          color: #6b7280;
        }

        .newsletter-editor .ProseMirror hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2em 0;
        }

        .newsletter-editor .ProseMirror strong {
          font-weight: 700;
          color: #111827;
        }

        .newsletter-editor .ProseMirror em {
          font-style: italic;
        }

        .newsletter-editor .ProseMirror code {
          background-color: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-size: 0.9em;
          font-family: ui-monospace, monospace;
        }

        .newsletter-editor .ProseMirror pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
        }

        .newsletter-editor .ProseMirror pre code {
          background: none;
          padding: 0;
          color: inherit;
        }

        /* Placeholder */
        .newsletter-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  )
}
