import Link from "next/link"
import { ArrowLeft, Lock } from "lucide-react"
import { LoginForm } from "@/components/backoffice/login-form"
import { Logo } from "@/components/home/logo"
import { cn } from "@/lib/utils"

type LoginPanelProps = {
  className?: string
}

export function LoginPanel({ className }: LoginPanelProps) {
  return (
    <section
      className={cn(
        "flex animate-tia-rise flex-col rounded-[32px] bg-tia-plum-50 p-6 ring-1 ring-tia-plum-800/6 sm:p-10 xl:p-12",
        className
      )}
    >
      <header className="flex items-center justify-between gap-4">
        <Link href="/" aria-label="Accueil Tia">
          <Logo height={30} />
        </Link>
        <span className="inline-flex h-7 items-center rounded-full bg-tia-violet-100 px-3 text-[12px] font-bold tracking-[.04em] text-tia-violet-700">
          Back office
        </span>
      </header>
      <div className="mx-auto flex w-full max-w-[380px] flex-1 flex-col justify-center py-12">
        <h1 className="text-[40px]/[44px] font-bold tracking-[-.03em] sm:text-[48px]/[52px]">
          Bon retour.
        </h1>
        <p className="mt-3 text-[16px]/[24px] text-tia-plum-500">
          Connectez-vous avec votre compte équipe pour accéder au back office.
        </p>
        <LoginForm className="mt-9" />
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[13px] text-tia-plum-500">
        <span className="inline-flex items-center gap-1.5">
          <Lock className="size-3.5" />
          Accès réservé à l&apos;équipe Tia
        </span>
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-semibold text-tia-plum-700 transition-colors hover:text-tia-violet-600"
        >
          <ArrowLeft className="size-3.5" />
          Retour au site
        </Link>
      </footer>
    </section>
  )
}
