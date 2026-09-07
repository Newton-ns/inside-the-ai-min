import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ProductScanner } from '../components/scanner/ProductScanner';
import { ComplianceReportView } from '../components/reports/ComplianceReportView';
import { ComplianceResult } from '../types';
import {
  Building,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Printer,
  Sparkles,
  ShieldCheck,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ManufacturerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [scanResult, setScanResult] = useState<{
    result: ComplianceResult;
    imageUrl: string;
    productName: string;
  } | null>(null);

  const preFlightChecklist = [
    { title: "Generic Name of Commodity", rule: "Rule 6(1)(b)", status: "verified", desc: "Generic name must be printed prominently on Principal Display Panel." },
    { title: "Manufacturer Postal PIN Code", rule: "Rule 6(1)(a)", status: "warning", desc: "Complete street address with 6-digit PIN code is mandatory." },
    { title: "Metric Units without Plural 's'", rule: "Rule 6(1)(c)", status: "verified", desc: "Use 'g' or 'kg' (not 'gms' or 'kgs')." },
    { title: "MRP inclusive of all taxes clause", rule: "Rule 6(1)(e)", status: "verified", desc: "Explicit '(incl. of all taxes)' phrase required next to MRP." },
    { title: "Country of Origin", rule: "Rule 6(1)(g)", status: "verified", desc: "Mandatory 'Country of Origin: India' for all domestic goods." }
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Manufacturer Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Building className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.company || "Shanti Agro Foods Pvt. Ltd."}</h1>
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold">
                LM-MFG-HR-2021-9982
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Manufacturer Pre-Production Packaging Verification Studio • PCR 2011 Pre-Flight Check
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-right">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Manufacturer Trust Index</span>
            <span className="text-base font-black text-emerald-400 font-mono">94% (Grade A - Low Risk)</span>
          </div>
        </div>
      </div>

      {scanResult ? (
        <ComplianceReportView
          result={scanResult.result}
          imageUrl={scanResult.imageUrl}
          productName={scanResult.productName}
          onBackToScan={() => setScanResult(null)}
        />
      ) : (
        <div className="space-y-8">
          {/* Pre-Production Notice Card */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Pre-Flight Label Verification Mode
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Scan artwork proofs before mass cylinder engraving or rotogravure printing. Eliminate packaging scrap and avert Section 36 prosecution.
              </p>
            </div>
          </div>

          {/* Product Scanner */}
          <ProductScanner
            onScanComplete={(res, img, name) => setScanResult({ result: res, imageUrl: img, productName: name })}
          />

          {/* Pre-flight Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Mandatory Declarations Pre-Flight Checklist
              </h3>
              <span className="text-xs text-slate-400">Legal Metrology (Packaged Commodities) Rules, 2011</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {preFlightChecklist.map((item, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200 text-xs">{item.title}</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">{item.rule}</span>
                  </div>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
