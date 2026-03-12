# VENUS --- COMPLETE MASTER SPECIFICATION

Consolidated from: `venus_spec_v1.md`, `venus_spec_v2.md`, `venus_spec_v3.md`, `venus_spec_v4.md`
Stack correction: **TanStack Start** (not Next.js), **@react-three/drei** added

---

## 1. PROJECT CONCEPT

An interactive, cinematic birthday website that fuses three aesthetics:

1. **Space / Cosmic** --- deep-space visuals, starfields, planets
2. **Literature / Dostoevsky** --- dark-academia library interior, old books, handwritten letters
3. **Dark-Academia Design** --- muted golds, dusty roses, aged paper textures

The visitor experiences a narrative journey: starting in outer space, traveling to Earth, landing in a literary room, and discovering birthday content (letters, poems, gifts).

---

## 2. TECH STACK

| Technology | Role |
|---|---|
| **TanStack Start** | Full-stack React framework (SSR, file-based routing, server functions) |
| **TypeScript** | Type safety across the entire codebase |
| **React Three Fiber (R3F)** | React renderer for Three.js --- declarative 3D scene management |
| **@react-three/drei** | R3F utility library (Stars, Text, Float, Environment, shaders, helpers) |
| **Three.js** | Low-level WebGL 3D engine (geometry, materials, lights, cameras) |
| **GSAP** | Scroll-driven and time-based animation sequencing |
| **Framer Motion** | React component enter/exit/layout animations (2D UI transitions) |
| **TailwindCSS** | Utility-first CSS for all 2D layout and styling |
| **Lenis** | Smooth-scroll library (replaces native scroll with lerped smooth scroll) |

### Rendering Pipeline (V2)

```
React Components
  → React Three Fiber (reconciler)
    → Three.js Scene Graph (nodes, meshes, lights, cameras)
      → WebGL API calls
        → GPU rasterization
```

Every React `<mesh>`, `<pointLight>`, etc. becomes a Three.js object in the scene graph. R3F reconciles React state changes into Three.js mutations each frame.

### Deployment

**Vercel**

---

## 3. STORY FLOW (narrative sequence)

| Step | What Happens |
|---|---|
| 1 | **Space intro** --- camera starts in deep space, stars visible |
| 2 | **Planet Venus reveal** --- camera pushes forward, Venus comes into view |
| 3 | **Shooting star travels to Earth** --- a luminous particle/trail launches from Venus toward Earth |
| 4 | **Landing in a Dostoevsky-style library** --- transition from 3D space to a 2D/3D literary room |
| 5 | **Interactive sections** --- bookshelf-style navigation (user clicks/scrolls through "books") |
| 6 | **Letter, poems, gifts** --- personal birthday content |
| 7 | **Final birthday message** --- closing scene, return to space, Venus visible again |

---

## 4. ALL SECTIONS (in order)

| # | Section Name | Purpose |
|---|---|---|
| 1 | **Hero** | Opening screen; space backdrop; title/name reveal |
| 2 | **Meaning of Venus** | Explains the symbolism of Venus (love, beauty, the planet) |
| 3 | **Dostoevsky Room** | Dark-academia library interior; transition from space to literature |
| 4 | **Garden of Venus** | A garden-themed visual section (flowers, nature, Venus motifs) |
| 5 | **Timeline** | Key moments/memories displayed chronologically |
| 6 | **Letter** | A personal handwritten-style birthday letter |
| 7 | **Poetry** | Poems displayed with typewriter or fade-in effects |
| 8 | **Gift Boxes** | Interactive gift boxes the user can open/click |
| 9 | **Final Scene** | Return to space; Venus visible; final message displayed |

**Final message text (exact):**

> *"Every great story deserves another chapter. Happy Birthday Venus."*

---

## 5. COLOR PALETTE (exact hex values)

| Name | Hex | Usage |
|---|---|---|
| **Cosmic Black** | `#0B0B0F` | Primary background; deep space; dark surfaces |
| **Venus Gold** | `#D4AF37` | Titles; accents; star glow; gilded book edges |
| **Dust Rose** | `#CFA6A6` | Soft highlights; floral elements; subtle UI accents |
| **Cosmic Violet** | `#8C7AE6` | Nebula haze; atmospheric glow; secondary accents |
| **Old Paper** | `#F5F1E8` | Body text backgrounds; letter/poem surfaces; parchment |

---

## 6. TYPOGRAPHY (exact fonts)

| Font | Usage | Style |
|---|---|---|
| **Cinzel** | Titles (main headings, hero text, section names) | Serif, all-caps classical Roman |
| **Playfair Display** | Subheadings (section subtitles, secondary headers) | High-contrast serif, editorial feel |
| **EB Garamond** | Body text (paragraphs, letters, poems, descriptions) | Old-style serif, book-like readability |

---

## 7. 3D COORDINATE SYSTEM (V2, V3)

**Right-handed Cartesian coordinate system** (Three.js default):

- **X axis** = horizontal (positive → right)
- **Y axis** = vertical (positive → up)
- **Z axis** = depth (positive → toward viewer, negative → into screen)

**World origin:** `(0, 0, 0)`

### Key Object Positions (V3 is authoritative)

| Object | V2 Position | V3 Position (FINAL) | Notes |
|---|---|---|---|
| **Venus** | `(0, 0, -20)` | `(0, 0, -80)` | V3 pushed Venus much deeper into the scene |
| **Earth** | `(30, -5, -120)` | `(0, -10, -240)` | V3 centers Earth on X, pushes further back |
| **Camera start** | `(0, 2, 15)` | `(0, 4, 20)` | V3 raises and pulls camera back slightly |

### World Scale (V3)

**1 unit ≈ 1 meter**

**Starfield radius:** 400 units (a sphere of 400m radius filled with star particles surrounding the entire scene).

---

## 8. CAMERA MODEL (V2, V4)

### Perspective Camera Settings

| Property | Value |
|---|---|
| **Type** | PerspectiveCamera |
| **FOV** | 45 degrees |
| **Near clipping plane** | 0.1 units |
| **Far clipping plane** | 1000 units |

### Camera Interpolation (V2)

**Linear interpolation:**

```
P(t) = P0 + (P1 - P0) * t
```

**Cubic Bezier curve:**

```
B(t) = (1-t)^3 * P0 + 3(1-t)^2 * t * P1 + 3(1-t) * t^2 * P2 + t^3 * P3
```

- `P0` = start point
- `P1` = first control point
- `P2` = second control point
- `P3` = end point
- `t` = normalized progress (0 to 1)

### Camera Choreography (V4 --- authoritative keyframes)

| Time (seconds) | Camera Position | Event |
|---|---|---|
| `t = 0s` | `(0, 4, 20)` | Space intro --- camera floating in starfield |
| `t = 3s` | `(0, 3, 10)` | Venus reveal --- push forward, Venus appears |
| `t = 6s` | `(2, 2, -10)` | Orbit Venus --- camera arcs around Venus |
| `t = 9s` | Follows star trajectory | Camera attaches to shooting star path |
| `t = 14s` | Along trajectory | Earth becomes visible ahead |
| `t = 18s` | Near Earth | Landing flash --- bright white transition |

---

## 9. SCENE GRAPH HIERARCHY (V3)

```
SceneRoot
├── CameraRig          (camera + any camera helpers/targets)
├── StarFieldSystem    (particle system for background stars)
├── VenusSystem        (Venus planet mesh + atmosphere + glow)
├── ShootingStarSystem (shooting star mesh + particle trail + point light)
└── EarthSystem        (Earth planet mesh + atmosphere)
```

---

## 10. CINEMATIC TIMELINE (V3 --- scroll-normalized)

| Scroll Range | Phase | What Happens |
|---|---|---|
| `0.00 → 0.15` | **Space intro** | Stars visible, camera drifts |
| `0.15 → 0.35` | **Venus reveal** | Camera pushes forward, Venus fades in with Fresnel glow |
| `0.35 → 0.45` | **Shooting star birth** | Particle ignites near Venus, point light appears |
| `0.45 → 0.70` | **Interplanetary travel** | Star flies along Bezier curve, camera follows, trail particles |
| `0.70 → 0.90` | **Earth approach** | Earth grows larger, atmosphere becomes visible |
| `0.90 → 1.00` | **Landing flash** | Bright white flash, transition to 2D library/room scene |

Driven by GSAP ScrollTrigger. Lenis provides smooth scroll input.

---

## 11. SHOOTING STAR TRAJECTORY (V4 --- Bezier control points)

| Point | Coordinates | Role |
|---|---|---|
| `P0` | `(0, 0, -80)` | Start --- at Venus |
| `P1` | `(-20, 10, -120)` | Control 1 --- pulls curve up and left |
| `P2` | `(20, -5, -200)` | Control 2 --- pulls curve right and down |
| `P3` | `(0, -10, -240)` | End --- at Earth |

S-shaped sweeping arc through space using cubic Bezier formula.

---

## 12. MOTION EASING (V4)

**easeInOutCubic:**

```
if t < 0.5:
    result = 4 * t^3
else:
    result = 1 - ((-2t + 2)^3) / 2
```

Smooth cinematic motion --- slow start, fast middle, slow end.

---

## 13. STARFIELD DISTRIBUTION (V2 --- uniform sphere sampling)

**Step 1 --- Random angles:**
```
φ = random(0, 2π)
cosθ = random(-1, 1)
θ = arccos(cosθ)
```

**Step 2 --- Spherical to Cartesian:**
```
x = r * sin(θ) * cos(φ)
y = r * sin(θ) * sin(φ)
z = r * cos(θ)
```

Radius `r = 400`. Uniform distribution, no pole clustering. Rendered as `THREE.Points` with `Float32Array` position buffer.

---

## 14. LIGHTING SETUP (V2, V4)

**1. Directional Light (Sun)**
- Direction: `(5, 10, 3)`
- Intensity: `2.2`
- Parallel rays simulating sunlight

**2. Ambient Light (Cosmic Bounce)**
- Intensity: `0.25`
- Directionless fill light

**3. Point Light (Shooting Star)**
- Moves with the star mesh
- Attenuation: `I = I0 / (1 + k * d^2)`
  - `I0` = base intensity, `k` = falloff coefficient, `d` = distance

---

## 15. FRESNEL GLOW (V2)

```
F = (1 - dot(N, V))^p
```

- `N` = surface normal, `V` = view direction, `p` = exponent
- Edges glow bright (`dot ≈ 0` → `F ≈ 1`), center stays dark (`dot ≈ 1` → `F ≈ 0`)
- Creates atmospheric halo around planet silhouettes
- Implement as custom GLSL / `THREE.ShaderMaterial`

---

## 16. PARTICLE MOTION (V3)

**Euler integration:**
```
p(t + Δt) = p(t) + v * Δt
```

**Opacity fade:**
```
opacity = 1 - (t / lifetime)
```

Particles fade from fully visible to invisible over their lifespan, then recycle.

---

## 17. FOG (V3)

**Exponential fog:**
```
fogFactor = e^(-density * distance)
```

- `density = 0.015`
- Fog color: `#0B0B0F` (Cosmic Black)
- Close objects fully visible, far objects fade into black space

Three.js: `scene.fog = new THREE.FogExp2('#0B0B0F', 0.015)`

---

## 18. PERFORMANCE BUDGET (V4)

| Metric | Limit |
|---|---|
| **Triangle count** | < 150,000 |
| **Draw calls** | < 80 per frame |
| **Particle count** | < 3,000 total |
| **Texture resolution** | ≤ 2048 x 2048 |

Use instanced rendering, moderate-poly spheres, compressed textures. Monitor via `renderer.info`.

---

## 19. FINAL SCENE (V4)

1. Return to outer space view
2. Planet Venus visible one last time
3. Message displayed:

**"Every great story deserves another chapter. Happy Birthday Venus."**

Cinzel font, Venus Gold `#D4AF37`, fade-in over cosmic background.
