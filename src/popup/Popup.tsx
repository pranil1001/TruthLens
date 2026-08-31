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
import { SuspiciousPhrases } from '../components/SuspiciousPhrases/SuspiciousPhrases';
import { ExplainableAI } from '../components/ExplainableAI/ExplainableAI';
import { RelatedArticles } from '../components/RelatedArticles/RelatedArticles';
import { ActionBar } from '../components/ActionBar/ActionBar';
import { Settings } from '../components/Settings/Settings';

export default function Popup() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleShare = () => console.log('Sharing article...');
  const handleReport = () => console.log('Reporting article...');
  const handleSave = () => console.log('Saving article...');
  const handleRefresh = () => console.log('Refreshing analysis...');

  return (
    <div className={`w-[420px] min-h-[700px] max-h-[700px] overflow-y-auto flex flex-col ${isDarkMode ? 'bg-[#0A0F1D] text-[#E2E8F0]' : 'bg-slate-50 text-slate-900'} relative`}>
      {showSettings ? (
        <Settings
          onBack={() => setShowSettings(false)}
          theme={isDarkMode ? 'dark' : 'light'}
          setTheme={(t) => setIsDarkMode(t === 'light')}
          notificationsEnabled={notificationsEnabled}
          setNotificationsEnabled={setNotificationsEnabled}
        />
      ) : (
        <>
          <Header
            isDarkMode={isDarkMode}
            toggleTheme={() => setIsDarkMode(!isDarkMode)}
            onOpenSettings={() => setShowSettings(true)}
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
        <ExplainableAI
          reasons={[
            { id: 'ea1', type: 'positive', title: 'Consensus', description: 'Analysis shows high agreement with established factual databases.' },
            { id: 'ea2', type: 'positive', title: 'Source Pedigree', description: 'Author has a documented history of accurate reporting in this field.' },
            { id: 'ea3', type: 'negative', title: 'Tone Shift', description: 'Detected a subtle shift towards biased language in the concluding paragraphs.' },
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

        <SuspiciousPhrases
          phrases={[
            {
              id: '1',
              phrase: "shocking truth they don't want you to know",
              context: "The article reveals the shocking truth they don't want you to know about the new policy.",
              reason: "Classic clickbait pattern used to create artificial urgency.",
              severity: 'high',
              category: 'clickbait',
            },
            {
              id: '2',
              phrase: "The government is hiding",
              context: "Many believe that The government is hiding the real statistics.",
              reason: "Emotional appeal based on distrust and conspiracy.",
              severity: 'medium',
              category: 'emotional',
            },
            {
              id: '3',
              phrase: "proven to cure",
              context: "This new supplement is proven to cure all ailments instantly.",
              reason: "Unsupported medical claim with absolute language.",
              severity: 'high',
              category: 'unsupported',
            },
          ]}
        />
        <RelatedArticles
          articles={[
            { id: 'ra1', title: 'Global Economic Outlook 2026: A Detailed Review', source: 'Economist', score: 88, url: '#' },
            { id: 'ra2', title: 'New Policy Changes in Finance: What You Need to Know', source: 'Financial Times', score: 92, url: '#' },
            { id: 'ra3', title: 'The Hidden Truth About Finance Policies', source: 'Blogspot', score: 34, url: '#' },
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
      <ActionBar
        onShare={handleShare}
        onReport={handleReport}
        onSave={handleSave}
        onRefresh={handleRefresh}
      />
        </>
      )}
    </div>
  );
}
