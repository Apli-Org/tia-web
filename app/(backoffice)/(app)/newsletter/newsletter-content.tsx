'use client'

import { useState } from 'react'
import { NewsletterForm } from './newsletter-form'
import { SubscribersTable } from './subscribers-table'

type SendMode = 'all' | 'selection'

type NewsletterContentProps = {
  adminId: string
  subscriberCount: number
}

export function NewsletterContent({ adminId, subscriberCount }: NewsletterContentProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [sendMode, setSendMode] = useState<SendMode>('all')

  return (
    <>
      <SubscribersTable
        adminId={adminId}
        subscriberCount={subscriberCount}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        sendMode={sendMode}
        onSendModeChange={setSendMode}
      />
      <NewsletterForm
        adminId={adminId}
        subscriberCount={subscriberCount}
        selectedSubscriberIds={sendMode === 'selection' ? selectedIds : []}
      />
    </>
  )
}
