import React from 'react';
import { ArrowDownRight, Play } from 'lucide-react';

export default function HeroSection({ onTrySimulation, onExploreHowItWorks }) {
  return (
    <section className="look-hero relative min-h-[100svh] flex items-end overflow-hidden px-0">
      <div className="look-hero-orb look-orb-a" />
      <div className="look-hero-orb look-orb-b" />
      <div className="look-hero-grid" />

      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-14 pb-10 sm:pb-14">
        <div className="flex items-center justify-between border-t border-white/20 pt-4 mb-7 text-[10px] sm:text-xs font-mono tracking-[0.18em] uppercase text-white/55">
          <span>01 — Explore Intelligence</span>
          <span className="hidden sm:block">Interactive AI Experience</span>
          <span>2026</span>
        </div>

        <div className="max-w-7xl">
          <p className="look-kicker mb-5">Not magic. A machine in motion.</p>
          <h1 className="look-display leading-[0.82] tracking-[-0.075em] text-white">
            INSIDE<br />
            THE <span className="look-outline">AI</span><br />
            MIND<span className="text-cyan-300">.</span>
          </h1>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-7 items-end border-t border-white/10 pt-6">
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-white/60">
            Follow the signal from raw input to final decision. Watch patterns form,
            confidence rise, and intelligence make its move.
          </p>

          <div className="flex flex-wrap gap-3">
            <button onClick={onTrySimulation} className="look-primary-btn group">
              <span className="relative z-10 flex items-center gap-3">
                <Play className="w-4 h-4 fill-current" />
                ENTER THE MIND
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </span>
            </button>
            <button onClick={onExploreHowItWorks} className="look-secondary-btn">
              EXPLORE SYSTEM
            </button>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-white/35">
          <span className="w-12 h-px bg-cyan-300/70" />
          Scroll to enter
        </div>
      </div>
    </section>
  );
}
