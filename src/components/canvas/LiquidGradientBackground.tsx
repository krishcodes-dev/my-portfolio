'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function LiquidGradientBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<{
        renderer?: THREE.WebGLRenderer;
        scene?: THREE.Scene;
        camera?: THREE.PerspectiveCamera;
        clock?: THREE.Clock;
        touchTexture?: any;
        gradientMesh?: THREE.Mesh;
        animationId?: number;
    }>({});

    useEffect(() => {
        if (!containerRef.current) return;

        // TouchTexture class
        class TouchTexture {
            size: number;
            width: number;
            height: number;
            maxAge: number;
            radius: number;
            speed: number;
            trail: any[];
            last: any;
            canvas: HTMLCanvasElement;
            ctx: CanvasRenderingContext2D;
            texture: THREE.Texture;

            constructor() {
                this.size = 64;
                this.width = this.height = this.size;
                this.maxAge = 64;
                this.radius = 0.15 * this.size;
                this.speed = 1 / this.maxAge;
                this.trail = [];
                this.last = null;

                this.canvas = document.createElement('canvas');
                this.canvas.width = this.width;
                this.canvas.height = this.height;
                this.ctx = this.canvas.getContext('2d')!;
                this.ctx.fillStyle = 'black';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                this.texture = new THREE.Texture(this.canvas);
            }

            update() {
                this.clear();
                const speed = this.speed;

                for (let i = this.trail.length - 1; i >= 0; i--) {
                    const point = this.trail[i];
                    const f = point.force * speed * (1 - point.age / this.maxAge);
                    point.x += point.vx * f;
                    point.y += point.vy * f;
                    point.age++;

                    if (point.age > this.maxAge) {
                        this.trail.splice(i, 1);
                    } else {
                        this.drawPoint(point);
                    }
                }

                this.texture.needsUpdate = true;
            }

            clear() {
                this.ctx.fillStyle = 'black';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }

            addTouch(point: { x: number; y: number }) {
                let force = 0;
                let vx = 0;
                let vy = 0;
                const last = this.last;

                if (last) {
                    const dx = point.x - last.x;
                    const dy = point.y - last.y;
                    if (dx === 0 && dy === 0) return;
                    const dd = dx * dx + dy * dy;
                    const d = Math.sqrt(dd);
                    vx = dx / d;
                    vy = dy / d;
                    force = Math.min(dd * 10000, 1.0);
                }

                this.last = { x: point.x, y: point.y };
                this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
            }

            drawPoint(point: any) {
                const pos = {
                    x: point.x * this.width,
                    y: (1 - point.y) * this.height
                };

                let intensity = 1;
                if (point.age < this.maxAge * 0.3) {
                    intensity = Math.sin((point.age / (this.maxAge * 0.3)) * (Math.PI / 2));
                } else {
                    const t = 1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7);
                    intensity = -t * (t - 2);
                }
                intensity *= point.force;

                const radius = this.radius;
                const color = `${((point.vx + 1) / 2) * 255}, ${((point.vy + 1) / 2) * 255}, ${intensity * 255}`;
                const offset = this.size * 5;

                this.ctx.shadowOffsetX = offset;
                this.ctx.shadowOffsetY = offset;
                this.ctx.shadowBlur = radius * 1;
                this.ctx.shadowColor = `rgba(${color},${0.2 * intensity})`;

                this.ctx.beginPath();
                this.ctx.fillStyle = 'rgba(255,0,0,1)';
                this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }

        // Initialize Three.js scene
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
        });
        const isMobile = window.innerWidth < 768;
        renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        );
        camera.position.z = 50;

        const clock = new THREE.Clock();
        const touchTexture = new TouchTexture();

        // Create gradient material with space theme colors
        const uniforms = {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uColor1: { value: new THREE.Vector3(0.1, 0.2, 0.8) }, // Deep Blue
            uColor2: { value: new THREE.Vector3(0.5, 0.1, 0.8) }, // Purple
            uColor3: { value: new THREE.Vector3(0.1, 0.4, 0.9) }, // Cyan Blue
            uColor4: { value: new THREE.Vector3(0.02, 0.02, 0.1) }, // Dark Navy
            uColor5: { value: new THREE.Vector3(0.3, 0.1, 0.6) }, // Dark Purple
            uColor6: { value: new THREE.Vector3(0.05, 0.15, 0.3) }, // Deep Space Blue
            uSpeed: { value: 0.8 },
            uIntensity: { value: 1.2 },
            uTouchTexture: { value: touchTexture.texture },
            uGrainIntensity: { value: 0.05 },
        };

        const getViewSize = () => {
            const fovInRadians = (camera.fov * Math.PI) / 180;
            const height = Math.abs(camera.position.z * Math.tan(fovInRadians / 2) * 2);
            return { width: height * camera.aspect, height };
        };

        const viewSize = getViewSize();
        const geometry = new THREE.PlaneGeometry(viewSize.width, viewSize.height, 1, 1);

        const material = new THREE.ShaderMaterial({
            uniforms,
            transparent: true,
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vec3 pos = position.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
          vUv = uv;
        }
      `,
            fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;
        uniform vec3 uColor5;
        uniform vec3 uColor6;
        uniform float uSpeed;
        uniform float uIntensity;
        uniform sampler2D uTouchTexture;
        uniform float uGrainIntensity;
        
        varying vec2 vUv;
        
        float grain(vec2 uv, float time) {
          vec2 grainUv = uv * uResolution * 0.5;
          return fract(sin(dot(grainUv + time, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
        }
        
        vec3 getGradientColor(vec2 uv, float time) {
          vec2 center1 = vec2(0.5 + sin(time * uSpeed * 0.3) * 0.3, 0.5 + cos(time * uSpeed * 0.4) * 0.3);
          vec2 center2 = vec2(0.5 + cos(time * uSpeed * 0.5) * 0.4, 0.5 + sin(time * uSpeed * 0.35) * 0.4);
          vec2 center3 = vec2(0.5 + sin(time * uSpeed * 0.25) * 0.35, 0.5 + cos(time * uSpeed * 0.45) * 0.35);
          
          float dist1 = length(uv - center1);
          float dist2 = length(uv - center2);
          float dist3 = length(uv - center3);
          
          float influence1 = 1.0 - smoothstep(0.0, 0.7, dist1);
          float influence2 = 1.0 - smoothstep(0.0, 0.7, dist2);
          float influence3 = 1.0 - smoothstep(0.0, 0.7, dist3);
          
          vec3 color = vec3(0.0);
          color += uColor1 * influence1 * (0.5 + 0.5 * sin(time * uSpeed));
          color += uColor2 * influence2 * (0.5 + 0.5 * cos(time * uSpeed * 1.2));
          color += uColor3 * influence3 * (0.5 + 0.5 * sin(time * uSpeed * 0.8));
          color += uColor4 * 0.3;
          color += uColor5 * influence1 * 0.2;
          color += uColor6 * influence2 * 0.2;
          
          return clamp(color * uIntensity, vec3(0.0), vec3(1.0));
        }
        
        void main() {
          vec2 uv = vUv;
          
          vec4 touchTex = texture2D(uTouchTexture, uv);
          float vx = -(touchTex.r * 2.0 - 1.0);
          float vy = -(touchTex.g * 2.0 - 1.0);
          float intensity = touchTex.b;
          
          // CodePen Reference: Stronger distortion (0.8)
          uv.x += vx * 0.8 * intensity;
          uv.y += vy * 0.8 * intensity;
          
          vec3 color = getGradientColor(uv, uTime);
          color += grain(uv, uTime) * uGrainIntensity;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
        });

        const gradientMesh = new THREE.Mesh(geometry, material);
        gradientMesh.position.z = -5;
        scene.add(gradientMesh);

        // Store refs
        sceneRef.current = {
            renderer,
            scene,
            camera,
            clock,
            touchTexture,
            gradientMesh,
        };

        // Animation loop
        const animate = () => {
            const delta = clock.getDelta();
            uniforms.uTime.value += delta;
            touchTexture.update();
            renderer.render(scene, camera);
            sceneRef.current.animationId = requestAnimationFrame(animate);
        };
        animate();

        // Mouse move handler
        const handleMouseMove = (ev: MouseEvent) => {
            const mouse = {
                x: ev.clientX / window.innerWidth,
                y: 1 - ev.clientY / window.innerHeight,
            };
            touchTexture.addTouch(mouse);
        };

        // Resize handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            const isMobile = window.innerWidth < 768;
            renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
            renderer.setSize(window.innerWidth, window.innerHeight);

            uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);

            if (sceneRef.current.animationId) {
                cancelAnimationFrame(sceneRef.current.animationId);
            }

            if (sceneRef.current.renderer && containerRef.current) {
                containerRef.current.removeChild(sceneRef.current.renderer.domElement);
                sceneRef.current.renderer.dispose();
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 -z-20"
            style={{ pointerEvents: 'none' }}
        />
    );
}
