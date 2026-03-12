import { useEffect, useRef } from "react"
import { scrollStore } from "@/lib/scroll-store"

export function LandingFlash() {
  const flashRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number

    function update() {
      if (flashRef.current) {
        const p = scrollStore.progress

        if (p < 0.93) {
          flashRef.current.style.opacity = "0"
          flashRef.current.style.pointerEvents = "none"
        } else if (p < 0.98) {
          // Flash in: 0.93 -> 0.98
          const flashIn = (p - 0.93) / 0.05
          flashRef.current.style.opacity = String(flashIn)
          flashRef.current.style.pointerEvents = "none"
        } else {
          // Flash out: 0.98 -> 1.0
          const flashOut = Math.max(0, 1 - (p - 0.98) / 0.02)
          flashRef.current.style.opacity = String(flashOut)
          flashRef.current.style.pointerEvents = "none"
        }
      }
      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div
      ref={flashRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 20,
        backgroundColor: "#ffffff",
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  )
}
