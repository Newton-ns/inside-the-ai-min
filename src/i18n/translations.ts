export type Language = 'en' | 'hi' | 'ta';

export const translations = {
  en: {
    portalTitle: "National Legal Metrology Compliance Portal",
    ministry: "Ministry of Consumer Affairs, Food & Public Distribution",
    govIndia: "Government of India",
    subtitle: "AI-Based Verification System for Packaged Commodities Rules, 2011",
    roles: {
      inspector: "Legal Metrology Officer",
      manufacturer: "Packer / Manufacturer",
      admin: "State/National Admin",
      consumer: "Citizen / Consumer"
    },
    nav: {
      home: "Home",
      scanner: "AI Label Scanner",
      inspectorDashboard: "Officer Dashboard",
      manufacturerDashboard: "Manufacturer Studio",
      adminDashboard: "Analytics & Governance",
      consumerPortal: "Consumer Rights",
      rulesCatalog: "Statutory Rules 2011",
      verifyCert: "Verify Certificate"
    },
    hero: {
      badge: "Legal Metrology Act, 2009 & PCR 2011 Compliant",
      title: "Automated AI Inspection of Packaged Commodity Labels",
      desc: "Instant computer-vision & OCR verification of mandatory declarations, net quantity font schedules, MRP tax clauses, and Section 36 statutory penalties.",
      scanNow: "Launch AI Scanner",
      viewRules: "Browse Rules 2011",
      accuracy: "99.4% OCR Entity Precision",
      speed: "< 1.5s Analysis Latency",
      rulesCovered: "All 9 Mandatory Declarations"
    },
    scanner: {
      title: "AI Product Label Scanner",
      uploadTitle: "Upload Packaging Artwork / Photograph",
      dragDrop: "Drag & drop label image, or click to browse",
      useCamera: "Use Live Camera",
      orSelectSample: "Or select a pre-loaded sample commodity:",
      analyzing: "Running Computer Vision, OCR & Metrology Rules Engine...",
      analyzeBtn: "Scan & Verify Label",
      enhanceToggle: "Apply Image Enhancement (Bilateral Filter + Contrast)",
      categoryLabel: "Select Commodity Category",
      areaLabel: "Principal Display Panel Area (sq. cm)"
    },
    report: {
      complianceScore: "Compliance Score",
      status: "Compliance Status",
      violationsFound: "Statutory Violations Detected",
      warningsFound: "Observations & Warnings",
      passedRules: "Compliant Declarations",
      suggestions: "Actionable Correction Guidance",
      minFontSize: "Minimum Font Size Required (Rule 7/8)",
      penaltyEstimate: "Estimated Section 36 Penalty",
      genNotice: "Issue Statutory Notice (Form-I)",
      genCert: "Generate Compliance Certificate",
      downloadPdf: "Download Inspection Report"
    },
    voice: {
      title: "Voice Inspection Assistant",
      listening: "Listening for commands...",
      clickToSpeak: "Click to start voice inspection",
      instructions: "Try speaking: 'Check this product', 'Show violations', 'Explain Rule 6', 'Generate notice'"
    }
  },
  hi: {
    portalTitle: "राष्ट्रीय विधिक मापविज्ञान अनुपालन पोर्टल",
    ministry: "उपभोक्ता मामले, खाद्य और सार्वजनिक वितरण मंत्रालय",
    govIndia: "भारत सरकार",
    subtitle: "विधिक मापविज्ञान (पैकेज्ड वस्तुएं) नियम, 2011 हेतु एआई सत्यापन प्रणाली",
    roles: {
      inspector: "विधिक मापविज्ञान अधिकारी",
      manufacturer: "निर्माता / पैकर",
      admin: "प्रशासक",
      consumer: "उपभोक्ता / नागरिक"
    },
    nav: {
      home: "मुख्य पृष्ठ",
      scanner: "एआई लेबल स्कैनर",
      inspectorDashboard: "अधिकारी डैशबोर्ड",
      manufacturerDashboard: "निर्माता स्टूडियो",
      adminDashboard: "विश्लेषण व प्रशासन",
      consumerPortal: "उपभोक्ता अधिकार",
      rulesCatalog: "वैधानिक नियम 2011",
      verifyCert: "प्रमाणपत्र सत्यापन"
    },
    hero: {
      badge: "विधिक मापविज्ञान अधिनियम, 2009 एवं नियम 2011 समर्थित",
      title: "पैकेज्ड वस्तुओं के लेबलों का स्वचालित एआई निरीक्षण",
      desc: "अनिवार्य घोषणाओं, शुद्ध मात्रा फॉन्ट आकार अनुसूची, एमआरपी कर घोषणा और धारा 36 के तहत दंडात्मक नियमों का त्वरित ओसीआर व एआई सत्यापन।",
      scanNow: "एआई स्कैनर शुरू करें",
      viewRules: "नियम 2011 देखें",
      accuracy: "99.4% ओसीआर शुद्धता",
      speed: "< 1.5 सेकंड विश्लेषण गति",
      rulesCovered: "सभी 9 अनिवार्य घोषणाएं"
    },
    scanner: {
      title: "एआई उत्पाद लेबल स्कैनर",
      uploadTitle: "पैकेजिंग इमेज या लेबल अपलोड करें",
      dragDrop: "छवि यहाँ खींचें या चुनने के लिए क्लिक करें",
      useCamera: "लाइव कैमरा उपयोग करें",
      orSelectSample: "या पहले से लोड किया गया उत्पाद चुनें:",
      analyzing: "कंप्यूटर विज़न, ओसीआर और नियम इंजन द्वारा विश्लेषण जारी है...",
      analyzeBtn: "स्कैन करें और जांचें",
      enhanceToggle: "छवि वृद्धि फ़िल्टर लागू करें",
      categoryLabel: "वस्तु की श्रेणी चुनें",
      areaLabel: "मुख्य प्रदर्शन पैनल क्षेत्रफल (वर्ग सेमी)"
    },
    report: {
      complianceScore: "अनुपालन स्कोर",
      status: "अनुपालन स्थिति",
      violationsFound: "पाए गए वैधानिक उल्लंघन",
      warningsFound: "चेतावनियां एवं अवलोकन",
      passedRules: "मानक अनुरूप घोषणाएं",
      suggestions: "सुधारात्मक सुझाव",
      minFontSize: "न्यूनतम फॉन्ट आकार आवश्यकता (नियम 7/8)",
      penaltyEstimate: "अनुमानित वैधानिक जुर्माना (धारा 36)",
      genNotice: "धारा 36 नोटिस जारी करें (फॉर्म-1)",
      genCert: "अनुपालन प्रमाणपत्र जारी करें",
      downloadPdf: "निरीक्षण रिपोर्ट डाउनलोड करें"
    },
    voice: {
      title: "वॉयस निरीक्षण सहायक",
      listening: "निर्देश सुन रहा है...",
      clickToSpeak: "वॉयस निरीक्षण शुरू करने के लिए क्लिक करें",
      instructions: "बोलें: 'Check this product', 'Show violations', 'Explain Rule 6'"
    }
  },
  ta: {
    portalTitle: "தேசிய சட்ட அளவியல் இணக்க போர்டல்",
    ministry: "நுகர்வோர் விவகாரங்கள், உணவு மற்றும் பொது விநியோக அமைச்சகம்",
    govIndia: "இந்திய அரசு",
    subtitle: "பொட்டலப் பொருட்கள் விதிகள், 2011 க்கான AI சரிபார்ப்பு அமைப்பு",
    roles: {
      inspector: "சட்ட அளவியல் அலுவலர்",
      manufacturer: "உற்பத்தியாளர் / பேக்கர்",
      admin: "நிர்வாகி",
      consumer: "நுகர்வோர் / குடிமகன்"
    },
    nav: {
      home: "முகப்பு",
      scanner: "AI லேபிள் ஸ்கேனர்",
      inspectorDashboard: "அலுவலர் டாஷ்போர்டு",
      manufacturerDashboard: "உற்பத்தியாளர் மையம்",
      adminDashboard: "பகுப்பாய்வு மற்றும் மேலாண்மை",
      consumerPortal: "நுகர்வோர் உரிமைகள்",
      rulesCatalog: "சட்ட விதிகள் 2011",
      verifyCert: "சான்றிதழ் சரிபார்ப்பு"
    },
    hero: {
      badge: "சட்ட அளவியல் சட்டம் 2009 & விதிகள் 2011 இணக்கம்",
      title: "பொட்டலப் பொருட்களின் லேபிள்களை தானியங்கி AI ஆய்வு",
      desc: "கட்டாய பிரகடனங்கள், நிகர அளவு எழுத்துரு அளவு, MRP வரி விவரிப்பு மற்றும் பிரிவு 36 சட்டரீதியான அபராதங்களை உடனடியாக சரிபார்க்கவும்.",
      scanNow: "AI ஸ்கேனரைத் தொடங்கவும்",
      viewRules: "விதிகள் 2011 ஐப் பார்க்கவும்",
      accuracy: "99.4% துல்லியமான OCR பிரித்தெடுத்தல்",
      speed: "< 1.5 நொடி வேக பகுப்பாய்வு",
      rulesCovered: "அனைத்து 9 கட்டாய பிரகடனங்கள்"
    },
    scanner: {
      title: "AI தயாரிப்பு லேபிள் ஸ்கேனர்",
      uploadTitle: "பேக்கேஜிங் படத்தை பதிவேற்றவும்",
      dragDrop: "படத்தை இங்கே இழுக்கவும் அல்லது கிளிக் செய்யவும்",
      useCamera: "கேமராவை பயன்படுத்தவும்",
      orSelectSample: "மாதிரி தயாரிப்பைத் தேர்ந்தெடுக்கவும்:",
      analyzing: "AI பார்வை, OCR மற்றும் விதி சரிபார்ப்பு நடக்கிறது...",
      analyzeBtn: "ஸ்கேன் செய்து சரிபார்க்கவும்",
      enhanceToggle: "பட மேம்பாட்டு வடிகட்டியைப் பயன்படுத்து",
      categoryLabel: "பொருள் வகையைத் தேர்ந்தெடுக்கவும்",
      areaLabel: "முதன்மை காட்சி குழு பகுதி (சதுர செ.மீ)"
    },
    report: {
      complianceScore: "இணக்க மதிப்பெண்",
      status: "இணக்க நிலை",
      violationsFound: "கண்டறியப்பட்ட சட்ட மீறல்கள்",
      warningsFound: "எச்சரிக்கைகள் மற்றும் அவதானிப்புகள்",
      passedRules: "சட்டத்திற்குட்பட்ட பிரகடனங்கள்",
      suggestions: "திருத்த வழிகாட்டுதல்",
      minFontSize: "குறைந்தபட்ச எழுத்துரு அளவு (விதி 7/8)",
      penaltyEstimate: "மதிப்பிடப்பட்ட பிரிவு 36 அபராதம்",
      genNotice: "சட்ட அறிவிப்பை வழங்கவும்",
      genCert: "இணக்க சான்றிதழை உருவாக்கவும்",
      downloadPdf: "ஆய்வு அறிக்கையை பதிவிறக்கவும்"
    },
    voice: {
      title: "குரல் ஆய்வு உதவியாளர்",
      listening: "குரல் கட்டளைகளைக் கேட்கிறது...",
      clickToSpeak: "குரல் ஆய்வைத் தொடங்க கிளிக் செய்யவும்",
      instructions: "பேசவும்: 'Check this product', 'Show violations', 'Explain Rule 6'"
    }
  }
};
