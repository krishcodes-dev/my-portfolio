"use client";

import React, { useState, useEffect } from "react";
import { useScrollStore } from "@/lib/store";

export default function OrbitalHero() {
    const setIsHovered = useScrollStore((state) => state.setIsHeroHovered);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const isTouch = window.matchMedia("(pointer: coarse)").matches;
            const isSmall = window.innerWidth < 768;
            setIsMobile(isTouch || isSmall);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        // Increased size to prevent canvas clipping
        <div
            className="relative w-[1600px] h-[800px] flex items-center justify-center fade-in"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 
            LAYER 0: Atmosphere
            Soft glow behind the core.
        */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div
                    className={`w-[250px] h-[250px] bg-blue-600/20 rounded-full blur-[80px] transition-all duration-700 hover:scale-110 opacity-80`}
                />
            </div>

            {/* 
            LAYER 1: The Full 3D Scene
            This is now handled by FixedBackgroundCanvas.tsx globally.
            This component just acts as the "Spacer" and "Interaction Zone".
        */}
        </div>
    );
}
