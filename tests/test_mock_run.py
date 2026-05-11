"""
Dry-run test — validates the full pipeline in mock mode without any API keys.

Usage:
    python test_mock_run.py
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import pytest

# Ensure project root is on the path
sys.path.insert(0, str(Path(__file__).parent.parent))

from config import settings


@pytest.fixture(autouse=True)
def force_mock_flags(monkeypatch):
    """Keep tests deterministic by forcing tool-level mock behavior."""
    monkeypatch.setattr(settings, "mock_mode", True)
    monkeypatch.setattr(settings, "tools_mock_mode", True)
    monkeypatch.setattr(settings, "builder_mock", True)
    monkeypatch.setattr(settings, "qa_mock", True)
    monkeypatch.setattr(settings, "email_mock", True)


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
    data = _build_project()
    print(f"[PASS] BuilderTool created mock project at {data['project_dir']}")


def _build_project() -> dict:
    """Helper for tests/main to create and validate a mock build."""
    from tools.builder_tool import BuilderTool
    tool = BuilderTool()
    tsd = json.dumps({"project_name": "test-project", "stack": ["Next.js"]})
    result = tool._run(tsd)
    data = json.loads(result)
    assert data["build_status"] == "success"
    project_dir = (data.get("project_dir") or "").replace("\\", "/")
    assert "/output/" in f"/{project_dir}" or project_dir.startswith("output/")
    return data


def test_testing_tool(project_dir: str | None = None):
    """TestingTool should return a mock QA report."""
    from tools.testing_tool import TestingTool
    tool = TestingTool()
    payload = json.dumps({"project_dir": project_dir or "output/test-project"})
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
    build_result = _build_project()
    print(f"[PASS] BuilderTool created mock project at {build_result['project_dir']}")
    test_testing_tool(build_result["project_dir"])

    print("\n" + "=" * 50)
    print("  ALL TOOL TESTS PASSED ✓")
    print("=" * 50)
    print("\nTo run the full CrewAI pipeline:")
    print("  python orchestrator.py")


if __name__ == "__main__":
    main()
