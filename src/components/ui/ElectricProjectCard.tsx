'use client';

import React from 'react';

const ELECTRIC_COLOR = '#0ea5e9';

export function ElectricProjectCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`relative group ${className}`}>
            {/* Main Container */}
            <div className="relative z-10 rounded-3xl bg-transparent">
                {/* Simple Electric Border (Always visible on hover for testing) */}
                <div className="absolute inset-[-2px] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl">
                    {/* Multiple animated borders for lightning effect */}
                    <div
                        className="absolute inset-0 rounded-3xl animate-pulse"
                        style={{
                            border: `2px solid ${ELECTRIC_COLOR}`,
                            boxShadow: `0 0 20px ${ELECTRIC_COLOR}, inset 0 0 20px ${ELECTRIC_COLOR}`,
                        }}
                    />
                    <div
                        className="absolute inset-0 rounded-3xl blur-sm"
                        style={{
                            border: `2px solid ${ELECTRIC_COLOR}`,
                            opacity: 0.7,
                        }}
                    />
                    <div
                        className="absolute inset-0 rounded-3xl blur-md"
                        style={{
                            border: `3px solid ${ELECTRIC_COLOR}`,
                            opacity: 0.5,
                        }}
                    />
                    <div
                        className="absolute inset-0 rounded-3xl blur-xl"
                        style={{
                            background: `radial-gradient(circle at center, ${ELECTRIC_COLOR}30 0%, transparent 70%)`,
                        }}
                    />
                </div>

                {/* Content Wrapper */}
                <div className="relative z-10 bg-white/[0.03] backdrop-blur-md rounded-3xl p-8 border border-white/5 h-full group-hover:bg-white/[0.05] group-hover:border-sky-500/20 transition-all duration-300">
                    {children}
                </div>
            </div>
        </div>
    );
}
