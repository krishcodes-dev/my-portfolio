"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { usePointerParallax } from "./usePointerParallax";
import { useScrollStore } from "@/lib/store";

// --- GLSL SHADERS ---
// (Keeping the existing shader logic but adding uMorph mix uniform if needed)
// For now, we just animate uTime faster + Scale.

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  varying vec2 vUv;
  
  uniform float uTime;
  uniform float uScrollProgress; // 0.0 to 1.0
  
  // Simplex Noise (Truncated for brevity, assuming standard implementation)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
           i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 viewDirection = normalize(vViewPosition);
    vec3 normal = normalize(vNormal);
    
    float fresnel = pow(1.0 - dot(viewDirection, normal), 3.0);
    
    // Animate noise speed based on scroll
    float timeScale = 1.0 + uScrollProgress * 5.0; // Speed up when morphed
    
    vec3 noise = vec3(
      snoise(vPosition * 2.0 + uTime * 0.2 * timeScale),
      snoise(vPosition * 2.0 + uTime * 0.3 * timeScale),
      snoise(vPosition * 2.0 + uTime * 0.4 * timeScale)
    );
    
    float patterns = snoise(vPosition * 4.0 + noise + uTime * 0.2 * timeScale);
    patterns = abs(patterns);
    
    // --- COLOR PALETTE SHIFT ---
    // Hero: Dark Midnight (Void)
    vec3 heroBase = vec3(0.05, 0.1, 0.3);
    vec3 heroRefract = vec3(0.3, 0.05, 0.2);
    
    // Tech: Brighter, Data-blue/Cyan (Processing)
    vec3 techBase = vec3(0.0, 0.4, 0.8);
    vec3 techRefract = vec3(0.0, 0.8, 0.9);
    
    vec3 baseColor = mix(heroBase, techBase, uScrollProgress);
    vec3 refractionColor = mix(heroRefract, techRefract, uScrollProgress);
    vec3 highlightColor = vec3(0.9, 0.9, 1.0);
    
    float highlight = pow(patterns, 2.0) * 0.5;
    float refraction = pow(patterns, 1.5) * (1.0 - fresnel) * 0.5;
    
    vec3 finalColor = mix(
      mix(baseColor, refractionColor, refraction),
      highlightColor,
      highlight
    );
    
    finalColor *= (0.8 + fresnel * 1.5);
    finalColor = pow(finalColor, vec3(1.2));
    
    gl_FragColor = vec4(finalColor, 0.9);
  }
`;

// interface CoreProps {
//   isHovered: boolean;
// }

export default function Core({ isHovered: propHovered }: { isHovered?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { x, y } = usePointerParallax();

  const scrollProgress = useScrollStore((state) => state.scrollProgress);
  const isHeroHovered = useScrollStore((state) => state.isHeroHovered);

  // Use prop if provided (for legacy/testing) or store
  const isHovered = propHovered ?? isHeroHovered;

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
  }), []);

  useFrame((state, delta) => {
    // 1. Update Shader Time & Progress
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;

      // Smooth lerp for the uniformity prevents jumping
      materialRef.current.uniforms.uScrollProgress.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uScrollProgress.value,
        scrollProgress,
        0.1
      );
    }

    if (!meshRef.current) return;

    // 2. Animate Transform (Morphing)
    // Scale: 2.5 (Hero) -> 1.0 (Tech)
    const targetScale = THREE.MathUtils.lerp(2.5, 1.0, scrollProgress);
    const currentScale = meshRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
    meshRef.current.scale.setScalar(newScale);

    // Position logic moved to FixedBackgroundCanvas.tsx for unified movement with rings
    // Mesh stays at local 0,0,0
    meshRef.current.position.x = 0;

    // 3. Idle Rotation (Faster in Tech mode)
    const rotationSpeed = 0.1 + (scrollProgress * 0.5);
    meshRef.current.rotation.y += delta * rotationSpeed;

    // 4. Pointer Tilt (Reduced influence in Tech mode)
    const mouseX = x.get();
    const mouseY = y.get();

    const influence = 1.0 - scrollProgress; // 0 when fully scrolled
    const targetRotX = mouseY * 0.2 * influence;
    const targetRotZ = -mouseX * 0.2 * influence;

    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.1;
    meshRef.current.rotation.z += (targetRotZ - meshRef.current.rotation.z) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 4]} /> {/* Base size 1, scaled up */}
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
        />
      </mesh>
    </Float>
  );
}
