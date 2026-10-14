export type TopicCategory = 
  | 'Technology & AI'
  | 'Science & Environment'
  | 'Biomedical & Healthcare'
  | 'Energy & Materials'
  | 'Business & Economics';

export type MonitoringFrequency = 'Real-time' | 'Hourly' | 'Daily' | 'Weekly';

export type UpdateSignificance = 'Critical' | 'High' | 'Moderate' | 'Incremental';

export type SourceReliabilityTier = 
  | 'Tier 1 Peer-Reviewed' 
  | 'Institutional Advisory' 
  | 'Preprint Repository' 
  | 'Industry Release / Syndicate';

export interface MonitoredTopic {
  id: string;
  name: string;
  description: string;
  category: TopicCategory;
  relatedConcepts: string[];
  preferredSources: string[];
  excludedTerms: string[];
  relevanceThreshold: number; // 50 to 95%
  frequency: MonitoringFrequency;
  active: boolean;
  createdAt: string;
  lastCheckedAt: string;
  updateCount: number;
  highSignificanceCount: number;
}

export interface SourceCitation {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publishedAt: string;
  reliability: SourceReliabilityTier;
  doi?: string;
}

export interface ResearchUpdate {
  id: string;
  topicId: string;
  topicName: string;
  title: string;
  deltaSummary: string; // What changed
  whyItMatters: string; // Why it matters
  significance: UpdateSignificance;
  confidenceScore: number; // 0 - 100
  confidenceLimitations: string[];
  previousFindings: string;
  currentFindings: string;
  supportingEvidence: string[];
  contradictingEvidence: string[];
  sources: SourceCitation[];
  duplicateGroupId?: string;
  publishedAt: string;
  detectedAt: string;
  isRead?: boolean;
  isBookmarked?: boolean;
}

export interface DuplicateArticle {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publishedAt: string;
  similarityScore: number; // 0 - 100
  isCanonical: boolean;
  syndicateType: 'Primary Source' | 'Direct Syndicate Repost' | 'Derivative Summary' | 'Aggregated Mention';
}

export interface DuplicateGroup {
  id: string;
  canonicalTitle: string;
  underlyingDevelopment: string;
  topicName: string;
  rootEventDate: string;
  clusterCount: number;
  articles: DuplicateArticle[];
}

export interface HistoricalTimelineNode {
  year: string;
  date: string;
  reportedClaim: string;
  quantitativeValue?: string;
  source: string;
  shiftType: 'Baseline' | 'Incremental Refinement' | 'Methodological Revision' | 'Paradigm Shift';
}

export interface HistoricalEvolution {
  id: string;
  topicId: string;
  topicName: string;
  metricOrClaimName: string;
  timeline: HistoricalTimelineNode[];
  historicalDivergenceSummary: string;
  conclusionEvolution: {
    historicalBaseline: string;
    currentConsensus: string;
    majorDiscrepancy: string;
  };
}

export type TrendStatus = 
  | 'Accelerating' 
  | 'Consensus Forming' 
  | 'Diverging / Contested' 
  | 'Insufficient Evidence';

export type TrendConfidenceLevel = 'High' | 'Moderate' | 'Low' | 'Insufficient Data';

export interface TrendAnalysisItem {
  id: string;
  topicId: string;
  topicName: string;
  themeName: string;
  status: TrendStatus;
  confidenceLevel: TrendConfidenceLevel;
  isInsufficient: boolean;
  evidenceSufficiencyRationale: string;
  recurringMentionsCount: number;
  timeSpan: string;
  trajectoryNotes: string;
  dataPoints: Array<{ period: string; count: number; sentimentScore: number }>;
}

export interface AlertSettings {
  minSignificance: UpdateSignificance;
  suppressDuplicatesWindowHours: number;
  muteIncrementalUpdates: boolean;
  webhookAlertsEnabled: boolean;
  webhookUrl: string;
  secretToken?: string;
  emailDigest: 'Off' | 'Daily' | 'Weekly';
  topicMutes: Record<string, boolean>;
}
