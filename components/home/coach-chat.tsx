import { WHY_TIA } from '@/content/site'

const REPLY_DELAY = 1.2

export function CoachChat() {
  const { question, coachName, answer } = WHY_TIA.coachChat

  return (
    <div aria-hidden="true" className="absolute inset-x-6 top-6 z-3 flex flex-col gap-2">
      <p className="max-w-[88%] origin-bottom-left animate-tia-message self-end rounded-[18px] rounded-br-[6px] bg-tia-coral-600 px-3.5 py-2.5 text-[13px]/[18px] text-tia-plum-50">
        {question}
      </p>
      <p
        className="max-w-[88%] origin-bottom-left animate-tia-message rounded-[18px] rounded-bl-[6px] bg-tia-plum-50 px-3.5 py-2.5 text-[13px]/[18px] text-tia-plum-800"
        style={{ animationDelay: `${REPLY_DELAY}s` }}
      >
        <b className="mb-0.5 block text-[11px] text-tia-coral-600">{coachName}</b>
        {answer}
      </p>
    </div>
  )
}
