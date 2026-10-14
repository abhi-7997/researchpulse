import {
  MonitoredTopic,
  ResearchUpdate,
  DuplicateGroup,
  HistoricalEvolution,
  TrendAnalysisItem,
  AlertSettings
} from '../types/monitoring';

export const INITIAL_TOPICS: MonitoredTopic[] = [
  {
    id: 'topic-ssb',
    name: 'Solid-State Battery Electrolytes & Scalability',
    description: 'Continuous surveillance of sulfide, oxide, and composite solid-state electrolyte breakthroughs, interfacial dendrite suppression, and roll-to-roll pilot manufacturing.',
    category: 'Energy & Materials',
    relatedConcepts: ['Sulfide electrolytes', 'Lithium metal anode', 'Ionic conductivity', 'Interfacial resistance', 'Dry battery electrode (DBE)'],
    preferredSources: ['Nature Energy', 'Journal of Power Sources', 'Advanced Energy Materials', 'US Department of Energy VTO', 'Battery500 Consortium'],
    excludedTerms: ['Lead-acid', 'Consumer coin-cell toys', 'Sodium-ion low-voltage'],
    relevanceThreshold: 80,
    frequency: 'Daily',
    active: true,
    createdAt: '2026-09-01T08:00:00.000Z',
    lastCheckedAt: '2026-10-13T18:00:00.000Z',
    updateCount: 14,
    highSignificanceCount: 4,
  },
  {
    id: 'topic-agents',
    name: 'Multi-Agent AI Reasoning & Deterministic Guardrails',
    description: 'Monitoring orchestrator-worker architectures, state graph reliability, deterministic validation wrappers, and token latency trade-offs in enterprise agent workflows.',
    category: 'Technology & AI',
    relatedConcepts: ['Hierarchical agent supervision', 'Deterministic guardrails', 'Tool calling fidelity', 'Hallucination bounding', 'Multi-turn debate'],
    preferredSources: ['ArXiv CS.AI / CS.SE', 'IEEE Transactions on Software Engineering', 'ACM Computing Surveys', 'OpenAI Technical Bulletins', 'Anthropic Frontier Safety'],
    excludedTerms: ['Crypto trading bots', 'Discord moderation bots', 'Toy text adventures'],
    relevanceThreshold: 75,
    frequency: 'Real-time',
    active: true,
    createdAt: '2026-09-15T10:30:00.000Z',
    lastCheckedAt: '2026-10-13T21:45:00.000Z',
    updateCount: 22,
    highSignificanceCount: 7,
  },
  {
    id: 'topic-pqc',
    name: 'Post-Quantum Cryptography in Financial Infrastructure',
    description: 'Tracking NIST standard implementation (ML-KEM / ML-DSA), Hardware Security Module (HSM) microcode updates, and banking protocol latencies.',
    category: 'Technology & AI',
    relatedConcepts: ['FIPS 203 ML-KEM', 'FIPS 204 ML-DSA', 'Lattice-based cryptography', 'SWIFT migration', 'Hardware Security Module throughput'],
    preferredSources: ['NIST Computer Security Resource Center', 'Bank for International Settlements (BIS)', 'IEEE Security & Privacy', 'IETF PQC Working Group'],
    excludedTerms: ['Cryptocurrency speculative trading', 'NFT smart contracts'],
    relevanceThreshold: 85,
    frequency: 'Daily',
    active: true,
    createdAt: '2026-09-20T12:00:00.000Z',
    lastCheckedAt: '2026-10-13T16:20:00.000Z',
    updateCount: 9,
    highSignificanceCount: 3,
  },
  {
    id: 'topic-mrna',
    name: 'mRNA Neoantigen Cancer Vaccines & Immunotherapy',
    description: 'Tracking individualized neoantigen synthesis pipelines, adjuvant formulations, lipid nanoparticle delivery, and Phase II/III clinical trial survival curves.',
    category: 'Biomedical & Healthcare',
    relatedConcepts: ['Personalized neoantigen', 'CD8+ T-cell expansion', 'Lipid nanoparticle biodistribution', 'Checkpoint inhibitor synergy', 'Recurrence-free survival (RFS)'],
    preferredSources: ['The New England Journal of Medicine', 'Nature Medicine', 'Clinical Cancer Research', 'ASCO Annual Meeting Proceedings', 'NIH ClinicalTrials.gov'],
    excludedTerms: ['Veterinary therapeutics', 'Dermatology cosmetic creams'],
    relevanceThreshold: 80,
    frequency: 'Hourly',
    active: true,
    createdAt: '2026-10-01T09:00:00.000Z',
    lastCheckedAt: '2026-10-13T20:10:00.000Z',
    updateCount: 11,
    highSignificanceCount: 5,
  }
];

export const INITIAL_UPDATES: ResearchUpdate[] = [
  {
    id: 'update-101',
    topicId: 'topic-ssb',
    topicName: 'Solid-State Battery Electrolytes & Scalability',
    title: 'Room-Temperature Halide-Sulfide Composite Attains 12 mS/cm Ionic Conductivity Under Zero External Pressure',
    deltaSummary: 'Demonstrates a synthesized composite electrolyte combining lithium oxyhalide with sulfide matrices that eliminates the long-standing requirement for heavy vehicle pack containment frames (3–5 MPa stack pressure).',
    whyItMatters: 'Removes the single largest engineering parasitic weight penalty in automotive solid-state packs, potentially unlocking 450+ Wh/kg at the battery pack system level rather than cell-only level.',
    significance: 'Critical',
    confidenceScore: 92,
    confidenceLimitations: [
      'Tested primarily on 2Ah pre-pilot pouch cells; 50Ah+ automotive cell calendering trials pending.',
      'Moisture sensitivity in ambient air requires standard dry-room environment with -50°C dew point during fabrication.',
      'Raw material availability of precursor niobium/scandium dopants remains supply-chain constrained.'
    ],
    previousFindings: 'Earlier 2024–2025 literature asserted that all-solid sulfide cells inevitably form interfacial voids upon fast discharge unless subjected to continuous mechanical compression exceeding 3 MPa.',
    currentFindings: 'Self-healing plastic crystalline behavior in the new halide-sulfide hybrid accommodates lithium volume expansion during 4C discharge cycles without microscopic void formation.',
    supportingEvidence: [
      'In-situ synchrotron X-ray computed tomography confirmed zero void nucleation across 800 cycles.',
      'Coulombic efficiency stabilized at 99.85% across 25°C to 60°C operating temperatures.',
      'Independent reproduction in partner laboratory at Tokyo Institute of Technology validated ionic conductivity readings.'
    ],
    contradictingEvidence: [
      'Fraunhofer Institute test protocol observed accelerated impedance growth at sub-zero temperatures (-20°C).',
      'Cost modeling from BloombergNEF indicates a 28% precursor cost premium over legacy sulfide chemistries.'
    ],
    sources: [
      {
        id: 'src-101a',
        title: 'Zero-pressure room-temperature lithium conduction in halide-sulfide glass-ceramics',
        publisher: 'Nature Energy',
        url: 'https://nature.com/articles/s41560-026-sample',
        publishedAt: '2026-10-11T14:00:00.000Z',
        reliability: 'Tier 1 Peer-Reviewed',
        doi: 'doi:10.1038/s41560-026-01582'
      },
      {
        id: 'src-101b',
        title: 'Techno-economic pack integration report on zero-pressure solid state architectures',
        publisher: 'Battery500 Consortium Technical Bulletin',
        url: 'https://battery500.pnnl.gov/publications/2026-update',
        publishedAt: '2026-10-12T09:30:00.000Z',
        reliability: 'Institutional Advisory'
      }
    ],
    duplicateGroupId: 'dup-ssb-01',
    publishedAt: '2026-10-11T14:00:00.000Z',
    detectedAt: '2026-10-11T14:22:00.000Z',
    isRead: false,
    isBookmarked: true
  },
  {
    id: 'update-102',
    topicId: 'topic-pqc',
    topicName: 'Post-Quantum Cryptography in Financial Infrastructure',
    title: 'NIST Standardizes ML-KEM and ML-DSA: Financial HSM Implementations Reveal 4x Latency Overhead in High-Throughput Settlement',
    deltaSummary: 'First comprehensive hardware benchmark of finalized NIST FIPS 203/204 algorithms on production Tier-1 bank cryptographic accelerators shows key-exchange latency increases from 0.8ms to 3.4ms.',
    whyItMatters: 'High-frequency payment clearing networks (e.g., FedNow, TARGET2, SWIFT) operating on sub-5ms SLA boundaries will require architectural pipelining and co-processor hardware upgrades before mandatory compliance cutoffs.',
    significance: 'High',
    confidenceScore: 95,
    confidenceLimitations: [
      'Tests evaluated PCI-e Hardware Security Modules manufactured between 2022 and 2025; next-gen ASICs not yet commercially available.',
      'Simulated under synthetic peak load of 45,000 transactions/second; real-world cross-border routing may encounter additional TLS handshake jitter.'
    ],
    previousFindings: 'Prior simulation papers estimated post-quantum cipher suites would introduce less than 40% latency inflation on commodity server hardware.',
    currentFindings: 'Memory bus saturation caused by 800-byte to 2.5-kilobyte public key frames (compared to 32-byte Ed25519) produces catastrophic caching thrash in microcode-constrained HSM crypto-chips.',
    supportingEvidence: [
      'Empirical tests across 6 commercial bank testbeds confirmed identical throughput degradation patterns.',
      'NIST CSRC advisory acknowledged key-size impact on legacy packet fragmentation.'
    ],
    contradictingEvidence: [
      'Software-only implementations utilizing AVX-512 vector instructions demonstrated near-linear scaling when not constrained by dedicated tamper-proof cryptographic boundaries.'
    ],
    sources: [
      {
        id: 'src-102a',
        title: 'Post-Quantum Transition in Payment Infrastructure: Microbenchmarks and Architectural Implications',
        publisher: 'Bank for International Settlements (BIS) Working Papers',
        url: 'https://bis.org/publ/work-pqc-2026.htm',
        publishedAt: '2026-10-10T11:00:00.000Z',
        reliability: 'Institutional Advisory'
      },
      {
        id: 'src-102b',
        title: 'FIPS 203 ML-KEM Hardware Acceleration Constraints in Legacy HSM Firmware',
        publisher: 'IEEE Transactions on Computers',
        url: 'https://ieeexplore.ieee.org/document/sample-pqc-2026',
        publishedAt: '2026-10-09T16:00:00.000Z',
        reliability: 'Tier 1 Peer-Reviewed'
      }
    ],
    duplicateGroupId: 'dup-pqc-01',
    publishedAt: '2026-10-10T11:00:00.000Z',
    detectedAt: '2026-10-10T11:45:00.000Z',
    isRead: true,
    isBookmarked: true
  },
  {
    id: 'update-103',
    topicId: 'topic-agents',
    topicName: 'Multi-Agent AI Reasoning & Deterministic Guardrails',
    title: 'Empirical Benchmark across 14 Autonomous Coding Agents: Reflective Self-Critique Reduces Regressions by 31%',
    deltaSummary: 'Systematic comparison demonstrates that deploying an independent secondary critic agent with constrained read-only AST tooling catches semantic regressions that primary generator agents miss.',
    whyItMatters: 'Validates asynchronous multi-agent supervisor patterns over single-pass frontier model generation in mission-critical software refactoring.',
    significance: 'Moderate',
    confidenceScore: 88,
    confidenceLimitations: [
      'Benchmarked exclusively on Python and TypeScript repositories; C++ and embedded systems were excluded from test suite.',
      'Inference cost increased by 2.4x due to double-pass token consumption.'
    ],
    previousFindings: 'Single frontier models with chain-of-thought prompting were previously assumed to perform comparably to multi-agent loops when given identical context windows.',
    currentFindings: 'Independent agent critique prevents model confirmation bias, specifically in boundary condition validation.',
    supportingEvidence: [
      'Evaluation on SWE-bench verified 31% fewer silent logic regressions across 1,200 task runs.'
    ],
    contradictingEvidence: [
      'Diminishing returns observed beyond 2 reflection passes; 3+ passes generated circular pedantic debates in 14% of runs.'
    ],
    sources: [
      {
        id: 'src-103a',
        title: 'Reflective Supervisor Topologies for Autonomous Software Repair',
        publisher: 'ArXiv Preprints (cs.SE)',
        url: 'https://arxiv.org/abs/2610.99881',
        publishedAt: '2026-10-08T09:15:00.000Z',
        reliability: 'Preprint Repository'
      }
    ],
    publishedAt: '2026-10-08T09:15:00.000Z',
    detectedAt: '2026-10-08T09:30:00.000Z',
    isRead: true,
    isBookmarked: false
  },
  {
    id: 'update-104',
    topicId: 'topic-mrna',
    topicName: 'mRNA Neoantigen Cancer Vaccines & Immunotherapy',
    title: 'Phase II Pancreatic Neoantigen Vaccine Reports 68% Recurrence-Free Survival at 36 Months in T-Cell Responders',
    deltaSummary: 'Longitudinal Phase II clinical update confirms sustained CD8+ cytotoxic T-cell memory clones against up to 12 patient-specific neoantigens following adjuvant adjuvant mRNA immunization in resected PDAC.',
    whyItMatters: 'Pancreatic ductal adenocarcinoma historically exhibits median disease recurrence within 12–14 months post-resection; 36-month durable response in responders represents a paradigm inflection point.',
    significance: 'Critical',
    confidenceScore: 94,
    confidenceLimitations: [
      'Single-arm cohort (N=34); randomized Phase III trial against standard adjuvant chemotherapy is currently recruiting.',
      '32% of patients failed to mount detectable neoantigen-specific T-cell responses; predictive biomarker for non-responders remains unidentified.'
    ],
    previousFindings: 'Historically, pancreatic tumors were deemed immunologically "cold" and non-responsive to checkpoint blockade or neoantigen vaccination.',
    currentFindings: 'RNA sequencing coupled with deep-learning HLA-peptide binding prediction successfully elicited polyfunctional de novo T-cell responses that persisted in peripheral blood for over 3 years.',
    supportingEvidence: [
      'T-cell receptor (TCR) sequencing demonstrated continuous clonal expansion of vaccine-induced cytotoxic clones.',
      'Zero systemic Grade 4 toxicities recorded in the safety monitoring committee audit.'
    ],
    contradictingEvidence: [
      'Overall survival curve will require additional 24 months of blinded follow-up to satisfy statutory regulatory endpoints.'
    ],
    sources: [
      {
        id: 'src-104a',
        title: 'Long-term survival and neoantigen-specific T-cell memory in resected pancreatic cancer following individualized mRNA vaccination',
        publisher: 'Nature Medicine',
        url: 'https://nature.com/articles/s41591-026-sample',
        publishedAt: '2026-10-05T15:00:00.000Z',
        reliability: 'Tier 1 Peer-Reviewed',
        doi: 'doi:10.1038/s41591-026-03822'
      }
    ],
    publishedAt: '2026-10-05T15:00:00.000Z',
    detectedAt: '2026-10-05T15:35:00.000Z',
    isRead: false,
    isBookmarked: true
  },
  {
    id: 'update-105',
    topicId: 'topic-agents',
    topicName: 'Multi-Agent AI Reasoning & Deterministic Guardrails',
    title: 'Preprint Survey on European Union AI Act Compliance Checkpoints for High-Risk Healthcare Models',
    deltaSummary: 'Analysis categorizes statutory audit requirements for automated triage agents into 18 mandatory logging and human override gates.',
    whyItMatters: 'Provides enterprise development teams with practical architectural compliance checklists prior to final regulatory enforcement deadlines.',
    significance: 'Incremental',
    confidenceScore: 82,
    confidenceLimitations: [
      'Based on statutory draft interpretations; individual national competent authorities have not issued final testing harmonization decrees.',
      'Literature review without empirical operational trials.'
    ],
    previousFindings: 'General guidance left ambiguity on whether intermediate agent scratchpads constitute auditable personal data under GDPR Article 22.',
    currentFindings: 'Proposes non-retention ephemeral memory models with cryptographic hash verification to satisfy auditability without storing raw patient text.',
    supportingEvidence: [
      'Endorsed by working group participants from 4 EU healthcare consortia.'
    ],
    contradictingEvidence: [
      'Legal scholars contend that cryptographic hashes alone fail to provide "meaningful explanation" mandated by Recital 71.'
    ],
    sources: [
      {
        id: 'src-105a',
        title: 'Architecting for the EU AI Act: Technical Patterns for Regulated Multi-Agent Systems',
        publisher: 'European Law & Technology Review',
        url: 'https://eltr.org/articles/2026-ai-act-agents',
        publishedAt: '2026-10-02T10:00:00.000Z',
        reliability: 'Institutional Advisory'
      }
    ],
    publishedAt: '2026-10-02T10:00:00.000Z',
    detectedAt: '2026-10-02T10:30:00.000Z',
    isRead: true,
    isBookmarked: false
  }
];

export const INITIAL_DUPLICATE_GROUPS: DuplicateGroup[] = [
  {
    id: 'dup-ssb-01',
    canonicalTitle: 'Zero-pressure room-temperature lithium conduction in halide-sulfide glass-ceramics',
    underlyingDevelopment: 'Tokyo Tech & Fraunhofer lab validation of composite solid-state electrolyte with 12 mS/cm conductivity requiring zero pack pressure.',
    topicName: 'Solid-State Battery Electrolytes & Scalability',
    rootEventDate: '2026-10-11T14:00:00.000Z',
    clusterCount: 4,
    articles: [
      {
        id: 'art-1',
        title: 'Zero-pressure room-temperature lithium conduction in halide-sulfide glass-ceramics',
        publisher: 'Nature Energy',
        url: 'https://nature.com/articles/s41560-026-01582',
        publishedAt: '2026-10-11T14:00:00.000Z',
        similarityScore: 100,
        isCanonical: true,
        syndicateType: 'Primary Source'
      },
      {
        id: 'art-2',
        title: 'New Solid-State Battery Material Breaks Conductivity Records Without Heavy Pressing',
        publisher: 'TechCrunch Mobility Hub',
        url: 'https://techcrunch.com/2026/10/11/battery-breakthrough-zero-pressure',
        publishedAt: '2026-10-11T17:30:00.000Z',
        similarityScore: 94,
        isCanonical: false,
        syndicateType: 'Direct Syndicate Repost'
      },
      {
        id: 'art-3',
        title: 'Researchers Announce Holy Grail Battery Separator for Long-Range EVs',
        publisher: 'CleanEnergy Daily Wire',
        url: 'https://cleanenergydaily.com/solid-state-breakthrough',
        publishedAt: '2026-10-12T02:15:00.000Z',
        similarityScore: 91,
        isCanonical: false,
        syndicateType: 'Derivative Summary'
      },
      {
        id: 'art-4',
        title: 'Automotive Battery Watch: Nature Energy Publishes Halide-Sulfide Findings',
        publisher: 'Green Car Congress',
        url: 'https://greencarcongress.com/2026/10/halide-sulfide.html',
        publishedAt: '2026-10-12T08:00:00.000Z',
        similarityScore: 89,
        isCanonical: false,
        syndicateType: 'Aggregated Mention'
      }
    ]
  },
  {
    id: 'dup-pqc-01',
    canonicalTitle: 'NIST Finalizes Post-Quantum Cryptography Standards FIPS 203 and FIPS 204',
    underlyingDevelopment: 'National Institute of Standards and Technology official release of ML-KEM (Module-Lattice-Based Key-Encapsulation Mechanism) and ML-DSA standards.',
    topicName: 'Post-Quantum Cryptography in Financial Infrastructure',
    rootEventDate: '2026-10-09T16:00:00.000Z',
    clusterCount: 3,
    articles: [
      {
        id: 'art-pqc-1',
        title: 'FIPS 203 and 204: NIST Releases Finalized Post-Quantum Encryption Standards',
        publisher: 'NIST CSRC Official Release',
        url: 'https://csrc.nist.gov/publications/detail/fips/203/final',
        publishedAt: '2026-10-09T16:00:00.000Z',
        similarityScore: 100,
        isCanonical: true,
        syndicateType: 'Primary Source'
      },
      {
        id: 'art-pqc-2',
        title: 'Banks Face Race Against Time as NIST Finalizes Quantum-Resistant Cryptography Rules',
        publisher: 'Financial Times Tech Desk',
        url: 'https://ft.com/content/post-quantum-standards-banking',
        publishedAt: '2026-10-09T20:45:00.000Z',
        similarityScore: 92,
        isCanonical: false,
        syndicateType: 'Derivative Summary'
      },
      {
        id: 'art-pqc-3',
        title: 'NIST Post-Quantum Standards Finalized: What IT Security Officers Must Do Now',
        publisher: 'Dark Reading Enterprise Security',
        url: 'https://darkreading.com/threat-intelligence/nist-pqc-final',
        publishedAt: '2026-10-10T06:10:00.000Z',
        similarityScore: 88,
        isCanonical: false,
        syndicateType: 'Direct Syndicate Repost'
      }
    ]
  }
];

export const INITIAL_HISTORICAL_EVOLUTIONS: HistoricalEvolution[] = [
  {
    id: 'hist-ssb-01',
    topicId: 'topic-ssb',
    topicName: 'Solid-State Battery Electrolytes & Scalability',
    metricOrClaimName: 'Gravimetric Energy Density & Stack Pressure Requirements',
    timeline: [
      {
        year: '2021',
        date: 'March 2021',
        reportedClaim: 'Laboratory coin-cells projected to reach 500 Wh/kg in commercial vehicles by 2024 with zero liquid content.',
        quantitativeValue: '500 Wh/kg (projected)',
        source: 'Automotive Battery Summit 2021 Keynote',
        shiftType: 'Baseline'
      },
      {
        year: '2023',
        date: 'November 2023',
        reportedClaim: 'Interfacial dendrite penetration and void formation forced revision down to 380 Wh/kg, requiring 5 MPa external mechanical clamping.',
        quantitativeValue: '380 Wh/kg (with 5 MPa pack)',
        source: 'Fraunhofer ISE Technical Review',
        shiftType: 'Methodological Revision'
      },
      {
        year: '2025',
        date: 'July 2025',
        reportedClaim: 'Semi-solid compromise adopting 5-10% liquid/gel carrier reached 420 Wh/kg, relaxing pressure down to 1.5 MPa in pilot production.',
        quantitativeValue: '420 Wh/kg (with 1.5 MPa pack)',
        source: 'BloombergNEF Energy Storage Outlook',
        shiftType: 'Incremental Refinement'
      },
      {
        year: '2026',
        date: 'October 2026',
        reportedClaim: 'Halide-sulfide plastic-crystal composite achieved 460 Wh/kg at cell level under zero external stack pressure.',
        quantitativeValue: '460 Wh/kg (Zero external pressure)',
        source: 'Nature Energy (October 2026)',
        shiftType: 'Paradigm Shift'
      }
    ],
    historicalDivergenceSummary: 'Over 5 years, industry expectations moved from extreme optimism (500 Wh/kg by 2024) to sobering engineering bottlenecks (severe parasitic weight from compression plates), culminating in current material solutions that resolve the compression dilemma.',
    conclusionEvolution: {
      historicalBaseline: 'Original consensus assumed that mechanical compression was an inescapable law of physics for all-solid-state lithium metal stripping.',
      currentConsensus: 'Current consensus establishes that atomic-scale plastic-crystal halide doping eliminates interfacial voids, rendering heavy mechanical containment plates obsolete.',
      majorDiscrepancy: 'Early laboratory test papers systematically neglected the pack-level mass penalty of hydraulic/spring containment brackets when publishing cell-level Wh/kg metrics.'
    }
  },
  {
    id: 'hist-agents-01',
    topicId: 'topic-agents',
    topicName: 'Multi-Agent AI Reasoning & Deterministic Guardrails',
    metricOrClaimName: 'Hallucination & Silent Regression Rates in Multi-Step Workflows',
    timeline: [
      {
        year: '2023',
        date: 'June 2023',
        reportedClaim: 'Zero-shot prompting of foundation models on multi-step API workflows had an unacceptably high error rate exceeding 34%.',
        quantitativeValue: '34% error rate',
        source: 'ArXiv Preprints (cs.CL)',
        shiftType: 'Baseline'
      },
      {
        year: '2024',
        date: 'September 2024',
        reportedClaim: 'ReAct agent frameworks improved execution to 19% failure rate, but introduced infinite recursive loop vulnerabilities.',
        quantitativeValue: '19% error rate',
        source: 'NeurIPS 2024 Workshop on Agentic AI',
        shiftType: 'Incremental Refinement'
      },
      {
        year: '2026',
        date: 'October 2026',
        reportedClaim: 'Deterministic state-machine supervisor topologies combined with dual-pass reflection reduced silent logic regressions down to 3.2%.',
        quantitativeValue: '3.2% error rate',
        source: 'IEEE Transactions on Software Engineering',
        shiftType: 'Paradigm Shift'
      }
    ],
    historicalDivergenceSummary: 'Progression from prompt engineering heuristics toward rigorous formal state-machine architectures with programmatic guardrails.',
    conclusionEvolution: {
      historicalBaseline: 'Belief that simply increasing context window size and frontier model parameter scale would organically eliminate agent reasoning mistakes.',
      currentConsensus: 'Consensus that probabilistic reasoning requires deterministic runtime type checkers, read-only critique supervisors, and circuit breakers.',
      majorDiscrepancy: 'Monolithic prompt benchmarks failed to simulate long-horizon enterprise state drift where minor early errors compound exponentially.'
    }
  }
];

export const INITIAL_TRENDS: TrendAnalysisItem[] = [
  {
    id: 'trend-1',
    topicId: 'topic-ssb',
    topicName: 'Solid-State Battery Electrolytes & Scalability',
    themeName: 'Elimination of External Pack Compression Fixtures',
    status: 'Accelerating',
    confidenceLevel: 'High',
    isInsufficient: false,
    evidenceSufficiencyRationale: 'Supported by 12 independent laboratory and pilot papers over the past 14 months, with consistent ionic conductivity metrics across both Asian and European consortia.',
    recurringMentionsCount: 28,
    timeSpan: 'Last 14 Months',
    trajectoryNotes: 'Transitioning rapidly from academic curiosity into automotive Tier-1 patent filings and gigafactory pre-tooling specifications.',
    dataPoints: [
      { period: 'Q3 2025', count: 3, sentimentScore: 65 },
      { period: 'Q4 2025', count: 5, sentimentScore: 72 },
      { period: 'Q1 2026', count: 7, sentimentScore: 81 },
      { period: 'Q2 2026', count: 11, sentimentScore: 91 },
      { period: 'Q3 2026', count: 14, sentimentScore: 94 }
    ]
  },
  {
    id: 'trend-2',
    topicId: 'topic-agents',
    topicName: 'Multi-Agent AI Reasoning & Deterministic Guardrails',
    themeName: 'Hierarchical Supervisor State Graphs Replacing Peer-to-Peer Swarms',
    status: 'Consensus Forming',
    confidenceLevel: 'High',
    isInsufficient: false,
    evidenceSufficiencyRationale: 'Over 40 enterprise case studies and benchmarks corroborate that unconstrained peer-to-peer swarms fail SOC2 and ISO compliance requirements.',
    recurringMentionsCount: 42,
    timeSpan: 'Last 18 Months',
    trajectoryNotes: 'Enterprise architects have standardized on deterministic state-graph DAGs (directed acyclic graphs) with explicit human-in-the-loop audit gates.',
    dataPoints: [
      { period: 'Q3 2025', count: 6, sentimentScore: 70 },
      { period: 'Q4 2025', count: 9, sentimentScore: 78 },
      { period: 'Q1 2026', count: 15, sentimentScore: 86 },
      { period: 'Q2 2026', count: 21, sentimentScore: 92 },
      { period: 'Q3 2026', count: 26, sentimentScore: 95 }
    ]
  },
  {
    id: 'trend-3',
    topicId: 'topic-pqc',
    topicName: 'Post-Quantum Cryptography in Financial Infrastructure',
    themeName: 'Hardware Memory Bus Bottlenecks During High-Frequency Settlement',
    status: 'Diverging / Contested',
    confidenceLevel: 'Moderate',
    isInsufficient: false,
    evidenceSufficiencyRationale: '7 banking infrastructure benchmarks confirm latency impact, but disagreement persists between hardware accelerator vendors and cloud-native software implementations regarding mitigation paths.',
    recurringMentionsCount: 16,
    timeSpan: 'Last 8 Months',
    trajectoryNotes: 'Ongoing debate between costly microcode ASIC replacements versus hybrid offload schemes.',
    dataPoints: [
      { period: 'Q1 2026', count: 2, sentimentScore: 40 },
      { period: 'Q2 2026', count: 6, sentimentScore: 55 },
      { period: 'Q3 2026', count: 11, sentimentScore: 68 }
    ]
  },
  {
    id: 'trend-4',
    topicId: 'topic-ssb',
    topicName: 'Solid-State Battery Electrolytes & Scalability',
    themeName: 'Continuous Roll-to-Roll Calendering of Ultra-Thin Lithium Metal Ribbons Below 15 Microns',
    status: 'Insufficient Evidence',
    confidenceLevel: 'Insufficient Data',
    isInsufficient: true,
    evidenceSufficiencyRationale: 'CRITICAL CAVEAT: Only 2 preprint publications and 1 press release mention continuous roll-to-roll sub-15-micron extrusion. No multi-kilogram production yields or independent defect-density audits are available in the indexed literature. Evidence is strictly insufficient to declare a reproducible manufacturing trend.',
    recurringMentionsCount: 3,
    timeSpan: 'Last 6 Months',
    trajectoryNotes: 'Data sparse. Highly speculative vendor press claims not yet validated by peer-reviewed metrology.',
    dataPoints: [
      { period: 'Q2 2026', count: 1, sentimentScore: 30 },
      { period: 'Q3 2026', count: 2, sentimentScore: 35 }
    ]
  }
];

export const DEFAULT_ALERT_SETTINGS: AlertSettings = {
  minSignificance: 'High',
  suppressDuplicatesWindowHours: 48,
  muteIncrementalUpdates: true,
  webhookAlertsEnabled: false,
  webhookUrl: '',
  secretToken: '',
  emailDigest: 'Daily',
  topicMutes: {}
};
