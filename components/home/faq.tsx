import type { HomeCopy } from '@/content/home-copy'
import { CONTACT_EMAIL, CONTACT_HREF, FAQ_TOGGLE_SYMBOL, SECTION_IDS } from '@/content/site'
import { Section } from './section'
import { SectionHeading } from './section-heading'

type FaqProps = {
  copy: HomeCopy['faq']
}

export function Faq({ copy }: FaqProps) {
  return (
    <Section id={SECTION_IDS.faq}>
      <div className="mx-auto grid max-w-[1240px] grid-cols-[minmax(0,4fr)_minmax(0,7fr)] gap-16 @max-[1080px]:grid-cols-1 @max-[1080px]:gap-6">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} isLeftAligned>
          <p className="text-[18px]/[28px] text-tia-plum-500">
            {copy.leadBefore}{' '}
            <a href={CONTACT_HREF} className="font-bold text-tia-violet-500">
              {CONTACT_EMAIL}
            </a>{' '}
            {copy.leadAfter}
          </p>
        </SectionHeading>
        <div className="flex flex-col">
          {copy.items.map((item, index) => (
            <details key={item.question} open={index === 0} className="group border-b border-tia-plum-200">
              <summary className="flex cursor-pointer list-none justify-between gap-6 py-6 text-[20px]/[28px] font-bold [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-[28px] font-normal text-tia-violet-500 transition-[rotate] duration-300 group-open:rotate-45"
                >
                  {FAQ_TOGGLE_SYMBOL}
                </span>
              </summary>
              <p className="max-w-[640px] pb-6 text-[17px]/[27px] text-tia-plum-500">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}
