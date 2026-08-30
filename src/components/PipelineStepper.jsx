import React from 'react';
import { FileText, Layers, Sparkles, Cpu, Activity, CheckCircle2, Check } from 'lucide-react';
import { PIPELINE_STAGES } from '../hooks/useSimulation';

const ICON_MAP = {
  FileText: FileText,
  Layers: Layers,
  Sparkles: Sparkles,
  Cpu: Cpu,
  Activity: Activity,
  CheckCircle2: CheckCircle2
};

export default function PipelineStepper({ currentStep, onSelectStep, isCompleted }) {
  return (
    <div className="w-full">
      {/* Desktop Horizontal Stepper */}
      <div className="hidden lg:block">
        <div className="relative flex items-center justify-between">
          {/* Background Track Line */}
          <div className="absolute top-6 left-8 right-8 h-1 bg-slate-800/80 rounded-full z-0 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(0,240,255,0.8)]"
              style={{
                width: `${Math.max(0, Math.min(100, ((currentStep - 1) / (PIPELINE_STAGES.length - 1)) * 100))}%`
              }}
            />
          </div>

          {PIPELINE_STAGES.map((stage) => {
            const Icon = ICON_MAP[stage.icon] || Cpu;
            const isPassed = currentStep > stage.id;
            const isCurrent = currentStep === stage.id;
            const isFuture = currentStep < stage.id;

            return (
              <div 
                key={stage.id} 
                className="relative z-10 flex flex-col items-center group cursor-pointer"
                onClick={() => onSelectStep && onSelectStep(stage.id)}
              >
                {/* Node Circle */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isPassed
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                      : isCurrent
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-bold border-2 border-white shadow-[0_0_25px_rgba(0,240,255,0.9)] scale-110 animate-pulse'
                      : 'bg-navy-900/90 text-slate-500 border border-slate-800 hover:border-slate-700 hover:text-slate-400'
                  }`}
                >
                  {isPassed ? (
                    <Check className="w-5 h-5 text-cyan-300 stroke-[3]" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                {/* Step Details */}
                <div className="mt-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className={`text-[10px] font-mono font-semibold uppercase tracking-widest ${
                      isCurrent ? 'text-cyan-400' : isPassed ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Step 0{stage.id}
                    </span>
                  </div>
                  <h4 className={`text-xs font-semibold mt-0.5 tracking-tight transition-colors ${
                    isCurrent ? 'text-cyan-200' : isPassed ? 'text-slate-200' : 'text-slate-500'
                  }`}>
                    {stage.label}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile & Tablet Stepper */}
      <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-2">
        {PIPELINE_STAGES.map((stage) => {
          const Icon = ICON_MAP[stage.icon] || Cpu;
          const isPassed = currentStep > stage.id;
          const isCurrent = currentStep === stage.id;

          return (
            <div
              key={stage.id}
              onClick={() => onSelectStep && onSelectStep(stage.id)}
              className={`p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center gap-2.5 ${
                isCurrent
                  ? 'bg-cyan-950/40 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : isPassed
                  ? 'bg-navy-900/60 border-cyan-900/50 text-slate-300'
                  : 'bg-navy-950/40 border-slate-800 text-slate-500'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                isCurrent
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : isPassed
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-slate-800 text-slate-500'
              }`}>
                {isPassed ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-mono text-cyan-400/80 uppercase">0{stage.id}</p>
                <p className="text-xs font-semibold truncate">{stage.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
