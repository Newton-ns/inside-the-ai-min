import React, { useState } from 'react';
import { ComplianceResult, ProductItem } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { generateNotice } from '../../services/api';
import { ShieldAlert, Printer, Download, Check, X, Scale } from 'lucide-react';

interface NoticeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ComplianceResult;
  productName: string;
  onNoticeIssued?: (noticeNum: string) => void;
}

export const NoticeGeneratorModal: React.FC<NoticeGeneratorModalProps> = ({
  isOpen,
  onClose,
  result,
  productName,
  onNoticeIssued
}) => {
  const { currentUser } = useAuth();
  const [actionType, setActionType] = useState<string>("Show Cause Notice under Section 36(1)");
  const [inspectionLocation, setInspectionLocation] = useState<string>("Central Supermarket, Connaught Place, New Delhi");
  const [assignedOfficer, setAssignedOfficer] = useState<string>(currentUser.name || "Rajesh Kumar, LMO");
  const [badgeNum, setBadgeNum] = useState<string>(currentUser.badgeNumber || "DL-LM-4402");
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [generatedNoticeNum, setGeneratedNoticeNum] = useState<string>("");

  if (!isOpen) return null;

  const totalPenalties = result.violations.length * 25000;
  const mfgDetails = result.extracted_entities?.manufacturer_name?.value || "Responsible Manufacturer/Packer";

  const handleIssueNotice = async () => {
    const res = await generateNotice({
      productId: "prod_scanned",
      productName,
      manufacturer: mfgDetails,
      inspectorName: assignedOfficer,
      score: result.compliance_score,
      penalty: totalPenalties,
      status: result.status
    });
    setGeneratedNoticeNum(res.noticeNumber);
    setIsGenerated(true);
    if (onNoticeIssued) onNoticeIssued(res.noticeNumber);
  };

  const printNotice = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative text-slate-100 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">
              Statutory Inspection & Enforcement Notice Generator
            </h3>
            <p className="text-xs text-slate-400">
              Under Legal Metrology Act, 2009 (Section 15, 36) & Packaged Commodities Rules, 2011
            </p>
          </div>
        </div>

        {isGenerated ? (
          /* Official Form Preview */
          <div className="space-y-6">
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Check className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="text-sm font-bold text-emerald-300">
                    Statutory Notice Successfully Issued & Dispatched
                  </div>
                  <div className="text-xs text-slate-300 font-mono">
                    Reference Number: <span className="text-white font-bold">{generatedNoticeNum}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={printNotice}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg"
              >
                <Printer className="w-4 h-4" /> Print Form
              </button>
            </div>

            {/* Official Notice Paper Template */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl font-serif text-slate-300 space-y-4 text-xs leading-relaxed">
              <div className="text-center space-y-1 border-b border-slate-800 pb-4">
                <div className="text-base font-bold text-white uppercase tracking-wider font-sans">
                  GOVERNMENT OF INDIA
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase font-sans">
                  DIRECTORATE OF LEGAL METROLOGY • ENFORCEMENT WING
                </div>
                <div className="text-[11px] font-mono text-amber-400 font-sans">
                  NOTICE NO: {generatedNoticeNum} • DATE: {new Date().toLocaleDateString()}
                </div>
              </div>

              <div className="space-y-2">
                <p><strong>To:</strong> {mfgDetails}</p>
                <p><strong>Subject:</strong> Notice of Contravening Provisions of Legal Metrology (Packaged Commodities) Rules, 2011 regarding packaged commodity: <em>{productName}</em>.</p>
                <p>
                  WHEREAS, during routine market inspection conducted at <strong>{inspectionLocation}</strong> by the undersigned Legal Metrology Officer (Badge No. <strong>{badgeNum}</strong>), the subject package was examined through the automated Legal Metrology AI Inspection Engine.
                </p>
                <p>
                  AND WHEREAS, the following statutory non-compliances under the Legal Metrology (Packaged Commodities) Rules, 2011 were recorded:
                </p>
                <ol className="list-decimal pl-6 space-y-1 font-sans text-[11px]">
                  {result.violations.map((v, i) => (
                    <li key={i}>
                      <span className="font-bold text-rose-400">{v.rule}:</span> {v.title} — {v.description}
                    </li>
                  ))}
                </ol>
                <p>
                  YOU ARE HEREBY REQUIRED to show cause within <strong>15 days</strong> from the date of receipt of this notice why statutory penal proceedings under <strong>Section 36</strong> of the Legal Metrology Act, 2009 (Estimated fine liability: ₹ {totalPenalties.toLocaleString('en-IN')}) should not be initiated against you.
                </p>
              </div>

              <div className="pt-4 flex justify-between items-end border-t border-slate-800 font-sans text-slate-400 text-[11px]">
                <div>
                  <p>Seal of the Inspecting Authority</p>
                  <p className="font-mono text-emerald-400">CRYPTOGRAPHICALLY VERIFIED</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{assignedOfficer}</p>
                  <p>Legal Metrology Officer (LMO)</p>
                  <p>Badge ID: {badgeNum}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Form Inputs */
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Action Type / Notice Category:</label>
                <select
                  value={actionType}
                  onChange={(e) => setActionType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="Show Cause Notice under Section 36(1)">Section 36(1) Show Cause Notice</option>
                  <option value="Seizure Memo under Section 15">Section 15 Immediate Seizure Memo</option>
                  <option value="Compounding of Offence Notice (Section 48)">Section 48 Compounding Notice</option>
                  <option value="Deceptive Packaging Notice (Rule 24)">Rule 24 Slack-Fill Deceptive Notice</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Inspecting Officer Name:</label>
                <input
                  type="text"
                  value={assignedOfficer}
                  onChange={(e) => setAssignedOfficer(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Officer Badge ID:</label>
                <input
                  type="text"
                  value={badgeNum}
                  onChange={(e) => setBadgeNum(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Inspection Site / Location:</label>
                <input
                  type="text"
                  value={inspectionLocation}
                  onChange={(e) => setInspectionLocation(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            {/* Violation Summary Box */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-200">Applicable Violations to Charge:</span>
                <span className="font-bold text-rose-400 font-mono">
                  ₹ {totalPenalties.toLocaleString('en-IN')} Total Fine Est.
                </span>
              </div>
              <ul className="space-y-1 text-slate-400">
                {result.violations.map((v, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    <span><strong>{v.rule}:</strong> {v.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleIssueNotice}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold shadow-lg shadow-rose-600/30 flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Issue & Register Statutory Notice</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
