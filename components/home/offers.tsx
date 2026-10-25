import type { HomeCopy } from '@/content/home-copy'
import { HIGHLIGHTED_PLAN, PLAN_IDS, SECTION_IDS } from '@/content/site'
import { cn } from '@/lib/utils'
import { Icon } from './icon'
import { Reveal } from './reveal'
import { Section } from './section'
import { SectionHeading } from './section-heading'

const ENTRANCE_STEP = 0.1

type OffersProps = {
  copy: HomeCopy['offers']
}

export function Offers({ copy }: OffersProps) {
  return (
    <Section id={SECTION_IDS.offers}>
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
      <ul className="mx-auto grid max-w-[1240px] grid-cols-4 items-stretch gap-5 @max-[1080px]:grid-cols-2 @max-[640px]:grid-cols-1">
        {PLAN_IDS.map((planId, index) => (
          <Reveal
            key={planId}
            as="li"
            delay={index * ENTRANCE_STEP}
            className={cn(
              'flex flex-col gap-5 rounded-[28px] bg-tia-plum-50 p-8 transition-[translate] duration-300 hover:-translate-y-1',
              planId === HIGHLIGHTED_PLAN ? 'ring-2 ring-tia-violet-500' : 'ring-1 ring-tia-plum-200',
            )}
          >
            <h3 className="text-[26px] font-bold">{copy.plans[planId].name}</h3>
            <ul className="flex flex-col gap-3">
              {copy.plans[planId].features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-[15px]/[22px]">
                  <Icon name="check" size={16} strokeWidth={2.2} className="mt-0.75 flex-none text-tia-violet-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
      <p className="mt-7 text-center text-[15px] text-tia-plum-500">{copy.note}</p>
    </Section>
  )
}
