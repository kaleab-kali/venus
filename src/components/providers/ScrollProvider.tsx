import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { scrollStore } from "@/lib/scroll-store"
import { SCROLL_SPACER_HEIGHT } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const spacerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!spacerRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: spacerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollStore.progress = self.progress
        scrollStore.cinematicComplete = self.progress >= 0.99
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <>
      {/* Scroll spacer for the cinematic 3D phase */}
      <div
        ref={spacerRef}
        style={{ height: SCROLL_SPACER_HEIGHT }}
        aria-hidden="true"
      />
      {/* 2D sections follow after the spacer */}
      {children}
    </>
  )
}
