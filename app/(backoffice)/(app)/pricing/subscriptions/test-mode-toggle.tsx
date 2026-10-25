'use client'

import { useState } from 'react'
import { TestTube, Loader2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { toggleTestMode } from '@/actions/admin/pricing.action'

interface TestModeToggleProps {
  initialEnabled: boolean
}

export function TestModeToggle({ initialEnabled }: TestModeToggleProps) {
  const [enabled, setEnabled] = useState(initialEnabled)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async (checked: boolean) => {
    setIsLoading(true)

    const result = await toggleTestMode(checked)

    if (result.success) {
      setEnabled(checked)
      toast.success(
        checked ? 'Mode Test Activé' : 'Mode Test Désactivé',
        {
          description: checked
            ? 'Les prix de test (300 Ar) sont maintenant actifs pour l\'app mobile'
            : 'Les prix de production sont maintenant actifs pour l\'app mobile',
        }
      )
    } else {
      toast.error('Erreur', {
        description: result.error || 'Impossible de changer le mode test',
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-lg border">
      {isLoading ? (
        <Loader2 className="h-4 w-4 text-orange-600 animate-spin" />
      ) : (
        <TestTube className={`h-4 w-4 ${enabled ? 'text-orange-600' : 'text-slate-400'}`} />
      )}
      <Label htmlFor="test-mode" className="cursor-pointer">
        {isLoading ? 'Chargement...' : 'Mode Test (300 Ar)'}
      </Label>
      <Switch
        id="test-mode"
        checked={enabled}
        onCheckedChange={handleToggle}
        disabled={isLoading}
      />
    </div>
  )
}
