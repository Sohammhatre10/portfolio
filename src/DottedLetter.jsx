// components/DottedLetter.jsx
import React from 'react';

const Dot = ({ filled }) => (
    <div
      className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition
        ${filled ? 'bg-white shadow-[0_0_5px_2px_rgba(255,255,255,0.5)]' : 'bg-transparent'}
      `}
    />
  );
  

const DottedLetter = ({ grid }) => (
  <div className="grid grid-cols-5 gap-1 md:gap-1.5">
    {grid.flat().map((cell, index) => (
      <Dot key={index} filled={cell === 1} />
    ))}
  </div>
);

export default DottedLetter;
