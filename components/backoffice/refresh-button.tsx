"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"

type RefreshButtonProps = {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  showLabel?: boolean
}

export function RefreshButton({
  variant = "outline",
  size = "sm",
  showLabel = true,
}: RefreshButtonProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isSpinning, setIsSpinning] = useState(false)

  const handleRefresh = () => {
    setIsSpinning(true)
    startTransition(() => {
      router.refresh()
      // Keep spinning for a bit to show feedback
      setTimeout(() => setIsSpinning(false), 500)
    })
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleRefresh}
      disabled={isPending}
    >
      <RefreshCw
        className={`h-4 w-4 ${showLabel ? "mr-2" : ""} ${isSpinning ? "animate-spin" : ""}`}
      />
      {showLabel && "Actualiser"}
    </Button>
  )
}
