# Venus Cinematic Master Blueprint --- V4

## Camera Choreography

t0 Camera (0,4,20) --- space intro\
t3 Camera (0,3,10) --- Venus reveal\
t6 Camera (2,2,-10) --- orbit Venus\
t9 Camera follows star trajectory\
t14 Earth visible\
t18 landing flash

## Star Trajectory

Bezier control points

P0 = (0,0,-80) P1 = (-20,10,-120) P2 = (20,-5,-200) P3 = (0,-10,-240)

## Motion Easing

easeInOutCubic

4t³ (t \< 0.5) 1 − ((−2t+2)\^3)/2 (t ≥ 0.5)

## Lighting Setup

Directional Light vector (5,10,3) intensity 2.2

Ambient 0.25

Point light for star attenuation: I = I0 / (1 + kd²)

## Performance Budget

Triangles \< 150k Draw calls \< 80 Particles \< 3000 Textures ≤ 2048

## Final Scene

Return to space. Planet Venus visible.

Message:

Every great story deserves another chapter. Happy Birthday Venus.
