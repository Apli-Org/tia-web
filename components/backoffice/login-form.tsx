'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginAdmin } from "@/actions/admin/auth.action"

const INPUT_CLASS_NAME =
  "h-12 rounded-2xl border-tia-plum-200 bg-tia-plum-100/60 px-4 text-[15px] shadow-none transition-[background-color,border-color,box-shadow] placeholder:text-tia-plum-300 focus-visible:border-tia-violet-500 focus-visible:bg-tia-plum-50 focus-visible:ring-4 focus-visible:ring-tia-violet-500/15 md:text-[15px]"

const LABEL_CLASS_NAME = "text-[13px] font-semibold text-tia-plum-700"

type LoginFormProps = {
  className?: string
}

export function LoginForm({ className }: LoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await loginAdmin(email, password)

      if (result.success) {
        setIsSuccess(true)
        setIsLoading(false)
        await new Promise(resolve => setTimeout(resolve, 1000))
        router.push('/dashboard')
        router.refresh()
      } else {
        setError(result.error || 'Une erreur est survenue')
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <FieldGroup className="gap-5">
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-2xl bg-tia-coral-50 px-4 py-3 text-[14px]/[20px] font-medium text-tia-coral-700"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        <Field className="gap-2">
          <FieldLabel htmlFor="email" className={LABEL_CLASS_NAME}>
            Adresse e-mail
          </FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="nom@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className={INPUT_CLASS_NAME}
          />
        </Field>
        <Field className="gap-2">
          <FieldLabel htmlFor="password" className={LABEL_CLASS_NAME}>
            Mot de passe
          </FieldLabel>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className={INPUT_CLASS_NAME}
          />
        </Field>
        <Button
          type="submit"
          className={cn(
            "group mt-2 h-12 w-full rounded-full bg-tia-plum-800 text-[15px] font-semibold text-tia-plum-50 transition-[background-color,scale] hover:bg-tia-violet-700 active:scale-[.98] disabled:opacity-100",
            isSuccess && "bg-tia-violet-500 hover:bg-tia-violet-500"
          )}
          disabled={isLoading || isSuccess}
        >
          {isSuccess ? (
            <>
              <Check className="size-4" />
              Connexion réussie
            </>
          ) : isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Connexion en cours…
            </>
          ) : (
            <>
              Se connecter
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
