import React, { useState } from 'react';
import { CURATED_TOPIC_SUGGESTIONS } from '../data/mockReports';
import { ResearchCategory, ResearchDepth, InformationPeriod } from '../types/research';
import { ArrowUpRight, Compass, Sparkles, Filter, Layers } from 'lucide-react';

interface TopicLibraryProps {
  onSelectTopic: (topic: string, category: ResearchCategory, depth: ResearchDepth, period: InformationPeriod) => void;
}

export const TopicLibrary: React.FC<TopicLibraryProps> = ({ onSelectTopic }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Technology & AI', 'Science & Environment', 'Business', 'Education & Careers', 'General Research'];

  const filteredTopics = activeCategory === 'All'
    ? CURATED_TOPIC_SUGGESTIONS
    : CURATED_TOPIC_SUGGESTIONS.filter(t => t.category === activeCategory);

  return (
    <div className="w-full max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Curated Topic Library & Inquiries
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          High-impact research questions designed to evaluate empirical rigor, industry consensus, 
          and cross-disciplinary literature synthesis.
        </p>

        {/* Filter row */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-indigo-600">{item.category}</span>
                <span className="font-mono text-[11px]">{item.depth}</span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                "{item.topic}"
              </h3>

              <p className="text-xs text-slate-500 italic">
                Focus: {item.tagline}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Period: {item.period}
              </span>

              <button
                type="button"
                onClick={() => onSelectTopic(item.topic, item.category, item.depth, item.period)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <span>Launch Synthesis</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
