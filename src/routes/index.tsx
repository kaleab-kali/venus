import { createFileRoute } from "@tanstack/react-router"
import { useState, useCallback, useEffect } from "react"
import { ScrollProvider } from "@/components/providers/ScrollProvider"
import { CinematicCanvas } from "@/components/canvas/CinematicCanvas"
import { LandingFlash } from "@/components/canvas/LandingFlash"
import { GlobeZoom } from "@/components/canvas/GlobeZoom"
import { LibraryScene } from "@/components/canvas/LibraryScene"
import { MovieIntro } from "@/components/canvas/MovieIntro"
import { HeroSection } from "@/components/sections/HeroSection"
import { MeaningSection } from "@/components/sections/MeaningSection"
import { DostoevskyRoom } from "@/components/sections/DostoevskyRoom"
import { GardenSection } from "@/components/sections/GardenSection"
import { TimelineSection } from "@/components/sections/TimelineSection"
import { LetterSection } from "@/components/sections/LetterSection"
import { PoetrySection } from "@/components/sections/PoetrySection"
import { GiftBoxesSection } from "@/components/sections/GiftBoxesSection"
import { FinalSceneSection } from "@/components/sections/FinalSceneSection"

export const Route = createFileRoute("/")({ component: App })

function App() {
  const [introComplete, setIntroComplete] = useState(false)

  // Always reset scroll to top on mount/refresh
  useEffect(() => {
    window.history.scrollRestoration = "manual"
    window.scrollTo(0, 0)
  }, [])

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  return (
    <>
      {/* Movie intro overlay */}
      {!introComplete && <MovieIntro onComplete={handleIntroComplete} />}

      {/* Fixed 3D Canvas */}
      <CinematicCanvas />

      {/* MapLibre satellite globe zoom (Africa -> Ethiopia -> Addis Ababa) */}
      <GlobeZoom />

      {/* Library landing scene (Addis Ababa) */}
      <LibraryScene />

      {/* Landing flash overlay */}
      <LandingFlash />

      {/* Scroll hint after intro */}
      {introComplete && <ScrollHint />}

      {/* Scroll-driven content */}
      <ScrollProvider>
        {/* 2D Sections (appear after the scroll spacer) */}
        <HeroSection />
        <MeaningSection />
        <DostoevskyRoom />
        <GardenSection />
        <TimelineSection />
        <LetterSection />
        <PoetrySection />
        <GiftBoxesSection />
        <FinalSceneSection />
      </ScrollProvider>
    </>
  )
}

function ScrollHint() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) setVisible(false)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-8 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse"
      style={{ pointerEvents: "none" }}
    >
      <span className="font-[EB_Garamond] text-sm tracking-[0.2em] text-venus-paper/60 uppercase">
        scroll to begin
      </span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-venus-gold/60"
      >
        <path
          d="M12 4v16m0 0l-6-6m6 6l6-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
