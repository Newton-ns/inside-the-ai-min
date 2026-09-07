import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, MinusCircle } from 'lucide-react';

type RuleStatus = 'pass' | 'fail' | 'warning' | 'skipped';

interface RuleCheckBadgeProps {
  rule: string;
  title: string;
  status: RuleStatus;
  details?: string;
  onClick?: () => void;
  compact?: boolean;
}

const statusConfig: Record<RuleStatus, {
  icon: React.ReactNode;
  bg: string;
  border: string;
  text: string;
  dot: string;
  label: string;
}> = {
  pass: {
    icon: <CheckCircle2 className="w-4 h-4" />,
    bg: 'bg-emerald-950/60',
    border: 'border-emerald-600/40',
    text: 'text-emerald-300',
    dot: 'bg-emerald-400',
    label: 'PASS'
  },
  fail: {
    icon: <XCircle className="w-4 h-4" />,
    bg: 'bg-rose-950/60',
    border: 'border-rose-600/40',
    text: 'text-rose-300',
    dot: 'bg-rose-400',
    label: 'FAIL'
  },
  warning: {
    icon: <AlertTriangle className="w-4 h-4" />,
    bg: 'bg-amber-950/60',
    border: 'border-amber-500/40',
    text: 'text-amber-300',
    dot: 'bg-amber-400',
    label: 'WARN'
  },
  skipped: {
    icon: <MinusCircle className="w-4 h-4" />,
    bg: 'bg-slate-900/60',
    border: 'border-slate-700/40',
    text: 'text-slate-400',
    dot: 'bg-slate-500',
    label: 'N/A'
  }
};

export const RuleCheckBadge: React.FC<RuleCheckBadgeProps> = ({
  rule,
  title,
  status,
  details,
  onClick,
  compact = false
}) => {
  const cfg = statusConfig[status];

  if (compact) {
    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer hover:scale-105 ${cfg.bg} ${cfg.border} ${cfg.text}`}
        title={`${rule}: ${title}`}
      >
        {cfg.icon}
        <span className="font-mono">{rule}</span>
        <span className="font-semibold">{cfg.label}</span>
      </button>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${cfg.bg} ${cfg.border} ${onClick ? 'cursor-pointer hover:scale-[1.01]' : ''}`}
    >
      <div className={`mt-0.5 shrink-0 ${cfg.text}`}>{cfg.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[10px] font-mono font-bold ${cfg.text} opacity-80`}>{rule}</span>
          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded ${cfg.text}`}>
            {cfg.label}
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-200 mt-0.5 leading-snug">{title}</p>
        {details && (
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{details}</p>
        )}
      </div>
    </div>
  );
};

// Batch display of all 9 rule check results
interface AllRulesChecklistProps {
  passed: { rule: string; title: string; details?: string }[];
  violations: { rule: string; title: string; description?: string }[];
  warnings: { rule: string; title: string; description?: string }[];
}

export const AllRulesChecklist: React.FC<AllRulesChecklistProps> = ({
  passed, violations, warnings
}) => {
  const allRules = [
    'Rule 6(1)(a)',
    'Rule 6(1)(b)',
    'Rule 6(1)(c)',
    'Rule 6(1)(d)',
    'Rule 6(1)(e)',
    'Rule 6(1)(f)',
    'Rule 6(1)(g)',
    'Rule 7 & 8',
  ];

  const ruleTitles: Record<string, string> = {
    'Rule 6(1)(a)': 'Manufacturer / Packer Address & PIN',
    'Rule 6(1)(b)': 'Generic Commodity Name',
    'Rule 6(1)(c)': 'Net Quantity in Standard Metric Units',
    'Rule 6(1)(d)': 'Month & Year of Manufacture / Import',
    'Rule 6(1)(e)': 'MRP with "incl. of all taxes" Clause',
    'Rule 6(1)(f)': 'Consumer Care Helpline & Email',
    'Rule 6(1)(g)': 'Country of Origin Declaration',
    'Rule 7 & 8':   'Font Size Schedule (First Schedule)'
  };

  return (
    <div className="space-y-2">
      {allRules.map(ruleKey => {
        const isPass = passed.some(p => p.rule.includes(ruleKey.split(' ')[0]) && p.rule.includes(ruleKey.split('(')[1]?.charAt(0) || ''));
        const isFail = violations.some(v => v.rule.includes(ruleKey.split('(')[0]?.trim() || ruleKey));
        const isWarn = warnings.some(w => w.rule.includes(ruleKey.split('(')[0]?.trim() || ruleKey));

        // Better matching
        const passedMatch = passed.find(p => p.rule === ruleKey || p.rule.startsWith(ruleKey.split(' ')[0] + ' 6(1)(' + ruleKey.match(/\((.*)\)/)?.[1]));
        const violMatch = violations.find(v => v.rule.includes(ruleKey.replace('Rule ', '')));
        const warnMatch = warnings.find(w => w.rule.includes(ruleKey.replace('Rule ', '')));

        let status: RuleStatus = 'skipped';
        let title = ruleTitles[ruleKey] || ruleKey;
        let details: string | undefined;

        if (violMatch) {
          status = 'fail';
          details = violMatch.description;
        } else if (warnMatch) {
          status = 'warning';
          details = warnMatch.description;
        } else if (passedMatch) {
          status = 'pass';
          details = passedMatch.details;
        } else if (passed.length > 0 || violations.length > 0) {
          // If we have any results, mark remaining as N/A
          status = 'skipped';
        }

        return (
          <RuleCheckBadge
            key={ruleKey}
            rule={ruleKey}
            title={title}
            status={status}
            details={details}
          />
        );
      })}
    </div>
  );
};
