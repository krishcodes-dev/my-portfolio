'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useScrollStore } from '@/lib/store';
import { cameraProjection } from '@/lib/cameraProjection';
import { TECH_STACK_ACTIVE_THRESHOLD, TECH_STACK_END_THRESHOLD } from '@/lib/constants';
import { orbitTechData } from '@/lib/orbitTech';
import { iconMap } from '@/lib/techIcons';
import { FaReact } from "react-icons/fa";

export function TechIconsOverlay() {
    const [isMobile, setIsMobile] = useState(false);
    const [projectedPositions, setProjectedPositions] = useState<Map<string, { x: number; y: number; visible: boolean }>>(new Map());
    const rafRef = useRef<number | undefined>(undefined);

    // Store State
    const { nodePositions, scrollProgress, hoveredTechId } = useScrollStore();

    // Check Mobile
    useEffect(() => {
        const check = () => {
            setIsMobile(
                window.matchMedia('(hover: none)').matches ||
                window.innerWidth < 768
            );
        };
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // RAF Loop - ALWAYS RUNNING (not dependent on nodePositions)
    useEffect(() => {
        if (isMobile) return;

        const updateProjections = () => {
            const newPositions = new Map();

            // Get current nodePositions from store
            const currentNodePositions = useScrollStore.getState().nodePositions;

            if (currentNodePositions.size > 0) {
                currentNodePositions.forEach((pos3D, techId) => {
                    const pos2D = cameraProjection.project(pos3D);
                    newPositions.set(techId, pos2D);
                });

                setProjectedPositions(newPositions);
            }

            rafRef.current = requestAnimationFrame(updateProjections);
        };

        rafRef.current = requestAnimationFrame(updateProjections);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [isMobile]); // Only depend on isMobile

    // Early returns
    if (isMobile) return null;
    if (projectedPositions.size === 0) return null; // No projections yet

    // Visibility Logic
    const isInteractive =
        scrollProgress >= TECH_STACK_ACTIVE_THRESHOLD &&
        scrollProgress <= TECH_STACK_END_THRESHOLD;

    const shouldShow = scrollProgress > 0.25 && scrollProgress <= TECH_STACK_END_THRESHOLD + 0.1;

    return (
        <div
            className="fixed inset-0 pointer-events-none z-10"
            style={{
                opacity: shouldShow ? 1 : 0,
                transition: 'opacity 0.5s ease',
            }}
        >
            {orbitTechData.map((tech) => {
                const pos = projectedPositions.get(tech.id);
                const Icon = (iconMap[tech.id] || FaReact) as React.ComponentType<{ size?: number; style?: React.CSSProperties }>;

                if (!pos || !pos.visible) return null;

                const isHovered = hoveredTechId === tech.id;

                return (
                    <div
                        key={tech.id}
                        className="tech-icon-wrapper"
                        style={{
                            position: 'absolute',
                            left: `${pos.x}px`,
                            top: `${pos.y}px`,
                            transform: `translate(-50%, -50%) scale(${isHovered ? 1.3 : 1})`,
                            transition: 'transform 0.3s ease-out, opacity 0.3s ease',
                            opacity: isInteractive ? 1 : 0.7,
                            color: tech.color,
                            filter: `drop-shadow(0 0 8px ${tech.color})`,
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            pointerEvents: isInteractive ? 'auto' : 'none',

                            // Visual debug background
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            borderRadius: '50%',
                            border: `2px solid ${tech.color}`,
                        }}
                    >
                        <Icon size={28} style={{ color: tech.color }} />
                    </div>
                );
            })}
        </div>
    );
}
