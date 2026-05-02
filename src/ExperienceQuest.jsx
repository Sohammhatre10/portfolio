import React from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    id: 1,
    role: "Data Engineer – Graduate Programmer",
    company: "Fidelity International",
    date: "Aug 2025 – Present",
    description: [
      "Designed and optimised Snowflake-based data models, accelerating financial insight delivery.",
      "Implemented Cortex Analyst for data-warehouse-driven LLM conversations, enhancing internal workflows.",
      "Built scalable ETL pipelines and logic layers that eliminated manual effort in recurring analysis.",
    ],
    color: "from-blue-500 to-cyan-400",
    glow: "shadow-[0_0_30px_-5px_rgba(56,189,248,0.5)]",
  },
  {
    id: 2,
    role: "Lead AI Engineer",
    company: "Ziarah",
    date: "Dec 2024 – Aug 2025",
    description: [
      "Led full redevelopment of the AI chatbot system using Lang Graph and LangChain for dynamic workflow orchestration.",
      "Engineered a Retrieval-Augmented Generation (RAG) pipeline, significantly reducing costly LLM inference calls.",
      "Reduced cost per user interaction from $0.085 to $0.00042—a 99.5% decrease.",
    ],
    color: "from-purple-500 to-pink-500",
    glow: "shadow-[0_0_30px_-5px_rgba(217,70,239,0.5)]",
  },
  {
    id: 3,
    role: "Artificial Intelligence Intern",
    company: "Planto.ai",
    date: "May 2024 – Aug 2024",
    description: [
      "Developed a SaaS AI developer assistant using LLaMA-3 on AWS EC2, replacing OpenAI with open-source models.",
      "Fine-tuned LLaMA-3 for code generation, debugging, and context-aware suggestions.",
    ],
    color: "from-emerald-400 to-teal-500",
    glow: "shadow-[0_0_30px_-5px_rgba(52,211,153,0.5)]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.4 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 15 },
  },
};

const ExperienceQuest = () => {
  return (
    <section className="relative min-h-screen bg-black text-white py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500 mb-3">
            Mission Log
          </p>
          <h2 className="font-display bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
            Career Trajectory
          </h2>
        </motion.div>

        <div className="relative">
          {/* The Path Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-zinc-800/50 -translate-x-1/2 rounded-full hidden sm:block">
            <motion.div
              className="absolute top-0 w-full bg-gradient-to-b from-cyan-500 via-purple-500 to-emerald-500 rounded-full"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-16"
          >
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className={`relative flex flex-col sm:flex-row items-center sm:items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-[28px] sm:left-1/2 -translate-x-1/2 top-0 sm:top-6 z-20 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      className={`w-6 h-6 rounded-full bg-gradient-to-br ${exp.color} border-4 border-[#050505] ${exp.glow} flex items-center justify-center cursor-pointer`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full sm:w-[calc(50%-3rem)] pl-16 sm:pl-0 mt-8 sm:mt-0 ${
                      isEven ? "sm:pr-12 sm:text-right" : "sm:pl-12 text-left"
                    }`}
                  >
                    <div className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]">
                      {/* Decorative corner accents */}
                      <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-white/20 rounded-tl-xl transition-colors group-hover:border-white/50" />
                      <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-white/20 rounded-br-xl transition-colors group-hover:border-white/50" />

                      <div className={`flex flex-col ${isEven ? 'sm:items-end' : 'sm:items-start'} gap-1 mb-4`}>
                        <span className="font-mono text-xs font-bold tracking-widest text-zinc-500 mb-1 flex items-center gap-2">
                          <span className="inline-block w-2 h-2 rounded-full bg-current opacity-50" />
                          {exp.date}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                          {exp.role}
                        </h3>
                        <h4 className={`text-sm sm:text-base font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                          {exp.company}
                        </h4>
                      </div>

                      <ul className={`space-y-3 mt-6 ${isEven ? "sm:text-right" : "text-left"}`}>
                        {exp.description.map((desc, i) => (
                          <li
                            key={i}
                            className={`text-sm text-zinc-400 leading-relaxed font-sans flex items-start gap-2 ${
                              isEven ? "sm:flex-row-reverse" : "flex-row"
                            }`}
                          >
                            <span className="shrink-0 mt-1.5 block w-1 h-1 rounded-sm bg-white/20" />
                            <span className={isEven ? "sm:text-right" : "text-left"}>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceQuest;
