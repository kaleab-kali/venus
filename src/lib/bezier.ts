import * as THREE from "three"

/**
 * Evaluates a cubic Bezier curve at parameter t.
 * B(t) = (1-t)^3*P0 + 3(1-t)^2*t*P1 + 3(1-t)*t^2*P2 + t^3*P3
 */
export function cubicBezier(
  t: number,
  p0: THREE.Vector3,
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  p3: THREE.Vector3,
): THREE.Vector3 {
  const u = 1 - t
  const u2 = u * u
  const u3 = u2 * u
  const t2 = t * t
  const t3 = t2 * t

  return new THREE.Vector3()
    .addScaledVector(p0, u3)
    .addScaledVector(p1, 3 * u2 * t)
    .addScaledVector(p2, 3 * u * t2)
    .addScaledVector(p3, t3)
}

/** Convenience: evaluate from tuple arrays */
export function cubicBezierFromTuples(
  t: number,
  p0: [number, number, number],
  p1: [number, number, number],
  p2: [number, number, number],
  p3: [number, number, number],
): THREE.Vector3 {
  return cubicBezier(
    t,
    new THREE.Vector3(...p0),
    new THREE.Vector3(...p1),
    new THREE.Vector3(...p2),
    new THREE.Vector3(...p3),
  )
}
