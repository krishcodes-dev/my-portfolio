import * as THREE from 'three';

class CameraProjectionService {
    private camera: THREE.Camera | null = null;
    private size: { width: number; height: number } | null = null;

    setCamera(camera: THREE.Camera, size: { width: number; height: number }) {
        this.camera = camera;
        this.size = size;
    }

    clear() {
        this.camera = null;
        this.size = null;
    }

    project(position3D: THREE.Vector3): { x: number; y: number; visible: boolean } {
        if (!this.camera || !this.size) {
            console.warn('⚠️ Camera or size not set');
            return { x: 0, y: 0, visible: false };
        }

        // Clone to avoid mutating original position
        const pos = position3D.clone();
        pos.project(this.camera);

        // Check if behind camera (NDC z > 1)
        const isBehindCamera = pos.z > 1;

        // Convert NDC to screen coordinates
        // NDC x is [-1, 1], y is [-1, 1] (y up)
        const x = (pos.x * 0.5 + 0.5) * this.size.width;
        const y = (-(pos.y * 0.5) + 0.5) * this.size.height;

        return { x, y, visible: !isBehindCamera };
    }
}

export const cameraProjection = new CameraProjectionService();
