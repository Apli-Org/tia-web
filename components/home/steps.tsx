import type { HomeCopy } from '@/content/home-copy'
import { Reveal } from './reveal'
import { Section } from './section'
import { SectionHeading } from './section-heading'

const ENTRANCE_STEP = 0.12
const STEP_NUMBER_LENGTH = 2

type StepsProps = {
  copy: HomeCopy['steps']
}

export function Steps({ copy }: StepsProps) {
  return (
    <Section tone="tint">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
      <ol className="mx-auto grid max-w-[1240px] grid-cols-3 gap-5 @max-[640px]:grid-cols-1">
        {copy.items.map((step, index) => (
          <Reveal
            key={step.title}
            as="li"
            delay={index * ENTRANCE_STEP}
            className="flex flex-col gap-3 rounded-[32px] bg-tia-plum-50 p-9"
          >
            <span className="text-[64px] leading-none font-bold text-tia-violet-500">
              {String(index + 1).padStart(STEP_NUMBER_LENGTH, '0')}
            </span>
            <h3 className="text-[24px]/[30px] font-bold">{step.title}</h3>
            <p className="text-[16px]/[24px] text-tia-plum-500">{step.description}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
