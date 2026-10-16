"""Normalize vacancy text and classify explicit requirements."""

import html
import re

from taxonomy import SKILL_CATEGORIES, SKILLS

NICE_TO_HAVE = re.compile(r"\b(?:nice[ -]to[ -]have|pré|preference|preferred|plus|bonus|advantage|wens|gewenst|bij voorkeur|zou mooi zijn)\b", re.I)
CONSTRAINT_PATTERNS = (
    ("Seniority", "seniority", re.compile(r"\b(senior|lead|medior|junior)(?=\s+(?:[a-z-]+\s+){0,2}(?:engineer|developer|specialist|architect)\b)", re.I)),
    ("Experience", "experience", re.compile(r"\b(\d+\+?\s*(?:years?|jaar))\b", re.I)),
    ("Language", "language", re.compile(r"\b(?:fluent|professional|proficient)\s+(Dutch|English|Nederlands|Engels)\b|\b(Dutch|English|Nederlands|Engels)\b(?=\s+(?:required|needed|vereist))", re.I)),
)
PRIORITY_WEIGHT = {"context": 0, "nice-to-have": 1, "must-have": 2}


def normalize_vacancy(text: str) -> str:
    normalized = html.unescape(text).replace("\u00a0", " ")
    normalized = re.sub(r"\bnext\s*,\s*js\b", "Next.js", normalized, flags=re.I)
    return re.sub(r"(?is)\bwhat we offer\b.*?(?=\byou(?:(?:'|’)ll| will) bring\b)", "\n", normalized)


def sentence_context(text: str, start: int, end: int) -> str:
    separators = (".", "!", "?", ";", "\n")
    left = max(text.rfind(separator, 0, start) for separator in separators)
    boundaries = [position for separator in separators if (position := text.find(separator, end)) >= 0]
    right = min(boundaries) + 1 if boundaries else len(text)
    return text[left + 1:right]


def is_explicitly_optional(name: str, nearby: str) -> bool:
    marker = NICE_TO_HAVE.search(nearby)
    if not marker:
        return False
    skill = next((match for pattern in SKILLS.get(name, ()) if (match := re.search(pattern, nearby, re.I))), None)
    if not skill:
        return True
    return min(abs(marker.start() - skill.end()), abs(skill.start() - marker.end())) <= 18


def requirement_priority(text: str, position: int, nearby: str, name: str) -> str:
    if is_explicitly_optional(name, nearby):
        return "nice-to-have"
    if name == "Full-stack" and re.search(r"\bfull[ -]?stack\s+(?:engineer|developer)\b", nearby, re.I):
        return "must-have"
    preceding = text[:position].lower()
    bring = max(preceding.rfind("you'll bring"), preceding.rfind("you’ll bring"), preceding.rfind("you will bring"))
    challenge = preceding.rfind("the challenge")
    if bring >= 0 and bring > challenge:
        return "must-have"
    return "context" if challenge >= 0 else "must-have"


def _skill_details(vacancy: str, requirements: list[str]) -> list[dict]:
    details = []
    for name in requirements:
        matches = [match for pattern in SKILLS.get(name, ()) for match in re.finditer(pattern, vacancy, re.I)]
        priorities = [requirement_priority(vacancy, match.start(), sentence_context(vacancy, match.start(), match.end()), name) for match in matches]
        details.append({"name": name, "category": SKILL_CATEGORIES[name], "priority": max(priorities, key=PRIORITY_WEIGHT.get, default="must-have")})
    return details


def _constraint_details(vacancy: str, existing: list[dict]) -> list[dict]:
    details = []
    existing_names = {item["name"].lower() for item in existing}
    for label, category, pattern in CONSTRAINT_PATTERNS:
        for match in pattern.finditer(vacancy):
            detail = next(group for group in match.groups() if group)
            if label == "Language":
                detail = {"nederlands": "Dutch", "engels": "English"}.get(detail.lower(), detail)
            elif label == "Experience":
                detail = re.sub(r"\bjaar\b", "years", detail, flags=re.I)
            name = f"{label}: {detail}"
            if name.lower() not in existing_names:
                details.append({"name": name, "category": category, "priority": "must-have", "detail": detail})
                existing_names.add(name.lower())
    return details


def _work_arrangement_detail(vacancy: str) -> dict | None:
    aliases = {"hybride": "hybrid", "op locatie": "on-site", "on site": "on-site"}
    arrangements = []
    for match in re.finditer(r"\b(?:remote|hybrid|hybride|on[ -]site|op locatie|thuiswerk\w*)\b", vacancy, re.I):
        value = match.group(0).lower()
        normalized = "remote" if value.startswith("thuiswerk") else aliases.get(value, value)
        if normalized not in arrangements:
            arrangements.append(normalized)
    if not arrangements:
        return None
    detail = " / ".join(arrangements)
    return {"name": f"Work arrangement: {detail}", "category": "work-arrangement", "priority": "must-have", "detail": detail}


def classify_requirements(vacancy: str, requirements: list[str]) -> list[dict]:
    """Add category and priority metadata without inventing requirements."""
    details = _skill_details(vacancy, requirements)
    details.extend(_constraint_details(vacancy, details))
    if arrangement := _work_arrangement_detail(vacancy):
        details.append(arrangement)
    return details[:30]
