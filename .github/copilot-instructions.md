# Aigentic Orbit — AI Dev Agency: Copilot Instructions

This file gives GitHub Copilot full context about every part of this project so it can answer questions accurately.

---

## Company & Project Identity

- **Company:** Aigentic Orbit (formerly Kinetix Code / Shift Bite)
- **Owner email:** khan450star@gmail.com
- **Project:** Fully Autonomous AI Development Agency pipeline
- **Goal:** A multi-agent system that scouts freelance leads, analyses feasibility, sends proposals, generates production Next.js code, runs Playwright browser tests, and self-heals bugs — all autonomously.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Backend server | FastAPI + uvicorn (port 8000) |
| Agent framework | CrewAI 1.12 (sequential process) |
| LLM provider | Anthropic Claude (claude-sonnet-4-20250514) via litellm |
| Code generation | Claude via `tools/builder_tool.py` |
| Lead scraping | Apify actor via `tools/scraper_tool.py` |
| Email sending | Resend API via `tools/email_tool.py` |
| Browser testing | Playwright (Chromium) via `tools/testing_tool.py` |
| Self-healing | Claude fixer loop via `tools/fixer_tool.py` |
| Database | SQLite (`pipeline_history.db`) managed by `db.py` |
| Config | pydantic_settings loading `.env` in `config.py` |
| Frontend dashboard | `dashboard.html` served by FastAPI at root `/` |
| Output projects | Next.js 14 (App Router, TypeScript, Tailwind, Prisma, NextAuth) |
| Python env | conda env named `aiagency`, Python 3.11 |
| Python path | `C:\Users\y545\.conda\envs\aiagency\python.exe` |
| Node.js | Node 18+ (for generated output projects) |

---

## Repository Layout

```
ai-dev-agency/
├── orchestrator.py          # Main file: FastAPI app + CrewAI pipeline + self-healing loop
├── config.py                # All settings (pydantic_settings, loads .env)
├── db.py                    # SQLite helpers for pipeline_history.db
├── dashboard.html           # Web UI (runs served at http://127.0.0.1:8000)
├── deploy.py                # Deployment helpers (Vercel/Railway)
├── mock_llm_server.py       # Local mock LLM server for testing without API keys
├── n8n_workflow.json        # Importable n8n scheduled trigger workflow
├── requirements.txt
├── .env                     # API keys and runtime flags (not committed)
│
├── agents/                  # CrewAI Agent definitions (one file per phase)
│   ├── scout.py             # Phase 1 – Lead hunter
│   ├── analyst.py           # Phase 2 – Feasibility + TSD writer
│   ├── closer.py            # Phase 3 – Proposal + email sender
│   ├── builder.py           # Phase 4 – Code generator
│   └── auditor.py           # Phase 5 – QA tester
│
├── tools/                   # CrewAI Tool implementations
│   ├── scraper_tool.py      # Apify web scraper (mock/live toggled by tools_mock_mode)
│   ├── email_tool.py        # Resend email sender (mock/live)
│   ├── builder_tool.py      # Claude code generation → writes files to output/
│   ├── testing_tool.py      # npm install + Playwright browser tests
│   └── fixer_tool.py        # Claude bug fixer for self-heal loop
│
├── tasks/
│   └── pipeline.py          # Task descriptions (prompts) for all 5 phases
│
├── scripts/                 # One-off maintenance/debug scripts
│   ├── check_db.py          # Inspect pipeline_history.db
│   ├── backfill_runs.py     # Backfill missing DB columns
│   └── ...
│
├── tests/
│   ├── test_mock_run.py     # Mock mode integration test
│   ├── test_builder_live.py # Live builder test
│   └── test_qa_live.py      # Live QA test
│
├── mock_data/
│   ├── sample_lead.json         # Sample qualifying lead
│   └── sample_lead_rejected.json
│
└── output/                  # All generated Next.js projects land here
    ├── multikart-react-next-js-e-commerce-platform/
    ├── next-js-saas-dashboard/
    └── ...
```

---

## The 5-Phase Pipeline

### Phase 1 — Scout (`agents/scout.py`)
- Uses `ScraperTool` to fetch leads from Upwork / LinkedIn / Apollo.io (or mock data).
- Filters out leads below $2,000 budget, hardware/IoT, native mobile, blockchain.
- Returns a JSON list of qualifying leads with fields: `source`, `title`, `description`, `budget_usd`, `client_name`, `client_email`, `url`, `tags`, `suggested_project_type`.

### Phase 2 — Analyst (`agents/analyst.py`)
- Takes Scout leads and writes a Technical Specification Document (TSD).
- Evaluates feasibility, picks the best matching project type, estimates hours/cost.
- Injects project size instructions at runtime (`small` mode = prefer simpler projects for testing; `big` mode = prefer highest-value complex project).

### Phase 3 — Closer (`agents/closer.py`)
- Writes a personalised proposal email using `EmailTool`.
- Sends via Resend API or logs (mock mode).
- Returns a structured proposal object for the Builder.

### Phase 4 — Builder (`agents/builder.py`)
- Uses `BuilderTool` to call Claude and generate a complete Next.js 14 project.
- Writes all files to `output/<project-slug>/`.
- Project structure: `src/app/` (App Router), `prisma/schema.prisma`, `prisma/seed.ts`, `.env`, `.env.local`, `tailwind.config.js`.
- Key code rules enforced in prompt:
  - All files under `src/app/` (never duplicate `app/` at root)
  - `'use client'` on interactive components
  - `[...nextauth]` route for auth
  - All Tailwind color shades used must be in `tailwind.config.js`
  - Pages must fetch data from Prisma (not hardcoded arrays)
  - `prisma/seed.ts` must have 8–12 items with `upsert()` (idempotent)
  - Use `<img src="https://picsum.photos/...">` for placeholder images

### Phase 5 — Auditor (`agents/auditor.py`)
- Uses `TestingTool` to:
  1. Create `.env` with `DATABASE_URL` (Prisma reads `.env` not `.env.local`)
  2. Run `npm install`
  3. Run `npx prisma db push` + `npx prisma db seed`
  4. Start `next dev` server
  5. Run 10 Playwright browser tests (landing, navigation, products, images, auth pages, etc.)
- Returns pass/fail counts and bug report.

### Self-Healing Loop (in `orchestrator.py`)
- If tests fail, `FixerTool` is called (up to `MAX_FIX_RETRIES = 2` times).
- Fixer gets the bug report + current source files → Claude patches the files.
- After each fix: kill port 3000 zombies, clear `.next` cache, re-run tests.

---

## FastAPI Endpoints

All served at `http://127.0.0.1:8000`:

| Method | Path | Description |
|---|---|---|
| GET | `/` | Serves `dashboard.html` |
| GET | `/api/health` | Health check + config summary |
| POST | `/api/pipeline/trigger` | Start a pipeline run (async) |
| GET | `/api/pipeline/project-size` | Get current project size mode |
| POST | `/api/pipeline/project-size` | Set mode: `{"mode": "small"\|"big"}` |
| GET | `/api/runs` | All pipeline runs |
| GET | `/api/runs/stats` | Aggregate stats |
| GET | `/api/runs/latest` | Latest run |
| GET | `/api/runs/{run_id}` | Single run by ID |
| POST | `/api/requests` | Submit a new client request |
| GET | `/api/requests` | List all client requests |
| GET | `/api/requests/stats` | Request stats |
| GET | `/api/requests/{request_id}` | Single request |
| PUT | `/api/requests/{request_id}/status` | Update request status |
| GET | `/api/requests/{request_id}/messages` | Messages for a request |
| POST | `/api/requests/{request_id}/messages` | Add a message |
| GET | `/api/projects/{run_id}/profile` | Project profile for a run |
| POST | `/api/projects/{run_id}/preview` | Start preview server for a project |
| POST | `/api/projects/{run_id}/deploy` | Deploy a project |
| GET | `/api/notifications` | Notifications list |
| GET | `/api/notifications/count` | Unread notification count |

---

## Configuration (`config.py`)

All settings are loaded from `.env`. Key settings:

```python
# LLM
anthropic_api_key          # Anthropic key (sk-ant-api03-...)
llm_model = "claude-sonnet-4-20250514"   # global fallback
architect_model            # Phase 2 analyst model
lead_dev_model             # Phase 4 builder model
security_model             # Phase 5 auditor model

# Mock / Live flags
mock_mode = True           # True = use local mock LLM server (no API calls)
tools_mock_mode = True     # True = fake scraper/email/deploy results

# Project size selection
project_selection_mode = "small"   # "small" (default) | "big"

# External services
apify_api_token            # For live lead scraping
resend_api_key             # For live email sending
email_mock = True          # True = log emails, don't send
vercel_token               # For deployment
github_token               # For GitHub repo creation

# Output
output_dir = "output"      # Where generated projects are written
```

---

## Database Schema (`pipeline_history.db`)

Table: `pipeline_runs`

| Column | Type | Notes |
|---|---|---|
| id | INTEGER | PK autoincrement |
| started_at | TEXT | ISO datetime UTC |
| finished_at | TEXT | ISO datetime UTC |
| duration_secs | REAL | |
| mock_mode | INTEGER | 0=live, 1=mock |
| status | TEXT | `running` \| `pass` \| `fail` \| `error` |
| leads_found | INTEGER | |
| projects_built | INTEGER | |
| files_generated | INTEGER | |
| tests_run | INTEGER | |
| tests_passed | INTEGER | |
| tests_failed | INTEGER | |
| fix_attempts | INTEGER | Self-heal iterations used |
| result_json | TEXT | Full JSON from pipeline |
| error_message | TEXT | If status=fail/error |
| project_name | TEXT | |
| project_dir | TEXT | Path to output dir |
| budget_usd | REAL | |
| client_name | TEXT | |
| tech_stack | TEXT | |
| description | TEXT | |
| pipeline_data | TEXT | |
| deployed_url | TEXT | |
| github_url | TEXT | |

**Status normalization rule:** A run stored as `pass` with `projects_built=0` and `tests_run=0` is treated as `fail` (no qualifying leads found). This is applied in `db.py` at read time and in `orchestrator.py` at API response time.

---

## Project Size Mode

- Controlled by `settings.project_selection_mode` and a runtime override `_project_selection_mode_override`.
- **`small` (default):** Pipeline analyst relaxes the $2k budget threshold and picks the simplest project for fast test cycles.
- **`big`:** Pipeline picks highest-value, most complex project.
- Switch at runtime: `POST /api/pipeline/project-size {"mode": "big"}`
- Switch back: `POST /api/pipeline/project-size {"mode": "small"}`

---

## Generated Output Projects

All generated projects are Next.js 14 with:
- TypeScript, Tailwind CSS, Prisma ORM, NextAuth.js
- App Router under `src/app/`
- SQLite database (`prisma/dev.db`) seeded with sample data
- Runs on port 3000 (`npm run dev`)
- `.env` file required for Prisma (`DATABASE_URL="file:./dev.db"`)

To run any output project:
```powershell
cd output/<project-name>
npm install
npx prisma db push
npx prisma db seed
npm run dev
```

---

## Running the Backend

Start (single process, no reload, recommended):
```powershell
Stop-Process -Name python -Force -ErrorAction SilentlyContinue
C:\Users\y545\.conda\envs\aiagency\python.exe -m uvicorn orchestrator:app --host 127.0.0.1 --port 8000
```

Check health:
```powershell
Invoke-RestMethod http://127.0.0.1:8000/api/health
```

Trigger a pipeline run:
```powershell
Invoke-RestMethod -Method Post http://127.0.0.1:8000/api/pipeline/trigger
```

---

## Mock vs Live Mode

| Setting | Mock Mode | Live Mode |
|---|---|---|
| `mock_mode=True` | Uses local mock LLM server at port 11434 | Real Claude API calls |
| `tools_mock_mode=True` | Fake scraper, email, deploy results | Real Apify, Resend, Vercel |
| `email_mock=True` | Logs emails to console | Sends via Resend |
| `qa_mock=True` | Skips Playwright, returns fake pass | Real browser tests |

---

## Known Issues & Fixes

| Issue | Fix Applied |
|---|---|
| Windows subprocess deadlock on timeout | Use `DEVNULL` for output or `Popen+communicate+kill_tree` |
| Next.js App Router: duplicate `app/` + `src/app/` → HTTP 500 | Builder prompt: "ALL files under `src/app/`" |
| Tailwind color shades not in config → crash | Builder prompt: include all used shades in `tailwind.config.js` |
| Default/named export mismatch → import errors | Builder prompt: explicit export style rules |
| Prisma reads `.env` not `.env.local` | Auto-create `.env` with `DATABASE_URL` before npm install |
| Port 3000 zombie after test → self-heal blocked | Kill port 3000 + clear `.next` before retest |
| Seed script fails on re-run (duplicate data) | Use `upsert()` not `create()` in seed scripts |
| False PASS status (0 builds, 0 tests) | Three-layer normalization in `db.py` and `orchestrator.py` |
| Claude fixer writes to `app/` instead of `src/app/` | Added `src/app/` rule to fixer prompt |

---

## Pipeline Run History (Notable)

| Run | Result | Notes |
|---|---|---|
| Run 7 | 9/9 PASSED, 0 bugs | First full live success |
| Run 21 | 16/16 PASSED, 0 bugs | Multikart E-commerce, 37 files |
| Runs 22–23 | ERROR | OpenAI key config issue (pre-Anthropic migration) |
| Runs 24–29 | FAIL (normalized) | 0 builds/0 tests — no qualifying leads found |

---

## Key File Locations

| File | Purpose |
|---|---|
| `orchestrator.py` | Main app — edit to add endpoints or pipeline logic |
| `config.py` | Add new settings here |
| `db.py` | Add new DB columns/queries here |
| `tasks/pipeline.py` | Edit agent prompts/instructions here |
| `agents/*.py` | Edit agent personas/backstories here |
| `tools/builder_tool.py` | Edit code generation prompt/rules here |
| `tools/testing_tool.py` | Edit Playwright test logic here |
| `tools/fixer_tool.py` | Edit self-heal logic here |
| `dashboard.html` | Frontend dashboard UI |
| `.env` | API keys and feature flags (never commit) |
