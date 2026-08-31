import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, Volume2, Type, Zap, MessageCircle } from 'lucide-react';

interface HeadlineMetric {
  label: string;
  value: 'low' | 'medium' | 'high';
  description: string;
  icon: React.ElementType;
}

interface HeadlineAnalysisProps {
  overallAssessment: 'reliable' | 'sensational' | 'misleading';
  metrics: HeadlineMetric[];
}

const METRIC_CONFIG = {
  low: {
    label: 'Low',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
  },
  medium: {
    label: 'Medium',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
  },
  high: {
    label: 'High',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
  },
};

const ASSESSMENT_CONFIG = {
  reliable: {
    label: 'Reliable',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/40',
    icon: CheckCircle2,
  },
  sensational: {
    label: 'Sensational',
    color: 'text-amber-400',
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/40',
    icon: AlertCircle,
  },
  misleading: {
    label: 'Misleading',
    color: 'text-rose-400',
    bg: 'bg-rose-500/20',
    border: 'border-rose-500/40',
    icon: AlertCircle,
  },
};

export const HeadlineAnalysis: React.FC<HeadlineAnalysisProps> = ({ overallAssessment, metrics }) => {
  const assessment = ASSESSMENT_CONFIG[overallAssessment];
  const AssessmentIcon = assessment.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel rounded-2xl p-4 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
            <Type className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Headline Analysis</h3>
        </div>

        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border ${assessment.bg} ${assessment.border} ${assessment.color} text-[10px] font-bold`}>
          <AssessmentIcon className="w-3 h-3" />
          {assessment.label}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {metrics.map((metric, index) => {
          const config = METRIC_CONFIG[metric.value];
          const Icon = metric.icon;

          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${config.bg} ${config.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-slate-300">{metric.label}</span>
              </div>
              <div className={`px-2 py-0.5 rounded-full border ${config.bg} ${config.border} ${config.color} text-[10px] font-bold`}>
                {config.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
