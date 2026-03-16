"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { orbitTechData, OrbitTechItem } from "@/lib/orbitTech";
import { iconMap } from "@/lib/techIcons";
import { useScrollStore } from "@/lib/store";
import { useIsMobile } from "@/lib/hooks";

const CATEGORY_GROUPS = [
    { key: 'frontend' as const, label: 'Frontend' },
    { key: 'backend' as const, label: 'Backend Systems' },
    { key: 'cloud' as const, label: 'Cloud Infrastructure' },
    { key: 'ml' as const, label: 'Data & ML' },
    { key: 'tool' as const, label: 'Tools' },
];

function MobileTechCard({ tech }: { tech: OrbitTechItem }) {
    const [expanded, setExpanded] = useState(false);
    const Icon = iconMap[tech.id] as React.ComponentType<{ size?: number; style?: React.CSSProperties }> | undefined;

    return (
        <button
            type="button"
            onClick={() => setExpanded(prev => !prev)}
            className="w-full text-left rounded-xl p-3 transition-colors duration-200"
            style={{
                backgroundColor: expanded ? `${tech.color}12` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${expanded ? tech.color + '50' : 'rgba(255,255,255,0.08)'}`,
            }}
            aria-expanded={expanded}
        >
            <div className="flex items-center gap-2">
                {Icon && <Icon size={14} style={{ color: tech.color, flexShrink: 0 }} />}
                <span className="text-sm font-medium text-white truncate">{tech.name}</span>
                <svg
                    className="ml-auto shrink-0 text-neutral-600 transition-transform duration-200"
                    style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    width="10" height="10" viewBox="0 0 12 12" fill="none"
                >
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <AnimatePresence>
                {expanded && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-neutral-400 mt-2 leading-relaxed overflow-hidden"
                    >
                        {tech.description}
                    </motion.p>
                )}
            </AnimatePresence>
        </button>
    );
}

function MobileTechStack() {
    const grouped = CATEGORY_GROUPS.map(cat => ({
        ...cat,
        items: orbitTechData.filter(t => t.category === cat.key),
    })).filter(g => g.items.length > 0);

    return (
        <section id="techstack" className="py-20 px-6">
            <h2 className="text-3xl font-bold mb-10 text-center">Technologies</h2>
            <div className="flex flex-col gap-8 max-w-lg mx-auto">
                {grouped.map(group => (
                    <div key={group.key}>
                        <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-3">
                            {group.label}
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {group.items.map(tech => (
                                <MobileTechCard key={tech.id} tech={tech} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function OrbitalSystem() {
    const containerRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);

    const isMobile = useIsMobile();

    const hoveredTechId = useScrollStore((state) => state.hoveredTechId);
    const scrollProgress = useScrollStore((state) => state.scrollProgress);

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
                end: "bottom bottom",
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
        return <MobileTechStack />;
    }

    return (
        <section id="techstack" ref={containerRef} className="h-[400vh] relative overflow-hidden pointer-events-none">

            <div id="techstack-target" className="absolute top-[25%] left-0 w-full h-px pointer-events-none opacity-0" />


            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">


                <div ref={orbitRef} className="absolute z-10 w-[600px] h-[600px] pointer-events-none" />

            </div>
        </section>
    );
}
