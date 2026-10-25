import type { HomeCopy } from '@/content/home-copy'
import { SAFETY_ITEM_IDS, SECTION_IDS, type SafetyItemId } from '@/content/site'
import { Icon, type IconName } from './icon'
import { Reveal } from './reveal'
import { Section } from './section'
import { SectionHeading } from './section-heading'

const ENTRANCE_STEP = 0.1

const SAFETY_ICONS: Record<SafetyItemId, IconName> = {
  verification: 'shield',
  respect: 'heart',
  control: 'ban',
  data: 'lock',
}

type SafetyProps = {
  copy: HomeCopy['safety']
}

export function Safety({ copy }: SafetyProps) {
  return (
    <Section id={SECTION_IDS.safety} tone="ink">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} isOnDark />
      <ul className="mx-auto grid max-w-[1240px] grid-cols-4 gap-5 @max-[1080px]:grid-cols-2 @max-[640px]:grid-cols-1">
        {SAFETY_ITEM_IDS.map((itemId, index) => (
          <Reveal
            key={itemId}
            as="li"
            delay={index * ENTRANCE_STEP}
            className="flex flex-col gap-3 rounded-[28px] bg-tia-plum-800 p-8 transition-[background-color,translate] duration-300 hover:-translate-y-1 hover:bg-tia-plum-700"
          >
            <span className="mb-2 flex size-13 items-center justify-center rounded-[16px] bg-tia-violet-900 text-tia-violet-300">
              <Icon name={SAFETY_ICONS[itemId]} size={26} variant="stroke" strokeWidth={1.6} />
            </span>
            <h3 className="text-[20px]/[26px] font-bold">{copy.items[itemId].title}</h3>
            <p className="text-[15px]/[22px] text-tia-plum-300">{copy.items[itemId].description}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
