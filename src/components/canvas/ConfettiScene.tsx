import { useRef, useEffect, useState, memo, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense } from "react"
import { SCROLL_PHASES, getPhaseProgress, easeInOutCubic } from "@/lib/constants"
import { scrollStore } from "@/lib/scroll-store"
import * as THREE from "three"

const CONFETTI_COUNT = 600
const CONFETTI_COLORS = [
  new THREE.Color("#D4AF37"),
  new THREE.Color("#F5F1E8"),
  new THREE.Color("#C97B84"),
  new THREE.Color("#FFF8E7"),
  new THREE.Color("#E8D5B7"),
  new THREE.Color("#B8860B"),
]

const LINE1 = "a girl was named"
const LINE2 = "VENUS"
const CHAR_SPEED_MS = 70
const LINE2_CHAR_SPEED_MS = 120
const SCENE_BG = "#0a0a1a"

const Confetti = memo(() => {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const color = useMemo(() => new THREE.Color(), [])

  const data = useMemo(() => {
    const pos = new Float32Array(CONFETTI_COUNT * 3)
    const vel = new Float32Array(CONFETTI_COUNT * 3)
    const rot = new Float32Array(CONFETTI_COUNT * 3)
    const rSpd = new Float32Array(CONFETTI_COUNT * 3)
    const scl = new Float32Array(CONFETTI_COUNT)
    const cIdx = new Uint8Array(CONFETTI_COUNT)
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = Math.random() * 15 + 5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      vel[i * 3] = (Math.random() - 0.5) * 0.3
      vel[i * 3 + 1] = -(Math.random() * 0.8 + 0.3)
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.2
      rot[i * 3] = Math.random() * Math.PI * 2
      rot[i * 3 + 1] = Math.random() * Math.PI * 2
      rot[i * 3 + 2] = Math.random() * Math.PI * 2
      rSpd[i * 3] = (Math.random() - 0.5) * 2
      rSpd[i * 3 + 1] = (Math.random() - 0.5) * 2
      rSpd[i * 3 + 2] = (Math.random() - 0.5) * 2
      scl[i] = Math.random() * 0.08 + 0.03
      cIdx[i] = Math.floor(Math.random() * CONFETTI_COLORS.length)
    }
    return { pos, vel, rot, rSpd, scl, cIdx }
  }, [])

  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      color.copy(CONFETTI_COLORS[data.cIdx[i]])
      mesh.setColorAt(i, color)
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [data, color])

  useFrame((_, delta) => {
    const mesh = meshRef.current
    if (!mesh) return
    const dt = Math.min(delta, 0.05)
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      data.pos[i * 3] += data.vel[i * 3] * dt
      data.pos[i * 3 + 1] += data.vel[i * 3 + 1] * dt
      data.pos[i * 3 + 2] += data.vel[i * 3 + 2] * dt
      data.vel[i * 3] += Math.sin(data.pos[i * 3 + 1] * 0.5) * 0.01 * dt
      data.vel[i * 3 + 2] += Math.cos(data.pos[i * 3 + 1] * 0.3) * 0.01 * dt
      data.rot[i * 3] += data.rSpd[i * 3] * dt
      data.rot[i * 3 + 1] += data.rSpd[i * 3 + 1] * dt
      data.rot[i * 3 + 2] += data.rSpd[i * 3 + 2] * dt
      if (data.pos[i * 3 + 1] < -5) {
        data.pos[i * 3] = (Math.random() - 0.5) * 20
        data.pos[i * 3 + 1] = Math.random() * 5 + 8
        data.pos[i * 3 + 2] = (Math.random() - 0.5) * 10
        data.vel[i * 3 + 1] = -(Math.random() * 0.8 + 0.3)
      }
      const s = data.scl[i]
      dummy.position.set(data.pos[i * 3], data.pos[i * 3 + 1], data.pos[i * 3 + 2])
      dummy.rotation.set(data.rot[i * 3], data.rot[i * 3 + 1], data.rot[i * 3 + 2])
      dummy.scale.set(s, s * 0.6, s * 0.02)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, CONFETTI_COUNT]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial side={THREE.DoubleSide} transparent opacity={0.9} />
    </instancedMesh>
  )
}, () => true)
Confetti.displayName = "Confetti"

const Stars = memo(() => {
  const pointsRef = useRef<THREE.Points>(null)
  const starPositions = useMemo(() => {
    const pos = new Float32Array(400 * 3)
    for (let i = 0; i < 400; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25
      pos[i * 3 + 2] = -10 - Math.random() * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    const points = pointsRef.current
    if (!points) return
    const mat = points.material as THREE.PointsMaterial
    mat.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#FFF8E7" size={0.08} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}, () => true)
Stars.displayName = "Stars"

const ConfettiSceneInner = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [line1Text, setLine1Text] = useState("")
  const [line2Text, setLine2Text] = useState("")
  const line1Started = useRef(false)
  const line2Started = useRef(false)
  const line1Timer = useRef<number | null>(null)
  const line2Timer = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
    return () => {
      if (line1Timer.current) globalThis.clearInterval(line1Timer.current)
      if (line2Timer.current) globalThis.clearInterval(line2Timer.current)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    let rafId: number

    const update = () => {
      const container = containerRef.current
      const textEl = textRef.current
      if (!container) {
        rafId = requestAnimationFrame(update)
        return
      }

      const p = scrollStore.progress
      const phaseStart = SCROLL_PHASES.confettiCelebration[0]

      if (p < phaseStart) {
        container.style.opacity = "0"
        container.style.pointerEvents = "none"
        if (line1Started.current) {
          line1Started.current = false
          line2Started.current = false
          setLine1Text("")
          setLine2Text("")
          if (line1Timer.current) globalThis.clearInterval(line1Timer.current)
          if (line2Timer.current) globalThis.clearInterval(line2Timer.current)
        }
      } else {
        container.style.opacity = "1"
        container.style.pointerEvents = "none"

        const t = getPhaseProgress(p, SCROLL_PHASES.confettiCelebration)
        const eased = easeInOutCubic(Math.max(0, Math.min(1, t)))

        if (eased > 0.15 && !line1Started.current) {
          line1Started.current = true
          let i = 0
          line1Timer.current = globalThis.setInterval(() => {
            if (i < LINE1.length) {
              setLine1Text(LINE1.slice(0, i + 1))
              i++
            } else {
              if (line1Timer.current) globalThis.clearInterval(line1Timer.current)
            }
          }, CHAR_SPEED_MS)
        }

        if (eased > 0.35 && !line2Started.current) {
          line2Started.current = true
          let i = 0
          line2Timer.current = globalThis.setInterval(() => {
            if (i < LINE2.length) {
              setLine2Text(LINE2.slice(0, i + 1))
              i++
            } else {
              if (line2Timer.current) globalThis.clearInterval(line2Timer.current)
            }
          }, LINE2_CHAR_SPEED_MS)
        }

        if (textEl) {
          const textFade = eased > 0.85 ? Math.max(0, 1 - (eased - 0.85) / 0.15) : 1
          textEl.style.opacity = String(textFade)
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
        zIndex: 16,
        opacity: 0,
        pointerEvents: "none",
        background: SCENE_BG,
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
        camera={{ fov: 60, near: 0.1, far: 100, position: [0, 2, 6] }}
        style={{ background: SCENE_BG }}
      >
        <Suspense fallback={null}>
          <Stars />
          <Confetti />
        </Suspense>
      </Canvas>

      <div ref={textRef} style={{ position: "absolute", bottom: "8vh", left: "5vw", pointerEvents: "none" }}>
        {line1Text.length > 0 && (
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "clamp(14px, 2.5vw, 22px)",
            color: "rgba(245, 241, 232, 0.6)",
            fontStyle: "italic",
            letterSpacing: "0.08em",
            lineHeight: 1.8,
            margin: 0,
          }}>
            {line1Text}
            {line1Text.length < LINE1.length && (
              <span className="animate-pulse" style={{ color: "rgba(212, 175, 55, 0.6)", marginLeft: "2px" }}>|</span>
            )}
          </p>
        )}
        {line2Text.length > 0 && (
          <p style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(32px, 6vw, 60px)",
            fontWeight: 700,
            color: "#D4AF37",
            letterSpacing: "0.3em",
            margin: "4px 0 0 0",
            textShadow: "0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.15)",
          }}>
            {line2Text}
            {line2Text.length < LINE2.length && (
              <span className="animate-pulse" style={{ color: "rgba(212, 175, 55, 0.6)", marginLeft: "2px" }}>|</span>
            )}
          </p>
        )}
      </div>
    </div>
  )
}

export const ConfettiScene = memo(ConfettiSceneInner, () => true)
ConfettiScene.displayName = "ConfettiScene"
