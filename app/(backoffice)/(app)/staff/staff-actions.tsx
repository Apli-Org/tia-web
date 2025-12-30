"use client"

import { useState } from "react"
import {
  MoreHorizontal,
  Pencil,
  Power,
  PowerOff,
  KeyRound,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  type StaffMember,
  toggleStaffStatus,
} from "@/actions/admin/staff.action"
import { EditStaffModal } from "./edit-staff-modal"
import { ResetPasswordModal } from "./reset-password-modal"

type StaffActionsProps = {
  member: StaffMember
  currentAdminId: string
}

export function StaffActions({ member, currentAdminId }: StaffActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isResetOpen, setIsResetOpen] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  const isSelf = member.id === currentAdminId

  const handleToggleStatus = async () => {
    if (isSelf) return
    setIsToggling(true)
    const result = await toggleStaffStatus(
      member.id,
      !member.is_active,
      currentAdminId
    )
    if (!result.success) {
      alert(result.error)
    }
    setIsToggling(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={isToggling}>
            {isToggling ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsResetOpen(true)}>
            <KeyRound className="h-4 w-4 mr-2" />
            Réinitialiser mot de passe
          </DropdownMenuItem>
          {!isSelf && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleToggleStatus}
                className={member.is_active ? "text-orange-600" : "text-green-600"}
              >
                {member.is_active ? (
                  <>
                    <PowerOff className="h-4 w-4 mr-2" />
                    Désactiver
                  </>
                ) : (
                  <>
                    <Power className="h-4 w-4 mr-2" />
                    Activer
                  </>
                )}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <EditStaffModal
        member={member}
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        adminId={currentAdminId}
        isSelf={isSelf}
      />

      <ResetPasswordModal
        member={member}
        open={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        adminId={currentAdminId}
      />
    </>
  )
}
