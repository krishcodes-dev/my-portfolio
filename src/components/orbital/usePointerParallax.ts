import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function usePointerParallax() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springs for premium feel
    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
    const smoothX = useSpring(x, springConfig);
    const smoothY = useSpring(y, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            // Normalize to -1 to 1
            const normalizedX = (e.clientX / innerWidth) * 2 - 1;
            const normalizedY = (e.clientY / innerHeight) * 2 - 1;

            x.set(normalizedX);
            y.set(normalizedY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    return { x: smoothX, y: smoothY };
}
