import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertCircle, Loader2 } from 'lucide-react';

interface AISummaryProps {
  summary: string | null;
  isLoading?: boolean;
  error?: string | null;
}

export const AISummary: React.FC<AISummaryProps> = ({ summary, isLoading = false, error = null }) => {
  // Loading State
  if (isLoading) {
    return (
      <div className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-center py-8 space-y-3">
        <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
        <p className="text-xs text-slate-400 animate-pulse font-medium">Analyzing content...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="glass-panel rounded-2xl p-4 border border-rose-500/30 bg-rose-500/5 flex flex-col items-center justify-center py-6 space-y-2">
        <AlertCircle className="w-5 h-5 text-rose-400" />
        <p className="text-xs text-rose-300 text-center font-medium">Unable to generate summary</p>
        <p className="text-[10px] text-rose-400/60 text-center">{error}</p>
      </div>
    );
  }

  // Empty State
  if (!summary) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel rounded-2xl p-4 border border-white/10 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-3">
        <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">AI Summary</h3>
      </div>

      <p className="text-sm text-slate-300 leading-relaxed font-sans">
        {summary}
      </p>
    </motion.div>
  );
};
