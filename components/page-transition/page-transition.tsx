'use client'

import { usePathname, useRouter } from 'next/navigation'
import { type AnimationEvent, type ReactNode, useCallback, useEffect, useState } from 'react'
import { getClickedLinkUrl, shouldTransition } from '@/lib/page-transition'
import {
  HEARTBEAT_ANIMATION,
  TransitionOverlay,
  WIPE_OUT_ANIMATION,
  type WipeOrigin,
} from './transition-overlay'

const NAVIGATE_FALLBACK_MS = 2500
const FINISH_FALLBACK_MS = 6000
const CENTER_ORIGIN: WipeOrigin = { x: '50%', y: '50%' }
const KEYBOARD_CLICK_DETAIL = 0
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

type ActiveTransition = {
  target: string
  startPath: string
  origin: WipeOrigin
  isHeld: boolean
}

function getWipeOrigin(event: MouseEvent): WipeOrigin {
  if (event.detail === KEYBOARD_CLICK_DETAIL) return CENTER_ORIGIN
  return { x: `${event.clientX}px`, y: `${event.clientY}px` }
}

/**
 * Covers the screen with a Tia colored wipe and a beating heart on internal
 * page changes, navigates while the cover is up, then reveals the new page.
 * The heart's first full beat drives the navigation and the wipe-out
 * animation ends the transition, so the timings live in the CSS keyframes.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [transition, setTransition] = useState<ActiveTransition | null>(null)

  const isRevealing = transition !== null && transition.isHeld && pathname !== transition.startPath

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const currentUrl = new URL(window.location.href)
      const url = getClickedLinkUrl(event, currentUrl)
      if (!url || !shouldTransition(currentUrl, url)) return
      if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return

      event.preventDefault()
      event.stopPropagation()
      if (transition) return

      const target = `${url.pathname}${url.search}${url.hash}`
      router.prefetch(target)
      setTransition({ target, startPath: currentUrl.pathname, origin: getWipeOrigin(event), isHeld: false })
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [router, transition])

  const navigate = useCallback(
    (active: ActiveTransition) => {
      router.push(active.target)
      setTransition({ ...active, isHeld: true })
    },
    [router],
  )

  useEffect(() => {
    if (!transition) return
    const timer = window.setTimeout(
      () => (transition.isHeld ? setTransition(null) : navigate(transition)),
      transition.isHeld ? FINISH_FALLBACK_MS : NAVIGATE_FALLBACK_MS,
    )
    return () => window.clearTimeout(timer)
  }, [navigate, transition])

  function handleAnimationIteration(event: AnimationEvent<HTMLDivElement>) {
    if (event.animationName !== HEARTBEAT_ANIMATION || !transition || transition.isHeld) return
    navigate(transition)
  }

  function handleAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.animationName !== WIPE_OUT_ANIMATION) return
    setTransition(null)
  }

  return (
    <>
      {children}
      {transition && (
        <TransitionOverlay
          origin={transition.origin}
          isRevealing={isRevealing}
          onAnimationIteration={handleAnimationIteration}
          onAnimationEnd={handleAnimationEnd}
        />
      )}
    </>
  )
}
