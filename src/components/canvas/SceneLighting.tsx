import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import { useLoader } from "@react-three/fiber"
import * as THREE from "three"
import { COLORS, LIGHTING } from "@/lib/constants"

export function SceneLighting() {
  const { scene } = useThree()
  const starsTexture = useLoader(THREE.TextureLoader, "/textures/stars_milkyway.jpg")

  useEffect(() => {
    scene.fog = new THREE.FogExp2(COLORS.cosmicBlack, 0.003)
    starsTexture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = starsTexture
  }, [scene, starsTexture])

  return (
    <>
      <directionalLight
        position={LIGHTING.directionalPos}
        intensity={LIGHTING.directionalIntensity}
      />
      <ambientLight intensity={0.4} />
    </>
  )
}
