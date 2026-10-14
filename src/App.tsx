/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { AddTopicView } from './components/AddTopicView';
import { ResearchFeedView } from './components/ResearchFeedView';
import { UpdateDetailsView } from './components/UpdateDetailsView';
import { DuplicateReportsView } from './components/DuplicateReportsView';
import { HistoricalComparisonView } from './components/HistoricalComparisonView';
import { TrendAnalysisView } from './components/TrendAnalysisView';
import { AlertSettingsView } from './components/AlertSettingsView';
import { DeveloperGuideModal } from './components/DeveloperGuideModal';

import { 
  MonitoredTopic, 
  ResearchUpdate, 
  DuplicateGroup, 
  HistoricalEvolution, 
  TrendAnalysisItem, 
  AlertSettings 
} from './types/monitoring';

import {
  getMonitoredTopics,
  saveMonitoredTopics,
  getResearchUpdates,
  saveResearchUpdates,
  getDuplicateGroups,
  getHistoricalEvolutions,
  getTrendAnalysis,
  getAlertSettings,
  saveAlertSettings,
  triggerAgenticScan
} from './services/monitoringService';

import { Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  
  // Persistent State
  const [topics, setTopics] = useState<MonitoredTopic[]>(() => getMonitoredTopics());
  const [updates, setUpdates] = useState<ResearchUpdate[]>(() => getResearchUpdates());
  const [duplicateGroups] = useState<DuplicateGroup[]>(() => getDuplicateGroups());
  const [historicalEvolutions] = useState<HistoricalEvolution[]>(() => getHistoricalEvolutions());
  const [trends] = useState<TrendAnalysisItem[]>(() => getTrendAnalysis());
  const [alertSettings, setAlertSettings] = useState<AlertSettings>(() => getAlertSettings());

  // Active Update for details page
  const [selectedUpdate, setSelectedUpdate] = useState<ResearchUpdate | null>(() => {
    const list = getResearchUpdates();
    return list[0] || null;
  });

  const [highlightDuplicateGroupId, setHighlightDuplicateGroupId] = useState<string | undefined>(undefined);
  const [isDevGuideOpen, setIsDevGuideOpen] = useState(false);

  // Surveillance scan modal / progress
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('');
  const [scanPct, setScanPct] = useState(0);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Sync state to storage
  useEffect(() => {
    saveMonitoredTopics(topics);
  }, [topics]);

  useEffect(() => {
    saveResearchUpdates(updates);
  }, [updates]);

  const unreadCount = updates.filter((u) => !u.isRead).length;

  const handleSelectUpdate = (update: ResearchUpdate) => {
    setSelectedUpdate(update);
    // Mark as read
    setUpdates((prev) =>
      prev.map((u) => (u.id === update.id ? { ...u, isRead: true } : u))
    );
    setActiveTab('details');
  };

  const handleToggleBookmark = (updateId: string) => {
    setUpdates((prev) =>
      prev.map((u) =>
        u.id === updateId ? { ...u, isBookmarked: !u.isBookmarked } : u
      )
    );
    if (selectedUpdate?.id === updateId) {
      setSelectedUpdate((prev) =>
        prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null
      );
    }
  };

  const handleSaveTopic = (newTopic: MonitoredTopic) => {
    setTopics((prev) => [newTopic, ...prev]);
    setActiveTab('dashboard');
    setNotification({
      message: `Topic "${newTopic.name}" successfully added to agentic surveillance.`,
      type: 'success',
    });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSaveAlertSettings = (newSettings: AlertSettings) => {
    setAlertSettings(newSettings);
    saveAlertSettings(newSettings);
  };

  const handleTriggerScan = async (topic: MonitoredTopic) => {
    setIsScanning(true);
    setScanPct(10);
    setScanStep('Initializing topic surveillance parameters...');

    try {
      const res = await triggerAgenticScan(
        topic,
        alertSettings.webhookAlertsEnabled ? alertSettings.webhookUrl : undefined,
        alertSettings.secretToken,
        (step, pct) => {
          setScanStep(step);
          setScanPct(pct);
        }
      );

      // Update topic check time
      setTopics((prev) =>
        prev.map((t) =>
          t.id === topic.id
            ? { ...t, lastCheckedAt: new Date().toISOString(), updateCount: t.updateCount + res.newUpdatesDetected }
            : t
        )
      );

      if (res.detectedUpdate) {
        setUpdates((prev) => [res.detectedUpdate!, ...prev]);
        setNotification({
          message: `Surveillance complete for "${topic.name}". 1 new empirical update detected!`,
          type: 'success',
        });
      } else {
        setNotification({
          message: `Surveillance sweep complete for "${topic.name}". No anomalous shifts detected above ${topic.relevanceThreshold}% floor.`,
          type: 'info',
        });
      }
      setTimeout(() => setNotification(null), 4000);
    } catch (e: any) {
      console.error('Scan failed', e);
    } finally {
      setIsScanning(false);
    }
  };

  const handleNavigateToDuplicates = (groupId: string) => {
    setHighlightDuplicateGroupId(groupId);
    setActiveTab('duplicates');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alertSettings={alertSettings}
        unreadCount={unreadCount}
        onOpenDevGuide={() => setIsDevGuideOpen(true)}
      />

      {/* Ephemeral Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 p-4 rounded-xl shadow-lg border max-w-md animate-in slide-in-from-top-3 duration-200 bg-white text-xs flex items-start gap-2.5">
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 text-slate-800 leading-relaxed">
            {notification.message}
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-slate-700 text-xs font-bold ml-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Viewport Router */}
      <main className="flex-1">
        {activeTab === 'dashboard' && (
          <DashboardView
            topics={topics}
            updates={updates}
            trends={trends}
            alertSettings={alertSettings}
            setActiveTab={setActiveTab}
            onSelectUpdate={handleSelectUpdate}
            onTriggerScan={handleTriggerScan}
            isScanning={isScanning}
          />
        )}

        {activeTab === 'feed' && (
          <ResearchFeedView
            updates={updates}
            onSelectUpdate={handleSelectUpdate}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'details' && selectedUpdate && (
          <UpdateDetailsView
            update={selectedUpdate}
            onBack={() => setActiveTab('feed')}
            onToggleBookmark={handleToggleBookmark}
            onNavigateToDuplicates={handleNavigateToDuplicates}
          />
        )}

        {activeTab === 'duplicates' && (
          <DuplicateReportsView
            duplicateGroups={duplicateGroups}
            highlightGroupId={highlightDuplicateGroupId}
          />
        )}

        {activeTab === 'historical' && (
          <HistoricalComparisonView
            historicalEvolutions={historicalEvolutions}
          />
        )}

        {activeTab === 'trends' && (
          <TrendAnalysisView trends={trends} />
        )}

        {activeTab === 'add-topic' && (
          <AddTopicView
            onSaveTopic={handleSaveTopic}
            onCancel={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertSettingsView
            settings={alertSettings}
            topics={topics}
            onSaveSettings={handleSaveAlertSettings}
          />
        )}
      </main>

      {/* Scanning Modal Indicator */}
      {isScanning && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Executing Agentic Surveillance
                </h3>
                <p className="text-xs text-slate-500">
                  Cross-referencing peer indices & preprints
                </p>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-medium truncate max-w-[260px]">
                  {scanStep}
                </span>
                <span className="font-mono text-indigo-600 font-bold tabular-nums">
                  {scanPct}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${scanPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Developer Setup Guide Modal */}
      <DeveloperGuideModal
        isOpen={isDevGuideOpen}
        onClose={() => setIsDevGuideOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 sm:px-6 mt-auto text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">RESEARCHPULSE</span>
            <span>—</span>
            <span>Agentic AI Research Monitoring System</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDevGuideOpen(true)}
              className="hover:text-slate-900 transition-colors underline"
            >
              VS Code Setup Guide
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className="hover:text-slate-900 transition-colors underline"
            >
              n8n Webhook
            </button>
            <span className="font-mono text-[11px]">Demonstration Mode v2.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
