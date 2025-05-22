import React from "react";

const GithubProjects = () => {
  return (
    <section className="min-h-screen bg-black text-white overflow-y-auto">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">GitHub Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Predicto */}
          <a
            href="https://github.com/Sohammhatre10/Predicto"
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-700 rounded-lg p-6 transition hover:bg-gray-900 h-full"
          >
            <div className="font-semibold text-xl mb-3">Predicto</div>
            <div className="text-sm text-gray-300">
              Predict crypto market trends using Keras and Neural Networks. 96% efficiency, real-time predictions, and support for multiple cryptocurrencies.
            </div>
          </a>

          {/* AI Proctoring Assessment Website */}
          <a
            href="https://github.com/Sohammhatre10/ai-proctoring-assessment-website"
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-700 rounded-lg p-6 transition hover:bg-gray-900 h-full"
          >
            <div className="font-semibold text-xl mb-3">AI Proctoring Assessment Website</div>
            <div className="text-sm text-gray-300">
              Full-stack platform for coding/aptitude assessments with AI-based proctoring, real-time evaluation, and responsive design.
            </div>
          </a>

          {/* CADMI Base */}
          <a
            href="https://github.com/Sohammhatre10/cadmi_base"
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-700 rounded-lg p-6 transition hover:bg-gray-900 h-full"
          >
            <div className="font-semibold text-xl mb-3">CADMI (Base)</div>
            <div className="text-sm text-gray-300">
              Backend for a student guidance platform to assist with undergraduate admission decisions.
            </div>
          </a>

          {/* CADMI Frontend */}
          <a
            href="https://github.com/Sohammhatre10/cadmi_frontend_react"
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-700 rounded-lg p-6 transition hover:bg-gray-900 h-full"
          >
            <div className="font-semibold text-xl mb-3">CADMI (Frontend)</div>
            <div className="text-sm text-gray-300">
              React frontend for the CADMI student guidance and admission platform.
            </div>
          </a>

          {/* ECGPCG */}
          <a
            href="https://github.com/Sohammhatre10/ECGPCG/tree/frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-700 rounded-lg p-6 transition hover:bg-gray-900 h-full md:col-span-2"
          >
            <div className="font-semibold text-xl mb-3">ECGPCG</div>
            <div className="text-sm text-gray-300">
              College project: ML-based analysis of ECG and PCG signals for cardiovascular anomaly detection using Autoencoder, LSTM, CNN, and LLM.
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GithubProjects;
