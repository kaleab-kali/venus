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
} from "@/lib/constants"
import { cubicBezierFromTuples } from "@/lib/bezier"

const _startPos = new THREE.Vector3(...CAMERA.startPos)
const _venusRevealPos = new THREE.Vector3(...CAMERA.venusRevealPos)
const _orbitPos = new THREE.Vector3(...CAMERA.orbitPos)
const _venusPos = new THREE.Vector3(...POSITIONS.venus)
const _earthPos = new THREE.Vector3(...POSITIONS.earth)
const _tempPos = new THREE.Vector3()
const _tempLookAt = new THREE.Vector3()

export function CameraRig() {
  const { camera } = useThree()
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    const p = scrollStore.progress

    if (p <= SCROLL_PHASES.spaceIntro[1]) {
      const t = easeInOutCubic(getPhaseProgress(p, SCROLL_PHASES.spaceIntro))
      _tempPos.lerpVectors(_startPos, _venusRevealPos, t * 0.2)
      _tempLookAt.set(0, 0, -10)
    } else if (p <= SCROLL_PHASES.venusReveal[1]) {
      const t = easeInOutCubic(getPhaseProgress(p, SCROLL_PHASES.venusReveal))
      _tempPos.lerpVectors(_startPos, _venusRevealPos, 0.2 + t * 0.8)
      _tempLookAt.lerpVectors(new THREE.Vector3(0, 0, -10), _venusPos, t)
    } else if (p <= SCROLL_PHASES.shootingStarBirth[1]) {
      const t = easeInOutCubic(getPhaseProgress(p, SCROLL_PHASES.shootingStarBirth))
      _tempPos.lerpVectors(_venusRevealPos, _orbitPos, t)
      _tempLookAt.copy(_venusPos)
    } else if (p <= SCROLL_PHASES.interplanetaryTravel[1]) {
      const t = easeInOutCubic(getPhaseProgress(p, SCROLL_PHASES.interplanetaryTravel))
      const starPos = cubicBezierFromTuples(t, BEZIER_POINTS.P0, BEZIER_POINTS.P1, BEZIER_POINTS.P2, BEZIER_POINTS.P3)
      _tempPos.copy(starPos).add(new THREE.Vector3(5, 4, 15))
      const lookAheadT = Math.min(1, t + 0.1)
      const lookAhead = cubicBezierFromTuples(lookAheadT, BEZIER_POINTS.P0, BEZIER_POINTS.P1, BEZIER_POINTS.P2, BEZIER_POINTS.P3)
      _tempLookAt.copy(lookAhead)
    } else {
      const t = easeInOutCubic(getPhaseProgress(p, SCROLL_PHASES.earthApproach))
      const travelEndPos = cubicBezierFromTuples(1, BEZIER_POINTS.P0, BEZIER_POINTS.P1, BEZIER_POINTS.P2, BEZIER_POINTS.P3)
      const startCam = travelEndPos.clone().add(new THREE.Vector3(5, 4, 15))
      const earthFrontPos = _earthPos.clone().add(new THREE.Vector3(0, 1, 18))
      _tempPos.lerpVectors(startCam, earthFrontPos, t)
      _tempLookAt.lerpVectors(travelEndPos, _earthPos, t)
    }

    camera.position.lerp(_tempPos, 0.1)
    lookAtRef.current.lerp(_tempLookAt, 0.1)
    camera.lookAt(lookAtRef.current)
  })

  return null
}
