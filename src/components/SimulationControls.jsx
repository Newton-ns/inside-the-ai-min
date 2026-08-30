import React from 'react';
import { Play, Pause, RotateCcw, RefreshCw, FastForward, SkipForward, SkipBack } from 'lucide-react';

export default function SimulationControls({
  isPlaying,
  isCompleted,
  currentStep,
  speed,
  onStart,
  onPause,
  onResume,
  onReplay,
  onReset,
  onSetSpeed,
  onNextStep,
  onPrevStep
}) {
  const speeds = [0.5, 1, 1.5, 2];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl glass-card border border-cyan-500/20 shadow-glass-glow">
      {/* Primary Action Buttons */}
      <div className="flex items-center gap-2">
        {!isPlaying && currentStep === 0 && (
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            aria-label="Start AI Simulation"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Analyze with AI</span>
          </button>
        )}

        {isPlaying && (
          <button
            onClick={onPause}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/50 hover:bg-amber-500/30 text-amber-300 font-semibold text-sm transition-all"
            aria-label="Pause Simulation"
          >
            <Pause className="w-4 h-4" />
            <span>Pause</span>
          </button>
        )}

        {!isPlaying && currentStep > 0 && !isCompleted && (
          <button
            onClick={onResume}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/50 hover:bg-cyan-500/30 text-cyan-300 font-semibold text-sm transition-all"
            aria-label="Resume Simulation"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Resume</span>
          </button>
        )}

        {isCompleted && (
          <button
            onClick={onReplay}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
            aria-label="Replay Simulation"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Replay AI Process</span>
          </button>
        )}

        {currentStep > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 text-sm font-medium transition-all"
            aria-label="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>

      {/* Step Navigation & Speed Controls */}
      <div className="flex items-center gap-3">
        {/* Speed Controls */}
        <div className="flex items-center bg-navy-950/80 p-1 rounded-xl border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 px-2 flex items-center gap-1">
            <FastForward className="w-3 h-3 text-cyan-400" />
            Speed:
          </span>
          <div className="flex gap-1">
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => onSetSpeed(s)}
                className={`px-2 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                  speed === s
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_8px_rgba(0,240,255,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
