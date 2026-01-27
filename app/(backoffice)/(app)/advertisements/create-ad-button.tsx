"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AdModal } from "./ad-modal"

type CreateAdButtonProps = {
  adminId: string
}

export function CreateAdButton({ adminId }: CreateAdButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Créer une publicité
      </Button>

      <AdModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        adminId={adminId}
      />
    </>
  )
}
