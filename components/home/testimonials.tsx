import type { HomeCopy } from '@/content/home-copy'
import type { Locale } from '@/content/i18n'
import { SECTION_IDS } from '@/content/site'
import { TESTIMONIALS, type Testimonial } from '@/content/testimonials'
import { Icon } from './icon'
import { Marquee } from './marquee'
import { Section } from './section'
import { SectionHeading } from './section-heading'

const SCROLL_DURATION = 48
const COPIES = 4
const MAX_RATING = 5
const CAPTION_SEPARATOR = ' · '

function getReviewCaption(testimonial: Testimonial, locale: Locale, translatedNote: string) {
  const publishedOn = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(testimonial.publishedAt),
  )
  const parts = [testimonial.source, `${testimonial.rating}/${MAX_RATING}`, publishedOn]
  if (testimonial.originalLocale !== locale) parts.push(translatedNote)
  return parts.join(CAPTION_SEPARATOR)
}

type TestimonialsProps = {
  locale: Locale
  copy: HomeCopy['testimonials']
}

export function Testimonials({ locale, copy }: TestimonialsProps) {
  return (
    <Section id={SECTION_IDS.testimonials} className="px-0">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
      <div className="overflow-hidden pt-3 pb-6 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <Marquee duration={SCROLL_DURATION} copies={COPIES} isPausedOnHover groupClassName="items-stretch gap-5 pr-5">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.author}
              className="flex w-[400px] flex-none flex-col gap-5 rounded-[28px] border border-tia-plum-200 bg-tia-plum-50 p-8 [transition:translate_.6s_var(--ease-tia-spring),border-color_.3s] hover:-translate-y-1.5 hover:border-tia-violet-500 @max-[640px]:w-[300px] @max-[640px]:p-6"
            >
              <span className="text-tia-violet-500">
                <Icon name="quote" size={28} height={22} className="inline align-baseline" />
              </span>
              <blockquote className="text-[18px]/[28px] font-medium @max-[640px]:text-[16px]/[25px]">
                {testimonial.quote[locale]}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-11 flex-none items-center justify-center rounded-full bg-tia-violet-100 text-[18px] font-bold text-tia-violet-700"
                >
                  {testimonial.author.charAt(0)}
                </span>
                <span className="flex flex-col leading-5">
                  <b className="text-[16px]">{testimonial.author}</b>
                  <small className="text-[14px] text-tia-plum-500">
                    {getReviewCaption(testimonial, locale, copy.translatedNote)}
                  </small>
                </span>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </div>
    </Section>
  )
}
