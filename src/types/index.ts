export type UserRole = 'inspector' | 'manufacturer' | 'admin' | 'consumer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation?: string;
  badgeNumber?: string;
  company?: string;
}

export interface BoundingBox {
  id: string;
  text: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage 0-100
  height: number; // percentage 0-100
  status: 'compliant' | 'violation' | 'warning';
  rule?: string;
  details?: string;
}

export interface ExtractedEntities {
  product_name?: { value: string; confidence: number; found: boolean };
  manufacturer_name?: { value: string; confidence: number; found: boolean; has_pincode?: boolean };
  net_quantity?: { value: string; numeric_value: number; unit: string; is_standard_unit: boolean; found: boolean };
  mrp?: { value: string; amount: number; has_tax_clause: boolean; found: boolean };
  mfg_date?: { value: string; found: boolean };
  expiry_date?: { value: string; found: boolean };
  batch_number?: { value: string; found: boolean };
  customer_care?: { found: boolean; phone?: string | null; email?: string | null; raw?: string };
  country_of_origin?: { value: string; found: boolean };
}

export interface Violation {
  rule: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  statutory_penalty?: string;
  suggestion: string;
}

export interface Warning {
  rule: string;
  title: string;
  severity: 'MEDIUM' | 'LOW';
  description: string;
  suggestion: string;
}

export interface PassedRule {
  rule: string;
  title: string;
  details?: string;
}

export interface RiskProfile {
  risk_level: 'Low Risk' | 'Medium Risk' | 'High Risk';
  risk_score: number;
  badge_color: string;
  category_sensitivity: number;
  historical_trust_index: number;
  past_violations_recorded: number;
  action_recommendation: string;
  factors: { factor: string; impact: string }[];
}

export interface ComplianceResult {
  compliance_score: number;
  status: 'COMPLIANT' | 'PARTIALLY COMPLIANT' | 'NON COMPLIANT';
  status_label: 'PASS' | 'WARNING / REVISE' | 'FAIL';
  violations: Violation[];
  warnings: Warning[];
  passed_rules: PassedRule[];
  suggestions: string[];
  min_font_requirement_mm: number;
  annotated_boxes: BoundingBox[];
  statutory_act: string;
  risk_profile?: RiskProfile;
  extracted_entities?: ExtractedEntities;
  raw_text?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  barcode?: string;
  manufacturer: string;
  netQuantity: string;
  mrp: string;
  unitSalePrice?: string;
  mfgDate: string;
  expiryDate?: string;
  batchNo?: string;
  customerCare?: string;
  countryOfOrigin: string;
  complianceScore: number;
  status: string;
  riskLevel: string;
  image: string;
  extractedText?: string;
  violations?: Violation[];
  warnings?: Warning[];
  boundingBoxes?: BoundingBox[];
}

export interface InspectionReport {
  id: string;
  productId: string;
  productName: string;
  manufacturer: string;
  inspectorName: string;
  inspectorBadge: string;
  location: string;
  inspectionDate: string;
  complianceScore: number;
  status: string;
  actionTaken: string;
  penaltyEstimated: number;
  noticeNumber: string;
  qrData: string;
}

export interface ComplianceCertificate {
  id: string;
  reportId: string;
  productName: string;
  manufacturer: string;
  complianceScore: number;
  status: string;
  issuedBy: string;
  officer: string;
  issuedDate: string;
  validTill: string;
  digitalSignatureHash: string;
  qrCodeUrl: string;
}
