import React, { useState } from 'react';
import { ProductScanner } from '../components/scanner/ProductScanner';
import { ComplianceReportView } from '../components/reports/ComplianceReportView';
import { ComplianceResult } from '../types';

export const ScannerPage: React.FC = () => {
  const [scanResult, setScanResult] = useState<{
    result: ComplianceResult;
    imageUrl: string;
    productName: string;
  } | null>(null);

  const handleScanCompleted = (result: ComplianceResult, imageUrl: string, productName: string) => {
    setScanResult({ result, imageUrl, productName });
  };

  return (
    <div className="classic-internal-page classic-scanner-page">
      <div className="classic-page-intro">
        <span className="classic-eyebrow">AI INSPECTION / 01</span>
        <h1>AI Label Scanner</h1>
        <p>Inspect packaged commodity labels against Legal Metrology requirements with a clear, guided workflow.</p>
      </div>
      {scanResult ? (
        <ComplianceReportView
          result={scanResult.result}
          imageUrl={scanResult.imageUrl}
          productName={scanResult.productName}
          onBackToScan={() => setScanResult(null)}
        />
      ) : (
        <ProductScanner onScanComplete={handleScanCompleted} />
      )}
    </div>
  );
};
