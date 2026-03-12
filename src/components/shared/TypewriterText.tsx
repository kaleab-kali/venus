import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

export function TypewriterText({
  text,
  speed = 50,
  className = "",
  onComplete,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("")
  const [started, setStarted] = useState(false)

  return (
    <motion.div
      className={className}
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, margin: "-50px" }}
    >
      <TypewriterInner
        text={text}
        speed={speed}
        started={started}
        displayed={displayed}
        setDisplayed={setDisplayed}
        onComplete={onComplete}
      />
    </motion.div>
  )
}

function TypewriterInner({
  text,
  speed,
  started,
  displayed,
  setDisplayed,
  onComplete,
}: {
  text: string
  speed: number
  started: boolean
  displayed: string
  setDisplayed: (s: string) => void
  onComplete?: () => void
}) {
  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) {
      onComplete?.()
      return
    }
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(timer)
  }, [started, displayed, text, speed, onComplete, setDisplayed])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-pulse text-venus-gold">|</span>
      )}
    </span>
  )
}
