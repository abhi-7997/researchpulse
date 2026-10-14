import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Github, Code, Play, Layers } from 'lucide-react';

interface DeveloperGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperGuideModal: React.FC<DeveloperGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const vscodeCommands = `# 1. Navigate into project directory
cd researchpulse

# 2. Install all required npm packages
npm install

# 3. Start Vite development server
npm run dev

# 4. Open current directory in VS Code
code .`;

  const githubCommands = `# 1. Initialize local git repository
git init

# 2. Stage all files
git add .

# 3. Commit initial codebase
git commit -m "feat: complete RESEARCHPULSE Agentic AI Research Monitoring System"

# 4. Set main branch
git branch -M main

# 5. Connect to your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/your-username/researchpulse.git

# 6. Push codebase to GitHub
git push -u origin main`;

  const n8nPayloadExample = `// n8n Agentic Surveillance Webhook Payload Contract (POST)
{
  "event": "agentic_monitor.scan_requested",
  "topicId": "topic-ssb",
  "topicName": "Solid-State Battery Electrolytes & Scalability",
  "relevanceThreshold": 80,
  "preferredSources": ["Nature Energy", "Journal of Power Sources"],
  "excludedTerms": ["Lead-acid", "Consumer coin-cell toys"],
  "timestamp": "2026-10-13T22:30:00.000Z"
}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Visual Studio Code Setup & GitHub Deployment
              </h2>
              <p className="text-xs text-slate-500">
                Setup commands and architectural guide for RESEARCHPULSE
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Section 1: Local VS Code Setup */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Play className="w-4 h-4 text-indigo-600" />
                <span>1. Run Locally in Visual Studio Code</span>
              </h3>
              <button
                type="button"
                onClick={() => handleCopy('vscode', vscodeCommands)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                {copiedKey === 'vscode' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copiedKey === 'vscode' ? 'Copied' : 'Copy Commands'}</span>
              </button>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Open the terminal inside VS Code (<kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded font-mono text-[10px]">Ctrl + `</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded font-mono text-[10px]">Cmd + `</kbd>) and paste:
            </p>
            <pre className="p-4 bg-slate-950 text-slate-100 font-mono text-[11px] rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
              {vscodeCommands}
            </pre>
            <p className="text-slate-500 text-[11px]">
              Vite will launch the local development server at <code className="text-indigo-600 font-mono font-semibold">http://localhost:3000</code>.
            </p>
          </section>

          {/* Section 2: Push to GitHub */}
          <section className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Github className="w-4 h-4 text-slate-900" />
                <span>2. Push Project to GitHub</span>
              </h3>
              <button
                type="button"
                onClick={() => handleCopy('github', githubCommands)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                {copiedKey === 'github' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copiedKey === 'github' ? 'Copied' : 'Copy Commands'}</span>
              </button>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Create an empty repository on GitHub (<a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-indigo-600 underline">github.com/new</a>) and run:
            </p>
            <pre className="p-4 bg-slate-950 text-slate-100 font-mono text-[11px] rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
              {githubCommands}
            </pre>
          </section>

          {/* Section 3: Architecture & Security */}
          <section className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Code className="w-4 h-4 text-indigo-600" />
              <span>3. Architecture & Zero Secrets Security</span>
            </h3>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-slate-700 leading-relaxed">
              <p>
                <strong>Security Guarantee:</strong> No private AI API keys or credentials are stored or exposed in the frontend code.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li><code className="font-mono text-indigo-700">src/services/monitoringService.ts</code>: Prepared service layer dispatching surveillance tasks to your n8n workflow.</li>
                <li><code className="font-mono text-indigo-700">src/data/mockMonitoringData.ts</code>: Clearly marked, rich demonstration data for initial system evaluation.</li>
                <li><code className="font-mono text-indigo-700">src/components/</code>: Modular components for Dashboard, Add Topic, Research Feed, Update Details, Duplicate Clustering, Historical Evolutions, Trend Analysis, and Alert Settings.</li>
              </ul>
            </div>
            <pre className="p-3 bg-slate-900 text-indigo-300 font-mono text-[11px] rounded-xl overflow-x-auto">
              {n8nPayloadExample}
            </pre>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
