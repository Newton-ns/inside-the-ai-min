import React, { useState } from 'react';
import { Scale, Search, FileText, CheckCircle2, AlertTriangle, Calculator, Sparkles, BookOpen } from 'lucide-react';

export const RulesCatalogPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [calcArea, setCalcArea] = useState<number>(150);
  const [calcQty, setCalcQty] = useState<number>(500);
  const [calcUnit, setCalcUnit] = useState<'g' | 'kg' | 'ml' | 'l'>('g');

  const rulesList = [
    {
      rule: "Rule 6(1)(a)",
      title: "Name & Address of Manufacturer / Packer / Importer",
      desc: "Every package shall bear the name and complete address of the manufacturer, or packer, or importer. If the manufacturer is not the packer, both names and addresses must be declared. A valid 6-digit postal PIN code is mandatory.",
      penalty: "Section 36(1) - Fine up to ₹25,000 for first offence, up to ₹50,000 for second.",
      tag: "Mandatory Declaration"
    },
    {
      rule: "Rule 6(1)(b)",
      title: "Generic or Common Name of Commodity",
      desc: "The common or generic name of the commodity contained in the package must be conspicuously declared on the Principal Display Panel.",
      penalty: "Section 36(1) - Fine up to ₹25,000.",
      tag: "Mandatory Declaration"
    },
    {
      rule: "Rule 6(1)(c)",
      title: "Net Quantity Declaration in Standard Metric Units",
      desc: "Net quantity in standard unit of weight or measure (g, kg, ml, l, m) or number. Use of non-standard symbols like 'gms', 'kgs', 'mls' is strictly prohibited. For liquids, declaration in volume (ml/l) is mandatory.",
      penalty: "Section 36(1) & Section 30 - Fine up to ₹50,000.",
      tag: "Mandatory Declaration"
    },
    {
      rule: "Rule 6(1)(d)",
      title: "Month and Year of Manufacture / Packing / Import",
      desc: "The month and year in which the commodity is manufactured, pre-packed or imported shall be declared (e.g. '03/2026' or 'Mar 2026').",
      penalty: "Section 36(1) - Fine up to ₹25,000.",
      tag: "Mandatory Declaration"
    },
    {
      rule: "Rule 6(1)(e)",
      title: "Maximum Retail Price (MRP) with Tax Clause",
      desc: "The retail sale price of the package shall be clearly stated in Indian Rupees as 'MRP Rs. XX.XX (incl. of all taxes)'. Overcharging above MRP is a strict liability offence.",
      penalty: "Section 36(1) & (2) - Fine up to ₹1,00,000 or imprisonment.",
      tag: "Price Regulation"
    },
    {
      rule: "Rule 6(1)(f)",
      title: "Consumer Care Grievance Redressal Mechanism",
      desc: "The name, address, telephone number, and email address of the person/office to be contacted in case of consumer complaints must be printed on the package.",
      penalty: "Section 36(1) - Fine up to ₹25,000.",
      tag: "Consumer Protection"
    },
    {
      rule: "Rule 6(1)(g)",
      title: "Country of Origin Declaration",
      desc: "Every package (both domestic and imported) shall clearly state the country of manufacture or country of origin.",
      penalty: "Section 36(1) - Seizure & fine up to ₹50,000.",
      tag: "Origin Traceability"
    },
    {
      rule: "Rule 7 & 8",
      title: "Principal Display Panel (PDP) & Minimum Font Size Schedule",
      desc: "Specifies the dimensions of the Principal Display Panel (PDP) and the minimum height of letters and numerals for Net Quantity and MRP declarations based on packaging area and weight.",
      penalty: "Rule 32 / Section 36(1) - Fine up to ₹20,000.",
      tag: "Typography Schedule"
    },
    {
      rule: "Rule 24",
      title: "Deceptive Packaging & Slack Fill Limits",
      desc: "Packages shall not be designed or filled in a manner that misleads the consumer regarding the quantity of commodity contained therein (maximum permissible slack-fill limits apply).",
      penalty: "Section 36(1) - Seizure & Notice.",
      tag: "Anti-Deception"
    }
  ];

  const filteredRules = rulesList.filter(r =>
    r.rule.toLowerCase().includes(search.toLowerCase()) ||
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.desc.toLowerCase().includes(search.toLowerCase())
  );

  // Compute font size
  let valGrams = calcQty;
  if (calcUnit === 'kg' || calcUnit === 'l') valGrams = calcQty * 1000;
  let computedFont = 1.0;
  if (valGrams > 1000) computedFont = 6.0;
  else if (valGrams > 200) computedFont = 4.0;
  else if (valGrams > 50) computedFont = 2.0;

  return (
    <div className="space-y-12 py-4">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Legal Metrology (Packaged Commodities) Rules, 2011 Catalog
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive statutory directory & compliance matrix under the Legal Metrology Act, 2009
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 mt-1" />
          <input
            type="text"
            placeholder="Search rules, declarations, penalties, or sections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-11 pr-4 py-3 text-xs text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Interactive First Schedule Font Height Calculator */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Calculator className="w-5 h-5 text-blue-400" />
          <h3 className="text-base font-bold text-white">
            Interactive First Schedule Font Size Height Calculator
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Net Quantity Value:</label>
            <input
              type="number"
              value={calcQty}
              onChange={(e) => setCalcQty(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Unit of Measurement:</label>
            <select
              value={calcUnit}
              onChange={(e) => setCalcUnit(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white cursor-pointer"
            >
              <option value="g">Grams (g)</option>
              <option value="kg">Kilograms (kg)</option>
              <option value="ml">Millilitres (ml)</option>
              <option value="l">Litres (L)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">PDP Area (sq. cm):</label>
            <input
              type="number"
              value={calcArea}
              onChange={(e) => setCalcArea(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
            />
          </div>
        </div>

        {/* Calculated Result */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-blue-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Rule 7 & 8 Mandated Minimum Font Height:</span>
            <div className="text-xl font-black text-amber-400 font-mono">
              {computedFont} mm Minimum Numeral Height
            </div>
          </div>
          <div className="text-xs text-slate-300 sm:text-right">
            <span>Applies to Net Quantity and MRP declarations on Principal Display Panel</span>
          </div>
        </div>
      </div>

      {/* Rules Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRules.map((item, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
                  {item.rule}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold uppercase">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-rose-400 font-medium">
              ⚖️ {item.penalty}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
