"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { orbitTechData, OrbitTechItem } from "@/lib/orbitTech";
import { iconMap } from "@/lib/techIcons";
import { useScrollStore } from "@/lib/store";

export default function OrbitalSystem() {
    const containerRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = useState(false);

    const hoveredTechId = useScrollStore((state) => state.hoveredTechId);
    const scrollProgress = useScrollStore((state) => state.scrollProgress);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches || window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        const orbit = orbitRef.current;
        if (!container || !orbit) return;

        const state = { radius: 250 };
        const total = orbitTechData.length;
        const orbitNodes = gsap.utils.toArray<HTMLElement>(".orbit-node");
        const gridContainer = document.querySelector(".grid-container");
        const gridNodes = gsap.utils.toArray<HTMLElement>(".grid-node");

        const updatePositions = () => {
            orbitNodes.forEach((node, i) => {
                const angle = (i / total) * Math.PI * 2;
                gsap.set(node, {
                    x: Math.cos(angle) * state.radius,
                    y: Math.sin(angle) * state.radius
                });
            });
        };

        updatePositions();

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "center center",
                scrub: true,
                onUpdate: (self) => {
                    useScrollStore.getState().setScrollProgress(self.progress);
                }
            }
        });

        timeline.addLabel("start");

        timeline.to(state, {
            radius: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: updatePositions
        }, "start");



        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [isMobile]);

    if (isMobile) {

        return (
            <section id="tech-stack" className="py-20 px-6">
                <h2 className="text-3xl font-bold mb-8 text-center">Technologies</h2>
                <div className="flex flex-wrap gap-4 justify-center">
                    {orbitTechData.map((tech) => {
                        const Icon = iconMap[tech.id] as React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
                        return (
                            <div
                                key={tech.id}
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    border: `1px solid ${tech.color}`,
                                }}
                            >
                                {Icon && <Icon size={16} style={{ color: tech.color }} />}
                                <span style={{ color: '#ffffff' }}>{tech.name}</span>
                            </div>
                        );
                    })}
                </div>
            </section>
        );
    }

    return (
        <section id="tech-stack" ref={containerRef} className="h-[400vh] relative overflow-hidden pointer-events-none">

            <div id="tech-stack-target" className="absolute top-[25%] left-0 w-full h-px pointer-events-none opacity-0" />


            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">


                <div ref={orbitRef} className="absolute z-10 w-[600px] h-[600px] pointer-events-none" />

            </div>
        </section>
    );
}
