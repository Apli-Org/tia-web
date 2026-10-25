'use client'

import { domAnimation, LazyMotion, m, useMotionValueEvent, useScroll } from 'framer-motion'
import { useRef, useState } from 'react'
import type { HomeCopy } from '@/content/home-copy'
import type { Locale } from '@/content/i18n'
import { Icon } from './icon'
import { LanguageSwitcher } from './language-switcher'
import { Logo } from './logo'
import { SPRING_TRANSITION } from './motion'

const SHRINK_DISTANCE = 260
const LINK_WIDTH = 124
const INDICATOR_FADE = { duration: 0.3 }

type NavbarProps = {
  locale: Locale
  copy: HomeCopy['nav']
  languageCopy: HomeCopy['language']
  homeHref?: string
}

export function Navbar({ locale, copy, languageCopy, homeHref = '#top' }: NavbarProps) {
  const capsuleRef = useRef<HTMLDivElement>(null)
  const [indicatorIndex, setIndicatorIndex] = useState(0)
  const [isIndicatorVisible, setIsIndicatorVisible] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (offset) => {
    const progress = Math.min(offset / SHRINK_DISTANCE, 1)
    capsuleRef.current?.style.setProperty('--nav-shrink', String(progress))
  })

  const showIndicator = (index: number) => {
    setIndicatorIndex(index)
    setIsIndicatorVisible(true)
  }

  const hideIndicator = () => setIsIndicatorVisible(false)

  return (
    <nav
      aria-label={copy.label}
      className="pointer-events-none fixed inset-x-0 top-4.5 z-30 flex justify-center px-6 max-[640px]:top-3 max-[640px]:px-3"
    >
      <div
        ref={capsuleRef}
        className="pointer-events-auto flex h-[calc(68px_-_8px_*_var(--nav-shrink,0))] w-full max-w-[calc(1180px_-_140px_*_var(--nav-shrink,0))] animate-tia-nav-in items-center gap-4 rounded-full border border-tia-plum-700 bg-tia-plum-900 pr-2.5 pl-6 text-tia-plum-50 max-[640px]:h-15 max-[640px]:pr-1.5 max-[640px]:pl-4.5"
      >
        <a
          href={homeHref}
          aria-label={copy.homeLabel}
          className="flex items-center transition-[rotate,scale] duration-500 ease-tia-spring hover:scale-[1.06] hover:-rotate-6"
        >
          <Logo ink />
        </a>
        <div
          className="relative mx-auto flex rounded-full bg-tia-plum-800 p-1 max-[1080px]:hidden"
          onMouseLeave={hideIndicator}
        >
          <LazyMotion features={domAnimation}>
            <m.span
              aria-hidden="true"
              className="absolute top-1 left-1 h-10.5 w-31 rounded-full bg-tia-violet-500"
              initial={false}
              animate={{
                x: indicatorIndex * LINK_WIDTH,
                opacity: isIndicatorVisible ? 1 : 0,
                scale: isIndicatorVisible ? 1 : 0.86,
              }}
              transition={{ ...SPRING_TRANSITION, opacity: INDICATOR_FADE }}
            />
          </LazyMotion>
          {copy.links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => showIndicator(index)}
              onFocus={() => showIndicator(index)}
              onBlur={hideIndicator}
              className="relative z-1 flex h-10.5 w-31 items-center justify-center text-[14px] font-semibold text-tia-plum-50/78 transition-colors duration-350 after:absolute after:inset-x-0 after:-inset-y-px after:content-[''] hover:text-tia-plum-50"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2.5 max-[1080px]:ml-auto">
          <LanguageSwitcher locale={locale} copy={languageCopy} />
          <a
            href={copy.download.href}
            className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-tia-violet-500 px-6.5 text-[16px] font-bold text-tia-plum-50 [transition:background-color_.3s,scale_.5s_var(--ease-tia-spring)] hover:scale-[1.04] hover:bg-tia-violet-600 max-[640px]:h-11 max-[640px]:px-4"
          >
            <Icon
              name="tia-heart"
              size={16}
              className="transition-[rotate,scale] duration-500 ease-tia-spring group-hover:scale-125 group-hover:-rotate-10"
            />
            {copy.download.label}
          </a>
        </div>
      </div>
    </nav>
  )
}
