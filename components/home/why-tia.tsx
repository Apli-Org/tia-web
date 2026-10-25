import type { ReactNode } from 'react'
import type { HomeCopy } from '@/content/home-copy'
import { SECTION_IDS, TILE_IDS, type TileId } from '@/content/site'
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

function getTileVisuals(copy: HomeCopy['whyTia']): Record<TileId, ReactNode> {
  return {
    swipe: <SwipePhone likeStamp={copy.likeStamp} />,
    verified: <VerifiedSelfie />,
    heart: <HeartBurst />,
    nearby: <NearbyMap />,
    coach: <CoachChat chat={copy.coachChat} />,
    interests: <InterestsMarquee rows={copy.interests} />,
    payment: <PaymentChips payments={copy.payments} />,
  }
}

type WhyTiaProps = {
  copy: HomeCopy['whyTia']
}

export function WhyTia({ copy }: WhyTiaProps) {
  const visuals = getTileVisuals(copy)

  return (
    <Section id={SECTION_IDS.whyTia}>
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
      <BentoGrid>
        {TILE_IDS.map((tileId) => (
          <BentoTile
            key={tileId}
            kicker={copy.tiles[tileId].kicker}
            title={copy.tiles[tileId].title}
            description={copy.tiles[tileId].description}
            tileStyle={TILE_STYLES[tileId]}
          >
            {visuals[tileId]}
          </BentoTile>
        ))}
      </BentoGrid>
    </Section>
  )
}
