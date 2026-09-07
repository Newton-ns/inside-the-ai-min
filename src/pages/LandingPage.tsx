import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  Scale,
  ShieldCheck,
  ScanLine,
  CheckCircle2,
  AlertTriangle,
  Award,
  Zap,
  Building,
  UserCheck,
  BarChart3,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  FileCheck
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role: any, path: string) => {
    switchRole(role);
    navigate(path);
  };

  const featureCards = [
    {
      title: "Computer Vision & OCR Pipeline",
      desc: "Instant image enhancement, adaptive thresholding, and OCR extraction of all mandatory packaging fields in <1.5 seconds.",
      icon: Cpu,
      color: "from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/30"
    },
    {
      title: "Statutory Rule 6 Verification",
      desc: "Automated validation for generic commodity name, manufacturer address, 6-digit PIN, net quantity, MRP tax clause, mfg date, and country of origin.",
      icon: Scale,
      color: "from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/30"
    },
    {
      title: "Font Size & Area Engine",
      desc: "Validates minimum font height according to First Schedule based on Principal Display Panel area and net weight/volume ratios.",
      icon: Layers,
      color: "from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/30"
    },
    {
      title: "AI Risk Prediction Model",
      desc: "Identifies high-risk packaging using historical violations, manufacturer reliability index, and category risk weighting.",
      icon: Zap,
      color: "from-rose-500/20 to-rose-600/5 text-rose-400 border-rose-500/30"
    },
    {
      title: "Digital QR Certificates",
      desc: "Issue cryptographically signed compliance certificates with QR codes for public verification on government portals.",
      icon: Award,
      color: "from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30"
    },
    {
      title: "Enforcement Notice Generator",
      desc: "Instant generation of Form-I Inspection Notices and Section 15 Seizure memos with automatic Section 36 statutory penalty calculation.",
      icon: FileCheck,
      color: "from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/30"
    }
  ];

  return (
    <div className="space-y-24 py-6">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide uppercase shadow-lg shadow-amber-500/5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {t.hero.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.hero.desc}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/scanner"
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <ScanLine className="w-4 h-4" />
              <span>{t.hero.scanNow}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/rules"
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition-all"
            >
              {t.hero.viewRules}
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-slate-800/80 max-w-3xl mx-auto text-center">
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-emerald-400 font-mono">99.4%</div>
              <div className="text-xs text-slate-400 mt-0.5">{t.hero.accuracy}</div>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-blue-400 font-mono">&lt; 1.5s</div>
              <div className="text-xs text-slate-400 mt-0.5">{t.hero.speed}</div>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-amber-400 font-mono">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">{t.hero.rulesCovered}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Role-Based Stakeholder Portals */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Tailored Workspaces for Every Stakeholder
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Choose your role to access specialized compliance, enforcement, and verification tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Inspector Card */}
          <div
            onClick={() => handleRoleSelect('inspector', '/inspector')}
            className="group bg-slate-900 border border-slate-800 hover:border-blue-500 rounded-3xl p-6 shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer flex flex-col justify-between space-y-6 hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                Legal Metrology Officer
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scan market packages, detect statutory labeling violations, issue Form-I notices, and log seizures.
              </p>
            </div>
            <div className="text-xs font-bold text-blue-400 flex items-center gap-1">
              <span>Open Officer Desk</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Manufacturer Card */}
          <div
            onClick={() => handleRoleSelect('manufacturer', '/manufacturer')}
            className="group bg-slate-900 border border-slate-800 hover:border-emerald-500 rounded-3xl p-6 shadow-xl hover:shadow-emerald-500/10 transition-all cursor-pointer flex flex-col justify-between space-y-6 hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                Manufacturer / Packer
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verify artwork prior to mass printing, simulate font heights, receive corrective guidance, and download certificates.
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <span>Enter Pre-Production Studio</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Admin Card */}
          <div
            onClick={() => handleRoleSelect('admin', '/admin')}
            className="group bg-slate-900 border border-slate-800 hover:border-purple-500 rounded-3xl p-6 shadow-xl hover:shadow-purple-500/10 transition-all cursor-pointer flex flex-col justify-between space-y-6 hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                Department Administrator
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                State & National compliance heatmaps, category-wise risk trends, officer activity logs, and penalty realization.
              </p>
            </div>
            <div className="text-xs font-bold text-purple-400 flex items-center gap-1">
              <span>View Analytics & Governance</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Consumer Card */}
          <div
            onClick={() => handleRoleSelect('consumer', '/consumer')}
            className="group bg-slate-900 border border-slate-800 hover:border-amber-500 rounded-3xl p-6 shadow-xl hover:shadow-amber-500/10 transition-all cursor-pointer flex flex-col justify-between space-y-6 hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                Citizen / Consumer
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scan products to check for MRP overcharging, missing country of origin, deceptive packaging, or report violations.
              </p>
            </div>
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <span>Check Consumer Rights</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Features Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Architecture & Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            How LegalMetrologyAI Automates Compliance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className={`bg-gradient-to-br ${feat.color} bg-slate-900/80 border p-6 rounded-3xl space-y-3 shadow-xl`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-700/60 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Statutory Rule Matrix Summary Table */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-white">Legal Metrology (Packaged Commodities) Rules, 2011</h3>
            <p className="text-xs text-slate-400">Statutory checks enforced by the AI inspection engine</p>
          </div>
          <Link
            to="/rules"
            className="text-xs text-blue-400 font-bold hover:underline flex items-center gap-1"
          >
            <span>View Complete Statutory Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-3 rounded-l-xl">Statutory Rule</th>
                <th className="p-3">Mandatory Requirement</th>
                <th className="p-3">Automated AI Detection Method</th>
                <th className="p-3 rounded-r-xl">Section 36 Liability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="p-3 font-mono text-amber-400 font-bold">Rule 6(1)(a)</td>
                <td className="p-3">Manufacturer / Packer name & complete address with PIN code</td>
                <td className="p-3">NER address parser & 6-digit postal code validator</td>
                <td className="p-3 text-rose-400 font-semibold">Fine up to ₹25,000</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-amber-400 font-bold">Rule 6(1)(b)</td>
                <td className="p-3">Generic or common name of the commodity</td>
                <td className="p-3">Principal Display Panel title extraction</td>
                <td className="p-3 text-rose-400 font-semibold">Fine up to ₹25,000</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-amber-400 font-bold">Rule 6(1)(c)</td>
                <td className="p-3">Net quantity in standard metric units (g, kg, ml, l, N)</td>
                <td className="p-3">Regex unit analyzer (flags non-standard 'gms', 'kgs')</td>
                <td className="p-3 text-rose-400 font-semibold">Fine up to ₹50,000</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-amber-400 font-bold">Rule 6(1)(d)</td>
                <td className="p-3">Month and Year of manufacture, packing, or import</td>
                <td className="p-3">Date parser (validates MM/YYYY or Month YYYY)</td>
                <td className="p-3 text-rose-400 font-semibold">Fine up to ₹25,000</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-amber-400 font-bold">Rule 6(1)(e)</td>
                <td className="p-3">Maximum Retail Price (MRP) 'incl. of all taxes'</td>
                <td className="p-3">Currency symbol & mandatory tax clause matcher</td>
                <td className="p-3 text-rose-400 font-semibold">Fine up to ₹1,00,000</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-amber-400 font-bold">Rule 6(1)(f)</td>
                <td className="p-3">Consumer care helpline number and email address</td>
                <td className="p-3">Contact entity extractor & toll-free pattern verifier</td>
                <td className="p-3 text-rose-400 font-semibold">Fine up to ₹25,000</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-amber-400 font-bold">Rule 6(1)(g)</td>
                <td className="p-3">Country of Origin on all domestic & imported goods</td>
                <td className="p-3">Country identification and import cross-verifier</td>
                <td className="p-3 text-rose-400 font-semibold">Seizure & Penal fine</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
