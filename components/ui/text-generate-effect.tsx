"use client"

import { useEffect } from "react"
import { motion, stagger, useAnimate } from "framer-motion"
import { cn } from "@/lib/utils"

const WORD_STAGGER = 0.12

type TextGenerateEffectProps = {
  words: string
  className?: string
  filter?: boolean
  duration?: number
  delay?: number
}

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
  delay = 0,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate<HTMLSpanElement>()
  const wordList = words.split(" ")

  useEffect(() => {
    animate(
      "span",
      { opacity: 1, filter: filter ? "blur(0px)" : "none" },
      { duration, delay: stagger(WORD_STAGGER, { startDelay: delay }) }
    )
  }, [animate, words, filter, duration, delay])

  return (
    <span ref={scope} aria-label={words} className={cn("inline", className)}>
      {wordList.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="opacity-0"
          style={{ filter: filter ? "blur(10px)" : "none" }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </span>
  )
}
