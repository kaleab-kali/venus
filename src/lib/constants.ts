import type { Vector3Tuple } from "three"

// === COLORS ===
export const COLORS = {
  cosmicBlack: "#0B0B0F",
  venusGold: "#D4AF37",
  dustRose: "#CFA6A6",
  cosmicViolet: "#8C7AE6",
  oldPaper: "#F5F1E8",
} as const

// === CAMERA ===
export const CAMERA = {
  fov: 45,
  near: 0.1,
  far: 1000,
  startPos: [0, 4, 20] as Vector3Tuple,
  venusRevealPos: [0, 3, 10] as Vector3Tuple,
  orbitPos: [2, 2, -10] as Vector3Tuple,
}

// === OBJECT POSITIONS (V3 authoritative) ===
export const POSITIONS = {
  venus: [0, 0, -80] as Vector3Tuple,
  earth: [0, -10, -240] as Vector3Tuple,
}

// === SHOOTING STAR BEZIER CONTROL POINTS ===
export const BEZIER_POINTS = {
  P0: [0, 0, -80] as Vector3Tuple,
  P1: [-20, 10, -120] as Vector3Tuple,
  P2: [20, -5, -200] as Vector3Tuple,
  P3: [0, -10, -240] as Vector3Tuple,
}

// === SCROLL PHASE RANGES (normalized 0-1) ===
export const SCROLL_PHASES = {
  spaceIntro: [0, 0.10] as [number, number],
  venusReveal: [0.10, 0.25] as [number, number],
  shootingStarBirth: [0.25, 0.32] as [number, number],
  interplanetaryTravel: [0.32, 0.50] as [number, number],
  earthApproach: [0.50, 0.62] as [number, number],
  africaZoom: [0.62, 0.75] as [number, number],
  libraryLanding: [0.75, 0.93] as [number, number],
  landingFlash: [0.93, 1.0] as [number, number],
}

// === LIBRARY SCENE ===
export const LIBRARY = {
  position: [0, -50, -240] as Vector3Tuple,
}

// === LIGHTING ===
export const LIGHTING = {
  directionalPos: [5, 10, 3] as Vector3Tuple,
  directionalIntensity: 2.2,
  ambientIntensity: 0.25,
  fogDensity: 0.015,
}

// === STARFIELD ===
export const STARFIELD = {
  radius: 400,
  count: 2500,
}

// === PERFORMANCE BUDGET ===
export const PERF = {
  maxTriangles: 150_000,
  maxDrawCalls: 80,
  maxParticles: 3000,
  maxTextureSize: 2048,
}

// === PLANET GEOMETRY ===
export const PLANET = {
  venusRadius: 5,
  earthRadius: 6,
  segments: 64,
}

// === SCROLL SPACER ===
export const SCROLL_SPACER_HEIGHT = "700vh"

// === EASING ===
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// === PHASE PROGRESS HELPER ===
/** Maps global scroll progress to local phase progress (0-1) */
export function getPhaseProgress(
  scrollProgress: number,
  phase: [number, number],
): number {
  const [start, end] = phase
  if (scrollProgress <= start) return 0
  if (scrollProgress >= end) return 1
  return (scrollProgress - start) / (end - start)
}
