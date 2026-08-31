import React from 'react';
import { motion } from 'framer-motion';

interface BreakdownItem {
  label: string;
  score: number;
}

interface TrustBreakdownProps {
  items: BreakdownItem[];
}

const TrustBreakdown: React.FC<TrustBreakdownProps> = ({ items }) => {
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Trust Breakdown</h3>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.label} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-medium text-slate-400">{item.label}</span>
              <span className="text-xs font-mono text-slate-200">{item.score}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  item.score > 70 ? 'bg-emerald-500' : item.score > 40 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export { TrustBreakdown };
