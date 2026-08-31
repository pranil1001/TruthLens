import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShieldCheck, ShieldAlert, AlertCircle } from 'lucide-react';

interface RelatedArticle {
  id: string;
  title: string;
  source: string;
  score: number;
  url: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  if (score >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
};

const getScoreIcon = (score: number) => {
  if (score >= 80) return ShieldCheck;
  if (score >= 50) return AlertCircle;
  return ShieldAlert;
};

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles }) => {
  if (articles.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel rounded-2xl p-4 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-blue-500/20 text-blue-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 10V11a2 2 0 012-2h1m-1 4h-1m-3 0h-1m-3 0h-1m3 0v-1" />
            </svg>
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Related Perspectives</h3>
        </div>
        <span className="text-[10px] text-slate-500 font-medium">{articles.length} articles found</span>
      </div>

      <div className="space-y-3">
        {articles.map((article, index) => {
          const colorClass = getScoreColor(article.score);
          const Icon = getScoreIcon(article.score);

          return (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-slate-400 truncate">{article.source}</span>
                    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[9px] font-bold ${colorClass}`}>
                      <Icon className="w-2 h-2" />
                      {article.score}%
                    </div>
                  </div>
                  <h4 className="text-xs font-medium text-slate-200 line-clamp-2 group-hover:text-white transition-colors">
                    {article.title}
                  </h4>
                </div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/20 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
