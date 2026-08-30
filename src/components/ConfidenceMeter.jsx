import React, { useEffect, useState } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Sparkles, HelpCircle } from 'lucide-react';

export default function ConfidenceMeter({
  confidence = 87,
  label = 'Spam',
  secondaryLabel = 'Not Spam',
  secondaryScore = 13,
  isProcessing = false,
  status = 'Calculating...'
}) {
  const [displayScore, setDisplayScore] = useState(0);

  // Smooth counter animation
  useEffect(() => {
    if (isProcessing) {
      // Fluctuate while calculating
      const interval = setInterval(() => {
        setDisplayScore(Math.floor(Math.random() * 50) + 20);
      }, 150);
      return () => clearInterval(interval);
    }

    let start = 0;
    const target = confidence;
    const duration = 1200; // ms
    const steps = 35;
    const increment = (target - start) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayScore(target);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(increment * currentStep));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [confidence, isProcessing]);

  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const isHighRisk = label.toLowerCase().includes('spam') && confidence >= 60;
  const isSafe = label.toLowerCase().includes('legit') || (label.toLowerCase().includes('spam') && confidence < 40);

  return (
    <div className="flex flex-col items-center p-6 rounded-2xl glass-card border border-cyan-500/20 shadow-glass-glow relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none ${
        isHighRisk ? 'bg-rose-500' : 'bg-cyan-500'
      }`} />

      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
            AI Probability Engine
          </h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          Softmax Output
        </span>
      </div>

      {/* SVG Radial Meter */}
      <div className="relative w-44 h-44 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          {/* Track background */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            className="text-slate-800/80"
            fill="transparent"
          />
          {/* Secondary progress (remaining probability) */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            className="text-slate-700"
            strokeDasharray={circumference}
            strokeDashoffset={0}
            fill="transparent"
          />
          {/* Active progress */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={isHighRisk ? '#EF4444' : isSafe ? '#10B981' : '#00F0FF'}
            strokeWidth="11"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-300 ease-out"
            style={{
              filter: `drop-shadow(0 0 10px ${isHighRisk ? 'rgba(239,68,68,0.7)' : 'rgba(0,240,255,0.7)'})`
            }}
          />
        </svg>

        {/* Center Display Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold font-display tracking-tight text-white">
            {displayScore}%
          </span>
          <span className="text-[11px] font-mono text-cyan-300 font-semibold tracking-wider uppercase mt-0.5">
            {label}
          </span>
        </div>
      </div>

      {/* Probability Distribution Bar */}
      <div className="w-full mt-4 space-y-2">
        <div className="flex justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className={`w-2.5 h-2.5 rounded-full ${isHighRisk ? 'bg-rose-500' : 'bg-cyan-400'}`} />
            {label}
          </span>
          <span className="font-mono text-cyan-300">{displayScore}%</span>
        </div>

        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
          <div 
            className={`h-full transition-all duration-500 ${isHighRisk ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)]' : 'bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.7)]'}`}
            style={{ width: `${displayScore}%` }}
          />
          <div 
            className="h-full bg-slate-600 transition-all duration-500"
            style={{ width: `${Math.max(0, 100 - displayScore)}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] text-slate-400">
          <span>{secondaryLabel}</span>
          <span className="font-mono">{Math.max(0, 100 - displayScore)}%</span>
        </div>
      </div>

      {/* Educational Note */}
      <div className="mt-4 p-3 rounded-xl bg-navy-950/70 border border-slate-800 flex items-start gap-2.5 text-left w-full">
        <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-200">AI Confidence:</strong> AI decisions are statistical probability distributions rather than binary absolute certainty.
        </p>
      </div>
    </div>
  );
}
