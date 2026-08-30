import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Sparkles, Send, RefreshCw, 
  HelpCircle, Layers, Cpu, ArrowRight, CheckCircle2, MessageSquare, Terminal
} from 'lucide-react';
import { analyzeSpam, PRESET_SPAM_EXAMPLES } from '../../engine/spamEngine';
import { useSimulation, PIPELINE_STAGES } from '../../hooks/useSimulation';
import SimulationControls from '../SimulationControls';
import PipelineStepper from '../PipelineStepper';
import NeuralCoreCanvas from '../NeuralCoreCanvas';
import ConfidenceMeter from '../ConfidenceMeter';
import LiveDashboard from '../LiveDashboard';
import TimelinePanel from '../TimelinePanel';
import confetti from 'canvas-confetti';

export default function SpamDetectorDemo() {
  const [inputText, setInputText] = useState(
    'Congratulations! You won a free iPhone. Click here now to claim your prize!'
  );
  
  const simulation = useSimulation(6);
  
  // Real-time NLP analysis of current text
  const analysis = useMemo(() => analyzeSpam(inputText), [inputText]);

  // Trigger confetti on successful spam/legit final decision reveal
  useEffect(() => {
    if (simulation.isCompleted) {
      if (analysis.prediction === 'SPAM') {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#EF4444', '#F59E0B', '#A855F7']
        });
      } else {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#10B981', '#00F0FF', '#3B82F6']
        });
      }
    }
  }, [simulation.isCompleted, analysis.prediction]);

  const handleSelectPreset = (presetText) => {
    setInputText(presetText);
    simulation.reset();
  };

  const handleStartAnalysis = () => {
    simulation.start();
  };

  const currentStageMeta = PIPELINE_STAGES.find(s => s.id === simulation.currentStep);

  return (
    <div className="space-y-8">
      {/* Top Stepper Bar */}
      <div className="p-6 rounded-3xl glass-card border border-cyan-500/20 shadow-glass-glow">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Live Scenario
              </span>
              <h2 className="text-xl font-bold font-display text-white">
                Spam Detection Neural Pipeline
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Watch step-by-step how text is parsed into tokens, scanned for malicious triggers, passed through neural weights, and scored for probability.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Status:</span>
            <span className="text-xs font-mono font-semibold text-cyan-300">
              {simulation.isPlaying ? 'Processing' : simulation.isCompleted ? 'Complete' : 'Ready'}
            </span>
          </div>
        </div>

        {/* Stepper */}
        <PipelineStepper
          currentStep={simulation.currentStep}
          onSelectStep={simulation.jumpToStep}
          isCompleted={simulation.isCompleted}
        />
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input & Token Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Text Input Panel */}
          <div className="p-6 rounded-3xl glass-card border border-cyan-500/20 shadow-glass-glow relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                Raw Email / Message Input
              </label>
              <span className="text-[11px] font-mono text-slate-400">
                {inputText.length} characters | {analysis.tokens.length} words
              </span>
            </div>

            {/* Presets Quick Select */}
            <div className="mb-4">
              <p className="text-[11px] font-mono text-slate-400 mb-2">Preset Scenarios:</p>
              <div className="flex flex-wrap gap-2">
                {PRESET_SPAM_EXAMPLES.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPreset(preset.text)}
                    className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                      inputText === preset.text
                        ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                        : 'bg-navy-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  if (simulation.isPlaying || simulation.isCompleted) {
                    simulation.reset();
                  }
                }}
                rows={3}
                placeholder="Type an email message here..."
                className="w-full bg-navy-950/90 text-slate-100 placeholder-slate-500 text-sm p-4 rounded-2xl border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all resize-y font-sans"
              />
            </div>

            {/* Controls Bar */}
            <div className="mt-4">
              <SimulationControls
                isPlaying={simulation.isPlaying}
                isCompleted={simulation.isCompleted}
                currentStep={simulation.currentStep}
                speed={simulation.speed}
                onStart={handleStartAnalysis}
                onPause={simulation.pause}
                onResume={simulation.resume}
                onReplay={simulation.replay}
                onReset={simulation.reset}
                onSetSpeed={simulation.setSpeed}
              />
            </div>
          </div>

          {/* Step 1 & 2: Tokenization & Floating Chips View */}
          {simulation.currentStep >= 2 && (
            <div className="p-6 rounded-3xl glass-card border border-cyan-500/20 shadow-glass-glow animate-fade-in">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                    Step 2: Lexical Tokenization & Tensor Encoding
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  {analysis.tokens.length} Tokens Formed
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-3">
                The input sentence is split into discrete numerical token embeddings before vector evaluation:
              </p>

              {/* Floating Token Chips */}
              <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-navy-950/80 border border-slate-800">
                {analysis.tokens.map((tok, idx) => {
                  const isSuspicious = analysis.detectedFeatures.some(
                    f => f.keyword.toLowerCase().includes(tok.clean) && tok.clean.length > 2
                  );

                  return (
                    <div
                      key={tok.id}
                      className={`group relative px-3 py-1.5 rounded-xl text-xs font-mono border transition-all duration-300 ${
                        isSuspicious && simulation.currentStep >= 3
                          ? 'bg-rose-950/40 border-rose-500/80 text-rose-200 shadow-[0_0_12px_rgba(239,68,68,0.4)] animate-bounce'
                          : 'bg-navy-900 border-slate-700/80 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-200'
                      }`}
                      style={{ animationDuration: '2s' }}
                    >
                      <span className="text-[9px] text-slate-500 mr-1.5 font-sans">#{idx}</span>
                      {tok.raw}

                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block z-20 px-2 py-1 bg-slate-900 text-[10px] text-cyan-300 rounded shadow-lg border border-slate-700 whitespace-nowrap">
                        Token ID: 0x{tok.clean.charCodeAt(0) ? tok.clean.charCodeAt(0).toString(16) : '00'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Feature Detection & Triggers */}
          {simulation.currentStep >= 3 && (
            <div className="p-6 rounded-3xl glass-card border border-cyan-500/20 shadow-glass-glow animate-fade-in space-y-4">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                    Step 3: Isolated Heuristic Features & Spam Signals
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
                  {analysis.detectedFeatures.length} Triggers Isolated
                </span>
              </div>

              {analysis.detectedFeatures.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {analysis.detectedFeatures.map((feat) => (
                    <div
                      key={feat.id}
                      className="p-3.5 rounded-2xl bg-navy-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-start justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                            style={{ color: feat.color, backgroundColor: feat.color }}
                          />
                          <span className="text-xs font-mono font-bold text-white tracking-wide">
                            "{feat.keyword}"
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{feat.category}</p>
                      </div>
                      <span
                        className="text-xs font-mono font-bold px-2 py-1 rounded-lg"
                        style={{ backgroundColor: `${feat.color}20`, color: feat.color, border: `1px solid ${feat.color}40` }}
                      >
                        +{feat.weight * feat.count} pts
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>No malicious, urgency, or promotional keywords detected. Text appears normal.</span>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Neural Network Canvas Core */}
          <div className="w-full">
            <NeuralCoreCanvas
              isProcessing={simulation.isPlaying}
              currentStep={simulation.currentStep}
              statusMessage={simulation.statusMessage}
            />
          </div>
        </div>

        {/* Right Column: Telemetry, Confidence & Final Decision (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Step 5: Confidence Meter */}
          {simulation.currentStep >= 5 ? (
            <ConfidenceMeter
              confidence={analysis.confidence}
              label={analysis.prediction === 'SPAM' ? 'Spam Confidence' : 'Legitimate Confidence'}
              secondaryLabel={analysis.prediction === 'SPAM' ? 'Legitimate' : 'Spam'}
              isProcessing={simulation.isPlaying && simulation.currentStep === 5}
              status={simulation.statusMessage}
            />
          ) : (
            <div className="p-6 rounded-2xl glass-card border border-slate-800 text-center text-slate-500 space-y-2">
              <Cpu className="w-8 h-8 text-slate-600 mx-auto animate-pulse" />
              <p className="text-xs font-mono uppercase font-semibold">Confidence Engine Standby</p>
              <p className="text-[11px] text-slate-500">
                Confidence probability will calculate once neural layer propagation begins.
              </p>
            </div>
          )}

          {/* Step 6: Final Decision & Reason Breakdown */}
          {simulation.currentStep >= 6 && (
            <div className="p-6 rounded-3xl glass-card-glow border border-cyan-400 shadow-neon-cyan animate-scale-up space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                    Step 6: AI Synthesis & Final Prediction
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                  Prediction Emitted
                </span>
              </div>

              {/* Huge Decision Badge */}
              <div className={`p-6 rounded-2xl border text-center flex flex-col items-center justify-center relative overflow-hidden ${
                analysis.prediction === 'SPAM'
                  ? 'bg-gradient-to-b from-rose-950/60 to-rose-900/30 border-rose-500/60 text-rose-200 shadow-[0_0_30px_rgba(239,68,68,0.25)]'
                  : analysis.prediction === 'SUSPICIOUS'
                  ? 'bg-gradient-to-b from-amber-950/60 to-amber-900/30 border-amber-500/60 text-amber-200 shadow-[0_0_30px_rgba(245,158,11,0.25)]'
                  : 'bg-gradient-to-b from-emerald-950/60 to-emerald-900/30 border-emerald-500/60 text-emerald-200 shadow-[0_0_30px_rgba(16,185,129,0.25)]'
              }`}>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Classification Output
                </span>
                <span className="text-3xl font-display font-black tracking-wider my-1">
                  {analysis.prediction}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono">Confidence Level:</span>
                  <span className="text-xs font-mono font-bold bg-slate-900/80 px-2 py-0.5 rounded border border-current">
                    {analysis.confidence}%
                  </span>
                </div>
              </div>

              {/* Explainability: Why did AI decide this? */}
              <div className="space-y-2.5 text-left">
                <h4 className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5 uppercase">
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                  Why did AI decide this?
                </h4>
                <div className="space-y-2">
                  {analysis.reasons.map((r, i) => (
                    <div key={i} className="p-3 rounded-xl bg-navy-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Live Telemetry Dashboard */}
          <LiveDashboard
            inputType="Email / Text Stream"
            featuresCount={analysis.detectedFeatures.length}
            currentStageName={currentStageMeta ? currentStageMeta.label : 'Idle'}
            confidence={analysis.confidence}
            prediction={analysis.prediction}
            elapsedTime={simulation.elapsedTime}
            isProcessing={simulation.isPlaying}
            isCompleted={simulation.isCompleted}
          />

          {/* Real-time Timeline Trace */}
          <TimelinePanel
            currentStep={simulation.currentStep}
            isPlaying={simulation.isPlaying}
            isCompleted={simulation.isCompleted}
          />
        </div>
      </div>
    </div>
  );
}
