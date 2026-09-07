import React from 'react';
import { Scale, ShieldAlert, PhoneCall, ExternalLink, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Emblem & About */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-xl">⚖️</span>
              <span className="text-base font-bold text-white tracking-tight">
                Legal Metrology <span className="text-amber-500">AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Smart India Hackathon (SIH-26034). Intelligent inspection platform for automated verification of packaged commodity labels under the Legal Metrology (Packaged Commodities) Rules, 2011.
            </p>
            <div className="flex items-center space-x-2 text-slate-300">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-[11px] font-semibold">Government of India Standard</span>
            </div>
          </div>

          {/* Col 2: Statutory Acts & Frameworks */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Statutory Acts & Rules</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/rules" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  Legal Metrology Act, 2009 (No. 1 of 2010)
                </Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  Packaged Commodities Rules, 2011 (as amended)
                </Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-blue-400 transition-colors">
                  First Schedule (Minimum Font Size Norms)
                </Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-blue-400 transition-colors">
                  Section 36 Offence & Penalty Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Modules */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Inspection Portals</h4>
            <ul className="space-y-1.5">
              <li><Link to="/scanner" className="hover:text-amber-400">AI Product Label Scanner</Link></li>
              <li><Link to="/inspector" className="hover:text-blue-400">Officer Enforcement Workspace</Link></li>
              <li><Link to="/manufacturer" className="hover:text-emerald-400">Manufacturer Pre-Production Check</Link></li>
              <li><Link to="/admin" className="hover:text-purple-400">National Compliance Heatmap</Link></li>
              <li><Link to="/consumer" className="hover:text-amber-400">Consumer Rights & Grievance Scan</Link></li>
            </ul>
          </div>

          {/* Col 4: Consumer Grievance & Helplines */}
          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 text-amber-400">
              <PhoneCall className="w-3.5 h-3.5" />
              National Consumer Helpline
            </h4>
            <p className="text-[11px] text-slate-300">
              Toll-Free Helpline for MRP overcharging & labeling complaints:
            </p>
            <div className="text-lg font-black text-amber-400 tracking-wider">
              1915 / 1800-11-4000
            </div>
            <p className="text-[10px] text-slate-400">
              SMS 'CONSUMER' to 8800001915 or file via consumerhelpline.gov.in
            </p>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-[11px] gap-4">
          <div>
            © {new Date().getFullYear()} Directorate of Legal Metrology, Ministry of Consumer Affairs, Food & Public Distribution, New Delhi.
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">Designed for SIH26034</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Production Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
