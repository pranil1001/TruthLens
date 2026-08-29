import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';

type PredictionType = 'credible' | 'uncertain' | 'misleading';

interface PredictionBadgeProps {
  type: PredictionType;
  confidence: number;
}

const PREDICTION_CONFIG = {
  credible: {
    label: 'Likely Credible',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    icon: CheckCircle2,
    glow: 'shadow-emerald-500/10',
  },
  uncertain: {
    label: 'Uncertain',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    icon: HelpCircle,
    glow: 'shadow-amber-500/10',
  },
  misleading: {
    label: 'Likely Misleading',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    icon: AlertCircle,
    glow: 'shadow-rose-500/10',
  },
};

export const PredictionBadge: React.FC<PredictionBadgeProps> = ({ type, confidence }) => {
  const config = PREDICTION_CONFIG[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.bg} ${config.border} ${config.color} shadow-sm ${config.glow} transition-all duration-200`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="text-xs font-bold tracking-wide">{config.label}</span>
      <div className="h-3 w-[1px] bg-white/20 mx-1" />
      <span className="text-[10px] font-mono opacity-80">{confidence}%</span>
    </motion.div>
  );
};
