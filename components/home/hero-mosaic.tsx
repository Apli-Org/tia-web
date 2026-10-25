import { HERO_MOSAIC } from '@/content/site'
import { cn } from '@/lib/utils'
import { Photo } from './photo'

const PRELOADED_PER_COLUMN = 2
const PHOTO_SIZES = '(max-width: 640px) 40vw, (max-width: 1080px) 30vw, 24vw'

/** Reversed columns start at -50%, so their first visible photos are the second copy. */
function isFirstVisible(photoIndex: number, photoCount: number, isReversed: boolean) {
  const firstVisibleIndex = isReversed ? photoCount : 0
  return photoIndex >= firstVisibleIndex && photoIndex < firstVisibleIndex + PRELOADED_PER_COLUMN
}

export function HeroMosaic() {
  return (
    <div
      aria-hidden="true"
      className="absolute -inset-x-5 -inset-y-10 grid scale-[1.12] -rotate-6 grid-cols-5 gap-4 opacity-95 @max-[1080px]:grid-cols-4 @max-[640px]:grid-cols-3 @max-[640px]:gap-2.5"
    >
      {HERO_MOSAIC.map((column, columnIndex) => {
        const isReversed = columnIndex % 2 === 1

        return (
          <div
            key={column.duration}
            className={cn(
              'overflow-hidden',
              columnIndex >= 4 && '@max-[1080px]:hidden',
              columnIndex >= 3 && '@max-[640px]:hidden',
            )}
          >
            <div
              className={cn('flex animate-tia-column flex-col gap-4', isReversed && '[animation-direction:reverse]')}
              style={{ animationDuration: `${column.duration}s` }}
            >
              {[...column.photos, ...column.photos].map((photo, photoIndex) => (
                <div
                  key={photoIndex}
                  className="relative aspect-4/5 flex-none overflow-hidden rounded-[24px] bg-tia-plum-700"
                >
                  <Photo
                    id={photo}
                    sizes={PHOTO_SIZES}
                    isPreloaded={isFirstVisible(photoIndex, column.photos.length, isReversed)}
                  />
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
