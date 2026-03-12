import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react"
import { CAMERA, COLORS } from "@/lib/constants"
import { SceneLighting } from "./SceneLighting"
import { Starfield } from "./Starfield"
import { CameraRig } from "./CameraRig"
import { VenusSystem } from "./VenusSystem"
import { ShootingStar } from "./ShootingStar"
import { EarthSystem } from "./EarthSystem"
import { scrollStore } from "@/lib/scroll-store"
import { SCROLL_PHASES } from "@/lib/constants"

export function CinematicCanvas() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    let rafId: number
    function update() {
      if (containerRef.current) {
        const p = scrollStore.progress
        const fadeStart = SCROLL_PHASES.africaZoom[0] - 0.02
        const fadeEnd = SCROLL_PHASES.africaZoom[0]

        if (p >= fadeEnd) {
          // R3F canvas hidden once MapLibre globe takes over
          containerRef.current.style.opacity = "0"
          containerRef.current.style.display = "none"
        } else if (p >= fadeStart) {
          // Crossfade out to MapLibre
          const fadeOut = 1 - (p - fadeStart) / (fadeEnd - fadeStart)
          containerRef.current.style.display = "block"
          containerRef.current.style.opacity = String(fadeOut)
        } else {
          containerRef.current.style.display = "block"
          containerRef.current.style.opacity = "1"
        }
      }
      rafId = requestAnimationFrame(update)
    }
    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [mounted])

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        camera={{
          fov: CAMERA.fov,
          near: CAMERA.near,
          far: CAMERA.far,
          position: CAMERA.startPos,
        }}
        style={{ background: COLORS.cosmicBlack }}
      >
        <Suspense fallback={null}>
          <SceneLighting />
          <Starfield />
          <CameraRig />
          <VenusSystem />
          <ShootingStar />
          <EarthSystem />
        </Suspense>
      </Canvas>
    </div>
  )
}
