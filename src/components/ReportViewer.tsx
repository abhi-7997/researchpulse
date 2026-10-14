import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Copy, 
  Check, 
  Printer, 
  Star, 
  Share2, 
  ExternalLink, 
  AlertTriangle, 
  FileText, 
  Compass, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  Bookmark, 
  SlidersHorizontal,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { ResearchReport } from '../types/research';

interface ReportViewerProps {
  report: ResearchReport;
  onBack: () => void;
  onToggleFavorite: (reportId: string) => void;
  isFavorite?: boolean;
  onOpenWebhookModal: () => void;
}

type TabKey = 'all' | 'summary' | 'findings' | 'comparison' | 'conclusion' | 'references';

export const ReportViewer: React.FC<ReportViewerProps> = ({
  report,
  onBack,
  onToggleFavorite,
  isFavorite = false,
  onOpenWebhookModal,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [copied, setCopied] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);

  const formattedDate = new Date(report.generatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleCopyMarkdown = () => {
    const md = generateMarkdown(report);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdown(report);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 40)}_RESEARCHPULSE.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: report.title,
        text: report.subtitle,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSharedToast(true);
      setTimeout(() => setSharedToast(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-6">
      {/* Top back & actions bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>New Query / Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(report.id)}
            title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            className={`p-2 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 ${
              isFavorite
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
            <span className="hidden sm:inline">{isFavorite ? 'Favorited' : 'Favorite'}</span>
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors flex items-center gap-1.5 shadow-2xs"
            title="Copy as Markdown"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span className="hidden sm:inline">{copied ? 'Copied MD' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors flex items-center gap-1.5 shadow-2xs"
            title="Download Markdown Report"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Export .md</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors flex items-center gap-1.5 shadow-2xs"
            title="Print or Save PDF"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors"
            title="Share report"
          >
            <Share2 className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {sharedToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between no-print animate-in fade-in">
          <span>Report link copied to clipboard.</span>
          <button onClick={() => setSharedToast(false)} className="text-emerald-700 font-bold ml-2">Dismiss</button>
        </div>
      )}

      {/* Clear Demonstration Mode Banner */}
      {report.isMockData && (
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs leading-relaxed no-print">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold text-amber-950">Demonstration Notice:</span>{' '}
            This report was synthesized using sample analytical data and structured domain heuristics for interface evaluation. 
            It is not real-time live web research. You can connect to your own n8n AI workflow or backend agent anytime in{' '}
            <button
              onClick={onOpenWebhookModal}
              className="font-bold underline text-indigo-700 hover:text-indigo-900"
            >
              Webhook Settings
            </button>.
          </div>
        </div>
      )}

      {/* Main Report Document Container */}
      <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8 print-card">
        {/* Document Header */}
        <header className="border-b border-slate-200 pb-6 space-y-3">
          {/* Metadata string - zero pill discipline */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="text-indigo-600 font-semibold">{report.query.category}</span>
            <span aria-hidden="true">·</span>
            <span>{report.query.depth}</span>
            <span aria-hidden="true">·</span>
            <span>{report.query.period} Horizon</span>
            <span aria-hidden="true">·</span>
            <span>Synthesized {formattedDate}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums font-mono">{report.readingTimeMinutes} min read</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight" style={{ textWrap: 'balance' }}>
            {report.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {report.subtitle}
          </p>
        </header>

        {/* Section Navigation Tabs (no-print) */}
        <nav className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-print">
          {(
            [
              { key: 'all', label: 'All Sections' },
              { key: 'summary', label: 'Executive Summary' },
              { key: 'findings', label: 'Key Findings' },
              { key: 'comparison', label: 'Source Comparison' },
              { key: 'conclusion', label: 'Conclusion' },
              { key: 'references', label: 'References' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeTab === tab.key
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* SECTION 1: EXECUTIVE SUMMARY */}
        {(activeTab === 'all' || activeTab === 'summary') && (
          <section className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>01. Executive Summary</span>
              </h2>
            </div>

            <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-3">
              <p className="text-sm text-slate-800 leading-relaxed font-normal">
                {report.executiveSummary.overview}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                <span className="font-semibold text-slate-800">Macro Context: </span>
                {report.executiveSummary.macroContext}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Strategic Implications & Core Takeaways
              </h3>
              <ul className="space-y-2">
                {report.executiveSummary.strategicTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* SECTION 2: KEY FINDINGS */}
        {(activeTab === 'all' || activeTab === 'findings') && (
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                <span>02. Key Findings & Empirical Data</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono tabular-nums">
                {report.keyFindings.length} observations documented
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.keyFindings.map((finding) => (
                <div
                  key={finding.id}
                  className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-slate-500">Impact: {finding.impact}</span>
                      <span className="text-slate-500 font-mono tabular-nums">Confidence: {finding.confidence}%</span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 leading-snug">
                      {finding.title}
                    </h3>

                    {finding.metric && (
                      <div className="py-2 px-3 rounded-lg bg-indigo-50/60 border border-indigo-100 flex items-baseline gap-2">
                        <span className="text-2xl font-black text-indigo-700 font-mono tracking-tight tabular-nums">
                          {finding.metric}
                        </span>
                        {finding.metricLabel && (
                          <span className="text-xs font-medium text-slate-600">
                            {finding.metricLabel}
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {finding.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3: SOURCE COMPARISON MATRIX */}
        {(activeTab === 'all' || activeTab === 'comparison') && (
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  <span>03. Source Comparison & Methodology</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Comparative cross-examination of peer publications, models, and industry consensus.
                </p>
              </div>
            </div>

            {report.sourceComparison.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 border border-dashed rounded-xl">
                No comparative sources indexed for this query.
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-700 font-semibold">
                      <th className="py-3 px-4 whitespace-nowrap">Source & Origin</th>
                      <th className="py-3 px-4 whitespace-nowrap">Core Thesis</th>
                      <th className="py-3 px-4 whitespace-nowrap">Methodology & Rigor</th>
                      <th className="py-3 px-4 whitespace-nowrap">Consensus Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {report.sourceComparison.map((source) => (
                      <tr key={source.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 align-top min-w-[200px]">
                          <div className="font-semibold text-slate-900">{source.sourceName}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{source.institutionOrDomain}</div>
                          <div className="text-[10px] text-indigo-600 mt-1">{source.publicationType}</div>
                        </td>
                        <td className="py-3.5 px-4 align-top min-w-[240px] leading-relaxed">
                          {source.coreThesis}
                        </td>
                        <td className="py-3.5 px-4 align-top min-w-[200px] leading-relaxed text-slate-600">
                          <div>{source.methodology}</div>
                          <div className="text-[11px] font-mono text-slate-500 mt-1">Scope: {source.sampleSizeOrScope}</div>
                        </td>
                        <td className="py-3.5 px-4 align-top whitespace-nowrap">
                          <span className={`inline-block font-semibold text-[11px] ${
                            source.consensusAlignment === 'Consensus'
                              ? 'text-emerald-700'
                              : source.consensusAlignment === 'Pioneering'
                              ? 'text-indigo-700'
                              : 'text-amber-700'
                          }`}>
                            {source.consensusAlignment}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* SECTION 4: CONCLUSION & RECOMMENDATIONS */}
        {(activeTab === 'all' || activeTab === 'conclusion') && (
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              <span>04. Synthesis & Actionable Next Steps</span>
            </h2>

            <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200/80">
              <p className="text-sm text-slate-800 leading-relaxed font-normal">
                {report.conclusion.synthesis}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Risks & Uncertainties */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span>Key Risks & Uncertainties</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {report.conclusion.risksAndUncertainties.map((risk, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-amber-500 font-bold shrink-0">·</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actionable Recommendations */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Actionable Recommendations</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {report.conclusion.actionableRecommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-600 font-bold shrink-0">{idx + 1}.</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 5: REFERENCES & CITATIONS */}
        {(activeTab === 'all' || activeTab === 'references') && (
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                <span>05. References & Academic Citations</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono tabular-nums">
                {report.references.length} indexed publications
              </span>
            </div>

            <div className="space-y-3">
              {report.references.map((ref, idx) => (
                <div
                  key={ref.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-colors flex items-start justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-500">
                      <span className="font-mono font-bold text-slate-700">[{idx + 1}]</span>
                      <span>{ref.authors}</span>
                      <span aria-hidden="true">·</span>
                      <span>{ref.publication} ({ref.year})</span>
                    </div>

                    <div className="font-semibold text-slate-900 text-sm">
                      {ref.title}
                    </div>

                    {ref.doiOrCitation && (
                      <div className="text-[11px] font-mono text-slate-400">
                        {ref.doiOrCitation}
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 pt-1">
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/40 font-medium transition-colors text-xs"
                    >
                      <span>{ref.domain || 'View Source'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer Document Signature */}
        <footer className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Synthesized with <span className="font-semibold text-slate-700">RESEARCHPULSE</span> — Universal Research Platform
          </div>
          <div className="font-mono text-[11px]">
            Report ID: {report.id}
          </div>
        </footer>
      </article>
    </div>
  );
};

function generateMarkdown(report: ResearchReport): string {
  return `# ${report.title}
_${report.subtitle}_

**Category:** ${report.query.category}  
**Depth:** ${report.query.depth}  
**Period:** ${report.query.period}  
**Generated:** ${report.generatedAt}  
**Reading Time:** ~${report.readingTimeMinutes} min  
${report.isMockData ? '> **Notice:** Synthesized demonstration data for interface testing.\n' : ''}

---

## 1. Executive Summary
${report.executiveSummary.overview}

**Macro Context:** ${report.executiveSummary.macroContext}

### Strategic Takeaways
${report.executiveSummary.strategicTakeaways.map(t => `- ${t}`).join('\n')}

---

## 2. Key Findings
${report.keyFindings.map(kf => `
### ${kf.title} ${kf.metric ? `(${kf.metric} - ${kf.metricLabel || ''})` : ''}
- **Impact:** ${kf.impact} | **Confidence:** ${kf.confidence}%
- ${kf.description}
`).join('\n')}

---

## 3. Source Comparison
| Source | Core Thesis | Methodology | Consensus Status |
| --- | --- | --- | --- |
${report.sourceComparison.map(sc => `| ${sc.sourceName} (${sc.institutionOrDomain}) | ${sc.coreThesis} | ${sc.methodology} | ${sc.consensusAlignment} |`).join('\n')}

---

## 4. Conclusion & Recommendations
${report.conclusion.synthesis}

### Risks & Uncertainties
${report.conclusion.risksAndUncertainties.map(r => `- ${r}`).join('\n')}

### Actionable Next Steps
${report.conclusion.actionableRecommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}

---

## 5. References
${report.references.map((ref, i) => `[${i + 1}] ${ref.authors} (${ref.year}). *${ref.title}*. ${ref.publication}. Available at: ${ref.url}`).join('\n')}
`;
}
