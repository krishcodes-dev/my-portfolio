import { useState, useEffect } from 'react';

/**
 * Returns true on touch/mobile devices (pointer: coarse) or narrow viewports.
 * SSR-safe: initializes to false and updates after mount.
 */
export function useIsMobile(breakpoint = 768): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => {
            setIsMobile(
                window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
                window.innerWidth < breakpoint
            );
        };
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, [breakpoint]);

    return isMobile;
}
