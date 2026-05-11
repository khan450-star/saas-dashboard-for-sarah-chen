"""Test the QA Auditor tool against the locally generated project."""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from tools.testing_tool import TestingTool

tool = TestingTool()
payload = json.dumps({
    "project_dir": "output/next-js-saas-dashboard"
})

print("Running QA tests (npm install + dev server + Playwright)...")
print("This may take 1-2 minutes...\n")

result = tool._run(payload)
parsed = json.loads(result)

print(f"Status: {parsed['status']}")
print(f"Tests run: {parsed['tests_run']}")
print(f"Tests passed: {parsed['tests_passed']}")
print(f"Tests failed: {parsed['tests_failed']}")

if parsed["bugs"]:
    print(f"\nBugs found ({len(parsed['bugs'])}):")
    for bug in parsed["bugs"]:
        print(f"  [{bug['severity']}] {bug['id']}: {bug['description']}")
else:
    print("\nNo bugs found!")
