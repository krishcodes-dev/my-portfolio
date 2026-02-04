"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// Types for our visual-only nodes
interface HeroNode {
    id: string;
    size: number; // pixel size
    color: string;
    initialAngle: number; // degrees
    depthScale: number; // 0.8 to 1.2
}

const heroNodes: HeroNode[] = [
    { id: "h1", size: 16, color: "#60A5FA", initialAngle: 0, depthScale: 1.1 },   // blue-400
    { id: "h2", size: 12, color: "#A78BFA", initialAngle: 72, depthScale: 0.9 },  // purple-400
    { id: "h3", size: 20, color: "#E5E7EB", initialAngle: 144, depthScale: 1.2 }, // gray-200
    { id: "h4", size: 14, color: "#818CF8", initialAngle: 216, depthScale: 1.0 }, // indigo-400
    { id: "h5", size: 10, color: "#9CA3AF", initialAngle: 288, depthScale: 0.8 }, // gray-400
];

export default function OrbitalHero() {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Mobile Detection
    useEffect(() => {
        const checkMobile = () => {
            // Use interaction capability check as requested + width fallback
            const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
            setIsMobile(hasCoarsePointer || window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Animation Variants
    const orbitVariants = {
        idle: {
            rotate: 360,
            transition: {
                duration: 40,
                repeat: Infinity,
                ease: "linear"
            }
        },
        hover: {
            rotate: 360,
            transition: {
                duration: 80, // Slow down
                repeat: Infinity,
                ease: "linear"
            }
        }
    } as const;

    const counterRotateVariants = {
        idle: {
            rotate: -360,
            transition: {
                duration: 40,
                repeat: Infinity,
                ease: "linear"
            }
        },
        hover: {
            rotate: -360,
            transition: {
                duration: 80,
                repeat: Infinity,
                ease: "linear"
            }
        }
    } as const;

    const containerVariants = {
        idle: { scale: 1 },
        hover: { scale: 0.95 } // Tighten radius slightly
    };

    if (isMobile) {
        return (
            <div className="relative w-[300px] h-[300px] flex items-center justify-center">
                {/* Core */}
                <div className="absolute w-24 h-24 rounded-full bg-neutral-900/50 border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <div className="w-2 h-2 rounded-full bg-white/50" />
                </div>
                {/* Static Satellites */}
                {heroNodes.map((node, i) => {
                    const radius = 120;
                    const angleRad = (node.initialAngle * Math.PI) / 180;
                    const x = parseFloat((Math.cos(angleRad) * radius).toFixed(2));
                    const y = parseFloat((Math.sin(angleRad) * radius).toFixed(2));

                    return (
                        <div
                            key={node.id}
                            className="absolute rounded-full"
                            style={{
                                width: `${node.size}px`,
                                height: `${node.size}px`,
                                backgroundColor: node.color,
                                transform: `translate(${x}px, ${y}px)`,
                                boxShadow: `0 0 10px ${node.color}40`
                            }}
                        />
                    );
                })}
            </div>
        );
    }

    return (
        <motion.div
            className="relative w-[500px] h-[500px] flex items-center justify-center perspective-[1000px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial="idle"
            animate={isHovered ? "hover" : "idle"}
            variants={containerVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* 
         CORE ELEMENT 
         Acts as the gravitational center.
      */}
            <motion.div
                className="absolute z-20 w-32 h-32 rounded-full bg-neutral-900/40 backdrop-blur-md border border-white/10 flex items-center justify-center"
                animate={{
                    boxShadow: isHovered
                        ? "0 0 50px rgba(255, 255, 255, 0.15)"
                        : "0 0 30px rgba(255, 255, 255, 0.05)",
                    scale: isHovered ? 1.05 : [1, 1.02, 1] // Breathing idle, slight scale on hover
                }}
                transition={{
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 0.5 }
                }}
            >
                <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
            </motion.div>

            {/* 
         ORBITAL CONTAINER
         This rings is tipped in 3D space using rotateX.
         It spins continuously on Z axis.
      */}
            <motion.div
                className="absolute w-full h-full flex items-center justify-center preserve-3d"
                style={{ transformStyle: "preserve-3d", rotateX: 60 }}
            >
                <motion.div
                    className="absolute inset-0 preserve-3d"
                    variants={orbitVariants}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* 
                NODES
                Placed at a fixed radius.
                They must counter-rotate to stay upright relative to the screen.
             */}
                    {heroNodes.map((node) => {
                        const radius = 200; // Orbit radius
                        const angleRad = (node.initialAngle * Math.PI) / 180;
                        // Pre-calculate X/Y on the circle
                        // Rounding to 2 decimal places to match server/client precision and avoid hydration errors
                        const xVal = (Math.cos(angleRad) * radius).toFixed(2);
                        const yVal = (Math.sin(angleRad) * radius).toFixed(2);
                        const x = `${xVal}px`;
                        const y = `${yVal}px`;

                        return (
                            <motion.div
                                key={node.id}
                                className="absolute top-1/2 left-1/2 rounded-full bg-white preserve-3d"
                                style={{
                                    width: `${node.size}px`,
                                    height: `${node.size}px`,
                                    x, // Offset from center
                                    y,
                                    backgroundColor: node.color,
                                    transformStyle: "preserve-3d" // Essential for child transforms
                                }}
                            >
                                {/* 
                           COUNTER ROTATION 
                           1. Negate the Z-spin of the orbit
                           2. Negate the X-tilt of the container
                           This keeps the dot facing the camera at all times as a flat 2D plane
                        */}
                                <motion.div
                                    className="w-full h-full rounded-full"
                                    variants={counterRotateVariants}
                                    style={{
                                        rotateX: -60, // Counter parent tilt
                                        boxShadow: `0 0 15px ${node.color}60`
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Optional: Faint Orbit Ring Visualization */}
                <div className="absolute w-[400px] h-[400px] rounded-full border border-white/5 pointer-events-none" />

            </motion.div>

        </motion.div>
    );
}
