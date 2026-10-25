"use client"

import { useState, useTransition, useEffect, useRef } from "react"
import Image from "next/image"
import { Upload, X, Loader2, AlertCircle, ImageIcon, Video } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  createAdvertisement,
  updateAdvertisement,
  uploadAdvertisementImage,
  uploadAdvertisementVideo,
} from "@/actions/admin/advertisements.action"
import type { Advertisement, MediaType } from "@/lib/types/advertisements.types"
import { toast } from "sonner"
import { AdMobilePreview } from "./ad-mobile-preview"

type AdModalProps = {
  isOpen: boolean
  onClose: () => void
  ad?: Advertisement | null
}

export function AdModal({ isOpen, onClose, ad }: AdModalProps) {
  const [isPending, startTransition] = useTransition()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isEditing = !!ad

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [mediaType, setMediaType] = useState<MediaType>("image")
  const [imageUrl, setImageUrl] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [targetUrl, setTargetUrl] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (isOpen) {
      if (ad) {
        setTitle(ad.title)
        setDescription(ad.description || "")
        setMediaType(ad.media_type || "image")
        setImageUrl(ad.image_url || "")
        setVideoUrl(ad.video_url || "")
        setTargetUrl(ad.target_url || "")
        setStartDate(ad.start_date ? ad.start_date.slice(0, 10) : "")
        setEndDate(ad.end_date ? ad.end_date.slice(0, 10) : "")
        setIsActive(ad.is_active)
      } else {
        setTitle("")
        setDescription("")
        setMediaType("image")
        setImageUrl("")
        setVideoUrl("")
        setTargetUrl("")
        setStartDate("")
        setEndDate("")
        setIsActive(true)
      }
      setUploadError(null)
    }
  }, [isOpen, ad])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadError(null)

    try {
      if (mediaType === "image") {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
        if (!allowedTypes.includes(file.type)) {
          setUploadError("Type de fichier non autorisé. Utilisez JPEG, PNG, WebP ou GIF.")
          return
        }

        if (file.size > 5 * 1024 * 1024) {
          setUploadError("Fichier trop volumineux (max 5MB)")
          return
        }

        const formData = new FormData()
        formData.append("file", file)

        const result = await uploadAdvertisementImage(formData)

        if (result.success && result.url) {
          setImageUrl(result.url)
        } else {
          setUploadError(result.error || "Erreur lors du téléchargement")
        }
      } else {
        const allowedTypes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"]
        if (!allowedTypes.includes(file.type)) {
          setUploadError("Type de fichier non autorisé. Utilisez MP4, WebM, OGG ou MOV.")
          return
        }

        if (file.size > 50 * 1024 * 1024) {
          setUploadError("Fichier trop volumineux (max 50MB)")
          return
        }

        const formData = new FormData()
        formData.append("file", file)

        const result = await uploadAdvertisementVideo(formData)

        if (result.success && result.url) {
          setVideoUrl(result.url)
        } else {
          setUploadError(result.error || "Erreur lors du téléchargement")
        }
      }
    } catch (err) {
      setUploadError("Erreur lors du téléchargement")
      console.error("Upload error:", err)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("Le titre est requis")
      return
    }

    if (mediaType === "image" && !imageUrl) {
      toast.error("L'image est requise")
      return
    }

    if (mediaType === "video" && !videoUrl) {
      toast.error("La vidéo est requise")
      return
    }

    const data = {
      title: title.trim(),
      description: description.trim() || undefined,
      media_type: mediaType,
      image_url: mediaType === "image" ? imageUrl : undefined,
      video_url: mediaType === "video" ? videoUrl : undefined,
      target_url: targetUrl.trim() || undefined,
      start_date: startDate ? new Date(startDate).toISOString() : undefined,
      end_date: endDate ? new Date(endDate).toISOString() : undefined,
      is_active: isActive,
    }

    startTransition(async () => {
      try {
        let result
        if (isEditing && ad) {
          result = await updateAdvertisement({ id: ad.id, ...data })
        } else {
          result = await createAdvertisement(data)
        }

        if (result.success) {
          toast.success(
            isEditing
              ? "Publicité mise à jour avec succès"
              : "Publicité créée avec succès"
          )
          onClose()
        } else {
          toast.error(result.error || "Une erreur est survenue")
        }
      } catch {
        toast.error("Une erreur est survenue")
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Modifier la publicité" : "Créer une publicité"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations de la publicité"
              : "Créez une nouvelle publicité pour afficher aux utilisateurs"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-6">
        <form onSubmit={handleSubmit} className="space-y-4 flex-1 min-w-0">
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de la publicité"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description de la publicité (optionnel)"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Type de média *</Label>
            <Tabs value={mediaType} onValueChange={(v) => setMediaType(v as MediaType)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="image" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Image
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Vidéo
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label>{mediaType === "image" ? "Image *" : "Vidéo *"}</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept={mediaType === "image"
                ? "image/jpeg,image/png,image/webp,image/gif"
                : "video/mp4,video/webm,video/ogg,video/quicktime"}
              onChange={handleFileSelect}
              className="hidden"
            />

            {mediaType === "image" && imageUrl ? (
              <div className="relative group">
                <div className="relative w-full h-40 rounded-lg overflow-hidden border bg-muted">
                  <Image
                    src={imageUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
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
                    onClick={() => setImageUrl("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : mediaType === "video" && videoUrl ? (
              <div className="relative group">
                <div className="relative w-full h-40 rounded-lg overflow-hidden border bg-muted">
                  <video
                    src={videoUrl}
                    className="w-full h-full object-cover"
                    controls
                    muted
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
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
                    onClick={() => setVideoUrl("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                {isUploading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                ) : (
                  <>
                    {mediaType === "image" ? (
                      <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                    ) : (
                      <Video className="h-8 w-8 text-muted-foreground mb-2" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      Cliquez pour télécharger
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {mediaType === "image"
                        ? "JPEG, PNG, WebP ou GIF (max 5MB)"
                        : "MP4, WebM, OGG ou MOV (max 50MB)"}
                    </span>
                  </>
                )}
              </div>
            )}

            {uploadError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <p className="text-sm">{uploadError}</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetUrl">URL de destination</Label>
            <Input
              id="targetUrl"
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de fin</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isActive">Publicité active</Label>
            <Switch
              id="isActive"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isPending || isUploading}>
              {isPending
                ? "Enregistrement..."
                : isEditing
                  ? "Mettre à jour"
                  : "Créer la publicité"}
            </Button>
          </DialogFooter>
        </form>

        {/* Mobile Preview */}
        <div className="hidden lg:flex items-center justify-center border-l pl-6">
          <AdMobilePreview
            title={title}
            description={description}
            mediaType={mediaType}
            imageUrl={imageUrl}
            videoUrl={videoUrl}
            targetUrl={targetUrl}
          />
        </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
