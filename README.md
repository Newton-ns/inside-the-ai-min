# ⚖️ AI-Based Legal Metrology Compliance Checker
### SIH Problem Code: SIH26034 | Ministry of Consumer Affairs, Food & Public Distribution

> An intelligent full-stack inspection platform that automatically verifies packaged commodity labels against the **Legal Metrology (Packaged Commodities) Rules, 2011** using AI-powered OCR, NLP, and a rule-based compliance engine.

---

## 🌐 Live Ports

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** (Vite + React) | http://localhost:5173 | Main web application |
| **Express API** (Node.js) | http://localhost:5000 | REST API backend |
| **FastAPI AI Service** (Python) | http://localhost:8000 | AI OCR & rule engine |
| **Swagger Docs** | http://localhost:8000/docs | Auto-generated API docs |

---

## 🚀 Quick Start

### Option 1: Single click (Windows)
```bat
double-click start-all.bat
```

### Option 2: Manual

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Express API
cd server && node server.js

# Terminal 3 - FastAPI AI Service
cd ai_service && python -m uvicorn main:app --port 8000 --reload
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      React 19 + Vite 8 SPA                      │
│  LandingPage  │ InspectorDashboard │ AdminDashboard │ Consumer  │
│  ProductScanner (OCR) │ ComplianceReport │ CertificateGen       │
│  LabelBoundingBoxViewer │ VoiceAssistant │ RulesCatalog         │
└────────────────────────┬────────────────────────────────────────┘
                         │  REST API calls (optional, works offline)
         ┌───────────────┴──────────────────┐
         │                                  │
┌────────▼──────────┐           ┌───────────▼────────────┐
│   Express.js API  │           │  FastAPI (Python 3.13)  │
│   port :5000      │           │  port :8000             │
│  ├ /api/auth      │           │  ├ POST /api/ai/analyze-image │
│  ├ /api/products  │           │  ├ POST /api/ai/analyze-text  │
│  ├ /api/compliance│           │  ├ GET  /api/ai/rules-catalog │
│  ├ /api/certs     │           │  └ GET  /health               │
│  └ /api/analytics │           │                         │
│  In-memory store  │           │  ├ preprocessor.py (PIL)│
└───────────────────┘           │  ├ ocr_extractor.py      │
                                │  ├ nlp_parser.py (regex) │
                                │  ├ rules_engine.py        │
                                │  └ risk_model.py          │
                                └────────────────────────────┘
```

---

## 🔬 Core Features

### 1. Product Image Scanning & OCR Pipeline
- Drag & drop image upload or camera capture
- 4 pre-loaded sample commodities (Basmati Rice, Sunflower Oil, Earbuds, Pink Salt)
- **Animated AI OCR Pipeline Stepper** showing: Upload → Enhancement → OCR → NLP → Rule Check → Report
- PIL-based image preprocessing (contrast 1.4×, sharpness 1.5×)
- Multi-pattern NLP entity extraction (9 mandatory fields)

### 2. AI Compliance Detection Engine
Rules checked against **Legal Metrology (Packaged Commodities) Rules, 2011**:

| Rule | Description |
|------|-------------|
| Rule 6(1)(a) | Manufacturer/packer name, address, PIN code |
| Rule 6(1)(b) | Generic commodity name |
| Rule 6(1)(c) | Net quantity in standard metric units (g/kg/ml/L) |
| Rule 6(1)(d) | Month & Year of manufacture/import |
| Rule 6(1)(e) | MRP with "incl. of all taxes" clause |
| Rule 6(1)(f) | Consumer care number / email |
| Rule 6(1)(g) | Country of origin declaration |
| Rule 7 & 8 | First Schedule font size minimum matrix |

### 3. Interactive Label Bounding Box Inspector
- Color-coded overlays (🟢 pass / 🔴 violation / 🟡 warning)
- Click boxes to see rule details, zoom/pan support

### 4. Compliance Report & Score Gauge
- **Animated SVG circular score gauge** (0–100)
- Full violation list with Section 36 statutory penalty estimates
- **OCR Entity extraction cards** with confidence bars
- **All 8 rules checklist** with PASS/FAIL/WARN/N/A status

### 5. Digital Compliance Certificate
- QR code (SHA-256 signed) for public verification
- Officer signature block
- Print-ready format with watermark
- Accessible via `PublicVerifyPage` at `/verify/:certId`

### 6. Statutory Show Cause Notice Generator (Form-I)
- Pre-filled with detected violations
- Section 36 penalty calculation
- Print-ready official notice format

### 7. Role-Based Dashboards
| Role | Dashboard Features |
|------|--------------------|
| **Inspector** | KPI cards, scan workspace, inspection log with filter/search |
| **Manufacturer** | Pre-production pre-flight checklist, integrated scanner |
| **Admin** | Recharts bar chart (trends), pie chart (violations), risk heatmap |
| **Consumer** | Product scan + NCH-1915 grievance submission form |

### 8. Voice Inspection Assistant
- Web Speech API voice commands
- Commands: "scan", "report", "violations", "score"
- Hindi & Tamil synthesis support

### 9. Multilingual Support
- English, Hindi (हिन्दी), Tamil (தமிழ்)
- Full translation dictionary in `src/i18n/translations.ts`

### 10. Risk Prediction ML Model
- Multi-factor risk scoring (category sensitivity, historical violations, score)
- Risk levels: Low / Medium / High

---

## 📁 Project Structure

```
d:\THRIVA\
├── src/
│   ├── App.jsx                         # Router + AuthProvider + LanguageProvider
│   ├── types/index.ts                  # TypeScript interfaces
│   ├── i18n/translations.ts            # EN/HI/TA translations
│   ├── context/
│   │   ├── AuthContext.tsx             # Role switcher (inspector/manufacturer/admin/consumer)
│   │   └── LanguageContext.tsx         # Language hook
│   ├── services/
│   │   ├── metrologyEngine.ts          # Client-side offline compliance engine
│   │   └── api.ts                      # API client (online + offline fallback)
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx              # Sticky gov-tech header
│   │   │   ├── Footer.tsx              # MoCAF&PD footer
│   │   │   ├── RuleCheckBadge.tsx      # Rule PASS/FAIL/WARN badge + full checklist
│   │   │   └── ComplianceScoreGauge.tsx # Animated SVG score gauge
│   │   ├── scanner/
│   │   │   ├── ProductScanner.tsx      # Image upload, camera, sample selector
│   │   │   ├── OCRPipelineStepper.tsx  # Animated 6-step pipeline stepper
│   │   │   └── LabelBoundingBoxViewer.tsx # Interactive bbox overlays
│   │   ├── reports/
│   │   │   ├── ComplianceReportView.tsx # Full report view
│   │   │   ├── OCREntityCards.tsx       # Entity extraction display cards
│   │   │   └── NoticeGeneratorModal.tsx # Statutory notice generator
│   │   ├── certificate/
│   │   │   └── CertificateGenerator.tsx # QR digital certificate
│   │   └── voice/
│   │       └── VoiceInspectionAssistant.tsx
│   └── pages/
│       ├── LandingPage.tsx
│       ├── ScannerPage.tsx
│       ├── InspectorDashboard.tsx
│       ├── ManufacturerDashboard.tsx
│       ├── AdminDashboard.tsx
│       ├── ConsumerScanPage.tsx
│       ├── RulesCatalogPage.tsx
│       └── PublicVerifyPage.tsx
├── server/                             # Express.js REST API (port 5000)
│   ├── server.js
│   ├── data/store.js                   # In-memory seed data
│   └── routes/
│       ├── authRoutes.js
│       ├── productRoutes.js
│       ├── complianceRoutes.js
│       ├── certificateRoutes.js
│       └── analyticsRoutes.js
├── ai_service/                         # Python FastAPI AI service (port 8000)
│   ├── main.py
│   ├── requirements.txt
│   └── engine/
│       ├── preprocessor.py             # PIL image enhancement
│       ├── ocr_extractor.py            # OCR with bounding boxes
│       ├── nlp_parser.py               # Entity extraction (9 fields)
│       ├── rules_engine.py             # PCR 2011 rule validator
│       └── risk_model.py               # ML risk scoring
├── start-all.bat                       # One-click startup
└── index.html                          # Updated metadata & branding
```

---

## 🧪 Test Results

| Test Case | Score | Status | Violations |
|-----------|-------|--------|------------|
| Basmati Rice (compliant) | 100% | ✅ COMPLIANT | 0 |
| Sunflower Oil (unit + tax) | 53% | ⚠️ PARTIALLY COMPLIANT | 3 |
| SonicPro Earbuds (import) | 47% | ❌ NON COMPLIANT | 4 |

---

## 📜 Statutory References

- **Legal Metrology Act, 2009** (No. 1 of 2010)
- **Legal Metrology (Packaged Commodities) Rules, 2011** — Rules 2, 6, 7, 8, First Schedule
- **Section 36** — Penalty for false declarations
- **Consumer Protection Act, 2019** — NCH Helpline 1915

---

*Built for Smart India Hackathon 2026 | SIH26034*