"use client";

import dynamic from "next/dynamic";

const OrbitalSystem = dynamic(() => import("@/components/OrbitalSystem"), {
  ssr: false,
});

export default OrbitalSystem;
