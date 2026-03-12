import { useRef, useMemo } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"
import { POSITIONS, PLANET, COLORS, SCROLL_PHASES, getPhaseProgress } from "@/lib/constants"
import { createGlowMaterial } from "@/lib/fresnel-shader"
import { scrollStore } from "@/lib/scroll-store"

export function VenusSystem() {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  const venusTexture = useLoader(THREE.TextureLoader, "/textures/venus_surface.jpg")

  const glowMat = useMemo(
    () =>
      createGlowMaterial({
        color: COLORS.venusGold,
        fresnelPower: 2.0,
        opacity: 0.4,
      }),
    [],
  )

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const p = scrollStore.progress

    // Venus is invisible before reveal, fades in during 0.15-0.35
    if (p < SCROLL_PHASES.venusReveal[0]) {
      groupRef.current.visible = false
    } else {
      groupRef.current.visible = true
      const fadeIn = getPhaseProgress(p, SCROLL_PHASES.venusReveal)
      const scale = Math.min(1, fadeIn * 1.2)
      groupRef.current.scale.setScalar(scale)
    }

    // Slow rotation
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef} position={POSITIONS.venus}>
      <Float speed={0.3} floatIntensity={0.2} rotationIntensity={0.1}>
        {/* Main planet with real texture */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[PLANET.venusRadius, PLANET.segments, PLANET.segments]} />
          <meshStandardMaterial
            map={venusTexture}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        {/* Atmospheric glow shell */}
        <mesh material={glowMat}>
          <sphereGeometry
            args={[PLANET.venusRadius * 1.08, PLANET.segments, PLANET.segments]}
          />
        </mesh>
        {/* Outer golden haze */}
        <mesh>
          <sphereGeometry
            args={[PLANET.venusRadius * 1.2, 32, 32]}
          />
          <meshBasicMaterial
            color={COLORS.venusGold}
            transparent
            opacity={0.08}
            side={THREE.BackSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Float>
    </group>
  )
}
