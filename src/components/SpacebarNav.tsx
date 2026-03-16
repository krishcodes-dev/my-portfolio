"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { TECH_STACK_ACTIVE_THRESHOLD } from "@/lib/constants";

// Ordered list — must match Navigation section order
const SECTIONS = ["overview", "techstack", "projects", "about", "contact"];

/**
 * Returns the absolute scroll-Y target for a given section ID.
 *
 * Techstack on desktop is special: the section is 400vh tall with a GSAP
 * ScrollTrigger (start:"top bottom" → end:"bottom bottom"). The content
 * ("Technology Stack / Explore the orbital system") only becomes visible at
 * scroll-progress ≥ TECH_STACK_ACTIVE_THRESHOLD (0.70). We compute that
 * exact Y directly instead of using the element anchor, which sits at ~0.50.
 */
function resolveScrollY(id: string, currentScrollY: number): number | null {
    const isMobile = window.innerWidth < 768;

    if (id === "techstack" && !isMobile) {
        const section = document.getElementById("techstack");
        if (!section) return null;

        const sectionTop    = section.getBoundingClientRect().top + currentScrollY;
        const sectionHeight = section.offsetHeight; // ~400 * windowHeight / 100 * vh

        // ScrollTrigger fires from "top bottom" to "bottom bottom"
        // → triggerStart scroll = sectionTop - windowHeight
        // → target at progress P = triggerStart + P * sectionHeight
        const triggerStart = sectionTop - window.innerHeight;
        return triggerStart + TECH_STACK_ACTIVE_THRESHOLD * sectionHeight;
    }

    // Mobile techstack + all other sections: scroll to the element top
    const targetId =
        id === "techstack" && isMobile ? "techstack" : id;
    const el = document.getElementById(targetId);
    if (!el) return null;

    const navOffset = isMobile ? 80 : 0;
    return el.getBoundingClientRect().top + currentScrollY - navOffset;
}

export function SpacebarNav() {
    const pathname = usePathname();

    useEffect(() => {
        if (pathname !== "/") return;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.code !== "Space") return;

            // Don't steal space from interactive elements
            const target = e.target as HTMLElement;
            const tag = target.tagName;
            if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(tag)) return;
            if (target.isContentEditable) return;

            e.preventDefault();

            const scrollY = window.scrollY;

            // Walk sections in order; jump to the first whose resolved scroll
            // target is meaningfully below the current position (>80px buffer
            // prevents re-triggering the section we're already at the top of)
            for (const id of SECTIONS) {
                const targetY = resolveScrollY(id, scrollY);
                if (targetY === null) continue;

                if (targetY > scrollY + 80) {
                    if ((window as any).lenis) {
                        (window as any).lenis.scrollTo(targetY);
                    } else {
                        window.scrollTo({ top: targetY, behavior: "smooth" });
                    }
                    return;
                }
            }
            // Already past the last section — do nothing
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [pathname]);

    return null;
}
