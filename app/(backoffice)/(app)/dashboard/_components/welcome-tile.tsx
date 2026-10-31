import Link from "next/link"
import { ArrowUpRight, CalendarDays } from "lucide-react"
import { RefreshButton } from "@/components/backoffice/refresh-button"
import { HeartBurst } from "@/components/home/heart-burst"
import { Button } from "@/components/ui/button"
import { Spotlight } from "@/components/ui/spotlight"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { cn } from "@/lib/utils"

const VANILLA_PAY_REPORTS_URL = "https://bo.vanilla-pay.net/pro/login"
const TIME_ZONE = "Indian/Antananarivo"
const EVENING_HOUR = 18

type WelcomeTileProps = {
  firstName: string
  roleLabel: string
  className?: string
}

function getGreeting(now: Date): string {
  const hour = Number(new Intl.DateTimeFormat("fr-FR", { hour: "numeric", hour12: false, timeZone: TIME_ZONE }).format(now))
  return hour >= EVENING_HOUR ? "Bonsoir" : "Bonjour"
}

function getDateLabel(now: Date): string {
  return new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: TIME_ZONE }).format(now)
}

export function WelcomeTile({ firstName, roleLabel, className }: WelcomeTileProps) {
  const now = new Date()

  return (
    <section
      className={cn(
        "group relative isolate flex min-h-[320px] animate-tia-rise flex-col overflow-hidden rounded-[28px] bg-tia-plum-900 p-6 text-tia-plum-50 ring-1 ring-tia-plum-800 motion-reduce:animate-none sm:p-8",
        className
      )}
    >
      <Spotlight translateY={-300} width={520} height={1200} smallWidth={220} xOffset={80} />
      <div aria-hidden="true" className="absolute -right-6 bottom-6 hidden size-60 sm:block lg:right-4 lg:bottom-10">
        <HeartBurst />
      </div>

      <div className="relative z-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-tia-plum-50/12 px-3 text-[12px] font-bold tracking-[.04em] text-tia-plum-50 capitalize backdrop-blur-md">
          <CalendarDays className="size-3.5 text-tia-violet-300" />
          {getDateLabel(now)}
        </span>
        <span className="inline-flex h-7 items-center rounded-full bg-tia-violet-500 px-3 text-[12px] font-bold tracking-[.04em] text-tia-plum-50">
          {roleLabel}
        </span>
      </div>

      <div className="relative z-3 mt-auto max-w-[520px] pt-12">
        <h1 className="text-[40px]/[44px] font-bold tracking-[-.03em] sm:text-[52px]/[56px]">
          <TextGenerateEffect words={`${getGreeting(now)}, ${firstName}.`} delay={0.2} />
        </h1>
        <p className="mt-3 max-w-[420px] text-[16px]/[24px] text-tia-plum-50/75">
          Voici comment se porte la communauté Tia aujourd&apos;hui.
        </p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <Button
            asChild
            className="group/cta h-11 rounded-full bg-tia-violet-500 px-5 text-[14px] font-semibold text-tia-plum-50 transition-[background-color,scale] hover:bg-tia-violet-400 active:scale-[.98]"
          >
            <Link href={VANILLA_PAY_REPORTS_URL} target="_blank" rel="noopener noreferrer">
              Rapports Vanilla Pay
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>
          </Button>
          <RefreshButton
            size="lg"
            className="h-11 rounded-full border-tia-plum-700 bg-tia-plum-800 px-5 text-[14px] font-semibold text-tia-plum-50 hover:bg-tia-plum-700 hover:text-tia-plum-50"
          />
        </div>
      </div>
    </section>
  )
}
