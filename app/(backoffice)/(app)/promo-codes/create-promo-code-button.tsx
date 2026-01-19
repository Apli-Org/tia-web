"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PromoCodeModal } from "./promo-code-modal"

type CreatePromoCodeButtonProps = {
  adminId: string
}

export function CreatePromoCodeButton({ adminId }: CreatePromoCodeButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Créer un code promo
      </Button>

      <PromoCodeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        adminId={adminId}
      />
    </>
  )
}
