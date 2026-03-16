import { create } from 'zustand';
import type { Vector3 } from 'three';

interface ScrollState {
    // The normalized progress of the transition (0 = Hero, 1 = Tech Center)
    scrollProgress: number;
    setScrollProgress: (progress: number) => void;

    // Interaction State
    isHeroHovered: boolean;
    setIsHeroHovered: (hovered: boolean) => void;

    // The simplified "Mode" (Hero vs Tech) for high-level switching
    mode: 'hero' | 'tech' | 'transition';
    setMode: (mode: 'hero' | 'tech' | 'transition') => void;
    hoveredTechId: string | null;
    setHoveredTechId: (id: string | null) => void;

    // 3D Position Tracking for CSS Overlay
    nodePositions: Map<string, Vector3>;
    updateNodePositions: (positions: Map<string, Vector3>) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
    scrollProgress: 0,
    setScrollProgress: (p) => set({ scrollProgress: p }),
    isHeroHovered: false,
    setIsHeroHovered: (v) => set({ isHeroHovered: v }),
    hoveredTechId: null,
    setHoveredTechId: (id) => set({ hoveredTechId: id }),
    mode: 'hero',
    setMode: (mode) => set({ mode }),

    nodePositions: new Map(),
    updateNodePositions: (positions) => set({ nodePositions: positions }),
}));
