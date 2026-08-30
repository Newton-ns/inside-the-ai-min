import React, { useState } from 'react';
import { AlertTriangle, Scale, ShieldAlert, Sparkles, CheckCircle2, RefreshCcw } from 'lucide-react';

export default function AIBiasDemo() {
  const [biasLevel, setBiasLevel] = useState(15); // 0 = perfectly balanced, 100 = extremely skewed

  // Calculate simulated dataset distribution and model distortion
  const classAPercent = Math.round(50 + (biasLevel * 0.45)); // 50% to 95%
  const classBPercent = 100 - classAPercent;

  const reliabilityScore = Math.max(20, Math.round(98 - biasLevel * 0.75));
  const falsePositiveRate = Math.round(2 + biasLevel * 0.38);

  const isSevereBias = biasLevel > 60;
  const isModerateBias = biasLevel > 25 && biasLevel <= 60;

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto p-8 rounded-3xl glass-card border border-cyan-500/20 shadow-glass-glow space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <AlertTriangle className="w-3.5 h-3.5" />
            Dataset Representation Simulator
          </div>
          <h2 className="text-3xl font-extrabold font-display text-white">
            What If the Training Data Is Biased?
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            AI can inherit statistical distortions and blind spots from the data used to train it.
          </p>
        </div>

        {/* Interactive Bias Slider */}
        <div className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <Scale className="w-4 h-4" />
              Balanced Training Distribution (50/50)
            </span>
            <span className="text-rose-400 font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              Severe Data Skew (95/5)
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={biasLevel}
            onChange={(e) => setBiasLevel(Number(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />

          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>Skew Level: {biasLevel}%</span>
            <span>Reliability: {reliabilityScore}%</span>
          </div>
        </div>

        {/* Visualized Dataset Imbalance vs Error Rate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dataset Composition Bar */}
          <div className="p-5 rounded-2xl bg-navy-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold uppercase">Training Dataset Sampling</span>
              <span className="text-cyan-400">{classAPercent}% vs {classBPercent}%</span>
            </div>

            <div className="w-full h-5 rounded-xl bg-slate-800 overflow-hidden flex shadow-inner">
              <div
                className="h-full bg-cyan-500 transition-all duration-300 flex items-center justify-center text-[10px] font-mono font-bold text-slate-950"
                style={{ width: `${classAPercent}%` }}
              >
                Pattern Group A ({classAPercent}%)
              </div>
              <div
                className="h-full bg-purple-500 transition-all duration-300 flex items-center justify-center text-[10px] font-mono font-bold text-slate-950"
                style={{ width: `${classBPercent}%` }}
              >
                {classBPercent > 12 ? `Group B (${classBPercent}%)` : ''}
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              When Group B is underrepresented, the AI model never learns its subtle edge-case features.
            </p>
          </div>

          {/* Impact on Reliability */}
          <div className={`p-5 rounded-2xl border transition-all ${
            isSevereBias
              ? 'bg-rose-950/30 border-rose-500/50 text-rose-200 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
              : isModerateBias
              ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
              : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold uppercase">Generalization Accuracy</span>
              <span className="text-xs font-mono font-bold">{reliabilityScore}%</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              {isSevereBias ? (
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
              ) : isModerateBias ? (
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              <span className="font-semibold">
                {isSevereBias
                  ? 'High Hallucination / Blind Spot Risk (Underrepresented classes fail)'
                  : isModerateBias
                  ? 'Moderate Skew (Occasional false confidence on rare edge cases)'
                  : 'Balanced Performance (High reliability across all categories)'}
              </span>
            </div>
            <p className="text-[11px] text-slate-300/80 mt-2">
              Estimated Error & False Positive Rate: ~{falsePositiveRate}%
            </p>
          </div>
        </div>

        {/* Educational Takeaway Callout */}
        <div className="p-4 rounded-2xl bg-navy-950 border border-slate-800 text-center text-xs text-slate-300">
          <strong className="text-cyan-300">Core Takeaway:</strong> An AI model does not have objective universal knowledge. If the training data contains sampling bias, the mathematical weights will faithfully reproduce and amplify that bias.
        </div>
      </div>
    </section>
  );
}
