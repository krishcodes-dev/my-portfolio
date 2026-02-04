"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        role: "Intern",
        company: "Elite Technologies",
        period: "2025",
        points: [
            "Studied and Built Embedded System Projects."
        ]
    },
    {
        role: "Intern",
        company: "Vacha",
        period: "2024",
        points: [
            "Social Services/ Managing Data and MIS."
        ]
    }
];

export default function Experience() {
    return (
        <section id="experience" className="relative z-20 py-32 px-6 lg:px-24 w-full flex flex-col items-center justify-center bg-none">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tighter"
            >
                Experience
            </motion.h2>

            <div className="w-full max-w-4xl space-y-8">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full p-8 md:p-10 border-l mb-8 border-neutral-800 bg-white/[0.03] backdrop-blur-md rounded-r-2xl sm:rounded-2xl sm:border sm:border-neutral-800"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                            <div>
                                <h3 className="text-2xl font-semibold text-white">{exp.role}</h3>
                                <p className="text-lg text-neutral-400">{exp.company}</p>
                            </div>
                            <span className="text-sm font-mono text-neutral-500 bg-neutral-900 px-3 py-1 rounded-full w-fit">
                                {exp.period}
                            </span>
                        </div>

                        <ul className="space-y-2">
                            {exp.points.map((point, i) => (
                                <li key={i} className="text-neutral-300 font-light flex items-start gap-3">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
