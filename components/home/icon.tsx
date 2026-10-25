import type { ReactNode } from 'react'

export const TIA_HEART_PATH =
  'M78.4 155.9C67.2 153.8 62.1 149.4 50.2 131.6C13.0 76.4 -2.8 42.1 1.3 25.5C7.3 1.4 30.6 -6.0 53.9 8.9C65.1 16.0 85.3 27.0 87.3 27.0C88.2 27.0 99.9 21.6 113.2 14.9C137.2 2.9 137.4 2.8 142.7 3.5C160.9 5.8 174.2 23.0 171.0 40.3C167.8 57.3 123.9 129.1 105.2 147.7C98.7 154.2 87.5 157.7 78.4 155.9Z'

export const TIA_HEART_SHADE_PATH =
  'M117.0 41.9C114.0 40.8 105.9 37.3 99.2 34.0L86.8 28.0L111.0 16.0C124.3 9.4 135.6 4.2 136.1 4.5C138.4 6.0 141.2 13.7 141.7 19.8C143.1 37.1 131.8 47.3 117.0 41.9Z'

type IconVariant = 'fill' | 'stroke'

type IconDefinition = {
  viewBox: string
  variant: IconVariant
  content: ReactNode
}

const ICONS = {
  apple: {
    viewBox: '0 0 512 512',
    variant: 'fill',
    content: (
      <path d="M168.6 510.5C132.1 500.4 82.2 432.2 61.1 363.3C29.3 259.4 53.9 171.4 124.5 136.9C159.9 119.6 184.0 120.7 238.5 142.1C256.1 149.0 261.5 148.6 287.8 138.6C332.7 121.6 358.3 119.6 391.6 130.5C415.2 138.3 440.4 156.2 449.3 171.8L451.0 174.8L443.1 180.4C410.6 203.1 394.0 237.3 396.4 276.4C399.2 320.5 418.3 350.2 458.2 372.4L464.9 376.1L461.9 384.8C451.9 413.1 431.3 448.5 407.4 478.4C380.1 512.4 355.3 518.7 312.0 502.5C273.0 487.9 258.5 487.7 221.3 501.4C191.7 512.2 181.4 514.0 168.6 510.5ZM255.0 111.4C255.0 59.2 293.8 12.8 347.0 1.4C358.8 -1.1 358.0 -1.8 358.0 11.8C357.9 41.9 345.4 68.8 320.3 93.1C303.2 109.7 288.1 116.5 266.2 117.7L255.0 118.3L255.0 111.4Z" />
    ),
  },
  'google-play': {
    viewBox: '0 0 24 24',
    variant: 'fill',
    content: (
      <>
        <path d="M4.2 2.6c-.3.3-.4.7-.4 1.2v16.4c0 .5.1.9.4 1.2l9.3-9.4z" />
        <path d="M16.6 15.1L13.5 12l3.1-3.1 3.7 2.1c1 .6 1 1.5 0 2.1z" opacity=".75" />
        <path d="M4.9 21.6c.4.3 1 .3 1.6-.1l10.1-6.4-3.1-3.1z" opacity=".55" />
        <path d="M4.9 2.4l8.6 9.6 3.1-3.1L6.5 2.5c-.6-.4-1.2-.4-1.6-.1z" opacity=".9" />
      </>
    ),
  },
  'tia-heart': {
    viewBox: '-17 -24.5 206 206',
    variant: 'fill',
    content: <path d={TIA_HEART_PATH} />,
  },
  heart: {
    viewBox: '0 0 24 24',
    variant: 'fill',
    content: <path d="M12 20.5s-8-4.6-8-10.4A4.6 4.6 0 0 1 12 7.2a4.6 4.6 0 0 1 8 2.9c0 5.8-8 10.4-8 10.4z" />,
  },
  close: {
    viewBox: '0 0 24 24',
    variant: 'stroke',
    content: <path d="M6 6l12 12M18 6L6 18" />,
  },
  check: {
    viewBox: '0 0 24 24',
    variant: 'stroke',
    content: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  },
  'chevron-down': {
    viewBox: '0 0 24 24',
    variant: 'stroke',
    content: <path d="M6 9l6 6 6-6" />,
  },
  shield: {
    viewBox: '0 0 24 24',
    variant: 'stroke',
    content: (
      <>
        <path d="M12 3l7 3v6c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  ban: {
    viewBox: '0 0 24 24',
    variant: 'stroke',
    content: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M6 6l12 12" />
      </>
    ),
  },
  lock: {
    viewBox: '0 0 24 24',
    variant: 'stroke',
    content: (
      <>
        <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
        <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      </>
    ),
  },
  quote: {
    viewBox: '0 0 28 22',
    variant: 'fill',
    content: (
      <path d="M0 22V13.2C0 5.9 3.7 1.5 11 0l1.3 3.3C8.2 4.6 6.3 7 6.1 10.5H11V22zm16 0V13.2C16 5.9 19.7 1.5 27 0l1.3 3.3c-4.1 1.3-6 3.7-6.2 7.2H27V22z" />
    ),
  },
  instagram: {
    viewBox: '0 0 24 24',
    variant: 'stroke',
    content: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r=".9" fill="currentColor" />
      </>
    ),
  },
} satisfies Record<string, IconDefinition>

export type IconName = keyof typeof ICONS

type IconProps = {
  name: IconName
  size: number
  height?: number
  variant?: IconVariant
  strokeWidth?: number
  className?: string
}

export function Icon({ name, size, height = size, variant, strokeWidth = 2, className }: IconProps) {
  const icon: IconDefinition = ICONS[name]
  const isStroked = (variant ?? icon.variant) === 'stroke'

  return (
    <svg
      width={size}
      height={height}
      viewBox={icon.viewBox}
      fill={isStroked ? 'none' : 'currentColor'}
      stroke={isStroked ? 'currentColor' : undefined}
      strokeWidth={isStroked ? strokeWidth : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {icon.content}
    </svg>
  )
}
