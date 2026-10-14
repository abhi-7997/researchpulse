import { ResearchQuery, ResearchReport, WebhookConfig } from '../types/research';
import { generateContextualDemoReport } from '../data/mockReports';

const STORAGE_KEY_WEBHOOK = 'researchpulse_webhook_config';

export const DEFAULT_WEBHOOK_CONFIG: WebhookConfig = {
  url: '',
  enabled: false,
  secretToken: '',
  timeoutMs: 30000,
};

export function getWebhookConfig(): WebhookConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_WEBHOOK);
    if (!raw) return DEFAULT_WEBHOOK_CONFIG;
    return { ...DEFAULT_WEBHOOK_CONFIG, ...JSON.parse(raw) };
  } catch (err) {
    console.warn('Failed to parse webhook config from storage', err);
    return DEFAULT_WEBHOOK_CONFIG;
  }
}

export function saveWebhookConfig(config: WebhookConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_WEBHOOK, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save webhook config', err);
  }
}

export interface WebhookTestResult {
  success: boolean;
  message: string;
  latencyMs: number;
  statusCode?: number;
  payloadSent: Record<string, unknown>;
  responsePreview?: unknown;
}

export async function testWebhookConnection(config: WebhookConfig): Promise<WebhookTestResult> {
  const startTime = performance.now();
  const testPayload = {
    event: 'researchpulse.health_check',
    timestamp: new Date().toISOString(),
    message: 'Testing connection from RESEARCHPULSE AI Assistant',
    client: 'RESEARCHPULSE-v1.0',
  };

  if (!config.url || !config.url.trim()) {
    return {
      success: false,
      message: 'No Webhook URL provided. Please enter a valid HTTP/HTTPS endpoint URL.',
      latencyMs: 0,
      payloadSent: testPayload,
    };
  }

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Client-Source': 'ResearchPulse-Web',
    };

    if (config.secretToken?.trim()) {
      headers['Authorization'] = `Bearer ${config.secretToken.trim()}`;
      headers['X-Webhook-Secret'] = config.secretToken.trim();
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(config.url.trim(), {
      method: 'POST',
      headers,
      body: JSON.stringify(testPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const latencyMs = Math.round(performance.now() - startTime);

    let responseData: unknown = null;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (response.ok) {
      return {
        success: true,
        message: `Webhook endpoint responded with HTTP ${response.status} (${latencyMs}ms). Connection established!`,
        latencyMs,
        statusCode: response.status,
        payloadSent: testPayload,
        responsePreview: responseData,
      };
    } else {
      return {
        success: false,
        message: `Endpoint returned HTTP status ${response.status} (${response.statusText || 'Error'}). Check your n8n workflow active status or webhook path.`,
        latencyMs,
        statusCode: response.status,
        payloadSent: testPayload,
        responsePreview: responseData,
      };
    }
  } catch (error: any) {
    const latencyMs = Math.round(performance.now() - startTime);
    if (error.name === 'AbortError') {
      return {
        success: false,
        message: 'Connection timed out after 8 seconds. Please check that your n8n server is publicly accessible and responding.',
        latencyMs,
        payloadSent: testPayload,
      };
    }

    // CORS or Network error
    return {
      success: false,
      message: `Network/CORS error: ${error.message || 'Unable to connect to endpoint'}. Make sure your n8n instance allows CORS requests or use an n8n webhook configured with "Respond to Webhook".`,
      latencyMs,
      payloadSent: testPayload,
    };
  }
}

export type ProgressStepCallback = (step: string, percentage: number) => void;

/**
 * Execute research: either dispatches to live n8n webhook if enabled,
 * or runs the demonstration research pipeline with high-fidelity contextual synthesis.
 */
export async function executeResearch(
  query: ResearchQuery,
  config: WebhookConfig,
  onProgress?: ProgressStepCallback
): Promise<ResearchReport> {
  // If Live n8n webhook is explicitly configured and enabled
  if (config.enabled && config.url && config.url.trim()) {
    onProgress?.('Transmitting payload to n8n webhook...', 15);

    const payload = {
      event: 'research.requested',
      queryId: query.id,
      topic: query.topic,
      category: query.category,
      depth: query.depth,
      period: query.period,
      timestamp: query.createdAt,
      metadata: {
        client: 'RESEARCHPULSE-Web-1.0',
        requestedFields: ['executiveSummary', 'keyFindings', 'sourceComparison', 'conclusion', 'references'],
      },
    };

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (config.secretToken) {
        headers['Authorization'] = `Bearer ${config.secretToken.trim()}`;
      }

      onProgress?.('Executing AI research workflow in n8n...', 45);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeoutMs || 30000);

      const response = await fetch(config.url.trim(), {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      onProgress?.('Parsing response payload...', 85);

      if (!response.ok) {
        throw new Error(`n8n Webhook returned HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Check if data is already in ResearchReport shape
      if (data && data.executiveSummary && data.keyFindings) {
        onProgress?.('Finalizing report...', 100);
        return {
          ...data,
          id: data.id || `report-${Date.now()}`,
          isMockData: false,
          generatedAt: new Date().toISOString(),
          query,
        };
      }

      // If n8n returned a generic summary text or unstructured response, adapt it
      onProgress?.('Synthesizing structured report...', 100);
      return {
        id: `report-${Date.now()}`,
        query,
        title: data.title || query.topic,
        subtitle: data.subtitle || `AI-synthesized research report for ${query.category}`,
        isMockData: false,
        generatedAt: new Date().toISOString(),
        readingTimeMinutes: 5,
        executiveSummary: {
          overview: typeof data.summary === 'string' ? data.summary : (data.overview || 'Live synthesis completed via n8n webhook.'),
          macroContext: data.macroContext || 'Data extracted and analyzed via connected n8n agent workflow.',
          strategicTakeaways: Array.isArray(data.takeaways) ? data.takeaways : [
            'Report successfully returned from n8n webhook execution pipeline.',
            'Review key findings and primary evidence for validation.',
            'Continuous monitoring advised.'
          ],
        },
        keyFindings: Array.isArray(data.keyFindings) ? data.keyFindings : [
          {
            id: 'n8n-kf-1',
            title: 'Primary Webhook Observation',
            description: typeof data.details === 'string' ? data.details : JSON.stringify(data).slice(0, 300),
            impact: 'Strategic',
            confidence: 90,
          }
        ],
        sourceComparison: Array.isArray(data.sourceComparison) ? data.sourceComparison : [],
        conclusion: {
          synthesis: data.conclusion || 'Research completed via n8n integration.',
          risksAndUncertainties: Array.isArray(data.risks) ? data.risks : ['Cross-verify external citations with primary repository index.'],
          actionableRecommendations: Array.isArray(data.recommendations) ? data.recommendations : ['Review synthesized findings with team stakeholders.'],
        },
        references: Array.isArray(data.references) ? data.references : [],
      };
    } catch (err: any) {
      console.error('n8n Webhook execution error:', err);
      throw new Error(`Webhook execution failed: ${err.message || 'Could not connect to n8n'}. You can disable the webhook in settings to use Demo Mode.`);
    }
  }

  // --- DEMONSTRATION MODE PIPELINE ---
  // Realistic multi-step pipeline progression
  onProgress?.('Formulating research taxonomy and query decomposition...', 20);
  await new Promise((r) => setTimeout(r, 600));

  onProgress?.('Scanning indexed literature, preprints & institutional publications...', 45);
  await new Promise((r) => setTimeout(r, 700));

  onProgress?.('Extracting consensus points, methodologies, and cross-source divergences...', 72);
  await new Promise((r) => setTimeout(r, 700));

  onProgress?.('Compiling executive brief, structured findings, and citation matrix...', 92);
  await new Promise((r) => setTimeout(r, 500));

  onProgress?.('Finalizing report...', 100);
  await new Promise((r) => setTimeout(r, 200));

  return generateContextualDemoReport(query.topic, query.category, query.depth, query.period);
}
