import { SELFIE_PHOTO } from '@/content/site'
import { Icon } from './icon'
import { Photo } from './photo'

export function VerifiedSelfie() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-7.5 left-1/2 z-3 -translate-x-1/2 transition-[scale] duration-700 ease-tia-spring group-hover:scale-[1.08]"
    >
      <div className="relative size-32 overflow-hidden rounded-full ring-3 ring-tia-violet-500 ring-offset-4 ring-offset-tia-violet-100">
        <Photo id={SELFIE_PHOTO} sizes="128px" />
        <span className="absolute inset-x-0 top-0 h-0.75 animate-tia-scan bg-tia-violet-400" />
      </div>
      <span className="absolute -right-0.5 bottom-1 flex size-9 animate-tia-badge items-center justify-center rounded-full bg-tia-violet-500 text-tia-plum-50 ring-4 ring-tia-violet-100">
        <Icon name="check" size={14} strokeWidth={3} />
      </span>
    </div>
  )
}
