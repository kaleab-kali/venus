import { useEffect, useRef, useState, memo } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { LenisContext } from "@/lib/lenis-context"

gsap.registerPlugin(ScrollTrigger)

const LenisProviderInner = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const rafCallbackRef = useRef<((time: number) => void) | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    instance.on("scroll", ScrollTrigger.update)

    const rafCallback = (time: number) => {
      instance.raf(time * 1000)
    }
    rafCallbackRef.current = rafCallback
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    setLenis(instance)

    return () => {
      instance.off("scroll", ScrollTrigger.update)
      if (rafCallbackRef.current) {
        gsap.ticker.remove(rafCallbackRef.current)
      }
      instance.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}

export const LenisProvider = memo(LenisProviderInner, () => true)
LenisProvider.displayName = "LenisProvider"
