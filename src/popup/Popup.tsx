import { useState } from 'react';
import { Sparkles, Zap, MessageCircle, Volume2, Type, AlertCircle } from 'lucide-react';
import { Header } from '../components/Header/Header';
import { ScoreGauge } from '../components/ScoreGauge/ScoreGauge';
import { PredictionBadge } from '../components/PredictionBadge/PredictionBadge';
import { WarningBadges } from '../components/WarningBadges/WarningBadges';
import { AISummary } from '../components/AISummary/AISummary';
import { SourceCard } from '../components/SourceCard/SourceCard';
import { TrustBreakdown } from '../components/TrustBreakdown/TrustBreakdown';
import { KeyFindings } from '../components/KeyFindings/KeyFindings';
import { HeadlineAnalysis } from '../components/HeadlineAnalysis/HeadlineAnalysis';

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
        <div className="flex flex-col items-center gap-4">
          <ScoreGauge score={92} confidence={98} />
          <PredictionBadge type="credible" confidence={98} />
          <WarningBadges activeWarnings={['well-supported', 'ai-generated']} />
        </div>

        <AISummary
          summary="This article provides a comprehensive analysis of recent economic trends, supported by multiple primary sources and verified data. It maintains a neutral tone and avoids sensationalism, focusing on factual reporting and expert insights."
        />
        <SourceCard
          domain="reuters.com"
          trustScore={95}
          category="Global News"
          reputation="high"
        />
        <TrustBreakdown
          items={[
            { label: 'Source Reputation', score: 90 },
            { label: 'Evidence Quality', score: 85 },
            { label: 'Citation Quality', score: 80 },
            { label: 'Headline Reliability', score: 70 },
            { label: 'Language Neutrality', score: 95 },
            { label: 'AI Confidence', score: 98 },
          ]}
        />
        <KeyFindings
          findings={[
            { id: '1', type: 'positive', label: 'Verified Sources', explanation: 'Claims are supported by three independent, high-reputation news agencies.' },
            { id: '2', type: 'neutral', label: 'Neutral Tone', explanation: 'The article avoids emotional adjectives and maintains a factual reporting style.' },
            { id: '3', type: 'negative', label: 'Limited Data', explanation: 'Lacks specific quantitative data for some of the broader economic claims.' },
          ]}
        />
        <HeadlineAnalysis
          overallAssessment="reliable"
          metrics={[
            { label: 'Clickbait', value: 'low', description: 'Low sensationalism', icon: Zap },
            { label: 'Emotional Tone', value: 'low', description: 'Neutral language', icon: MessageCircle },
            { label: 'Sensationalism', value: 'low', description: 'Factual framing', icon: Volume2 },
            { label: 'Capitalization', value: 'low', description: 'Normal usage', icon: Type },
            { label: 'Exaggeration', value: 'medium', description: 'Some overstatements', icon: AlertCircle },
          ]}
        />
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
