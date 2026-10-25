'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { HomeCopy } from '@/content/home-copy'
import { LOCALE_PATHS, LOCALES, type Locale } from '@/content/i18n'
import { cn } from '@/lib/utils'
import { Icon } from './icon'

type LanguageSwitcherProps = {
  locale: Locale
  copy: HomeCopy['language']
}

export function LanguageSwitcher({ locale, copy }: LanguageSwitcherProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && containerRef.current?.contains(event.target)) return
      setIsOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative max-[640px]:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((wasOpen) => !wasOpen)}
        className="relative inline-flex h-10.5 items-center gap-2 rounded-full bg-tia-plum-800 px-3.5 text-[14px] font-bold uppercase transition-colors duration-300 after:absolute after:inset-x-0 after:-inset-y-px after:content-[''] hover:bg-tia-plum-700"
      >
        <span className="sr-only">{copy.label}</span>
        {locale}
        <Icon
          name="chevron-down"
          size={10}
          strokeWidth={2.5}
          className={cn('transition-[rotate] duration-300', isOpen && 'rotate-180')}
        />
      </button>
      {isOpen && (
        <ul className="absolute top-full right-0 mt-2 min-w-[168px] rounded-[20px] border border-tia-plum-700 bg-tia-plum-900 p-1.5 shadow-[0_20px_40px_-16px_black] shadow-tia-plum-900/60">
          {LOCALES.map((option) => (
            <li key={option}>
              <Link
                href={LOCALE_PATHS[option]}
                hrefLang={option}
                lang={option}
                aria-current={option === locale ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex h-11 items-center gap-2.5 rounded-[14px] px-3 text-[14px] font-semibold transition-colors duration-200 hover:bg-tia-plum-800',
                  option === locale ? 'text-tia-plum-50' : 'text-tia-plum-50/78',
                )}
              >
                {copy.names[option]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
