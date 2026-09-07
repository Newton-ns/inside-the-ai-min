import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { BarChart3, TrendingUp, AlertTriangle, ShieldCheck, DollarSign, Activity, Award } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const monthlyData = [
    { month: "Jan", scanned: 1100, compliant: 850, violations: 250 },
    { month: "Feb", scanned: 1250, compliant: 980, violations: 270 },
    { month: "Mar", scanned: 1400, compliant: 1090, violations: 310 },
    { month: "Apr", scanned: 1320, compliant: 1010, violations: 310 },
    { month: "May", scanned: 1580, compliant: 1220, violations: 360 },
    { month: "Jun", scanned: 1710, compliant: 1340, violations: 370 },
    { month: "Jul", scanned: 1890, compliant: 1480, violations: 410 },
    { month: "Aug", scanned: 2100, compliant: 1620, violations: 480 }
  ];

  const topViolationsData = [
    { name: "MRP missing 'incl. taxes' [Rule 6(1)(e)]", value: 33, color: "#f43f5e" },
    { name: "Non-standard unit symbol [Rule 6(1)(c)]", value: 26, color: "#f59e0b" },
    { name: "Missing Customer Care [Rule 6(1)(f)]", value: 19, color: "#3b82f6" },
    { name: "Missing Origin [Rule 6(1)(g)]", value: 13, color: "#8b5cf6" },
    { name: "Incomplete Address/PIN [Rule 6(1)(a)]", value: 9, color: "#10b981" }
  ];

  const categoryRiskTable = [
    { category: "Imported Electronics", totalScanned: 3200, complianceRate: "51.2%", riskScore: 78, level: "High Risk" },
    { category: "Edible Oils & Fats", totalScanned: 4150, complianceRate: "64.8%", riskScore: 68, level: "Medium Risk" },
    { category: "Cosmetics & Personal Care", totalScanned: 2890, complianceRate: "72.1%", riskScore: 54, level: "Medium Risk" },
    { category: "Packaged Drinking Water", totalScanned: 1980, complianceRate: "81.0%", riskScore: 36, level: "Low Risk" },
    { category: "Food & Beverages", totalScanned: 5600, complianceRate: "88.4%", riskScore: 22, level: "Low Risk" }
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              National Legal Metrology Compliance & Enforcement Directorate
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Ministry of Consumer Affairs, Food & Public Distribution • Central Surveillance Analytics
            </p>
          </div>
        </div>

        <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-right">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Live AI Engine Status</span>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            All 36 States & UT Nodes Online
          </span>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-1 shadow-xl">
          <span className="text-xs text-slate-400 font-medium">Total Packages Analyzed</span>
          <div className="text-3xl font-black text-white font-mono">14,820</div>
          <div className="text-[11px] text-emerald-400 font-medium">↑ 18.4% month-on-month</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-1 shadow-xl">
          <span className="text-xs text-slate-400 font-medium">National Compliance Rate</span>
          <div className="text-3xl font-black text-blue-400 font-mono">74.6%</div>
          <div className="text-[11px] text-blue-300 font-medium">+4.2% post-AI enforcement</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-1 shadow-xl">
          <span className="text-xs text-slate-400 font-medium">Statutory Notices Served</span>
          <div className="text-3xl font-black text-amber-400 font-mono">3,764</div>
          <div className="text-[11px] text-amber-300 font-medium">Form-I & Section 15 Seizures</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-1 shadow-xl">
          <span className="text-xs text-slate-400 font-medium">Penalties Realized (INR)</span>
          <div className="text-3xl font-black text-rose-400 font-mono">₹ 4.89 Cr</div>
          <div className="text-[11px] text-slate-400">Section 36 compounding fines</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Surveillance Chart */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Monthly Inspection & Violation Trends
            </h3>
            <span className="text-xs text-slate-400 font-mono">CY 2026</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" textAnchor="middle" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="compliant" name="Compliant (Pass)" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="violations" name="Violations (Notice Issued)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Violations Pie Chart */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Top Statutory Violations Breakdown
            </h3>
            <span className="text-xs text-slate-400 font-mono">PCR 2011</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topViolationsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {topViolationsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => `${val}%`}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-[11px] text-slate-400">
            {topViolationsData.map((v, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: v.color }}></span>
                  <span className="truncate max-w-[200px] text-slate-300">{v.name}</span>
                </div>
                <span className="font-mono font-bold text-white">{v.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Risk Heatmap Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Commodity Category Vulnerability & Risk Index
          </h3>
          <span className="text-xs text-slate-400">Weighted Risk Calculation Engine</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-3 rounded-l-xl">Commodity Category</th>
                <th className="p-3">Samples Tested</th>
                <th className="p-3">Compliance Rate</th>
                <th className="p-3">Risk Factor Score</th>
                <th className="p-3 rounded-r-xl">Surveillance Directive</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {categoryRiskTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white">{row.category}</td>
                  <td className="p-3 font-mono">{row.totalScanned.toLocaleString()}</td>
                  <td className="p-3 font-mono text-emerald-400 font-bold">{row.complianceRate}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      row.level === 'High Risk' ? 'bg-rose-950 border border-rose-500/40 text-rose-300' :
                      row.level === 'Medium Risk' ? 'bg-amber-950 border border-amber-500/40 text-amber-300' :
                      'bg-emerald-950 border border-emerald-500/40 text-emerald-300'
                    }`}>
                      {row.level} ({row.riskScore}/100)
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">
                    {row.level === 'High Risk' ? '100% border & warehouse verification' :
                     row.level === 'Medium Risk' ? 'Bi-weekly retail spot checks' :
                     'Routine periodic sampling'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
