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
    <div className="py-4 space-y-8">
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
