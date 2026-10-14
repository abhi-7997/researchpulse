import React from 'react';
import { 
  Activity, 
  ShieldAlert, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Compass, 
  ExternalLink,
  ChevronRight,
  Info,
  RefreshCw,
  Sliders
} from 'lucide-react';
import { 
  MonitoredTopic, 
  ResearchUpdate, 
  TrendAnalysisItem, 
  AlertSettings 
} from '../types/monitoring';
import { ActiveTab } from './Header';

interface DashboardViewProps {
  topics: MonitoredTopic[];
  updates: ResearchUpdate[];
  trends: TrendAnalysisItem[];
  alertSettings: AlertSettings;
  setActiveTab: (tab: ActiveTab) => void;
  onSelectUpdate: (update: ResearchUpdate) => void;
  onTriggerScan: (topic: MonitoredTopic) => void;
  isScanning: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  topics,
  updates,
  trends,
  alertSettings,
  setActiveTab,
  onSelectUpdate,
  onTriggerScan,
  isScanning,
}) => {
  const highSignificanceUpdates = updates.filter(
    (u) => u.significance === 'Critical' || u.significance === 'High'
  );

  const activeTopicsCount = topics.filter((t) => t.active).length;

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner: Explicit Demonstration Notice */}
      <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs leading-relaxed flex items-start gap-3 shadow-2xs">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="font-bold text-amber-950">Demonstration Mode Notice:</span>{' '}
          All monitored topics, detected developments, historical claim shifts, and trend analyses 
          are structured simulation datasets to evaluate the agentic monitoring architecture. 
          Real-time live surveillance activates when connected to your active n8n webhook or background agent in{' '}
          <button
            onClick={() => setActiveTab('alerts')}
            className="font-bold underline text-indigo-700 hover:text-indigo-900 inline-flex items-center gap-0.5 ml-1"
          >
            <span>Alert Settings</span>
          </button>.
        </div>
      </div>

      {/* Main KPI Stat Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-indigo-500" />
            <span>Monitored Topics</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {topics.length}
          </div>
          <div className="text-[11px] text-slate-500">
            {activeTopicsCount} currently under active surveillance
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-500" />
            <span>New Developments</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {updates.length}
          </div>
          <div className="text-[11px] text-slate-500">
            Across {topics.length} domain monitors
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            <span>High Significance</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-mono tabular-nums">
            {highSignificanceUpdates.length}
          </div>
          <div className="text-[11px] text-slate-500">
            Critical paradigm shifts & alerts
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>Tracked Trends</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {trends.length}
          </div>
          <div className="text-[11px] text-slate-500">
            {trends.filter((t) => t.isInsufficient).length} flagged with insufficient data
          </div>
        </div>
      </div>

      {/* Grid: Monitored Topics & High-Significance Changes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Monitored Topics Section (7 cols) */}
        <section className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Active Surveillance Topics
              </h2>
              <p className="text-xs text-slate-500">
                Continuous surveillance across peer-reviewed repositories and preprints.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('add-topic')}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Topic</span>
            </button>
          </div>

          <div className="space-y-3">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-4 transition-all shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-semibold text-indigo-600">{topic.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{topic.frequency} scan cadence</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{topic.relevanceThreshold}% relevance floor</span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mt-1">
                      {topic.name}
                    </h3>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      topic.active
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {topic.active ? 'Active' : 'Paused'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {topic.description}
                </p>

                {/* Concepts list */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-500 font-mono">
                  <span className="text-slate-400 font-sans text-xs">Concepts:</span>
                  {topic.relatedConcepts.slice(0, 3).map((c, i) => (
                    <span key={i} className="bg-slate-50 border border-slate-200/80 px-1.5 py-0.5 rounded">
                      {c}
                    </span>
                  ))}
                  {topic.relatedConcepts.length > 3 && (
                    <span className="text-slate-400">+{topic.relatedConcepts.length - 3}</span>
                  )}
                </div>

                {/* Bottom row actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">
                    {topic.updateCount} updates detected ({topic.highSignificanceCount} high significance)
                  </span>

                  <button
                    type="button"
                    disabled={isScanning}
                    onClick={() => onTriggerScan(topic)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-40 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                    <span>Run Surveillance Scan</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: High-Significance Changes & Critical Alerts (5 cols) */}
        <section className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>High-Significance Changes</span>
              </h2>
              <p className="text-xs text-slate-500">
                Empirical contradictions, record figures, or standardizations.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('feed')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              View Feed ({updates.length})
            </button>
          </div>

          <div className="space-y-3">
            {highSignificanceUpdates.map((update) => (
              <div
                key={update.id}
                onClick={() => onSelectUpdate(update)}
                className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 p-4 transition-all shadow-2xs cursor-pointer space-y-2.5 group"
              >
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`font-semibold text-[11px] px-2 py-0.5 rounded ${
                      update.significance === 'Critical'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {update.significance} Shift
                  </span>
                  <span className="font-mono text-slate-400 text-[11px] tabular-nums">
                    Confidence: {update.confidenceScore}%
                  </span>
                </div>

                <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                  {update.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {update.deltaSummary}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                  <span className="truncate max-w-[200px] text-slate-500">{update.topicName}</span>
                  <span className="inline-flex items-center gap-1 text-indigo-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Shortcuts to Deduplication & Historical Views */}
          <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 space-y-2">
            <h4 className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Deduplication & Cross-Examination Tools</span>
            </h4>
            <p className="text-xs text-indigo-900 leading-relaxed">
              Explore multi-source cluster deduplication and longitudinal claim changes across monitored literature.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => setActiveTab('duplicates')}
                className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 underline"
              >
                Duplicate Reports View
              </button>
              <span className="text-indigo-300">·</span>
              <button
                onClick={() => setActiveTab('historical')}
                className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 underline"
              >
                Historical Claim Timeline
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Emerging Trends Snapshot Section */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Emerging Trends & Consensus Tracker
            </h2>
            <p className="text-xs text-slate-500">
              Recurring themes over time with explicit evidentiary sufficiency warnings.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('trends')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Full Trend Analysis ({trends.length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trends.map((t) => (
            <div
              key={t.id}
              onClick={() => setActiveTab('trends')}
              className={`p-4 rounded-xl border bg-white transition-all shadow-2xs hover:shadow-xs cursor-pointer flex flex-col justify-between space-y-3 ${
                t.isInsufficient
                  ? 'border-amber-200 bg-amber-50/30'
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span
                    className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                      t.isInsufficient
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : t.status === 'Accelerating'
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'bg-indigo-50 text-indigo-800'
                    }`}
                  >
                    {t.status}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">{t.timeSpan}</span>
                </div>

                <h3 className="font-bold text-xs text-slate-900 leading-snug">
                  {t.themeName}
                </h3>

                <p className="text-[11px] text-slate-600 line-clamp-2">
                  {t.isInsufficient
                    ? '⚠️ INSUFFICIENT EVIDENCE: Sample size below statistical reliability threshold.'
                    : t.trajectoryNotes}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{t.recurringMentionsCount} recurring papers</span>
                <span className="text-indigo-600 font-semibold font-sans">Details →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
