import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Trash2, 
  Star, 
  ArrowUpRight, 
  Clock, 
  FileText, 
  Download, 
  Plus, 
  Filter, 
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ResearchReport, ResearchCategory, ResearchDepth } from '../types/research';

interface HistoryDashboardProps {
  reports: ResearchReport[];
  onSelectReport: (report: ResearchReport) => void;
  onDeleteReport: (reportId: string) => void;
  onToggleFavorite: (reportId: string) => void;
  onNewResearch: () => void;
}

export const HistoryDashboard: React.FC<HistoryDashboardProps> = ({
  reports,
  onSelectReport,
  onDeleteReport,
  onToggleFavorite,
  onNewResearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDepth, setSelectedDepth] = useState<string>('All');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const categories = ['All', 'General Research', 'Technology & AI', 'Education & Careers', 'Science & Environment', 'Business'];
  const depths = ['All', 'Quick Summary', 'Detailed Report', 'Deep Research'];

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      if (onlyFavorites && !r.query.isFavorite) return false;
      if (selectedCategory !== 'All' && r.query.category !== selectedCategory) return false;
      if (selectedDepth !== 'All' && r.query.depth !== selectedDepth) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTopic = r.title.toLowerCase().includes(q);
        const matchSummary = r.executiveSummary.overview.toLowerCase().includes(q);
        const matchCategory = r.query.category.toLowerCase().includes(q);
        return matchTopic || matchSummary || matchCategory;
      }
      return true;
    });
  }, [reports, searchQuery, selectedCategory, selectedDepth, onlyFavorites]);

  const handleExportHistory = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reports, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `researchpulse_history_${Date.now()}.json`);
    dlAnchorElem.click();
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 sm:py-10 px-4 sm:px-6 space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Research History & Synthesis Archive
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Access past research briefs, empirical metrics, source matrix logs, and exported documents.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {reports.length > 0 && (
            <button
              onClick={handleExportHistory}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export History (.json)</span>
            </button>
          )}

          <button
            onClick={onNewResearch}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Research</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic keywords, executive summary, or category..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            />
          </div>

          {/* Quick filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
                onlyFavorites
                  ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`} />
              <span>Favorites Only</span>
            </button>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Categories' : c}
                </option>
              ))}
            </select>

            {/* Depth Dropdown */}
            <select
              value={selectedDepth}
              onChange={(e) => setSelectedDepth(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              {depths.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'All Depths' : d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-800">No reports found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {reports.length === 0
              ? 'You have not synthesized any research reports yet. Launch your first research query above!'
              : 'No research reports match your current search and filter settings.'}
          </p>
          <button
            onClick={reports.length === 0 ? onNewResearch : () => { setSearchQuery(''); setSelectedCategory('All'); setSelectedDepth('All'); setOnlyFavorites(false); }}
            className="mt-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
          >
            {reports.length === 0 ? 'Start First Research' : 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5">
          {filteredReports.map((report) => {
            const dateStr = new Date(report.generatedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <div
                key={report.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 p-4 sm:p-5 transition-all shadow-2xs hover:shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="flex-1 space-y-2 cursor-pointer w-full" onClick={() => onSelectReport(report)}>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <span className="text-indigo-600 font-semibold">{report.query.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{report.query.depth}</span>
                    <span aria-hidden="true">·</span>
                    <span>{report.query.period}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{dateStr}</span>
                    {report.isMockData && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-amber-700 font-mono text-[10px]">Demo Dataset</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {report.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {report.executiveSummary.overview}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono pt-1">
                    <span>{report.keyFindings.length} key findings</span>
                    <span>·</span>
                    <span>{report.sourceComparison.length} source matrices</span>
                    <span>·</span>
                    <span>{report.references.length} citations</span>
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(report.id);
                    }}
                    title={report.query.isFavorite ? 'Unfavorite' : 'Favorite'}
                    className={`p-2 rounded-lg border transition-colors ${
                      report.query.isFavorite
                        ? 'bg-amber-50 border-amber-200 text-amber-700'
                        : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${report.query.isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete report "${report.title.slice(0, 30)}..."?`)) {
                        onDeleteReport(report.id);
                      }
                    }}
                    title="Delete report"
                    className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectReport(report)}
                    className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>View Report</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
