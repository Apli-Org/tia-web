import Image from 'next/image'
import { PHOTOS, type PhotoId } from '@/content/site'
import { cn } from '@/lib/utils'

type PhotoProps = {
  id: PhotoId
  sizes: string
  isPreloaded?: boolean
  className?: string
}

export function Photo({ id, sizes, isPreloaded = false, className }: PhotoProps) {
  return (
    <Image
      src={PHOTOS[id]}
      alt=""
      fill
      sizes={sizes}
      preload={isPreloaded}
      fetchPriority={isPreloaded ? 'high' : undefined}
      className={cn('object-cover object-[50%_28%]', className)}
    />
  )
}
