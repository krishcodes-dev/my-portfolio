"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useScrollStore } from "@/lib/store";
import { orbitTechData } from "@/lib/orbitTech";
import { TECH_STACK_ACTIVE_THRESHOLD, TECH_STACK_END_THRESHOLD } from "@/lib/constants";
import { useIsMobile } from "@/lib/hooks";

function TechOrb({ node, isMobile }: { node: any, index: number, isMobile: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = React.useState(false);
    const setHoveredTechId = useScrollStore((state) => state.setHoveredTechId);
    const scrollProgress = useScrollStore((state) => state.scrollProgress);

    const isInteractive =
        scrollProgress >= TECH_STACK_ACTIVE_THRESHOLD &&
        scrollProgress < TECH_STACK_END_THRESHOLD;

    useFrame((_state, delta) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += delta * 0.5;
        meshRef.current.rotation.x += delta * 0.2;
    });

    const handlePointerOver = () => {
        if (!isInteractive) return;
        setHovered(true);
        setHoveredTechId(node.id);
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        setHovered(false);
        setHoveredTechId(null);
        document.body.style.cursor = 'auto';
    };

    const orbMesh = (
        <mesh
            ref={meshRef}
            name={node.id}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            scale={hovered ? 1.3 : 1}
        >
            <sphereGeometry args={[0.5, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
            <meshPhysicalMaterial
                color={hovered ? node.color : "#1e1b4b"}
                emissive={node.color}
                emissiveIntensity={hovered ? 2.5 : 0.6}
                roughness={0.2}
                metalness={0.1}
                transmission={0.6}
                thickness={1}
                transparent
                opacity={0.8}
            />
        </mesh>
    );

    return (
        <group position={node.pos}>
            {isMobile ? orbMesh : (
                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    {orbMesh}
                </Float>
            )}
        </group>
    );
}

export default function TechNodes3D() {
    const groupRef = useRef<THREE.Group>(null);
    const scrollProgress = useScrollStore((state) => state.scrollProgress);
    const updateNodePositions = useScrollStore((state) => state.updateNodePositions);
    const isMobile = useIsMobile();

    // Pre-allocate one Vector3 per tech to avoid per-frame allocations
    const vec3Pool = useMemo(() => {
        const pool = new Map<string, THREE.Vector3>();
        orbitTechData.forEach(tech => pool.set(tech.id, new THREE.Vector3()));
        return pool;
    }, []);

    // Frame counter for throttling position updates to every 3rd frame
    const frameCount = useRef(0);

    const nodes = useMemo(() => {
        return orbitTechData.map((tech, i) => {
            const phi = Math.acos(-1 + (2 * i) / orbitTechData.length);
            const theta = Math.sqrt(orbitTechData.length * Math.PI) * phi;

            let r = 6 + Math.random() * 4;

            if (tech.id === 'sqlite') {
                r = 4;
            }

            const x = r * Math.cos(theta) * Math.sin(phi);
            const y = r * Math.sin(theta) * Math.sin(phi);
            const z = r * Math.cos(phi);

            return { ...tech, pos: new THREE.Vector3(x, y, z) };
        });
    }, []);

    useFrame(() => {
        if (!groupRef.current) return;

        const visibility = THREE.MathUtils.smoothstep(scrollProgress, 0.2, 0.8);
        groupRef.current.scale.setScalar(visibility);
        groupRef.current.rotation.y += 0.0005;

        // Throttle expensive position updates to every 3rd frame
        frameCount.current = (frameCount.current + 1) % 3;
        if (frameCount.current !== 0) return;

        // Force matrix update specifically here to avoid 1-frame jitter mismatch between React components and Canvas.
        groupRef.current.updateMatrixWorld(true);

        let hasPositions = false;
        orbitTechData.forEach((tech) => {
            const object = groupRef.current?.getObjectByName(tech.id);
            if (object) {
                // Write directly into pre-allocated Vector3 — no per-frame allocation
                object.getWorldPosition(vec3Pool.get(tech.id)!);
                hasPositions = true;
            }
        });

        if (hasPositions) {
            // Shallow-copy the map so Zustand detects the reference change
            updateNodePositions(new Map(vec3Pool));
        }
    });

    if (isMobile) return null;

    return (
        <group ref={groupRef} visible={scrollProgress > 0.1}>
            {nodes.map((node, i) => (
                <TechOrb key={node.id} node={node} index={i} isMobile={isMobile} />
            ))}
        </group>
    );
}
