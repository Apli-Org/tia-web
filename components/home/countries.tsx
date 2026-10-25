import { COUNTRIES } from '@/content/countries'
import type { HomeCopy } from '@/content/home-copy'
import type { Locale } from '@/content/i18n'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { Section } from './section'
import { SectionHeading } from './section-heading'

const ENTRANCE_STEP = 0.1

type CountriesProps = {
  locale: Locale
  copy: HomeCopy['countries']
}

export function Countries({ locale, copy }: CountriesProps) {
  return (
    <Section tone="tint">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
      <ul className="mx-auto grid max-w-[1240px] grid-cols-4 gap-5 @max-[1080px]:grid-cols-2 @max-[640px]:grid-cols-1">
        {COUNTRIES.map((country, index) => {
          const isAvailable = country.status === 'available'

          return (
            <Reveal
              key={country.flag}
              as="li"
              delay={index * ENTRANCE_STEP}
              className={cn(
                'relative flex min-h-[220px] flex-col justify-end gap-1.5 overflow-hidden rounded-[28px] p-8',
                isAvailable ? 'bg-tia-plum-900 text-tia-plum-50' : 'bg-tia-plum-50',
              )}
            >
              <span
                className={cn(
                  'absolute top-6 left-6 rounded-full px-3 py-1.5 text-[13px] font-bold',
                  isAvailable ? 'bg-tia-violet-400/18 text-tia-violet-200' : 'bg-tia-plum-100 text-tia-plum-500',
                )}
              >
                {copy.statusLabels[country.status]}
              </span>
              <h3 className="text-[28px] font-bold">{country.name[locale]}</h3>
              <p className={cn('text-[15px]', isAvailable ? 'text-tia-plum-300' : 'text-tia-plum-500')}>
                {country.description[locale]}
              </p>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
