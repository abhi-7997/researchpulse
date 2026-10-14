import React from 'react';
import { Layers, Loader2, Sparkles, CheckCircle2, ShieldCheck, Database, FileText } from 'lucide-react';
import { ResearchCategory, ResearchDepth } from '../types/research';

interface ResearchProgressProps {
  topic: string;
  category: ResearchCategory;
  depth: ResearchDepth;
  currentStep: string;
  progressPercentage: number;
  onCancel: () => void;
}

const PIPELINE_STAGES = [
  { id: 1, label: 'Query Taxonomy & Decomposition', icon: Layers, min: 0 },
  { id: 2, label: 'Literature & Repository Scan', icon: Database, min: 25 },
  { id: 3, label: 'Cross-Source Synthesis & Divergence', icon: Sparkles, min: 55 },
  { id: 4, label: 'Structuring Executive Brief & Citations', icon: FileText, min: 85 },
];

export const ResearchProgress: React.FC<ResearchProgressProps> = ({
  topic,
  category,
  depth,
  currentStep,
  progressPercentage,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        {/* Header with animated pulse */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Synthesizing Research Brief
            </h3>
            <p className="text-xs text-slate-500">
              {depth} · {category}
            </p>
          </div>
        </div>

        {/* Topic preview */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 italic">
          "{topic}"
        </div>

        {/* Dynamic progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700 truncate max-w-[280px]">
              {currentStep || 'Initializing agent pipeline...'}
            </span>
            <span className="font-mono text-indigo-600 font-bold tabular-nums">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.max(5, Math.min(100, progressPercentage))}%` }}
            />
          </div>
        </div>

        {/* Pipeline Stages Checklist */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          {PIPELINE_STAGES.map((stage) => {
            const isDone = progressPercentage > stage.min + 20;
            const isCurrent = progressPercentage >= stage.min && progressPercentage <= stage.min + 25;
            const StageIcon = stage.icon;

            return (
              <div
                key={stage.id}
                className={`flex items-center justify-between text-xs py-1.5 px-2 rounded-lg transition-colors ${
                  isCurrent ? 'bg-indigo-50/70 text-indigo-900 font-medium' : 'text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <StageIcon className={`w-3.5 h-3.5 ${isDone ? 'text-emerald-500' : isCurrent ? 'text-indigo-600' : 'text-slate-300'}`} />
                  <span>{stage.label}</span>
                </div>
                <div>
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : isCurrent ? (
                    <div className="w-3 h-3 border-2 border-indigo-400 border-t-indigo-600 rounded-full animate-spin" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cancel Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Cancel Synthesis
          </button>
        </div>
      </div>
    </div>
  );
};
