'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function RocketCursor() {
    const [rotation, setRotation] = useState(45);
    const [isMobile, setIsMobile] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
            const isSmallScreen = window.innerWidth < 768;
            setIsMobile(isTouchDevice || isSmallScreen);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const rocketX = useSpring(cursorX, { damping: 30, stiffness: 400, mass: 0.3 });
    const rocketY = useSpring(cursorY, { damping: 30, stiffness: 400, mass: 0.3 });

    const particles = useRef<any[]>([]);
    const lastPos = useRef({ x: -100, y: -100 });
    const requestRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (isMobile) return;

        const updateRotation = () => {
            const dx = rocketX.get() - lastPos.current.x;
            const dy = rocketY.get() - lastPos.current.y;

            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                // Add 90deg because the pixel sprite points UP, but 0deg is RIGHT
                const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
                setRotation(angle);
            }

            lastPos.current = { x: rocketX.get(), y: rocketY.get() };
        };

        const unsubscribeX = rocketX.on("change", updateRotation);

        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);

            addParticle(e.clientX, e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            unsubscribeX();
        };
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                p.life -= 0.02;
                p.x += p.vx;
                p.y += p.vy;
                p.size *= 0.95;

                if (p.life <= 0) {
                    particles.current.splice(i, 1);
                } else {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(100, 116, 139, ${p.life * 0.4})`;
                    ctx.fill();
                }
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [isMobile]);

    const addParticle = (x: number, y: number) => {
        // Add randomness to spawn position slightly behind/around cursor
        for (let i = 0; i < 2; i++) {
            particles.current.push({
                x: x + (Math.random() - 0.5) * 10,
                y: y + (Math.random() - 0.5) * 10,
                vx: (Math.random() - 0.5) * 0.5, // Slight drift
                vy: (Math.random() * 0.5) + 0.5, // Fall down slightly
                life: 1.0,
                size: Math.random() * 6 + 4, // 4-10px puffs
            });
        }
    };

    // Don't render on mobile
    if (isMobile) return null;

    return (
        <>
            {/* Smoke Layer */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-[9998]"
                style={{ width: '100%', height: '100%' }}
            />

            {/* Rocket */}
            <motion.div
                className="fixed pointer-events-none z-[9999] will-change-transform"
                style={{
                    x: rocketX,
                    y: rocketY,
                    rotate: rotation,
                }}
            >
                <img
                    src="/pixel-rocket.png"
                    alt="Custom rocket cursor icon"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain drop-shadow-lg"
                />
            </motion.div>
        </>
    );
}
