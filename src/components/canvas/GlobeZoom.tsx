import { useRef, useEffect, useCallback, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { scrollStore } from "@/lib/scroll-store"
import { SCROLL_PHASES, getPhaseProgress, easeInOutCubic } from "@/lib/constants"

const ESRI_SATELLITE_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    satellite: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution:
        "Esri, Maxar, Earthstar Geographics, and the GIS User Community",
    },
  },
  layers: [{ id: "satellite", type: "raster", source: "satellite" }],
}

// Addis Ababa coordinates
const ADDIS_ABABA = { lng: 38.7578, lat: 9.0192 } as const

// Zoom keyframes: each step is { center, zoom, pitch, bearing }
const ZOOM_KEYFRAMES_DESKTOP = [
  { center: [38.0, 15.0], zoom: 2.5, pitch: 0, bearing: 0 },
  { center: [38.0, 10.0], zoom: 4.0, pitch: 20, bearing: 10 },
  { center: [38.5, 9.5], zoom: 6.5, pitch: 35, bearing: 15 },
  { center: [ADDIS_ABABA.lng, ADDIS_ABABA.lat], zoom: 10, pitch: 50, bearing: 20 },
  { center: [ADDIS_ABABA.lng, ADDIS_ABABA.lat], zoom: 14, pitch: 60, bearing: 30 },
] as const

const ZOOM_KEYFRAMES_MOBILE = [
  { center: [38.0, 15.0], zoom: 1.5, pitch: 0, bearing: 0 },
  { center: [38.0, 10.0], zoom: 3.0, pitch: 15, bearing: 5 },
  { center: [38.5, 9.5], zoom: 5.5, pitch: 25, bearing: 10 },
  { center: [ADDIS_ABABA.lng, ADDIS_ABABA.lat], zoom: 9, pitch: 40, bearing: 15 },
  { center: [ADDIS_ABABA.lng, ADDIS_ABABA.lat], zoom: 12, pitch: 50, bearing: 20 },
] as const

const MOBILE_BREAKPOINT = 768

type KeyframeSet = readonly { readonly center: readonly [number, number]; readonly zoom: number; readonly pitch: number; readonly bearing: number }[]

const interpolateKeyframes = (t: number, keyframes: KeyframeSet) => {
  const totalFrames = keyframes.length - 1
  const rawIdx = t * totalFrames
  const idx = Math.min(Math.floor(rawIdx), totalFrames - 1)
  const frac = rawIdx - idx

  const a = keyframes[idx]
  const b = keyframes[idx + 1]

  return {
    center: [
      a.center[0] + (b.center[0] - a.center[0]) * frac,
      a.center[1] + (b.center[1] - a.center[1]) * frac,
    ] as [number, number],
    zoom: a.zoom + (b.zoom - a.zoom) * frac,
    pitch: a.pitch + (b.pitch - a.pitch) * frac,
    bearing: a.bearing + (b.bearing - a.bearing) * frac,
  }
}

export function GlobeZoom() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const keyframesRef = useRef(
    globalThis.innerWidth < MOBILE_BREAKPOINT ? ZOOM_KEYFRAMES_MOBILE : ZOOM_KEYFRAMES_DESKTOP
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize MapLibre
  useEffect(() => {
    if (!mounted || !containerRef.current) return
    if (mapRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: ESRI_SATELLITE_STYLE,
      center: [20, 10],
      zoom: 1.5,
      projection: { type: "globe" },
      interactive: false,
      attributionControl: false,
      fadeDuration: 0,
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [mounted])

  // Scroll-driven animation loop
  useEffect(() => {
    if (!mounted) return
    let rafId: number

    const update = () => {
      const p = scrollStore.progress
      const map = mapRef.current
      const wrapper = wrapperRef.current

      if (!wrapper) {
        rafId = requestAnimationFrame(update)
        return
      }

      // Globe is visible during africaZoom phase
      const globeStart = SCROLL_PHASES.africaZoom[0]
      const globeEnd = SCROLL_PHASES.confettiCelebration[0]

      // Fade in slightly before africaZoom starts, fade out at confetti
      const fadeInStart = globeStart - 0.03
      const fadeOutEnd = globeEnd + 0.05

      if (p < fadeInStart || p > fadeOutEnd) {
        wrapper.style.opacity = "0"
        wrapper.style.pointerEvents = "none"
        wrapper.style.display = "none"
      } else if (p < globeStart) {
        // Fading in
        const fadeT = (p - fadeInStart) / 0.03
        wrapper.style.display = "block"
        wrapper.style.opacity = String(Math.min(1, fadeT))
        wrapper.style.pointerEvents = "none"
      } else if (p > globeEnd) {
        // Fading out
        const fadeT = 1 - (p - globeEnd) / 0.05
        wrapper.style.display = "block"
        wrapper.style.opacity = String(Math.max(0, fadeT))
        wrapper.style.pointerEvents = "none"
      } else {
        wrapper.style.display = "block"
        wrapper.style.opacity = "1"
        wrapper.style.pointerEvents = "none"
      }

      // Update map camera based on scroll progress through africaZoom phase
      if (map && p >= fadeInStart && p <= fadeOutEnd) {
        const zoomProgress = getPhaseProgress(p, [globeStart, globeEnd])
        const easedT = easeInOutCubic(Math.max(0, Math.min(1, zoomProgress)))
        const kf = interpolateKeyframes(easedT, keyframesRef.current)

        map.jumpTo({
          center: kf.center,
          zoom: kf.zoom,
          pitch: kf.pitch,
          bearing: kf.bearing,
        })
      }

      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [mounted])

  if (!mounted) return null

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 15,
        opacity: 0,
        display: "none",
        pointerEvents: "none",
      }}
    >
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
