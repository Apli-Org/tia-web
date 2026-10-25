import type { ReactNode } from 'react'
import { raleway } from '@/components/home/fonts'
import { Footer } from '@/components/home/footer'
import { Navbar } from '@/components/home/navbar'
import { HOME_COPY, type HomeCopy } from '@/content/home-copy'
import { LOCALE_PATHS } from '@/content/i18n'
import { cn } from '@/lib/utils'

const LOCALE = 'fr'
const EYEBROW = 'Informations légales'

type HomeLink = HomeCopy['nav']['download']

function toHomeLink(link: HomeLink): HomeLink {
  if (!link.href.startsWith('#')) return link
  return { ...link, href: `${LOCALE_PATHS[LOCALE]}${link.href}` }
}

const COPY = HOME_COPY[LOCALE]

const NAV_COPY: HomeCopy['nav'] = {
  ...COPY.nav,
  links: COPY.nav.links.map(toHomeLink),
  download: toHomeLink(COPY.nav.download),
}

const FOOTER_COPY: HomeCopy['footer'] = {
  ...COPY.footer,
  columns: COPY.footer.columns.map((column) => ({ ...column, links: column.links.map(toHomeLink) })),
  bottomLinks: COPY.footer.bottomLinks.map(toHomeLink),
}

export type LegalPageSearchParams = Promise<{ embed?: string | string[] }>

type LegalPageProps = {
  title: string
  version: string
  updatedAt: string
  searchParams: LegalPageSearchParams
  children: ReactNode
}

export async function LegalPage({ title, version, updatedAt, searchParams, children }: LegalPageProps) {
  const { embed } = await searchParams
  const isEmbed = embed === 'true'

  return (
    <div
      className={cn(
        raleway.variable,
        'min-h-screen bg-tia-plum-50 font-tia text-tia-plum-800 antialiased lining-nums',
      )}
    >
      {!isEmbed && (
        <Navbar locale={LOCALE} copy={NAV_COPY} languageCopy={COPY.language} homeHref={LOCALE_PATHS[LOCALE]} />
      )}
      <div className="@container">
        <header
          className={cn(
            isEmbed
              ? 'px-5 pt-8'
              : 'bg-tia-plum-900 px-12 pt-44 pb-20 text-tia-plum-50 @max-[640px]:px-5 @max-[640px]:pt-32 @max-[640px]:pb-12',
          )}
        >
          <div className="mx-auto flex max-w-[880px] flex-col gap-4">
            {!isEmbed && (
              <p className="text-[14px]/[20px] font-bold tracking-[.12em] text-tia-violet-300 uppercase">{EYEBROW}</p>
            )}
            <h1
              className={cn(
                'font-bold text-balance',
                isEmbed
                  ? 'text-[26px]/[32px] tracking-[-.01em]'
                  : 'text-[clamp(36px,5cqi,60px)] leading-[1.08] tracking-[-.02em]',
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                'text-[14px]/[20px] font-semibold',
                isEmbed
                  ? 'text-tia-plum-500'
                  : 'self-start rounded-full border border-tia-plum-700 bg-tia-plum-800 px-4 py-2 text-tia-plum-50/86',
              )}
            >
              Version {version} — Dernière mise à jour : {updatedAt}
            </p>
          </div>
        </header>
        <main
          className={cn(
            'text-tia-plum-600',
            isEmbed
              ? 'px-5 pt-6 pb-12 text-[16px]/[26px]'
              : 'px-12 pt-16 pb-24 text-[17px]/[28px] @max-[640px]:px-5 @max-[640px]:pt-10 @max-[640px]:pb-16',
          )}
        >
          <article className="mx-auto flex max-w-[880px] flex-col gap-10">{children}</article>
        </main>
        {!isEmbed && (
          <div className="border-t border-tia-plum-200">
            <Footer locale={LOCALE} copy={FOOTER_COPY} storesCopy={COPY.stores} languageCopy={COPY.language} />
          </div>
        )}
      </div>
    </div>
  )
}
