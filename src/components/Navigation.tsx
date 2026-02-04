"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis"; // Import Lenis type if needed, or just standard window scrolling

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        // For Tech Stack, use different targets for mobile vs desktop
        let targetId = id;
        const isMobile = window.innerWidth < 768;

        if (id === "tech-stack") {
            // Desktop: scroll to tech-stack-target (orbital interaction point)
            // Mobile: scroll to tech-stack (technologies list)
            targetId = isMobile ? "tech-stack" : "tech-stack-target";
        }

        const element = document.getElementById(targetId);
        if (element) {
            // Calculate offset for mobile (to account for fixed nav)
            const offset = isMobile ? 80 : 0;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleNameClick = () => {
        // Force browser to not restore scroll position on reload
        if (typeof window !== "undefined") {
            window.history.scrollRestoration = "manual";
            window.location.reload();
        }
    };

    const navLinks = [
        { name: "Tech Stack", id: "tech-stack" },
        { name: "Projects", id: "projects" },
        { name: "Contact", id: "contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-3 md:py-6 transition-all duration-500 flex justify-between items-center ${scrolled ? "bg-neutral-950/30 backdrop-blur-sm border-b border-white/5" : "bg-transparent"
                }`}
        >
            {/* Left: Name (Refresh Action) */}
            <button
                onClick={handleNameClick}
                className="group relative text-white font-bold text-base md:text-xl tracking-tight transition-opacity hover:opacity-80"
                aria-label="Refresh Page"
            >
                Krish Sanghavi
            </button>

            {/* Right: Navigation Links */}
            <div className="flex items-center gap-4 md:gap-8">
                {navLinks.map((link) => (
                    <button
                        key={link.name}
                        onClick={() => scrollToSection(link.id)}
                        className="relative group text-xs md:text-base text-neutral-400 hover:text-white transition-colors capitalize py-2 px-1 touch-manipulation"
                        style={{ minWidth: '44px', minHeight: '44px' }}
                    >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                    </button>
                ))}
            </div>
        </motion.nav>
    );
}
