'use client';

import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { cameraProjection } from '@/lib/cameraProjection';

export function CameraBridge() {
    const { camera, size } = useThree();

    useEffect(() => {
        // Update the singleton service with the current camera and canvas size
        cameraProjection.setCamera(camera, size);

        // Cleanup on unmount
        return () => cameraProjection.clear();
    }, [camera, size]);

    return null;
}
