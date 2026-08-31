import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, ShieldAlert, ShieldQuestion } from 'lucide-react';

type ReputationLevel = 'high' | 'medium' | 'low';

interface SourceCardProps {
  domain: string;
  trustScore: number;
  category: string;
  reputation: ReputationLevel;
}

const REPUTATION_CONFIG = {
  high: {
    label: 'High Trust',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    icon: ShieldCheck,
  },
  medium: {
    label: 'Medium Trust',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    icon: ShieldQuestion,
  },
  low: {
    label: 'Low Trust',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    icon: ShieldAlert,
  },
};

export const SourceCard: React.FC<SourceCardProps> = ({ domain, trustScore, category, reputation }) => {
  const config = REPUTATION_CONFIG[reputation];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel rounded-2xl p-4 border border-white/10 relative overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-200 truncate max-w-[150px]">{domain}</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">{category}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${config.bg} ${config.border} ${config.color} text-[10px] font-bold`}>
            <Icon className="w-3 h-3" />
            {config.label}
          </div>
          <span className="text-xs font-mono text-slate-400">Score: {trustScore}/100</span>
        </div>
      </div>
    </motion.div>
  );
};
