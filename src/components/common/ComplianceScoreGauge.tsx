import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Award, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ComplianceScoreGaugeProps {
  score: number;       // 0-100
  status: 'COMPLIANT' | 'PARTIALLY COMPLIANT' | 'NON COMPLIANT';
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ComplianceScoreGauge: React.FC<ComplianceScoreGaugeProps> = ({
  score,
  status,
  animate = true,
  size = 'md'
}) => {
  const [displayScore, setDisplayScore] = useState<number>(0);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!animate) { setDisplayScore(score); return; }
    setDisplayScore(0);
    let current = 0;
    animRef.current = setInterval(() => {
      current += Math.ceil(score / 45);
      if (current >= score) {
        current = score;
        if (animRef.current) clearInterval(animRef.current);
      }
      setDisplayScore(current);
    }, 20);
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, [score, animate]);

  const circumference = 2 * Math.PI * 44;
  const strokeDash = circumference * (displayScore / 100);

  const scoreColor = score >= 85 ? '#10b981' : score >= 50 ? '#f59e0b' : '#f43f5e';
  const trackColor = '#1e293b';

  const sizeMap = {
    sm: { outer: 'w-24 h-24', svg: 100, r: 38, cx: 50, cy: 50, scoreText: 'text-xl', subText: 'text-[9px]' },
    md: { outer: 'w-36 h-36', svg: 150, r: 56, cx: 75, cy: 75, scoreText: 'text-3xl', subText: 'text-[10px]' },
    lg: { outer: 'w-48 h-48', svg: 200, r: 75, cx: 100, cy: 100, scoreText: 'text-5xl', subText: 'text-xs' }
  };
  const s = sizeMap[size];
  const circ = 2 * Math.PI * s.r;
  const dash = circ * (displayScore / 100);

  const StatusIcon = status === 'COMPLIANT' ? CheckCircle2 : status === 'PARTIALLY COMPLIANT' ? AlertTriangle : AlertTriangle;
  const statusColor = status === 'COMPLIANT' ? 'text-emerald-400' : status === 'PARTIALLY COMPLIANT' ? 'text-amber-400' : 'text-rose-400';

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className={`relative ${s.outer}`}>
        <svg
          width={s.svg}
          height={s.svg}
          viewBox={`0 0 ${s.svg} ${s.svg}`}
          className="transform -rotate-90"
        >
          {/* Track circle */}
          <circle
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            stroke={trackColor}
            strokeWidth="10"
            fill="none"
          />
          {/* Score arc */}
          <circle
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            stroke={scoreColor}
            strokeWidth="10"
            fill="none"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dasharray 0.3s ease',
              filter: `drop-shadow(0 0 8px ${scoreColor}80)`
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`${s.scoreText} font-black font-mono leading-none`}
            style={{ color: scoreColor }}
          >
            {displayScore}
          </span>
          <span className={`${s.subText} text-slate-400 font-bold uppercase tracking-wide`}>
            / 100
          </span>
        </div>
      </div>

      {/* Status label */}
      <div className={`flex items-center gap-1.5 text-xs font-bold ${statusColor}`}>
        <StatusIcon className="w-4 h-4" />
        <span>{status}</span>
      </div>
    </div>
  );
};
