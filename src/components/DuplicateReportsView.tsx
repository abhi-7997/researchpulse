import React, { useState } from 'react';
import { 
  CopyCheck, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Filter, 
  AlertCircle,
  ArrowRight,
  Info
} from 'lucide-react';
import { DuplicateGroup } from '../types/monitoring';

interface DuplicateReportsViewProps {
  duplicateGroups: DuplicateGroup[];
  highlightGroupId?: string;
}

export const DuplicateReportsView: React.FC<DuplicateReportsViewProps> = ({
  duplicateGroups,
  highlightGroupId,
}) => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>(
    highlightGroupId || (duplicateGroups[0]?.id ?? '')
  );

  const activeGroup = duplicateGroups.find((g) => g.id === selectedGroupId) || duplicateGroups[0];

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Page Title */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Duplicate Reports & Echo Cluster Analysis
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Automated clustering groups multiple syndicated wire reports, derivative summaries, 
          and PR echoes around a single root development to prevent redundant notifications.
        </p>
      </div>

      {/* Rationale explanation card */}
      <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3 text-xs leading-relaxed">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="text-indigo-950">
          <span className="font-bold">Why Deduplication is Critical: </span>
          When a major lab or agency publishes an announcement, hundreds of tech outlets publish rewrites within 24 hours. 
          The agentic monitor isolates the canonical root paper and collapses secondary echoes into a single tracked event.
        </div>
      </div>

      {/* 2-Column Split: Cluster selector on left, cluster inspection on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List of Clusters (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Detected Echo Clusters ({duplicateGroups.length})
          </div>

          {duplicateGroups.map((group) => {
            const isSelected = group.id === activeGroup?.id;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setSelectedGroupId(group.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-indigo-50/40 border-indigo-600 ring-1 ring-indigo-600'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                  <span className="font-semibold text-indigo-600">{group.topicName}</span>
                  <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-700 font-bold">
                    {group.clusterCount} Articles Clustered
                  </span>
                </div>

                <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug">
                  {group.canonicalTitle}
                </h3>

                <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                  Root development: {group.underlyingDevelopment}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Cluster Breakdown (7 cols) */}
        {activeGroup && (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="text-indigo-600 font-semibold">{activeGroup.topicName}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">Detected Root Event</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1 leading-snug">
                {activeGroup.canonicalTitle}
              </h2>
              <div className="p-3.5 mt-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                <span className="font-semibold text-slate-900">Underlying Event: </span>
                {activeGroup.underlyingDevelopment}
              </div>
            </div>

            {/* Articles Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Clustered Publications ({activeGroup.articles.length})</span>
                <span className="text-slate-400 font-normal">Semantic Similarity</span>
              </div>

              <div className="space-y-2.5">
                {activeGroup.articles.map((art) => (
                  <div
                    key={art.id}
                    className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs transition-colors ${
                      art.isCanonical
                        ? 'bg-emerald-50/40 border-emerald-300'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px]">
                        {art.isCanonical ? (
                          <span className="font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded text-[10px]">
                            CANONICAL PRIMARY
                          </span>
                        ) : (
                          <span className="font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                            {art.syndicateType}
                          </span>
                        )}
                        <span className="font-semibold text-slate-700">{art.publisher}</span>
                        <span className="text-slate-400 font-mono text-[10px]">
                          {new Date(art.publishedAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">
                        {art.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <div className="text-right">
                        <div className="font-mono font-bold text-xs text-slate-900 tabular-nums">
                          {art.similarityScore}%
                        </div>
                        <div className="text-[10px] text-slate-400">Match</div>
                      </div>

                      <a
                        href={art.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                        title="Open Source Article"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
