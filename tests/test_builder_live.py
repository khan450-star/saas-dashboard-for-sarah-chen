"""Test the builder tool with real Claude API — generates code to local output/."""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from tools.builder_tool import BuilderTool

tsd = {
    "status": "approved",
    "project_name": "Next.js SaaS Dashboard",
    "stack": [
        "Next.js 14", "React 18", "TypeScript", "Tailwind CSS",
        "Prisma ORM", "NextAuth.js", "Stripe SDK", "PostgreSQL"
    ],
    "pages": ["Landing Page", "Sign In/Sign Up", "Dashboard", "Settings", "Billing"],
    "integrations": ["Stripe Payment Processing", "NextAuth.js", "PostgreSQL Database"],
    "database": "PostgreSQL via Prisma ORM",
    "estimated_hours": 72,
    "milestones": [
        {"name": "Project Scaffold & Auth Setup", "hours": 12},
        {"name": "Landing Page & UI Components", "hours": 16},
        {"name": "Dashboard & Settings", "hours": 20},
        {"name": "Stripe Integration", "hours": 16},
        {"name": "Testing & Polish", "hours": 8},
    ],
}

print("Calling Claude to generate code (this may take 30-60s)...")
tool = BuilderTool()
result = tool._run(json.dumps(tsd))
parsed = json.loads(result)

print(f"\nStatus: {parsed['build_status']}")
print(f"Files generated: {parsed['files_generated']}")
print(f"Output dir: {parsed['project_dir']}")

# List the generated files
project_dir = Path(parsed["project_dir"])
if project_dir.exists():
    print("\nGenerated files:")
    for f in sorted(project_dir.rglob("*")):
        if f.is_file():
            size = f.stat().st_size
            print(f"  {f.relative_to(project_dir)}  ({size:,} bytes)")
