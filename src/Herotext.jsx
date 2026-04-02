// components/HeroText.jsx
import React from 'react';
import { motion } from 'framer-motion';
import DottedLetter from './DottedLetter';
import { letterGrids } from './letterData';
import { FaGithub, FaLinkedin, FaFileAlt, FaFlask } from 'react-icons/fa';
import { profile } from './data/profile';
import FidelityLogo from './FidelityLogo';

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 1, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 18 },
  },
};

const linkItem = {
  hidden: { opacity: 1, y: 12 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.55 + i * 0.06, type: 'spring', stiffness: 200, damping: 22 },
  }),
};

const HeroText = () => {
  const firstName = 'SOHAM';
  const lastName = 'MHATRE';
  const portfolioDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const buttons = [
    { label: 'GitHub', icon: <FaGithub className="text-lg" />, link: profile.links.github },
    { label: 'LinkedIn', icon: <FaLinkedin className="text-lg" />, link: profile.links.linkedin },
    { label: 'Resume', icon: <FaFileAlt className="text-lg" />, link: profile.links.resumeDrive },
    { label: 'Research', icon: <FaFlask className="text-lg" />, link: 'https://ieeexplore.ieee.org/document/10674984/' },
  ];

  return (
    <motion.div
      className="relative z-30 flex w-full max-w-[42rem] flex-col items-center px-4 text-center"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.p
        variants={item}
        className="font-display mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/45 md:text-xs"
      >
        Portfolio · {portfolioDate}
      </motion.p>

      <div className="flex w-full flex-col items-center justify-center gap-4 md:gap-5">
        <div className="flex w-full justify-center gap-2 md:gap-3">
          {firstName.split('').map((char, idx) => (
            <motion.span key={`first-${idx}`} variants={item}>
              <DottedLetter grid={letterGrids[char]} />
            </motion.span>
          ))}
        </div>
        <div className="flex w-full justify-center gap-2 md:gap-3">
          {lastName.split('').map((char, idx) => (
            <motion.span key={`last-${idx}`} variants={item}>
              <DottedLetter grid={letterGrids[char]} />
            </motion.span>
          ))}
        </div>
      </div>

      <motion.div
        variants={item}
        className="mx-auto mt-8 w-full max-w-lg space-y-px px-1"
      >
        <p className="font-display text-lg font-semibold leading-snug text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)] md:text-2xl">
          {profile.title}
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 font-sans text-sm font-medium text-cyan-200/95 md:text-base">
          <FidelityLogo className="h-7 w-7 shrink-0 md:h-8 md:w-8" />
          <span className="whitespace-nowrap">{profile.company}</span>
          <span className="text-white/40">·</span>
          <span className="text-white/70">
            {profile.roleStart} – {profile.roleEnd}
          </span>
        </p>
      </motion.div>

      <motion.p
        variants={item}
        className="mx-auto mt-6 max-w-md font-sans text-sm font-light leading-relaxed text-white/65 md:text-base"
      >
        {profile.tagline}
      </motion.p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {buttons.map((b, i) => (
          <motion.a
            key={b.label}
            href={b.link}
            target="_blank"
            rel="noopener noreferrer"
            custom={i}
            variants={linkItem}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 font-sans text-sm font-medium text-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-md transition-colors hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white"
          >
            <span className="text-cyan-300/90 transition-colors group-hover:text-cyan-200">{b.icon}</span>
            {b.label}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default HeroText;
