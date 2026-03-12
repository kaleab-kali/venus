# Venus Cinematic Blueprint --- V3

## World Scale

1 unit ≈ 1 meter

Starfield radius: 400\
Venus: (0,0,-80)\
Earth: (0,-10,-240)\
Camera start: (0,4,20)

## Scene Graph

SceneRoot CameraRig StarFieldSystem VenusSystem ShootingStarSystem
EarthSystem

## Cinematic Timeline

0--0.15 Space intro 0.15--0.35 Venus reveal 0.35--0.45 Shooting star
birth 0.45--0.70 Interplanetary travel 0.70--0.90 Earth approach
0.90--1.00 landing flash

## Particle Motion

p(t+Δt) = p(t) + vΔt

Opacity fade: opacity = 1 − (t/lifetime)

## Fog

fogFactor = e\^(−density \* distance)

density = 0.015
