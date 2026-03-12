import { createFileRoute } from "@tanstack/react-router"
import { useState, useCallback, useEffect, useRef, memo } from "react"
import { ScrollProvider } from "@/components/providers/ScrollProvider"
import { CinematicCanvas } from "@/components/canvas/CinematicCanvas"
import { GlobeZoom } from "@/components/canvas/GlobeZoom"
import { MovieIntro } from "@/components/canvas/MovieIntro"
import { ConfettiScene } from "@/components/canvas/ConfettiScene"
import { VogueCover } from "@/components/VogueCover"
import { VenusAcronymSection } from "@/components/sections/VenusAcronymSection"
import { PoetryBook } from "@/components/sections/PoetryBook"
import { DostoevskyRoom } from "@/components/sections/DostoevskyRoom"
import { LetterSection } from "@/components/sections/LetterSection"
import { GiftBoxesSection } from "@/components/sections/GiftBoxesSection"
import { InteractiveGame } from "@/components/sections/InteractiveGame"
import { BirthdayWishes } from "@/components/sections/BirthdayWishes"
import { FinalSceneSection } from "@/components/sections/FinalSceneSection"
import { useLenisInstance } from "@/lib/lenis-context"
import { AUTO_SCROLL, SCROLL_SPACER_HEIGHT } from "@/lib/constants"
import { preloadAllAssets } from "@/lib/preload-assets"

export const Route = createFileRoute("/")({ component: App })

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const lenis = useLenisInstance()
  const autoScrollCancelled = useRef(false)

  useEffect(() => {
    globalThis.history.scrollRestoration = "manual"
    globalThis.scrollTo(0, 0)
    preloadAllAssets()
  }, [])

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  useEffect(() => {
    if (!introComplete || !lenis) return

    autoScrollCancelled.current = false

    const timer = globalThis.setTimeout(() => {
      if (autoScrollCancelled.current) return
      const spacerVh = parseInt(SCROLL_SPACER_HEIGHT, 10)
      const spacerPx = (spacerVh * globalThis.innerHeight) / 100
      lenis.scrollTo(spacerPx, {
        duration: AUTO_SCROLL.durationSeconds,
        easing: (t: number) => {
          if (t < 0.25) return t * 3
          return 0.75 + (t - 0.25) * (0.25 / 0.75)
        },
      })
    }, AUTO_SCROLL.delayMs)

    const cancelAutoScroll = () => {
      autoScrollCancelled.current = true
      lenis.stop()
      lenis.start()
    }

    globalThis.addEventListener("wheel", cancelAutoScroll, { once: true, passive: true })
    globalThis.addEventListener("touchstart", cancelAutoScroll, { once: true, passive: true })

    return () => {
      globalThis.clearTimeout(timer)
      globalThis.removeEventListener("wheel", cancelAutoScroll)
      globalThis.removeEventListener("touchstart", cancelAutoScroll)
    }
  }, [introComplete, lenis])

  return (
    <>
      {!introComplete && <MovieIntro onComplete={handleIntroComplete} />}

      <CinematicCanvas />
      <GlobeZoom />
      <ConfettiScene />

      {introComplete && <ScrollHint />}

      <ScrollProvider>
        <VenusAcronymSection />
        <VogueCover />
        <PoetryBook />
        <DostoevskyRoom />
        <LetterSection />
        <GiftBoxesSection />
        <InteractiveGame />
        <BirthdayWishes />
        <FinalSceneSection />
      </ScrollProvider>
    </>
  )
}

const ScrollHintInner = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      if (globalThis.scrollY > 50) setVisible(false)
    }
    globalThis.addEventListener("scroll", onScroll, { passive: true })
    return () => globalThis.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-6 left-1/2 z-[999] -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse"
      style={{ pointerEvents: "none" }}
    >
      <span className="rounded-full bg-venus-black/60 px-4 py-2 font-[EB_Garamond] text-sm tracking-[0.2em] text-venus-paper/80 uppercase backdrop-blur-sm md:text-base">
        scroll to begin
      </span>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-venus-gold">
        <path
          d="M12 4v16m0 0l-6-6m6 6l6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

const ScrollHint = memo(ScrollHintInner, () => true)
ScrollHint.displayName = "ScrollHint"
