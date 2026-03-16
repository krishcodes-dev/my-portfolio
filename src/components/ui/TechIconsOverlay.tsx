'use client';

import React from 'react';
import { useScrollStore } from '@/lib/store';
import { cameraProjection } from '@/lib/cameraProjection';
import { TECH_STACK_ACTIVE_THRESHOLD, TECH_STACK_END_THRESHOLD } from '@/lib/constants';
import { orbitTechData } from '@/lib/orbitTech';
import { iconMap } from '@/lib/techIcons';
import { FaReact } from "react-icons/fa";
import { useIsMobile } from '@/lib/hooks';

export function TechIconsOverlay() {
    const isMobile = useIsMobile();
    const { nodePositions, scrollProgress, hoveredTechId } = useScrollStore();

    if (isMobile) return null;
    if (nodePositions.size === 0) return null;

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
                const pos3D = nodePositions.get(tech.id);
                if (!pos3D) return null;

                const pos = cameraProjection.project(pos3D);
                if (!pos.visible) return null;

                const Icon = (iconMap[tech.id] || FaReact) as React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
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
