import { BadgeCheck, Bell, LifeBuoy, Mail, ShieldCheck, Tag, Users, type LucideIcon } from "lucide-react"
import { raleway } from "@/components/home/fonts"
import { HeartBurst } from "@/components/home/heart-burst"
import { Photo } from "@/components/home/photo"
import { cn } from "@/lib/utils"
import { LoginPanel } from "./_components/login-panel"
import { LoginTile, type LoginTileStyle } from "./_components/login-tile"

type TileId = "member" | "heart" | "safety" | "sections"

const TILE_STYLES: Record<TileId, LoginTileStyle> = {
  member: {
    tile: "row-span-2 bg-tia-plum-800 text-tia-plum-50",
    kicker: "bg-tia-plum-50/16 text-tia-plum-50 backdrop-blur-md",
    description: "text-tia-plum-50/80 max-sm:hidden",
    delayStep: 1,
  },
  heart: {
    tile: "bg-tia-coral-600 text-tia-plum-50",
    kicker: "bg-tia-coral-700 text-tia-plum-50",
    delayStep: 2,
  },
  safety: {
    tile: "bg-tia-violet-100 text-tia-violet-900",
    kicker: "bg-tia-violet-200 text-tia-violet-800",
    description: "text-tia-violet-700",
    delayStep: 3,
  },
  sections: {
    tile: "col-span-2 bg-tia-violet-900 text-tia-plum-50",
    kicker: "bg-tia-plum-50/12 text-tia-violet-200",
    description: "text-tia-plum-50/78",
    delayStep: 4,
  },
}

const MEMBER_PHOTO = "olivia"

const TEAM_SECTIONS: { label: string; icon: LucideIcon }[] = [
  { label: "Membres", icon: Users },
  { label: "Modération", icon: ShieldCheck },
  { label: "Offres", icon: Tag },
  { label: "Notifications", icon: Bell },
  { label: "Newsletter", icon: Mail },
  { label: "Support", icon: LifeBuoy },
]

export default function LoginPage() {
  return (
    <main
      className={cn(
        raleway.variable,
        "min-h-svh bg-tia-plum-100 p-3 font-tia text-tia-plum-800 antialiased lining-nums sm:p-4 motion-reduce:**:animate-none"
      )}
    >
      <div className="mx-auto grid max-w-[1600px] auto-rows-[minmax(240px,auto)] grid-cols-2 gap-3 sm:gap-4 lg:h-[calc(100svh-2rem)] lg:min-h-[680px] lg:grid-cols-4 lg:grid-rows-3">
        <LoginPanel className="col-span-2 min-h-[calc(100svh-1.5rem)] sm:min-h-[calc(100svh-2rem)] lg:row-span-3 lg:min-h-0" />

        <LoginTile
          kicker="Communauté"
          title="Derrière chaque profil, une vraie personne."
          description="Votre travail garde la communauté Tia sûre et bienveillante."
          tileStyle={TILE_STYLES.member}
        >
          <Photo
            id={MEMBER_PHOTO}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="transition-transform duration-1000 ease-tia-spring group-hover:scale-105"
          />
          <span className="absolute inset-0 z-1 bg-linear-to-t from-tia-plum-900/85 via-tia-plum-900/20 to-transparent" />
          <span className="absolute top-5 left-5 z-3 inline-flex h-8 items-center gap-1.5 rounded-full bg-tia-plum-50/18 px-3 text-[13px] font-semibold text-tia-plum-50 backdrop-blur-md sm:top-6 sm:left-6">
            <BadgeCheck className="size-4" />
            Profil vérifié
          </span>
        </LoginTile>

        <LoginTile kicker="Matchs" title="Chaque match compte." tileStyle={TILE_STYLES.heart}>
          <HeartBurst />
        </LoginTile>

        <LoginTile
          kicker="Modération"
          title="Une communauté sûre."
          description="Signalements, vérifications et sanctions au même endroit."
          tileStyle={TILE_STYLES.safety}
        >
          <div className="relative z-3 mb-auto pb-5">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-tia-violet-500 text-tia-plum-50 shadow-[0_12px_24px_-12px] shadow-tia-violet-700 transition-transform duration-700 ease-tia-spring group-hover:scale-110 sm:size-14">
              <ShieldCheck className="size-6 sm:size-7" />
            </span>
          </div>
        </LoginTile>

        <LoginTile
          kicker="Espace équipe"
          title="Tout Tia, au même endroit."
          description="Membres, campagnes, offres et support, depuis un seul back office."
          tileStyle={TILE_STYLES.sections}
        >
          <ul className="relative z-3 mb-auto flex flex-wrap gap-2 pb-5">
            {TEAM_SECTIONS.map(({ label, icon: SectionIcon }) => (
              <li
                key={label}
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-tia-plum-50/10 px-3 text-[13px] font-semibold text-tia-plum-50/90 ring-1 ring-tia-plum-50/10"
              >
                <SectionIcon className="size-3.5 text-tia-violet-300" />
                {label}
              </li>
            ))}
          </ul>
        </LoginTile>
      </div>
    </main>
  )
}
