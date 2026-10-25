import { FINAL_CTA } from '@/content/site'
import { Section } from './section'
import { StoreButtons } from './store-buttons'

export function FinalCta() {
  return (
    <Section
      id={FINAL_CTA.id}
      tone="ink"
      className="overflow-hidden py-35 text-center @max-[640px]:py-25"
    >
      <div className="relative flex flex-col items-center gap-6">
        <h2 className="max-w-[960px] text-[clamp(40px,5.6cqi,80px)] leading-[1.05] font-bold tracking-[-.02em]">
          {FINAL_CTA.title}{' '}
          <span className="px-[.08em] font-tia-script font-normal text-tia-coral-300">{FINAL_CTA.highlight}</span>
        </h2>
        <p className="text-[20px] text-tia-plum-50/80">{FINAL_CTA.subtitle}</p>
        <StoreButtons className="justify-center" />
      </div>
    </Section>
  )
}
