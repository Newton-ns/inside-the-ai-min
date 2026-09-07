import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCertificateById } from '../services/api';
import { ComplianceCertificate } from '../types';
import { ShieldCheck, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export const PublicVerifyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cert, setCert] = useState<ComplianceCertificate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchId, setSearchId] = useState<string>(id || 'CERT-IN-2026-9102');

  useEffect(() => { loadCertificate(searchId); }, [id]);

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
    <div className="classic-internal-page classic-verify-page">
      <div className="classic-page-intro">
        <span className="classic-eyebrow">PUBLIC REGISTRY / 03</span>
        <h1>Verify Certificate</h1>
        <p>Confirm the authenticity and current status of a Legal Metrology compliance certificate.</p>
      </div>

      <section className="classic-verify-search">
        <div><span className="classic-section-kicker">Certificate lookup</span><h2>Enter a certificate reference</h2></div>
        <form onSubmit={handleSearch}>
          <input value={searchId} onChange={e => setSearchId(e.target.value)} placeholder="CERT-IN-2026-9102" />
          <button type="submit">Verify certificate</button>
        </form>
      </section>

      {loading ? (
        <div className="classic-loading"><span className="classic-loading-line" />Verifying certificate against the registry...</div>
      ) : cert ? (
        <section className="classic-certificate">
          <div className="classic-certificate-top">
            <div className="classic-status"><CheckCircle2 size={22} /><div><span>Verified certificate</span><strong>{cert.status}</strong></div></div>
            <div className="classic-score"><small>Compliance score</small><strong>{cert.complianceScore}%</strong></div>
          </div>

          <div className="classic-certificate-body">
            <div className="classic-certificate-title"><span>Digital Compliance Certificate</span><h2>{cert.productName}</h2><p>Issued under Legal Metrology (Packaged Commodities) Rules, 2011</p></div>
            <div className="classic-metadata">
              <div><small>Manufacturer / Packer</small><strong>{cert.manufacturer}</strong></div>
              <div><small>Certificate reference</small><strong className="mono">{cert.id}</strong></div>
              <div><small>Issued date</small><strong>{cert.issuedDate}</strong></div>
              <div><small>Valid until</small><strong>{cert.validTill}</strong></div>
              <div><small>Issuing authority</small><strong>{cert.issuedBy}</strong><span>{cert.officer}</span></div>
              <div className="classic-qr"><QRCodeSVG value={cert.qrCodeUrl} size={82} /></div>
            </div>
          </div>

          <div className="classic-signature"><span>Cryptographic signature</span><code>{cert.digitalSignatureHash}</code></div>
        </section>
      ) : (
        <div className="classic-not-found"><AlertTriangle size={22} /><div><h3>Certificate record not found</h3><p>No active certificate matches “{searchId}”. Check the reference and try again.</p></div></div>
      )}

      <Link to="/" className="classic-back-link"><ArrowLeft size={15} /> Return to Overview</Link>
    </div>
  );
};
