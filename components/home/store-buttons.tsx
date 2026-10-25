import type { HomeCopy } from '@/content/home-copy'
import { STORE_LINKS } from '@/content/site'
import { cn } from '@/lib/utils'
import { Icon, type IconName } from './icon'

const STORES: { key: keyof HomeCopy['stores']; href: string; icon: IconName }[] = [
  { key: 'appStore', href: STORE_LINKS.appStore, icon: 'apple' },
  { key: 'googlePlay', href: STORE_LINKS.googlePlay, icon: 'google-play' },
]

type StoreButtonsProps = {
  copy: HomeCopy['stores']
  isDark?: boolean
  isCompact?: boolean
  className?: string
}

export function StoreButtons({ copy, isDark = false, isCompact = false, className }: StoreButtonsProps) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {STORES.map((store) => (
        <a
          key={store.key}
          href={store.href}
          aria-label={copy[store.key].label}
          className={cn(
            'inline-flex items-center gap-2.5 rounded-[16px] pr-5 pl-4 transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_black] hover:shadow-tia-plum-900/35',
            isCompact ? 'h-13' : 'h-14',
            isDark ? 'bg-tia-plum-900 text-tia-plum-50' : 'bg-tia-plum-50 text-tia-plum-900',
          )}
        >
          <Icon name={store.icon} size={22} />
          <span className="flex flex-col text-[17px]/[20px] font-bold">
            <small className="text-[11px]/[13px] font-medium opacity-80">{copy[store.key].caption}</small>
            {copy[store.key].name}
          </span>
        </a>
      ))}
    </div>
  )
}
