import React, { useState } from 'react';
import { 
  History, 
  TrendingUp, 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Sparkles,
  Info
} from 'lucide-react';
import { HistoricalEvolution } from '../types/monitoring';

interface HistoricalComparisonViewProps {
  historicalEvolutions: HistoricalEvolution[];
}

export const HistoricalComparisonView: React.FC<HistoricalComparisonViewProps> = ({
  historicalEvolutions,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    historicalEvolutions[0]?.id ?? ''
  );

  const activeEvolution = historicalEvolutions.find((h) => h.id === selectedId) || historicalEvolutions[0];

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Historical Claim & Metric Evolution
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Track how reported claims, quantitative estimates, and academic conclusions have shifted 
          over time, revealing where past benchmarks failed and modern consensus solidified.
        </p>
      </div>

      {/* Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {historicalEvolutions.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              item.id === activeEvolution?.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {item.metricOrClaimName}
          </button>
        ))}
      </div>

      {activeEvolution && (
        <div className="space-y-6">
          {/* Overview Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-indigo-600">{activeEvolution.topicName}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">Longitudinal Claim Progression</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {activeEvolution.metricOrClaimName}
            </h2>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900">Historical Shift Summary: </span>
              {activeEvolution.historicalDivergenceSummary}
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-600" />
              <span>Claim & Metric Evolution Milestones</span>
            </h3>

            <div className="relative border-l-2 border-indigo-100 ml-4 pl-6 space-y-8">
              {activeEvolution.timeline.map((node, idx) => {
                const isLatest = idx === activeEvolution.timeline.length - 1;
                return (
                  <div key={idx} className="relative space-y-2">
                    {/* Circle icon on the timeline line */}
                    <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 ${
                      isLatest
                        ? 'border-indigo-600 bg-indigo-600 ring-4 ring-indigo-100'
                        : 'border-slate-300 bg-white'
                    }`} />

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {node.year} · {node.date}
                      </span>
                      <span className={`font-semibold text-[11px] px-2 py-0.5 rounded ${
                        node.shiftType === 'Paradigm Shift'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : node.shiftType === 'Methodological Revision'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {node.shiftType}
                      </span>
                      {node.quantitativeValue && (
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                          Metric: {node.quantitativeValue}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                      {node.reportedClaim}
                    </p>

                    <div className="text-[11px] text-slate-400 font-mono">
                      Source: {node.source}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Conclusion Evolution Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                01. Historical Baseline
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeEvolution.conclusionEvolution.historicalBaseline}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50/30 space-y-2 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                02. Current Empirical Consensus
              </span>
              <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                {activeEvolution.conclusionEvolution.currentConsensus}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/30 space-y-2 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                03. Major Methodological Discrepancy
              </span>
              <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                {activeEvolution.conclusionEvolution.majorDiscrepancy}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
