import React, { useState } from 'react';
import { 
  X, 
  Check, 
  AlertCircle, 
  Sliders, 
  Send, 
  Activity, 
  Code, 
  ExternalLink, 
  CheckCircle2, 
  Loader2, 
  Lock,
  Layers
} from 'lucide-react';
import { WebhookConfig } from '../types/research';
import { testWebhookConnection, WebhookTestResult } from '../services/webhookService';

interface WebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WebhookConfig;
  onSaveConfig: (config: WebhookConfig) => void;
}

export const WebhookModal: React.FC<WebhookModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [url, setUrl] = useState(config.url || '');
  const [enabled, setEnabled] = useState(config.enabled);
  const [secretToken, setSecretToken] = useState(config.secretToken || '');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<WebhookTestResult | null>(null);
  const [activeTab, setActiveTab] = useState<'config' | 'payload' | 'guide'>('config');

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConfig({
      url: url.trim(),
      enabled,
      secretToken: secretToken.trim(),
      timeoutMs: config.timeoutMs || 30000,
    });
    onClose();
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    const tempConfig: WebhookConfig = {
      url: url.trim(),
      enabled,
      secretToken: secretToken.trim(),
      timeoutMs: 8000,
    };

    const res = await testWebhookConnection(tempConfig);
    setTestResult(res);
    setIsTesting(false);
  };

  const samplePayload = {
    event: 'research.requested',
    queryId: 'query_1742080000',
    topic: 'Post-Quantum Cryptography Migration for Financial Core Banking',
    category: 'Technology & AI',
    depth: 'Deep Research',
    period: 'Latest',
    timestamp: new Date().toISOString(),
    metadata: {
      client: 'RESEARCHPULSE-Web-1.0',
      requestedFields: ['executiveSummary', 'keyFindings', 'sourceComparison', 'conclusion', 'references']
    }
  };

  const sampleExpectedResponse = {
    title: 'Post-Quantum Cryptography Migration: Technical & Capital Readiness',
    subtitle: 'NIST FIPS 203/204 standard implementation challenges',
    executiveSummary: {
      overview: 'Transitioning legacy financial HSMs to lattice-based cryptography...',
      macroContext: 'Federal mandates require complete algorithmic agility by 2030.',
      strategicTakeaways: ['ML-KEM-768 requires 4x larger key sizes...']
    },
    keyFindings: [
      {
        title: 'Throughput latency penalty',
        metric: '+18ms',
        metricLabel: 'Handshake latency overhead',
        description: 'Lattice-based key exchanges inflate handshake times on high-frequency channels.',
        impact: 'High',
        confidence: 96
      }
    ],
    sourceComparison: [],
    conclusion: {
      synthesis: 'Agile cryptographic abstraction layers are recommended...',
      risksAndUncertainties: ['Hardware memory exhaustion in legacy POS terminals'],
      actionableRecommendations: ['Inventory all RSA-2048 keys across production services']
    },
    references: []
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Integration & n8n Webhook Settings
              </h2>
              <p className="text-xs text-slate-500">
                Connect your automated AI agent or stay in Demonstration Mode
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

        {/* Tabs */}
        <div className="px-6 pt-3 border-b border-slate-200 flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('config')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'config' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Connection Setup
          </button>
          <button
            onClick={() => setActiveTab('payload')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'payload' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Payload Contract & Schema
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'guide' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            n8n Workflow Guide
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'config' && (
            <div className="space-y-5">
              {/* Mode Toggle Box */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Live n8n Webhook Routing
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      When enabled, queries are dispatched directly to your n8n workflow.
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) => setEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                {!enabled && (
                  <div className="text-xs text-indigo-900 bg-indigo-50 border border-indigo-100 p-2.5 rounded-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span><strong>Demonstration Mode active:</strong> queries synthesize rich, structured sample reports locally with no external dependencies or API keys required.</span>
                  </div>
                )}
              </div>

              {/* URL Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  n8n Webhook URL (POST Endpoint)
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setTestResult(null);
                  }}
                  placeholder="https://n8n.your-domain.com/webhook/researchpulse"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                />
                <p className="text-[11px] text-slate-500">
                  Enter your production or test webhook URL from your n8n workflow canvas.
                </p>
              </div>

              {/* Optional Secret Token */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Optional Authorization Header / Secret Token</span>
                </label>
                <input
                  type="password"
                  value={secretToken}
                  onChange={(e) => setSecretToken(e.target.value)}
                  placeholder="Bearer token or custom secret key"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                />
                <p className="text-[11px] text-slate-500">
                  Sent as `Authorization: Bearer [token]` and `X-Webhook-Secret: [token]` to authenticate requests.
                </p>
              </div>

              {/* Test Button & Result */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTesting || !url.trim()}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {isTesting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Pinging Endpoint...</span>
                    </>
                  ) : (
                    <>
                      <Activity className="w-3.5 h-3.5" />
                      <span>Test Webhook Connection</span>
                    </>
                  )}
                </button>

                {testResult && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                      testResult.success
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border-rose-200 text-rose-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold">
                      {testResult.success ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                      )}
                      <span>{testResult.success ? 'Connection Successful' : 'Connection Failed'}</span>
                      {testResult.latencyMs > 0 && (
                        <span className="font-mono font-normal text-[11px]">
                          ({testResult.latencyMs}ms roundtrip)
                        </span>
                      )}
                    </div>
                    <p className="leading-relaxed">{testResult.message}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'payload' && (
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Outgoing Request Payload (RESEARCHPULSE ➔ n8n)
                </h3>
                <p className="text-slate-500 mb-2">
                  When a user clicks "Start Research", the website transmits this JSON body via HTTP POST:
                </p>
                <pre className="p-3 bg-slate-900 text-indigo-300 font-mono text-[11px] rounded-xl overflow-x-auto">
                  {JSON.stringify(samplePayload, null, 2)}
                </pre>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Expected Return Schema (n8n ➔ RESEARCHPULSE)
                </h3>
                <p className="text-slate-500 mb-2">
                  Configure your n8n "Respond to Webhook" node to return JSON adhering to this structure:
                </p>
                <pre className="p-3 bg-slate-900 text-emerald-300 font-mono text-[11px] rounded-xl overflow-x-auto max-h-48">
                  {JSON.stringify(sampleExpectedResponse, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100">
                <h4 className="font-bold text-indigo-950 mb-1">
                  How to Build the n8n AI Agent Workflow
                </h4>
                <p className="text-indigo-900">
                  Follow these 4 simple steps to connect a live research agent:
                </p>
              </div>

              <ol className="space-y-3 list-decimal list-inside">
                <li className="pl-1">
                  <span className="font-bold text-slate-900">Add a Webhook Node in n8n:</span> Set HTTP Method to <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-600">POST</code>, set path to <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-600">researchpulse</code>, and set response mode to <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-600">Respond to Webhook Node</code>.
                </li>
                <li className="pl-1">
                  <span className="font-bold text-slate-900">Attach an AI Agent / Research Tool:</span> Connect Gemini, Perplexity, or OpenAI node with Web Search or Serper/Tavily tool to investigate the incoming <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-600">body.topic</code>.
                </li>
                <li className="pl-1">
                  <span className="font-bold text-slate-900">Format JSON Output:</span> Use a Code node or Structured Output parser to package the executive summary, key findings, and references.
                </li>
                <li className="pl-1">
                  <span className="font-bold text-slate-900">Respond to Webhook:</span> Return the synthesized JSON and paste the production webhook URL into the connection settings here.
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-mono">
            {enabled ? 'Status: Webhook Enabled' : 'Status: Demonstration Mode'}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-2xs"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
