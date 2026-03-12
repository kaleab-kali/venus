/** Mutable scroll progress store. Written by GSAP ScrollTrigger, read by R3F useFrame.
 *  Using a plain object with a mutable value avoids React re-renders at 60fps. */
export const scrollStore = {
  /** Cinematic phase progress: 0 (top) to 1 (end of spacer) */
  progress: 0,
  /** Whether the cinematic 3D phase is complete (progress >= 1) */
  cinematicComplete: false,
}
