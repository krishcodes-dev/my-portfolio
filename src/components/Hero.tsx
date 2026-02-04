"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollIndicator from "./ScrollIndicator";
import OrbitalHero from "./orbital/OrbitalHero";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] as const } },
};

export default function Hero() {
    return (
        <section className="min-h-screen w-full flex items-center justify-center px-6 lg:px-24 relative overflow-hidden pt-20 md:pt-0">
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center z-10">
                <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-8">
                    <motion.div variants={item}>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white">
                            KRISH <br /> SANGHAVI
                        </h1>
                    </motion.div>

                    <motion.p variants={item} className="text-lg sm:text-xl md:text-2xl text-neutral-400 font-light max-w-md leading-relaxed">
                        Full-Stack Developer with AI/ML & Embedded Systems Experience
                    </motion.p>

                    <motion.div variants={item} className="flex flex-wrap gap-4">
                        <a
                            href="/resume/Krish_Sanghavi_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors flex items-center gap-2"
                        >
                            Resume <span className="text-xs">↓</span>
                        </a>
                        <a
                            href="https://github.com/krishcodes-dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
                        >
                            GitHub
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right Side: Orbital Hero Visual */}
                <div className="relative flex items-center justify-center lg:justify-end h-[400px] lg:h-[600px] w-full">
                    <OrbitalHero />
                </div>
            </div>
            {/* Scroll Indicator */}
            <ScrollIndicator />
        </section>
    );
}
