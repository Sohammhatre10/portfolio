import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import Earth from './Earth';
import HeroText from './Herotext';
import InfoSection from './InfoSection';

function App() {
  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth font-serif bg-zinc-950">
      
      {/* Section 1: Earth + HeroText */}
      <section className="relative w-full h-screen snap-start">
        <Canvas
          frameloop="always"
          dpr={[1, 1.5]}
          gl={{ antialias: true }}
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <Earth />
          </Suspense>
        </Canvas>
        <HeroText />
      </section>

      {/* Section 2: InfoSection */}
      <section className="w-full h-screen snap-start">
        <InfoSection />
      </section>
    </div>
  );
}

export default App;
