import { Fragment } from 'react'
import { TICKER_SEPARATOR } from '@/content/site'
import { Marquee } from './marquee'

const SCROLL_DURATION = 40
const COPIES = 4

type TickerProps = {
  items: string[]
}

export function Ticker({ items }: TickerProps) {
  return (
    <div aria-hidden="true" className="overflow-hidden bg-tia-violet-500 py-4.5 text-tia-plum-50">
      <Marquee
        duration={SCROLL_DURATION}
        copies={COPIES}
        groupClassName="gap-7 pr-7 text-[22px] font-bold @max-[640px]:text-[18px]"
      >
        {items.map((item) => (
          <Fragment key={item}>
            <span>{item}</span>
            <i className="opacity-70 not-italic">{TICKER_SEPARATOR}</i>
          </Fragment>
        ))}
      </Marquee>
    </div>
  )
}
