import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState, memo, useCallback } from "react"
import * as THREE from "three"
import { CAMERA, COLORS, SCROLL_PHASES } from "@/lib/constants"
import { SceneLighting } from "./SceneLighting"
import { Starfield } from "./Starfield"
import { CameraRig } from "./CameraRig"
import { VenusSystem } from "./VenusSystem"
import { ShootingStar } from "./ShootingStar"
import { EarthSystem } from "./EarthSystem"
import { scrollStore } from "@/lib/scroll-store"

const computeFov = () => {
  const aspect = globalThis.innerWidth / globalThis.innerHeight
  if (aspect < 0.75) return CAMERA.fovMobile
  if (aspect < 1.0) return CAMERA.fovTablet
  return CAMERA.fov
}

const CinematicCanvasInner = () => {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const fovRef = useRef(computeFov())

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    let rafId: number

    const update = () => {
      if (containerRef.current) {
        const p = scrollStore.progress
        const fadeStart = SCROLL_PHASES.africaZoom[0] - 0.02
        const fadeEnd = SCROLL_PHASES.africaZoom[0]

        if (p >= fadeEnd) {
          containerRef.current.style.opacity = "0"
          containerRef.current.style.display = "none"
        } else if (p >= fadeStart) {
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

  const handleCreated = useCallback(({ camera }: { camera: THREE.Camera }) => {
    if (camera instanceof THREE.PerspectiveCamera) {
      const aspect = globalThis.innerWidth / globalThis.innerHeight
      camera.fov = aspect < 0.75 ? CAMERA.fovMobile : aspect < 1.0 ? CAMERA.fovTablet : CAMERA.fov
      camera.updateProjectionMatrix()
    }
  }, [])

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
          fov: fovRef.current,
          near: CAMERA.near,
          far: CAMERA.far,
          position: CAMERA.startPos,
        }}
        onCreated={handleCreated}
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

export const CinematicCanvas = memo(CinematicCanvasInner, () => true)
CinematicCanvas.displayName = "CinematicCanvas"
