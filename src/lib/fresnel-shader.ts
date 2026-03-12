import * as THREE from "three"

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uBaseColor;
  uniform vec3 uGlowColor;
  uniform float uFresnelPower;
  uniform float uOpacity;

  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), uFresnelPower);
    vec3 color = mix(uBaseColor, uGlowColor, fresnel);
    gl_FragColor = vec4(color, uOpacity * (0.3 + fresnel * 0.7));
  }
`

export function createFresnelMaterial(options: {
  baseColor: string
  glowColor: string
  fresnelPower?: number
  opacity?: number
}): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uBaseColor: { value: new THREE.Color(options.baseColor) },
      uGlowColor: { value: new THREE.Color(options.glowColor) },
      uFresnelPower: { value: options.fresnelPower ?? 3.0 },
      uOpacity: { value: options.opacity ?? 1.0 },
    },
    transparent: true,
    side: THREE.FrontSide,
    depthWrite: false,
  })
}

export function createGlowMaterial(options: {
  color: string
  fresnelPower?: number
  opacity?: number
}): THREE.ShaderMaterial {
  const glowFragment = /* glsl */ `
    uniform vec3 uGlowColor;
    uniform float uFresnelPower;
    uniform float uOpacity;

    varying vec3 vNormal;
    varying vec3 vViewDir;

    void main() {
      float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), uFresnelPower);
      gl_FragColor = vec4(uGlowColor, fresnel * uOpacity);
    }
  `

  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: glowFragment,
    uniforms: {
      uGlowColor: { value: new THREE.Color(options.color) },
      uFresnelPower: { value: options.fresnelPower ?? 2.0 },
      uOpacity: { value: options.opacity ?? 0.6 },
    },
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
}
