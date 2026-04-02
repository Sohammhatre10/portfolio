import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaLinkedin, FaGithub, FaFileAlt } from "react-icons/fa";
import { profile } from "./data/profile";
import FidelityLogo from "./FidelityLogo";

const InfoSection = () => {
  const [time, setTime] = useState("");

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
      url: profile.links.linkedin,
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      url: profile.links.github,
    },
    {
      icon: <FaFileAlt />,
      label: "Resume",
      url: profile.links.resumeDrive,
    },
  ];

  return (
    <section className="relative min-h-screen bg-black text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent"
        aria-hidden
      />
      <div className="container mx-auto flex h-full items-center justify-center px-4 lg:px-8">
        <div className="flex w-full max-w-7xl flex-col gap-10 py-14 lg:flex-row lg:gap-12 lg:py-12">
          <motion.div
            className="flex flex-col justify-evenly space-y-8 border-white/10 pr-0 lg:w-1/2 lg:border-r lg:pr-10"
            initial={{ opacity: 1, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {leftIcons.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={item.label}
                initial={{ opacity: 1, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.08 * idx, duration: 0.45 }}
                whileHover={{ x: 6 }}
                className="group flex items-center gap-6 md:gap-8"
              >
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/5 text-2xl text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.15)] md:h-20 md:w-20 md:text-3xl">
                  <span className="relative z-10">{item.icon}</span>
                </div>
                <span className="font-display text-lg font-semibold tracking-tight text-white/90 transition-colors group-hover:text-cyan-200 md:text-xl">
                  {item.label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col justify-between space-y-10 pl-0 lg:w-1/2 lg:pl-10"
            initial={{ opacity: 1, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <motion.div
                className="font-display inline-block text-3xl font-bold tracking-tight md:text-4xl"
                initial={{ opacity: 1, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.1 }}
              >
                <span className="relative rounded-lg bg-gradient-to-r from-white to-white/85 px-4 py-2 text-black shadow-[0_0_40px_rgba(255,255,255,0.12)]">
                  {profile.shortName}.
                </span>
              </motion.div>
              <p className="mt-3 font-display text-base font-semibold text-white/90 md:text-lg">
                {profile.title}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 md:gap-2.5">
                <FidelityLogo className="h-7 w-7 shrink-0 md:h-8 md:w-8" />
                <p className="font-display text-base font-semibold text-cyan-200/90 md:text-lg">
                  {profile.company}
                </p>
              </div>
              <p className="mt-2 max-w-md font-sans text-sm font-light text-white/55 md:text-base">
                {profile.education.degree}, {profile.education.school} ({profile.education.year}, CPI{" "}
                {profile.education.cpi}). 
              </p>
            </div>

            <div className="space-y-3 font-sans text-lg md:text-xl">
              <motion.p
                className="text-white/85 transition-colors hover:text-cyan-200/90"
                whileHover={{ x: 4 }}
              >
                +919324005150
              </motion.p>
              <motion.p
                className="text-white/85 transition-colors hover:text-cyan-200/90"
                whileHover={{ x: 4 }}
              >
                sohammhatre521@gmail.com
              </motion.p>
            </div>

            <div className="space-y-6">
              <motion.div
                className="overflow-hidden rounded-xl border border-white/10 shadow-[0_12px_48px_rgba(0,0,0,0.45)]"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    profile.location
                  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="200"
                  className="rounded-xl"
                  loading="lazy"
                  title={`Map — ${profile.location}`}
                />
              </motion.div>
              <div className="grid grid-cols-1 gap-6 text-base sm:grid-cols-3 sm:gap-8">
                <div>
                  <p className="font-display mb-2 text-xs font-semibold uppercase tracking-widest text-white/40">
                    Location
                  </p>
                  <p className="font-sans text-white/80">{profile.location}</p>
                </div>
                <div>
                  <p className="font-display mb-2 text-xs font-semibold uppercase tracking-widest text-white/40">
                    India Time
                  </p>
                  <p className="font-sans tabular-nums text-white/80">{time}</p>
                </div>
                <div>
                  <p className="font-display mb-2 text-xs font-semibold uppercase tracking-widest text-white/40">
                    Status
                  </p>
                  <p className="font-sans text-emerald-400/95">
                    <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                    Available
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              className="font-display text-4xl font-extrabold tracking-tighter text-white/12 md:text-5xl"
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.3 }}
            >
              SM.
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
