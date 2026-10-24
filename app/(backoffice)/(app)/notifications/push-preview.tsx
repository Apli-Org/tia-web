import Image from 'next/image'

type PushPreviewProps = {
  title: string
  body: string
}

function AppIcon({ size }: { size: number }) {
  return (
    <Image
      src="/images/TiaApp.png"
      alt=""
      width={size}
      height={size}
      className="rounded-[22%] shrink-0"
      style={{ width: size, height: size }}
    />
  )
}

export function PushPreview({ title, body }: PushPreviewProps) {
  const shownTitle = title.trim() || 'Titre de la notification'
  const shownBody = body.trim() || 'Texte de la notification'

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">iOS, écran verrouillé</p>
        <div className="rounded-3xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-3">
          <div className="flex gap-2.5 rounded-2xl bg-white/80 p-3 backdrop-blur dark:bg-neutral-800/80">
            <AppIcon size={36} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate text-[13px] font-semibold text-neutral-900 dark:text-white">
                  {shownTitle}
                </p>
                <span className="shrink-0 text-[11px] text-neutral-500">maintenant</span>
              </div>
              <p className="line-clamp-4 text-[13px] leading-snug text-neutral-800 dark:text-neutral-200">
                {shownBody}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Android, volet replié</p>
        <div className="rounded-3xl bg-neutral-200 p-3 dark:bg-neutral-900">
          <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-neutral-800">
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
              <AppIcon size={16} />
              <span>Tia</span>
              <span>•</span>
              <span>maintenant</span>
            </div>
            <p className="mt-1.5 truncate text-[13px] font-semibold text-neutral-900 dark:text-white">
              {shownTitle}
            </p>
            <p className="truncate text-[13px] text-neutral-600 dark:text-neutral-300">{shownBody}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
