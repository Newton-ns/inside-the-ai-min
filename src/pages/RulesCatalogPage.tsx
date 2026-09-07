import React, { useState } from 'react';
import { Search, Calculator, BookOpen, ArrowUpRight } from 'lucide-react';

export const RulesCatalogPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [calcArea, setCalcArea] = useState<number>(150);
  const [calcQty, setCalcQty] = useState<number>(500);
  const [calcUnit, setCalcUnit] = useState<'g' | 'kg' | 'ml' | 'l'>('g');

  const rulesList = [
    { rule: 'Rule 6(1)(a)', title: 'Name & Address of Manufacturer / Packer / Importer', desc: 'Every package shall bear the name and complete address of the manufacturer, packer, or importer. A valid 6-digit postal PIN code is mandatory.', penalty: 'Section 36(1) — Fine up to ₹25,000 for first offence, up to ₹50,000 for second.', tag: 'Mandatory Declaration' },
    { rule: 'Rule 6(1)(b)', title: 'Generic or Common Name of Commodity', desc: 'The common or generic name of the commodity contained in the package must be conspicuously declared on the Principal Display Panel.', penalty: 'Section 36(1) — Fine up to ₹25,000.', tag: 'Mandatory Declaration' },
    { rule: 'Rule 6(1)(c)', title: 'Net Quantity Declaration in Standard Metric Units', desc: "Net quantity must use standard units such as g, kg, ml, l or number. Non-standard symbols such as 'gms' and 'kgs' are prohibited.", penalty: 'Section 36(1) & Section 30 — Fine up to ₹50,000.', tag: 'Mandatory Declaration' },
    { rule: 'Rule 6(1)(d)', title: 'Month and Year of Manufacture / Packing / Import', desc: "The month and year in which the commodity is manufactured, pre-packed or imported shall be declared, for example '03/2026'.", penalty: 'Section 36(1) — Fine up to ₹25,000.', tag: 'Mandatory Declaration' },
    { rule: 'Rule 6(1)(e)', title: 'Maximum Retail Price (MRP) with Tax Clause', desc: "The retail sale price shall be clearly stated in Indian Rupees as 'MRP Rs. XX.XX (incl. of all taxes)'.", penalty: 'Section 36(1) & (2) — Fine up to ₹1,00,000 or imprisonment.', tag: 'Price Regulation' },
    { rule: 'Rule 6(1)(f)', title: 'Consumer Care Grievance Redressal Mechanism', desc: 'The name, address, telephone number and email address for consumer complaints must be printed on the package.', penalty: 'Section 36(1) — Fine up to ₹25,000.', tag: 'Consumer Protection' },
    { rule: 'Rule 6(1)(g)', title: 'Country of Origin Declaration', desc: 'Every package, domestic or imported, shall clearly state the country of manufacture or country of origin.', penalty: 'Section 36(1) — Seizure & fine up to ₹50,000.', tag: 'Origin Traceability' },
    { rule: 'Rule 7 & 8', title: 'Principal Display Panel & Minimum Font Size Schedule', desc: 'Specifies the Principal Display Panel dimensions and minimum letter and numeral height for Net Quantity and MRP declarations.', penalty: 'Rule 32 / Section 36(1) — Fine up to ₹20,000.', tag: 'Typography Schedule' },
    { rule: 'Rule 24', title: 'Deceptive Packaging & Slack Fill Limits', desc: 'Packages shall not be designed or filled in a manner that misleads the consumer regarding the quantity contained therein.', penalty: 'Section 36(1) — Seizure & Notice.', tag: 'Anti-Deception' }
  ];

  const filteredRules = rulesList.filter(r => `${r.rule} ${r.title} ${r.desc} ${r.tag}`.toLowerCase().includes(search.toLowerCase()));
  let valGrams = calcQty;
  if (calcUnit === 'kg' || calcUnit === 'l') valGrams = calcQty * 1000;
  let computedFont = 1.0;
  if (valGrams > 1000) computedFont = 6.0;
  else if (valGrams > 200) computedFont = 4.0;
  else if (valGrams > 50) computedFont = 2.0;

  return (
    <div className="classic-internal-page classic-rules-page">
      <div className="classic-page-intro">
        <span className="classic-eyebrow">LEGAL LIBRARY / 02</span>
        <h1>Statutory Rules 2011</h1>
        <p>A focused reference for packaged commodity declarations, penalties and practical compliance requirements.</p>
      </div>

      <section className="classic-rule-toolbar">
        <div>
          <span className="classic-section-kicker">Rules directory</span>
          <h2>Legal Metrology (Packaged Commodities) Rules, 2011</h2>
        </div>
        <label className="classic-search-field">
          <Search size={17} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search rules, declarations or sections" />
        </label>
      </section>

      <section className="classic-calculator">
        <div className="classic-section-heading">
          <div><span className="classic-section-kicker">Practical tool</span><h2>Minimum font height calculator</h2></div>
          <Calculator size={20} />
        </div>
        <div className="classic-calculator-grid">
          <label>Net quantity<input type="number" value={calcQty} onChange={e => setCalcQty(Number(e.target.value))} /></label>
          <label>Unit<select value={calcUnit} onChange={e => setCalcUnit(e.target.value as 'g' | 'kg' | 'ml' | 'l')}><option value="g">Grams (g)</option><option value="kg">Kilograms (kg)</option><option value="ml">Millilitres (ml)</option><option value="l">Litres (L)</option></select></label>
          <label>PDP area (sq. cm)<input type="number" value={calcArea} onChange={e => setCalcArea(Number(e.target.value))} /></label>
        </div>
        <div className="classic-calculator-result"><span>Rule 7 & 8 minimum numeral height</span><strong>{computedFont} mm</strong><small>Applies to Net Quantity and MRP declarations on the Principal Display Panel.</small></div>
      </section>

      <section className="classic-rules-list">
        <div className="classic-list-head"><span>Rule</span><span>Requirement</span><span>Category</span></div>
        {filteredRules.map((item, idx) => (
          <article className="classic-rule-row" key={idx}>
            <div className="classic-rule-number">{item.rule}</div>
            <div className="classic-rule-main"><h3>{item.title}</h3><p>{item.desc}</p><div className="classic-rule-penalty">Penalty reference: {item.penalty}</div></div>
            <div className="classic-rule-tag">{item.tag}<ArrowUpRight size={15} /></div>
          </article>
        ))}
        {!filteredRules.length && <div className="classic-empty-state"><BookOpen size={20} /><span>No matching rules found.</span></div>}
      </section>
    </div>
  );
};
