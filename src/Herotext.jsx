// components/HeroText.jsx
import React from 'react';
import DottedLetter from './DottedLetter';
import { letterGrids } from './letterData';
import { FaGithub, FaLinkedin, FaFileAlt, FaFlask } from 'react-icons/fa';

const HeroText = () => {
  const firstName = 'SOHAM';
  const lastName = 'MHATRE';

  const buttons = [
    { label: 'GitHub', icon: <FaGithub />, link: 'https://github.com/Sohammhatre10' },
    { label: 'LinkedIn', icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/sohammhatre10929be/' },
    { label: 'Resume', icon: <FaFileAlt />, link: 'https://drive.google.com/file/d/1lGjofpeMlkli6hO9tRhXgpF8kalDbMMY/view?usp=sharing' },
    { label: 'Research', icon: <FaFlask />, link: 'https://ieeexplore.ieee.org/document/10674984/' },
  ];

  return (
    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center space-y-4">

      {/* First Name */}
      <div className="flex justify-center gap-3">
        {firstName.split('').map((char, idx) => (
          <DottedLetter key={`first-${idx}`} grid={letterGrids[char]} />
        ))}
      </div>

      {/* Last Name */}
      <div className="flex justify-center gap-3">
        {lastName.split('').map((char, idx) => (
          <DottedLetter key={`last-${idx}`} grid={letterGrids[char]} />
        ))}
      </div>
    </div>
  );
};

export default HeroText;
