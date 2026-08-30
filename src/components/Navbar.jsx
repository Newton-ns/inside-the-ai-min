import React, { useState } from 'react';
import { BrainCircuit, Mail, Image as ImageIcon, Film, Menu, X, Activity } from 'lucide-react';

export default function Navbar({ activeScenario, onSelectScenario, onNavClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scenarios = [
    { id: 'spam', label: 'Spam Detector', icon: Mail },
    { id: 'image', label: 'Image Classifier', icon: ImageIcon },
    { id: 'movie', label: 'Movie Recommender', icon: Film }
  ];

  const handleScenarioClick = (id) => {
    onSelectScenario(id);
    setMobileMenuOpen(false);
    onNavClick('simulation');
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-5 py-3 bg-[#030712]/72 backdrop-blur-2xl border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavClick('hero')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-300 via-cyan-400 to-blue-500 flex items-center justify-center text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
            <BrainCircuit className="w-5 h-5 font-bold" />
          </div>
          <div>
            <span className="text-base font-black font-display tracking-tight text-white block">
              Inside the <span className="text-cyan-400">AI Mind</span>
            </span>
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block -mt-1">
              NEURAL INTERFACE · ONLINE
            </span>
          </div>
        </div>

        {/* Desktop Scenario Switcher Tabs */}
        <div className="hidden md:flex items-center bg-navy-900/90 p-1.5 rounded-2xl border border-slate-800">
          {scenarios.map((sc) => {
            const Icon = sc.icon;
            const isActive = activeScenario === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => handleScenarioClick(sc.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sc.label}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation Quick Jump Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-white/[0.025] border border-white/[0.06] text-xs font-medium text-slate-400">
          <button onClick={() => onNavClick('simulation')} className="px-2.5 py-2 rounded-xl hover:text-cyan-200 hover:bg-cyan-400/[0.07] transition-all">
            Simulation
          </button>
          <button onClick={() => onNavClick('playground')} className="px-2.5 py-2 rounded-xl hover:text-cyan-200 hover:bg-cyan-400/[0.07] transition-all">
            Playground
          </button>
          <button onClick={() => onNavClick('human-vs-ai')} className="px-2.5 py-2 rounded-xl hover:text-cyan-200 hover:bg-cyan-400/[0.07] transition-all">
            AI vs Human
          </button>
          <button onClick={() => onNavClick('bias')} className="px-2.5 py-2 rounded-xl hover:text-cyan-200 hover:bg-cyan-400/[0.07] transition-all">
            AI Bias
          </button>
          <button onClick={() => onNavClick('fundamentals')} className="px-2.5 py-2 rounded-xl hover:text-cyan-200 hover:bg-cyan-400/[0.07] transition-all">
            Fundamentals
          </button>
        </nav>

        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] text-[10px] font-mono text-emerald-300"><Activity className="w-3 h-3" /> LIVE</div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-3 border-t border-slate-800 mt-3 space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase px-2">Scenarios</span>
            {scenarios.map((sc) => {
              const Icon = sc.icon;
              const isActive = activeScenario === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleScenarioClick(sc.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                    isActive ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{sc.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs font-mono">
            <button
              onClick={() => { onNavClick('simulation'); setMobileMenuOpen(false); }}
              className="p-2 rounded-lg bg-navy-900 text-slate-300 text-left"
            >
              Simulation
            </button>
            <button
              onClick={() => { onNavClick('playground'); setMobileMenuOpen(false); }}
              className="p-2 rounded-lg bg-navy-900 text-slate-300 text-left"
            >
              Playground
            </button>
            <button
              onClick={() => { onNavClick('human-vs-ai'); setMobileMenuOpen(false); }}
              className="p-2 rounded-lg bg-navy-900 text-slate-300 text-left"
            >
              AI vs Human
            </button>
            <button
              onClick={() => { onNavClick('bias'); setMobileMenuOpen(false); }}
              className="p-2 rounded-lg bg-navy-900 text-slate-300 text-left"
            >
              AI Bias
            </button>
            <button
              onClick={() => { onNavClick('fundamentals'); setMobileMenuOpen(false); }}
              className="p-2 rounded-lg bg-navy-900 text-slate-300 text-left"
            >
              Fundamentals
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
