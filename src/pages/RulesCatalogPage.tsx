import React, { useState } from 'react';
import { Search, Calculator, BookOpen, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const RulesCatalogPage: React.FC = () => {
  const { language } = useLanguage();
  const [search, setSearch] = useState('');
  const [calcArea, setCalcArea] = useState<number>(150);
  const [calcQty, setCalcQty] = useState<number>(500);
  const [calcUnit, setCalcUnit] = useState<'g' | 'kg' | 'ml' | 'l'>('g');

  const ui = language === 'hi' ? {
    eyebrow: 'विधिक पुस्तकालय / 02', title: 'वैधानिक नियम 2011', desc: 'पैकेज्ड वस्तुओं की घोषणाओं, दंड और व्यावहारिक अनुपालन आवश्यकताओं के लिए संदर्भ।', directory: 'नियम निर्देशिका', heading: 'विधिक मापविज्ञान (पैकेज्ड वस्तुएं) नियम, 2011', search: 'नियम, घोषणाएं या धाराएं खोजें', practical: 'व्यावहारिक उपकरण', calculator: 'न्यूनतम फॉन्ट ऊंचाई कैलकुलेटर', quantity: 'शुद्ध मात्रा', unit: 'इकाई', area: 'पीडीपी क्षेत्रफल (वर्ग सेमी)', grams: 'ग्राम (g)', kg: 'किलोग्राम (kg)', ml: 'मिलीलीटर (ml)', l: 'लीटर (L)', result: 'नियम 7 और 8 के अनुसार न्यूनतम अंक ऊंचाई', applies: 'पीडीपी पर शुद्ध मात्रा और एमआरपी घोषणाओं पर लागू।', rule: 'नियम', requirement: 'आवश्यकता', category: 'श्रेणी', penalty: 'दंड संदर्भ:', empty: 'कोई मिलान वाला नियम नहीं मिला।'
  } : language === 'ta' ? {
    eyebrow: 'சட்ட நூலகம் / 02', title: 'சட்ட விதிகள் 2011', desc: 'பொட்டலப் பொருட்களின் அறிவிப்புகள், அபராதங்கள் மற்றும் நடைமுறை இணக்கத் தேவைகளுக்கான குறிப்பு.', directory: 'விதிகள் அடைவு', heading: 'சட்ட அளவியல் (பொட்டலப் பொருட்கள்) விதிகள், 2011', search: 'விதிகள், அறிவிப்புகள் அல்லது பிரிவுகளைத் தேடுங்கள்', practical: 'நடைமுறை கருவி', calculator: 'குறைந்தபட்ச எழுத்துரு உயரம் கணிப்பான்', quantity: 'நிகர அளவு', unit: 'அலகு', area: 'PDP பரப்பளவு (ச.செ.மீ)', grams: 'கிராம் (g)', kg: 'கிலோகிராம் (kg)', ml: 'மில்லிலிட்டர் (ml)', l: 'லிட்டர் (L)', result: 'விதி 7 மற்றும் 8 குறைந்தபட்ச எண் உயரம்', applies: 'PDP-யில் நிகர அளவு மற்றும் MRP அறிவிப்புகளுக்கு பொருந்தும்.', rule: 'விதி', requirement: 'தேவை', category: 'வகை', penalty: 'அபராத குறிப்பு:', empty: 'பொருந்தும் விதிகள் எதுவும் கிடைக்கவில்லை.'
  } : {
    eyebrow: 'LEGAL LIBRARY / 02', title: 'Statutory Rules 2011', desc: 'A focused reference for packaged commodity declarations, penalties and practical compliance requirements.', directory: 'Rules directory', heading: 'Legal Metrology (Packaged Commodities) Rules, 2011', search: 'Search rules, declarations or sections', practical: 'Practical tool', calculator: 'Minimum font height calculator', quantity: 'Net quantity', unit: 'Unit', area: 'PDP area (sq. cm)', grams: 'Grams (g)', kg: 'Kilograms (kg)', ml: 'Millilitres (ml)', l: 'Litres (L)', result: 'Rule 7 & 8 minimum numeral height', applies: 'Applies to Net Quantity and MRP declarations on the Principal Display Panel.', rule: 'Rule', requirement: 'Requirement', category: 'Category', penalty: 'Penalty reference:', empty: 'No matching rules found.'
  };

  const baseRules = [
    ['Rule 6(1)(a)', 'Name & Address of Manufacturer / Packer / Importer', 'Every package shall bear the name and complete address of the manufacturer, packer, or importer.', 'Section 36(1) — Fine up to ₹25,000 for first offence.', 'Mandatory Declaration'],
    ['Rule 6(1)(b)', 'Generic or Common Name of Commodity', 'The common or generic name of the commodity must be conspicuously declared on the Principal Display Panel.', 'Section 36(1) — Fine up to ₹25,000.', 'Mandatory Declaration'],
    ['Rule 6(1)(c)', 'Net Quantity Declaration in Standard Metric Units', "Net quantity must use standard units such as g, kg, ml, l or number. Non-standard symbols such as 'gms' and 'kgs' are prohibited.", 'Section 36(1) & Section 30 — Fine up to ₹50,000.', 'Mandatory Declaration'],
    ['Rule 6(1)(d)', 'Month and Year of Manufacture / Packing / Import', "The month and year shall be declared, for example '03/2026'.", 'Section 36(1) — Fine up to ₹25,000.', 'Mandatory Declaration'],
    ['Rule 6(1)(e)', 'Maximum Retail Price (MRP) with Tax Clause', "The retail sale price shall be clearly stated in Indian Rupees as 'MRP Rs. XX.XX (incl. of all taxes)'.", 'Section 36(1) & (2) — Fine up to ₹1,00,000 or imprisonment.', 'Price Regulation'],
    ['Rule 6(1)(f)', 'Consumer Care Grievance Redressal Mechanism', 'The name, address, telephone number and email address for consumer complaints must be printed on the package.', 'Section 36(1) — Fine up to ₹25,000.', 'Consumer Protection'],
    ['Rule 6(1)(g)', 'Country of Origin Declaration', 'Every package shall clearly state the country of manufacture or country of origin.', 'Section 36(1) — Seizure & fine up to ₹50,000.', 'Origin Traceability'],
    ['Rule 7 & 8', 'Principal Display Panel & Minimum Font Size Schedule', 'Specifies the Principal Display Panel dimensions and minimum letter and numeral height for Net Quantity and MRP declarations.', 'Rule 32 / Section 36(1) — Fine up to ₹20,000.', 'Typography Schedule'],
    ['Rule 24', 'Deceptive Packaging & Slack Fill Limits', 'Packages shall not be designed or filled in a manner that misleads the consumer regarding the quantity contained therein.', 'Section 36(1) — Seizure & Notice.', 'Anti-Deception']
  ];
  const translatedLabels = language === 'hi' ? ['नाम और पता', 'वस्तु का सामान्य नाम', 'मानक मीट्रिक इकाइयों में शुद्ध मात्रा', 'निर्माण / पैकिंग / आयात का महीना और वर्ष', 'कर सहित अधिकतम खुदरा मूल्य (MRP)', 'उपभोक्ता शिकायत निवारण', 'मूल देश की घोषणा', 'प्रमुख प्रदर्शन पैनल और न्यूनतम फॉन्ट आकार', 'भ्रामक पैकेजिंग और स्लैक फिल सीमा'] : language === 'ta' ? ['உற்பத்தியாளர் / பேக்கர் / இறக்குமதியாளர் பெயர் மற்றும் முகவரி', 'பொருளின் பொதுவான பெயர்', 'நிலையான மெட்ரிக் அலகுகளில் நிகர அளவு', 'உற்பத்தி / பேக்கிங் / இறக்குமதி மாதம் மற்றும் ஆண்டு', 'வரி உட்பட அதிகபட்ச சில்லறை விலை (MRP)', 'நுகர்வோர் புகார் தீர்வு', 'தோற்ற நாடு அறிவிப்பு', 'முக்கிய காட்சி பகுதி மற்றும் குறைந்தபட்ச எழுத்துரு அளவு', 'தவறாக வழிநடத்தும் பேக்கேஜிங் வரம்புகள்'] : baseRules.map(r => r[1]);
  const translatedTags = language === 'hi' ? ['अनिवार्य घोषणा', 'अनिवार्य घोषणा', 'अनिवार्य घोषणा', 'अनिवार्य घोषणा', 'मूल्य विनियमन', 'उपभोक्ता संरक्षण', 'मूल ट्रेसबिलिटी', 'टाइपोग्राफी अनुसूची', 'भ्रामक पैकेजिंग'] : language === 'ta' ? ['கட்டாய அறிவிப்பு', 'கட்டாய அறிவிப்பு', 'கட்டாய அறிவிப்பு', 'கட்டாய அறிவிப்பு', 'விலை ஒழுங்குமுறை', 'நுகர்வோர் பாதுகாப்பு', 'தோற்ற கண்காணிப்பு', 'எழுத்துரு அட்டவணை', 'ஏமாற்றும் பேக்கேஜிங்'] : baseRules.map(r => r[4]);
  const filteredRules = baseRules.map((r, i) => ({ ...r, title: translatedLabels[i], tag: translatedTags[i] })).filter(r => `${r[0]} ${r.title} ${r[2]} ${r.tag}`.toLowerCase().includes(search.toLowerCase()));
  let valGrams = calcQty;
  if (calcUnit === 'kg' || calcUnit === 'l') valGrams = calcQty * 1000;
  let computedFont = 1.0;
  if (valGrams > 1000) computedFont = 6.0; else if (valGrams > 200) computedFont = 4.0; else if (valGrams > 50) computedFont = 2.0;

  return <div className="classic-internal-page classic-rules-page">
    <div className="classic-page-intro"><span className="classic-eyebrow">{ui.eyebrow}</span><h1>{ui.title}</h1><p>{ui.desc}</p></div>
    <section className="classic-rule-toolbar"><div><span className="classic-section-kicker">{ui.directory}</span><h2>{ui.heading}</h2></div><label className="classic-search-field"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder={ui.search}/></label></section>
    <section className="classic-calculator"><div className="classic-section-heading"><div><span className="classic-section-kicker">{ui.practical}</span><h2>{ui.calculator}</h2></div><Calculator size={20}/></div><div className="classic-calculator-grid"><label>{ui.quantity}<input type="number" value={calcQty} onChange={e => setCalcQty(Number(e.target.value))}/></label><label>{ui.unit}<select value={calcUnit} onChange={e => setCalcUnit(e.target.value as 'g'|'kg'|'ml'|'l')}><option value="g">{ui.grams}</option><option value="kg">{ui.kg}</option><option value="ml">{ui.ml}</option><option value="l">{ui.l}</option></select></label><label>{ui.area}<input type="number" value={calcArea} onChange={e => setCalcArea(Number(e.target.value))}/></label></div><div className="classic-calculator-result"><span>{ui.result}</span><strong>{computedFont} mm</strong><small>{ui.applies}</small></div></section>
    <section className="classic-rules-list"><div className="classic-list-head"><span>{ui.rule}</span><span>{ui.requirement}</span><span>{ui.category}</span></div>{filteredRules.map((item, idx) => <article className="classic-rule-row" key={idx}><div className="classic-rule-number">{item[0]}</div><div className="classic-rule-main"><h3>{item.title}</h3><p>{item[2]}</p><div className="classic-rule-penalty">{ui.penalty} {item[3]}</div></div><div className="classic-rule-tag">{item.tag}<ArrowUpRight size={15}/></div></article>)}{!filteredRules.length && <div className="classic-empty-state"><BookOpen size={20}/><span>{ui.empty}</span></div>}</section>
  </div>;
};
