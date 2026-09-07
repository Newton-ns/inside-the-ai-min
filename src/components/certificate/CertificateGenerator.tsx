import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ComplianceCertificate, ComplianceResult } from '../../types';
import { issueCertificate } from '../../services/api';
import { Award, CheckCircle, Download, Printer, X, ShieldCheck, ExternalLink } from 'lucide-react';

interface CertificateGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  result: ComplianceResult;
  productName: string;
}

export const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  isOpen,
  onClose,
  result,
  productName
}) => {
  const [certificate, setCertificate] = useState<ComplianceCertificate | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  if (!isOpen) return null;

  const mfg = result.extracted_entities?.manufacturer_name?.value || "Shanti Agro Foods Pvt. Ltd.";

  const handleGenerate = async () => {
    setIsGenerating(true);
    const cert = await issueCertificate({
      productName,
      manufacturer: mfg,
      complianceScore: result.compliance_score
    });
    setCertificate(cert);
    setIsGenerating(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 my-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!certificate ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 shadow-xl shadow-amber-500/10">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white tracking-tight">
                Issue Digital Compliance Certificate
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Generate an official, cryptographically verifiable compliance certificate under the Legal Metrology (Packaged Commodities) Rules, 2011.
              </p>
            </div>

            {/* Score Pill */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400">Inspected Score:</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">{result.compliance_score}%</span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold uppercase">
                {result.status}
              </span>
            </div>

            <div className="flex justify-center space-x-4 pt-4">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isGenerating ? "Signing & Encrypting..." : "Generate Official Certificate"}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Official Certificate Parchment */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                <CheckCircle className="w-4 h-4" />
                <span>Digital Certificate Issued & Registered on Public Portal</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                </button>
              </div>
            </div>

            {/* Official Bordered Certificate Card */}
            <div className="bg-slate-950 border-4 border-double border-amber-500/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl space-y-6">
              {/* Background Emblem Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none text-9xl">
                ⚖️
              </div>

              {/* Certificate Header */}
              <div className="text-center space-y-1 relative z-10 border-b border-amber-500/20 pb-4">
                <div className="text-xs uppercase tracking-widest text-amber-500 font-bold">
                  GOVERNMENT OF INDIA • MINISTRY OF CONSUMER AFFAIRS
                </div>
                <div className="text-lg sm:text-xl font-serif font-black text-white tracking-wide">
                  DIRECTORATE OF LEGAL METROLOGY
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Certificate of Legal Metrology Compliance
                </div>
                <div className="text-[10px] font-mono text-emerald-400 pt-1">
                  CERTIFICATE ID: {certificate.id} • PCR-2011 VERIFIED
                </div>
              </div>

              {/* Body Content */}
              <div className="space-y-4 text-xs text-slate-300 leading-relaxed relative z-10">
                <p className="text-center italic text-slate-400 font-serif text-sm">
                  This is to certify that the packaged commodity artwork detailed below has been inspected and validated against the mandatory provisions of the <strong>Legal Metrology (Packaged Commodities) Rules, 2011</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800 font-sans text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Product / Commodity:</span>
                    <span className="text-white font-bold text-sm">{certificate.productName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Manufacturer / Packer:</span>
                    <span className="text-white font-semibold">{certificate.manufacturer}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Compliance Score:</span>
                    <span className="text-emerald-400 font-black text-base">{certificate.complianceScore}% (VERIFIED)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Date of Inspection:</span>
                    <span className="text-slate-200 font-mono">{certificate.issuedDate} (Valid till {certificate.validTill})</span>
                  </div>
                </div>
              </div>

              {/* QR Code & Authority Signatures */}
              <div className="pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                {/* QR Section */}
                <div className="flex items-center space-x-3 bg-white p-2 rounded-xl shadow-lg">
                  <QRCodeSVG
                    value={certificate.qrCodeUrl}
                    size={72}
                    level="H"
                    includeMargin={false}
                  />
                  <div className="text-slate-950 font-sans text-[10px] space-y-0.5">
                    <p className="font-bold uppercase tracking-tight">Public Verification</p>
                    <p className="text-slate-600 font-mono text-[9px]">Scan with phone camera</p>
                    <p className="text-emerald-700 font-bold">Authentic & Signed</p>
                  </div>
                </div>

                {/* Hash & Signature */}
                <div className="text-right font-sans text-[11px] space-y-1">
                  <div className="text-[10px] font-mono text-slate-500 truncate max-w-xs">
                    SHA-256: {certificate.digitalSignatureHash}
                  </div>
                  <p className="font-bold text-white">{certificate.officer}</p>
                  <p className="text-amber-400 text-[10px] uppercase tracking-wider font-semibold">
                    Authorized Signatory • Legal Metrology Directorate
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
