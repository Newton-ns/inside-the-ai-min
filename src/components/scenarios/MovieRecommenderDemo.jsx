import React, { useState, useMemo } from 'react';
import { 
  Film, Sparkles, Sliders, Zap, CheckCircle2, ArrowRight, 
  HelpCircle, Compass, Heart, Eye, Smile, Flame, Star 
} from 'lucide-react';
import { GENRES, MOVIE_DATABASE, recommendMovies } from '../../engine/recEngine';
import { useSimulation, PIPELINE_STAGES } from '../../hooks/useSimulation';
import SimulationControls from '../SimulationControls';
import PipelineStepper from '../PipelineStepper';
import LiveDashboard from '../LiveDashboard';
import TimelinePanel from '../TimelinePanel';

const ICON_MAP = {
  Sparkles: Sparkles,
  Zap: Zap,
  Eye: Eye,
  Smile: Smile,
  Heart: Heart,
  Flame: Flame
};

export default function MovieRecommenderDemo() {
  const [preferences, setPreferences] = useState({
    scifi: 90,
    action: 80,
    thriller: 65,
    comedy: 25,
    drama: 45,
    romance: 15
  });

  const simulation = useSimulation(6);

  const recommendation = useMemo(() => recommendMovies(preferences), [preferences]);

  const handleSliderChange = (genreId, value) => {
    setPreferences(prev => ({
      ...prev,
      [genreId]: Number(value)
    }));
    if (simulation.isPlaying || simulation.isCompleted) {
      simulation.reset();
    }
  };

  const currentStageMeta = PIPELINE_STAGES.find(s => s.id === simulation.currentStep);

  return (
    <div className="space-y-8">
      {/* Top Stepper Bar */}
      <div className="p-6 rounded-3xl glass-card border border-cyan-500/20 shadow-glass-glow">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Vector Space Embedding
              </span>
              <h2 className="text-xl font-bold font-display text-white">
                Recommender System & Similarity Engine
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Explore how AI projects user preferences into high-dimensional geometric embedding space to calculate cosine similarity against candidate items.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Status:</span>
            <span className="text-xs font-mono font-semibold text-purple-300">
              {simulation.isPlaying ? 'Vector Matching' : simulation.isCompleted ? 'Matched' : 'Ready'}
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
        {/* Left Column: Interest Sliders & Preference Vector Space (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* User Preference Sliders */}
          <div className="p-6 rounded-3xl glass-card border border-cyan-500/20 shadow-glass-glow space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <label className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                Tune Your Preference Embeddings
              </label>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                6-D Vector
              </span>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GENRES.map((genre) => {
                const Icon = ICON_MAP[genre.icon] || Sparkles;
                const value = preferences[genre.id] || 0;

                return (
                  <div key={genre.id} className="p-3.5 rounded-2xl bg-navy-950/70 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                        <Icon className="w-3.5 h-3.5" style={{ color: genre.color }} />
                        {genre.label}
                      </span>
                      <span className="font-mono font-bold text-cyan-300">{value}%</span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => handleSliderChange(genre.id, e.target.value)}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                );
              })}
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

          {/* Mathematical Pipeline Flow (Step 2 to 4) */}
          <div className="p-6 rounded-3xl glass-card border border-cyan-500/20 shadow-glass-glow space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                  Geometric Similarity Pipeline
                </h3>
              </div>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                Cosine Metric
              </span>
            </div>

            {/* 4-Step Diagrammatic Horizontal Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { title: 'User Preferences', desc: 'Raw slider scalar values', step: 1 },
                { title: 'Vector Projection', desc: 'Normalized N-dim vector', step: 2 },
                { title: 'Dot-Product Match', desc: 'Cosine angle computation', step: 3 },
                { title: 'Ranked Scoring', desc: 'Softmax top-K candidates', step: 4 }
              ].map((flow, idx) => {
                const isActive = simulation.currentStep >= flow.step + 1;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isActive
                        ? 'bg-navy-950 border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.15)] text-slate-100'
                        : 'bg-navy-950/40 border-slate-800/80 text-slate-500'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-cyan-400 font-bold block mb-1">0{idx + 1}</span>
                    <h5 className="text-xs font-bold truncate">{flow.title}</h5>
                    <p className="text-[10px] text-slate-400 mt-1 leading-tight">{flow.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Formula visualization */}
            <div className="p-3.5 rounded-2xl bg-navy-950/90 border border-slate-800 text-center font-mono text-xs text-slate-300">
              <span className="text-slate-500 mr-2">Similarity Formula:</span>
              <code className="text-cyan-300">similarity(U, M) = (U · M) / (||U|| · ||M||)</code>
            </div>
          </div>
        </div>

        {/* Right Column: Matched Movie, Scores & Live Telemetry (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Step 5 & 6: Top Movie Recommendation Result */}
          {simulation.currentStep >= 5 ? (
            <div className="p-6 rounded-3xl glass-card-glow border border-cyan-400 shadow-neon-cyan animate-scale-up space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                    Optimal Content Match
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-300 font-bold bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-500/40">
                  {recommendation.topRecommendation.matchScore}% SIMILARITY
                </span>
              </div>

              {/* Movie Showcase Card */}
              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-navy-950">
                <div className="relative h-44 w-full">
                  <img
                    src={recommendation.topRecommendation.poster}
                    alt={recommendation.topRecommendation.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-mono font-bold uppercase text-cyan-300 bg-slate-900/90 px-2 py-0.5 rounded border border-cyan-500/30">
                      {recommendation.topRecommendation.category}
                    </span>
                    <h4 className="text-lg font-bold font-display text-white mt-1">
                      {recommendation.topRecommendation.title}
                    </h4>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-xs text-slate-400 italic">
                    "{recommendation.topRecommendation.tagline}"
                  </p>

                  <div className="p-3 rounded-xl bg-navy-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{recommendation.topRecommendation.whyMatch}</span>
                  </div>
                </div>
              </div>

              {/* Other Candidate Rankings */}
              <div className="space-y-2">
                <p className="text-[11px] font-mono text-slate-400 uppercase">Runner-Up Similarity Rankings:</p>
                {recommendation.allRanked.slice(1, 3).map((m, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-navy-950/80 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300 truncate max-w-[200px]">{m.title}</span>
                    <span className="font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                      {m.matchScore}% Match
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl glass-card border border-slate-800 text-center text-slate-500 space-y-2">
              <Film className="w-8 h-8 text-slate-600 mx-auto animate-pulse" />
              <p className="text-xs font-mono uppercase font-semibold">Recommendation Standby</p>
              <p className="text-[11px] text-slate-500">
                Adjust preference sliders and start simulation to compute geometric vector similarity.
              </p>
            </div>
          )}

          {/* Telemetry Dashboard */}
          <LiveDashboard
            inputType="6D Continuous Scalar Vector"
            featuresCount={Object.keys(preferences).length}
            currentStageName={currentStageMeta ? currentStageMeta.label : 'Idle'}
            confidence={recommendation.topRecommendation.matchScore}
            prediction={recommendation.topRecommendation.title}
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
