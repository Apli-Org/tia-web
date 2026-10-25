import { SAFETY } from '@/content/site'
import { Icon } from './icon'
import { Reveal } from './reveal'
import { Section } from './section'
import { SectionHeading } from './section-heading'

const ENTRANCE_STEP = 0.1

export function Safety() {
  return (
    <Section id={SAFETY.id} tone="ink">
      <SectionHeading eyebrow={SAFETY.eyebrow} title={SAFETY.title} isOnDark />
      <ul className="mx-auto grid max-w-[1240px] grid-cols-4 gap-5 @max-[1080px]:grid-cols-2 @max-[640px]:grid-cols-1">
        {SAFETY.items.map((item, index) => (
          <Reveal
            key={item.title}
            as="li"
            delay={index * ENTRANCE_STEP}
            className="flex flex-col gap-3 rounded-[28px] bg-tia-plum-800 p-8 transition-[background-color,translate] duration-300 hover:-translate-y-1 hover:bg-tia-plum-700"
          >
            <span className="mb-2 flex size-13 items-center justify-center rounded-[16px] bg-tia-violet-900 text-tia-violet-300">
              <Icon name={item.icon} size={26} variant="stroke" strokeWidth={1.6} />
            </span>
            <h3 className="text-[20px]/[26px] font-bold">{item.title}</h3>
            <p className="text-[15px]/[22px] text-tia-plum-300">{item.description}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
