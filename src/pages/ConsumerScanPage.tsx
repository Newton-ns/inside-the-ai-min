import React, { useState } from 'react';
import { ProductScanner } from '../components/scanner/ProductScanner';
import { ComplianceReportView } from '../components/reports/ComplianceReportView';
import { ComplianceResult } from '../types';
import { UserCheck, ShieldAlert, PhoneCall, CheckCircle, AlertTriangle, Send, Sparkles } from 'lucide-react';

export const ConsumerScanPage: React.FC = () => {
  const [scanResult, setScanResult] = useState<{
    result: ComplianceResult;
    imageUrl: string;
    productName: string;
  } | null>(null);

  const [complaintFiled, setComplaintFiled] = useState<boolean>(false);
  const [grievanceData, setGrievanceData] = useState({
    storeName: '',
    mrpCharged: '',
    details: ''
  });

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setComplaintFiled(true);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Consumer Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <UserCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Citizen Consumer Protection & Label Verification Portal
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Verify legal packaging declarations, check for MRP overcharging, and report deceptive packaging.
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center sm:text-right">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Consumer Helpline</span>
          <span className="text-lg font-black text-amber-400 font-mono">Dial 1915</span>
        </div>
      </div>

      {scanResult ? (
        <div className="space-y-8">
          <ComplianceReportView
            result={scanResult.result}
            imageUrl={scanResult.imageUrl}
            productName={scanResult.productName}
            onBackToScan={() => setScanResult(null)}
          />

          {/* Quick Consumer Grievance Box */}
          {scanResult.result.violations.length > 0 && (
            <div className="bg-slate-900 border border-rose-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Report Labeling Violation or Overcharging
                  </h3>
                  <p className="text-xs text-slate-400">
                    File a direct statutory complaint to the District Legal Metrology Officer
                  </p>
                </div>
              </div>

              {complaintFiled ? (
                <div className="bg-emerald-950/50 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Grievance Registered Successfully</h4>
                  <p className="text-xs text-slate-300">
                    Grievance Docket ID: <span className="font-mono font-bold text-amber-400">NCH-2026-98124</span>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Forwarded to the District Legal Metrology Inspector for immediate market verification.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleGrievanceSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-300">Store / Retailer Name & Location:</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Daily Supermarket, Sector 14, Gurgaon"
                        value={grievanceData.storeName}
                        onChange={(e) => setGrievanceData({ ...grievanceData, storeName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-300">Price Charged by Retailer (₹):</label>
                      <input
                        type="number"
                        placeholder="e.g. 180"
                        value={grievanceData.mrpCharged}
                        onChange={(e) => setGrievanceData({ ...grievanceData, mrpCharged: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Complaint Remarks:</label>
                    <textarea
                      rows={3}
                      placeholder="Describe the violation, e.g. charged ₹15 above MRP or missing contact details..."
                      value={grievanceData.details}
                      onChange={(e) => setGrievanceData({ ...grievanceData, details: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Complaint to Directorate</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      ) : (
        <ProductScanner
          onScanComplete={(res, img, name) => setScanResult({ result: res, imageUrl: img, productName: name })}
        />
      )}
    </div>
  );
};
