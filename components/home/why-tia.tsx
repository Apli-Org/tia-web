import type { ReactNode } from 'react'
import { WHY_TIA, type TileId } from '@/content/site'
import { BentoGrid } from './bento-grid'
import { BentoTile, type BentoTileStyle } from './bento-tile'
import { CoachChat } from './coach-chat'
import { HeartBurst } from './heart-burst'
import { InterestsMarquee } from './interests-marquee'
import { NearbyMap } from './nearby-map'
import { PaymentChips } from './payment-chips'
import { Section } from './section'
import { SectionHeading } from './section-heading'
import { SwipePhone } from './swipe-phone'
import { VerifiedSelfie } from './verified-selfie'

const TILE_VISUALS: Record<TileId, ReactNode> = {
  swipe: <SwipePhone />,
  verified: <VerifiedSelfie />,
  heart: <HeartBurst />,
  nearby: <NearbyMap />,
  coach: <CoachChat />,
  interests: <InterestsMarquee />,
  payment: <PaymentChips />,
}

const TILE_STYLES: Record<TileId, BentoTileStyle> = {
  swipe: {
    tile: 'col-span-2 row-span-2 justify-start bg-tia-violet-900 pt-9 text-tia-plum-50 hover:ring-tia-violet-400 @max-[640px]:col-auto',
    kicker: 'bg-tia-plum-50/12 text-tia-violet-200',
    description: 'text-tia-plum-50/78',
    text: 'max-w-[236px] @max-[640px]:max-w-none',
    delayStep: 0,
  },
  verified: {
    tile: 'bg-tia-violet-100 hover:ring-tia-violet-500',
    kicker: 'bg-tia-violet-200 text-tia-violet-800',
    description: 'text-tia-violet-700',
    delayStep: 1,
  },
  heart: {
    tile: 'bg-tia-coral-600 text-tia-plum-50 hover:ring-tia-coral-500',
    kicker: 'bg-tia-coral-700 text-tia-plum-50',
    description: 'text-tia-plum-50/90',
    delayStep: 2,
  },
  nearby: {
    tile: 'col-span-2 bg-tia-violet-800 text-tia-plum-50 hover:ring-tia-violet-400 @max-[640px]:col-auto',
    kicker: 'bg-tia-plum-50/12 text-tia-coral-100',
    description: 'text-tia-plum-50/78',
    text: 'max-w-[300px]',
    delayStep: 1,
  },
  coach: {
    tile: 'bg-tia-coral-50 hover:ring-tia-coral-500',
    kicker: 'bg-tia-coral-100 text-tia-coral-800',
    description: 'text-tia-coral-700',
    delayStep: 2,
  },
  interests: {
    tile: 'bg-tia-violet-200 text-tia-violet-800 hover:ring-tia-violet-500',
    kicker: 'bg-tia-plum-50 text-tia-violet-700',
    description: 'text-tia-violet-700',
    delayStep: 3,
  },
  payment: {
    tile: 'col-span-2 bg-tia-plum-100 hover:ring-tia-orchid @max-[640px]:col-auto',
    kicker: 'bg-tia-plum-50 text-tia-violet-700',
    description: 'text-tia-plum-600',
    delayStep: 3,
  },
}

export function WhyTia() {
  return (
    <Section id={WHY_TIA.id}>
      <SectionHeading eyebrow={WHY_TIA.eyebrow} title={WHY_TIA.title} />
      <BentoGrid>
        {WHY_TIA.tiles.map((tile) => (
          <BentoTile
            key={tile.id}
            kicker={tile.kicker}
            title={tile.title}
            description={tile.description}
            tileStyle={TILE_STYLES[tile.id]}
          >
            {TILE_VISUALS[tile.id]}
          </BentoTile>
        ))}
      </BentoGrid>
    </Section>
  )
}
