import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaLinkedin,
  FaGithub,
  FaFileAlt,
} from "react-icons/fa";

const InfoSection = () => {
  const [time, setTime] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const indiaTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(indiaTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const leftIcons = [
    {
      icon: <FaSearch />,
      label: "Research",
      url: "https://ieeexplore.ieee.org/document/10674984",
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/sohammhatre10929be/",
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      url: "https://github.com/Sohammhatre10",
    },
    {
      icon: <FaFileAlt />,
      label: "Resume",
      url: "https://drive.google.com/file/d/1lGjofpeMlkli6hO9tRhXgpF8kalDbMMY/view?usp=sharing",
    },
  ];

  return (
    <div className="flex h-screen bg-black text-white relative">
      {/* Left Column */}
      <div className="w-1/2 border-r border-white flex flex-col justify-evenly pl-24 py-12">
        {leftIcons.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.label}
            className="flex items-center space-x-6 hover:text-cyan-400 transition duration-300"
          >
            <div className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center text-4xl shadow-md">
              {item.icon}
            </div>
            <span className="text-2xl font-medium">{item.label}</span>
          </a>
        ))}
      </div>

      {/* Right Column */}
      <div className="w-1/2 p-12 flex flex-col justify-between">
        {/* Top Bar */}
        <div className="flex justify-between items-start">
          <div className="text-4xl font-bold">
            <span className="bg-white text-black px-2">Soham Mhatre.</span>
          </div>
          <div
            className="text-xl font-serif cursor-pointer relative"
            onClick={() => setShowSidebar(true)}
          >
            Menu
            <span className="absolute left-0 top-0 w-full h-full border border-white"></span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-lg space-y-3">
          <p>+919324005150</p>
          <p>sohammhatre521@gmail.com</p>
        </div>

        {/* Map + Location Info */}
        <div className="space-y-4">
          <iframe
            src="https://maps.google.com/maps?q=Mumbai,%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="180"
            className="rounded-lg"
            loading="lazy"
          />
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold">Location</p>
              <p>Mumbai, India</p>
            </div>
            <div>
              <p className="font-semibold">India Time</p>
              <p>{time}</p>
            </div>
            <div>
              <p className="font-semibold">Status</p>
              <p className="text-green-400">● Available</p>
            </div>
          </div>
        </div>

        {/* Footer Logo */}
        <div className="text-3xl font-bold mt-6">SM.</div>
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 bg-white text-black z-50 p-8 transition-transform duration-500 ease-in-out">
          <button
            onClick={() => setShowSidebar(false)}
            className="mb-4 px-4 py-2 border border-black rounded hover:bg-black hover:text-white"
          >
            Close
          </button>
          <h2 className="text-2xl font-bold">GitHub Projects</h2>
          {/* Future Project Links here */}
        </div>
      )}
    </div>
  );
};

export default InfoSection;
