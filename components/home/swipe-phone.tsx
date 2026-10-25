import { WHY_TIA } from '@/content/site'
import { cn } from '@/lib/utils'
import { Icon } from './icon'
import { Photo } from './photo'

const CARD_OFFSET = 3
const PHOTO_SIZES = '(max-width: 640px) 140px, 290px'

export function SwipePhone() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-9 right-10 bottom-9 z-3 aspect-[9/18.5] rotate-4 animate-tia-float rounded-[40px] bg-tia-plum-900 p-2 shadow-[0_30px_60px_black] ring-1 shadow-tia-plum-900/45 ring-tia-plum-50/12 transition-[rotate,scale] duration-800 ease-tia-spring group-hover:-rotate-2 group-hover:scale-[1.04] @max-[640px]:top-auto @max-[640px]:right-1/2 @max-[640px]:bottom-6 @max-[640px]:h-[300px] @max-[640px]:translate-x-1/2 @max-[640px]:animate-none"
    >
      <div className="absolute inset-2 overflow-hidden rounded-[32px] bg-tia-plum-800">
        {WHY_TIA.swipeProfiles.map((profile, index) => {
          const delay = { animationDelay: `${-index * CARD_OFFSET}s` }

          return (
            <div
              key={profile.name}
              className={cn(
                'absolute inset-0 origin-bottom animate-tia-swipe overflow-hidden rounded-[32px]',
                index > 0 && 'motion-reduce:hidden',
              )}
              style={delay}
            >
              <Photo id={profile.photo} sizes={PHOTO_SIZES} />
              <span className="absolute inset-0 bg-linear-to-b from-tia-plum-900/0 from-50% to-tia-plum-900/85" />
              <span
                className="absolute top-11 left-4.5 animate-tia-stamp rounded-[12px] border-3 border-tia-coral-500 bg-tia-coral-500/85 px-3.5 py-1.5 text-[20px] font-bold tracking-[.04em] text-tia-plum-50 opacity-0"
                style={delay}
              >
                {WHY_TIA.likeStamp}
              </span>
              <span className="absolute bottom-5.5 left-4 flex flex-col text-tia-plum-50">
                <b className="text-[22px] font-bold">
                  {profile.name} <i className="font-normal not-italic">{profile.age}</i>
                </b>
                <small className="text-[13px] opacity-85">{profile.place}</small>
              </span>
            </div>
          )
        })}
      </div>
      <div className="absolute right-3.5 bottom-17.5 z-4 flex flex-col gap-2.5">
        <span className="flex size-11.5 animate-tia-tap items-center justify-center rounded-full bg-tia-coral-500 text-tia-plum-50">
          <Icon name="heart" size={22} />
        </span>
        <span className="flex size-10 items-center justify-center rounded-full bg-tia-violet-500 text-tia-plum-50">
          <Icon name="tia-heart" size={20} />
        </span>
        <span className="flex size-10 items-center justify-center rounded-full border border-tia-plum-50/30 bg-tia-plum-900/45 text-tia-plum-50">
          <Icon name="close" size={20} />
        </span>
      </div>
    </div>
  )
}
