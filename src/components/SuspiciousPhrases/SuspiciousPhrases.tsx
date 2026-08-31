import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MessageCircle, Zap, ShieldAlert, Info } from 'lucide-react';

type Severity = 'low' | 'medium' | 'high';
type Category = 'emotional' | 'clickbait' | 'exaggeration' | 'manipulative' | 'unsupported';

interface SuspiciousPhrase {
  id: string;
  phrase: string;
  context: string;
  reason: string;
  severity: Severity;
  category: Category;
}

interface SuspiciousPhrasesProps {
  phrases: SuspiciousPhrase[];
}

const SEVERITY_CONFIG = {
  low: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  medium: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  high: { color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
};

const CATEGORY_CONFIG = {
  emotional: { label: 'Emotional', icon: MessageCircle },
  clickbait: { label: 'Clickbait', icon: Zap },
  exaggeration: { label: 'Exaggeration', icon: AlertTriangle },
  manipulative: { label: 'Manipulative', icon: ShieldAlert },
  unsupported: { label: 'Unsupported', icon: Info },
};

export const SuspiciousPhrases: React.FC<SuspiciousPhrasesProps> = ({ phrases }) => {
  if (phrases.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel rounded-2xl p-4 border border-white/10"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
          <AlertTriangle className="w-3.5 h-3.5" />
        </div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Suspicious Phrases</h3>
      </div>

      <div className="space-y-3">
        {phrases.map((item, index) => {
          const sev = SEVERITY_CONFIG[item.severity];
          const cat = CATEGORY_CONFIG[item.category];
          const CatIcon = cat.icon;

          // Highlight the phrase in the context
          const parts = item.context.split(item.phrase);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded bg-white/10 ${sev.color}`}>
                    <CatIcon className="w-3 h-3" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400">{cat.label}</span>
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${sev.bg} ${sev.border} ${sev.color}`}>
                  {item.severity.toUpperCase()}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-2 italic">
                {parts.map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < parts.length - 1 && (
                      <span className={`font-bold underline decoration-2 ${sev.color} bg-white/10 px-0.5 rounded`}>
                        {item.phrase}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <Info className="w-3 h-3" />
                <span>{item.reason}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
