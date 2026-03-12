import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { STARFIELD } from "@/lib/constants"

export function Starfield() {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(STARFIELD.count * 3)
    for (let i = 0; i < STARFIELD.count; i++) {
      // Uniform sphere sampling (avoids pole clustering)
      const phi = Math.random() * Math.PI * 2
      const cosTheta = Math.random() * 2 - 1
      const theta = Math.acos(cosTheta)
      const r = STARFIELD.radius * (0.5 + Math.random() * 0.5) // Vary distance

      arr[i * 3] = r * Math.sin(theta) * Math.cos(phi)
      arr[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi)
      arr[i * 3 + 2] = r * Math.cos(theta)
    }
    return arr
  }, [])

  // Subtle twinkle
  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const material = pointsRef.current.material as THREE.PointsMaterial
    material.opacity = 0.8 + Math.sin(clock.elapsedTime * 0.3) * 0.15
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.2}
        sizeAttenuation
        color="#ffffff"
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  )
}
