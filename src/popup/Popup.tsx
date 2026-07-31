import { useState } from 'react';
import { Shield, Sparkles, Moon, Sun, Settings as SettingsIcon } from 'lucide-react';

export default function Popup() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`w-[420px] min-h-[700px] max-h-[700px] overflow-y-auto flex flex-col ${isDarkMode ? 'bg-[#0A0F1D] text-[#E2E8F0]' : 'bg-slate-50 text-slate-900'} relative`}>
      {/* Floating Status Bar / Glass Header */}
      <header className="sticky top-0 z-50 glass-header px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-mono text-sm font-bold tracking-tight flex items-center gap-1.5">
              TruthLens <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-normal">v1.0</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-sans">AI Credibility Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-slate-200"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button 
            onClick={() => chrome.runtime.openOptionsPage?.()}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-slate-200"
            title="Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 space-y-4">
        {/* Foundation Hero Card Preview */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 relative overflow-hidden text-center space-y-3">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-medium border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phase 1 Initialized</span>
          </div>

          <div className="py-4">
            <div className="text-5xl font-extrabold font-mono text-emerald-400 tracking-tight">
              92<span className="text-xl text-slate-400 font-normal">/100</span>
            </div>
            <div className="text-sm font-semibold text-slate-300 mt-1">Likely Credible Article</div>
            <p className="text-xs text-slate-400 mt-1 max-w-[280px] mx-auto">
              React 19 + TypeScript + Vite + Tailwind CSS extension architecture is fully compiled.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-left pt-2 border-t border-white/5 text-xs text-slate-400 font-mono">
            <div>Manifest: <span className="text-slate-200">V3</span></div>
            <div>Build: <span className="text-emerald-400">Production Ready</span></div>
          </div>
        </div>
      </main>
    </div>
  );
}
