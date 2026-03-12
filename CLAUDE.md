# CLAUDE.md — Venus

## Project Overview

Interactive 3D birthday experience built with React, Three.js, and animations.

**Stack:** React 19 + Vite + TanStack Start/Router + Three.js + R3F + Drei + Framer Motion + GSAP + Lenis + Tailwind CSS + Radix UI + shadcn

## Structure

```
src/
├── components/    # React components
├── lib/           # Utilities
├── routes/        # TanStack Router pages
├── styles.css     # Global styles
└── router.tsx     # Router config
public/            # Static assets
```

## Commands

```bash
pnpm dev             # Dev server (port 3000)
pnpm build           # Production build
pnpm preview         # Preview build
pnpm test            # Vitest
pnpm lint            # ESLint
pnpm format          # Prettier
pnpm typecheck       # TypeScript check
```

---

## GENERAL CODE RULES

- ALWAYS use pnpm for package management (not npm/yarn).
- NEVER manually write package.json dependencies — use `pnpm add` commands instead.
- NEVER insert emoji into any file. Use unicode codepoints instead.
- ONLY use valid, working unicode codepoints that render correctly.
- ALWAYS respect `.gitignore` patterns.
- NEVER allow a branch or PR to contain more than 40 changed files. Split into smaller branches.
- ALWAYS verify installed package versions.
- NEVER assume API patterns from older versions.
- ALWAYS test each small step before moving to the next.

---

## GIT COMMIT RULES

- ALWAYS use single-line commit messages only.
- NEVER include multi-line body text.
- NEVER include "Co-Authored-By" or "Generated with Claude Code".
- ALWAYS use conventional commit: `type(scope): description`
- Example: `feat(scene): add particle system`
- ALWAYS commit when changes exceed 8 new files OR 10 edited files.
- NEVER let a single commit grow too large.

---

## TYPESCRIPT RULES

- ALWAYS use `const`. NEVER use `let` or `var`.
- ALWAYS specify exact package versions in `package.json`.
- NEVER add unnecessary `console.log()`.
- NEVER add explicit types if inferable.
- ALWAYS add `as const` to object literals when helpful.
- NEVER add return type annotations unless type stubs.
- NEVER use try/catch (use Result pattern or let errors propagate).
- ALWAYS prefer functional style. Avoid mutable variables.
- NEVER add code comments unless requested.
- NEVER allow a file larger than 600 lines.
- NEVER allow a function larger than 100 lines (except React components).
- NEVER use `window`. Use `globalThis`.
- NEVER use `forEach()`. Use `for...of`.
- ALWAYS use arrow functions. Never function declarations unless overloads needed.
- NEVER use `.then()` promises. Use `async`/`await`.
- NEVER use magic numbers/strings. Use named constants.
- ALWAYS define config values in constant object with `as const`.

---

## REACT RULES

- ALWAYS use `React.useCallback()` for functions inside components.
- ALWAYS use `React.useMemo()` for computed values inside components.
- ALWAYS use `React.memo()` for all components.
- ALWAYS provide `displayName` to all components.
- ALWAYS provide comparison function to `React.memo()`.
- NEVER set state from `scroll`, `resize`, `keyDown`, `keyPress` handlers.
- NEVER allow a component larger than 300 lines.
- NEVER render a component as function call. Use JSX element.
- NEVER create `index.ts` barrel files except rare essential cases.
- ALWAYS make components responsive (mobile, tablet, desktop).

---

## MEMORY LEAK PREVENTION (React)

- ALWAYS cleanup subscriptions, timers, event listeners in useEffect cleanup.
- NEVER create subscriptions/timers without cleanup.
- ALWAYS use AbortController for fetch requests that may cancel.
- NEVER store component refs in module-level variables.
- ALWAYS check mounted state before updating state in async callbacks.
- NEVER create closures capturing large objects unnecessarily.
- ALWAYS use WeakMap/WeakSet when caching component instances.
- NEVER add window/document listeners without cleanup.
- NEVER create new object/array refs in render without useMemo.
- ALWAYS use stable callback refs with useCallback for handlers passed to children.

---

## THREE.JS / REACT THREE FIBER RULES

- ALWAYS use R3F declarative `<mesh>`, `<group>`, etc. instead of imperative Three.js.
- ALWAYS dispose of geometries, materials, and textures in cleanup.
- NEVER create Three.js objects inside render — use `useMemo` or refs.
- ALWAYS use `useFrame` for animation loops. NEVER use `requestAnimationFrame` directly.
- ALWAYS use `useLoader` or Drei helpers for loading assets.
- PREFER Drei abstractions (`<OrbitControls>`, `<Environment>`, `<Text>`, etc.) over raw Three.js equivalents.
- ALWAYS set `frameloop="demand"` on `<Canvas>` if the scene is mostly static.
- NEVER mutate state inside `useFrame` — use refs for per-frame updates.
- ALWAYS use `useThree` to access renderer, camera, scene when needed.
- KEEP draw calls low. Merge geometries and use instancing where possible.

### Three.js Skills Reference

BEFORE writing Three.js code, read the relevant skill file for patterns and best practices:

- `.claude/skills/threejs-skills/skills/threejs-fundamentals` — Scene setup, camera, renderer basics
- `.claude/skills/threejs-skills/skills/threejs-geometry` — Geometry creation and manipulation
- `.claude/skills/threejs-skills/skills/threejs-materials` — Material types and configuration
- `.claude/skills/threejs-skills/skills/threejs-textures` — Texture loading and mapping
- `.claude/skills/threejs-skills/skills/threejs-lighting` — Light types and shadow setup
- `.claude/skills/threejs-skills/skills/threejs-animation` — Animation loops and keyframes
- `.claude/skills/threejs-skills/skills/threejs-shaders` — Custom shaders and GLSL
- `.claude/skills/threejs-skills/skills/threejs-postprocessing` — Post-processing effects
- `.claude/skills/threejs-skills/skills/threejs-interaction` — Raycasting and user input
- `.claude/skills/threejs-skills/skills/threejs-loaders` — Model and asset loading

---

## GSAP RULES

- ALWAYS use `useGSAP()` hook (from `@gsap/react`) inside React components for automatic cleanup.
- NEVER use raw `gsap.to()` / `gsap.from()` without cleanup in React.
- ALWAYS create GSAP timelines with `gsap.timeline()` for sequenced animations.
- ALWAYS use `ScrollTrigger` for scroll-based animations. Register it: `gsap.registerPlugin(ScrollTrigger)`.
- NEVER mix GSAP and Framer Motion on the same element.
- ALWAYS use refs (not selectors) to target elements in React.
- PREFER `gsap.context()` for scoping animations to a component subtree.

---

## FRAMER MOTION RULES

- ALWAYS use `motion` components for declarative animations.
- PREFER `variants` for complex multi-step animations.
- ALWAYS use `AnimatePresence` for exit animations.
- NEVER mix Framer Motion and GSAP on the same element.
- PREFER `layout` prop for layout animations over manual position tweening.
- ALWAYS use `whileHover`, `whileTap`, `whileInView` for interaction states.
- USE `useMotionValue` and `useTransform` for performance-critical animations.

---

## LENIS (SMOOTH SCROLL) RULES

- Initialize Lenis once at the app root level.
- ALWAYS sync Lenis with GSAP ScrollTrigger if both are used.
- ALWAYS call `lenis.destroy()` on cleanup.

---

## FILE NAMING

- Components: `PascalCase.tsx` — `ParticleField.tsx`
- Hooks: `useParticles.ts`
- Utilities: `math-utils.ts`
- Constants: `scene-config.ts`
- Types: `scene.types.ts`
- Tests: `particle-field.test.ts`

---

## YOUR ROLE

You write code. I test it. If I report a bug, fix it and ask me to verify.

Ask questions when unclear. Don't assume.

Read files before making changes.
