"use client";

import { motion } from "framer-motion";
import { useState } from "react";

function RadarChart() {
    const skills = [
        { name: "Frontend", value: 0.95 },
        { name: "Backend", value: 0.85 },
        { name: "AI / ML", value: 0.80 },
        { name: "Cybersec", value: 0.70 },
        { name: "DSA", value: 0.55 }
    ];

    const size = 260;
    const center = size / 2;
    const radius = 80;

    const getPoints = (scale = 1) => {
        return skills.map((_, i) => {
            const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
            const x = center + radius * scale * Math.cos(angle);
            const y = center + radius * scale * Math.sin(angle);
            return `${x},${y}`;
        }).join(" ");
    };

    const dataPoints = skills.map((skill, i) => {
        const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
        const x = center + radius * skill.value * Math.cos(angle);
        const y = center + radius * skill.value * Math.sin(angle);
        return `${x},${y}`;
    }).join(" ");

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-neutral-500 text-xs tracking-widest uppercase block mb-4 self-start">
                SKILL CALIBRATION
            </span>
            <div className="flex-1 flex items-center justify-center w-full min-h-[220px]">
                <svg width="100%" height="100%" viewBox="0 0 260 260" className="max-w-[260px] overflow-visible">
                    {[0.25, 0.5, 0.75, 1].map((scale) => (
                        <polygon
                            key={scale}
                            points={getPoints(scale)}
                            fill="none"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="1"
                        />
                    ))}
                    {skills.map((_, i) => {
                        const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
                        const x = center + radius * Math.cos(angle);
                        const y = center + radius * Math.sin(angle);
                        return (
                            <line
                                key={i}
                                x1={center}
                                y1={center}
                                x2={x}
                                y2={y}
                                stroke="rgba(255,255,255,0.08)"
                                strokeWidth="1"
                            />
                        );
                    })}

                    <motion.polygon
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        points={dataPoints}
                        fill="rgba(59, 130, 246, 0.15)"
                        stroke="rgba(59, 130, 246, 0.8)"
                        strokeWidth="1.5"
                    />

                    {skills.map((skill, i) => {
                        const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
                        const x = center + (radius + 26) * Math.cos(angle);
                        const y = center + (radius + 18) * Math.sin(angle);

                        return (
                            <text
                                key={skill.name}
                                x={x}
                                y={y}
                                fill="rgba(255,255,255,0.5)"
                                fontSize="10"
                                fontFamily="monospace"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                            >
                                {skill.name}
                            </text>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}

export default function About() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const duration = 0.7;

    return (
        <section
            id="about"
            className="relative z-20 py-32 px-6 lg:px-24 w-full flex flex-col items-center justify-center font-mono"
        >
            <div className="w-full max-w-4xl">
                {/* Header Section */}
                <div className="flex flex-col items-center justify-center border-b-2 border-white/20 pb-6 mb-12 text-center w-full">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs text-blue-400 mb-3 tracking-widest uppercase flex items-center justify-center"
                    >
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-white font-sans uppercase mb-4"
                    >
                        About Me
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-neutral-400 text-center mt-2 text-sm md:text-base font-light tracking-wide font-sans mb-4"
                    >
                        Location: Mumbai, India | Status: Student // Developer
                    </motion.div>
                </div>

                {/* HUD Grid (Fluid Flexbox Breathing Layout) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-col gap-px bg-white/10 border border-white/20 p-px w-full min-h-[750px] rounded-lg overflow-hidden"
                    onMouseLeave={() => setHoveredCard(null)}
                >
                    {/* Top Flex Row (Left Col + Radar) */}
                    <div 
                        className="flex flex-col lg:flex-row gap-px w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        style={{ flex: hoveredCard === 4 ? 2.3 : 3 }}
                    >
                        {/* Left Column (Intro + Interests, Works) */}
                        <div 
                            className="flex flex-col gap-px w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            style={{ flex: (hoveredCard === 0 || hoveredCard === 1 || hoveredCard === 3) ? 2.4 : (hoveredCard === 2 ? 1.6 : 2) }}
                        >
                            {/* Top Inner Row (Intro + Interests) */}
                            <div 
                                className="flex flex-col sm:flex-row gap-px w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                style={{ flex: (hoveredCard === 0 || hoveredCard === 1) ? 1.2 : (hoveredCard === 3 ? 0.8 : 1) }}
                            >
                                {/* Intro Panel */}
                                <div 
                                    onMouseEnter={() => setHoveredCard(0)}
                                    className="relative bg-neutral-950 p-6 md:p-8 flex flex-col justify-center w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                    style={{ flex: hoveredCard === 0 ? 1.5 : (hoveredCard === 1 ? 0.7 : 1) }}
                                >
                                    <div className="absolute inset-0 bg-white/[0.02] pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ opacity: hoveredCard === 0 ? 1 : 0 }} />
                                    <div className="mb-6 relative z-10 w-full">
                                        <span className="text-xl md:text-2xl text-white font-bold tracking-tight whitespace-nowrap">
                                            Hey, I'm Krish.
                                        </span>
                                    </div>
                                    <div className="font-sans text-neutral-300 font-light leading-relaxed space-y-4 text-sm md:text-base relative z-10">
                                        <p className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ opacity: hoveredCard === 1 ? 0.5 : 1 }}>
                                            I'm a third-year B.Tech student in Electronics and Telecommunication at KJ Somaiya. I enjoy building systems where software, intelligence, and security intersect.
                                        </p>
                                        <p className="text-blue-400 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ opacity: hoveredCard === 1 ? 0.5 : 1 }}>
                                            {">"} Fuel source: curiosity
                                        </p>
                                    </div>
                                </div>

                                {/* Interests Panel */}
                                <div 
                                    onMouseEnter={() => setHoveredCard(1)}
                                    className="relative bg-neutral-950 p-6 md:p-8 flex flex-col justify-center gap-6 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                    style={{ flex: hoveredCard === 1 ? 1.5 : (hoveredCard === 0 ? 0.7 : 1) }}
                                >
                                    <div className="absolute inset-0 bg-white/[0.02] pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ opacity: hoveredCard === 1 ? 1 : 0 }} />
                                    <div className="relative z-10 w-full">
                                        <span className="text-neutral-500 text-xs tracking-widest uppercase block mb-3 whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ opacity: hoveredCard === 0 ? 0.5 : 1 }}>
                                            Currently exploring:
                                        </span>
                                        <div className="flex flex-col gap-3 font-sans">
                                            <div className="flex items-center gap-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ opacity: hoveredCard === 0 ? 0.5 : 1 }}>
                                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                                                <span className="text-neutral-200">Cybersec</span>
                                            </div>
                                            <div className="flex items-center gap-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ opacity: hoveredCard === 0 ? 0.5 : 1 }}>
                                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0" />
                                                <span className="text-neutral-200 truncate pr-2">AI specific Cybersecurity</span>
                                            </div>
                                            <div className="flex items-center gap-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ opacity: hoveredCard === 0 ? 0.5 : 1 }}>
                                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0" />
                                                <span className="text-neutral-200 truncate pr-2">Intelligent systems</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Current Works Panel */}
                            <div 
                                onMouseEnter={() => setHoveredCard(3)}
                                className="relative bg-neutral-950 p-6 md:p-8 flex flex-col justify-center w-full group overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                style={{ flex: hoveredCard === 3 ? 1.2 : (hoveredCard === 0 || hoveredCard === 1 ? 0.8 : 1) }}
                            >
                                <div className="absolute inset-0 bg-white/[0.02] pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ opacity: hoveredCard === 3 ? 1 : 0 }} />
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />

                                <span className="text-neutral-500 text-xs tracking-widest uppercase block mb-4 relative z-10">
                                    My current work focuses on:
                                </span>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
                                    {[
                                        { name: "Full-Stack Dev", icon: "🌐", delay: 0 },
                                        { name: "AI / ML", icon: "🧠", delay: 0.1 },
                                        { name: "Generative AI", icon: "✨", delay: 0.2 }
                                    ].map((module, i) => (
                                        <div
                                            key={i}
                                            className="border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:scale-[1.05] p-4 flex items-center gap-3 transition-all duration-[400ms] ease-out rounded-sm cursor-default"
                                        >
                                            <span className="text-xl opacity-80">{module.icon}</span>
                                            <span className="text-neutral-300 text-sm tracking-wide font-sans">{module.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Radar Chart Panel */}
                        <div 
                            onMouseEnter={() => setHoveredCard(2)}
                            className="relative bg-neutral-950 p-6 md:p-8 flex flex-col items-center justify-center w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            style={{ flex: hoveredCard === 2 ? 1.4 : (hoveredCard === 0 || hoveredCard === 1 || hoveredCard === 3 ? 0.6 : 1) }}
                        >
                            <div className="absolute inset-0 bg-white/[0.02] pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ opacity: hoveredCard === 2 ? 1 : 0 }} />
                            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center min-h-[220px]">
                                <RadarChart />
                            </div>
                        </div>
                    </div>

                    {/* Hobbies / Extras Panel */}
                    <div 
                        onMouseEnter={() => setHoveredCard(4)}
                        className="relative bg-neutral-950 p-6 md:p-8 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        style={{ flex: hoveredCard === 4 ? 1.5 : 1 }}
                    >
                        <div className="absolute inset-0 bg-white/[0.02] pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ opacity: hoveredCard === 4 ? 1 : 0 }} />
                        <span className="text-neutral-500 text-xs tracking-widest uppercase block mb-4 relative z-10">
                            Personal Hobbies
                        </span>
                        <div className="font-sans text-neutral-300 font-light leading-relaxed space-y-4 border-l-2 border-white/10 pl-4 text-sm md:text-base relative z-10">
                            <p className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ opacity: hoveredCard !== null && hoveredCard !== 4 ? 0.6 : 1 }}>
                                Outside of building projects, I enjoy exploring new technologies, gaming, and spending time with friends. I'm always experimenting with ideas and learning something new along the way.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
