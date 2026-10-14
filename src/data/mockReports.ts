import { ResearchReport, ResearchCategory, ResearchDepth, InformationPeriod } from '../types/research';

export const INITIAL_DEMO_REPORTS: ResearchReport[] = [
  {
    id: 'report-demo-1',
    query: {
      id: 'query-1',
      topic: 'Solid-State Battery Commercialization: Automotive Milestones and Supply Chain Bottlenecks',
      category: 'Science & Environment',
      depth: 'Deep Research',
      period: 'Both',
      createdAt: '2026-10-12T14:30:00.000Z',
      isFavorite: true,
    },
    title: 'Solid-State Battery Commercialization: Automotive Milestones and Supply Chain Bottlenecks',
    subtitle: 'Comprehensive evaluation of sulfide- vs oxide-electrolyte scalability, cost parity trajectories, and OEM production timelines.',
    isMockData: true,
    generatedAt: '2026-10-12T14:32:15.000Z',
    readingTimeMinutes: 7,
    executiveSummary: {
      overview: 'Solid-state battery (SSB) architectures represent the next evolutionary leap beyond liquid-electrolyte lithium-ion systems, offering theoretical gravimetric energy densities exceeding 450 Wh/kg alongside inherently non-flammable solid ceramic or sulfide separators. However, transition from pre-pilot pouch fabrication to gigafactory-scale production faces acute processing hurdles, notably interfacial dendrite suppression under high C-rate cycling and lithium metal foil volumetric expansion.',
      macroContext: 'Automotive tier-1 manufacturers have revised commercial ramp-up curves from optimistic 2025 deadlines toward 2027–2030 phased hybrid rollouts. Initial deployments will target high-performance flagship electric vehicles where cost-per-kilowatt-hour elasticity is higher.',
      strategicTakeaways: [
        'Sulfide-based electrolytes show the highest room-temperature ionic conductivity (~10⁻² S/cm) but require stringent dry-room moisture controls (< -50°C dew point) to prevent toxic hydrogen sulfide outgassing.',
        'Cost parity with conventional lithium-iron-phosphate (LFP) cells ($65/kWh) is unlikely prior to 2032; initial cell costs are projected at $140–$180/kWh through 2028.',
        'Semi-solid architectures incorporating 5–10% gel polymer electrolyte provide an immediate transitional bridge, reducing retooling capital expenditure by up to 60% compared to all-solid lines.'
      ]
    },
    keyFindings: [
      {
        id: 'kf-1',
        title: 'Energy Density Gain vs Cell-Level Volumetric Stability',
        metric: '+42%',
        metricLabel: 'Wh/kg gravimetric boost',
        trend: 'positive',
        description: 'Test cells leveraging lithium-metal anodes achieved 460 Wh/kg compared to 310 Wh/kg for premium nickel-manganese-cobalt (NMC 811) cylindrical cells. However, unconstrained stack pressure requirements (3–5 MPa) introduce parasitic packaging weight.',
        impact: 'Strategic',
        confidence: 94
      },
      {
        id: 'kf-2',
        title: 'Separator Manufacturing Throughput Deficit',
        metric: '3.8x',
        metricLabel: 'Slower roll-to-roll web speed',
        trend: 'negative',
        description: 'Brittle ceramic oxide membranes (LLZO) exhibit high microcrack propensities at continuous web speeds exceeding 15 meters per minute, resulting in yield losses exceeding 22% during pilot calendering trials.',
        impact: 'High',
        confidence: 88
      },
      {
        id: 'kf-3',
        title: 'Ultra-Thin Lithium Anode Supply Concentration',
        metric: '78%',
        metricLabel: 'Global foil processing localized to East Asia',
        trend: 'neutral',
        description: 'Requirement for sub-20 micron lithium metal ribbons creates single-source vulnerabilities. European and North American domestic gigafactory projects report 18-month lead times on precision extrusion machinery.',
        impact: 'High',
        confidence: 91
      },
      {
        id: 'kf-4',
        title: 'Thermal Runaway Threshold Depolarization',
        metric: '220°C',
        metricLabel: 'Self-heating onset temperature',
        trend: 'positive',
        description: 'All-solid sulfide and composite electrolytes elevated the catastrophic thermal excursion trigger by over 80°C compared to conventional liquid organic carbonates, satisfying UN ECE R100 Rev 3 safety protocols without auxiliary active cooling.',
        impact: 'Strategic',
        confidence: 96
      }
    ],
    sourceComparison: [
      {
        id: 'sc-1',
        sourceName: 'Journal of Power Sources (2025)',
        institutionOrDomain: 'Fraunhofer Institute for Material and Beam Technology',
        publicationType: 'Peer-Reviewed Journal',
        coreThesis: 'Dry-electrode coating combined with sulfide solid electrolytes provides the only viable path to sub-$100/kWh production costs before 2030.',
        methodology: 'Pilot-scale continuous calendering trial on 20Ah multi-layer pouch cells across 1,200 thermal cycles.',
        consensusAlignment: 'Consensus',
        sampleSizeOrScope: '450 cell test matrix under 0.5C/1C cycling',
        url: 'https://doi.org/10.1016/j.jpowsour.2025.234110'
      },
      {
        id: 'sc-2',
        sourceName: 'BloombergNEF Advanced Materials Outlook',
        institutionOrDomain: 'BloombergNEF Energy Transitions Group',
        publicationType: 'Industry Techno-Economic Model',
        coreThesis: 'Mainstream passenger car penetration will remain below 3.5% through 2030 due to unoptimized LFP and sodium-ion competition.',
        methodology: 'Multi-variable CAPEX supply-chain forecasting model covering 48 global battery gigafactory filings.',
        consensusAlignment: 'Consensus',
        sampleSizeOrScope: 'Global projection 2024–2035 across 14 OEMs',
        url: 'https://about.bnef.com/insights/battery-tech-outlook'
      },
      {
        id: 'sc-3',
        sourceName: 'Solid State Ionics Letters',
        institutionOrDomain: 'Tokyo Institute of Technology Solid State Group',
        publicationType: 'Fundamental Physics Study',
        coreThesis: 'Interfacial void formation during high-rate stripping can be countered with pulsed atomic layer deposition (ALD) coatings without external stack pressure.',
        methodology: 'In-situ synchrotron X-ray computed tomography during fast-charging cycles.',
        consensusAlignment: 'Pioneering',
        sampleSizeOrScope: 'Micro-pillar electrochemical testbeds',
        url: 'https://doi.org/10.1016/j.ssi.2026.115890'
      },
      {
        id: 'sc-4',
        sourceName: 'Automotive Cells Consortium Technical Bulletin',
        institutionOrDomain: 'European Battery Alliance Working Group 3',
        publicationType: 'Regulatory & Standards Whitepaper',
        coreThesis: 'Automakers will adopt semi-solid lithium-metal architectures by 2026 as a lower-risk intermediate before committing to zero-liquid lines.',
        methodology: 'Delphi consensus study involving 32 Chief Battery Officers from European and US automotive manufacturers.',
        consensusAlignment: 'Divergent',
        sampleSizeOrScope: '32 automotive OEMs and Tier 1 suppliers',
        url: 'https://eba250.com/automotive-working-group-report'
      }
    ],
    conclusion: {
      synthesis: 'Solid-state batteries are steadily progressing through pilot validation, but economic realities dictate a phased market entry. Premium performance vehicles and high-altitude drones will absorb high early fabrication premiums, providing scale to refine roll-to-roll machinery before mass-market automotive parity in the early 2030s.',
      risksAndUncertainties: [
        'Rapid advancements in silicon-dominant liquid NMC and manganese-rich LFMP cells threaten the economic delta of early solid-state cells.',
        'High capital obsolescence risk for early gigafactory adopters if sulfide chemistry is displaced by halide or hybrid polymeric composites.',
        'Geopolitical concentration of ultra-thin lithium ribbon extrusion capabilities in single jurisdictions.'
      ],
      actionableRecommendations: [
        'OEMs should establish flexible pack architectures capable of accepting both semi-solid pouch and legacy cylindrical formats to hedge platform investments.',
        'Supply chain directors must lock in long-term raw material supply contracts for battery-grade lithium sulfide (Li₂S) precursor purity.',
        'Research institutions should prioritize zero-external-pressure interfacial stabilization to eliminate heavy vehicle pack containment frames.'
      ]
    },
    references: [
      {
        id: 'ref-1',
        title: 'Mechanisms of lithium dendrite penetration through solid electrolyte separators under high current densities',
        authors: 'K. Richter, M. Janek, et al.',
        publication: 'Nature Energy',
        year: '2025',
        url: 'https://nature.com/articles/s41560-025-01422-x',
        doiOrCitation: 'doi:10.1038/s41560-025-01422-x',
        domain: 'nature.com'
      },
      {
        id: 'ref-2',
        title: 'Global Battery Supply Chain & Solid State Readiness Index',
        authors: 'International Energy Agency (IEA)',
        publication: 'IEA Clean Tech Report Series',
        year: '2026',
        url: 'https://iea.org/reports/global-ev-outlook-2026',
        doiOrCitation: 'IEA-2026-GEO-SSB',
        domain: 'iea.org'
      },
      {
        id: 'ref-3',
        title: 'Interfacial Engineering for High-Rate All-Solid-State Lithium Batteries',
        authors: 'H. Yamada, S. Lee, Y. Chen',
        publication: 'Advanced Materials & Interfaces',
        year: '2025',
        url: 'https://onlinelibrary.wiley.com/doi/10.1002/adma.20250089',
        doiOrCitation: 'doi:10.1002/adma.20250089',
        domain: 'wiley.com'
      },
      {
        id: 'ref-4',
        title: 'Techno-economic comparison of roll-to-roll ceramic vs sulfide electrolyte manufacturing lines',
        authors: 'US Department of Energy Vehicle Technologies Office',
        publication: 'NREL Technical Report',
        year: '2026',
        url: 'https://nrel.gov/docs/fy26osti/89412.pdf',
        doiOrCitation: 'NREL/TP-5400-89412',
        domain: 'nrel.gov'
      }
    ]
  },
  {
    id: 'report-demo-2',
    query: {
      id: 'query-2',
      topic: 'Autonomous Multi-Agent AI Architectures in Enterprise Decision Workflows',
      category: 'Technology & AI',
      depth: 'Detailed Report',
      period: 'Latest',
      createdAt: '2026-10-10T09:15:00.000Z',
      isFavorite: false,
    },
    title: 'Autonomous Multi-Agent AI Architectures in Enterprise Decision Workflows',
    subtitle: 'Analysis of orchestrator-worker topologies, deterministic guardrails, and auditability in regulated industries.',
    isMockData: true,
    generatedAt: '2026-10-10T09:17:40.000Z',
    readingTimeMinutes: 5,
    executiveSummary: {
      overview: 'Enterprise adoption of AI has shifted from single prompt-response LLM endpoints to federated multi-agent orchestrations. These networks deploy specialized agents (e.g. data retrievers, reasoning verifiers, policy checkers, and executor bots) that collaborate asynchronously to resolve complex operational tasks such as claims adjudication, supply chain exception handling, and automated code migrations.',
      macroContext: 'While standalone model accuracy has plateaued in zero-shot contexts, agentic routing patterns—featuring step-by-step verification and domain-specific tool use—deliver upwards of a 30% reduction in ungrounded hallucinations.',
      strategicTakeaways: [
        'Hierarchical supervisor patterns outperform decentralized peer-to-peer swarms in enterprise governance due to predictable deterministic audit trails.',
        'Human-in-the-loop (HITL) checkpoints placed at transaction authorization boundaries reduce compliance breach risk by 99.4%.',
        'State management serialization and token consumption costs require intelligent model routing (e.g. small edge models for extraction, frontier models for synthesis).'
      ]
    },
    keyFindings: [
      {
        id: 'kf-201',
        title: 'Task Completion Rate in Complex Multi-Step Operations',
        metric: '+34%',
        metricLabel: 'Success rate gain over monolithic prompts',
        trend: 'positive',
        description: 'Multi-agent frameworks utilizing reflective loops and independent critique passes solved 81% of multi-document reconciliations compared to 47% achieved by single monolithic prompting.',
        impact: 'Strategic',
        confidence: 93
      },
      {
        id: 'kf-202',
        title: 'Token Overhead & Latency Penalty',
        metric: '2.9x',
        metricLabel: 'Median latency increase per complex workflow',
        trend: 'negative',
        description: 'Iterative back-and-forth validation between agents significantly inflates inference latency (from 1.2s to 3.5s per workflow) and token consumption, necessitating cost-aware caching layers.',
        impact: 'Moderate',
        confidence: 90
      },
      {
        id: 'kf-203',
        title: 'Deterministic Guardrail Enforcement',
        metric: '99.8%',
        metricLabel: 'Compliance with deterministic policy checks',
        trend: 'positive',
        description: 'Embedding PII redaction and policy validation agents as non-negotiable intermediate proxies prevented regulatory leakage in 998 of 1,000 synthetic stress tests.',
        impact: 'Strategic',
        confidence: 97
      }
    ],
    sourceComparison: [
      {
        id: 'sc-201',
        sourceName: 'IEEE Transactions on Software Engineering',
        institutionOrDomain: 'Carnegie Mellon University AI Institute',
        publicationType: 'Academic Research',
        coreThesis: 'State machine driven agent topologies with bounded execution graphs prevent runaway recursive loops.',
        methodology: 'Empirical benchmark across 5,000 corporate IT automation scripts.',
        consensusAlignment: 'Consensus',
        sampleSizeOrScope: '5,000 scripts across 12 enterprise domains',
        url: 'https://ieeexplore.ieee.org/document/9876543'
      },
      {
        id: 'sc-202',
        sourceName: 'Gartner Research Note: Hyperautomation Topologies',
        institutionOrDomain: 'Gartner Enterprise Architecture Group',
        publicationType: 'Industry Advisory',
        coreThesis: 'By 2027, 40% of enterprise software will be powered by autonomous agentic modules rather than static workflow engines.',
        methodology: 'Annual CIO and VP of Engineering survey across North America and EMEA.',
        consensusAlignment: 'Consensus',
        sampleSizeOrScope: '1,420 Enterprise IT Executives',
        url: 'https://gartner.com/en/documents/ai-agent-frameworks-2026'
      },
      {
        id: 'sc-203',
        sourceName: 'MIT CSAIL Working Papers',
        institutionOrDomain: 'Massachusetts Institute of Technology',
        publicationType: 'Preprint',
        coreThesis: 'Decentralized bidding consensus mechanisms among autonomous agents yield superior resource allocation in dynamic supply chains.',
        methodology: 'Agent-based simulation on multi-echelon global shipping networks.',
        consensusAlignment: 'Pioneering',
        sampleSizeOrScope: '10,000 simulated logistics nodes',
        url: 'https://csail.mit.edu/research/multi-agent-consensus'
      }
    ],
    conclusion: {
      synthesis: 'Autonomous agentic frameworks are transitioning from proof-of-concept novelty to the backbone of enterprise automation. Winning architectures will marry probabilistic frontier reasoning with hard deterministic guardrails, immutable ledger logging, and tiered cost routing.',
      risksAndUncertainties: [
        'Cascading error propagation where an early hallucination corrupts downstream agent reasoning passes.',
        'Lack of standardized open protocols for inter-agent communication across heterogeneous vendor ecosystems.',
        'Spiraling API costs during edge case troubleshooting loops.'
      ],
      actionableRecommendations: [
        'Implement strict execution depth caps and circuit breakers on all iterative agent loops.',
        'Deploy deterministic regex and Pydantic/Zod schema validators at every inter-agent message boundary.',
        'Maintain a centralized human audit console for any action impacting external financial or customer accounts.'
      ]
    },
    references: [
      {
        id: 'ref-201',
        title: 'Architectures for Autonomous Collaborative LLM Agents: A Systematic Review',
        authors: 'A. Zhang, D. Patel, R. Wu',
        publication: 'ACM Computing Surveys',
        year: '2025',
        url: 'https://dl.acm.org/doi/10.1145/3678912',
        doiOrCitation: 'doi:10.1145/3678912',
        domain: 'acm.org'
      },
      {
        id: 'ref-202',
        title: 'Enterprise Safety Rails for Agentic Systems',
        authors: 'OpenAI Enterprise Solutions Research',
        publication: 'Technical Whitepaper',
        year: '2026',
        url: 'https://openai.com/research/enterprise-agent-guardrails',
        doiOrCitation: 'WP-2026-AG-04',
        domain: 'openai.com'
      }
    ]
  },
  {
    id: 'report-demo-3',
    query: {
      id: 'query-3',
      topic: 'Longitudinal Impact of Hybrid Work Models on Knowledge-Worker Retention and Innovation Velocity',
      category: 'Business',
      depth: 'Quick Summary',
      period: 'Latest',
      createdAt: '2026-10-08T11:20:00.000Z',
      isFavorite: false,
    },
    title: 'Longitudinal Impact of Hybrid Work Models on Knowledge-Worker Retention and Innovation Velocity',
    subtitle: 'Synthesizing 4-year empirical workforce data across Fortune 500 technology and financial organizations.',
    isMockData: true,
    generatedAt: '2026-10-08T11:21:45.000Z',
    readingTimeMinutes: 3,
    executiveSummary: {
      overview: 'Structured hybrid work models (2–3 designated in-office days) have emerged as the dominant long-term equilibrium for knowledge-intensive industries. Long-term empirical tracking confirms that structured hybrid policies match or slightly exceed full in-office teams in patent outputs and software release velocity, while reducing involuntary turnover by 33%.',
      macroContext: 'Rigid mandatory five-day in-office mandates triggered significant senior engineering attrition, disproportionately impacting specialized technical teams and diverse talent pools.',
      strategicTakeaways: [
        'Structured in-office synchronization (clustering team days) delivers 4x higher serendipitous cross-functional collaboration than unstructured "free choice" attendance.',
        'Voluntary resignation rates for knowledge workers forced to return 5 days full-time were 2.4x higher than peers with 2-day remote flexibility.',
        'Asynchronous documentation hygiene is the primary operational determinant of high performance in distributed workflows.'
      ]
    },
    keyFindings: [
      {
        id: 'kf-301',
        title: 'Turnover Reduction in Structured Hybrid Teams',
        metric: '-33%',
        metricLabel: 'Reduction in voluntary resignation rates',
        trend: 'positive',
        description: 'Tracking across 18,000 knowledge workers demonstrated consistent retention advantages for teams offering 2 days of remote work flexibility per week.',
        impact: 'High',
        confidence: 95
      },
      {
        id: 'kf-302',
        title: 'Patent & Invention Disclosures Trajectory',
        metric: '+6.2%',
        metricLabel: 'Net increase in novel patents filed',
        trend: 'positive',
        description: 'Fears of innovation decay were disproven in organizations that actively reserved in-office days for hackathons, design sprints, and cross-team planning.',
        impact: 'Strategic',
        confidence: 89
      }
    ],
    sourceComparison: [
      {
        id: 'sc-301',
        sourceName: 'Harvard Business Review Longitudinal Study',
        institutionOrDomain: 'Harvard Business School Organizational Behavior Unit',
        publicationType: 'Academic Field Experiment',
        coreThesis: 'Coordination of office days among team members is essential; uncoordinated attendance delivers the worst of both worlds.',
        methodology: 'Randomized controlled trial tracking 1,600 engineers and analysts over 36 months.',
        consensusAlignment: 'Consensus',
        sampleSizeOrScope: '1,600 knowledge workers',
        url: 'https://hbr.org/2025/hybrid-work-equilibrium'
      },
      {
        id: 'sc-302',
        sourceName: 'Stanford Institute for Economic Policy Research (SIEPR)',
        institutionOrDomain: 'Stanford University',
        publicationType: 'Policy Paper',
        coreThesis: 'Hybrid working acts as a direct compensation substitute equivalent to an 8% salary enhancement in worker preference surveys.',
        methodology: 'Global Survey of Working Arrangements (G-SWA) spanning 34 countries.',
        consensusAlignment: 'Consensus',
        sampleSizeOrScope: '42,000 respondents worldwide',
        url: 'https://siepr.stanford.edu/publications/hybrid-working-macro'
      }
    ],
    conclusion: {
      synthesis: 'The debate between full remote and full in-office has resolved in favor of intentional, structured hybrid formats. Organizations maximizing productivity establish clear team anchor days while investing heavily in asynchronous knowledge repositories.',
      risksAndUncertainties: [
        'Early-career junior mentorship requires intentional co-location with senior technical leads.',
        'Proximity bias risks creating bifurcated promotion tracks between in-office leaders and hybrid contributors.'
      ],
      actionableRecommendations: [
        'Standardize 2 synchronized department anchor days rather than leaving attendance to individual daily discretion.',
        'Audit performance reviews to guarantee parity between high-attendance and remote-leaning personnel.'
      ]
    },
    references: [
      {
        id: 'ref-301',
        title: 'How Hybrid Working from Home Affects Productivity and Retention',
        authors: 'N. Bloom, R. Han, J. Liang',
        publication: 'Nature',
        year: '2024',
        url: 'https://nature.com/articles/s41586-024-07500-2',
        doiOrCitation: 'doi:10.1038/s41586-024-07500-2',
        domain: 'nature.com'
      }
    ]
  }
];

/**
 * Contextual Demonstration Report Generator:
 * Generates an extensive, highly relevant research report tailored
 * to any custom topic, category, depth, and period input by the user.
 * Explicitly marked as demonstration data with clear disclosures.
 */
export function generateContextualDemoReport(
  topic: string,
  category: ResearchCategory,
  depth: ResearchDepth,
  period: InformationPeriod
): ResearchReport {
  const cleanTopic = topic.trim();
  const reportId = `report-${Date.now()}`;
  const now = new Date().toISOString();

  // Determine reading time & depth multiplier
  let readingTime = 3;
  if (depth === 'Detailed Report') readingTime = 6;
  if (depth === 'Deep Research') readingTime = 9;

  // Generate category-specific insights & metrics
  const categoryThemes: Record<ResearchCategory, {
    institutions: string[];
    journals: string[];
    methodologies: string[];
    metric1: { val: string; label: string };
    metric2: { val: string; label: string };
    metric3: { val: string; label: string };
  }> = {
    'Technology & AI': {
      institutions: ['MIT Computer Science & AI Lab', 'Stanford AI Research Center', 'Max Planck Institute for Informatics', 'IEEE Computer Society'],
      journals: ['IEEE Transactions on Pattern Analysis', 'Journal of Artificial Intelligence Research', 'Nature Machine Intelligence', 'ACM Digital Library'],
      methodologies: ['Controlled algorithmic benchmark on distributed compute clusters', 'Empirical error-rate taxonomy analysis across multi-modal models', 'Multi-tenant synthetic stress-testing and latency evaluation'],
      metric1: { val: '+41.8%', label: 'Compute & efficiency optimization' },
      metric2: { val: '3.4x', label: 'Throughput acceleration factor' },
      metric3: { val: '92.6%', label: 'Verification & safety convergence rate' }
    },
    'Science & Environment': {
      institutions: ['Scripps Institution of Oceanography', 'Lawrence Berkeley National Laboratory', 'ETH Zurich Environmental Physics', 'CERN Applied Science Directorate'],
      journals: ['Nature Climate & Energy', 'Science Advances', 'Environmental Science & Technology', 'PNAS Applied Environmental Chemistry'],
      methodologies: ['Longitudinal atmospheric and materials telemetry over 18-month intervals', 'Life-cycle assessment (LCA) using ISO 14044 methodology', 'High-resolution sensor array telemetry and computational modeling'],
      metric1: { val: '-28.4%', label: 'Carbon intensity footprint reduction' },
      metric2: { val: '89.2%', label: 'Material circularity & recycling index' },
      metric3: { val: '5.1x', label: 'Longevity extension in accelerated stress tests' }
    },
    'Business': {
      institutions: ['Harvard Business School Institute for Strategy', 'Wharton School of Business Analytics', 'McKinsey Global Institute', 'London School of Economics'],
      journals: ['Harvard Business Review', 'Strategic Management Journal', 'Journal of Financial Economics', 'MIT Sloan Management Review'],
      methodologies: ['Econometric regression analysis across 450 enterprise balance sheets', 'Multi-stakeholder Delphi panel and strategic executive interviews', 'Market basket analysis across longitudinal consumer transaction registries'],
      metric1: { val: '+19.5%', label: 'Net margin uplift in scaled adopters' },
      metric2: { val: '2.8x', label: 'Faster capital reinvestment cycle' },
      metric3: { val: '74%', label: 'Adoption readiness among top-quartile firms' }
    },
    'Education & Careers': {
      institutions: ['Columbia Teachers College', 'Stanford Graduate School of Education', 'Oxford Department of Education', 'World Economic Forum Future of Work Center'],
      journals: ['Journal of Educational Psychology', 'Review of Educational Research', 'Learning and Instruction', 'Educational Technology Research & Development'],
      methodologies: ['Double-blind randomized classroom intervention across 2,400 learners', '10-year longitudinal workforce skills transition cohort study', 'Psychometric validation and adaptive mastery tracking benchmarks'],
      metric1: { val: '+33.2%', label: 'Concept retention & recall score' },
      metric2: { val: '-45%', label: 'Time-to-proficiency in technical tracks' },
      metric3: { val: '88.4%', label: 'Self-reported career role alignment' }
    },
    'General Research': {
      institutions: ['Pew Research Center', 'Brookings Institution Global Policy Center', 'National Academy of Sciences', 'Oxford Internet Institute'],
      journals: ['Nature Human Behaviour', 'Public Opinion Quarterly', 'Journal of Cross-Disciplinary Research', 'Royal Society Open Science'],
      methodologies: ['Cross-national representative probability sampling (N=8,500)', 'Qualitative thematic synthesis across 120 global policy frameworks', 'Meta-analytic synthesis of 64 published peer-reviewed studies'],
      metric1: { val: '67.8%', label: 'Cross-demographic consensus rate' },
      metric2: { val: '2.2x', label: 'Public awareness increase over 3 years' },
      metric3: { val: '81.5%', label: 'Evidence-based policy alignment score' }
    }
  };

  const theme = categoryThemes[category] || categoryThemes['General Research'];

  const periodContext = period === 'Latest' 
    ? 'Recent contemporary developments (2024–2026) indicate sharp accelerating inflection points.' 
    : period === 'Historical'
    ? 'Historical foundation from the preceding 25 years establishes the fundamental empirical baseline.'
    : 'Synthesizing historical trajectories alongside the latest 2025–2026 breakthrough literature reveals both cyclical patterns and paradigm disruptions.';

  return {
    id: reportId,
    query: {
      id: `query-${Date.now()}`,
      topic: cleanTopic,
      category,
      depth,
      period,
      createdAt: now,
      isFavorite: false,
    },
    title: cleanTopic,
    subtitle: `Structured multi-source synthesis, methodology comparison, and strategic assessment within ${category}.`,
    isMockData: true,
    generatedAt: now,
    readingTimeMinutes: readingTime,
    executiveSummary: {
      overview: `This report investigates "${cleanTopic}". Cross-sectional synthesis reveals key operational inflections, structural opportunities, and lingering systemic barriers. ${periodContext} Contemporary practitioners must balance immediate implementation gains against downstream scalability, standard governance, and cost elasticity.`,
      macroContext: `Within the broader landscape of ${category}, "${cleanTopic}" has evolved from an exploratory concept into an active strategic priority. Regulatory considerations, infrastructure requirements, and stakeholder alignment remain critical determinants of sustained success.`,
      strategicTakeaways: [
        `Primary consensus indicates that early adopters achieve ${theme.metric1.val} ${theme.metric1.label.toLowerCase()} compared to baseline operational benchmarks.`,
        `Methodological divergence persists regarding cost-to-scale ratios, with tier-1 institutions recommending modular, phased deployment over monolithic migration.`,
        `Cross-source validation highlights that data governance and standardization represent the highest-risk single point of friction across all surveyed implementations.`
      ]
    },
    keyFindings: [
      {
        id: `kf-${reportId}-1`,
        title: `Primary Impact: ${theme.metric1.label}`,
        metric: theme.metric1.val,
        metricLabel: theme.metric1.label,
        trend: 'positive',
        description: `Rigorous multi-site evaluations of "${cleanTopic}" demonstrated strong empirical gains. Standardized measurement protocols recorded high reproducibility across diverse testing environments.`,
        impact: 'Strategic',
        confidence: 94
      },
      {
        id: `kf-${reportId}-2`,
        title: `Operational Velocity: ${theme.metric2.label}`,
        metric: theme.metric2.val,
        metricLabel: theme.metric2.label,
        trend: 'positive',
        description: `Automated workflows and disciplined protocols reduced workflow bottlenecks, delivering measurable speed improvements across continuous evaluation cycles.`,
        impact: 'High',
        confidence: 89
      },
      {
        id: `kf-${reportId}-3`,
        title: `System Reliability & Alignment: ${theme.metric3.label}`,
        metric: theme.metric3.val,
        metricLabel: theme.metric3.label,
        trend: 'neutral',
        description: `While primary indicators trend positively, edge-case failure modes and compliance validation require ongoing oversight and explicit verification gates.`,
        impact: depth === 'Quick Summary' ? 'Moderate' : 'Strategic',
        confidence: 92
      }
    ],
    sourceComparison: [
      {
        id: `sc-${reportId}-1`,
        sourceName: `${theme.journals[0]} (2025 Volume)`,
        institutionOrDomain: theme.institutions[0],
        publicationType: 'Peer-Reviewed Journal',
        coreThesis: `Empirical validation confirms that "${cleanTopic}" yields optimal outcomes when deployed with structured, continuous telemetry.`,
        methodology: theme.methodologies[0],
        consensusAlignment: 'Consensus',
        sampleSizeOrScope: 'Multi-institutional cohort (N=1,240 test points)',
        url: 'https://doi.org/10.1000/researchpulse-2025-01'
      },
      {
        id: `sc-${reportId}-2`,
        sourceName: `${theme.institutions[1]} Special Report`,
        institutionOrDomain: theme.institutions[1],
        publicationType: 'Institutional Advisory Paper',
        coreThesis: `Cost structures and legacy integration friction may delay broad commercial adoption unless standardized open frameworks are instituted.`,
        methodology: theme.methodologies[1],
        consensusAlignment: 'Consensus',
        sampleSizeOrScope: '48 industry stakeholders across 6 geographic regions',
        url: 'https://doi.org/10.1000/researchpulse-2025-02'
      },
      {
        id: `sc-${reportId}-3`,
        sourceName: `${theme.journals[1]} Perspectives`,
        institutionOrDomain: theme.institutions[2],
        publicationType: 'Frontier Review',
        coreThesis: `A decentralized, modular architecture provides superior resilience against single-point failure modes in "${cleanTopic}".`,
        methodology: theme.methodologies[2],
        consensusAlignment: 'Pioneering',
        sampleSizeOrScope: 'Computational simulation over 100,000 operational cycles',
        url: 'https://doi.org/10.1000/researchpulse-2025-03'
      }
    ],
    conclusion: {
      synthesis: `The body of research on "${cleanTopic}" points toward accelerating convergence. Organizations and analysts who invest in rigorous baseline measurements, standard data formats, and agile testing frameworks will capture outsized strategic advantages while mitigating deployment fragility.`,
      risksAndUncertainties: [
        'Interoperability hurdles between proprietary legacy stacks and next-generation frameworks.',
        'Fluctuating regulatory compliance guidelines across European, North American, and Asian jurisdictions.',
        'High skill specialization prerequisites creating talent acquisition bottlenecks during early rollout.'
      ],
      actionableRecommendations: [
        `Initiate a low-risk, bounded pilot evaluating "${cleanTopic}" on a representative subsystem before enterprise-wide commitment.`,
        'Establish automated audit logging and quantitative KPIs matching the indicators outlined in this synthesis.',
        'Engage cross-functional working groups (engineering, legal, operations) at inception to address governance requirements early.'
      ]
    },
    references: [
      {
        id: `ref-${reportId}-1`,
        title: `Comprehensive Analysis of ${cleanTopic}: Frameworks, Benchmarks, and Future Directions`,
        authors: 'D. Vance, S. Al-Mansoor, E. Lindqvist',
        publication: theme.journals[0],
        year: '2025',
        url: 'https://scholar.google.com/scholar?q=' + encodeURIComponent(cleanTopic),
        doiOrCitation: 'doi:10.1016/j.res.2025.10984',
        domain: 'scholar.google.com'
      },
      {
        id: `ref-${reportId}-2`,
        title: `Technological and Strategic Horizons in ${category}`,
        authors: `${theme.institutions[0]} Research Taskforce`,
        publication: `${theme.journals[1]} Annual Monograph`,
        year: '2026',
        url: 'https://doi.org/10.1145/researchpulse.2026',
        doiOrCitation: 'ACM/IEEE-2026-RP-99',
        domain: 'acm.org'
      },
      {
        id: `ref-${reportId}-3`,
        title: `Comparative Empirical Methodologies for ${cleanTopic}`,
        authors: 'H. Tanaka, M. Rossi, C. Thorne',
        publication: theme.journals[2] || 'Global Research Proceedings',
        year: '2025',
        url: 'https://doi.org/10.1038/s41586-025-09144',
        doiOrCitation: 'doi:10.1038/s41586-025-09144',
        domain: 'nature.com'
      }
    ]
  };
}

export const CURATED_TOPIC_SUGGESTIONS: {
  topic: string;
  category: ResearchCategory;
  depth: ResearchDepth;
  period: InformationPeriod;
  tagline: string;
}[] = [
  {
    topic: 'Solid-State Battery Commercialization: Automotive Milestones and Supply Chain Bottlenecks',
    category: 'Science & Environment',
    depth: 'Deep Research',
    period: 'Both',
    tagline: 'Energy density vs cost parity trajectories'
  },
  {
    topic: 'Autonomous Multi-Agent AI Architectures in Enterprise Decision Workflows',
    category: 'Technology & AI',
    depth: 'Detailed Report',
    period: 'Latest',
    tagline: 'Orchestrator topologies, guardrails & compliance'
  },
  {
    topic: 'Longitudinal Impact of Hybrid Work Models on Knowledge-Worker Retention and Innovation Velocity',
    category: 'Business',
    depth: 'Quick Summary',
    period: 'Latest',
    tagline: '4-year Fortune 500 workforce data analysis'
  },
  {
    topic: 'Post-Quantum Cryptography Migration: NIST Standards and Banking Infrastructure Readiness',
    category: 'Technology & AI',
    depth: 'Deep Research',
    period: 'Latest',
    tagline: 'FIPS 203/204 implementation & hardware bottlenecks'
  },
  {
    topic: 'Microplastics Bioaccumulation in Marine Food Chains: Trophic Transfer and Human Health Risks',
    category: 'Science & Environment',
    depth: 'Detailed Report',
    period: 'Both',
    tagline: 'Ecotoxicological thresholds & filtration advances'
  },
  {
    topic: 'Adaptive AI Tutoring Systems vs Traditional Curricula: K-12 STEM Mastery Outcomes',
    category: 'Education & Careers',
    depth: 'Detailed Report',
    period: 'Latest',
    tagline: 'Cognitive load, retention rates & learning equity'
  },
  {
    topic: 'Next-Generation Small Modular Reactors (SMRs) for Industrial Heat and Grid Decarbonization',
    category: 'Science & Environment',
    depth: 'Deep Research',
    period: 'Both',
    tagline: 'LCOE economics, licensing pathways & passive safety'
  },
  {
    topic: 'Corporate Venture Capital (CVC) Performance Cycles in High-Interest Rate Environments',
    category: 'Business',
    depth: 'Quick Summary',
    period: 'Historical',
    tagline: 'Strategic alignment vs financial ROI trade-offs'
  }
];
