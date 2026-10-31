import {
  Activity,
  BellRing,
  CreditCard,
  Headphones,
  Layout,
  LayoutDashboard,
  Mail,
  Megaphone,
  Shield,
  Tag,
  Ticket,
  Timer,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

export type SectionKey = "overview" | "management" | "moderation" | "finance" | "communication" | "content"

export type NavItem = {
  title: string
  description: string
  url: string
  icon: LucideIcon
  action: string
  section: SectionKey
}

export const NAV_SECTIONS: Record<SectionKey, { label: string; icon: LucideIcon; order: number }> = {
  overview: { label: "Vue d'ensemble", icon: LayoutDashboard, order: 1 },
  management: { label: "Gestion", icon: Users, order: 2 },
  moderation: { label: "Modération", icon: Shield, order: 3 },
  finance: { label: "Finance", icon: CreditCard, order: 4 },
  communication: { label: "Communication", icon: Mail, order: 5 },
  content: { label: "Contenu & Support", icon: Layout, order: 6 },
}

export const NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", description: "Vue d'ensemble", url: "/dashboard", icon: LayoutDashboard, action: "view_dashboard", section: "overview" },
  { title: "Activité", description: "Journal de l'équipe", url: "/activity", icon: Activity, action: "view_dashboard", section: "overview" },
  { title: "Utilisateurs", description: "Membres et profils", url: "/users", icon: Users, action: "view_users", section: "management" },
  { title: "Personnel", description: "Équipe et rôles", url: "/staff", icon: UsersRound, action: "view_staff", section: "management" },
  { title: "Modération", description: "Signalements", url: "/moderation", icon: Shield, action: "view_reports", section: "moderation" },
  { title: "Gestion dislike", description: "Profils passés", url: "/moderation/passed-profiles", icon: Timer, action: "manage_cron_settings", section: "moderation" },
  { title: "Tarification", description: "Offres et prix", url: "/pricing", icon: Tag, action: "view_pricing", section: "finance" },
  { title: "Abonnements", description: "Membres abonnés", url: "/pricing/subscriptions", icon: CreditCard, action: "view_pricing", section: "finance" },
  { title: "Codes Promo", description: "Réductions", url: "/promo-codes", icon: Ticket, action: "manage_promo_codes", section: "finance" },
  { title: "Newsletter", description: "Campagnes e-mail", url: "/newsletter", icon: Mail, action: "send_newsletter", section: "communication" },
  { title: "Notifications push", description: "Campagnes push", url: "/notifications", icon: BellRing, action: "send_push", section: "communication" },
  { title: "Publicités", description: "Annonces in-app", url: "/advertisements", icon: Megaphone, action: "view_advertisements", section: "communication" },
  { title: "Landing Page", description: "Contenu publié", url: "/landing", icon: Layout, action: "manage_landing_page", section: "content" },
  { title: "Support", description: "Tickets membres", url: "/support", icon: Headphones, action: "view_tickets", section: "content" },
]

function matchesPath(pathname: string, url: string): boolean {
  return pathname === url || pathname.startsWith(url + "/")
}

export function getActiveNavItem(pathname: string): NavItem | undefined {
  return NAV_ITEMS.filter((item) => matchesPath(pathname, item.url)).sort((a, b) => b.url.length - a.url.length)[0]
}
