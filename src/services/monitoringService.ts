import { 
  MonitoredTopic, 
  ResearchUpdate, 
  DuplicateGroup, 
  HistoricalEvolution, 
  TrendAnalysisItem, 
  AlertSettings 
} from '../types/monitoring';

import {
  INITIAL_TOPICS,
  INITIAL_UPDATES,
  INITIAL_DUPLICATE_GROUPS,
  INITIAL_HISTORICAL_EVOLUTIONS,
  INITIAL_TRENDS,
  DEFAULT_ALERT_SETTINGS
} from '../data/mockMonitoringData';

const STORAGE_KEYS = {
  TOPICS: 'researchpulse_monitored_topics_v2',
  UPDATES: 'researchpulse_updates_v2',
  DUPLICATES: 'researchpulse_duplicates_v2',
  HISTORICAL: 'researchpulse_historical_v2',
  TRENDS: 'researchpulse_trends_v2',
  SETTINGS: 'researchpulse_alert_settings_v2',
};

// --- DATA ACCESS METHODS WITH LOCALSTORAGE CACHE ---

export function getMonitoredTopics(): MonitoredTopic[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TOPICS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading topics from storage', e);
  }
  return INITIAL_TOPICS;
}

export function saveMonitoredTopics(topics: MonitoredTopic[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(topics));
  } catch (e) {
    console.error('Error saving topics', e);
  }
}

export function getResearchUpdates(): ResearchUpdate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.UPDATES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading updates from storage', e);
  }
  return INITIAL_UPDATES;
}

export function saveResearchUpdates(updates: ResearchUpdate[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.UPDATES, JSON.stringify(updates));
  } catch (e) {
    console.error('Error saving updates', e);
  }
}

export function getDuplicateGroups(): DuplicateGroup[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DUPLICATES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading duplicate groups from storage', e);
  }
  return INITIAL_DUPLICATE_GROUPS;
}

export function getHistoricalEvolutions(): HistoricalEvolution[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORICAL);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading historical evolutions from storage', e);
  }
  return INITIAL_HISTORICAL_EVOLUTIONS;
}

export function getTrendAnalysis(): TrendAnalysisItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TRENDS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading trend analysis from storage', e);
  }
  return INITIAL_TRENDS;
}

export function getAlertSettings(): AlertSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading alert settings from storage', e);
  }
  return DEFAULT_ALERT_SETTINGS;
}

export function saveAlertSettings(settings: AlertSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving alert settings', e);
  }
}

// --- N8N WEBHOOK INTEGRATION LAYER ---

export interface WebhookPingResult {
  success: boolean;
  message: string;
  latencyMs: number;
  statusCode?: number;
}

export async function pingN8nWebhook(url: string, secretToken?: string): Promise<WebhookPingResult> {
  const start = performance.now();
  if (!url || !url.trim()) {
    return {
      success: false,
      message: 'Please provide a valid Webhook URL endpoint.',
      latencyMs: 0
    };
  }

  const payload = {
    event: 'researchpulse.monitoring_ping',
    client: 'RESEARCHPULSE-Agentic-System-v2',
    timestamp: new Date().toISOString(),
    message: 'Health check from RESEARCHPULSE agent monitor'
  };

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Client-Agent': 'ResearchPulse-Monitor'
    };
    if (secretToken?.trim()) {
      headers['Authorization'] = `Bearer ${secretToken.trim()}`;
      headers['X-Webhook-Secret'] = secretToken.trim();
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url.trim(), {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const latencyMs = Math.round(performance.now() - start);

    if (res.ok) {
      return {
        success: true,
        message: `Endpoint responded with HTTP ${res.status} (${latencyMs}ms). Webhook ready to receive scan tasks and alert triggers.`,
        latencyMs,
        statusCode: res.status
      };
    } else {
      return {
        success: false,
        message: `Endpoint returned HTTP ${res.status} (${res.statusText || 'Error'}). Ensure your n8n workflow is activated and responding.`,
        latencyMs,
        statusCode: res.status
      };
    }
  } catch (error: any) {
    const latencyMs = Math.round(performance.now() - start);
    return {
      success: false,
      message: `Connection failed: ${error.message || 'Network error or CORS policy rejected the request'}. Verify URL or n8n CORS settings.`,
      latencyMs
    };
  }
}

/**
 * Triggers an agentic monitoring sweep for a given topic.
 * If webhook is provided, transmits payload to external n8n workflow.
 * Otherwise simulates an agentic scan over demonstration indices.
 */
export async function triggerAgenticScan(
  topic: MonitoredTopic,
  webhookUrl?: string,
  secretToken?: string,
  onProgress?: (step: string, pct: number) => void
): Promise<{ newUpdatesDetected: number; detectedUpdate?: ResearchUpdate }> {
  onProgress?.('Initializing surveillance parameters for topic...', 15);
  await new Promise((r) => setTimeout(r, 400));

  if (webhookUrl && webhookUrl.trim()) {
    onProgress?.('Transmitting surveillance prompt to n8n agentic workflow...', 40);
    const scanPayload = {
      event: 'agentic_monitor.scan_requested',
      topicId: topic.id,
      topicName: topic.name,
      relevanceThreshold: topic.relevanceThreshold,
      preferredSources: topic.preferredSources,
      excludedTerms: topic.excludedTerms,
      timestamp: new Date().toISOString()
    };

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (secretToken?.trim()) headers['Authorization'] = `Bearer ${secretToken.trim()}`;

      const res = await fetch(webhookUrl.trim(), {
        method: 'POST',
        headers,
        body: JSON.stringify(scanPayload)
      });

      if (!res.ok) {
        throw new Error(`n8n webhook returned HTTP ${res.status}`);
      }

      onProgress?.('Surveillance scan completed via n8n agent.', 100);
      return { newUpdatesDetected: 0 };
    } catch (e: any) {
      console.warn('Webhook scan failed, continuing in demonstration mode', e);
    }
  }

  // Simulated agentic monitoring progression
  onProgress?.('Querying peer repositories, ArXiv & institutional registries...', 45);
  await new Promise((r) => setTimeout(r, 600));

  onProgress?.('Analyzing divergence against historical claims & filtering duplicates...', 75);
  await new Promise((r) => setTimeout(r, 600));

  onProgress?.('Evaluating significance threshold and confidence boundaries...', 92);
  await new Promise((r) => setTimeout(r, 400));

  onProgress?.('Surveillance cycle complete.', 100);

  // Return realistic mock result
  return {
    newUpdatesDetected: 1,
    detectedUpdate: {
      id: `update-${Date.now()}`,
      topicId: topic.id,
      topicName: topic.name,
      title: `Surveillance Alert: Emerging Validation in ${topic.name}`,
      deltaSummary: `Automated scan detected new empirical preprints matching related concepts (${topic.relatedConcepts.slice(0, 2).join(', ')}) with relevance score exceeding ${topic.relevanceThreshold}%.`,
      whyItMatters: 'Demonstrates active agentic monitoring pipeline tracking newly published evidence across specified sources.',
      significance: 'Moderate',
      confidenceScore: 89,
      confidenceLimitations: ['Demonstration data run generated to illustrate the agentic surveillance trigger.'],
      previousFindings: 'Baseline indexed literature prior to this monitoring cycle.',
      currentFindings: 'Newly indexed preprint confirms ongoing experimental reproducibility.',
      supportingEvidence: ['Consistent metric alignment with historical baseline.'],
      contradictingEvidence: ['Long-term durability tests still underway.'],
      sources: [
        {
          id: `src-${Date.now()}`,
          title: `Preprint: Automated Surveillance Analysis on ${topic.name}`,
          publisher: topic.preferredSources[0] || 'Peer Repository Index',
          url: 'https://doi.org/10.1000/researchpulse-surveillance-demo',
          publishedAt: new Date().toISOString(),
          reliability: 'Institutional Advisory'
        }
      ],
      publishedAt: new Date().toISOString(),
      detectedAt: new Date().toISOString(),
      isRead: false
    }
  };
}
