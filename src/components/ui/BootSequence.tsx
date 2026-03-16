"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

type Phase = "idle" | "igniting" | "liftoff";

// ─── Flame canvas ─────────────────────────────────────────────────────────────
// Uses globalCompositeOperation:"lighter" (additive blend) instead of an SVG
// feGaussianBlur filter — GPU-composited, zero per-frame CPU blur cost.
function RocketFlame({ phase }: { phase: Phase }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const phaseRef  = useRef<Phase>(phase);

    useEffect(() => { phaseRef.current = phase; }, [phase]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rawCtx = canvas.getContext("2d");
        if (!rawCtx) return;
        const ctx = rawCtx;

        const W = 80, H = 160;
        canvas.width  = W;
        canvas.height = H;

        // Additive blending: overlapping warm colors naturally brighten to white-yellow core
        ctx.globalCompositeOperation = "lighter";

        type Particle = {
            x: number; y: number;
            vx: number; vy: number;
            r: number;
            // hue in [0..40] red→orange→yellow
            hue: number;
            alpha: number;
        };
        const flames: Particle[] = [];
        const OX = W / 2; // origin X — center of canvas
        const OY = 10;    // origin Y — near top of canvas (bottom of rocket)

        function spawn(speed: number) {
            const spread = phaseRef.current === "liftoff" ? 0.55 : 0.35;
            const angle  = Math.PI / 2 + (Math.random() - 0.5) * spread;
            flames.push({
                x:     OX + (Math.random() - 0.5) * 6,
                y:     OY,
                vx:    speed * Math.cos(angle),
                vy:    speed * Math.sin(angle),
                r:     6 + Math.random() * 8,
                hue:   Math.random() * 40,   // 0=red 20=orange 40=yellow
                alpha: 0.55 + Math.random() * 0.45,
            });
        }

        let animId: number;
        function loop() {
            ctx.clearRect(0, 0, W, H);
            const p = phaseRef.current;

            // Spawn new particles based on phase
            if (p === "igniting") {
                if (Math.random() > 0.45) spawn(1.2 + Math.random() * 0.8);
                if (Math.random() > 0.65) spawn(1.0 + Math.random() * 0.8);
            } else if (p === "liftoff") {
                spawn(2.2 + Math.random() * 2);
                spawn(2.0 + Math.random() * 2);
                if (Math.random() > 0.25) spawn(2.5 + Math.random() * 2);
            }

            // Update & draw each particle
            for (let i = flames.length - 1; i >= 0; i--) {
                const f = flames[i];
                f.vx *= 1.008;
                f.vy *= 1.03;
                f.x  += f.vx;
                f.y  += f.vy;
                f.r  -= 0.32;
                f.alpha -= 0.008;

                if (f.r <= 0.5 || f.alpha <= 0 || f.y > H + 8) {
                    flames.splice(i, 1);
                    continue;
                }

                // Radial gradient per particle: hot center → transparent edge
                const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
                grad.addColorStop(0,   `hsla(${f.hue}, 100%, 80%, ${f.alpha})`);
                grad.addColorStop(0.5, `hsla(${f.hue}, 100%, 55%, ${f.alpha * 0.6})`);
                grad.addColorStop(1,   `hsla(${f.hue}, 100%, 40%, 0)`);

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
                ctx.fill();
            }

            animId = requestAnimationFrame(loop);
        }
        loop();
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ zIndex: 10, position: "absolute", bottom: "-148px", left: "50%", transform: "translateX(-50%)" }}
            className="w-[80px] h-[160px] pointer-events-none"
        />
    );
}

// ─── Boot messages ─────────────────────────────────────────────────────────────
const SEQUENCE = [
    "Booting KrishOS v2.0…",
    "Resolving dependency conflicts…",
    "Debugging life choices…",
    "Compiling ambitious ideas…",
    "Running unit tests on reality…",
    "Warning: Coffee levels critical.",
    "All systems nominal. Launch ready.",
];

// ─── Main component ────────────────────────────────────────────────────────────
export function BootSequence() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [logs,    setLogs]    = useState<string[]>([]);
    const [phase,   setPhase]   = useState<Phase>("idle");
    // Prevent replaying on soft navigation back to "/"
    const hasPlayed = useRef(false);

    const dismiss = () => {
        setVisible(false);
        document.body.style.overflow = "";
        if ((window as any).lenis) (window as any).lenis.start();
    };

    useEffect(() => {
        setMounted(true);

        if (pathname !== "/" || hasPlayed.current) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        hasPlayed.current = true;
        setVisible(true);
        setLogs([]);
        setPhase("idle");
        document.body.style.overflow = "hidden";
        if ((window as any).lenis) (window as any).lenis.stop();

        let idx = 0;
        const iv = setInterval(() => {
            if (idx < SEQUENCE.length) {
                const msg = SEQUENCE[idx];
                setLogs(prev => (prev.includes(msg) ? prev : [...prev, msg]));
                if (idx === SEQUENCE.length - 2) setPhase("igniting");
                idx++;
            }
            if (idx >= SEQUENCE.length) {
                clearInterval(iv);
                setTimeout(() => {
                    setPhase("liftoff");
                    setTimeout(dismiss, 560);
                }, 260);
            }
        }, 260);

        return () => {
            clearInterval(iv);
            document.body.style.overflow = "";
            if ((window as any).lenis) (window as any).lenis.start();
        };
    }, [pathname]);

    if (!mounted || pathname !== "/") return null;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="boot"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-[#050508] flex items-center justify-center overflow-hidden"
                    style={{ willChange: "opacity" }}
                >
                    {/* Background vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(20,20,40,0.55)_0%,rgba(5,5,8,1)_70%)] pointer-events-none" />

                    {/* Skip */}
                    <button
                        onClick={dismiss}
                        className="absolute bottom-6 right-6 text-xs font-mono text-neutral-600 hover:text-neutral-300 transition-colors z-10"
                    >
                        skip →
                    </button>

                    <div className="relative w-full max-w-3xl px-8 flex flex-col md:flex-row items-center gap-12 md:gap-28">

                        {/* ── Terminal (left) ── */}
                        <div className="flex-1 w-full min-h-[220px] flex flex-col justify-center">
                            {logs.map((log, i) => (
                                <motion.p
                                    key={log}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className={`font-mono text-xs md:text-sm mb-2.5 tracking-wide leading-relaxed ${
                                        i === logs.length - 1
                                            ? "text-neutral-200"
                                            : "text-neutral-500"
                                    }`}
                                >
                                    <span className="text-emerald-500/75 mr-2.5">❯</span>
                                    {log}
                                    {i === logs.length - 1 && (
                                        <motion.span
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.75 }}
                                            className="ml-1 inline-block w-[5px] h-[12px] bg-neutral-400 align-middle"
                                        />
                                    )}
                                </motion.p>
                            ))}
                        </div>

                        {/* ── Rocket (right) ── */}
                        <div className="flex-shrink-0 flex justify-center items-center w-[130px] h-[220px]">
                            <motion.div
                                // liftoff uses Framer Motion; idle/igniting use CSS classes
                                animate={
                                    phase === "liftoff"
                                        ? { y: -560, scale: 0.85 }
                                        : { y: phase === "idle" ? [0, -5, 0] : 0 }
                                }
                                transition={
                                    phase === "liftoff"
                                        ? { duration: 0.5, ease: [0.45, 0, 0.1, 1] }
                                        : { repeat: Infinity, duration: 3.2, ease: "easeInOut" }
                                }
                                // CSS keyframe shake during ignition — cheaper than FM keyframes
                                className={`relative flex flex-col items-center${
                                    phase === "igniting" ? " rocket-shake" : ""
                                }`}
                                style={{ willChange: "transform" }}
                            >
                                {/* Pixel rocket image */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/pixel-rocket.png"
                                    alt="rocket"
                                    width={110}
                                    height={110}
                                    draggable={false}
                                    style={{
                                        imageRendering: "pixelated",
                                        position: "relative",
                                        zIndex: 20,
                                        userSelect: "none",
                                    }}
                                />

                                {/* Canvas flame — always mounted; phase controls particle emission */}
                                <RocketFlame phase={phase} />

                                {/* Engine glow halo */}
                                <motion.div
                                    animate={{
                                        opacity: phase === "liftoff" ? 1 : phase === "igniting" ? 0.55 : 0,
                                        scale:   phase === "liftoff" ? 1.5 : 1,
                                    }}
                                    transition={{ duration: 0.25 }}
                                    className="absolute bottom-0 w-16 h-8 bg-orange-400/40 rounded-full blur-xl pointer-events-none"
                                />
                            </motion.div>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
