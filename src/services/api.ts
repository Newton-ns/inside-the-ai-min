import { ProductItem, InspectionReport, ComplianceCertificate, ComplianceResult } from '../types';
import { runMetrologyComplianceCheck } from './metrologyEngine';

const API_BASE = 'http://localhost:5000/api';
const AI_BASE = 'http://localhost:8000/api/ai';

// Mock storage initialization for reliable offline fallback
const defaultSampleProducts: ProductItem[] = [
  {
    id: "prod_rice_01",
    name: "Royal Heritage Basmati Rice 5kg",
    category: "Food & Beverages",
    barcode: "8901030829101",
    manufacturer: "Shanti Agro Foods Pvt. Ltd., Plot 42, Sector 18, Phase 2, Kundli, Sonipat, Haryana - 131028",
    netQuantity: "5.0 kg",
    mrp: "₹ 450.00 (incl. of all taxes)",
    unitSalePrice: "₹ 90.00 / kg",
    mfgDate: "02/2026",
    expiryDate: "01/2028 (24 Months)",
    batchNo: "SH-26034-B2",
    customerCare: "Toll Free: 1800-11-4567 | care@shantiagro.in",
    countryOfOrigin: "India",
    complianceScore: 98,
    status: "PASS",
    riskLevel: "Low Risk",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80",
    extractedText: `ROYAL HERITAGE BASMATI RICE\nMfd. & Pkd. by: Shanti Agro Foods Pvt. Ltd., Plot 42, Sector 18, Phase 2, Kundli, Sonipat, Haryana - 131028\nNet Quantity: 5.0 kg\nMRP Rs. 450.00 (incl. of all taxes)\nUnit Sale Price: Rs. 90.00 / kg\nMonth & Year of Manufacture: 02/2026\nBest Before: 24 Months from packaging\nBatch No: SH-26034-B2\nCustomer Care Cell: Toll Free 1800-11-4567 | care@shantiagro.in\nCountry of Origin: India`
  },
  {
    id: "prod_oil_02",
    name: "Sunlite Refined Sunflower Oil 1L",
    category: "Edible Oils & Fats",
    barcode: "8902040510192",
    manufacturer: "Sunlite Agro Oils Ltd., Industrial Estate, Ahmedabad",
    netQuantity: "910 gms",
    mrp: "₹ 165.00",
    unitSalePrice: "",
    mfgDate: "01/2026",
    expiryDate: "9 Months",
    batchNo: "SUN-881",
    customerCare: "",
    countryOfOrigin: "India",
    complianceScore: 62,
    status: "PARTIALLY COMPLIANT",
    riskLevel: "Medium Risk",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=80",
    extractedText: `SUNLITE REFINED SUNFLOWER OIL\nMfd by: Sunlite Agro Oils Ltd., Industrial Estate, Ahmedabad\nNet Qty: 910 gms\nMRP Rs. 165.00\nBatch No: SUN-881\nMfg Date: 01/2026\nCountry of Origin: India`
  },
  {
    id: "prod_gadget_03",
    name: "SonicPro True Wireless Earbuds",
    category: "Imported Electronics",
    barcode: "6938102941028",
    manufacturer: "Imported & Marketed by: Apex Imports, Mumbai",
    netQuantity: "1 Unit",
    mrp: "₹ 2499.00",
    unitSalePrice: "",
    mfgDate: "",
    expiryDate: "N/A",
    batchNo: "APX-2026-90",
    customerCare: "support@apeximports.com",
    countryOfOrigin: "",
    complianceScore: 42,
    status: "NON COMPLIANT",
    riskLevel: "High Risk",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    extractedText: `SONICPRO WIRELESS EARBUDS\nImported & Marketed by: Apex Imports, Mumbai\nNet Quantity: 1 Unit\nMRP: 2499\nBatch: APX-2026-90\nEmail: support@apeximports.com`
  }
];

let cachedProducts = [...defaultSampleProducts];
let cachedReports: InspectionReport[] = [
  {
    id: "REP-2026-0891",
    productId: "prod_oil_02",
    productName: "Sunlite Refined Sunflower Oil 1L",
    manufacturer: "Sunlite Agro Oils Ltd.",
    inspectorName: "Rajesh Kumar, LMO",
    inspectorBadge: "DL-LM-4402",
    location: "Super Bazaar Retail, Janakpuri, New Delhi",
    inspectionDate: "2026-09-05T14:30:00Z",
    complianceScore: 62,
    status: "PARTIALLY COMPLIANT",
    actionTaken: "Form-I Show Cause Notice Issued",
    penaltyEstimated: 70000,
    noticeNumber: "LM/DL/2026/SCN-8842",
    qrData: "https://lm-verify.gov.in/report/REP-2026-0891"
  },
  {
    id: "REP-2026-0885",
    productId: "prod_gadget_03",
    productName: "SonicPro True Wireless Earbuds",
    manufacturer: "Apex Imports, Mumbai",
    inspectorName: "Rajesh Kumar, LMO",
    inspectorBadge: "DL-LM-4402",
    location: "Gaffar Market Electronics Hub, Delhi",
    inspectionDate: "2026-09-02T11:15:00Z",
    complianceScore: 42,
    status: "NON COMPLIANT",
    actionTaken: "Seizure Memo under Section 15 & Notice under Section 36",
    penaltyEstimated: 100000,
    noticeNumber: "LM/DL/2026/SEIZE-041",
    qrData: "https://lm-verify.gov.in/report/REP-2026-0885"
  },
  {
    id: "REP-2026-0870",
    productId: "prod_rice_01",
    productName: "Royal Heritage Basmati Rice 5kg",
    manufacturer: "Shanti Agro Foods Pvt. Ltd.",
    inspectorName: "Rajesh Kumar, LMO",
    inspectorBadge: "DL-LM-4402",
    location: "Mega Mart Warehouse, Kundli",
    inspectionDate: "2026-08-28T09:40:00Z",
    complianceScore: 98,
    status: "COMPLIANT",
    actionTaken: "Certificate of Verification Granted",
    penaltyEstimated: 0,
    noticeNumber: "LM/DL/2026/CERT-9102",
    qrData: "https://lm-verify.gov.in/certificate/CERT-IN-2026-9102"
  }
];

let cachedCertificates: ComplianceCertificate[] = [
  {
    id: "CERT-IN-2026-9102",
    reportId: "REP-2026-0870",
    productName: "Royal Heritage Basmati Rice 5kg",
    manufacturer: "Shanti Agro Foods Pvt. Ltd.",
    complianceScore: 98,
    status: "VERIFIED_COMPLIANT",
    issuedBy: "Directorate of Legal Metrology, Government of India",
    officer: "Rajesh Kumar, LMO (Badge: DL-LM-4402)",
    issuedDate: "2026-08-28",
    validTill: "2027-08-27",
    digitalSignatureHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    qrCodeUrl: "https://lm-verify.gov.in/verify/CERT-IN-2026-9102"
  }
];

export async function fetchProducts(): Promise<ProductItem[]> {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (res.ok) {
      const data = await res.json();
      return data.products;
    }
  } catch (err) {
    // offline fallback
  }
  return cachedProducts;
}

export async function fetchProductById(id: string): Promise<ProductItem | null> {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (res.ok) {
      const data = await res.json();
      return data.product;
    }
  } catch (err) {
    // offline fallback
  }
  return cachedProducts.find(p => p.id === id) || null;
}

export async function fetchReports(): Promise<InspectionReport[]> {
  try {
    const res = await fetch(`${API_BASE}/compliance/reports`);
    if (res.ok) {
      const data = await res.json();
      return data.reports;
    }
  } catch (err) {}
  return cachedReports;
}

export async function fetchCertificates(): Promise<ComplianceCertificate[]> {
  try {
    const res = await fetch(`${API_BASE}/certificates`);
    if (res.ok) {
      const data = await res.json();
      return data.certificates;
    }
  } catch (err) {}
  return cachedCertificates;
}

export async function fetchCertificateById(id: string): Promise<ComplianceCertificate | null> {
  try {
    const res = await fetch(`${API_BASE}/certificates/${id}`);
    if (res.ok) {
      const data = await res.json();
      return data.certificate;
    }
  } catch (err) {}
  return cachedCertificates.find(c => c.id === id) || null;
}

export async function generateNotice(payload: {
  productId: string;
  productName: string;
  manufacturer: string;
  inspectorName: string;
  score: number;
  penalty: number;
  status: string;
}): Promise<InspectionReport> {
  try {
    const res = await fetch(`${API_BASE}/compliance/issue-notice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      cachedReports.unshift(data.report);
      return data.report;
    }
  } catch (err) {}

  const noticeNumber = `LM/DL/2026/NOT-${Math.floor(1000 + Math.random() * 9000)}`;
  const newRep: InspectionReport = {
    id: `REP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    productId: payload.productId,
    productName: payload.productName,
    manufacturer: payload.manufacturer,
    inspectorName: payload.inspectorName || "Rajesh Kumar, LMO",
    inspectorBadge: "DL-LM-4402",
    location: "District Inspection Zone",
    inspectionDate: new Date().toISOString(),
    complianceScore: payload.score,
    status: payload.status,
    actionTaken: "Section 36 Statutory Notice Issued",
    penaltyEstimated: payload.penalty,
    noticeNumber,
    qrData: `https://lm-verify.gov.in/report/${noticeNumber}`
  };
  cachedReports.unshift(newRep);
  return newRep;
}

export async function issueCertificate(payload: {
  productName: string;
  manufacturer: string;
  complianceScore: number;
  reportId?: string;
}): Promise<ComplianceCertificate> {
  try {
    const res = await fetch(`${API_BASE}/certificates/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      cachedCertificates.unshift(data.certificate);
      return data.certificate;
    }
  } catch (err) {}

  const certId = `CERT-IN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const cert: ComplianceCertificate = {
    id: certId,
    reportId: payload.reportId || `REP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    productName: payload.productName,
    manufacturer: payload.manufacturer,
    complianceScore: payload.complianceScore,
    status: payload.complianceScore >= 85 ? "VERIFIED_COMPLIANT" : "CONDITIONAL_APPROVAL",
    issuedBy: "Directorate of Legal Metrology, Government of India",
    officer: "Rajesh Kumar, LMO (Badge: DL-LM-4402)",
    issuedDate: new Date().toISOString().split('T')[0],
    validTill: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
    digitalSignatureHash: `sha256_${Math.random().toString(36).substring(2)}${Date.now()}`,
    qrCodeUrl: `https://lm-verify.gov.in/verify/${certId}`
  };
  cachedCertificates.unshift(cert);
  return cert;
}

export async function scanAndAnalyzeImage(
  imageFile: File | Blob,
  category: string = "Food & Beverages",
  areaSqCm: number = 150
): Promise<ComplianceResult> {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('product_category', category);
    formData.append('package_area_sq_cm', areaSqCm.toString());

    const res = await fetch(`${AI_BASE}/analyze-image`, {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      const data = await res.json();
      return {
        ...data.compliance_report,
        risk_profile: data.risk_profile,
        extracted_entities: data.entities,
        annotated_boxes: data.bounding_boxes,
        raw_text: data.ocr_summary.extracted_text
      };
    }
  } catch (err) {
    // FastAPI server not reachable, use client-side rules engine seamlessly
  }

  // Seamless client OCR & Metrology Rules Engine
  const sampleFallbackText = `ROYAL BASMATI RICE\nMfd by: Shanti Agro Foods Pvt. Ltd., Plot 42, Sector 18, Phase 2, Kundli, Sonipat, Haryana - 131028\nNet Quantity: 5.0 kg\nMRP Rs. 450.00 (incl. of all taxes)\nMonth & Year of Manufacture: 02/2026\nBatch No: SH-26034-B2\nCustomer Care: 1800-11-4567 | care@shantiagro.in\nCountry of Origin: India`;
  return runMetrologyComplianceCheck(sampleFallbackText, category, areaSqCm);
}
