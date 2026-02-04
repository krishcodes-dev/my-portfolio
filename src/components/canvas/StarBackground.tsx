'use client';

import { useEffect, useState } from 'react';

// Starry background using pure CSS box-shadows
// Adapted from CodePen: https://codepen.io/saransh/pen/BKJun
export function StarBackground() {
    const [shadows, setShadows] = useState({
        small: '',
        medium: '',
        big: '',
    });

    useEffect(() => {
        // Generate random star coordinates
        const generateStars = (n: number) => {
            let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
            for (let i = 2; i <= n; i++) {
                value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
            }
            return value;
        };

        setShadows({
            small: generateStars(700),
            medium: generateStars(200),
            big: generateStars(100),
        });
    }, []);

    if (!shadows.small) return null; // Prevent hydration mismatch

    return (
        <div className="fixed inset-0 -z-20 overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#1B2735_0%,_#090A0F_100%)]">
            {/* Stars Small */}
            <div
                className="animate-star-anim absolute w-[1px] h-[1px] bg-transparent after:content-[''] after:absolute after:top-[2000px] after:w-[1px] after:h-[1px] after:bg-transparent"
                style={{
                    boxShadow: shadows.small,
                    animationDuration: '50s',
                }}
            >
                <style jsx>{`
            .animate-star-anim:after { box-shadow: ${shadows.small}; }
        `}</style>
            </div>

            {/* Stars Medium */}
            <div
                className="animate-star-anim absolute w-[2px] h-[2px] bg-transparent after:content-[''] after:absolute after:top-[2000px] after:w-[2px] after:h-[2px] after:bg-transparent"
                style={{
                    boxShadow: shadows.medium,
                    animationDuration: '100s',
                }}
            >
                <style jsx>{`
            .animate-star-anim:after { box-shadow: ${shadows.medium}; }
        `}</style>
            </div>

            {/* Stars Big */}
            <div
                className="animate-star-anim absolute w-[3px] h-[3px] bg-transparent after:content-[''] after:absolute after:top-[2000px] after:w-[3px] after:h-[3px] after:bg-transparent"
                style={{
                    boxShadow: shadows.big,
                    animationDuration: '150s',
                }}
            >
                <style jsx>{`
            .animate-star-anim:after { box-shadow: ${shadows.big}; }
        `}</style>
            </div>
        </div>
    );
}
