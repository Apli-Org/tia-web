import { DashboardTile } from "./dashboard-tile"

type UnavailableTileProps = {
  title: string
  delayStep: number
  className?: string
}

export function UnavailableTile({ title, delayStep, className }: UnavailableTileProps) {
  return (
    <DashboardTile title={title} delayStep={delayStep} className={className}>
      <p className="my-auto py-10 text-center text-[13px] text-tia-plum-500">
        Données momentanément indisponibles. Nouvel essai au prochain rafraîchissement.
      </p>
    </DashboardTile>
  )
}
