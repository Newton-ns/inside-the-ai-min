import React, { useState } from 'react';
import { FileText, Sparkles, Cpu, Activity, CheckCircle2, ChevronDown } from 'lucide-react';

const CONCEPTS = [
  {
    title: 'Input',
    tag: 'Stage 1',
    icon: FileText,
    color: '#00F0FF',
    simpleDef: 'Data given to the AI system.',
    expanded: 'Can be text, pixels, audio waveforms, or sensor numbers converted into multi-dimensional numerical tensors.'
  },
  {
    title: 'Features',
    tag: 'Stage 2',
    icon: Sparkles,
    color: '#3B82F6',
    simpleDef: 'Useful patterns detected in the data.',
    expanded: 'Specific clues like high-urgency keywords ("FREE NOW"), geometric contours (whiskers, wheels), or frequency tones.'
  },
  {
    title: 'Model',
    tag: 'Stage 3',
    icon: Cpu,
    color: '#A855F7',
    simpleDef: 'The learned system that evaluates patterns.',
    expanded: 'Millions of mathematical weights and biases tuned during training to map features to target outcomes.'
  },
  {
    title: 'Confidence',
    tag: 'Stage 4',
    icon: Activity,
    color: '#EC4899',
    simpleDef: 'How strongly the AI prefers one prediction.',
    expanded: 'Softmax probability score between 0% and 100% reflecting statistical certainty.'
  },
  {
    title: 'Decision',
    tag: 'Stage 5',
    icon: CheckCircle2,
    color: '#10B981',
    simpleDef: 'The final predicted output.',
    expanded: 'The winning class (e.g. SPAM, CAT, RECOMMENDED MOVIE) emitted once probability crosses a threshold.'
  }
];

export default function EducationalCards() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleCard = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            <Sparkles className="w-3.5 h-3.5" />
            Core Fundamentals
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Understand AI in 30 Seconds
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Demystifying the 5 foundational building blocks that power modern machine learning.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CONCEPTS.map((card, idx) => {
            const Icon = card.icon;
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={card.title}
                onClick={() => toggleCard(idx)}
                className={`p-5 rounded-3xl glass-card-interactive border cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                  isExpanded ? 'border-cyan-400 bg-navy-950 shadow-[0_0_20px_rgba(0,240,255,0.2)]' : 'border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">
                      {card.tag}
                    </span>
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${card.color}20`, color: card.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-display text-white mb-2">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    {card.simpleDef}
                  </p>

                  {isExpanded && (
                    <p className="text-[11px] text-cyan-200 mt-3 pt-3 border-t border-slate-800 leading-relaxed animate-fade-in">
                      {card.expanded}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{isExpanded ? 'Collapse' : 'Tap for details'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'transform rotate-180 text-cyan-400' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
