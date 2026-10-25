'use client'

import { useState } from 'react'
import { NewsletterForm } from './newsletter-form'
import { SubscribersTable } from './subscribers-table'

type SendMode = 'all' | 'selection'

type NewsletterContentProps = {
  subscriberCount: number
}

export function NewsletterContent({ subscriberCount }: NewsletterContentProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [sendMode, setSendMode] = useState<SendMode>('all')

  return (
    <>
      <SubscribersTable
        subscriberCount={subscriberCount}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        sendMode={sendMode}
        onSendModeChange={setSendMode}
      />
      <NewsletterForm
        subscriberCount={subscriberCount}
        selectedSubscriberIds={sendMode === 'selection' ? selectedIds : []}
      />
    </>
  )
}
