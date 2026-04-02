import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Predicto",
    href: "https://github.com/Sohammhatre10/Predicto",
    description:
      "Predict crypto market trends using Keras and Neural Networks. 96% efficiency, real-time predictions, and support for multiple cryptocurrencies.",
    span: "",
  },
  {
    title: "AI Proctoring Assessment Website",
    href: "https://github.com/Sohammhatre10/ai-proctoring-assessment-website",
    description:
      "Full-stack platform for coding/aptitude assessments with AI-based proctoring, real-time evaluation, and responsive design.",
    span: "",
  },
  {
    title: "CADMI (Base)",
    href: "https://github.com/Sohammhatre10/cadmi_base",
    description: "Backend for a student guidance platform to assist with undergraduate admission decisions.",
    span: "",
  },
  {
    title: "CADMI (Frontend)",
    href: "https://github.com/Sohammhatre10/cadmi_frontend_react",
    description: "React frontend for the CADMI student guidance and admission platform.",
    span: "",
  },
  {
    title: "ECGPCG",
    href: "https://github.com/Sohammhatre10/ECGPCG/tree/frontend",
    description:
      "College project: ML-based analysis of ECG and PCG signals for cardiovascular anomaly detection using Autoencoder, LSTM, CNN, and LLM.",
    span: "md:col-span-2",
  },
];

const cardTransition = (i) => ({
  delay: 0.06 * i,
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
});

const GithubProjects = () => {
  return (
    <section className="relative min-h-screen bg-black text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
        aria-hidden
      />
      <div className="container mx-auto px-4 py-20 md:py-24">
        <motion.div
          className="mb-14 text-center md:mb-16"
          initial={{ opacity: 1, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300/70">
            Selected work
          </p>
          <h2 className="font-display mt-3 bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
            GitHub Projects
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm text-white/50 md:text-base">
            Open source and academic builds — hover a card to peek details.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 1, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={cardTransition(i)}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-sm transition-colors hover:border-cyan-400/30 hover:bg-white/[0.06] ${p.span}`}
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0"
                aria-hidden
              />
              <div className="relative">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
                    {p.title}
                  </h3>
                  <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-sans text-[0.65rem] font-medium uppercase tracking-wider text-white/45 transition-colors group-hover:border-cyan-400/25 group-hover:text-cyan-200/90">
                    Repo
                  </span>
                </div>
                <p className="font-sans text-sm leading-relaxed text-white/60 transition-colors group-hover:text-white/75">
                  {p.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 font-sans text-sm font-medium text-cyan-300/80 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  View on GitHub
                  <span aria-hidden className="translate-x-0 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GithubProjects;
