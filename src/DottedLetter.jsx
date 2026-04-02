// components/DottedLetter.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Dot = ({ filled, index }) => {
  if (!filled) {
    return <div className="h-3 w-3 rounded-full bg-transparent md:h-4 md:w-4" />;
  }
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0.7 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: index * 0.012,
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-3 w-3 rounded-full bg-white shadow-[0_0_8px_2px_rgba(165,243,252,0.35)] md:h-4 md:w-4"
    />
  );
};

const DottedLetter = ({ grid }) => {
  if (!grid?.flat) return null;
  return (
    <div className="grid grid-cols-5 gap-1 md:gap-1.5">
      {grid.flat().map((cell, index) => (
        <Dot key={index} filled={cell === 1} index={index} />
      ))}
    </div>
  );
};

export default DottedLetter;
