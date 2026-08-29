import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Header } from '../components/Header/Header';
import { ScoreGauge } from '../components/ScoreGauge/ScoreGauge';

export default function Popup() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`w-[420px] min-h-[700px] max-h-[700px] overflow-y-auto flex flex-col ${isDarkMode ? 'bg-[#0A0F1D] text-[#E2E8F0]' : 'bg-slate-50 text-slate-900'} relative`}>
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenSettings={() => chrome.runtime.openOptionsPage?.()}
      />

      {/* Main Container */}
      <main className="flex-1 p-4 space-y-4">
        <ScoreGauge score={92} confidence={98} />
        {/* Foundation Hero Card Preview */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 relative overflow-hidden text-center space-y-3 opacity-50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-medium border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phase 1 Initialized</span>
          </div>

          <div className="py-4">
            <div className="text-sm font-semibold text-slate-300 mt-1">Likely Credible Article</div>
            <p className="text-xs text-slate-400 mt-1 max-w-[280px] mx-auto">
              React 19 + TypeScript + Vite + Tailwind CSS extension architecture is fully compiled.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
