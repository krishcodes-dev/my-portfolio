'use client';

import { useEffect, useRef, useState } from 'react';

export function StarBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        setReducedMotion(
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        );

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = 2000;
        const H = 4000; // double height for seamless scroll loop

        canvas.width = W;
        canvas.height = H;

        ctx.clearRect(0, 0, W, H);

        const drawStars = (count: number, radius: number, opacity: number) => {
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            for (let i = 0; i < count; i++) {
                const x = Math.random() * W;
                const y = Math.random() * H;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        drawStars(400, 0.6, 0.8);  // small
        drawStars(120, 1.0, 0.9);  // medium
        drawStars(60, 1.5, 1.0);   // big
    }, []);

    return (
        <div className="fixed inset-0 -z-20 overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#1B2735_0%,_#090A0F_100%)]">
            <style>{`
                @keyframes starScroll {
                    from { transform: translateY(0); }
                    to { transform: translateY(-50%); }
                }
            `}</style>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: 'auto',
                    animation: reducedMotion
                        ? 'none'
                        : 'starScroll 120s linear infinite',
                    imageRendering: 'pixelated',
                }}
            />
        </div>
    );
}
