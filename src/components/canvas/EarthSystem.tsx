import { useRef } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import * as THREE from "three"
import { POSITIONS, PLANET, SCROLL_PHASES, getPhaseProgress } from "@/lib/constants"
import { scrollStore } from "@/lib/scroll-store"

// Three.js SphereGeometry UV: u=0.5 maps to +Z face
// Standard equirectangular earth texture: center of image = 0deg longitude
// So 0deg longitude faces +Z. Ethiopia is at ~40deg E.
// To bring 40E to face +Z, rotate Y by +40deg (positive = counter-clockwise from top)
// But empirically the texture may be offset; we tune to ~1.4 rad to show Ethiopia/Horn of Africa
const ETHIOPIA_ROTATION_Y = 1.4

export function EarthSystem() {
  const groupRef = useRef<THREE.Group>(null)
  const earthRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)

  const earthTexture = useLoader(THREE.TextureLoader, "/textures/earth_daymap.jpg")
  const cloudsTexture = useLoader(THREE.TextureLoader, "/textures/earth_clouds.jpg")

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const p = scrollStore.progress

    if (p < SCROLL_PHASES.interplanetaryTravel[0]) {
      groupRef.current.visible = false
    } else {
      groupRef.current.visible = true
      let fadeIn: number
      if (p <= SCROLL_PHASES.interplanetaryTravel[1]) {
        fadeIn = getPhaseProgress(p, SCROLL_PHASES.interplanetaryTravel) * 0.5
      } else if (p <= SCROLL_PHASES.earthApproach[1]) {
        fadeIn = 0.5 + getPhaseProgress(p, SCROLL_PHASES.earthApproach) * 0.5
      } else {
        fadeIn = 1
      }
      const scale = Math.min(1, fadeIn * 1.3)
      groupRef.current.scale.setScalar(scale)
    }

    if (earthRef.current) {
      if (p >= SCROLL_PHASES.earthApproach[0]) {
        // Start locking rotation to show Ethiopia before zoom even begins
        const lockT = getPhaseProgress(p, SCROLL_PHASES.earthApproach)
        const baseRotation = clock.elapsedTime * 0.03
        earthRef.current.rotation.y = THREE.MathUtils.lerp(
          baseRotation,
          ETHIOPIA_ROTATION_Y,
          Math.min(1, lockT * 1.5),
        )
      } else {
        earthRef.current.rotation.y = clock.elapsedTime * 0.03
      }
    }
    if (cloudsRef.current) {
      if (p >= SCROLL_PHASES.earthApproach[0]) {
        const lockT = getPhaseProgress(p, SCROLL_PHASES.earthApproach)
        cloudsRef.current.rotation.y = THREE.MathUtils.lerp(
          clock.elapsedTime * 0.04,
          ETHIOPIA_ROTATION_Y + 0.05,
          Math.min(1, lockT * 1.5),
        )
      } else {
        cloudsRef.current.rotation.y = clock.elapsedTime * 0.04
      }
    }
  })

  return (
    <group ref={groupRef} position={POSITIONS.earth}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[PLANET.earthRadius, PLANET.segments, PLANET.segments]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      <mesh ref={cloudsRef}>
        <sphereGeometry args={[PLANET.earthRadius * 1.01, PLANET.segments, PLANET.segments]} />
        <meshStandardMaterial
          map={cloudsTexture}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[PLANET.earthRadius * 1.12, 32, 32]} />
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
