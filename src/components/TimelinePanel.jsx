import React from 'react';
import { ListOrdered, CheckCircle2, Circle, Clock } from 'lucide-react';
import { PIPELINE_STAGES } from '../hooks/useSimulation';

export default function TimelinePanel({ currentStep, isPlaying, isCompleted }) {
  return (
    <div className="p-5 rounded-2xl glass-card border border-cyan-500/20 shadow-glass-glow space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <ListOrdered className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
            What AI Is Doing (Step-by-Step)
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">Live Trace</span>
      </div>

      {/* Steps List */}
      <div className="space-y-2 pt-1">
        {PIPELINE_STAGES.map((stage) => {
          const isPassed = currentStep > stage.id;
          const isCurrent = currentStep === stage.id;
          const isPending = currentStep < stage.id;

          return (
            <div
              key={stage.id}
              className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all duration-300 ${
                isCurrent
                  ? 'bg-cyan-950/40 border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.15)] text-cyan-200'
                  : isPassed
                  ? 'bg-navy-950/40 border-slate-800/80 text-slate-300'
                  : 'bg-transparent border-transparent text-slate-600 opacity-60'
              }`}
            >
              {/* Status icon */}
              <div className="mt-0.5 shrink-0">
                {isPassed ? (
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                ) : isCurrent ? (
                  <div className="relative flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full bg-cyan-400/30 animate-ping absolute" />
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,1)]" />
                  </div>
                ) : (
                  <Circle className="w-3.5 h-3.5 text-slate-700" />
                )}
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${isCurrent ? 'text-cyan-200 font-bold' : isPassed ? 'text-slate-200' : 'text-slate-500'}`}>
                    {stage.label}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Stage 0{stage.id}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                  {stage.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
