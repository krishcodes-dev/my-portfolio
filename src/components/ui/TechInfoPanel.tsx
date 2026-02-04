"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollStore } from "@/lib/store";
import { orbitTechData } from "@/lib/orbitTech";
import { TECH_STACK_ACTIVE_THRESHOLD, TECH_STACK_END_THRESHOLD } from "@/lib/constants";

export function TechInfoPanel() {
    const { hoveredTechId, scrollProgress } = useScrollStore();
    const [isMobile, setIsMobile] = useState(false);

    // Only show when tech stack is active AND not ended
    const isActive =
        scrollProgress >= TECH_STACK_ACTIVE_THRESHOLD &&
        scrollProgress < TECH_STACK_END_THRESHOLD;

    const hoveredTech = orbitTechData.find((t) => t.id === hoveredTechId);

    // Mobile check to avoid showing this panel on small screens (they have their own view)
    useEffect(() => {
        const check = () => setIsMobile(window.matchMedia('(hover: none)').matches || window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const shouldShow = isActive && hoveredTech && !isMobile;

    return (
        <AnimatePresence>
            {shouldShow && hoveredTech && (
                <motion.div
                    initial={{ opacity: 0, x: -20, y: "-50%" }}
                    animate={{ opacity: 1, x: 0, y: "-50%" }}
                    exit={{ opacity: 0, x: -20, y: "-50%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed left-6 lg:left-24 top-1/2 z-50 pointer-events-none"
                    style={{ y: "-50%" }} // Ensure centered vertical alignment
                >
                    <div className="w-80 md:w-96 p-6 rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
                        {/* Header: Color Bar + Category */}
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className="h-1 w-8 rounded-full"
                                style={{ backgroundColor: hoveredTech.color }}
                            />
                            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                                {hoveredTech.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                            {hoveredTech.name}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-neutral-300 leading-relaxed font-light border-l-2 pl-4 border-white/10">
                            {hoveredTech.description}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
