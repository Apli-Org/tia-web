"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import {
  ArrowRight,
  ChevronRight,
  Flame,
  Heart,
  ImageIcon,
  Megaphone,
  MessageCircle,
  SlidersHorizontal,
  User,
  Video,
} from "lucide-react"
import type { MediaType } from "@/lib/types/advertisements.types"

type AdMobilePreviewProps = {
  title: string
  description: string
  mediaType: MediaType
  imageUrl: string
  videoUrl: string
  targetUrl: string
}

export function AdMobilePreview({
  title,
  description,
  mediaType,
  imageUrl,
  videoUrl,
  targetUrl,
}: AdMobilePreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasMedia = (mediaType === "image" && imageUrl) || (mediaType === "video" && videoUrl)

  useEffect(() => {
    const video = videoRef.current
    if (mediaType === "video" && videoUrl && video) {
      video.muted = true
      video.load()
      video.play().catch(() => {})
    }
  }, [mediaType, videoUrl])

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-medium text-muted-foreground">Aperçu mobile</p>

      {/* Phone Frame */}
      <div className="relative mx-auto border-gray-800 bg-gray-800 border-[10px] rounded-[2rem] h-[520px] w-[260px] shadow-xl">
        {/* Notch */}
        <div className="w-[100px] h-[14px] bg-gray-800 top-0 rounded-b-[0.8rem] left-1/2 -translate-x-1/2 absolute z-10 flex items-start justify-center">
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full -mt-1.5" />
        </div>
        {/* Side buttons */}
        <div className="h-[32px] w-[2px] bg-gray-800 absolute -start-[12px] top-[90px] rounded-s-lg" />
        <div className="h-[32px] w-[2px] bg-gray-800 absolute -start-[12px] top-[130px] rounded-s-lg" />
        <div className="h-[46px] w-[2px] bg-gray-800 absolute -end-[12px] top-[110px] rounded-e-lg" />

        {/* Screen */}
        <div className="rounded-[1.2rem] overflow-hidden w-full h-full bg-gray-50 flex flex-col">
          {/* Header Tia */}
          <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-gray-100">
            <span className="text-base font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              tia
            </span>
            <span className="text-xs font-semibold text-pink-500">Discover</span>
            <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center">
              <SlidersHorizontal className="h-3 w-3 text-pink-500" />
            </div>
          </div>

          {/* Card area - Ad displayed ON the card */}
          <div className="flex-1 mx-2 my-2 rounded-2xl overflow-hidden relative bg-black">
            {hasMedia ? (
              <>
                {/* Media */}
                {mediaType === "image" ? (
                  <Image
                    src={imageUrl}
                    alt={title || "Publicité"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full h-full object-cover absolute inset-0"
                    muted
                    autoPlay
                    loop
                    playsInline
                  />
                )}

                {/* Gradient overlay top + bottom like mobile */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

                {/* Header: Sponsored badge + Skip button */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                  <div className="bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
                    <Megaphone className="h-2.5 w-2.5 text-white" />
                    <span className="text-[8px] font-medium text-white">Sponsorisé</span>
                  </div>
                  <div className="bg-white rounded-full px-2 py-0.5 flex items-center gap-0.5">
                    <span className="text-[8px] font-semibold text-gray-900">Passer</span>
                    <ChevronRight className="h-2 w-2 text-gray-900" />
                  </div>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <h3 className="text-white font-bold text-[11px] leading-tight">
                    {title || "Titre de la publicité"}
                  </h3>
                  {description && (
                    <p className="text-white/90 text-[9px] mt-0.5 line-clamp-2 leading-tight">
                      {description}
                    </p>
                  )}

                  {/* CTA button */}
                  {targetUrl && (
                    <div className="mt-1.5 bg-white rounded-full py-1 px-2.5 inline-flex items-center gap-0.5">
                      <span className="text-[8px] font-semibold text-gray-900">En savoir plus</span>
                      <ArrowRight className="h-2 w-2 text-gray-900" />
                    </div>
                  )}

                  {/* Video progress bar */}
                  {mediaType === "video" && (
                    <div className="mt-1.5 w-full">
                      <div className="h-[2px] bg-white/30 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full w-1/3" />
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Empty state */
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 gap-2">
                {mediaType === "image" ? (
                  <ImageIcon className="h-10 w-10" />
                ) : (
                  <Video className="h-10 w-10" />
                )}
                <span className="text-[10px] text-gray-400 text-center px-4">
                  Ajoutez un média pour voir l&apos;aperçu
                </span>
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-around px-2 py-2 bg-white border-t border-gray-100">
            <Heart className="h-4 w-4 text-gray-300" />
            <Flame className="h-4 w-4 text-gray-300" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-b from-pink-400 to-rose-500 flex items-center justify-center -mt-3 shadow-md">
              <Heart className="h-4 w-4 text-white fill-white" />
            </div>
            <MessageCircle className="h-4 w-4 text-gray-300" />
            <User className="h-4 w-4 text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  )
}
