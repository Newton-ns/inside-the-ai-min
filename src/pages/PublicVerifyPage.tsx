import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCertificateById } from '../services/api';
import { ComplianceCertificate } from '../types';
import { ShieldCheck, CheckCircle2, AlertTriangle, Scale, ExternalLink, Award, ArrowLeft } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export const PublicVerifyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cert, setCert] = useState<ComplianceCertificate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchId, setSearchId] = useState<string>(id || 'CERT-IN-2026-9102');

  useEffect(() => {
    loadCertificate(searchId);
  }, [id]);

  const loadCertificate = async (certificateId: string) => {
    setLoading(true);
    const data = await fetchCertificateById(certificateId);
    setCert(data);
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId) loadCertificate(searchId);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Public Legal Metrology Verification Registry</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Digital Compliance Certificate Verification
        </h1>
        <p className="text-xs text-slate-400">
          Government of India • Directorate of Legal Metrology
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Certificate ID e.g. CERT-IN-2026-9102"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-white font-mono focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 cursor-pointer"
        >
          Verify Authenticity
        </button>
      </form>

      {/* Certificate Display */}
      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs">
          Verifying digital signature with Central Registry...
        </div>
      ) : cert ? (
        <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Authenticity Badge */}
          <div className="bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <div className="text-sm font-black text-white">
                  AUTHENTIC & VALID COMPLIANCE CERTIFICATE
                </div>
                <div className="text-xs text-emerald-400 font-semibold">
                  Status: {cert.status} • Score: {cert.complianceScore}%
                </div>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Issued Under</div>
              <div className="text-xs font-bold text-white">PCR 2011 Rules</div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Product Name:</span>
              <span className="text-white font-bold text-sm">{cert.productName}</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Manufacturer / Packer:</span>
              <span className="text-white font-semibold">{cert.manufacturer}</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Certificate Reference:</span>
              <span className="text-amber-400 font-mono font-bold">{cert.id}</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Validity Period:</span>
              <span className="text-slate-200 font-mono">{cert.issuedDate} to {cert.validTill}</span>
            </div>
          </div>

          {/* Issuing Authority Block */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Issuing Authority:</span>
              <span className="text-slate-200 font-bold">{cert.issuedBy}</span>
              <div className="text-slate-400 text-[11px]">{cert.officer}</div>
            </div>

            <div className="bg-white p-2 rounded-xl shadow-lg shrink-0">
              <QRCodeSVG value={cert.qrCodeUrl} size={64} />
            </div>
          </div>

          {/* Hash */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-[10px] font-mono text-slate-500 truncate">
            Cryptographic Signature: {cert.digitalSignatureHash}
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-rose-900/40 p-8 rounded-3xl text-center space-y-3">
          <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Certificate Record Not Found</h3>
          <p className="text-xs text-slate-400">
            No active certificate matching ID "{searchId}". Verify the certificate number or scan with scanner.
          </p>
        </div>
      )}

      <div className="text-center pt-4">
        <Link to="/" className="text-xs text-blue-400 hover:underline font-semibold flex items-center justify-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Main Portal
        </Link>
      </div>
    </div>
  );
};
