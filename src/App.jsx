import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useState } from 'react';
import { FaSun, FaMoon } from "react-icons/fa";
import Earth from './Earth';
import HeroText from './Herotext';
import InfoSection from './InfoSection';
import GithubProjects from './GithubProjects';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div 
      className={`
        w-full h-screen overflow-y-scroll snap-y snap-mandatory 
        scroll-smooth scrollbar-hide font-serif 
        ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}
      `}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Theme Toggle Button - Fixed Position */}
      <button
        onClick={toggleDarkMode}
        className={`
          fixed top-6 right-6 z-50 p-4 rounded-full 
          shadow-lg transition-all duration-300
          ${isDarkMode 
            ? 'bg-white text-black hover:bg-gray-100' 
            : 'bg-black text-white hover:bg-gray-900'
          }
        `}
        style={{
          boxShadow: isDarkMode 
            ? '0 0 20px rgba(255, 255, 255, 0.2)' 
            : '0 0 20px rgba(0, 0, 0, 0.2)'
        }}
      >
        {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
      
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
            <Earth isDarkMode={isDarkMode} />
          </Suspense>
        </Canvas>
        <HeroText isDarkMode={isDarkMode} />
      </section>

      {/* Section 2: GitHub Projects */}
      <section className="w-full h-screen snap-start">
        <GithubProjects />
      </section>

      {/* Section 3: Info Section */}
      <section className="w-full h-screen snap-start">
        <InfoSection isDarkMode={isDarkMode} />
      </section>
    </div>
  );
}

export default App;
