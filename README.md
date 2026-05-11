# Aigentic Orbit — Fully Autonomous AI Development Agency

> A multi-agent system that scouts leads, analyzes feasibility, sends proposals,
> generates production code, and validates it with real browser tests —
> **all autonomously, all locally**.

**Status:** Working end-to-end. Last run: 33 files generated, 9/9 Playwright tests passed, 0 bugs.

---

## Architecture

```text
  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
  │ Phase 1  │    │ Phase 2  │    │ Phase 3  │    │ Phase 4  │    │ Phase 5  │
  │  SCOUT   │───▶│ ANALYST  │───▶│ CLOSER   │───▶│ BUILDER  │───▶│ AUDITOR  │
  │          │    │          │    │          │    │          │    │          │
  │ Scraper  │    │ Claude   │    │ Resend   │    │ Claude   │    │Playwright│
  │ (mock)   │    │ (real)   │    │ (mock)   │    │ (real)   │    │ (real)   │
  └──────────┘    └──────────┘    └──────────┘    └──────────┘    └────┬─────┘
                                                                       │
                                                                  ┌────▼─────┐
                                                                  │ QA PASS? │
                                                                  │ YES→Done │
                                                                  │ NO →Fix  │──▶ Fixer (up to 2x)
                                                                  └──────────┘
```

| Layer      | Role                                        | Tech                     |
|------------|---------------------------------------------|--------------------------|
| **CrewAI** | Agent reasoning, tool use, task chaining    | CrewAI 1.12 + litellm    |
| **Claude** | All LLM reasoning + code generation         | claude-sonnet-4-20250514 |
| **n8n**    | Scheduling, webhooks (optional)             | `n8n_workflow.json`      |
| **SQLite** | Pipeline run history                        | `pipeline_history.db`    |

---

## Project Structure

```text
ai-dev-agency/
├── orchestrator.py          # CrewAI pipeline + FastAPI server + self-healing loop
├── config.py                # Central settings (loads .env)
├── db.py                    # SQLite pipeline history
├── dashboard.html           # Web UI for viewing runs and stats
├── n8n_workflow.json         # Importable n8n scheduled workflow
├── requirements.txt
├── .env / .env.example
│
├── agents/                  # CrewAI agent definitions
│   ├── scout.py             # Phase 1: Lead generation
│   ├── analyst.py           # Phase 2: Feasibility + TSD
│   ├── closer.py            # Phase 3: Client comms + proposals
│   ├── builder.py           # Phase 4: Code generation
│   └── auditor.py           # Phase 5: QA testing
│
├── tools/
│   ├── scraper_tool.py      # Web lead scraper (mock/live)
│   ├── email_tool.py        # Email sender via Resend (mock/live)
│   ├── builder_tool.py      # Claude code gen → local files
│   ├── testing_tool.py      # Playwright browser testing
│   └── fixer_tool.py        # Self-healing bug fixer (Claude + retry)
│
├── tasks/
│   └── pipeline.py          # Task definitions for each phase
│
├── tests/
│   └── test_mock_run.py     # Mock mode integration tests
│
├── mock_data/
│   ├── sample_lead.json
│   └── sample_lead_rejected.json
│
└── output/                  # Generated projects land here
    └── next-js-saas-dashboard/
```

---

## Quick Start

### Prerequisites

- Python 3.11+ (conda or venv)
- Node.js 18+
- Playwright browsers: `playwright install chromium`

### Setup

```bash
# 1. Create conda env (or use venv)
conda create -n aiagency python=3.11 -y
conda activate aiagency

# 2. Install Python deps
pip install -r requirements.txt

# 3. Install Playwright browsers
playwright install chromium

# 4. Copy env template and add your Anthropic API key
copy .env.example .env
# Edit .env → set ANTHROPIC_API_KEY=sk-ant-...

# 5. Run the full pipeline
python orchestrator.py

# 6. Or start the API server + dashboard
uvicorn orchestrator:app --host 127.0.0.1 --port 8000
# Open http://localhost:8000 for the dashboard
```

---

## Mock Flags

Every external service can be independently mocked or live:

| Flag              | Default | What it controls                              |
|-------------------|---------|-----------------------------------------------|
| `MOCK_MODE`       | `false` | LLM reasoning (true = local mock server)      |
| `TOOLS_MOCK_MODE` | `true`  | Scraper returns mock leads                    |
| `BUILDER_MOCK`    | `false` | Code generation (true = fake files)           |
| `QA_MOCK`         | `false` | Playwright testing (true = always passes)     |
| `EMAIL_MOCK`      | `true`  | Resend email (true = prints to console)       |

Recommended for dev: real LLM + real builder + real QA, mocked scraper + email.

---

## Self-Healing Loop

When QA finds bugs, the orchestrator automatically:

1. Reads all source files from the failed project
2. Sends the bug report + code to Claude for fixes
3. Writes fixed files back
4. Re-runs `npm install` and Playwright tests
5. Repeats up to 2 times (with rate-limit backoff)

```text
Builder generates → QA tests → PASS? ──YES──▶ Record & Done
                                 │
                                 NO
                                 ▼
                          Fixer reads code + bugs
                          Claude generates patches
                          Write fixes → Retest
                          (max 2 cycles, 30s backoff)
```

---

## API Endpoints

Start with `uvicorn orchestrator:app --port 8000`

| Method | Path                     | Description                          |
|--------|--------------------------|--------------------------------------|
| GET    | `/`                      | Pipeline dashboard (HTML)            |
| POST   | `/api/pipeline/trigger`  | Run the full 5-phase pipeline        |
| GET    | `/api/health`            | Health check + mock mode status      |
| GET    | `/api/runs`              | List pipeline runs (newest first)    |
| GET    | `/api/runs/stats`        | Aggregate stats across all runs      |
| GET    | `/api/runs/latest`       | Most recent pipeline run             |
| GET    | `/api/runs/{id}`         | Specific pipeline run by ID          |

---

## n8n Integration

Import `n8n_workflow.json` into n8n for scheduled runs:

```bash
docker run -d --name n8n -p 5678:5678 n8nio/n8n
# Open http://localhost:5678 → Import from File → n8n_workflow.json → Activate
```

The workflow runs every 6 hours (configurable) and calls `POST /api/pipeline/trigger`.
A manual trigger button is also included.

---

## Run Fully Online (No Local Data)

To keep all data online and run the pipeline 24/7, deploy the backend and use PostgreSQL.

1. Create a managed PostgreSQL database (Supabase, Railway Postgres, Neon, Render, etc.).
2. Set `DATABASE_URL` to your managed Postgres connection string.
3. Set production env values:

```bash
MOCK_MODE=false
TOOLS_MOCK_MODE=false
QA_MOCK=false
BUILDER_MOCK=false
EMAIL_MOCK=false
AUTO_PIPELINE_INTERVAL_MINUTES=30
```

Check readiness before deploy:

```bash
python scripts/check_online_readiness.py
```

If you want to preserve existing local history and client data, migrate SQLite into Postgres first:

```bash
python scripts/migrate_sqlite_to_postgres.py
```

4. Deploy backend with Railway using `railway.json`:

```bash
railway up
```

5. Verify online health:

```bash
curl https://<your-domain>/api/health
```

The health payload includes `storage_backend`. It must be `postgresql` to confirm data is not local.

---

## Key Design Decisions

1. **Local-first with cloud-ready storage** — Works locally with SQLite and can switch
   to managed PostgreSQL via `DATABASE_URL` for online persistent data.

2. **Claude for both reasoning and codegen** — Claude's 200K context window handles
   full-project generation in a single API call. The same key powers all 5 agents.

3. **Robust JSON extraction** — LLM responses are parsed with brace-finding
   (`first { to last }`) instead of regex, handling cases where generated code
   contains markdown fences.

4. **Independent mock flags** — Go live one service at a time. Test the builder
   with real Claude while keeping the scraper mocked.

5. **Unified run history storage** — Every pipeline run is recorded with timing, file
   counts, test results, and fix attempts. Use SQLite locally or PostgreSQL online.

---

## License

MIT
