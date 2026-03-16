"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Expose lenis to window to use it in components (e.g. Navigation)
    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      if ((window as any).lenis === lenis) {
        delete (window as any).lenis;
      }
    };
  }, []);

  // reducedMotion="user" respects the OS-level prefers-reduced-motion setting
  // across all Framer Motion animations on the page.
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
