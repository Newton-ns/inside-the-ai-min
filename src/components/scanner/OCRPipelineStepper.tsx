import React, { useState, useEffect } from 'react';
import { Upload, Sparkles, ScanLine, Brain, Scale, FileCheck, CheckCircle } from 'lucide-react';

interface PipelineStep {
  id: number;
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  duration: number; // ms
}

interface OCRPipelineStepperProps {
  isRunning: boolean;
  onComplete?: () => void;
}

const steps: PipelineStep[] = [
  { id: 1, icon: <Upload className="w-5 h-5" />,    label: "Image Upload",      sublabel: "Receiving packaging artwork",     duration: 400 },
  { id: 2, icon: <Sparkles className="w-5 h-5" />,  label: "Enhancement",       sublabel: "Contrast boost & adaptive sharpen", duration: 600 },
  { id: 3, icon: <ScanLine className="w-5 h-5" />,  label: "OCR Extraction",    sublabel: "Multi-engine text recognition",   duration: 900 },
  { id: 4, icon: <Brain className="w-5 h-5" />,     label: "NLP Understanding", sublabel: "Metrology entity extraction",      duration: 700 },
  { id: 5, icon: <Scale className="w-5 h-5" />,     label: "Rule Validation",   sublabel: "Legal Metrology Rules 2011 check", duration: 600 },
  { id: 6, icon: <FileCheck className="w-5 h-5" />, label: "Compliance Report", sublabel: "Generating score & violation list", duration: 300 },
];

export const OCRPipelineStepper: React.FC<OCRPipelineStepperProps> = ({ isRunning, onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!isRunning) {
      setCurrentStep(-1);
      setCompletedSteps([]);
      return;
    }

    let stepIndex = 0;
    let elapsed = 0;

    const runNextStep = () => {
      if (stepIndex >= steps.length) {
        setCurrentStep(-1);
        if (onComplete) onComplete();
        return;
      }
      const step = steps[stepIndex];
      setCurrentStep(step.id);
      setTimeout(() => {
        setCompletedSteps(prev => [...prev, step.id]);
        stepIndex++;
        runNextStep();
      }, step.duration);
    };

    runNextStep();

    return () => {};
  }, [isRunning]);

  const totalDuration = steps.reduce((a, s) => a + s.duration, 0);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
        <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">AI OCR Processing Pipeline</span>
        {isRunning && (
          <span className="text-blue-400 font-mono animate-pulse">Running...</span>
        )}
        {!isRunning && completedSteps.length === steps.length && (
          <span className="text-emerald-400 font-mono flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />Complete
          </span>
        )}
      </div>

      {/* Steps */}
      <div className="flex flex-wrap sm:flex-nowrap items-start justify-between gap-2 relative">
        {/* Connecting line */}
        <div className="hidden sm:block absolute top-5 left-0 right-0 h-0.5 bg-slate-800 z-0">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-500"
            style={{
              width: completedSteps.length > 0
                ? `${(completedSteps.length / steps.length) * 100}%`
                : '0%'
            }}
          />
        </div>

        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-col items-center text-center space-y-2 flex-1 z-10 min-w-[80px]">
              {/* Circle Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                isCompleted
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : isCurrent
                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/40 animate-scan-ring'
                  : 'bg-slate-900 border-slate-700 text-slate-500'
              }`}>
                {isCompleted ? <CheckCircle className="w-4.5 h-4.5" /> : step.icon}
              </div>

              {/* Label */}
              <div className="space-y-0.5">
                <div className={`text-[10px] font-bold leading-tight ${
                  isCompleted ? 'text-emerald-400' : isCurrent ? 'text-blue-300' : 'text-slate-500'
                }`}>
                  {step.label}
                </div>
                <div className="text-[9px] text-slate-600 leading-snug hidden sm:block">{step.sublabel}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      {(isRunning || completedSteps.length > 0) && (
        <div className="conf-bar-track mt-2">
          <div
            className="conf-bar-fill bg-gradient-to-r from-blue-600 to-emerald-500"
            style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};
