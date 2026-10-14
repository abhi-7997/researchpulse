import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  Sliders, 
  Clock, 
  Compass, 
  Layers, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowLeft,
  Info
} from 'lucide-react';
import { 
  MonitoredTopic, 
  TopicCategory, 
  MonitoringFrequency 
} from '../types/monitoring';

interface AddTopicViewProps {
  onSaveTopic: (topic: MonitoredTopic) => void;
  onCancel: () => void;
}

const CATEGORIES: TopicCategory[] = [
  'Technology & AI',
  'Science & Environment',
  'Biomedical & Healthcare',
  'Energy & Materials',
  'Business & Economics'
];

const SOURCE_PRESETS = [
  'Nature Energy',
  'Science Advances',
  'ArXiv CS.AI / CS.SE',
  'IEEE Transactions',
  'The New England Journal of Medicine',
  'NIST Computer Security Resource Center',
  'Bank for International Settlements (BIS)',
  'BloombergNEF',
  'PubMed Central',
  'ACM Computing Surveys'
];

export const AddTopicView: React.FC<AddTopicViewProps> = ({
  onSaveTopic,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TopicCategory>('Technology & AI');
  const [conceptInput, setConceptInput] = useState('');
  const [relatedConcepts, setRelatedConcepts] = useState<string[]>([
    'Benchmark reproducibility',
    'Interfacial resistance'
  ]);
  const [preferredSources, setPreferredSources] = useState<string[]>([
    'Nature Energy',
    'ArXiv CS.AI / CS.SE'
  ]);
  const [sourceInput, setSourceInput] = useState('');
  const [excludedInput, setExcludedInput] = useState('');
  const [excludedTerms, setExcludedTerms] = useState<string[]>([
    'Cryptocurrency speculative trading',
    'Consumer toys'
  ]);
  const [relevanceThreshold, setRelevanceThreshold] = useState<number>(80);
  const [frequency, setFrequency] = useState<MonitoringFrequency>('Daily');
  const [error, setError] = useState<string | null>(null);

  const handleAddConcept = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const val = conceptInput.trim();
    if (val && !relatedConcepts.includes(val)) {
      setRelatedConcepts([...relatedConcepts, val]);
      setConceptInput('');
    }
  };

  const handleRemoveConcept = (concept: string) => {
    setRelatedConcepts(relatedConcepts.filter((c) => c !== concept));
  };

  const handleAddSource = (src: string) => {
    const val = src.trim();
    if (val && !preferredSources.includes(val)) {
      setPreferredSources([...preferredSources, val]);
      setSourceInput('');
    }
  };

  const handleRemoveSource = (src: string) => {
    setPreferredSources(preferredSources.filter((s) => s !== src));
  };

  const handleAddExcluded = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const val = excludedInput.trim();
    if (val && !excludedTerms.includes(val)) {
      setExcludedTerms([...excludedTerms, val]);
      setExcludedInput('');
    }
  };

  const handleRemoveExcluded = (term: string) => {
    setExcludedTerms(excludedTerms.filter((t) => t !== term));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a descriptive topic title.');
      return;
    }
    if (!description.trim() || description.trim().length < 20) {
      setError('Please provide a more detailed topic description (at least 20 characters) to calibrate relevance scoring.');
      return;
    }
    if (relatedConcepts.length === 0) {
      setError('Please add at least one related concept or keyword.');
      return;
    }

    const newTopic: MonitoredTopic = {
      id: `topic-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      category,
      relatedConcepts,
      preferredSources,
      excludedTerms,
      relevanceThreshold,
      frequency,
      active: true,
      createdAt: new Date().toISOString(),
      lastCheckedAt: new Date().toISOString(),
      updateCount: 0,
      highSignificanceCount: 0,
    };

    onSaveTopic(newTopic);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-6">
      {/* Top navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <span className="text-xs text-slate-500 font-mono">
          Agentic Topic Surveillance Specification
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Add Monitored Research Topic
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            Configure agentic surveillance parameters: specify taxonomies, preferred peer sources, 
            negative keyword exclusions, and significance calibration thresholds.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button onClick={() => setError(null)} className="font-bold text-rose-700">Dismiss</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Topic Title / Domain Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Solid-State Halide Electrolytes for High-Rate EV Fast Charging"
              className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Surveillance Scope & Research Hypotheses *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what specific developments, materials, metrics, or methodologies the agent should monitor and compare against historical benchmarks..."
              className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            />
            <p className="text-[11px] text-slate-500">
              Used by the agentic monitor to formulate search queries and evaluate semantic relevance.
            </p>
          </div>

          {/* Category & Frequency Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Research Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TopicCategory)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Surveillance Scan Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as MonitoringFrequency)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                <option value="Real-time">Real-time Webhook Stream</option>
                <option value="Hourly">Hourly Sweep</option>
                <option value="Daily">Daily Synthesis (Recommended)</option>
                <option value="Weekly">Weekly Deep-Dive Digest</option>
              </select>
            </div>
          </div>

          {/* Related Concepts (Tag Input) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Related Concepts & Taxonomy Keywords *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={conceptInput}
                onChange={(e) => setConceptInput(e.target.value)}
                onKeyDown={handleAddConcept}
                placeholder="Type keyword and press Enter (e.g., interfacial resistance, dendrite suppression)"
                className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
              <button
                type="button"
                onClick={handleAddConcept}
                className="px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {relatedConcepts.map((concept) => (
                <span
                  key={concept}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-medium"
                >
                  <span>{concept}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveConcept(concept)}
                    className="hover:text-indigo-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Preferred Sources */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Preferred Authoritative Sources & Repositories
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={sourceInput}
                onChange={(e) => setSourceInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSource(sourceInput);
                  }
                }}
                placeholder="Add custom journal or domain (e.g., Nature, bioRxiv)"
                className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
              <button
                type="button"
                onClick={() => handleAddSource(sourceInput)}
                className="px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Add
              </button>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-400">Quick Add:</span>
              {SOURCE_PRESETS.map((preset) => {
                const isAdded = preferredSources.includes(preset);
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => isAdded ? handleRemoveSource(preset) : handleAddSource(preset)}
                    className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                      isAdded
                        ? 'bg-indigo-600 text-white border-indigo-600 font-semibold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isAdded ? `✓ ${preset}` : `+ ${preset}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Excluded Topics / Negative Terms */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Excluded Topics & Negative Keywords (Noise Reduction)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={excludedInput}
                onChange={(e) => setExcludedInput(e.target.value)}
                onKeyDown={handleAddExcluded}
                placeholder="Terms to discard (e.g., toy drones, crypto speculative trading, lead-acid)"
                className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
              <button
                type="button"
                onClick={handleAddExcluded}
                className="px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Exclude
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {excludedTerms.map((term) => (
                <span
                  key={term}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs font-medium"
                >
                  <span>¬ {term}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveExcluded(term)}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Relevance Threshold Slider */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">
                Minimum Relevance & Semantic Match Floor
              </span>
              <span className="font-mono text-indigo-600 font-bold text-sm tabular-nums">
                {relevanceThreshold}%
              </span>
            </div>

            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={relevanceThreshold}
              onChange={(e) => setRelevanceThreshold(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>50% (High Recall / Broader Discovery)</span>
              <span>80% (Recommended)</span>
              <span>95% (High Precision / Low Noise)</span>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm hover:shadow"
            >
              Activate Topic Surveillance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
