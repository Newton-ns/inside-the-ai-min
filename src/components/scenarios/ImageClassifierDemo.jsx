import React, { useState } from 'react';
import { 
  Scan, Sparkles, Layers, Cpu, CheckCircle2, ArrowRight, Eye, 
  HelpCircle, Compass, Image as ImageIcon, BoxSelect, Zap 
} from 'lucide-react';
import { IMAGE_SAMPLES, CONV_LAYERS } from '../../engine/imageEngine';
import { useSimulation, PIPELINE_STAGES } from '../../hooks/useSimulation';
import SimulationControls from '../SimulationControls';
import PipelineStepper from '../PipelineStepper';
import ConfidenceMeter from '../ConfidenceMeter';
import LiveDashboard from '../LiveDashboard';
import TimelinePanel from '../TimelinePanel';

export default function ImageClassifierDemo() {
  const [selectedId, setSelectedId] = useState('cat');
  const simulation = useSimulation(6);

  const selectedSample = IMAGE_SAMPLES.find(s => s.id === selectedId) || IMAGE_SAMPLES[0];

  const handleSelectSample = (id) => {
    setSelectedId(id);
    simulation.reset();
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
                Visual Vision Pipeline
              </span>
              <h2 className="text-xl font-bold font-display text-white">
                Convolutional Image Classifier
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Observe how raw pixels are filtered through edge detection kernels, pooled into feature maps, and resolved into class probabilities.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Status:</span>
            <span className="text-xs font-mono font-semibold text-cyan-300">
              {simulation.isPlaying ? 'Scanning Image' : simulation.isCompleted ? 'Classified' : 'Ready'}
            </span>
          </div>
        </div>

        <PipelineStepper
          currentStep={simulation.currentStep}
          onSelectStep={simulation.jumpToStep}
          isCompleted={simulation.isCompleted}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Sample Select, Scanning Image, Convolutional Feature Maps (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Sample Image Cards */}
          <div className="p-6 rounded-3xl glass-card border border-cyan-500/20 shadow-glass-glow space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                Select Input Visual Tensor (Image)
              </label>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                224 x 224 x 3 RGB
              </span>
            </div>

            {/* 3 Selectable Image Cards */}
            <div className="grid grid-cols-3 gap-3">
              {IMAGE_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample.id)}
                  className={`group relative rounded-2xl overflow-hidden border-2 p-2 transition-all text-left flex flex-col items-center ${
                    selectedId === sample.id
                      ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                      : 'border-slate-800 bg-navy-950/60 hover:border-slate-700'
                  }`}
                >
                  <div className="w-full h-24 sm:h-28 rounded-xl overflow-hidden relative mb-2">
                    <img
                      src={sample.imageUrl}
                      alt={sample.label}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                    <span className="absolute bottom-1.5 left-2 text-[10px] font-mono font-bold text-white bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700">
                      {sample.badge}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-200 truncate w-full text-center">
                    {sample.label.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Simulation Controls */}
            <div className="mt-4">
              <SimulationControls
                isPlaying={simulation.isPlaying}
                isCompleted={simulation.isCompleted}
                currentStep={simulation.currentStep}
                speed={simulation.speed}
                onStart={simulation.start}
                onPause={simulation.pause}
                onResume={simulation.resume}
                onReplay={simulation.replay}
                onReset={simulation.reset}
                onSetSpeed={simulation.setSpeed}
              />
            </div>
          </div>

          {/* Interactive Laser Scanning Viewport */}
          <div className="p-6 rounded-3xl glass-card border border-cyan-500/20 shadow-glass-glow relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Scan className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                  Spatial Tensor Feed & Laser Feature Scanner
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                {simulation.isPlaying ? 'Scanning...' : 'Stream Ready'}
              </span>
            </div>

            {/* Image Canvas with Scanning Laser Overlay */}
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-navy-950 border border-slate-800 flex items-center justify-center">
              <img
                src={selectedSample.imageUrl}
                alt={selectedSample.label}
                className="w-full h-full object-cover"
              />

              {/* Grid overlay */}
              <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

              {/* Animated Laser Scanning Line */}
              {simulation.isPlaying && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(0,240,255,1)] animate-scanline pointer-events-none z-10" />
              )}

              {/* Detected Feature Bounding Regions (Step 3+) */}
              {simulation.currentStep >= 3 && selectedSample.detectedFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="absolute border-2 border-cyan-400 bg-cyan-500/10 rounded-lg shadow-[0_0_12px_rgba(0,240,255,0.4)] animate-pulse transition-all"
                  style={{
                    top: feat.box.top,
                    left: feat.box.left,
                    width: feat.box.width,
                    height: feat.box.height
                  }}
                >
                  <span className="absolute -top-6 left-0 bg-slate-950/90 text-cyan-300 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-cyan-500/40 whitespace-nowrap">
                    {feat.name} (+{feat.weight}%)
                  </span>
                </div>
              ))}
            </div>

            {/* Detected Features List */}
            {simulation.currentStep >= 3 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedSample.detectedFeatures.map((feat, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-navy-950/80 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <BoxSelect className="w-4 h-4 text-cyan-400" />
                      <div>
                        <span className="font-semibold text-slate-200 block">{feat.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{feat.category}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-300 font-bold bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-500/30">
                      +{feat.weight}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Step 4: Convolutional Neural Layers Deep Dive */}
          <div className="p-6 rounded-3xl glass-card border border-cyan-500/20 shadow-glass-glow space-y-4">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                  Convolutional Filter Hierarchy
                </h3>
              </div>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                Hierarchical Abstraction
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CONV_LAYERS.map((layer, idx) => {
                const isActive = simulation.currentStep >= idx + 1;
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isActive
                        ? 'bg-navy-950/90 border-cyan-500/40 text-slate-200 shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                        : 'bg-navy-950/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold font-mono text-cyan-300">
                        {layer.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700">
                        {layer.frequency}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {layer.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Probabilities, Decision & Telemetry (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Step 5: Confidence & Probability Distribution */}
          {simulation.currentStep >= 5 ? (
            <div className="p-6 rounded-3xl glass-card border border-cyan-500/20 shadow-glass-glow space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                    Softmax Class Distribution
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  Step 05
                </span>
              </div>

              {/* Progress Bars for each class */}
              <div className="space-y-3">
                {selectedSample.probabilities.map((prob, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">{prob.label}</span>
                      <span className="font-mono text-cyan-300">{prob.percentage}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${prob.percentage}%`,
                          backgroundColor: prob.color,
                          boxShadow: `0 0 10px ${prob.color}`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <strong className="text-cyan-300">Softmax Normalization:</strong> Scores across all classes sum strictly to 100%, representing multi-class relative likelihood.
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl glass-card border border-slate-800 text-center text-slate-500 space-y-2">
              <Eye className="w-8 h-8 text-slate-600 mx-auto animate-pulse" />
              <p className="text-xs font-mono uppercase font-semibold">Class Probability Standby</p>
              <p className="text-[11px] text-slate-500">
                Trigger simulation to compute pixel feature maps and softmax distribution.
              </p>
            </div>
          )}

          {/* Step 6: Final Prediction & Explanation */}
          {simulation.currentStep >= 6 && (
            <div className="p-6 rounded-3xl glass-card-glow border border-cyan-400 shadow-neon-cyan animate-scale-up space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                    Step 6: Vision Model Prediction
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                  argmax Winner
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-b from-cyan-950/60 to-blue-950/40 border border-cyan-500/50 text-center flex flex-col items-center justify-center shadow-[0_0_25px_rgba(0,240,255,0.2)]">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Predicted Class
                </span>
                <span className="text-3xl font-display font-black tracking-wider text-cyan-300 my-1">
                  {selectedSample.prediction}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono text-slate-300">Confidence Score:</span>
                  <span className="text-xs font-mono font-bold bg-slate-900 px-2.5 py-0.5 rounded border border-cyan-400 text-cyan-300">
                    {selectedSample.confidence}%
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-navy-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-1.5 font-bold font-mono text-cyan-300 text-[11px] uppercase">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Visual Feature Rationale
                </div>
                <p className="leading-relaxed text-slate-300">
                  {selectedSample.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Telemetry Dashboard */}
          <LiveDashboard
            inputType="2D RGB Spatial Tensor"
            featuresCount={selectedSample.detectedFeatures.length}
            currentStageName={currentStageMeta ? currentStageMeta.label : 'Idle'}
            confidence={selectedSample.confidence}
            prediction={selectedSample.prediction}
            elapsedTime={simulation.elapsedTime}
            isProcessing={simulation.isPlaying}
            isCompleted={simulation.isCompleted}
          />

          {/* Step Timeline */}
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
