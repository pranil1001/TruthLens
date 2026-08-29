import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface ScoreGaugeProps {
  score: number;
  confidence?: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, confidence = 98 }) => {
  const [displayScore, setDisplayScore] = useState(0);

  // Spring animation for the gauge needle/arc
  const springScore = useSpring(0, {
    stiffness: 60,
    damping: 20,
  });

  useEffect(() => {
    springScore.set(score);
  }, [score, springScore]);

  // Animate the numeric count-up
  useEffect(() => {
    let start = 0;
    const end = score;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayScore(end);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [score]);

  // Map score to colors based on requirements
  const getScoreColor = (s: number) => {
    if (s <= 20) return '#ef4444'; // deep red
    if (s <= 40) return '#f97316'; // red/orange
    if (s <= 60) return '#fbbf24'; // orange
    if (s <= 75) return '#facc15'; // yellow
    if (s <= 90) return '#a3e635'; // yellow/green
    return '#10b981'; // emerald
  };

  const color = getScoreColor(score);

  // SVG Gauge constants
  // Half circle: Radius 80, Center (100, 100), Start (100, 100)
  // Angle: 0 is 3 o'clock. We want 180 deg arc from 9 o'clock to 3 o'clock.
  // Range: -180 deg to 0 deg.
  const radius = 80;
  const centerX = 100;
  const centerY = 100;
  const strokeWidth = 12;
  const circumference = Math.PI * radius;

  // Map score (0-100) to arc length
  const arcLength = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 glass-panel rounded-3xl border border-white/10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-500" />

      <div className="relative w-[200px] h-[120px] flex items-center justify-center">
        <svg
          viewBox="0 0 200 120"
          className="w-full h-full"
          style={{ transform: 'rotate(0deg)' }}
        >
          {/* Background Track */}
          <path
            d={`M ${centerX - radius},${centerY} A ${radius},${radius} 0 0,1 ${centerX + radius},${centerY}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="text-slate-800 dark:text-slate-700"
          />

          {/* Animated Score Arc */}
          <motion.path
            d={`M ${centerX - radius},${centerY} A ${radius},${radius} 0 0,1 ${centerX + radius},${centerY}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: score / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${color}66)`,
            }}
          />
        </svg>

        {/* Centered Score Display */}
        <div className="absolute bottom-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-baseline gap-1"
          >
            <span className="text-5xl font-black font-mono tracking-tighter leading-none" style={{ color }}>
              {displayScore}
            </span>
            <span className="text-lg font-bold text-slate-500 font-mono leading-none">/100</span>
          </motion.div>

          <div className="mt-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
              Confidence {confidence}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
