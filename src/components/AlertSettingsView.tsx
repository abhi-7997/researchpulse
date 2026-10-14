import React, { useState } from 'react';
import { 
  Bell, 
  Sliders, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Lock, 
  Mail, 
  ShieldCheck, 
  RefreshCw,
  Info
} from 'lucide-react';
import { AlertSettings, MonitoredTopic, UpdateSignificance } from '../types/monitoring';
import { pingN8nWebhook, WebhookPingResult } from '../services/monitoringService';

interface AlertSettingsViewProps {
  settings: AlertSettings;
  topics: MonitoredTopic[];
  onSaveSettings: (newSettings: AlertSettings) => void;
}

export const AlertSettingsView: React.FC<AlertSettingsViewProps> = ({
  settings,
  topics,
  onSaveSettings,
}) => {
  const [minSignificance, setMinSignificance] = useState<UpdateSignificance>(settings.minSignificance);
  const [suppressWindowHours, setSuppressWindowHours] = useState<number>(settings.suppressDuplicatesWindowHours);
  const [muteIncremental, setMuteIncremental] = useState<boolean>(settings.muteIncrementalUpdates);
  const [webhookEnabled, setWebhookEnabled] = useState<boolean>(settings.webhookAlertsEnabled);
  const [webhookUrl, setWebhookUrl] = useState<string>(settings.webhookUrl);
  const [secretToken, setSecretToken] = useState<string>(settings.secretToken || '');
  const [emailDigest, setEmailDigest] = useState<'Off' | 'Daily' | 'Weekly'>(settings.emailDigest);
  const [topicMutes, setTopicMutes] = useState<Record<string, boolean>>(settings.topicMutes || {});

  const [isTesting, setIsTesting] = useState(false);
  const [pingResult, setPingResult] = useState<WebhookPingResult | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleTestWebhook = async () => {
    setIsTesting(true);
    setPingResult(null);
    const res = await pingN8nWebhook(webhookUrl, secretToken);
    setPingResult(res);
    setIsTesting(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AlertSettings = {
      minSignificance,
      suppressDuplicatesWindowHours: suppressWindowHours,
      muteIncrementalUpdates: muteIncremental,
      webhookAlertsEnabled: webhookEnabled,
      webhookUrl: webhookUrl.trim(),
      secretToken: secretToken.trim(),
      emailDigest,
      topicMutes,
    };
    onSaveSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const toggleTopicMute = (topicId: string) => {
    setTopicMutes((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Alert Sensitivity & Notification Governance
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Calibrate detection thresholds, suppress repetitive echo notifications, 
          and configure automated downstream agent dispatches via n8n webhook.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Alert settings and notification preferences successfully saved.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Significance Threshold */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Bell className="w-4 h-4 text-indigo-600" />
            <span>01. Significance Threshold Filtering</span>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700">
              Minimum Significance Level to Trigger Alert Notification:
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(
                [
                  { level: 'Critical' as UpdateSignificance, label: 'Critical Only', sub: 'Paradigm shifts & major contradictions' },
                  { level: 'High' as UpdateSignificance, label: 'High & Above', sub: 'Empirical records & standards' },
                  { level: 'Moderate' as UpdateSignificance, label: 'Moderate & Above', sub: 'Notable methodology revisions' },
                  { level: 'Incremental' as UpdateSignificance, label: 'All Developments', sub: 'Every minor preprint mention' },
                ]
              ).map((item) => {
                const isSelected = minSignificance === item.level;
                return (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setMinSignificance(item.level)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-indigo-50/50 border-indigo-600 ring-1 ring-indigo-600'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">{item.label}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{item.sub}</div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={muteIncremental}
                  onChange={(e) => setMuteIncremental(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Automatically suppress incremental literature updates without verifiable metrics</span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 2: Repetitive Notification Suppression */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <span>02. Duplicate Echo Suppression Window</span>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-slate-600 leading-relaxed">
              When multiple publications report the same underlying finding, alerts are suppressed 
              after the initial primary notification within this sliding time window:
            </p>

            <div className="flex items-center gap-4">
              {[24, 48, 72, 168].map((hours) => (
                <button
                  key={hours}
                  type="button"
                  onClick={() => setSuppressWindowHours(hours)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    suppressWindowHours === hours
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {hours === 168 ? '7 Days' : `${hours} Hours`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Downstream n8n Webhook Alert Dispatch */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Activity className="w-4 h-4 text-indigo-600" />
              <span>03. Downstream n8n Webhook Dispatch</span>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={webhookEnabled}
                onChange={(e) => setWebhookEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Forward high-significance findings to external n8n workflows, Slack bots, or internal databases.
          </p>

          <div className="space-y-3 pt-1">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                n8n Webhook POST Endpoint URL
              </label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => {
                  setWebhookUrl(e.target.value);
                  setPingResult(null);
                }}
                placeholder="https://n8n.your-domain.com/webhook/researchpulse-alerts"
                className="w-full px-3.5 py-2 text-xs font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Optional Secret / Bearer Token</span>
              </label>
              <input
                type="password"
                value={secretToken}
                onChange={(e) => setSecretToken(e.target.value)}
                placeholder="Bearer token or custom webhook secret"
                className="w-full px-3.5 py-2 text-xs font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleTestWebhook}
                disabled={isTesting || !webhookUrl.trim()}
                className="px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isTesting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Testing...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Ping Endpoint</span>
                  </>
                )}
              </button>

              {pingResult && (
                <div
                  className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 flex-1 ${
                    pingResult.success
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  {pingResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span className="truncate">{pingResult.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 4: Per-Topic Mutes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>04. Topic Notification Mutes</span>
          </div>

          <div className="space-y-2">
            {topics.map((t) => {
              const isMuted = !!topicMutes[t.id];
              return (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:bg-slate-50/50 text-xs"
                >
                  <div>
                    <div className="font-semibold text-slate-900">{t.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{t.category}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleTopicMute(t.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                      isMuted
                        ? 'bg-rose-50 border-rose-200 text-rose-700'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isMuted ? 'Muted' : 'Unmuted'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm hover:shadow cursor-pointer"
          >
            Save All Alert Settings
          </button>
        </div>
      </form>
    </div>
  );
};
