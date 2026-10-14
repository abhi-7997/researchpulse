import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Compass, 
  Cpu, 
  GraduationCap, 
  Leaf, 
  Briefcase, 
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { ResearchCategory, ResearchDepth, InformationPeriod, WebhookConfig } from '../types/research';

interface ResearchFormProps {
  onStartResearch: (topic: string, category: ResearchCategory, depth: ResearchDepth, period: InformationPeriod) => void;
  isLoading: boolean;
  errorMessage: string | null;
  onClearError: () => void;
  webhookConfig: WebhookConfig;
  onOpenWebhookModal: () => void;
  initialTopic?: string;
  initialCategory?: ResearchCategory;
  initialDepth?: ResearchDepth;
  initialPeriod?: InformationPeriod;
}

const CATEGORIES: { label: ResearchCategory; icon: React.ComponentType<{ className?: string }>; description: string }[] = [
  { label: 'General Research', icon: Compass, description: 'Interdisciplinary, policy, cultural, or cross-domain topics' },
  { label: 'Technology & AI', icon: Cpu, description: 'Autonomous agents, semiconductors, algorithms, cloud, security' },
  { label: 'Education & Careers', icon: GraduationCap, description: 'Workforce shifts, pedagogy, skill transitions, EdTech' },
  { label: 'Science & Environment', icon: Leaf, description: 'Materials, climate, biotech, energy systems, physics' },
  { label: 'Business', icon: Briefcase, description: 'Enterprise models, market dynamics, supply chain, investments' },
];

const DEPTHS: { label: ResearchDepth; time: string; details: string }[] = [
  { label: 'Quick Summary', time: '~2 min read', details: 'Executive overview, key metrics, core pros & cons' },
  { label: 'Detailed Report', time: '~5 min read', details: 'Structured findings, multi-source comparison, risk analysis' },
  { label: 'Deep Research', time: '~9 min read', details: 'Exhaustive synthesis, methodology critique, full citation index' },
];

const PERIODS: { label: InformationPeriod; description: string }[] = [
  { label: 'Latest', description: 'Recent breakthroughs (Last 12–24 months)' },
  { label: 'Historical', description: 'Long-term baseline & foundational studies' },
  { label: 'Both', description: 'Complete longitudinal timeline & evolution' },
];

const SAMPLE_PROMPTS = [
  {
    topic: 'How are solid-state battery electrolytes scaling for automotive production, and what are the primary material bottlenecks?',
    category: 'Science & Environment' as ResearchCategory,
    depth: 'Deep Research' as ResearchDepth,
    period: 'Both' as InformationPeriod,
  },
  {
    topic: 'Evaluate autonomous multi-agent frameworks in enterprise workflows: where do deterministic guardrails fail?',
    category: 'Technology & AI' as ResearchCategory,
    depth: 'Detailed Report' as ResearchDepth,
    period: 'Latest' as InformationPeriod,
  },
  {
    topic: 'What is the empirical effect of 3-day hybrid office mandates on engineering retention and novelty patent filings?',
    category: 'Business' as ResearchCategory,
    depth: 'Quick Summary' as ResearchDepth,
    period: 'Latest' as InformationPeriod,
  },
];

export const ResearchForm: React.FC<ResearchFormProps> = ({
  onStartResearch,
  isLoading,
  errorMessage,
  onClearError,
  webhookConfig,
  onOpenWebhookModal,
  initialTopic = '',
  initialCategory = 'Technology & AI',
  initialDepth = 'Detailed Report',
  initialPeriod = 'Latest',
}) => {
  const [topic, setTopic] = useState(initialTopic);
  const [category, setCategory] = useState<ResearchCategory>(initialCategory);
  const [depth, setDepth] = useState<ResearchDepth>(initialDepth);
  const [period, setPeriod] = useState<InformationPeriod>(initialPeriod);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync if initialTopic changes externally (e.g., from Topic Library)
  React.useEffect(() => {
    if (initialTopic) setTopic(initialTopic);
  }, [initialTopic]);

  React.useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
  }, [initialCategory]);

  React.useEffect(() => {
    if (initialDepth) setDepth(initialDepth);
  }, [initialDepth]);

  React.useEffect(() => {
    if (initialPeriod) setPeriod(initialPeriod);
  }, [initialPeriod]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClearError();

    const trimmed = topic.trim();
    if (!trimmed) {
      setValidationError('Please enter a research question or topic before submitting.');
      return;
    }

    if (trimmed.length < 8) {
      setValidationError('Please provide a slightly more descriptive topic (at least 8 characters) for higher research quality.');
      return;
    }

    setValidationError(null);
    onStartResearch(trimmed, category, depth, period);
  };

  const handleApplySample = (sample: typeof SAMPLE_PROMPTS[0]) => {
    setTopic(sample.topic);
    setCategory(sample.category);
    setDepth(sample.depth);
    setPeriod(sample.period);
    setValidationError(null);
    onClearError();
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Hero Headline & Value Proposition */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-3" style={{ textWrap: 'balance' }}>
          Research smarter. Discover more.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Synthesize complex domains in seconds. Receive executive summaries, verified empirical findings, 
          and cross-source consensus matrices on demand.
        </p>

        {/* Demo Mode Notice & Webhook CTA */}
        <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-xs text-slate-600 border border-slate-200">
          <span className="font-semibold text-slate-800">
            {webhookConfig.enabled && webhookConfig.url ? '● Live n8n Mode' : '● Demonstration Mode'}
          </span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span>
            {webhookConfig.enabled && webhookConfig.url
              ? 'Routing queries through your connected webhook'
              : 'Using structured analytical datasets'}
          </span>
          <button
            type="button"
            onClick={onOpenWebhookModal}
            className="text-indigo-600 hover:text-indigo-700 font-medium underline underline-offset-2 ml-1"
          >
            Configure
          </button>
        </div>
      </div>

      {/* Main Research Card Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8 space-y-7">
        {/* Error message displays */}
        {(validationError || errorMessage) && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 text-sm animate-in fade-in duration-150">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Unable to start research</p>
              <p className="text-rose-700 mt-0.5">{validationError || errorMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setValidationError(null);
                onClearError();
              }}
              className="text-rose-600 hover:text-rose-900 text-xs font-semibold px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Topic Input Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="research-topic" className="block text-sm font-semibold text-slate-900">
              Research Question or Topic
            </label>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono tabular-nums">
              <span>{topic.length} characters</span>
              {topic.length > 0 && (
                <button
                  type="button"
                  onClick={() => setTopic('')}
                  className="text-slate-500 hover:text-slate-800 font-sans text-xs underline"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <textarea
              id="research-topic"
              rows={4}
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="e.g., What are the current commercialization milestones for solid-state batteries in EVs, and what are the main electrolyte stability challenges?"
              className="w-full px-4 py-3 text-base text-slate-900 placeholder-slate-400 bg-white border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all resize-y min-h-[110px]"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="space-y-2.5">
          <label className="block text-sm font-semibold text-slate-900">
            Research Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = category === cat.label;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setCategory(cat.label)}
                  disabled={isLoading}
                  className={`p-3 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 shadow-xs ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                  </div>
                  <div className="font-semibold text-xs leading-snug">{cat.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual Column: Depth & Information Period */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          {/* Research Depth Selection */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-slate-900">
                Research Depth
              </label>
              <span className="text-xs text-slate-500">
                {DEPTHS.find(d => d.label === depth)?.time}
              </span>
            </div>
            <div className="space-y-2">
              {DEPTHS.map((d) => {
                const isSelected = depth === d.label;
                return (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => setDepth(d.label)}
                    disabled={isLoading}
                    className={`w-full p-3 rounded-xl border text-left transition-all duration-150 flex items-center justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/40 text-slate-900 ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-xs text-slate-900 flex items-center gap-2">
                        {d.label}
                        <span className="text-[11px] font-normal text-slate-500">({d.time})</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{d.details}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                      isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Information Period Selection */}
          <div className="space-y-2.5">
            <label className="block text-sm font-semibold text-slate-900">
              Information Period
            </label>
            <div className="space-y-2">
              {PERIODS.map((p) => {
                const isSelected = period === p.label;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setPeriod(p.label)}
                    disabled={isLoading}
                    className={`w-full p-3 rounded-xl border text-left transition-all duration-150 flex items-center justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/40 text-slate-900 ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-xs text-slate-900">{p.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{p.description}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                      isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Reports include Executive Summary, Key Findings, Source Matrix & References.</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <span>Start Research</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Engine Overview Spotlight */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="p-6 md:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
              <Layers className="w-3.5 h-3.5" />
              <span>Multi-Source Analytical Synthesis</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Rigorous cross-validation across literature and industry data
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every query is parsed into sub-hypotheses, cross-checked against peer-reviewed journals, institutional advisory models, and patent registries, producing unified consensus matrices and citation indexes.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono pt-1">
              <span>Automated Taxonomy</span>
              <span aria-hidden="true">·</span>
              <span>Methodology Comparison</span>
              <span aria-hidden="true">·</span>
              <span>Export Ready</span>
            </div>
          </div>
          <div className="relative md:col-span-5 h-44 sm:h-52 w-full overflow-hidden bg-slate-100">
            <img
              src="/src/assets/images/research_data_prism_1791955847913.jpg"
              alt="RESEARCHPULSE Analytical Synthesis Engine"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Graceful fallback container if asset cannot load
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* Suggested Topic Presets */}
      <div className="mt-8 space-y-2.5">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Quick Exploration Presets</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SAMPLE_PROMPTS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplySample(sample)}
              className="p-3 text-left rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all text-xs group"
            >
              <div className="font-medium text-slate-800 group-hover:text-indigo-900 line-clamp-2 leading-relaxed">
                "{sample.topic}"
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className="font-semibold text-indigo-600">{sample.category}</span>
                <span>·</span>
                <span>{sample.depth}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
