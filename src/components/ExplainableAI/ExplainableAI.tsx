import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';

type ReasonType = 'positive' | 'negative' | 'neutral';

interface ExplanationReason {
  id: string;
  type: ReasonType;
  title: string;
  description: string;
}

interface ExplainableAIProps {
  reasons: ExplanationReason[];
}

const REASON_CONFIG = {
  positive: {
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    label: 'Supporting Evidence',
  },
  negative: {
    icon: XCircle,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    label: 'Risk Factor',
  },
  neutral: {
    icon: Info,
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    label: 'Observation',
  },
};

export const ExplainableAI: React.FC<ExplainableAIProps> = ({ reasons }) => {
  if (reasons.length === 0) return null;

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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Why this score?</h3>
      </div>

      <div className="space-y-3">
        {reasons.map((reason, index) => {
          const config = REASON_CONFIG[reason.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className={`p-3 rounded-xl border ${config.bg} ${config.border} transition-all duration-200 hover:bg-white/5`}
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 mt-0.5 ${config.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${config.color}`}>{config.label}</span>
                    <span className="text-[10px] text-slate-500">• {reason.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
