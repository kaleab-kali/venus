import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MovieIntroProps {
  onComplete: () => void
}

export function MovieIntro({ onComplete }: MovieIntroProps) {
  const [phase, setPhase] = useState<"dark" | "date" | "text" | "fadeout" | "done">("dark")

  useEffect(() => {
    // Dark pause
    const t1 = setTimeout(() => setPhase("date"), 1500)
    // Show date
    const t2 = setTimeout(() => setPhase("text"), 4500)
    // Show "a life was born"
    const t3 = setTimeout(() => setPhase("fadeout"), 7500)
    // Fade out
    const t4 = setTimeout(() => {
      setPhase("done")
      onComplete()
    }, 9500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onComplete])

  if (phase === "done") return null

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "fadeout" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "default",
          }}
        >
          {/* Date */}
          <AnimatePresence>
            {(phase === "date" || phase === "text" || phase === "fadeout") && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                style={{ textAlign: "center" }}
              >
                <TypewriterLine
                  text="March 13, 2002"
                  className="font-[Cinzel] text-2xl md:text-4xl tracking-[0.25em] text-venus-gold"
                  speed={80}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subtext */}
          <AnimatePresence>
            {(phase === "text" || phase === "fadeout") && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                style={{ textAlign: "center", marginTop: "2rem" }}
              >
                <TypewriterLine
                  text="a life was born"
                  className="font-[EB_Garamond] text-xl md:text-3xl tracking-[0.15em] text-venus-paper/70 italic"
                  speed={70}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip hint */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 3, duration: 1 }}
            onClick={() => {
              setPhase("done")
              onComplete()
            }}
            className="absolute bottom-8 font-[EB_Garamond] text-sm tracking-wider text-venus-paper/40 hover:text-venus-paper/60 transition-colors cursor-pointer"
          >
            click to skip
          </motion.button>
        </motion.div>
    </AnimatePresence>
  )
}

function TypewriterLine({
  text,
  className,
  speed = 60,
}: {
  text: string
  className: string
  speed?: number
}) {
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-pulse ml-0.5 text-venus-gold/60">|</span>
      )}
    </span>
  )
}
