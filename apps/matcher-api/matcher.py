"""Public vacancy-matcher facade and evidence ranking."""

from requirement_extractor import extract_requirements
from taxonomy import (
    SKILLS,
    TRANSFERABLE_EVIDENCE,
    detect_evidence_skills,
    detect_skills,
)
from vacancy_analysis import classify_requirements, normalize_vacancy

MAX_MATCHES = 3


def _project_skills(project: dict) -> list[str]:
    return list(dict.fromkeys(
        claim.get("skill")
        for claim in project.get("claims", [])
        if claim.get("skill") in SKILLS
    ))


def _transferable_matches(
    requirements: list[str], exact: list[str], skills: list[str]
) -> list[dict]:
    return [
        {"requirement": requirement, "evidenceSkill": evidence_skill}
        for requirement in requirements
        if requirement not in exact
        for evidence_skill in TRANSFERABLE_EVIDENCE.get(requirement, ())
        if evidence_skill in skills
    ]


def _ranked_project(
    project: dict, requirements: list[str], index: int
) -> dict | None:
    skills = _project_skills(project)
    exact = [requirement for requirement in requirements if requirement in skills]
    transferable = _transferable_matches(requirements, exact, skills)
    matched = exact + [item["requirement"] for item in transferable]
    if not matched:
        return None
    return {
        "score": len(matched),
        "index": index,
        "match": {
            "id": project["id"],
            "title": project["title"],
            "evidence": project.get("summary", "")[:450],
            "skills": matched,
            "transferableSkills": transferable,
        },
    }


def _select_complementary_matches(
    ranked: list[dict], requirements: list[str]
) -> list[dict]:
    """Select strong cases while rewarding newly covered requirements."""
    selected = []
    uncovered = set(requirements)
    remaining = ranked[:]
    while remaining and uncovered and len(selected) < MAX_MATCHES:
        remaining.sort(key=lambda item: (
            -len(set(item["match"]["skills"]) & uncovered),
            -item["score"],
            item["index"],
        ))
        candidate = remaining.pop(0)
        newly_covered = set(candidate["match"]["skills"]) & uncovered
        if not newly_covered:
            break
        selected.append(candidate["match"])
        uncovered -= newly_covered
    return selected


def match_vacancy(vacancy: str, projects: list[dict]) -> dict:
    """Match vacancy requirements to explicitly verified project claims."""
    normalized_vacancy = normalize_vacancy(vacancy)
    extracted_requirements, mode = extract_requirements(normalized_vacancy)
    requirement_details = classify_requirements(
        normalized_vacancy, extracted_requirements
    )
    requirements = [item["name"] for item in requirement_details]
    ranked = [
        candidate
        for index, project in enumerate(projects)
        if (candidate := _ranked_project(project, requirements, index))
    ]
    matches = _select_complementary_matches(ranked, requirements)
    supported = {skill for match in matches for skill in match["skills"]}
    return {
        "mode": mode,
        "requirements": requirements,
        "requirementDetails": requirement_details,
        "missing": [skill for skill in requirements if skill not in supported],
        "matches": matches,
    }
