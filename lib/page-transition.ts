const TRANSITION_PATHS: ReadonlySet<string> = new Set([
  '/',
  '/en',
  '/inscription-newsletter',
  '/terms',
  '/privacy',
  '/child-safety',
  '/community-guidelines',
  '/dating-safety',
  '/account-deletion',
])

const EMBED_PARAM = 'embed'
const EMBED_VALUE = 'true'
const PRIMARY_BUTTON = 0

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1)
  return pathname
}

function isEmbed(url: URL): boolean {
  return url.searchParams.get(EMBED_PARAM) === EMBED_VALUE
}

function hasModifier(event: MouseEvent): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
}

export function shouldTransition(from: URL, to: URL): boolean {
  const fromPath = normalizePath(from.pathname)
  const toPath = normalizePath(to.pathname)
  if (fromPath === toPath) return false
  if (isEmbed(from) || isEmbed(to)) return false
  return TRANSITION_PATHS.has(fromPath) && TRANSITION_PATHS.has(toPath)
}

export function getClickedLinkUrl(event: MouseEvent, currentUrl: URL): URL | null {
  if (event.defaultPrevented || event.button !== PRIMARY_BUTTON || hasModifier(event)) return null
  if (!(event.target instanceof Element)) return null

  const anchor = event.target.closest('a[href]')
  if (!(anchor instanceof HTMLAnchorElement)) return null
  if (anchor.target && anchor.target !== '_self') return null
  if (anchor.hasAttribute('download')) return null

  const url = new URL(anchor.href)
  if (url.origin !== currentUrl.origin) return null
  return url
}
