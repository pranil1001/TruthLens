import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Flag, Bookmark, RefreshCw } from 'lucide-react';

interface ActionBarProps {
  onShare: () => void;
  onReport: () => void;
  onSave: () => void;
  onRefresh: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({ onShare, onReport, onSave, onRefresh }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/90 to-transparent pt-8"
    >
      <div className="glass-panel rounded-2xl p-2 border border-white/10 flex items-center justify-between gap-2 shadow-2xl backdrop-blur-xl">
        <button
          onClick={onRefresh}
          className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          title="Refresh Analysis"
        >
          <RefreshCw className="w-5 h-5" />
        </button>

        <div className="h-6 w-px bg-white/10" />

        <button
          onClick={onShare}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-200 font-medium text-xs"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>

        <button
          onClick={onSave}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-200 font-medium text-xs"
        >
          <Bookmark className="w-4 h-4" />
          Save
        </button>

        <button
          onClick={onReport}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all duration-200 font-medium text-xs"
        >
          <Flag className="w-4 h-4" />
          Report
        </button>
      </div>
    </motion.div>
  );
};
