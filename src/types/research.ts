export type ResearchCategory = 
  | 'General Research'
  | 'Technology & AI'
  | 'Education & Careers'
  | 'Science & Environment'
  | 'Business';

export type ResearchDepth = 
  | 'Quick Summary'
  | 'Detailed Report'
  | 'Deep Research';

export type InformationPeriod = 
  | 'Latest'
  | 'Historical'
  | 'Both';

export interface ResearchQuery {
  id: string;
  topic: string;
  category: ResearchCategory;
  depth: ResearchDepth;
  period: InformationPeriod;
  createdAt: string;
  isFavorite?: boolean;
}

export interface KeyFinding {
  id: string;
  title: string;
  metric?: string;
  metricLabel?: string;
  trend?: 'positive' | 'negative' | 'neutral';
  description: string;
  impact: 'High' | 'Moderate' | 'Strategic';
  confidence: number; // 0 - 100
}

export interface SourceComparison {
  id: string;
  sourceName: string;
  institutionOrDomain: string;
  publicationType: string;
  coreThesis: string;
  methodology: string;
  consensusAlignment: 'Consensus' | 'Divergent' | 'Pioneering';
  sampleSizeOrScope: string;
  url?: string;
}

export interface Reference {
  id: string;
  title: string;
  authors: string;
  publication: string;
  year: string;
  url: string;
  doiOrCitation?: string;
  domain: string;
}

export interface ExecutiveSummary {
  overview: string;
  strategicTakeaways: string[];
  macroContext: string;
}

export interface Conclusion {
  synthesis: string;
  risksAndUncertainties: string[];
  actionableRecommendations: string[];
}

export interface ResearchReport {
  id: string;
  query: ResearchQuery;
  title: string;
  subtitle: string;
  isMockData: boolean;
  generatedAt: string;
  readingTimeMinutes: number;
  executiveSummary: ExecutiveSummary;
  keyFindings: KeyFinding[];
  sourceComparison: SourceComparison[];
  conclusion: Conclusion;
  references: Reference[];
}

export interface WebhookConfig {
  url: string;
  enabled: boolean;
  secretToken?: string;
  timeoutMs: number;
}
