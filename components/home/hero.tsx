import { COUNTRIES, COUNTRY_STATUS_LABELS } from '@/content/countries'
import { HERO } from '@/content/site'
import { Flag } from './flag'
import { HeroMosaic } from './hero-mosaic'
import { StoreButtons } from './store-buttons'

const ENTRANCE_STAGGER = 0.12
const ENTRANCE_OFFSET = 0.1
const ENTRANCE = 'animate-tia-rise'

function entranceDelay(step: number) {
  return { animationDelay: `${step * ENTRANCE_STAGGER + ENTRANCE_OFFSET}s` }
}

export function Hero() {
  return (
    <header className="relative flex h-screen max-h-[1080px] min-h-[860px] items-center justify-center overflow-hidden bg-tia-plum-900 text-tia-plum-50 @max-[640px]:h-auto @max-[640px]:min-h-[760px] @max-[640px]:py-30">
      <HeroMosaic />
      <div aria-hidden="true" className="absolute inset-0 bg-tia-plum-900/72" />
      <div className="relative z-2 flex max-w-[980px] flex-col items-center gap-6 px-6 text-center">
        <ul
          aria-label={HERO.countriesLabel}
          className={`${ENTRANCE} flex flex-wrap justify-center gap-2 @max-[640px]:gap-1.5`}
          style={entranceDelay(0)}
        >
          {COUNTRIES.map((country) => (
            <li
              key={country.flag}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-tia-plum-700 bg-tia-plum-800 pr-3.5 pl-2.5 text-[14px] font-semibold text-tia-plum-50 [transition:translate_.5s_var(--ease-tia-spring),background-color_.3s] hover:-translate-y-0.75 hover:bg-tia-plum-700 @max-[640px]:h-8 @max-[640px]:gap-1.5 @max-[640px]:pr-2.5 @max-[640px]:pl-2 @max-[640px]:text-[13px]"
            >
              <Flag code={country.flag} width={20} height={14} />
              {country.chipLabel}
              {country.status === 'soon' && (
                <em className="ml-0.5 text-[11px] font-bold text-tia-violet-300 not-italic @max-[640px]:hidden">
                  {COUNTRY_STATUS_LABELS.soon}
                </em>
              )}
            </li>
          ))}
        </ul>
        <h1
          className={`${ENTRANCE} text-[clamp(56px,9cqi,132px)] leading-none font-bold tracking-[-.03em]`}
          style={entranceDelay(1)}
        >
          {HERO.title}{' '}
          <span className="px-[.08em] font-tia-script text-[.92em] font-normal tracking-normal text-tia-coral-300">
            {HERO.highlight}
          </span>
        </h1>
        <p
          className={`${ENTRANCE} max-w-[620px] text-[clamp(18px,1.6cqi,22px)] leading-normal text-tia-plum-50/86`}
          style={entranceDelay(2)}
        >
          {HERO.subtitle}
        </p>
        <div className={ENTRANCE} style={entranceDelay(3)}>
          <StoreButtons className="justify-center @max-[640px]:flex-col @max-[640px]:items-center" />
        </div>
        <p className={`${ENTRANCE} text-[14px] font-semibold text-tia-plum-50/70`} style={entranceDelay(4)}>
          {HERO.note}
        </p>
      </div>
      <a
        href={HERO.scroll.href}
        aria-label={HERO.scroll.label}
        className="absolute bottom-10 left-1/2 z-2 -ml-6 flex size-12 animate-tia-bob items-center justify-center rounded-full border border-tia-plum-50/35 font-[family-name:system-ui,sans-serif] text-[20px] text-tia-plum-50"
      >
        {HERO.scroll.arrow}
      </a>
      <p className="absolute right-6 bottom-4 z-2 text-[12px] text-tia-plum-50/55 @max-[640px]:right-auto @max-[640px]:left-0 @max-[640px]:w-full @max-[640px]:text-center">
        {HERO.disclaimer}
      </p>
    </header>
  )
}
