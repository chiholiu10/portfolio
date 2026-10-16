"""Evaluate matcher quality against human-reviewed, synthetic vacancies."""
from __future__ import annotations

import argparse
import json
import os
from datetime import datetime, timezone
from pathlib import Path
import statistics
import sys
import time


ROOT = Path(__file__).resolve().parent.parent
MATCHER_ROOT = ROOT / "apps" / "matcher-api"
sys.path.insert(0, str(MATCHER_ROOT))

from matcher import SKILLS, match_vacancy  # noqa: E402


def load_json(path: Path):
    with path.open(encoding="utf-8") as source:
        return json.load(source)


def ratio(numerator: int, denominator: int) -> float:
    return numerator / denominator if denominator else 1.0


def rounded(value: float) -> float:
    return round(value, 4)


def validate_dataset(cases: list[dict], projects: list[dict]) -> None:
    project_ids = [project["id"] for project in projects]
    case_ids = [case["id"] for case in cases]
    if len(project_ids) != len(set(project_ids)):
        raise ValueError("Evaluation project IDs must be unique.")
    if len(case_ids) != len(set(case_ids)):
        raise ValueError("Evaluation case IDs must be unique.")

    known_projects = set(project_ids)
    known_requirements = set(SKILLS)
    for case in cases:
        expected = set(case["expectedProjectIds"])
        forbidden = set(case["forbiddenProjectIds"])
        unknown_projects = (expected | forbidden) - known_projects
        unknown_requirements = {
            requirement for requirement in case["expectedRequirements"]
            if requirement not in known_requirements
            and not requirement.startswith((
                "Seniority: ", "Experience: ", "Language: ", "Work arrangement: "
            ))
        }
        if expected & forbidden:
            raise ValueError(
                f"Case {case['id']} cannot expect and forbid the same project."
            )
        if unknown_projects:
            raise ValueError(
                f"Case {case['id']} references unknown projects: {sorted(unknown_projects)}"
            )
        if unknown_requirements:
            raise ValueError(
                f"Case {case['id']} uses unknown requirements: {sorted(unknown_requirements)}"
            )


def evaluate(live: bool) -> dict:
    cases = load_json(ROOT / "evaluation" / "matcher-cases.json")
    projects = load_json(ROOT / "evaluation" / "matcher-projects.json")
    thresholds = load_json(ROOT / "evaluation" / "thresholds.json")
    validate_dataset(cases, projects)
    projects_by_id = {project["id"]: project for project in projects}

    if not live:
        os.environ["GEMINI_API_KEY"] = ""
    elif not os.environ.get("GEMINI_API_KEY"):
        raise RuntimeError("Live evaluation requires GEMINI_API_KEY.")

    requirement_true_positives = 0
    requirement_false_positives = 0
    requirement_false_negatives = 0
    evidence_correct = 0
    evidence_total = 0
    unsupported_claims = 0
    latencies = []
    case_results = []
    observed_modes = set()

    for case in cases:
        started = time.perf_counter()
        result = match_vacancy(case["vacancy"], projects)
        latency_ms = round((time.perf_counter() - started) * 1000, 2)
        latencies.append(latency_ms)
        observed_modes.add(result["mode"])

        expected_requirements = set(case["expectedRequirements"])
        actual_requirements = set(result["requirements"])
        requirement_true_positives += len(expected_requirements & actual_requirements)
        requirement_false_positives += len(actual_requirements - expected_requirements)
        requirement_false_negatives += len(expected_requirements - actual_requirements)

        expected_projects = set(case["expectedProjectIds"])
        forbidden_projects = set(case["forbiddenProjectIds"])
        actual_projects = [match["id"] for match in result["matches"]]
        evidence_total += len(actual_projects)
        evidence_correct += sum(
            project_id in expected_projects for project_id in actual_projects
        )

        case_unsupported = 0
        for match in result["matches"]:
            project = projects_by_id[match["id"]]
            supported_skills = {
                claim["skill"] for claim in project.get("claims", [])
            }
            case_unsupported += sum(
                skill not in supported_skills for skill in match["skills"]
            )
        unsupported_claims += case_unsupported

        case_results.append(
            {
                "id": case["id"],
                "mode": result["mode"],
                "latencyMs": latency_ms,
                "requirements": result["requirements"],
                "missingExpectedRequirements": sorted(
                    expected_requirements - actual_requirements
                ),
                "unexpectedRequirements": sorted(
                    actual_requirements - expected_requirements
                ),
                "projectIds": actual_projects,
                "missingExpectedProjectIds": sorted(
                    expected_projects - set(actual_projects)
                ),
                "forbiddenProjectIds": sorted(
                    forbidden_projects & set(actual_projects)
                ),
                "unsupportedClaims": case_unsupported,
            }
        )

    metrics = {
        "requirementPrecision": rounded(
            ratio(
                requirement_true_positives,
                requirement_true_positives + requirement_false_positives,
            )
        ),
        "requirementRecall": rounded(
            ratio(
                requirement_true_positives,
                requirement_true_positives + requirement_false_negatives,
            )
        ),
        "evidenceAccuracy": rounded(ratio(evidence_correct, evidence_total)),
        "unsupportedClaims": unsupported_claims,
    }
    forbidden_matches = sum(
        len(case_result["forbiddenProjectIds"]) for case_result in case_results
    )
    passed = (
        metrics["requirementPrecision"] >= thresholds["requirementPrecision"]
        and metrics["requirementRecall"] >= thresholds["requirementRecall"]
        and metrics["evidenceAccuracy"] >= thresholds["evidenceAccuracy"]
        and metrics["unsupportedClaims"] <= thresholds["unsupportedClaims"]
        and forbidden_matches == 0
    )

    return {
        "schemaVersion": 1,
        "evaluatedAt": datetime.now(timezone.utc).isoformat(),
        "mode": next(iter(observed_modes)) if len(observed_modes) == 1 else "mixed",
        "cases": len(cases),
        **metrics,
        "averageLatencyMs": round(statistics.fmean(latencies), 2),
        "passed": passed,
        "caseResults": case_results,
    }


def print_summary(report: dict) -> None:
    print(f"Matcher evaluation ({report['mode']}): {report['cases']} cases")
    print(f"  Requirement precision: {report['requirementPrecision']:.1%}")
    print(f"  Requirement recall:    {report['requirementRecall']:.1%}")
    print(f"  Evidence accuracy:     {report['evidenceAccuracy']:.1%}")
    print(f"  Unsupported claims:    {report['unsupportedClaims']}")
    print(f"  Average latency:       {report['averageLatencyMs']:.2f} ms")
    for case in report["caseResults"]:
        status = "PASS"
        if (
            case["missingExpectedRequirements"]
            or case["unexpectedRequirements"]
            or case["forbiddenProjectIds"]
            or case["unsupportedClaims"]
        ):
            status = "REVIEW"
        print(f"  [{status}] {case['id']}")
    print("Evaluation passed." if report["passed"] else "Evaluation failed.")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--live", action="store_true")
    parser.add_argument(
        "--output", default="evaluation/results/latest.json", type=Path
    )
    parser.add_argument("--check", action="store_true")
    arguments = parser.parse_args()

    report = evaluate(arguments.live)
    print_summary(report)
    if not arguments.check:
        output = arguments.output
        if not output.is_absolute():
            output = ROOT / output
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    return 0 if report["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
