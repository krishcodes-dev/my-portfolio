"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    setActiveSection(id);
                    if (window.history.replaceState) {
                        window.history.replaceState(null, '', `#${id}`);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // We observe all the section ids but handle dynamic components elegantly
        const sections = ["overview", "techstack", "projects", "about", "contact"];
        const observedElements = new Set();
        
        const tryObserve = () => {
            let allFound = true;
            sections.forEach((id) => {
                if (observedElements.has(id)) return;
                const el = document.getElementById(id);
                if (el) {
                    observer.observe(el);
                    observedElements.add(id);
                } else {
                    allFound = false;
                }
            });
            return allFound;
        };

        tryObserve();
        
        let interval: NodeJS.Timeout | null = null;
        if (!tryObserve()) {
            interval = setInterval(() => {
                if (tryObserve() && interval) {
                    clearInterval(interval);
                }
            }, 500);
        }

        // Set initial active section on load if hash is present
        if (window.location.hash) {
            setActiveSection(window.location.hash.substring(1));
        } else {
            setActiveSection("overview");
        }

        return () => {
            if (interval) clearInterval(interval);
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    const scrollToSection = (id: string) => {
        // For Tech Stack, use different targets for mobile vs desktop
        let targetId = id;
        const isMobile = window.innerWidth < 768;

        if (id === "techstack") {
            // Desktop: scroll to techstack-target (orbital interaction point)
            // Mobile: scroll to techstack (technologies list)
            targetId = isMobile ? "techstack" : "techstack-target";
        }

        const element = document.getElementById(targetId);
        if (element) {
            // Calculate offset for mobile (to account for fixed nav)
            const offset = isMobile ? 80 : 0;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;

            if ((window as any).lenis) {
                // Use Lenis smooth scroll
                (window as any).lenis.scrollTo(offsetPosition);
            } else {
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    const handleNameClick = () => {
        if ((window as any).lenis) {
            (window as any).lenis.scrollTo(0);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const navLinks = [
        { name: "Overview", id: "overview" },
        { name: "Tech Stack", id: "techstack" },
        { name: "Projects", id: "projects" },
        { name: "About", id: "about" },
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
                aria-label="Scroll to top"
            >
                Krish Sanghavi
            </button>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <button
                        key={link.name}
                        onClick={() => scrollToSection(link.id)}
                        className={`relative group text-base transition-colors capitalize py-2 px-1 ${activeSection === link.id ? "text-white" : "text-neutral-400 hover:text-white"}`}
                    >
                        {link.name}
                        <span className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-300 ${activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"}`} />
                    </button>
                ))}
            </div>

            {/* Mobile hamburger */}
            <button
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] z-50"
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
                <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
                <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </button>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden fixed inset-x-0 top-[56px] bg-neutral-950/95 backdrop-blur-md border-b border-white/10 flex flex-col items-center py-6 gap-6 z-40"
                    >
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => { scrollToSection(link.id); setMenuOpen(false); }}
                                className={`text-lg font-medium transition-colors ${activeSection === link.id ? "text-white" : "text-neutral-400"}`}
                            >
                                {link.name}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
