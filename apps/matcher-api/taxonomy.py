"""Canonical matcher taxonomy and reusable skill detection."""

from dataclasses import dataclass
import json
from pathlib import Path
import re


@dataclass(frozen=True)
class SkillDefinition:
    name: str
    category: str
    vacancy_patterns: tuple[str, ...]
    evidence_patterns: tuple[str, ...]
    transferable_from: tuple[str, ...] = ()


with Path(__file__).with_name("taxonomy.json").open(encoding="utf-8") as source:
    TAXONOMY = json.load(source)

SKILL_DEFINITIONS = tuple(
    SkillDefinition(
        definition["name"],
        definition["category"],
        tuple(definition["vacancyPatterns"]),
        tuple(definition["evidencePatterns"]),
        tuple(definition.get("transferableFrom", ())),
    )
    for definition in TAXONOMY["skills"]
)

SKILLS = {definition.name: definition.vacancy_patterns for definition in SKILL_DEFINITIONS}
EVIDENCE_SKILLS = {definition.name: definition.evidence_patterns for definition in SKILL_DEFINITIONS}
SKILL_CATEGORIES = {definition.name: definition.category for definition in SKILL_DEFINITIONS}
TRANSFERABLE_EVIDENCE = {definition.name: definition.transferable_from for definition in SKILL_DEFINITIONS if definition.transferable_from}

AI_TOOL_PATTERNS = tuple(TAXONOMY["aiEvidence"]["toolPatterns"])
AI_APPLIED_PATTERNS = tuple(TAXONOMY["aiEvidence"]["appliedPatterns"])
AI_ENGINEERING_CONTEXT = re.compile(TAXONOMY["aiEvidence"]["contextPattern"], re.I)


def detect_skills(text: str) -> list[str]:
    """Return taxonomy labels explicitly present in text."""
    return [name for name, patterns in SKILLS.items() if any(re.search(pattern, text, re.I) for pattern in patterns)]


def detect_evidence_skills(text: str) -> list[str]:
    """Require an applied context before treating generic AI text as evidence."""
    skills = [
        name
        for name, patterns in EVIDENCE_SKILLS.items()
        if name != "AI" and any(re.search(pattern, text, re.I) for pattern in patterns)
    ]
    has_ai_tool = any(re.search(pattern, text, re.I) for pattern in AI_TOOL_PATTERNS)
    has_applied_ai = any(re.search(pattern, text, re.I) for pattern in AI_APPLIED_PATTERNS)
    if has_applied_ai or (has_ai_tool and AI_ENGINEERING_CONTEXT.search(text)):
        skills.append("AI")
    return skills
