import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import NeuralBackground from './components/NeuralBackground';
import SpamDetectorDemo from './components/scenarios/SpamDetectorDemo';
import ImageClassifierDemo from './components/scenarios/ImageClassifierDemo';
import MovieRecommenderDemo from './components/scenarios/MovieRecommenderDemo';
import DynamicPlayground from './components/DynamicPlayground';
import HumanVsAISection from './components/HumanVsAISection';
import HowAILearnsSection from './components/HowAILearnsSection';
import AIBiasDemo from './components/AIBiasDemo';
import EducationalCards from './components/EducationalCards';
import AINotMagicSection from './components/AINotMagicSection';
import BlackBoxFinale from './components/BlackBoxFinale';
import Footer from './components/Footer';
import { Mail, Image as ImageIcon, Film } from 'lucide-react';

export default function App() {
  const [activeScenario, setActiveScenario] = useState('spam'); // 'spam', 'image', 'movie'

  const heroRef = useRef(null);
  const simRef = useRef(null);
  const playgroundRef = useRef(null);
  const humanVsAiRef = useRef(null);
  const biasRef = useRef(null);
  const fundamentalsRef = useRef(null);

  const scrollToSection = (sectionId) => {
    const refMap = {
      hero: heroRef,
      simulation: simRef,
      playground: playgroundRef,
      'human-vs-ai': humanVsAiRef,
      bias: biasRef,
      fundamentals: fundamentalsRef
    };

    const targetRef = refMap[sectionId];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Interactive Neural Canvas Background */}
      <NeuralBackground interactive={true} />

      {/* Fixed Navbar */}
      <Navbar
        activeScenario={activeScenario}
        onSelectScenario={setActiveScenario}
        onNavClick={scrollToSection}
      />

      {/* Main Content Area */}
      <main className="relative z-10 space-y-20 sm:space-y-32 px-0 max-w-none mx-auto">
        {/* 1. Hero Section */}
        <div ref={heroRef} className="w-full">
          <HeroSection
            onTrySimulation={() => scrollToSection('simulation')}
            onExploreHowItWorks={() => scrollToSection('fundamentals')}
          />
        </div>

        {/* 2. Main AI Simulation Section */}
        <section ref={simRef} className="pt-6 px-4 sm:px-8 lg:px-14 max-w-[1600px] mx-auto">
          {/* AI Lab Header */}
          <div className="ai-panel px-4 sm:px-8 py-7 sm:py-9 mb-8 text-center">
            <div className="relative z-10">
              <div className="ai-section-label mb-3">01 / Interactive AI Lab</div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-white">Choose a system. <span className="text-cyan-400">Watch it think.</span></h2>
              <p className="mt-3 mb-6 text-sm text-slate-400 max-w-2xl mx-auto">Each simulation reveals a simplified decision pipeline—from raw input to a confidence-backed output.</p>
              <div className="inline-flex max-w-full overflow-x-auto items-center p-1.5 rounded-2xl glass-card border border-slate-800 bg-navy-950/80 shadow-glass-glow">
              <button
                onClick={() => setActiveScenario('spam')}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeScenario === 'spam'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Spam Detector (Default)</span>
              </button>

              <button
                onClick={() => setActiveScenario('image')}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeScenario === 'image'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Image Classifier</span>
              </button>

              <button
                onClick={() => setActiveScenario('movie')}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeScenario === 'movie'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Film className="w-4 h-4" />
                <span>Movie Recommender</span>
              </button>
              </div>
            </div>
          </div>

          {/* Active Simulation Engine Component */}
          <div className="transition-opacity duration-300">
            {activeScenario === 'spam' && <SpamDetectorDemo />}
            {activeScenario === 'image' && <ImageClassifierDemo />}
            {activeScenario === 'movie' && <MovieRecommenderDemo />}
          </div>
        </section>

        {/* 3. Real-time Dynamic Input Playground */}
        <section ref={playgroundRef} className="px-4 sm:px-8 lg:px-14 max-w-[1600px] mx-auto">
          <DynamicPlayground />
        </section>

        {/* 4. Human vs AI Prediction */}
        <div ref={humanVsAiRef} className="px-4 sm:px-8 lg:px-14 max-w-[1600px] mx-auto">
          <HumanVsAISection />
        </div>

        {/* 5. How AI Learns */}
        <div className="px-4 sm:px-8 lg:px-14 max-w-[1600px] mx-auto"><HowAILearnsSection /></div>

        {/* 6. AI Bias Demo */}
        <div ref={biasRef} className="px-4 sm:px-8 lg:px-14 max-w-[1600px] mx-auto">
          <AIBiasDemo />
        </div>

        {/* 7. Understand AI in 30 Seconds (Educational Cards) */}
        <div ref={fundamentalsRef} className="px-4 sm:px-8 lg:px-14 max-w-[1600px] mx-auto">
          <EducationalCards />
        </div>

        {/* 8. AI Is Not Magic */}
        <div className="px-4 sm:px-8 lg:px-14 max-w-[1600px] mx-auto"><AINotMagicSection /></div>

        {/* 9. Final Black Box Message */}
        <div className="px-4 sm:px-8 lg:px-14 max-w-[1600px] mx-auto"><BlackBoxFinale onRunAnother={() => scrollToSection('simulation')} /></div>
      </main>

      {/* Comprehensive Footer */}
      <Footer />
    </div>
  );
}
