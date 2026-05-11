"""
Dry-run test — validates the full pipeline in mock mode without any API keys.

Usage:
    python test_mock_run.py
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

# Ensure project root is on the path
sys.path.insert(0, str(Path(__file__).parent.parent))

from config import settings


def test_config():
    """Verify mock mode is enabled."""
    assert settings.mock_mode is True, "Set MOCK_MODE=true in .env or rely on default"
    print("[PASS] Config loaded — mock_mode is ON")


def test_scraper_tool():
    """ScraperTool should return sample leads in mock mode."""
    from tools.scraper_tool import ScraperTool
    tool = ScraperTool()
    result = tool._run("upwork")
    leads = json.loads(result)
    assert isinstance(leads, list) and len(leads) >= 1
    assert "title" in leads[0]
    print(f"[PASS] ScraperTool returned {len(leads)} mock lead(s)")
    return leads


def test_email_tool():
    """EmailTool should produce a mock email."""
    from tools.email_tool import EmailTool
    tool = EmailTool()
    payload = json.dumps({
        "to": "test@example.com",
        "subject": "Test",
        "body": "Hello",
    })
    result = tool._run(payload)
    assert "MOCK EMAIL" in result
    print("[PASS] EmailTool sent mock email")


def test_builder_tool():
    """BuilderTool should return a mock build result."""
    from tools.builder_tool import BuilderTool
    tool = BuilderTool()
    tsd = json.dumps({"project_name": "test-project", "stack": ["Next.js"]})
    result = tool._run(tsd)
    data = json.loads(result)
    assert data["build_status"] == "success"
    assert data.get("project_dir", "").startswith("output/")
    print(f"[PASS] BuilderTool created mock project at {data['project_dir']}")
    return data


def test_testing_tool(project_dir: str):
    """TestingTool should return a mock QA report."""
    from tools.testing_tool import TestingTool
    tool = TestingTool()
    payload = json.dumps({"project_dir": project_dir})
    result = tool._run(payload)
    report = json.loads(result)
    assert report["status"] == "pass"
    print(f"[PASS] TestingTool — {report['tests_passed']}/{report['tests_run']} tests passed")


def main():
    print("=" * 50)
    print("  AI Dev Agency — Mock Integration Tests")
    print("=" * 50)

    test_config()
    test_scraper_tool()
    test_email_tool()
    build_result = test_builder_tool()
    test_testing_tool(build_result["project_dir"])

    print("\n" + "=" * 50)
    print("  ALL TOOL TESTS PASSED ✓")
    print("=" * 50)
    print("\nTo run the full CrewAI pipeline:")
    print("  python orchestrator.py")


if __name__ == "__main__":
    main()
