"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "@/lib/store";

export default function Rings3D() {
    const groupRef = useRef<THREE.Group>(null);
    const scrollProgress = useScrollStore((state) => state.scrollProgress);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const ringMats = useRef<THREE.MeshBasicMaterial[]>([]);
    const pointsMat = useRef<THREE.PointsMaterial>(null);

    const rings = useMemo(() => {
        return [
            { radius: 4.8, color: "#cbd5e1", opacity: 0.3 },
            { radius: 6.6, color: "#60A5FA", opacity: 0.5 },
            { radius: 8.0, color: "#475569", opacity: 0.25 },
        ];
    }, []);

    const particleCount = isMobile ? 150 : 400;
    const particles = useMemo(() => {
        const tempPositions = new Float32Array(particleCount * 3);
        const tempColors = new Float32Array(particleCount * 3);
        const palette = [new THREE.Color("#22D3EE"), new THREE.Color("#818CF8"), new THREE.Color("#94A3B8")];

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = 4.0 + Math.random() * 3.5;
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            const y = (Math.random() - 0.5) * 0.5;

            tempPositions[i * 3] = x;
            tempPositions[i * 3 + 1] = y;
            tempPositions[i * 3 + 2] = z;

            const c = palette[Math.floor(Math.random() * palette.length)];
            tempColors[i * 3] = c.r;
            tempColors[i * 3 + 1] = c.g;
            tempColors[i * 3 + 2] = c.b;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(tempPositions, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(tempColors, 3));
        return geo;
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        if (!isMobile) {
            groupRef.current.rotation.y += delta * 0.02;
        }

        const visibility = 1.0 - THREE.MathUtils.smoothstep(scrollProgress, 0.0, 0.5);

        ringMats.current.forEach((mat, i) => {
            if (mat) mat.opacity = rings[i].opacity * visibility;
        });

        if (pointsMat.current) {
            pointsMat.current.opacity = 0.6 * visibility;
        }

        groupRef.current.visible = visibility > 0.01;
    });

    return (
        <group ref={groupRef} rotation={[0.2, 0, 0.1]} scale={isMobile ? 0.75 : 1}>
            {rings.map((ring, i) => (
                <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[ring.radius, ring.radius + 0.05, isMobile ? 128 : 128]} />
                    <meshBasicMaterial
                        ref={(el) => { if (el) ringMats.current[i] = el; }}
                        color={ring.color}
                        transparent
                        opacity={ring.opacity}
                        side={THREE.DoubleSide}
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            ))}

            <points geometry={particles}>
                <pointsMaterial
                    ref={pointsMat}
                    size={0.05}
                    vertexColors
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
}
