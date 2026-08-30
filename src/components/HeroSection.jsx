import React from 'react';
import { Play, Sparkles, ArrowDown, Cpu, ShieldCheck, Layers, Compass } from 'lucide-react';

export default function HeroSection({ onTrySimulation, onExploreHowItWorks }) {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* Theme pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.2)] animate-float">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Theme: Visualizing the Invisible</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white leading-none">
          Inside the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-glow-cyan">AI Mind</span>
        </h1>

        {/* Subheading */}
        <h2 className="text-lg sm:text-2xl font-bold text-slate-200 font-display">
          What really happens before AI gives you an answer?
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Give AI an input and watch how it detects patterns, calculates confidence, and makes a decision.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onTrySimulation}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-base tracking-wide shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:shadow-[0_0_40px_rgba(0,240,255,0.9)] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2.5"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Try AI Simulation</span>
          </button>

          <button
            onClick={onExploreHowItWorks}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl glass-card hover:bg-slate-800/80 text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-500/50 font-bold text-base transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <Compass className="w-5 h-5 text-cyan-400" />
            <span>Explore How It Works</span>
          </button>
        </div>

        {/* 5-Stage Preview Chips */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-xl bg-navy-950/80 border border-slate-800 text-slate-300">Input</span>
          <span className="text-cyan-500">→</span>
          <span className="px-3 py-1.5 rounded-xl bg-navy-950/80 border border-slate-800 text-slate-300">Feature Detection</span>
          <span className="text-cyan-500">→</span>
          <span className="px-3 py-1.5 rounded-xl bg-navy-950/80 border border-slate-800 text-slate-300">Pattern Analysis</span>
          <span className="text-cyan-500">→</span>
          <span className="px-3 py-1.5 rounded-xl bg-navy-950/80 border border-slate-800 text-slate-300">Confidence</span>
          <span className="text-cyan-500">→</span>
          <span className="px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-bold">Decision</span>
        </div>
      </div>
    </section>
  );
}
