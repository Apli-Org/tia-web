import type { HomeCopy } from '@/content/home-copy'
import { SECTION_IDS } from '@/content/site'
import { Section } from './section'
import { StoreButtons } from './store-buttons'

type FinalCtaProps = {
  copy: HomeCopy['finalCta']
  storesCopy: HomeCopy['stores']
}

export function FinalCta({ copy, storesCopy }: FinalCtaProps) {
  return (
    <Section
      id={SECTION_IDS.download}
      tone="ink"
      className="overflow-hidden py-35 text-center @max-[640px]:py-25"
    >
      <div className="relative flex flex-col items-center gap-6">
        <h2 className="max-w-[960px] text-[clamp(40px,5.6cqi,80px)] leading-[1.05] font-bold tracking-[-.02em]">
          {copy.title}{' '}
          <span className="px-[.08em] font-tia-script font-normal text-tia-coral-300">{copy.highlight}</span>
        </h2>
        <p className="text-[20px] text-tia-plum-50/80">{copy.subtitle}</p>
        <StoreButtons copy={storesCopy} className="justify-center" />
      </div>
    </Section>
  )
}
