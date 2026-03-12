import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import {
  BEZIER_POINTS,
  SCROLL_PHASES,
  getPhaseProgress,
  easeInOutCubic,
  COLORS,
} from "@/lib/constants"
import { cubicBezierFromTuples } from "@/lib/bezier"
import { scrollStore } from "@/lib/scroll-store"

const TRAIL_COUNT = 200

// Create a soft circle texture for round particles
function createCircleTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext("2d")!
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  gradient.addColorStop(0, "rgba(255,255,255,1)")
  gradient.addColorStop(0.3, "rgba(255,255,255,0.8)")
  gradient.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 32, 32)
  const tex = new THREE.CanvasTexture(canvas)
  return tex
}

export function ShootingStar() {
  const starRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const trailRef = useRef<THREE.Points>(null)
  const trailPositions = useRef(new Float32Array(TRAIL_COUNT * 3))

  const trailMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 1.2,
        color: new THREE.Color(COLORS.venusGold),
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        map: createCircleTexture(),
      }),
    [],
  )

  useFrame(() => {
    const p = scrollStore.progress

    // Star is active during birth (0.35-0.45) and travel (0.45-0.70)
    const birthStart = SCROLL_PHASES.shootingStarBirth[0]
    const travelEnd = SCROLL_PHASES.earthApproach[1]
    const isActive = p >= birthStart && p <= travelEnd

    if (starRef.current) starRef.current.visible = isActive
    if (lightRef.current) lightRef.current.visible = isActive
    if (trailRef.current) trailRef.current.visible = isActive

    if (!isActive) return

    // Compute Bezier t from combined birth + travel progress
    let bezierT = 0
    if (p <= SCROLL_PHASES.shootingStarBirth[1]) {
      // During birth: star is at Venus, slowly starts moving
      bezierT = getPhaseProgress(p, SCROLL_PHASES.shootingStarBirth) * 0.05
    } else if (p <= SCROLL_PHASES.interplanetaryTravel[1]) {
      // During travel: star moves along full Bezier
      bezierT =
        0.05 +
        easeInOutCubic(
          getPhaseProgress(p, SCROLL_PHASES.interplanetaryTravel),
        ) *
          0.9
    } else {
      // During earth approach: star arrives
      bezierT =
        0.95 +
        getPhaseProgress(p, SCROLL_PHASES.earthApproach) * 0.05
    }

    const pos = cubicBezierFromTuples(
      Math.min(bezierT, 1),
      BEZIER_POINTS.P0,
      BEZIER_POINTS.P1,
      BEZIER_POINTS.P2,
      BEZIER_POINTS.P3,
    )

    if (starRef.current) {
      starRef.current.position.copy(pos)
    }
    if (lightRef.current) {
      lightRef.current.position.copy(pos)
      // Attenuation: brighter during travel
      lightRef.current.intensity = p <= SCROLL_PHASES.shootingStarBirth[1] ? 2 : 5
    }

    // Update trail: shift all positions back, insert current at front
    const tp = trailPositions.current
    for (let i = TRAIL_COUNT - 1; i > 0; i--) {
      tp[i * 3] = tp[(i - 1) * 3]
      tp[i * 3 + 1] = tp[(i - 1) * 3 + 1]
      tp[i * 3 + 2] = tp[(i - 1) * 3 + 2]
    }
    tp[0] = pos.x
    tp[1] = pos.y
    tp[2] = pos.z

    if (trailRef.current) {
      const geo = trailRef.current.geometry
      geo.attributes.position.needsUpdate = true
    }
  })

  return (
    <>
      {/* Star mesh */}
      <mesh ref={starRef} visible={false}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#fffbe6" toneMapped={false} />
      </mesh>

      {/* Point light on star */}
      <pointLight
        ref={lightRef}
        color={COLORS.venusGold}
        intensity={5}
        distance={50}
        decay={2}
        visible={false}
      />

      {/* Particle trail */}
      <points ref={trailRef} visible={false} material={trailMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[trailPositions.current, 3]}
          />
        </bufferGeometry>
      </points>
    </>
  )
}
