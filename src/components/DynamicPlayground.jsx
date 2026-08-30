import React, { useState } from 'react';
import { Sparkles, Sliders, ArrowRight, ShieldAlert, ShieldCheck, Zap, Plus, X } from 'lucide-react';
import { analyzeSpam } from '../engine/spamEngine';

const QUICK_INJECTIONS = [
  { text: 'FREE iPhone 15 Pro', type: 'spam', label: '+ "FREE iPhone"' },
  { text: 'URGENT: Click here now', type: 'spam', label: '+ "URGENT Click"' },
  { text: 'Claim your $1,000,000 cash prize', type: 'spam', label: '+ "$1M Cash Prize"' },
  { text: 'Attached are the meeting minutes', type: 'legit', label: '+ "Meeting minutes"' },
  { text: 'Let’s grab lunch tomorrow at noon', type: 'legit', label: '+ "Lunch tomorrow"' },
  { text: 'Thanks for the quick feedback team', type: 'legit', label: '+ "Feedback team"' }
];

export default function DynamicPlayground() {
  const [text, setText] = useState('Hey team, here is the weekly project update. Let me know your thoughts!');
  
  const analysis = analyzeSpam(text);

  const handleInject = (phrase) => {
    setText(prev => `${prev.trim()} ${phrase}`);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="p-8 rounded-3xl glass-card border border-cyan-500/20 shadow-glass-glow space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Sliders className="w-4 h-4" />
            </span>
            <h3 className="text-xl font-bold font-display text-white">
              Change the Input. Change the AI Decision.
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Type anything or inject trigger tokens below to watch the AI recalculate confidence, feature triggers, and classification in real time.
          </p>
        </div>
        <button
          onClick={handleClear}
          className="self-start md:self-auto text-xs font-mono text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-navy-950/60 transition-all"
        >
          Clear Text
        </button>
      </div>

      {/* Interactive Quick Injection Chips */}
      <div>
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
          Click to Inject Token Triggers Instantly:
        </span>
        <div className="flex flex-wrap gap-2">
          {QUICK_INJECTIONS.map((inj, idx) => (
            <button
              key={idx}
              onClick={() => handleInject(inj.text)}
              className={`text-xs px-3 py-1.5 rounded-xl border font-mono transition-all flex items-center gap-1.5 ${
                inj.type === 'spam'
                  ? 'bg-rose-950/40 border-rose-500/40 text-rose-300 hover:bg-rose-900/60 hover:border-rose-400'
                  : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 hover:border-emerald-400'
              }`}
            >
              <Plus className="w-3 h-3" />
              {inj.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Start typing your own email or sentence..."
          className="w-full bg-navy-950 text-slate-100 placeholder-slate-500 text-sm p-4 rounded-2xl border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all font-sans"
        />
      </div>

      {/* Real-time Dynamic Results Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Dynamic Prediction Badge */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          analysis.prediction === 'SPAM'
            ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            : analysis.prediction === 'SUSPICIOUS'
            ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
            : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
        }`}>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Instant AI Prediction</span>
            <span className="text-xl font-bold font-display tracking-wide">{analysis.prediction}</span>
          </div>
          {analysis.prediction === 'SPAM' ? (
            <ShieldAlert className="w-6 h-6 text-rose-400" />
          ) : (
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          )}
        </div>

        {/* Dynamic Confidence Score */}
        <div className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400 font-mono">Confidence Level</span>
            <span className="font-mono font-bold text-cyan-300">{analysis.confidence}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                analysis.prediction === 'SPAM' ? 'bg-rose-500' : 'bg-cyan-400'
              }`}
              style={{ width: `${analysis.confidence}%` }}
            />
          </div>
        </div>

        {/* Dynamic Detected Triggers */}
        <div className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block">High-Weight Triggers</span>
            <span className="text-sm font-semibold text-slate-200">
              {analysis.detectedFeatures.length > 0 
                ? `${analysis.detectedFeatures.length} Patterns Detected`
                : 'Zero Suspicious Patterns'}
            </span>
          </div>
          <span className="text-xs font-mono text-cyan-300 font-bold bg-cyan-950/90 px-2 py-1 rounded border border-cyan-500/30">
            {analysis.spamScore}% Spam Score
          </span>
        </div>
      </div>
    </div>
  );
}
