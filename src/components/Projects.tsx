"use client";

import { motion } from "framer-motion";

const projects = [
    {
        title: "Asha EHR",
        impact: "A full-stack digital health record system enabling frontline ASHA workers to manage patient data efficiently, even in low-connectivity environments.",
        tech: ["FastAPI", "Firebase", "React / Flutter"],
        github: "https://github.com/ethancodes-6969/ASHA-EHR",
        demo: "https://ecodash.demo"
    },
    {
        title: "VerifAI",
        impact: "A real-time fraud detection platform that scores transactions using AI-driven risk analysis to help businesses identify and prevent fraud instantly.",
        tech: ["Python (ML)", "FastAPI", "Next.js"],
        github: "https://github.com/ethancodes-6969/VerifAI-AgenticAI",
        demo: null
    },
    {
        title: "UIDAI Enrollment Disparity Analysis",
        impact: "A data-driven solution developed for the UIDAI Hackathon, focusing on secure identity insights and large-scale data analysis under real-world constraints.",
        tech: ["Python (Pandas, NumPy)", "Machine Learning", "Data Visualization"],
        github: null,
        demo: "https://colab.research.google.com/drive/1UmrI2mgSfq9dJOu-KalMzqB2ut3LsaLX?usp=sharing"
    }
];

import { ElectricProjectCard } from "./ui/ElectricProjectCard";

export default function Projects() {
    return (
        <section id="projects" className="relative z-20 py-16 md:py-32 px-6 lg:px-24 w-full">
            <div className="mb-16 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold tracking-tighter mb-4"
                >
                    Technical Experience
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-neutral-400 text-center mt-2 text-sm md:text-base font-light tracking-wide max-w-3xl mx-auto"
                >
                    These projects were developed through national hackathons and independent initiatives, focusing on real-world problem statements and end-to-end system design.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="h-full"
                    >
                        <ElectricProjectCard className="h-full">
                            <div className="flex flex-col h-full justify-between gap-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-neutral-400 font-light leading-relaxed">
                                        {project.impact}
                                    </p>
                                    <div className="flex gap-2 mt-4 flex-wrap">
                                        {project.tech.map((t) => (
                                            <span key={t} className="text-xs font-mono text-neutral-500 border border-neutral-800 px-2 py-1 rounded-md">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-white hover:text-blue-400 transition-colors flex items-center gap-1"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                            Code
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-white hover:text-blue-400 transition-colors flex items-center gap-1"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </ElectricProjectCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
