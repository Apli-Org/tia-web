import type { ReactNode } from 'react'
import { Icon } from '@/components/home/icon'

type LegalItemMarker = 'dot' | 'check' | 'cross'

type LegalItemProps = {
  marker?: LegalItemMarker
  children: ReactNode
}

const ICON_SIZE = 16
const ICON_CLASSES = 'mt-[calc(.5lh-8px)] flex-none'

export function LegalItem({ marker = 'dot', children }: LegalItemProps) {
  return (
    <li className="flex gap-3">
      {marker === 'dot' && (
        <span aria-hidden="true" className="mt-[calc(.5lh-3px)] size-1.5 flex-none rounded-full bg-tia-violet-500" />
      )}
      {marker === 'check' && (
        <Icon name="check" size={ICON_SIZE} strokeWidth={2.5} className={`${ICON_CLASSES} text-tia-violet-500`} />
      )}
      {marker === 'cross' && (
        <Icon name="close" size={ICON_SIZE} strokeWidth={2.5} className={`${ICON_CLASSES} text-tia-coral-600`} />
      )}
      <span>{children}</span>
    </li>
  )
}
