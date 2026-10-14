import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  BarChart3, 
  ShieldAlert, 
  Sparkles,
  Info
} from 'lucide-react';
import { TrendAnalysisItem } from '../types/monitoring';

interface TrendAnalysisViewProps {
  trends: TrendAnalysisItem[];
}

export const TrendAnalysisView: React.FC<TrendAnalysisViewProps> = ({ trends }) => {
  const [filter, setFilter] = useState<'All' | 'Sufficient' | 'Insufficient'>('All');

  const filteredTrends = trends.filter((t) => {
    if (filter === 'Sufficient') return !t.isInsufficient;
    if (filter === 'Insufficient') return t.isInsufficient;
    return true;
  });

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Trend Analysis & Evidence Sufficiency Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Monitors recurring themes and empirical convergence across literature over time. 
          Explicitly flags speculative or data-sparse claims when evidence is statistically insufficient.
        </p>
      </div>

      {/* Epistemic Rigor Rationale Banner */}
      <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3 text-xs leading-relaxed">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="text-indigo-950">
          <span className="font-bold">Anti-Hallucination Evidentiary Guardrail: </span>
          Unlike generic models that fabricate linear trends from isolated mentions, 
          the agentic system checks sample size, replication count, and peer cross-validation. 
          Themes without multi-lab validation are strictly quarantined as <em>"Insufficient Evidence"</em>.
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('All')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filter === 'All'
              ? 'bg-indigo-600 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Tracked Themes ({trends.length})
        </button>
        <button
          onClick={() => setFilter('Sufficient')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filter === 'Sufficient'
              ? 'bg-indigo-600 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Verified Trends ({trends.filter((t) => !t.isInsufficient).length})
        </button>
        <button
          onClick={() => setFilter('Insufficient')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            filter === 'Insufficient'
              ? 'bg-amber-600 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          ⚠️ Insufficient Evidence Warnings ({trends.filter((t) => t.isInsufficient).length})
        </button>
      </div>

      {/* Trend Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTrends.map((trend) => (
          <div
            key={trend.id}
            className={`bg-white rounded-2xl border p-6 space-y-4 shadow-2xs transition-all flex flex-col justify-between ${
              trend.isInsufficient
                ? 'border-amber-300 ring-1 ring-amber-200 bg-amber-50/20'
                : 'border-slate-200'
            }`}
          >
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-semibold px-2.5 py-0.5 rounded text-[11px] ${
                      trend.isInsufficient
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                        : trend.status === 'Accelerating'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold'
                        : 'bg-indigo-50 text-indigo-800 border border-indigo-200 font-bold'
                    }`}
                  >
                    {trend.status}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="font-semibold text-slate-600">{trend.topicName}</span>
                </div>

                <div className="font-mono text-slate-400 text-[11px]">
                  {trend.timeSpan}
                </div>
              </div>

              {/* Theme Name */}
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {trend.themeName}
              </h2>

              {/* Trajectory description */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {trend.trajectoryNotes}
              </p>

              {/* Explicit Insufficient Evidence Warning Box */}
              {trend.isInsufficient ? (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900 uppercase tracking-wider text-[11px]">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Insufficient Evidence Warning</span>
                  </div>
                  <p className="leading-relaxed">
                    {trend.evidenceSufficiencyRationale}
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Evidentiary Sufficiency Rationale</span>
                  </div>
                  <p className="leading-relaxed text-[11px] text-slate-600">
                    {trend.evidenceSufficiencyRationale}
                  </p>
                </div>
              )}

              {/* Mini Data Point Histogram / Activity Strip */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>Literature Volume Progression</span>
                  <span>{trend.recurringMentionsCount} total papers</span>
                </div>

                <div className="flex items-end gap-2 h-14 p-2 bg-slate-50 rounded-lg border border-slate-100">
                  {trend.dataPoints.map((dp, i) => {
                    const maxVal = Math.max(...trend.dataPoints.map((p) => p.count), 1);
                    const heightPct = Math.round((dp.count / maxVal) * 100);
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div
                          className={`w-full rounded-xs transition-all ${
                            trend.isInsufficient
                              ? 'bg-amber-300'
                              : 'bg-indigo-600'
                          }`}
                          style={{ height: `${Math.max(15, heightPct)}%` }}
                          title={`${dp.period}: ${dp.count} indexed publications`}
                        />
                        <span className="text-[9px] font-mono text-slate-400 truncate max-w-full">
                          {dp.period.split(' ')[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Confidence: {trend.confidenceLevel}</span>
              <span>Sample: N={trend.recurringMentionsCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
