import React from 'react';
import { Database, Binary, Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const FLOW_STEPS = [
  { step: '01', label: 'DATA', icon: Database, color: '#00F0FF', desc: 'Raw digitized observations, text tokens, pixels, or logs.' },
  { step: '02', label: 'PATTERNS', icon: Binary, color: '#3B82F6', desc: 'Statistical co-occurrences, contours, and embeddings.' },
  { step: '03', label: 'PROBABILITIES', icon: Sparkles, color: '#A855F7', desc: 'Continuous likelihood scores computed via mathematical weights.' },
  { step: '04', label: 'PREDICTION', icon: CheckCircle2, color: '#10B981', desc: 'Final top-probability output presented to the user.' }
];

export default function AINotMagicSection() {
  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto p-8 sm:p-12 rounded-3xl glass-card border border-cyan-500/20 shadow-glass-glow space-y-8 text-center relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            <ShieldCheck className="w-3.5 h-3.5" />
            The Clear Reality
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
            AI Is Not Magic.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium">
            AI does not magically “know” the answer. It makes predictions based on mathematical patterns learned from data.
          </p>
        </div>

        {/* 4-Step Mathematical Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {FLOW_STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 flex flex-col items-center justify-between text-center relative group hover:border-cyan-500/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              >
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono font-bold text-slate-500 mb-2">
                    PHASE {item.step}
                  </span>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    style={{ backgroundColor: `${item.color}20`, color: item.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white tracking-wider mb-2">
                    {item.label}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
