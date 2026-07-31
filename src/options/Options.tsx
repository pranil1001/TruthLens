import { Shield, Database, Sliders, History } from 'lucide-react';

export default function Options() {
  return (
    <div className="min-h-screen bg-[#0A0F1D] text-[#E2E8F0] p-8 max-w-4xl mx-auto space-y-8">
      <header className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-mono">TruthLens Extension Settings</h1>
            <p className="text-sm text-slate-400">Configure automatic scanning, AI model preference, and history caching</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-semibold">
            <Sliders className="w-4 h-4" />
            <span>Automatic Scanning</span>
          </div>
          <p className="text-xs text-slate-400">Scan news articles automatically when visiting supported domains.</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-semibold">
            <Database className="w-4 h-4" />
            <span>Offline Caching</span>
          </div>
          <p className="text-xs text-slate-400">Cache analyzed articles locally using SHA-256 URL hashing.</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-semibold">
            <History className="w-4 h-4" />
            <span>History Storage</span>
          </div>
          <p className="text-xs text-slate-400">Store previous analysis reports locally in Chrome storage.</p>
        </div>
      </div>
    </div>
  );
}
