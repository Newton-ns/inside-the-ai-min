import React, { useState } from 'react';
import { ComplianceResult, BoundingBox } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { LabelBoundingBoxViewer } from '../scanner/LabelBoundingBoxViewer';
import { NoticeGeneratorModal } from './NoticeGeneratorModal';
import { CertificateGenerator } from '../certificate/CertificateGenerator';
import { ComplianceScoreGauge } from '../common/ComplianceScoreGauge';
import { AllRulesChecklist } from '../common/RuleCheckBadge';
import { OCREntityCards } from './OCREntityCards';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Award,
  ShieldAlert,
  ArrowLeft,
  Download,
  Info,
  Layers,
  Sparkles,
  DollarSign,
  Building,
  HelpCircle,
  Zap
} from 'lucide-react';

interface ComplianceReportViewProps {
  result: ComplianceResult;
  imageUrl: string;
  productName: string;
  onBackToScan: () => void;
}

export const ComplianceReportView: React.FC<ComplianceReportViewProps> = ({
  result,
  imageUrl,
  productName,
  onBackToScan
}) => {
  const { t } = useLanguage();
  const [selectedBox, setSelectedBox] = useState<BoundingBox | null>(null);
  const [showNoticeModal, setShowNoticeModal] = useState<boolean>(false);
  const [showCertModal, setShowCertModal] = useState<boolean>(false);

  const scoreColor =
    result.compliance_score >= 85
      ? 'text-emerald-400 border-emerald-500'
      : result.compliance_score >= 50
      ? 'text-amber-400 border-amber-500'
      : 'text-rose-500 border-rose-500';

  const statusBadgeBg =
    result.status === 'COMPLIANT'
      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
      : result.status === 'PARTIALLY COMPLIANT'
      ? 'bg-amber-950/70 border-amber-500 text-amber-300'
      : 'bg-rose-950/70 border-rose-500 text-rose-300';

  return (
    <div className="space-y-8">
      {/* Top Bar Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <button
          onClick={onBackToScan}
          className="flex items-center space-x-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition-all w-fit cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scanner</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {result.violations.length > 0 && (
            <button
              onClick={() => setShowNoticeModal(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{t.report.genNotice}</span>
            </button>
          )}

          {result.compliance_score >= 70 && (
            <button
              onClick={() => setShowCertModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>{t.report.genCert}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Score & Risk Overview Banner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Score & Verdict Card */}
        <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Inspection Verdict
              </span>
              <h2 className="text-xl font-black text-white mt-0.5">{productName}</h2>
            </div>
            <span className={`px-3 py-1 rounded-xl text-xs font-extrabold uppercase border ${statusBadgeBg}`}>
              {result.status_label}
            </span>
          </div>

          {/* Circular Score Visual — animated gauge */}
          <div className="flex items-center space-x-6 py-2">
            <ComplianceScoreGauge
              score={result.compliance_score}
              status={result.status as 'COMPLIANT' | 'PARTIALLY COMPLIANT' | 'NON COMPLIANT'}
              size="md"
              animate
            />


            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{result.passed_rules.length} Mandatory Declarations Passed</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>{result.violations.length} Statutory Violations Found</span>
              </div>
              {result.warnings.length > 0 && (
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>{result.warnings.length} Incomplete Detail Warnings</span>
                </div>
              )}
            </div>
          </div>

          {/* Statutory Act Badge */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Framework:</span>
            <span className="text-slate-200 font-semibold">{result.statutory_act}</span>
          </div>
        </div>

        {/* Risk Profile & ML Prediction Card */}
        {result.risk_profile && (
          <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  AI Risk Prediction Model
                </h3>
              </div>
              <span
                className={`px-3 py-1 rounded-xl text-xs font-black uppercase ${
                  result.risk_profile.risk_level === 'High Risk'
                    ? 'bg-rose-950/80 border border-rose-500 text-rose-300'
                    : result.risk_profile.risk_level === 'Medium Risk'
                    ? 'bg-amber-950/80 border border-amber-500 text-amber-300'
                    : 'bg-emerald-950/80 border border-emerald-500 text-emerald-300'
                }`}
              >
                {result.risk_profile.risk_level} ({result.risk_profile.risk_score} / 100)
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Recommendation:</strong> {result.risk_profile.action_recommendation}
            </p>

            {/* Risk Factors Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {result.risk_profile.factors.map((f, i) => (
                <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-semibold">{f.factor}</div>
                  <div className="text-xs font-bold text-white mt-1 font-mono">{f.impact}</div>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
              <span>Historical Violations: {result.risk_profile.past_violations_recorded} recorded</span>
              <span>Category Multiplier: {result.risk_profile.category_sensitivity}x</span>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Bounding Box Inspector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">Interactive Label Bounding Box Assistant</h3>
          </div>
          <span className="text-xs text-slate-400">Hover or click boxes to inspect rule parameters</span>
        </div>

        <LabelBoundingBoxViewer
          imageUrl={imageUrl}
          boxes={result.annotated_boxes}
          onSelectBox={(b) => setSelectedBox(b)}
          selectedBoxId={selectedBox?.id}
        />
      </div>

      {/* Detailed Declarations & Violations Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Statutory Violations & Corrective Actions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Violations Section */}
          {result.violations.length > 0 && (
            <div className="bg-slate-900 border border-rose-900/40 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-rose-900/30 pb-3">
                <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
                  <XCircle className="w-5 h-5" />
                  <span>Statutory Violations ({result.violations.length})</span>
                </div>
                <span className="text-[11px] text-rose-300 font-mono font-semibold">
                  Section 36 Liability
                </span>
              </div>

              <div className="space-y-4">
                {result.violations.map((v, i) => (
                  <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-rose-900/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white font-mono">
                        {v.rule}
                      </span>
                      <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                        {v.severity}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-100">{v.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{v.description}</p>
                    {v.statutory_penalty && (
                      <div className="text-[11px] text-amber-400 font-mono bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                        ⚖️ Fine: {v.statutory_penalty}
                      </div>
                    )}
                    <div className="text-[11px] text-emerald-400 font-medium bg-emerald-950/30 p-2 rounded-lg border border-emerald-900/30">
                      <strong>Fix:</strong> {v.suggestion}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Corrective Action Guidance Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Actionable Guidance for Label Redesign
              </h3>
            </div>
            <ul className="space-y-2.5">
              {result.suggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Compliant Declarations & Schedule Specifications */}
        <div className="lg:col-span-5 space-y-6">
          {/* Compliant Declarations List */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm border-b border-slate-800 pb-3">
              <CheckCircle2 className="w-5 h-5" />
              <span>Compliant Declarations ({result.passed_rules.length})</span>
            </div>

            <div className="space-y-3">
              {result.passed_rules.map((p, i) => (
                <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{p.rule}</span>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">Pass</span>
                  </div>
                  <p className="text-slate-400 text-[11px] font-mono truncate">{p.details || p.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* OCR Entity Extraction Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <OCREntityCards entities={result.extracted_entities} />
          </div>

          {/* All 8 Rules Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
              Full PCR 2011 Rules Checklist
            </div>
            <AllRulesChecklist
              passed={result.passed_rules}
              violations={result.violations}
              warnings={result.warnings}
            />
          </div>

          {/* First Schedule Font Size Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              First Schedule: Minimum Font Size Matrix
            </h4>
            <div className="space-y-1.5 text-slate-400 text-[11px]">
              <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span>Net Qty ≤ 50 g / ml:</span>
                <span className="font-mono text-slate-200 font-bold">1.0 mm (2.0mm blown)</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span>50 g / ml to 200 g / ml:</span>
                <span className="font-mono text-slate-200 font-bold">2.0 mm (4.0mm blown)</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span>200 g / ml to 1 kg / L:</span>
                <span className="font-mono text-slate-200 font-bold">4.0 mm</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span>&gt; 1 kg / L:</span>
                <span className="font-mono text-amber-400 font-bold">6.0 mm (Current Req.)</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Modals */}
      <NoticeGeneratorModal
        isOpen={showNoticeModal}
        onClose={() => setShowNoticeModal(false)}
        result={result}
        productName={productName}
      />

      <CertificateGenerator
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        result={result}
        productName={productName}
      />
    </div>
  );
};
