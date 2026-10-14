import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Layers, 
  FileText,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { ResearchUpdate } from '../types/monitoring';

interface UpdateDetailsViewProps {
  update: ResearchUpdate;
  onBack: () => void;
  onToggleBookmark: (updateId: string) => void;
  onNavigateToDuplicates?: (duplicateGroupId: string) => void;
}

export const UpdateDetailsView: React.FC<UpdateDetailsViewProps> = ({
  update,
  onBack,
  onToggleBookmark,
  onNavigateToDuplicates,
}) => {
  const [copied, setCopied] = useState(false);

  const formattedDate = new Date(update.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleCopySummary = () => {
    const text = `RESEARCH UPDATE: ${update.title}
Topic: ${update.topicName}
Significance: ${update.significance} | Confidence: ${update.confidenceScore}%

WHAT CHANGED:
${update.deltaSummary}

WHY IT MATTERS:
${update.whyItMatters}

PREVIOUS VS CURRENT FINDINGS:
- Previous: ${update.previousFindings}
- Current: ${update.currentFindings}

SOURCES:
${update.sources.map((s) => `- ${s.title} (${s.publisher})`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-10 px-4 sm:px-6 space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </button>

        <div className="flex items-center gap-2">
          {update.duplicateGroupId && onNavigateToDuplicates && (
            <button
              onClick={() => onNavigateToDuplicates(update.duplicateGroupId!)}
              className="px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>View Duplicate Cluster</span>
            </button>
          )}

          <button
            onClick={() => onToggleBookmark(update.id)}
            className={`p-2 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 ${
              update.isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${update.isBookmarked ? 'fill-amber-400 text-amber-500' : ''}`} />
            <span className="hidden sm:inline">{update.isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Copied' : 'Copy Brief'}</span>
          </button>
        </div>
      </div>

      {/* Main Document Container */}
      <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
        {/* Document Header */}
        <header className="border-b border-slate-200 pb-6 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
            <span
              className={`font-bold px-2.5 py-0.5 rounded-full ${
                update.significance === 'Critical'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : update.significance === 'High'
                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                  : 'bg-blue-50 text-blue-800 border border-blue-200'
              }`}
            >
              {update.significance} Significance
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-indigo-600">{update.topicName}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">Published {formattedDate}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {update.title}
          </h1>
        </header>

        {/* 1. What Changed (Delta Summary) */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>01. What Changed (Delta Summary)</span>
          </h2>
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
            <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-normal">
              {update.deltaSummary}
            </p>
          </div>
        </section>

        {/* 2. Why It Matters (Impact Analysis) */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
            <span>02. Why It Matters (Strategic Impact)</span>
          </h2>
          <div className="p-5 rounded-xl bg-indigo-50/50 border border-indigo-100">
            <p className="text-sm sm:text-base text-indigo-950 leading-relaxed font-normal">
              {update.whyItMatters}
            </p>
          </div>
        </section>

        {/* 3. Previous versus Current Findings (Side-by-Side Delta) */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-indigo-600" />
            <span>03. Previous vs Current Reported Findings</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Previous Literature Baseline
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {update.previousFindings}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/30 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                Current New Evidence
              </span>
              <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                {update.currentFindings}
              </p>
            </div>
          </div>
        </section>

        {/* 4. Supporting & Contradicting Evidence */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>04. Evidence Divergence: Corroboration vs Contradiction</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Supporting */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Supporting Evidence Points</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {update.supportingEvidence.map((ev, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contradicting */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Contradicting / Discrepant Signals</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {update.contradictingEvidence.map((ev, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-600 font-bold shrink-0">!</span>
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Source Reliability & Attribution */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>05. Primary Source Verification & Reliability Tiers</span>
          </h2>

          <div className="space-y-3">
            {update.sources.map((src) => (
              <div
                key={src.id}
                className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-900">{src.publisher}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-indigo-600 font-semibold">{src.reliability}</span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                    {src.title}
                  </h4>
                  {src.doi && (
                    <div className="text-[11px] font-mono text-slate-400">
                      DOI: {src.doi}
                    </div>
                  )}
                </div>

                <a
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/40 transition-colors shrink-0"
                >
                  <span>Open Publication</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Confidence Limitations & Epistemic Caveats */}
        <section className="space-y-3 pt-2">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-slate-500" />
                <span>06. Confidence Assessment & Epistemic Limitations</span>
              </span>
              <span className="text-xs font-mono font-bold text-indigo-600">
                Score: {update.confidenceScore}%
              </span>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600">
              {update.confidenceLimitations.map((limitation, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-slate-400 font-bold shrink-0">·</span>
                  <span>{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Document Footer */}
        <footer className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Surveillance Event ID: {update.id}</span>
          <span>Verified under ISO & Peer Citation Standards</span>
        </footer>
      </article>
    </div>
  );
};
