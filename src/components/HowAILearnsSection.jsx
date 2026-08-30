import React, { useState } from 'react';
import { Database, GitCommit, Network, FileInput, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

const LEARNING_STAGES = [
  {
    step: 1,
    title: 'Training Data',
    icon: Database,
    color: '#00F0FF',
    headline: 'Massive Labeled Datasets',
    desc: 'Before an AI model can predict anything, it is exposed to millions of curated examples (e.g., 500,000 labeled spam vs legitimate emails, or millions of tagged images).'
  },
  {
    step: 2,
    title: 'Pattern Learning',
    icon: GitCommit,
    color: '#3B82F6',
    headline: 'Gradient Descent & Loss Minimization',
    desc: 'The model makes random initial guesses, calculates error (loss), and mathematically adjusts millions of internal parameters via backpropagation until error is minimal.'
  },
  {
    step: 3,
    title: 'Model Weights',
    icon: Network,
    color: '#A855F7',
    headline: 'Frozen Neural Synapse Weights',
    desc: 'The resulting model is essentially a massive matrix of numbers (weights and biases) that encodes statistical correlations between inputs and outputs.'
  },
  {
    step: 4,
    title: 'New Input',
    icon: FileInput,
    color: '#EC4899',
    headline: 'Unseen Prompt or Image',
    desc: 'When you feed a brand new email or image to the model, it converts the raw data into numerical tensors and passes them forward through the frozen network.'
  },
  {
    step: 5,
    title: 'Prediction',
    icon: CheckCircle2,
    color: '#10B981',
    headline: 'Probability Distribution',
    desc: 'The final layer outputs softmax confidence scores based on how closely the new input activates the learned statistical patterns.'
  }
];

export default function HowAILearnsSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            <BookOpen className="w-3.5 h-3.5" />
            Machine Learning Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            How AI Learns
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Before AI can make predictions, it learns statistical patterns from large amounts of training data.
          </p>
        </div>

        {/* Animated Horizontal Stepper Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {LEARNING_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isCurrent = activeStep === idx;

            return (
              <button
                key={stage.step}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-navy-950 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.25)] scale-102'
                    : 'bg-navy-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">
                      Stage 0{stage.step}
                    </span>
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${stage.color}20`, color: stage.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 font-display">
                    {stage.title}
                  </h4>
                </div>

                <div className="mt-3 flex items-center gap-1 text-[11px] font-mono text-cyan-400">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Card for Active Stage */}
        <div className="p-8 rounded-3xl glass-card-glow border border-cyan-500/30 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/40">
              Stage 0{LEARNING_STAGES[activeStep].step}
            </span>
            <h3 className="text-xl font-bold font-display text-white">
              {LEARNING_STAGES[activeStep].headline}
            </h3>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
            {LEARNING_STAGES[activeStep].desc}
          </p>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex gap-2">
              {LEARNING_STAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeStep === i ? 'bg-cyan-400 w-8 shadow-[0_0_8px_rgba(0,240,255,0.8)]' : 'bg-slate-700'
                  }`}
                  aria-label={`Go to stage ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % LEARNING_STAGES.length)}
              className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5 hover:text-white"
            >
              Next Stage <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
