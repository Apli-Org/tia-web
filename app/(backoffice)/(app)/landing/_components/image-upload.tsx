'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { uploadLandingImage } from '@/actions/admin/landing.action'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  adminId: string
  label?: string
  className?: string
  phoneFrame?: boolean // Afficher l'image dans un cadre de téléphone
}

export function ImageUpload({ value, onChange, adminId, label, className, phoneFrame }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const result = await uploadLandingImage(file, adminId)
      if (result.success && result.url) {
        onChange(result.url)
      } else {
        setError(result.error || 'Erreur lors du téléchargement')
      }
    } catch (err) {
      // Handle network errors (often caused by body size limits on Vercel)
      const error = err as Error
      if (error.message?.includes('fetch') || error.message?.includes('network')) {
        setError('Erreur réseau - le fichier est peut-être trop volumineux')
      } else if (error.message?.includes('body') || error.message?.includes('size')) {
        setError('Fichier trop volumineux pour le serveur (max 50MB)')
      } else {
        setError(`Erreur: ${error.message || 'Échec du téléchargement'}`)
      }
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onChange('')
  }

  const isExternalUrl = value && !value.startsWith('/') && !value.includes('supabase')

  return (
    <div className={className}>
      {label && <label className="text-sm font-medium mb-2 block">{label}</label>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        className="hidden"
      />

      {value ? (
        <div className="relative group">
          {phoneFrame ? (
            // Affichage avec cadre de téléphone
            <div className="flex justify-center py-4">
              <div className="relative">
                {/* Cadre du téléphone */}
                <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-xl">
                  {/* Bord intérieur */}
                  <div className="bg-gray-800 rounded-[2.5rem] p-1">
                    {/* Écran */}
                    <div className="relative w-[180px] h-[380px] bg-black rounded-[2rem] overflow-hidden">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />
                      {/* Image de l'écran */}
                      {isExternalUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={value}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={value}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
                {/* Boutons latéraux */}
                <div className="absolute -right-1 top-24 w-1 h-8 bg-gray-700 rounded-r-sm" />
                <div className="absolute -right-1 top-36 w-1 h-12 bg-gray-700 rounded-r-sm" />
                <div className="absolute -left-1 top-28 w-1 h-16 bg-gray-700 rounded-l-sm" />
              </div>
            </div>
          ) : (
            // Affichage standard
            <div className="relative w-full h-48 rounded-lg overflow-hidden border bg-muted">
              {isExternalUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={value}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              )}
            </div>
          )}
          <div className={`absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 ${phoneFrame ? 'rounded-[3rem]' : 'rounded-lg'}`}>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              <span className="ml-2">Changer</span>
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-1 text-xs text-muted-foreground truncate text-center">{value}</div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
        >
          {isUploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          ) : (
            <>
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">
                Cliquez pour télécharger
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                JPEG, PNG, WebP ou GIF (max 5MB)
              </span>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 mt-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}
