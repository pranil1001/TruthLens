import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

type FindingType = 'positive' | 'negative' | 'neutral';

interface Finding {
  id: string;
  type: FindingType;
  label: string;
  explanation: string;
}

interface KeyFindingsProps {
  findings: Finding[];
}

const FINDING_CONFIG = {
  positive: {
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
  },
  negative: {
    icon: AlertTriangle,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
  },
  neutral: {
    icon: Info,
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
  },
};

export const KeyFindings: React.FC<KeyFindingsProps> = ({ findings }) => {
  if (findings.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel rounded-2xl p-4 border border-white/10"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Key Findings</h3>
      </div>

      <div className="space-y-3">
        {findings.map((finding, index) => {
          const config = FINDING_CONFIG[finding.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={finding.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className={`flex gap-3 p-3 rounded-xl border ${config.bg} ${config.border} transition-all duration-200 hover:bg-white/5`}
            >
              <div className={`shrink-0 mt-0.5 ${config.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className={`text-xs font-bold ${config.color}`}>{finding.label}</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">{finding.explanation}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
