/**
 * Legal Metrology In-Memory Database Store & Seed Data
 * Contains realistic FMCG packaged commodities, test cases for violations, user roles, certificates, and inspection records.
 */

const users = [
  {
    id: "usr_inspector_1",
    name: "Rajesh Kumar, LMO",
    email: "inspector@lm.gov.in",
    role: "inspector",
    designation: "Legal Metrology Inspector, District Central Delhi",
    badgeNumber: "DL-LM-4402",
    token: "mock_jwt_token_inspector_1"
  },
  {
    id: "usr_mfg_1",
    name: "Vikram Singhania",
    email: "mfg@shantiagro.in",
    role: "manufacturer",
    company: "Shanti Agro Foods Pvt. Ltd.",
    licenseNumber: "LM-MFG-HR-2021-9982",
    token: "mock_jwt_token_mfg_1"
  },
  {
    id: "usr_admin_1",
    name: "Dr. Ananya Sharma",
    email: "admin@lm.nic.in",
    role: "admin",
    designation: "Director General, Legal Metrology Division, MoCAF&PD",
    token: "mock_jwt_token_admin_1"
  },
  {
    id: "usr_consumer_1",
    name: "Pooja Verma",
    email: "consumer@example.com",
    role: "consumer",
    token: "mock_jwt_token_consumer_1"
  }
];

const sampleProducts = [
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
    extractedText: `ROYAL HERITAGE BASMATI RICE\nMfd. & Pkd. by: Shanti Agro Foods Pvt. Ltd., Plot 42, Sector 18, Phase 2, Kundli, Sonipat, Haryana - 131028\nNet Quantity: 5.0 kg\nMRP Rs. 450.00 (incl. of all taxes)\nUnit Sale Price: Rs. 90.00 / kg\nMonth & Year of Manufacture: 02/2026\nBest Before: 24 Months from packaging\nBatch No: SH-26034-B2\nCustomer Care Cell: Toll Free 1800-11-4567 | care@shantiagro.in\nCountry of Origin: India`,
    violations: [],
    warnings: [],
    boundingBoxes: [
      { id: "b1", text: "ROYAL HERITAGE BASMATI RICE", x: 15, y: 10, width: 70, height: 10, status: "compliant", rule: "Rule 6(1)(b) Generic Name" },
      { id: "b2", text: "Net Quantity: 5.0 kg", x: 20, y: 30, width: 40, height: 7, status: "compliant", rule: "Rule 6(1)(c) Standard Unit (kg)" },
      { id: "b3", text: "MRP Rs. 450.00 (incl. of all taxes)", x: 20, y: 40, width: 55, height: 7, status: "compliant", rule: "Rule 6(1)(e) MRP with Tax Clause" },
      { id: "b4", text: "Mfd & Pkd by Shanti Agro Foods... 131028", x: 12, y: 52, width: 75, height: 12, status: "compliant", rule: "Rule 6(1)(a) Full Address & PIN" },
      { id: "b5", text: "Mfg Date: 02/2026", x: 18, y: 68, width: 35, height: 6, status: "compliant", rule: "Rule 6(1)(d) Month & Year" },
      { id: "b6", text: "Customer Care: 1800-11-4567", x: 15, y: 78, width: 65, height: 7, status: "compliant", rule: "Rule 6(1)(f) Grievance Contact" },
      { id: "b7", text: "Country of Origin: India", x: 20, y: 88, width: 45, height: 6, status: "compliant", rule: "Rule 6(1)(g) Origin Declared" }
    ]
  },
  {
    id: "prod_oil_02",
    name: "Sunlite Refined Sunflower Oil 1L",
    category: "Edible Oils & Fats",
    barcode: "8902040510192",
    manufacturer: "Sunlite Agro Oils Ltd., Industrial Estate, Ahmedabad",
    netQuantity: "910 gms", // VIOLATION: Non-standard unit 'gms' + weight instead of volume for liquids or dual declaration missing
    mrp: "₹ 165.00", // VIOLATION: missing '(incl. of all taxes)'
    unitSalePrice: "",
    mfgDate: "01/2026",
    expiryDate: "9 Months",
    batchNo: "SUN-881",
    customerCare: "", // VIOLATION: Missing customer care
    countryOfOrigin: "India",
    complianceScore: 62,
    status: "PARTIALLY COMPLIANT",
    riskLevel: "Medium Risk",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=80",
    extractedText: `SUNLITE REFINED SUNFLOWER OIL\nMfd by: Sunlite Agro Oils Ltd., Industrial Estate, Ahmedabad\nNet Qty: 910 gms\nMRP Rs. 165.00\nBatch No: SUN-881\nMfg Date: 01/2026\nCountry of Origin: India`,
    violations: [
      {
        rule: "Rule 6(1)(c) & Second Schedule",
        title: "Non-Standard Unit Used ('gms')",
        severity: "HIGH",
        description: "Standard unit must be 'g' or 'ml/l' for liquids. Plural symbol 'gms' is prohibited under Legal Metrology Rules.",
        statutory_penalty: "₹ 20,000 under Section 36(1)",
        suggestion: "Replace '910 gms' with '910 g' or declare equivalent volume '1 L / 1000 ml'."
      },
      {
        rule: "Rule 6(1)(e)",
        title: "MRP Missing 'Inclusive of all taxes' Statement",
        severity: "HIGH",
        description: "Retail sale price must explicitly mention '(incl. of all taxes)'.",
        statutory_penalty: "₹ 25,000 under Section 36(1)",
        suggestion: "Add '(incl. of all taxes)' right next to ₹ 165.00."
      },
      {
        rule: "Rule 6(1)(f)",
        title: "Missing Consumer Care Helpline & Email",
        severity: "HIGH",
        description: "Packaging contains no consumer grievance mechanism or telephone contact.",
        statutory_penalty: "₹ 25,000 under Section 36(1)",
        suggestion: "Add Consumer Care telephone / toll-free number and email address."
      }
    ],
    warnings: [
      {
        rule: "Rule 6(1)(a)",
        title: "Missing Postal PIN Code in Address",
        severity: "MEDIUM",
        description: "Address does not include 6-digit postal PIN code.",
        suggestion: "Add postal PIN code to Ahmedabad address."
      }
    ],
    boundingBoxes: [
      { id: "o1", text: "SUNLITE REFINED SUNFLOWER OIL", x: 15, y: 12, width: 70, height: 10, status: "compliant", rule: "Rule 6(1)(b) Product Name" },
      { id: "o2", text: "Net Qty: 910 gms [INVALID UNIT]", x: 20, y: 32, width: 50, height: 8, status: "violation", rule: "Rule 6(1)(c) Invalid Symbol 'gms'" },
      { id: "o3", text: "MRP Rs. 165.00 [NO TAX CLAUSE]", x: 20, y: 44, width: 52, height: 8, status: "violation", rule: "Rule 6(1)(e) Missing '(incl. of all taxes)'" },
      { id: "o4", text: "Mfd by: Sunlite Agro Oils Ltd... [NO PIN]", x: 12, y: 56, width: 76, height: 10, status: "warning", rule: "Rule 6(1)(a) Incomplete PIN Code" },
      { id: "o5", text: "[CONSUMER CARE MISSING]", x: 15, y: 70, width: 70, height: 8, status: "violation", rule: "Rule 6(1)(f) Missing Consumer Care" }
    ]
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
    countryOfOrigin: "", // VIOLATION: Missing Country of Origin
    complianceScore: 42,
    status: "NON COMPLIANT",
    riskLevel: "High Risk",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    extractedText: `SONICPRO WIRELESS EARBUDS\nImported & Marketed by: Apex Imports, Mumbai\nNet Quantity: 1 Unit\nMRP: 2499\nBatch: APX-2026-90\nEmail: support@apeximports.com`,
    violations: [
      {
        rule: "Rule 6(1)(g)",
        title: "Missing Country of Origin on Imported Product",
        severity: "CRITICAL",
        description: "Under Legal Metrology Rules and Customs regulations, every imported package must explicitly declare the Country of Origin.",
        statutory_penalty: "₹ 25,000 to ₹ 50,000 + Customs Clearance Seizure",
        suggestion: "Print 'Country of Origin: PRC / China / Vietnam' conspicuously on outer box."
      },
      {
        rule: "Rule 6(1)(d)",
        title: "Missing Month & Year of Import / Packaging",
        severity: "CRITICAL",
        description: "Month and Year of import or pre-packaging is absent.",
        statutory_penalty: "₹ 25,000 under Section 36(1)",
        suggestion: "Declare 'Month & Year of Import: MM/YYYY'."
      },
      {
        rule: "Rule 6(1)(e)",
        title: "MRP Lacks Currency Symbol & Tax Declaration",
        severity: "HIGH",
        description: "Price is written as 'MRP: 2499' without standard 'Rs. / ₹' and without '(incl. of all taxes)'.",
        statutory_penalty: "₹ 25,000 under Section 36(1)",
        suggestion: "Format as 'MRP ₹ 2499.00 (incl. of all taxes)'."
      }
    ],
    warnings: [],
    boundingBoxes: [
      { id: "g1", text: "SONICPRO WIRELESS EARBUDS", x: 15, y: 12, width: 70, height: 10, status: "compliant", rule: "Rule 6(1)(b) Product Name" },
      { id: "g2", text: "[NO ORIGIN DECLARATION]", x: 15, y: 28, width: 60, height: 8, status: "violation", rule: "Rule 6(1)(g) Missing Country of Origin" },
      { id: "g3", text: "MRP: 2499 [NO CURRENCY / TAX CLAUSE]", x: 15, y: 42, width: 55, height: 8, status: "violation", rule: "Rule 6(1)(e) Invalid MRP Format" },
      { id: "g4", text: "[NO IMPORT DATE]", x: 15, y: 58, width: 50, height: 8, status: "violation", rule: "Rule 6(1)(d) Missing Import Date" }
    ]
  }
];

const inspectionReports = [
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

const certificates = [
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

const analyticsSummary = {
  totalInspections: 14820,
  compliantRate: 74.6,
  violationsDetected: 3764,
  penaltiesRealizedINR: 48920000,
  topViolations: [
    { rule: "Rule 6(1)(e)", name: "MRP missing 'inclusive of all taxes'", count: 1240, pct: 33 },
    { rule: "Rule 6(1)(c)", name: "Non-standard unit / font size shortfall", count: 980, pct: 26 },
    { rule: "Rule 6(1)(f)", name: "Missing or incomplete Consumer Care", count: 720, pct: 19 },
    { rule: "Rule 6(1)(g)", name: "Missing Country of Origin", count: 480, pct: 13 },
    { rule: "Rule 6(1)(a)", name: "Incomplete manufacturer address / PIN", count: 344, pct: 9 }
  ],
  categoryWiseRisk: [
    { category: "Imported Electronics", complianceRate: 51.2, riskScore: 78 },
    { category: "Edible Oils & Fats", complianceRate: 64.8, riskScore: 68 },
    { category: "Cosmetics & Care", complianceRate: 72.1, riskScore: 54 },
    { category: "Packaged Drinking Water", complianceRate: 81.0, riskScore: 36 },
    { category: "Food & Beverages", complianceRate: 88.4, riskScore: 22 }
  ],
  monthlyTrends: [
    { month: "Jan", scanned: 1100, compliant: 850, violations: 250 },
    { month: "Feb", scanned: 1250, compliant: 980, violations: 270 },
    { month: "Mar", scanned: 1400, compliant: 1090, violations: 310 },
    { month: "Apr", scanned: 1320, compliant: 1010, violations: 310 },
    { month: "May", scanned: 1580, compliant: 1220, violations: 360 },
    { month: "Jun", scanned: 1710, compliant: 1340, violations: 370 },
    { month: "Jul", scanned: 1890, compliant: 1480, violations: 410 },
    { month: "Aug", scanned: 2100, compliant: 1620, violations: 480 }
  ]
};

module.exports = {
  users,
  sampleProducts,
  inspectionReports,
  certificates,
  analyticsSummary
};
