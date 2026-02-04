"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"; // Optional dev helper, disabled for prod usually
import Core3D from "./Core3D"; // We will modify Core3D to export just the mesh
import Rings3D from "./Rings3D";

interface Scene3DProps {
    isHovered: boolean;
}

function SceneContent({ isHovered }: { isHovered: boolean }) {
    return (
        <group>
            {/* --- LIGHTING --- */}
            {/* 1. Base Dark Ambience */}
            <ambientLight intensity={0.5} color="#1e1b4b" /> {/* Midnight Blue Ambient */}

            {/* 2. Main Key Light (Cool White) */}
            <spotLight
                position={[-15, 15, 10]}
                intensity={8}
                angle={0.4}
                penumbra={1}
                color="#E2E8F0"
            />

            {/* 3. Accent Light 1 (Cyan - Highlight Side) */}
            <pointLight position={[10, 5, 10]} intensity={5} color="#22D3EE" distance={20} />

            {/* 4. Accent Light 2 (Purple - Rim Side) */}
            <pointLight position={[-10, -10, -5]} intensity={5} color="#A78BFA" distance={20} />

            {/* --- CORE --- */}
            <Core3D isHovered={isHovered} />

            {/* --- RINGS --- */}
            <Rings3D />
        </group>
    );
}

export default function Scene3D({ isHovered }: Scene3DProps) {
    return (
        <div className="w-full h-full">
            {/* Adjusted camera to Z=28 to fit the wide Saturn rings (Radius 7) without clipping */}
            <Canvas
                camera={{ position: [0, 0, 34], fov: 30 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <SceneContent isHovered={isHovered} />
                </Suspense>
            </Canvas>
        </div>
    );
}
