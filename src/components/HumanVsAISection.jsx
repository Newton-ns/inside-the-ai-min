import React, { useState } from 'react';
import { User, Cpu, Sparkles, Brain, Check, X, ArrowRight } from 'lucide-react';

const COMPARISON_DIMENSIONS = [
  {
    title: 'Understanding Context & Sarcasm',
    scenario: '"Oh great, another meeting that could have been an email."',
    human: 'Immediately perceives sarcasm, frustration, and workplace subtext through empathy and shared human experience.',
    ai: 'Analyzes token sentiment polarity ("great" vs "another meeting"), computing probability weights without genuine emotional resonance.',
    humanAdvantage: 'High Nuance & Emotional Intuition',
    aiAdvantage: 'Instant Scalable Token Parsing'
  },
  {
    title: 'Handling Ambiguous Edge Cases',
    scenario: 'A painting of a cat wearing sunglasses driving a spaceship.',
    human: 'Effortlessly uses creative imagination to separate reality from surreal fiction and metaphor.',
    ai: 'Activates overlapping clusters (feline + vehicle + eyewear), potentially flagging conflicting multi-class embeddings.',
    humanAdvantage: 'Holistic General Intelligence',
    aiAdvantage: 'Parallel Feature Map Extraction'
  },
  {
    title: 'Processing Scale & Speed',
    scenario: 'Screening 10,000 resumes for 5 technical skills.',
    human: 'Gets fatigued, prone to cognitive bias, takes days of manual reading.',
    ai: 'Parses 10,000 documents in 1.4 seconds with consistent, repeatable mathematical matching.',
    humanAdvantage: 'Deep Qualitative Evaluation',
    aiAdvantage: 'Massive Throughput & Speed'
  }
];

export default function HumanVsAISection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Heading */}
        <div className="text-center space-y-3 ai-panel py-8 px-5"><div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40">
            <Brain className="w-3.5 h-3.5" />
            Cognitive Comparison
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Human Thinking vs. AI Prediction
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            AI does not “think” or experience the world like a human. It calculates probabilities based on statistical patterns learned from vast datasets.
          </p>
          </div>
        </div>

        {/* Side-by-side Fundamental Difference Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Human Thinking Card */}
          <div className="p-6 rounded-3xl glass-card-interactive border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/40">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-white">Human Cognition</h3>
                <p className="text-xs font-mono text-blue-300">Conscious, Contextual, Experiential</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Understands context, meaning, intent, cultural nuances, emotional states, and lived life experience. Formulates understanding from causality and world models.
            </p>
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Grasps satire, sarcasm, and emotional subtext</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Generalizes instantly from a single example</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Moral judgment and ethical discernment</span>
              </div>
            </div>
          </div>

          {/* AI Prediction Card */}
          <div className="p-6 rounded-3xl glass-card-interactive border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.1)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-white">AI Prediction</h3>
                <p className="text-xs font-mono text-cyan-300">Statistical, Mathematical, Pattern-Bound</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Processes data, vectors, token correlations, and learned statistical weights. Calculates the mathematical likelihood of the next token or label.
            </p>
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Processes millions of parameters simultaneously</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Zero cognitive fatigue across millions of queries</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Uncovers subtle mathematical correlations in huge data</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Scenario Tabs */}
        <div className="p-6 sm:p-8 rounded-3xl ai-panel space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Interactive Scenario Breakdown
            </span>
            <span className="text-[10px] font-mono text-cyan-400">Click a scenario to compare:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {COMPARISON_DIMENSIONS.map((dim, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`text-xs px-4 py-2 rounded-xl font-semibold transition-all ${
                  activeTab === idx
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-navy-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {dim.title}
              </button>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-4">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan-200">
              <span className="text-slate-500 mr-2">Example Input:</span>
              "{COMPARISON_DIMENSIONS[activeTab].scenario}"
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 text-xs text-slate-300 space-y-2">
                <span className="font-bold text-blue-300 flex items-center gap-1.5 font-mono uppercase">
                  <User className="w-3.5 h-3.5" />
                  Human Reaction
                </span>
                <p className="leading-relaxed">{COMPARISON_DIMENSIONS[activeTab].human}</p>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-slate-300 space-y-2">
                <span className="font-bold text-cyan-300 flex items-center gap-1.5 font-mono uppercase">
                  <Cpu className="w-3.5 h-3.5" />
                  AI Model Reaction
                </span>
                <p className="leading-relaxed">{COMPARISON_DIMENSIONS[activeTab].ai}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
