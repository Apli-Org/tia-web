import Link from 'next/link'
import type { HomeCopy } from '@/content/home-copy'
import { LOCALE_PATHS, LOCALES, type Locale } from '@/content/i18n'
import { INSTAGRAM_URL } from '@/content/site'
import { cn } from '@/lib/utils'
import { Icon } from './icon'
import { Logo } from './logo'
import { StoreButtons } from './store-buttons'

const COLUMN = 'flex flex-col gap-3 text-[15px]/[22px]'
const COLUMN_TITLE = 'mb-1 text-[16px]/[24px] font-bold text-tia-plum-800'
const MUTED_LINK = 'text-tia-plum-500 transition-colors duration-200 hover:text-tia-violet-500'

type FooterProps = {
  locale: Locale
  copy: HomeCopy['footer']
  storesCopy: HomeCopy['stores']
  languageCopy: HomeCopy['language']
}

export function Footer({ locale, copy, storesCopy, languageCopy }: FooterProps) {
  const otherLocales = LOCALES.filter((option) => option !== locale)

  return (
    <footer className="bg-tia-plum-50 px-12 pt-18 pb-10 text-tia-plum-800 @max-[640px]:px-5 @max-[640px]:pt-14 @max-[640px]:pb-7">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.6fr)] gap-10 @max-[1080px]:grid-cols-2 @max-[640px]:gap-x-5 @max-[640px]:gap-y-8">
          {copy.columns.map((column) => (
            <div key={column.title} className={COLUMN}>
              <h2 className={COLUMN_TITLE}>{column.title}</h2>
              {column.links.map((link) => (
                <Link key={link.href} href={link.href} className={MUTED_LINK}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
          <div className={COLUMN}>
            <h2 className={COLUMN_TITLE}>{copy.socialTitle}</h2>
            <div className="flex gap-2.5">
              <a
                href={INSTAGRAM_URL}
                aria-label={copy.instagramLabel}
                className="flex size-11 items-center justify-center rounded-full bg-tia-plum-100 text-tia-plum-800 transition-colors duration-200 hover:bg-tia-violet-500 hover:text-tia-plum-50"
              >
                <Icon name="instagram" size={22} strokeWidth={1.8} />
              </a>
            </div>
          </div>
          <div className={cn(COLUMN, '@max-[640px]:col-span-full')}>
            <h2 className={COLUMN_TITLE}>{copy.appTitle}</h2>
            <StoreButtons
              copy={storesCopy}
              isDark
              isCompact
              className="flex-col items-start gap-2.5 @max-[640px]:flex-row @max-[640px]:flex-wrap"
            />
          </div>
        </div>
        <hr className="my-10 border-tia-plum-200" />
        <p className="max-w-[1100px] text-[15px]/[24px] text-tia-plum-500">{copy.seo}</p>
        <hr className="my-10 border-tia-plum-200" />
        <div className="flex flex-wrap items-center justify-between gap-4 text-[14px] @max-[640px]:flex-col @max-[640px]:items-start">
          <div className="flex flex-wrap gap-6 font-semibold">
            {copy.bottomLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-tia-plum-800 transition-colors duration-200 hover:text-tia-violet-500"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-5 text-tia-plum-500">
            <span>{copy.copyright}</span>
            {copy.legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className={MUTED_LINK}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between gap-4 text-[13px] text-tia-plum-500 @max-[640px]:flex-col @max-[640px]:items-start">
          <Logo />
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {copy.locales}
            {otherLocales.map((option) => (
              <Link
                key={option}
                href={LOCALE_PATHS[option]}
                hrefLang={option}
                lang={option}
                className="font-semibold text-tia-plum-800 underline-offset-4 transition-colors duration-200 hover:text-tia-violet-500 hover:underline"
              >
                {languageCopy.names[option]}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  )
}
