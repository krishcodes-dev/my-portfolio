"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Core3D from "./Core3D";
import Rings3D from "./Rings3D";
import TechNodes3D from "./TechNodes3D";

interface SceneProps {
    // We can pass shared state or refs here if needed, 
    // but we are using Zustand for the heavy lifting.
}

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "@/lib/store";
import { TECH_STACK_ACTIVE_THRESHOLD, TECH_STACK_VISUAL_COMPLETE } from "@/lib/constants";

function SceneContent() {
    const groupRef = React.useRef<THREE.Group>(null);
    const scrollProgress = useScrollStore((state) => state.scrollProgress);
    const [isMobile, setIsMobile] = React.useState(false);

    // Detect mobile on mount
    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Mobile: Always centered (x=0)
            // Desktop: Unified Slide from Hero (Right x=10) -> Center (Tech x=0)
            if (isMobile) {
                groupRef.current.position.x = 0; // Always centered on mobile
            } else {
                const startX = 10;
                const visualProgress = Math.min(1, scrollProgress / TECH_STACK_VISUAL_COMPLETE);
                const targetX = THREE.MathUtils.lerp(startX, 0, visualProgress);
                const currentX = groupRef.current.position.x;
                groupRef.current.position.x = THREE.MathUtils.lerp(currentX, targetX, 0.15);
            }
        }
    });

    return (
        <group ref={groupRef} position={[isMobile ? 0 : 10, 0, 0]}> {/* Mobile: centered, Desktop: right */}
            {/* --- LIGHTING (Fixed in this group? No, lights usually are global, but standard practice in single scene is fine) --- */}
            {/* Actually, let's keep lights separate so the object moves THROUGH the light fields */}

            {/* --- CORE (Reads Store) --- */}
            <Core3D />

            {/* --- RINGS (Reads Store) --- */}
            <Rings3D />

            {/* --- TECH NODES (Reads Store) --- */}
            <TechNodes3D />
        </group>
    );
}

function Lights() {
    return (
        <group>
            <ambientLight intensity={0.5} color="#1e1b4b" />
            <spotLight position={[-15, 15, 10]} intensity={8} angle={0.4} penumbra={1} color="#E2E8F0" />
            <pointLight position={[10, 5, 10]} intensity={5} color="#22D3EE" distance={20} />
            <pointLight position={[-10, -10, -5]} intensity={5} color="#A78BFA" distance={20} />
        </group>
    )
}

import { CameraBridge } from "./CameraBridge";

function SceneWrapper() {
    // Need this wrapper to separate Hooks (useFrame) from Canvas if we were strictly outside, 
    // but SceneContent is inside Canvas, so it's fine.
    // However, I need to render Lights outside the moving group.
    return (
        <>
            <CameraBridge />
            <Lights />
            <SceneContent />
        </>
    )
}

export default function FixedBackgroundCanvas() {
    const [mounted, setMounted] = React.useState(false);
    const [hasWebGL, setHasWebGL] = React.useState(true);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        // Check if WebGL is supported
        const checkWebGL = () => {
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                return !!gl;
            } catch (e) {
                return false;
            }
        };

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        setHasWebGL(checkWebGL());
        checkMobile();
        setMounted(true);

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!mounted || !hasWebGL) return null;

    return (
        <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 34], fov: 30 }}
                gl={{
                    alpha: true,
                    antialias: !isMobile, // Disable on mobile for performance
                    powerPreference: isMobile ? 'low-power' : 'high-performance',
                    failIfMajorPerformanceCaveat: false
                }}
                dpr={isMobile ? 1 : [1, 2]} // Force 1x on mobile
                // Essential for allowing hover events on 3D objects behind the DOM overlay
                eventSource={document.body}
                eventPrefix="client"
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                }}
            >
                <Suspense fallback={null}>
                    <SceneWrapper />
                </Suspense>
            </Canvas>
        </div>
    );
}
