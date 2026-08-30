import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Play } from 'lucide-react';

export default function HeroSection({ onTrySimulation, onExploreHowItWorks }) {
  const title = ['INSIDE', 'THE AI', 'MIND.'];
  return (
    <section className="look-hero relative min-h-[100svh] flex items-end overflow-hidden">
      <div className="look-hero-orb look-orb-a" />
      <div className="look-hero-orb look-orb-b" />
      <div className="look-hero-grid" />
      <div className="look-noise" />

      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-14 pb-10 sm:pb-14">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          className="flex items-center justify-between border-t border-white/20 pt-4 mb-7 text-[10px] sm:text-xs font-mono tracking-[0.18em] uppercase text-white/55">
          <span>01 — Explore Intelligence</span><span className="hidden sm:block">Interactive AI Experience</span><span>2026</span>
        </motion.div>

        <div className="max-w-7xl overflow-hidden">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}
            className="look-kicker mb-5">Not magic. A machine in motion.</motion.p>
          <h1 className="look-display leading-[0.82] tracking-[-0.075em] text-white">
            {title.map((line, i) => (
              <motion.span key={line} initial={{ y: '110%', rotate: 2 }} animate={{ y: 0, rotate: 0 }}
                transition={{ duration: .85, delay: .25 + i * .12, ease: [0.16,1,0.3,1] }}
                className="block">
                {line === 'THE AI' ? <>THE <span className="look-outline">AI</span></> : line}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .85, duration: .7 }}
          className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-7 items-end border-t border-white/10 pt-6">
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-white/60">Follow the signal from raw input to final decision. Watch patterns form, confidence rise, and intelligence make its move.</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={onTrySimulation} className="look-primary-btn group"><span className="relative z-10 flex items-center gap-3"><Play className="w-4 h-4 fill-current" /> ENTER THE MIND <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></span></button>
            <button onClick={onExploreHowItWorks} className="look-secondary-btn">EXPLORE SYSTEM</button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}
          className="mt-10 flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-white/35"><span className="w-12 h-px bg-cyan-300/70" /> Scroll to enter</motion.div>
      </div>
    </section>
  );
}
