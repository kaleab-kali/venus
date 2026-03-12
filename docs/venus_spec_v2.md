# Venus Cinematic 3D Spec --- V2

## Rendering Architecture

React → React Three Fiber → Three.js Scene Graph → WebGL → GPU

## Coordinate System

Right‑handed Cartesian system

X: horizontal\
Y: vertical\
Z: depth

World origin: (0,0,0)

Example positions: Venus (0,0,-20)\
Earth (30,-5,-120)\
Camera (0,2,15)

## Camera Model

Perspective camera

FOV 45°\
Near 0.1\
Far 1000

Interpolation: P(t) = P0 + (P1 − P0) \* t

Bezier curve: B(t) = (1−t)\^3P0 + 3(1−t)\^2tP1 + 3(1−t)t\^2P2 + t\^3P3

## Starfield Distribution

φ = random(0,2π)\
cosθ = random(-1,1)\
θ = arccos(cosθ)

x = r sinθ cosφ\
y = r sinθ sinφ\
z = r cosθ

## Lighting

Directional light (sun)\
Ambient light (cosmic bounce)\
Point light (shooting star)

## Fresnel Glow

F = (1 − dot(N,V))\^p
