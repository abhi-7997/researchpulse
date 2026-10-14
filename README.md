# RESEARCHPULSE — Agentic AI Research Monitoring System

An agentic research surveillance and monitoring platform engineered to solve critical research challenges:
1. **Continuous Topic & Source Surveillance**: Detects meaningful new developments across peer journals, preprints, and institutional advisories.
2. **Historical Comparison Engine**: Benchmarks new empirical findings against prior reported claims, quantitative metrics, and baseline conclusions.
3. **Duplicate & Syndicate Deduplication**: Clusters multiple syndicated articles, wire reposts, and press echoes around canonical root events.
4. **Evidence Divergence & Contradiction Detection**: Explicitly identifies supporting vs. contradicting evidence.
5. **Trend Analysis with Evidentiary Rigor**: Tracks recurring themes over time while explicitly flagging when evidence is statistically insufficient.
6. **Traceable Attribution**: Detailed provenance with source reliability tiers, DOIs, and confidence boundaries.

---

## Complete Pages & Feature Set

- **1. Dashboard**: Monitored topics with scan triggers, new developments KPI, high-significance changes (critical alerts / paradigm shifts), emerging trends snapshot, and recent surveillance activity.
- **2. Add Topic**: Configure topic descriptions, related concepts (tagging), preferred sources (Nature, ArXiv, IEEE, PubMed, etc.), excluded topics / negative keywords, relevance threshold slider (50% to 95%), and monitoring frequency.
- **3. Research Feed**: Update cards with significance levels, confidence assessments, publication dates, and direct source attribution links.
- **4. Update Details**: Deep-dive analysis covering What Changed, Why It Matters, Previous vs. Current Findings, Supporting and Contradicting Evidence, Source Reliability Tiers, and Confidence Limitations.
- **5. Duplicate Reports View**: Groups multiple articles about the same underlying development, displaying canonical primary sources vs. echoes with semantic similarity percentages.
- **6. Historical Comparison View**: Longitudinal timelines tracking claim progressions, figure shifts, and changing consensus over multi-year spans.
- **7. Trend Analysis Page**: Tracks recurring themes over time and **explicitly flags insufficient evidence / data-sparse claims** with dedicated warning notices.
- **8. Alert Settings Page**: Controls significance alert thresholds (Critical, High, Moderate, Incremental), duplicate notification suppression windows (24h–7d), and downstream n8n webhook alerts.

---

## Local Setup in Visual Studio Code

Run these commands inside your VS Code terminal (`Ctrl + \`` or `Cmd + \``):

```bash
# 1. Open the project directory
cd researchpulse

# 2. Install all dependencies
npm install

# 3. Start the local Vite development server
npm run dev
```

Open `http://localhost:3000` in your web browser.

---

## Pushing to GitHub

To push the project to a new GitHub repository:

```bash
# 1. Initialize git
git init

# 2. Add all files
git add .

# 3. Commit initial version
git commit -m "feat: complete RESEARCHPULSE Agentic AI Research Monitoring System"

# 4. Set main branch
git branch -M main

# 5. Add remote origin (replace with your repo URL)
git remote add origin https://github.com/your-username/researchpulse.git

# 6. Push to GitHub
git push -u origin main
```

---

## n8n Webhook & Agentic Service Layer

- The frontend features a prepared service layer (`src/services/monitoringService.ts`) for transmitting surveillance requests and alert payloads to an n8n webhook.
- No API keys or credentials are hardcoded or exposed in client bundles.
- Demonstration data is transparently flagged with simulation notices.
