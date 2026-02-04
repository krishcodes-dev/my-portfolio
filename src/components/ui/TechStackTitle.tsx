"use client";

import { useScrollStore } from "@/lib/store";
import { TECH_STACK_ACTIVE_THRESHOLD, TECH_STACK_END_THRESHOLD } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

export function TechStackTitle() {
    const { scrollProgress } = useScrollStore();

    // Active only within the Tech Stack Scroll Zone
    const isInActiveZone =
        scrollProgress >= TECH_STACK_ACTIVE_THRESHOLD &&
        scrollProgress < TECH_STACK_END_THRESHOLD;

    return (
        <AnimatePresence>
            {isInActiveZone && (
                <motion.div
                    initial={{ opacity: 0, y: -20, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: -20, x: "-50%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="fixed top-24 left-1/2 z-40 pointer-events-none mix-blend-difference"
                    style={{ x: "-50%" }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white text-center tracking-tighter">
                        Technology Stack
                    </h2>
                    <p className="text-neutral-400 text-center mt-2 text-sm md:text-base font-light tracking-wide">
                        Explore the orbital system
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
