import React, { useState } from 'react';
import { ProductScanner } from '../components/scanner/ProductScanner';
import { ComplianceReportView } from '../components/reports/ComplianceReportView';
import { ComplianceResult } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const ScannerPage: React.FC = () => {
  const { language } = useLanguage();
  const [scanResult, setScanResult] = useState<{ result: ComplianceResult; imageUrl: string; productName: string } | null>(null);
  const ui = language === 'hi'
    ? { eyebrow: 'एआई निरीक्षण / 01', title: 'एआई लेबल स्कैनर', desc: 'पैकेज्ड वस्तुओं के लेबलों का विधिक मापविज्ञान आवश्यकताओं के अनुसार स्पष्ट और निर्देशित तरीके से निरीक्षण करें।' }
    : language === 'ta'
    ? { eyebrow: 'AI ஆய்வு / 01', title: 'AI லேபிள் ஸ்கேனர்', desc: 'சட்ட அளவியல் தேவைகளுக்கு ஏற்ப பொட்டலப் பொருட்களின் லேபிள்களை தெளிவான வழிகாட்டப்பட்ட செயல்முறையில் ஆய்வு செய்யுங்கள்.' }
    : { eyebrow: 'AI INSPECTION / 01', title: 'AI Label Scanner', desc: 'Inspect packaged commodity labels against Legal Metrology requirements with a clear, guided workflow.' };

  const handleScanCompleted = (result: ComplianceResult, imageUrl: string, productName: string) => setScanResult({ result, imageUrl, productName });

  return <div className="classic-internal-page classic-scanner-page">
    <div className="classic-page-intro"><span className="classic-eyebrow">{ui.eyebrow}</span><h1>{ui.title}</h1><p>{ui.desc}</p></div>
    {scanResult ? <ComplianceReportView result={scanResult.result} imageUrl={scanResult.imageUrl} productName={scanResult.productName} onBackToScan={() => setScanResult(null)} /> : <ProductScanner onScanComplete={handleScanCompleted} />}
  </div>;
};
