import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { LIBRARY, SCROLL_PHASES, getPhaseProgress, COLORS } from "@/lib/constants"
import { scrollStore } from "@/lib/scroll-store"

const BOOK_COLORS = [
  "#8B0000", "#2F1B14", "#1B3F5F", "#4A2040", "#3B2F1A",
  "#5C1A1A", "#1A3A2A", "#2A1A4A", "#4A3B2A", "#1A2A4A",
  "#6B2F2F", "#2A4A3A", "#3A2A1A", "#1A1A3A", "#4A2A2A",
  "#2B1A0A", "#3C1F2F", "#1F3C2F", "#2F2F1F", "#4F2F1F",
] as const

const WARM_LIGHT_COLOR = "#FFE4B5"
const BLANKET_COLOR = "#F5E6D3"

// Generate book data once
function generateBooks() {
  const books: Array<{
    position: [number, number, number]
    rotation: [number, number, number]
    scale: [number, number, number]
    color: string
    delay: number
  }> = []

  // Back wall of books (bookshelf)
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 12; col++) {
      const x = (col - 5.5) * 1.1 + (Math.random() - 0.5) * 0.15
      const y = row * 2.2 - 3
      const z = -8 + (Math.random() - 0.5) * 0.3
      const height = 1.5 + Math.random() * 0.6
      const width = 0.6 + Math.random() * 0.3
      books.push({
        position: [x, y, z],
        rotation: [0, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.05],
        scale: [width, height, 0.8],
        color: BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)],
        delay: (row * 12 + col) * 0.02,
      })
    }
  }

  // Left wall books
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 6; col++) {
      const x = -7
      const y = row * 2.2 - 3
      const z = (col - 2.5) * 1.1 - 2
      books.push({
        position: [x, y, z],
        rotation: [0, Math.PI / 2 + (Math.random() - 0.5) * 0.1, 0],
        scale: [0.6 + Math.random() * 0.3, 1.5 + Math.random() * 0.6, 0.8],
        color: BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)],
        delay: 0.3 + (row * 6 + col) * 0.02,
      })
    }
  }

  // Right wall books
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 6; col++) {
      const x = 7
      const y = row * 2.2 - 3
      const z = (col - 2.5) * 1.1 - 2
      books.push({
        position: [x, y, z],
        rotation: [0, -Math.PI / 2 + (Math.random() - 0.5) * 0.1, 0],
        scale: [0.6 + Math.random() * 0.3, 1.5 + Math.random() * 0.6, 0.8],
        color: BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)],
        delay: 0.5 + (row * 6 + col) * 0.02,
      })
    }
  }

  // Floating books around center (the wrapping/covering effect)
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2
    const radius = 2.5 + Math.random() * 1.5
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius - 2
    const y = -3.5 + Math.random() * 2
    books.push({
      position: [x, y, z],
      rotation: [
        (Math.random() - 0.5) * 0.8,
        angle + Math.PI / 2,
        (Math.random() - 0.5) * 0.4,
      ],
      scale: [0.7, 1.6, 0.9],
      color: BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)],
      delay: 0.7 + i * 0.03,
    })
  }

  return books
}

export function LibraryScene() {
  const groupRef = useRef<THREE.Group>(null)
  const booksData = useMemo(generateBooks, [])

  useFrame(() => {
    if (!groupRef.current) return
    const p = scrollStore.progress

    const libStart = SCROLL_PHASES.libraryLanding[0]
    const libEnd = SCROLL_PHASES.landingFlash[0]

    if (p < libStart - 0.05) {
      groupRef.current.visible = false
      return
    }

    groupRef.current.visible = true
    const t = getPhaseProgress(p, [libStart, libEnd])

    // Fade in books progressively
    const children = groupRef.current.children
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as THREE.Mesh
      if (!child.material) continue
      const mat = child.material as THREE.MeshStandardMaterial
      if (!mat.transparent) continue

      const bookDelay = child.userData.delay ?? 0
      const bookProgress = Math.max(0, Math.min(1, (t - bookDelay) / 0.4))
      mat.opacity = bookProgress
      child.scale.setScalar(bookProgress)
    }
  })

  return (
    <group ref={groupRef} position={LIBRARY.position} visible={false}>
      {/* Warm ambient light for the library */}
      <pointLight
        color={WARM_LIGHT_COLOR}
        intensity={8}
        distance={30}
        decay={2}
        position={[0, 5, -2]}
      />
      <pointLight
        color={WARM_LIGHT_COLOR}
        intensity={4}
        distance={20}
        decay={2}
        position={[-4, 2, 0]}
      />
      <pointLight
        color={WARM_LIGHT_COLOR}
        intensity={4}
        distance={20}
        decay={2}
        position={[4, 2, 0]}
      />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, -2]}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#2A1A0A" roughness={0.9} metalness={0} />
      </mesh>

      {/* Books */}
      {booksData.map((book, i) => (
        <mesh
          key={i}
          position={book.position}
          rotation={book.rotation}
          userData={{ delay: book.delay }}
        >
          <boxGeometry args={book.scale} />
          <meshStandardMaterial
            color={book.color}
            roughness={0.8}
            metalness={0.05}
            transparent
            opacity={0}
          />
        </mesh>
      ))}

      {/* Baby blanket - soft draped shape at center bottom */}
      <BabyBlanket />

      {/* Gold text particle effect - like dust in a library */}
      <LibraryDust />
    </group>
  )
}

function BabyBlanket() {
  const meshRef = useRef<THREE.Mesh>(null)

  const blanketGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(3, 2.5, 20, 20)
    const posAttr = geo.attributes.position
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i)
      const y = posAttr.getY(i)
      // Gentle curve like a draped blanket
      const z = Math.sin(x * 0.8) * 0.3 + Math.sin(y * 1.2) * 0.2 + Math.cos(x * y * 0.5) * 0.15
      posAttr.setZ(i, z)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  useFrame(() => {
    if (!meshRef.current) return
    const p = scrollStore.progress
    const t = getPhaseProgress(p, SCROLL_PHASES.libraryLanding)
    const blanketT = Math.max(0, (t - 0.4) / 0.5)
    const mat = meshRef.current.material as THREE.MeshStandardMaterial
    mat.opacity = Math.min(1, blanketT)
  })

  return (
    <mesh
      ref={meshRef}
      geometry={blanketGeometry}
      position={[0, -3.8, -1]}
      rotation={[-Math.PI / 2.5, 0, 0]}
    >
      <meshStandardMaterial
        color={BLANKET_COLOR}
        roughness={0.95}
        metalness={0}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function LibraryDust() {
  const pointsRef = useRef<THREE.Points>(null)
  const DUST_COUNT = 100

  const positions = useMemo(() => {
    const arr = new Float32Array(DUST_COUNT * 3)
    for (let i = 0; i < DUST_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = Math.random() * 8 - 3
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const p = scrollStore.progress
    const t = getPhaseProgress(p, SCROLL_PHASES.libraryLanding)
    const mat = pointsRef.current.material as THREE.PointsMaterial
    mat.opacity = Math.min(0.4, t * 0.6)

    // Gentle float
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const time = clock.elapsedTime
    for (let i = 0; i < DUST_COUNT; i++) {
      const baseY = positions[i * 3 + 1]
      posAttr.setY(i, baseY + Math.sin(time * 0.5 + i) * 0.15)
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(positions), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={COLORS.venusGold}
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}
