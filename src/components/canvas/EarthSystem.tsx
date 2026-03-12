import { useRef } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import * as THREE from "three"
import { POSITIONS, PLANET, SCROLL_PHASES, getPhaseProgress } from "@/lib/constants"
import { scrollStore } from "@/lib/scroll-store"

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
      earthRef.current.rotation.y = clock.elapsedTime * 0.03
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = clock.elapsedTime * 0.04
    }
  })

  return (
    <group ref={groupRef} position={POSITIONS.earth}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[PLANET.earthRadius, PLANET.segments, PLANET.segments]} />
        <meshStandardMaterial map={earthTexture} roughness={0.7} metalness={0.1} />
      </mesh>

      <mesh ref={cloudsRef}>
        <sphereGeometry args={[PLANET.earthRadius * 1.01, PLANET.segments, PLANET.segments]} />
        <meshStandardMaterial map={cloudsTexture} transparent opacity={0.35} depthWrite={false} />
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
