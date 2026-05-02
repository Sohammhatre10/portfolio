import React, { useMemo } from 'react';
import HeroText from './Herotext';
import InfoSection from './InfoSection';
import GithubProjects from './GithubProjects';
import Iridescence from './Iridescence';
import GalaxyBackground from './GalaxyBackground';
import ExperienceQuest from './ExperienceQuest';

function App() {
  const iridColor = useMemo(() => [0.85, 0.85, 0.85], []);

  return (
    <div
      className="relative w-full h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth scrollbar-hide font-sans text-white antialiased bg-black"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-20"
        style={{
          background: "url('https://www.transparenttextures.com/patterns/stardust.png')",
        }}
      />
      {/* Section 1: Galaxy + hero (name centered in viewport) + Iridescence anchored bottom */}
      <section className="relative min-h-screen overflow-hidden snap-start">
        <GalaxyBackground />
        <div className="relative z-30 flex min-h-screen w-full flex-col items-center justify-center px-4">
          <HeroText />
        </div>
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 justify-center animate-float-soft md:bottom-8">
          <Iridescence color={iridColor} amplitude={0.15} speed={1.2} ring={true} size={280} />
        </div>
      </section>

      {/* Section 2: GitHub Projects */}
      <section className="w-full min-h-screen snap-start overflow-hidden">
        <GithubProjects />
      </section>

      {/* Section 3: Experience Quest */}
      <section className="w-full min-h-screen snap-start">
        <ExperienceQuest />
      </section>

      {/* Section 4: Info Section */}
      <section className="w-full min-h-screen snap-start">
        <InfoSection />
      </section>
    </div>
  );
}

export default App;
