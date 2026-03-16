"use client";

import dynamic from "next/dynamic";

// These are all client-only, canvas/3D/cursor components.
// Loaded via dynamic import to defer the heavy Three.js + GSAP bundles
// until after the initial page paint.
const FixedBackgroundCanvas = dynamic(
  () => import("@/components/orbital/FixedBackgroundCanvas"),
  { ssr: false }
);
const OrbitalSystem = dynamic(() => import("@/components/OrbitalSystem"), {
  ssr: false,
});
const TechInfoPanel = dynamic(
  () => import("@/components/ui/TechInfoPanel").then((m) => ({ default: m.TechInfoPanel })),
  { ssr: false }
);
const TechStackTitle = dynamic(
  () => import("@/components/ui/TechStackTitle").then((m) => ({ default: m.TechStackTitle })),
  { ssr: false }
);
const TechIconsOverlay = dynamic(
  () => import("@/components/ui/TechIconsOverlay").then((m) => ({ default: m.TechIconsOverlay })),
  { ssr: false }
);
const StarBackground = dynamic(
  () => import("@/components/canvas/StarBackground").then((m) => ({ default: m.StarBackground })),
  { ssr: false }
);

export default function ClientCanvas() {
  return (
    <>
      <StarBackground />
      <FixedBackgroundCanvas />
      <TechStackTitle />
      <TechInfoPanel />
      <TechIconsOverlay />
    </>
  );
}
