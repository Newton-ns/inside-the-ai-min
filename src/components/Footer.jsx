import React from 'react';
import { Cpu, ShieldCheck, Sparkles, Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-cyan-500/10 bg-navy-950/90 py-12 px-4 relative z-10 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Brand & Theme */}
        <div className="space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="font-bold font-display text-white text-base">
              Inside the <span className="text-cyan-400">AI Mind</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Theme: <strong>Visualizing the Invisible</strong>. An interactive educational simulation demystifying artificial intelligence decision pipelines.
          </p>
        </div>

        {/* Disclaimer / Educational Badge */}
        <div className="p-3.5 rounded-2xl bg-navy-900 border border-slate-800 text-xs font-mono text-slate-400 max-w-md">
          <div className="flex items-center gap-2 text-cyan-300 font-bold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Educational AI Simulation</span>
          </div>
          <p className="text-[11px] text-slate-400">
            This application runs deterministic pedagogical heuristics in your browser to demonstrate tokenization, feature weighting, and probability scoring without calling cloud models.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
        <span className="flex items-center gap-2"><Activity className="w-3 h-3 text-emerald-400" /> SYSTEM ONLINE · © 2026 Inside the AI Mind</span>
        <span className="flex items-center gap-1">
          Crafted with <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> for presentation excellence.
        </span>
      </div>
    </footer>
  );
}
