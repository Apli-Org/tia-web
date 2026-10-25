import { WHY_TIA } from '@/content/site'
import { cn } from '@/lib/utils'

const CHIP_DELAYS = ['delay-0', 'delay-40', 'delay-80']

export function PaymentChips() {
  return (
    <div className="absolute inset-x-7 top-7 z-3 grid grid-cols-2 gap-5 @max-[640px]:static @max-[640px]:mb-6 @max-[640px]:grid-cols-1 @max-[640px]:gap-3">
      {WHY_TIA.payments.map((payment) => (
        <div key={payment.region} className="flex flex-wrap content-start items-center gap-2">
          <small className="w-full text-[11px] font-bold tracking-[.08em] text-tia-violet-700 uppercase">
            {payment.region}
          </small>
          {payment.methods.map((method, index) => (
            <span
              key={method}
              className={cn(
                'inline-flex items-center gap-2 rounded-full bg-tia-plum-50 px-3.5 py-2 text-[14px] font-semibold text-tia-plum-800 transition-[translate] duration-600 ease-tia-spring group-hover:-translate-y-1',
                CHIP_DELAYS[index],
              )}
            >
              <i className={cn('size-2 rounded-full', payment.isLocal ? 'bg-tia-violet-500' : 'bg-tia-coral-500')} />
              {method}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
