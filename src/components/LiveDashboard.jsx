import React from 'react';
import { Gauge, Clock, Layers, Sparkles, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function LiveDashboard({
  inputType = 'Text Stream',
  featuresCount = 0,
  currentStageName = 'Idle',
  confidence = 0,
  prediction = 'Pending',
  elapsedTime = 0,
  isProcessing = false,
  isCompleted = false
}) {
  return (
    <div className="p-5 rounded-2xl glass-card border border-cyan-500/20 shadow-glass-glow space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
            Live AI Telemetry Dashboard
          </h3>
        </div>
        <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
          Simulated Pipeline
        </span>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {/* Input Type */}
        <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800">
          <p className="text-[10px] font-mono text-slate-400 uppercase">Input Modality</p>
          <p className="text-xs font-semibold text-slate-200 mt-1 flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            {inputType}
          </p>
        </div>

        {/* Features Found */}
        <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800">
          <p className="text-[10px] font-mono text-slate-400 uppercase">Features Extracted</p>
          <p className="text-xs font-semibold text-cyan-300 mt-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            {featuresCount} Signals
          </p>
        </div>

        {/* Processing Stage */}
        <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800">
          <p className="text-[10px] font-mono text-slate-400 uppercase">Current Stage</p>
          <p className="text-xs font-semibold text-blue-300 mt-1 truncate">
            {currentStageName}
          </p>
        </div>

        {/* Confidence */}
        <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800">
          <p className="text-[10px] font-mono text-slate-400 uppercase">Model Confidence</p>
          <p className="text-xs font-mono font-bold text-cyan-300 mt-1">
            {isProcessing ? 'Estimating...' : `${confidence}%`}
          </p>
        </div>

        {/* Processing Time */}
        <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800">
          <p className="text-[10px] font-mono text-slate-400 uppercase">Latency Elapsed</p>
          <p className="text-xs font-mono font-semibold text-slate-200 mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-cyan-400" />
            {elapsedTime}s
          </p>
        </div>

        {/* Model Status */}
        <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800">
          <p className="text-[10px] font-mono text-slate-400 uppercase">Pipeline Status</p>
          <p className="text-xs font-semibold mt-1 flex items-center gap-1.5">
            {isProcessing ? (
              <span className="text-amber-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                Analyzing
              </span>
            ) : isCompleted ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Resolved
              </span>
            ) : (
              <span className="text-slate-400">Idle / Ready</span>
            )}
          </p>
        </div>
      </div>

      {/* Decision Summary Banner */}
      <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
        isCompleted
          ? prediction.toLowerCase().includes('spam')
            ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
          : 'bg-navy-950/50 border-slate-800 text-slate-400'
      }`}>
        <div className="flex items-center gap-2.5">
          {isCompleted && prediction.toLowerCase().includes('spam') ? (
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          ) : isCompleted ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-slate-500" />
          )}
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block">AI Final Output</span>
            <span className="text-xs font-bold font-mono">
              {isCompleted ? prediction : isProcessing ? 'Computing Matrix...' : 'Awaiting Input Trigger'}
            </span>
          </div>
        </div>
        {isCompleted && (
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900/80 border border-current">
            {confidence}% Certainty
          </span>
        )}
      </div>
    </div>
  );
}
