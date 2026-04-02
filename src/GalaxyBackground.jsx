import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function StarField() {
  return (
    <>
      <color attach="background" args={['#020204']} />
      <Stars
        radius={140}
        depth={90}
        count={9000}
        factor={5.5}
        saturation={0.12}
        fade
        speed={0.35}
      />
    </>
  );
}

/**
 * Full-bleed starfield behind the hero (replaces missing public/galaxy.glb for Earth.jsx).
 * pointer-events-none so scrolling and links keep working.
 */
export default function GalaxyBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full min-h-[100vh] w-full">
      <Canvas
        className="h-full w-full"
        gl={{ alpha: false, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
      </Canvas>
      {/* Soft vignette so dotted name stays readable */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_35%,transparent_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.92)_100%)]"
        aria-hidden
      />
    </div>
  );
}
