import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, UserCircle, Mic, Globe, Scale, FileText, CheckCircle2, BarChart3, ScanLine, AlertTriangle } from 'lucide-react';
import { UserRole } from '../../types';

interface HeaderProps {
  onOpenVoiceAssistant?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenVoiceAssistant }) => {
  const { currentUser, switchRole } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const roleLabels: Record<UserRole, { title: string; color: string }> = {
    inspector: { title: "Inspector (LMO)", color: "bg-blue-600 text-white" },
    manufacturer: { title: "Manufacturer", color: "bg-emerald-600 text-white" },
    admin: { title: "Admin", color: "bg-purple-600 text-white" },
    consumer: { title: "Consumer", color: "bg-amber-600 text-white" }
  };

  const navLinks = [
    { to: "/", label: t.nav.home, icon: Scale },
    { to: "/scanner", label: t.nav.scanner, icon: ScanLine },
    { to: "/inspector", label: t.nav.inspectorDashboard, icon: ShieldCheck, role: 'inspector' },
    { to: "/manufacturer", label: t.nav.manufacturerDashboard, icon: CheckCircle2, role: 'manufacturer' },
    { to: "/admin", label: t.nav.adminDashboard, icon: BarChart3, role: 'admin' },
    { to: "/consumer", label: t.nav.consumerPortal, icon: AlertTriangle, role: 'consumer' },
    { to: "/rules", label: t.nav.rulesCatalog, icon: FileText }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Gov Info Strip */}
      <div className="bg-slate-950 px-4 py-1 border-b border-slate-800/80 text-xs text-slate-400 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-amber-500 tracking-wider uppercase">SIH-26034</span>
          <span>•</span>
          <span>{t.ministry}</span>
          <span>•</span>
          <span className="text-slate-300 font-medium">{t.govIndia}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Legal Metrology Act, 2009 & PCR 2011 Engine Active
          </span>
          <div className="flex items-center space-x-1">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-slate-900 text-slate-200 border border-slate-700 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="en">English (EN)</option>
              <option value="hi">हिन्दी (HI)</option>
              <option value="ta">தமிழ் (TA)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Emblem */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/30 border border-amber-400/40 text-slate-950 font-black text-xl">
              ⚖️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  LegalMetrology<span className="text-amber-500">AI</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-900/60 border border-blue-600/40 text-blue-300 font-semibold uppercase">
                  PCR 2011
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                AI Compliance Inspector for Packaged Commodities
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: Voice Assistant & Role Switcher */}
          <div className="flex items-center space-x-3">
            {/* Voice Assistant Trigger */}
            <button
              onClick={onOpenVoiceAssistant}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 hover:text-amber-300 text-xs font-medium transition-all shadow-sm hover:scale-105 active:scale-95"
              title="Activate AI Voice Inspection Assistant"
            >
              <Mic className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span className="hidden sm:inline">Voice AI</span>
            </button>

            {/* Role Switcher Pill Dropdown */}
            <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <UserCircle className="w-4 h-4 text-slate-400 ml-1" />
              <select
                value={currentUser.role}
                onChange={(e) => switchRole(e.target.value as UserRole)}
                className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer pr-1"
                aria-label="Switch User Role"
              >
                <option value="inspector" className="bg-slate-900 text-blue-400">🛡️ Legal Metrology Officer</option>
                <option value="manufacturer" className="bg-slate-900 text-emerald-400">🏭 Manufacturer / Packer</option>
                <option value="admin" className="bg-slate-900 text-purple-400">🏛️ Department Admin</option>
                <option value="consumer" className="bg-slate-900 text-amber-400">👤 Citizen / Consumer</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
