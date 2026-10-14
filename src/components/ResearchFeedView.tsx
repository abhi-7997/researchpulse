import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  ShieldAlert, 
  Bookmark, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  SlidersHorizontal,
  ChevronRight,
  Info
} from 'lucide-react';
import { ResearchUpdate, UpdateSignificance } from '../types/monitoring';

interface ResearchFeedViewProps {
  updates: ResearchUpdate[];
  onSelectUpdate: (update: ResearchUpdate) => void;
  onToggleBookmark: (updateId: string) => void;
  onSelectTopicFilter?: (topicName: string) => void;
}

export const ResearchFeedView: React.FC<ResearchFeedViewProps> = ({
  updates,
  onSelectUpdate,
  onToggleBookmark,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedSignificance, setSelectedSignificance] = useState('All');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  // Extract unique topic names
  const topicNames = useMemo(() => {
    const set = new Set<string>();
    updates.forEach((u) => set.add(u.topicName));
    return ['All', ...Array.from(set)];
  }, [updates]);

  const filteredUpdates = useMemo(() => {
    return updates.filter((u) => {
      if (onlyBookmarks && !u.isBookmarked) return false;
      if (selectedTopic !== 'All' && u.topicName !== selectedTopic) return false;
      if (selectedSignificance !== 'All' && u.significance !== selectedSignificance) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = u.title.toLowerCase().includes(q);
        const matchDelta = u.deltaSummary.toLowerCase().includes(q);
        const matchWhy = u.whyItMatters.toLowerCase().includes(q);
        const matchTopic = u.topicName.toLowerCase().includes(q);
        return matchTitle || matchDelta || matchWhy || matchTopic;
      }
      return true;
    });
  }, [updates, searchQuery, selectedTopic, selectedSignificance, onlyBookmarks]);

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Research Surveillance Feed
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Real-time detected empirical developments, standardized findings, 
          and cross-literature contradictions extracted from monitored sources.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword, finding delta, or topic..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            />
          </div>

          {/* Filter Dropdowns & Toggles */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setOnlyBookmarks(!onlyBookmarks)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                onlyBookmarks
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarks ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`} />
              <span>Bookmarked</span>
            </button>

            {/* Topic Filter */}
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              {topicNames.map((t) => (
                <option key={t} value={t}>
                  {t === 'All' ? 'All Monitored Topics' : t}
                </option>
              ))}
            </select>

            {/* Significance Filter */}
            <select
              value={selectedSignificance}
              onChange={(e) => setSelectedSignificance(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              <option value="All">All Significance</option>
              <option value="Critical">Critical Paradigm Shift</option>
              <option value="High">High Significance</option>
              <option value="Moderate">Moderate Shift</option>
              <option value="Incremental">Incremental Revision</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feed list */}
      {filteredUpdates.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-2">
          <p className="font-semibold text-sm text-slate-700">No updates match the selected filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTopic('All');
              setSelectedSignificance('All');
              setOnlyBookmarks(false);
            }}
            className="text-xs text-indigo-600 font-semibold underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredUpdates.map((update) => {
            const pubDate = new Date(update.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            const isCritical = update.significance === 'Critical';
            const isHigh = update.significance === 'High';

            return (
              <article
                key={update.id}
                className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all shadow-2xs hover:shadow-xs space-y-4 ${
                  isCritical
                    ? 'border-rose-200 hover:border-rose-300'
                    : isHigh
                    ? 'border-indigo-200 hover:border-indigo-300'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header row: Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold text-[11px] px-2.5 py-0.5 rounded-full ${
                        isCritical
                          ? 'bg-rose-50 text-rose-700 border border-rose-200 font-bold'
                          : isHigh
                          ? 'bg-amber-50 text-amber-800 border border-amber-200 font-bold'
                          : update.significance === 'Moderate'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {update.significance} Significance
                    </span>

                    <span className="text-slate-400">·</span>
                    <span className="font-semibold text-indigo-600">{update.topicName}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500 font-mono tabular-nums">{pubDate}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-mono tabular-nums">
                      <span>Confidence:</span>
                      <span className="font-bold text-slate-800">{update.confidenceScore}%</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleBookmark(update.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        update.isBookmarked
                          ? 'text-amber-500 bg-amber-50'
                          : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                      title={update.isBookmarked ? 'Remove bookmark' : 'Bookmark update'}
                    >
                      <Bookmark className={`w-4 h-4 ${update.isBookmarked ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h2
                    onClick={() => onSelectUpdate(update)}
                    className="text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer leading-snug"
                  >
                    {update.title}
                  </h2>
                </div>

                {/* Dual Delta Callout: What changed vs Why it matters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-600" />
                      <span>What Changed</span>
                    </span>
                    <p className="text-slate-700 leading-relaxed font-normal">
                      {update.deltaSummary}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-1">
                    <span className="font-bold text-indigo-950 uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-indigo-600" />
                      <span>Why It Matters</span>
                    </span>
                    <p className="text-indigo-900 leading-relaxed font-normal">
                      {update.whyItMatters}
                    </p>
                  </div>
                </div>

                {/* Sources & Action footer */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-slate-400">Sources:</span>
                    {update.sources.map((src) => (
                      <a
                        key={src.id}
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded transition-colors"
                      >
                        <span>{src.publisher}</span>
                        <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                      </a>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectUpdate(update)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    <span>Full Update Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
