import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sun, Moon, Settings as SettingsIcon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme, onOpenSettings }) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 h-[52px] px-4 flex items-center justify-between shadow-sm border-b border-white/10 backdrop-blur-md bg-white/10 dark:bg-black/20"
    >
      {/* Branding Section */}
      <div className="flex items-center gap-3">
        <div className="relative group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-110 transition-transform duration-200">
            <Shield className="w-4 h-4" />
          </div>
          {/* Live Status Indicator */}
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>

        <div className="flex flex-col">
          <h1 className="font-mono text-sm font-bold tracking-tight flex items-center gap-1.5 leading-none">
            TruthLens
            <span className="text-[9px] px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-normal">v1.0</span>
          </h1>
          <span className="text-[10px] text-slate-500 font-sans leading-none mt-1">AI Credibility Engine</span>
        </div>
      </div>

      {/* Action Section */}
      <div className="flex items-center gap-1">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-slate-200"
          title="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenSettings}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-slate-200"
          title="Settings"
        >
          <SettingsIcon className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.header>
  );
};
