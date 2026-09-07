import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCertificateById } from '../services/api';
import { ComplianceCertificate } from '../types';
import { CheckCircle2, AlertTriangle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useLanguage } from '../context/LanguageContext';

export const PublicVerifyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const [cert, setCert] = useState<ComplianceCertificate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchId, setSearchId] = useState<string>(id || 'CERT-IN-2026-9102');

  const ui = language === 'hi' ? {
    eyebrow:'सार्वजनिक रजिस्ट्री / 03', title:'प्रमाणपत्र सत्यापन', desc:'विधिक मापविज्ञान अनुपालन प्रमाणपत्र की प्रामाणिकता और वर्तमान स्थिति की पुष्टि करें।', lookup:'प्रमाणपत्र खोज', heading:'प्रमाणपत्र संदर्भ दर्ज करें', verify:'प्रमाणपत्र सत्यापित करें', verifying:'रजिस्ट्री के विरुद्ध प्रमाणपत्र सत्यापित किया जा रहा है...', verified:'सत्यापित प्रमाणपत्र', score:'अनुपालन स्कोर', digital:'डिजिटल अनुपालन प्रमाणपत्र', issued:'विधिक मापविज्ञान (पैकेज्ड वस्तुएं) नियम, 2011 के तहत जारी', manufacturer:'निर्माता / पैकर', reference:'प्रमाणपत्र संदर्भ', issuedDate:'जारी दिनांक', valid:'मान्य तक', authority:'जारी करने वाला प्राधिकरण', signature:'क्रिप्टोग्राफिक हस्ताक्षर', notFound:'प्रमाणपत्र रिकॉर्ड नहीं मिला', noMatch:'कोई सक्रिय प्रमाणपत्र इस संदर्भ से मेल नहीं खाता।', back:'ओवरव्यू पर लौटें'
  } : language === 'ta' ? {
    eyebrow:'பொது பதிவேடு / 03', title:'சான்றிதழ் சரிபார்ப்பு', desc:'சட்ட அளவியல் இணக்கச் சான்றிதழின் உண்மைத் தன்மை மற்றும் தற்போதைய நிலையை உறுதிப்படுத்தவும்.', lookup:'சான்றிதழ் தேடல்', heading:'சான்றிதழ் குறிப்பை உள்ளிடவும்', verify:'சான்றிதழை சரிபார்க்கவும்', verifying:'பதிவேட்டில் சான்றிதழ் சரிபார்க்கப்படுகிறது...', verified:'சரிபார்க்கப்பட்ட சான்றிதழ்', score:'இணக்க மதிப்பெண்', digital:'டிஜிட்டல் இணக்கச் சான்றிதழ்', issued:'சட்ட அளவியல் (பொட்டலப் பொருட்கள்) விதிகள், 2011 கீழ் வழங்கப்பட்டது', manufacturer:'உற்பத்தியாளர் / பேக்கர்', reference:'சான்றிதழ் குறிப்பு', issuedDate:'வழங்கிய தேதி', valid:'செல்லுபடியாகும் தேதி', authority:'வழங்கும் அதிகாரம்', signature:'கிரிப்டோகிராஃபிக் கையொப்பம்', notFound:'சான்றிதழ் பதிவு கிடைக்கவில்லை', noMatch:'இந்த குறிப்புடன் செயலில் உள்ள சான்றிதழ் எதுவும் இல்லை.', back:'மேலோட்டப் பக்கத்திற்குத் திரும்பு'
  } : {
    eyebrow:'PUBLIC REGISTRY / 03', title:'Verify Certificate', desc:'Confirm the authenticity and current status of a Legal Metrology compliance certificate.', lookup:'Certificate lookup', heading:'Enter a certificate reference', verify:'Verify certificate', verifying:'Verifying certificate against the registry...', verified:'Verified certificate', score:'Compliance score', digital:'Digital Compliance Certificate', issued:'Issued under Legal Metrology (Packaged Commodities) Rules, 2011', manufacturer:'Manufacturer / Packer', reference:'Certificate reference', issuedDate:'Issued date', valid:'Valid until', authority:'Issuing authority', signature:'Cryptographic signature', notFound:'Certificate record not found', noMatch:'No active certificate matches this reference.', back:'Return to Overview'
  };

  useEffect(() => { loadCertificate(searchId); }, [id]);
  const loadCertificate = async (certificateId: string) => { setLoading(true); const data = await fetchCertificateById(certificateId); setCert(data); setLoading(false); };
  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); if (searchId) loadCertificate(searchId); };

  return <div className="classic-internal-page classic-verify-page">
    <div className="classic-page-intro"><span className="classic-eyebrow">{ui.eyebrow}</span><h1>{ui.title}</h1><p>{ui.desc}</p></div>
    <section className="classic-verify-search"><div><span className="classic-section-kicker">{ui.lookup}</span><h2>{ui.heading}</h2></div><form onSubmit={handleSearch}><input value={searchId} onChange={e => setSearchId(e.target.value)} placeholder="CERT-IN-2026-9102"/><button type="submit">{ui.verify}</button></form></section>
    {loading ? <div className="classic-loading"><span className="classic-loading-line"/>{ui.verifying}</div> : cert ? <section className="classic-certificate">
      <div className="classic-certificate-top"><div className="classic-status"><CheckCircle2 size={22}/><div><span>{ui.verified}</span><strong>{cert.status}</strong></div></div><div className="classic-score"><small>{ui.score}</small><strong>{cert.complianceScore}%</strong></div></div>
      <div className="classic-certificate-body"><div className="classic-certificate-title"><span>{ui.digital}</span><h2>{cert.productName}</h2><p>{ui.issued}</p></div><div className="classic-metadata"><div><small>{ui.manufacturer}</small><strong>{cert.manufacturer}</strong></div><div><small>{ui.reference}</small><strong className="mono">{cert.id}</strong></div><div><small>{ui.issuedDate}</small><strong>{cert.issuedDate}</strong></div><div><small>{ui.valid}</small><strong>{cert.validTill}</strong></div><div><small>{ui.authority}</small><strong>{cert.issuedBy}</strong><span>{cert.officer}</span></div><div className="classic-qr"><QRCodeSVG value={cert.qrCodeUrl} size={82}/></div></div></div>
      <div className="classic-signature"><span>{ui.signature}</span><code>{cert.digitalSignatureHash}</code></div>
    </section> : <div className="classic-not-found"><AlertTriangle size={22}/><div><h3>{ui.notFound}</h3><p>{ui.noMatch} “{searchId}”.</p></div></div>}
    <Link to="/" className="classic-back-link"><ArrowLeft size={15}/>{ui.back}</Link>
  </div>;
};
