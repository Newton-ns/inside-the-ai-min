import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { InspectionReport, ProductItem, ComplianceResult } from '../types';
import { fetchReports, fetchProducts } from '../services/api';
import { ProductScanner } from '../components/scanner/ProductScanner';
import { ComplianceReportView } from '../components/reports/ComplianceReportView';
import { ShieldCheck, ScanLine, FileText, CheckCircle2, Search, MapPin, BadgeCheck, UserRound } from 'lucide-react';

export const InspectorDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [reports, setReports] = useState<InspectionReport[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [activeTab, setActiveTab] = useState<'history' | 'scan'>('history');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentScanResult, setCurrentScanResult] = useState<{ result: ComplianceResult; imageUrl: string; productName: string } | null>(null);

  useEffect(() => { loadData(); }, []);
  const loadData = async () => { const r = await fetchReports(); const p = await fetchProducts(); setReports(r); setProducts(p); };
  const handleScanCompleted = (result: ComplianceResult, imageUrl: string, productName: string) => { setCurrentScanResult({ result, imageUrl, productName }); setActiveTab('scan'); };

  const filteredReports = reports.filter(rep => {
    const matchesSearch = rep.productName.toLowerCase().includes(searchQuery.toLowerCase()) || rep.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) || rep.noticeNumber.toLowerCase().includes(searchQuery.toLowerCase());
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && rep.status.toLowerCase().includes(statusFilter.toLowerCase());
  });

  const totalPenalties = reports.reduce((acc, curr) => acc + (curr.penaltyEstimated || 0), 0);
  const compliantCount = reports.filter(r => r.status === 'COMPLIANT').length;
  const violationCount = reports.filter(r => r.status !== 'COMPLIANT').length;

  return (
    <div className="space-y-8 py-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-7">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400"><ShieldCheck className="w-8 h-8" /></div>
            <div>
              <div className="flex flex-wrap items-center gap-2"><span className="text-[10px] uppercase tracking-[0.16em] text-blue-400 font-bold">Officer Workspace</span><span className="px-2.5 py-0.5 rounded-lg bg-blue-900/60 border border-blue-500/40 text-blue-300 text-[10px] font-mono font-bold">{currentUser?.badgeNumber || 'DL-LM-4402'}</span></div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">Welcome, {currentUser?.name || 'Legal Metrology Officer'}</h1>
              <p className="text-xs text-slate-400 mt-1">{currentUser?.designation || 'Legal Metrology Officer, Enforcement Wing'}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 min-w-0 lg:min-w-[480px]">
            <div className="border border-slate-800 bg-slate-950/60 rounded-xl px-3 py-2.5"><div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-slate-500 font-bold"><UserRound className="w-3 h-3"/> User ID</div><div className="text-xs text-white font-mono font-bold mt-1 truncate">{currentUser?.id || 'usr_inspector_1'}</div></div>
            <div className="border border-slate-800 bg-slate-950/60 rounded-xl px-3 py-2.5"><div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-slate-500 font-bold"><MapPin className="w-3 h-3"/> Jurisdiction</div><div className="text-xs text-white font-semibold mt-1">Central Delhi</div></div>
            <div className="border border-slate-800 bg-slate-950/60 rounded-xl px-3 py-2.5"><div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-slate-500 font-bold"><BadgeCheck className="w-3 h-3"/> Status</div><div className="text-xs text-emerald-400 font-bold mt-1">Active Officer</div></div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-7 pt-5 border-t border-slate-800">
          <button onClick={() => { setCurrentScanResult(null); setActiveTab('scan'); }} className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${activeTab === 'scan' && !currentScanResult ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}><ScanLine className="w-4 h-4" /> New Field Scan</button>
          <button onClick={() => { setCurrentScanResult(null); setActiveTab('history'); }} className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}><FileText className="w-4 h-4" /> Inspection Log ({reports.length})</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-1 shadow-xl"><span className="text-xs text-slate-400 font-medium">Total Seizure Notices & Inspections</span><div className="text-3xl font-black text-white font-mono">{reports.length}</div><div className="text-[11px] text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>{compliantCount} compliant, {violationCount} notices served</span></div></div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-1 shadow-xl"><span className="text-xs text-slate-400 font-medium">Estimated Section 36 Penalty Liability</span><div className="text-3xl font-black text-rose-400 font-mono">₹ {totalPenalties.toLocaleString('en-IN')}</div><div className="text-[11px] text-slate-400">*Under Section 36(1) & (2) of Legal Metrology Act, 2009</div></div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-1 shadow-xl"><span className="text-xs text-slate-400 font-medium">Field Compliance Rate</span><div className="text-3xl font-black text-blue-400 font-mono">{reports.length > 0 ? Math.round((compliantCount / reports.length) * 100) : 0}%</div><div className="text-[11px] text-slate-400">District enforcement benchmark</div></div>
      </div>

      {activeTab === 'scan' ? (currentScanResult ? <ComplianceReportView result={currentScanResult.result} imageUrl={currentScanResult.imageUrl} productName={currentScanResult.productName} onBackToScan={() => setCurrentScanResult(null)} /> : <ProductScanner onScanComplete={handleScanCompleted} />) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4"><div className="flex items-center space-x-2"><FileText className="w-5 h-5 text-blue-400" /><h3 className="text-lg font-bold text-white">Market Surveillance & Seizure Records</h3></div><div className="flex flex-wrap items-center gap-3"><div className="relative"><Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" /><input type="text" placeholder="Search commodity or notice..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:ring-2 focus:ring-blue-500 w-48 sm:w-64" /></div><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:ring-2 focus:ring-blue-500 cursor-pointer"><option value="all">All Statuses</option><option value="compliant">Compliant</option><option value="partially">Partially Compliant</option><option value="non compliant">Non Compliant</option></select></div></div>
          <div className="overflow-x-auto"><table className="w-full text-left text-xs text-slate-300"><thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider"><tr><th className="p-3 rounded-l-xl">Notice Ref</th><th className="p-3">Product Name</th><th className="p-3">Manufacturer / Location</th><th className="p-3">Score</th><th className="p-3">Status</th><th className="p-3">Penalty Est.</th><th className="p-3 rounded-r-xl">Action Taken</th></tr></thead><tbody className="divide-y divide-slate-800/60">{filteredReports.map((r) => <tr key={r.id} className="hover:bg-slate-800/30 transition-colors"><td className="p-3 font-mono text-amber-400 font-bold">{r.noticeNumber}</td><td className="p-3 font-semibold text-white">{r.productName}</td><td className="p-3 text-slate-400"><div>{r.manufacturer}</div><div className="text-[10px] text-slate-500">{r.location}</div></td><td className="p-3 font-mono font-bold"><span className={r.complianceScore >= 85 ? 'text-emerald-400' : r.complianceScore >= 50 ? 'text-amber-400' : 'text-rose-400'}>{r.complianceScore}%</span></td><td className="p-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${r.status === 'COMPLIANT' ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300' : r.status === 'PARTIALLY COMPLIANT' ? 'bg-amber-950 border border-amber-500/40 text-amber-300' : 'bg-rose-950 border border-rose-500/40 text-rose-300'}`}>{r.status}</span></td><td className="p-3 font-mono text-rose-400 font-semibold">{r.penaltyEstimated > 0 ? `₹ ${r.penaltyEstimated.toLocaleString('en-IN')}` : 'Nil'}</td><td className="p-3 text-slate-300 font-medium">{r.actionTaken}</td></tr>)}</tbody></table></div>
        </div>
      )}
    </div>
  );
};
