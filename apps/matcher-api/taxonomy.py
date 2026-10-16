"""Canonical matcher taxonomy and reusable skill detection."""

from dataclasses import dataclass
import re


@dataclass(frozen=True)
class SkillDefinition:
    name: str
    category: str
    patterns: tuple[str, ...]
    transferable_from: tuple[str, ...] = ()


SKILL_DEFINITIONS = (
    SkillDefinition("React", "technology", (r"\breact(?:\.js)?\b",)),
    SkillDefinition("Next.js", "technology", (r"\bnext(?:[.,]?js)\b",)),
    SkillDefinition("TypeScript", "technology", (r"\btypescript\b",)),
    SkillDefinition("JavaScript", "technology", (r"\bjavascript\b",)),
    SkillDefinition("Vue", "technology", (r"\bvue(?:\.js|js|x)?\b",)),
    SkillDefinition("CSS", "technology", (r"\b(?:css|sass|styled.components|tailwind(?:css)?)\b",)),
    SkillDefinition("UX", "product", (r"\b(?:ux|user experience|gebruikerservaring|gebruiksgemak)\b",)),
    SkillDefinition("Testing", "quality", (r"\b(?:jest|cypress|playwright|tests?|testing|testen)\b",)),
    SkillDefinition("Storybook", "quality", (r"\bstorybook\b",)),
    SkillDefinition("Design system", "quality", (r"\bdesign.?system\b", r"\bdesignsysteem\b")),
    SkillDefinition("Components", "quality", (r"\b(?:reusable|herbruikbare?)\s+(?:ui\s+)?components?\b", r"\b(?:component library|component-based|componentenbibliotheek)\b")),
    SkillDefinition("Collaboration", "collaboration", (r"\b(?:collaborat\w*|samenwerk\w*|designers?|stakeholders?)\b",)),
    SkillDefinition("AEM", "platform", (r"\baem\b",)),
    SkillDefinition("Accessibility", "quality", (r"\b(?:wcag|accessib\w*|toegankelijk\w*)\b",)),
    SkillDefinition("SEO", "product", (r"\bseo\b",)),
    SkillDefinition("Python", "technology", (r"\bpython\b",)),
    SkillDefinition("Node.js", "technology", (r"\bnode(?:\.js|js)\b",)),
    SkillDefinition("GraphQL", "technology", (r"\bgraphql\b",)),
    SkillDefinition("Docker", "platform", (r"\bdocker(?: compose)?\b",)),
    SkillDefinition("CI/CD", "quality", (r"\bci\s*/?\s*cd\b", r"\bgithub actions\b", r"\bcontinuous (?:integration|delivery|deployment)\b")),
    SkillDefinition("AWS", "platform", (r"\b(?:aws|amazon web services)\b",)),
    SkillDefinition("AWS CDK", "platform", (r"\b(?:aws\s+cdk|cloud development kit)\b",)),
    SkillDefinition("Infrastructure as Code", "platform", (r"\b(?:infrastructure[ -]as[ -]code|infra[ -]as[ -]code|iac)\b",)),
    SkillDefinition("Kafka", "platform", (r"\b(?:apache\s+)?kafka\b",)),
    SkillDefinition("Kong", "platform", (r"\bkong\b(?=.{0,40}\bapi\b)|\bkong api gateway\b",)),
    SkillDefinition("MACH architecture", "platform", (r"\bmach(?:\s+architecture)?\b",)),
    SkillDefinition("Sanity", "platform", (r"\bsanity(?:\.io)?\b",), ("Headless CMS",)),
    SkillDefinition("Headless CMS", "platform", (r"\b(?:headless cms|contentful|composable cms)\b",)),
    SkillDefinition("Security", "quality", (r"\b(?:security|secure coding|security threats?|beveiliging)\b",)),
    SkillDefinition("OWASP Top 10", "quality", (r"\bowasp(?:\s+top\s*10)?\b",), ("Security",)),
    SkillDefinition("Service-oriented architecture", "technology", (r"\bservice[ -]oriented(?: architecture)?\b",)),
    SkillDefinition("API-first architecture", "technology", (r"\bapi[ -]first(?: architecture)?\b",), ("APIs",)),
    SkillDefinition("Solution Architecture", "technology", (r"\bsolution architecture\b",)),
    SkillDefinition("Technical leadership", "collaboration", (r"\b(?:technical leadership|technical lead|lead the team|take the lead)\b",)),
    SkillDefinition("Customer focus", "product", (r"\b(?:customer at the cent(?:er|re)|customer focus|customer-centric|klant centraal)\b",)),
    SkillDefinition("Quality engineering", "quality", (r"\b(?:quality[ -]oriented|quality engineering|strong focus on quality)\b",)),
    SkillDefinition("AI", "technology", (r"\b(?:ai|artificial intelligence|kunstmatige intelligentie)\b", r"\b(?:gemini|openai|groq|claude|llms?|rag|pgvector|langchain)\b", r"\b(?:embeddings?|semantic search|vector search)\b")),
    SkillDefinition("WordPress", "platform", (r"\bwordpress\b",)),
    SkillDefinition("Shopify", "platform", (r"\bshopify\b",)),
    SkillDefinition("State management", "technology", (r"\b(?:redux|vuex|zustand|context api|state management)\b",)),
    SkillDefinition("Full-stack", "technology", (r"\b(?:full[ -]?stack|across the stack)\b",)),
    SkillDefinition("APIs", "technology", (r"(?<!context )\b(?:apis?|fastapi|api integrations?)\b",)),
    SkillDefinition("Integrations", "technology", (r"\b(?:integrations?|integrat(?:e|ed|ing))\b",)),
    SkillDefinition("Client-facing", "collaboration", (r"\b(?:client[ -]?facing|customer[ -]?facing)\b",)),
    SkillDefinition("Business impact", "product", (r"\b(?:business (?:value|impact|terms|outcomes?)|measurable outcomes?|conversion|growth)\b",)),
    SkillDefinition("Product ownership", "product", (r"\b(?:product ownership|end[ -]to[ -]end product|designed and built|own the outcome)\b",)),
)

SKILLS = {definition.name: definition.patterns for definition in SKILL_DEFINITIONS}
SKILL_CATEGORIES = {definition.name: definition.category for definition in SKILL_DEFINITIONS}
TRANSFERABLE_EVIDENCE = {definition.name: definition.transferable_from for definition in SKILL_DEFINITIONS if definition.transferable_from}

AI_TOOL_PATTERNS = (r"\b(?:gemini|openai|groq|claude|llms?|rag|pgvector|langchain)\b", r"\b(?:embeddings?|semantic search|vector search)\b")
AI_APPLIED_PATTERNS = (r"\b(?:applied ai|ai integration|ai-assisted|ai toolchain|ai api|ai model|ai workflow|ai guardrails?)\b",)
AI_ENGINEERING_CONTEXT = re.compile(r"\b(?:build|built|create|created|implement|implemented|integrate|integrated|use|used|using|configure|configured|extract|extracted|generate|generated|retrieve|retrieval|evaluate|evaluated|validate|validated|fallback|guardrails?|prompts?|structured output|api)\b", re.I)


def detect_skills(text: str) -> list[str]:
    """Return taxonomy labels explicitly present in text."""
    return [name for name, patterns in SKILLS.items() if any(re.search(pattern, text, re.I) for pattern in patterns)]


def detect_evidence_skills(text: str) -> list[str]:
    """Require an applied context before treating generic AI text as evidence."""
    skills = [name for name in detect_skills(text) if name != "AI"]
    has_ai_tool = any(re.search(pattern, text, re.I) for pattern in AI_TOOL_PATTERNS)
    has_applied_ai = any(re.search(pattern, text, re.I) for pattern in AI_APPLIED_PATTERNS)
    if has_applied_ai or (has_ai_tool and AI_ENGINEERING_CONTEXT.search(text)):
        skills.append("AI")
    return skills
