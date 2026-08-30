import React from 'react';
import { Eye, ArrowUp, Sparkles, Play, CheckCircle2 } from 'lucide-react';

export default function BlackBoxFinale({ onRunAnother }) {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl glass-card-glow border border-cyan-400/50 shadow-neon-cyan text-center space-y-6 relative overflow-hidden">
        {/* Ambient background particles */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
          <Eye className="w-8 h-8 text-cyan-400" />
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
            Now You Can See Inside the Black Box
          </h2>
          <p className="text-xl sm:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            “What looked invisible is now visible.”
          </p>
        </div>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          From input text and raw image pixels to tokenization, feature weights, probability scores, and final classifications — you now understand how modern artificial intelligence computes decisions.
        </p>

        {/* CTA Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onRunAnother}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-base tracking-wide shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:shadow-[0_0_40px_rgba(0,240,255,0.9)] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Run Another Simulation</span>
          </button>
        </div>
      </div>
    </section>
  );
}
