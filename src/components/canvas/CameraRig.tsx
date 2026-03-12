import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useRef } from "react"
import { scrollStore } from "@/lib/scroll-store"
import {
  CAMERA,
  SCROLL_PHASES,
  easeInOutCubic,
  getPhaseProgress,
  POSITIONS,
  BEZIER_POINTS,
  LIBRARY,
} from "@/lib/constants"
import { cubicBezierFromTuples } from "@/lib/bezier"

const _startPos = new THREE.Vector3(...CAMERA.startPos)
const _venusRevealPos = new THREE.Vector3(...CAMERA.venusRevealPos)
const _orbitPos = new THREE.Vector3(...CAMERA.orbitPos)
const _venusPos = new THREE.Vector3(...POSITIONS.venus)
const _earthPos = new THREE.Vector3(...POSITIONS.earth)
const _libraryPos = new THREE.Vector3(...LIBRARY.position)
const _tempPos = new THREE.Vector3()
const _tempLookAt = new THREE.Vector3()

// Ethiopia surface point: camera approaches from +Z toward Earth center
// The Earth rotates to show Ethiopia, so the camera just needs to go straight at it
// Slight offset for latitude (Ethiopia ~9N = slightly above equator)
const _ethiopiaSurface = _earthPos.clone().add(new THREE.Vector3(0, 0.9, 7.5))

export function CameraRig() {
  const { camera } = useThree()
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    const p = scrollStore.progress

    // Phase 1: Space intro (0 - 0.10)
    if (p <= SCROLL_PHASES.spaceIntro[1]) {
      const t = easeInOutCubic(getPhaseProgress(p, SCROLL_PHASES.spaceIntro))
      _tempPos.lerpVectors(_startPos, _venusRevealPos, t * 0.2)
      _tempLookAt.set(0, 0, -10)
    }
    // Phase 2: Venus reveal (0.10 - 0.25)
    else if (p <= SCROLL_PHASES.venusReveal[1]) {
      const t = easeInOutCubic(
        getPhaseProgress(p, SCROLL_PHASES.venusReveal),
      )
      _tempPos.lerpVectors(_startPos, _venusRevealPos, 0.2 + t * 0.8)
      _tempLookAt.lerpVectors(new THREE.Vector3(0, 0, -10), _venusPos, t)
    }
    // Phase 3: Shooting star birth (0.25 - 0.32)
    else if (p <= SCROLL_PHASES.shootingStarBirth[1]) {
      const t = easeInOutCubic(
        getPhaseProgress(p, SCROLL_PHASES.shootingStarBirth),
      )
      _tempPos.lerpVectors(_venusRevealPos, _orbitPos, t)
      _tempLookAt.copy(_venusPos)
    }
    // Phase 4: Interplanetary travel (0.32 - 0.50)
    else if (p <= SCROLL_PHASES.interplanetaryTravel[1]) {
      const t = easeInOutCubic(
        getPhaseProgress(p, SCROLL_PHASES.interplanetaryTravel),
      )
      const starPos = cubicBezierFromTuples(
        t,
        BEZIER_POINTS.P0,
        BEZIER_POINTS.P1,
        BEZIER_POINTS.P2,
        BEZIER_POINTS.P3,
      )
      _tempPos.copy(starPos).add(new THREE.Vector3(5, 4, 15))
      const lookAheadT = Math.min(1, t + 0.1)
      const lookAhead = cubicBezierFromTuples(
        lookAheadT,
        BEZIER_POINTS.P0,
        BEZIER_POINTS.P1,
        BEZIER_POINTS.P2,
        BEZIER_POINTS.P3,
      )
      _tempLookAt.copy(lookAhead)
    }
    // Phase 5: Earth approach (0.50 - 0.62) - approach and see full Earth with Africa
    else if (p <= SCROLL_PHASES.earthApproach[1]) {
      const t = easeInOutCubic(
        getPhaseProgress(p, SCROLL_PHASES.earthApproach),
      )
      const travelEndPos = cubicBezierFromTuples(
        1,
        BEZIER_POINTS.P0,
        BEZIER_POINTS.P1,
        BEZIER_POINTS.P2,
        BEZIER_POINTS.P3,
      )
      const startCam = travelEndPos.clone().add(new THREE.Vector3(5, 4, 15))
      // End position: directly in front of Earth, centered
      const earthFrontPos = _earthPos.clone().add(new THREE.Vector3(0, 1, 18))
      _tempPos.lerpVectors(startCam, earthFrontPos, t)
      _tempLookAt.lerpVectors(travelEndPos, _earthPos, t)
    }
    // Phase 6: Africa zoom (0.62 - 0.75) - dive into Ethiopia/Addis Ababa
    else if (p <= SCROLL_PHASES.africaZoom[1]) {
      const t = easeInOutCubic(
        getPhaseProgress(p, SCROLL_PHASES.africaZoom),
      )
      // Start: in front of Earth
      const earthFrontPos = _earthPos.clone().add(new THREE.Vector3(0, 1, 18))
      // End: very close to Ethiopia on the surface
      const closeToEthiopia = _ethiopiaSurface.clone().add(new THREE.Vector3(0, 0.5, 1.5))

      _tempPos.lerpVectors(earthFrontPos, closeToEthiopia, t)
      // Look at gradually shifts to the Ethiopia point
      _tempLookAt.lerpVectors(_earthPos, _ethiopiaSurface, t)
    }
    // Phase 7: Library landing (0.75 - 0.93) - descend through atmosphere into library
    else if (p <= SCROLL_PHASES.libraryLanding[1]) {
      const t = easeInOutCubic(
        getPhaseProgress(p, SCROLL_PHASES.libraryLanding),
      )
      const closeToEthiopia = _ethiopiaSurface.clone().add(new THREE.Vector3(0, 0.5, 1.5))
      // Library camera: inside, looking at the back wall of books
      const libCamPos = _libraryPos.clone().add(new THREE.Vector3(0, 0, 8))
      const libLookAt = _libraryPos.clone().add(new THREE.Vector3(0, -1, -6))

      _tempPos.lerpVectors(closeToEthiopia, libCamPos, t)
      _tempLookAt.lerpVectors(_ethiopiaSurface, libLookAt, t)
    }
    // Phase 8: Landing flash (0.93 - 1.00)
    else {
      const libCamPos = _libraryPos.clone().add(new THREE.Vector3(0, 0, 8))
      const libLookAt = _libraryPos.clone().add(new THREE.Vector3(0, -1, -6))
      _tempPos.copy(libCamPos)
      _tempLookAt.copy(libLookAt)
    }

    camera.position.lerp(_tempPos, 0.1)
    lookAtRef.current.lerp(_tempLookAt, 0.1)
    camera.lookAt(lookAtRef.current)
  })

  return null
}
