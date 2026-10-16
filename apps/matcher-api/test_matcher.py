import os
import unittest
from unittest.mock import patch
from matcher import match_vacancy, detect_evidence_skills, detect_skills


def project(project_id, title, skills):
    return {
        "id": project_id,
        "title": title,
        "summary": title,
        "claims": [
            {
                "id": f"{project_id}-{index}",
                "skill": skill,
                "statement": f"Verified contribution demonstrating {skill} in delivery.",
                "context": title,
                "ownership": "individual",
                "source": "contribution",
            }
            for index, skill in enumerate(skills)
        ],
    }


class MatcherTests(unittest.TestCase):
    @patch.dict(os.environ, {"GEMINI_API_KEY": ""})
    def test_ranks_verified_projects_and_reports_missing_experience(self):
        result = match_vacancy("React TypeScript Python developer who writes tests", [
            project("vue-case", "Vue case", ["Vue", "Testing"]),
            project("react-case", "React case", ["React", "TypeScript", "Testing"])])
        self.assertEqual(result["matches"][0]["id"], "react-case")
        self.assertEqual(result["missing"], ["Python"])
        self.assertEqual(result["mode"], "keywords")

    @patch.dict(os.environ, {"GEMINI_API_KEY": ""})
    def test_never_returns_unrelated_projects(self):
        result = match_vacancy("Python developer building Python services", [
            project("a", "React", ["React"])])
        self.assertEqual(result["matches"], [])

    @patch.dict(os.environ, {"GEMINI_API_KEY": ""})
    def test_excludes_weak_matches_relative_to_the_best_evidence(self):
        result = match_vacancy(
            "React TypeScript testing and accessibility",
            [
                project("strong", "Strong", ["React", "TypeScript", "Testing", "Accessibility"]),
                project("weak", "Weak", ["React"]),
            ],
        )

        self.assertEqual([match["id"] for match in result["matches"]], ["strong"])

    @patch.dict(os.environ, {"GEMINI_API_KEY": ""})
    def test_adds_a_project_that_covers_a_requirement_the_top_case_misses(self):
        result = match_vacancy(
            "UX design system components and AI experience",
            [
                project("broad-frontend-case", "Broad frontend case", ["UX", "Design system", "Components"]),
                project("ai-case", "AI case", ["AI"]),
            ],
        )

        self.assertEqual(
            [match["id"] for match in result["matches"]],
            ["broad-frontend-case", "ai-case"],
        )
        self.assertEqual(result["missing"], [])

    @patch.dict(os.environ, {"GEMINI_API_KEY": ""})
    def test_classifies_priority_category_and_constraints(self):
        result = match_vacancy(
            "Senior React developer. TypeScript is nice to have. Hybrid role, Dutch required.",
            [project("react-case", "React case", ["React"])],
        )
        details = {item["name"]: item for item in result["requirementDetails"]}
        self.assertEqual(details["React"]["category"], "technology")
        self.assertEqual(details["TypeScript"]["priority"], "nice-to-have")
        self.assertIn("Seniority: Senior", details)
        self.assertIn("Work arrangement: hybrid", details)
        self.assertIn("Language: Dutch", details)

    @patch("matcher.extract_requirements", side_effect=lambda text: (detect_skills(text), "keywords"))
    def test_does_not_treat_lead_yourself_as_seniority(self, _extract):
        result = match_vacancy(
            "Lead yourself and work in a hybrid, remote environment.",
            [],
        )

        names = [item["name"] for item in result["requirementDetails"]]
        self.assertNotIn("Seniority: Lead", names)
        self.assertEqual(names, ["Work arrangement: hybrid / remote"])

    @patch("matcher.extract_requirements", side_effect=lambda text: (detect_skills(text), "keywords"))
    def test_classifies_dutch_profile_requirements_in_english(self, _extract):
        result = match_vacancy(
            "Minimaal 8 jaar ervaring. Nederlands vereist. Hybride werken en thuiswerken.",
            [],
        )

        names = [item["name"] for item in result["requirementDetails"]]
        self.assertIn("Experience: 8 years", names)
        self.assertIn("Language: Dutch", names)
        self.assertIn("Work arrangement: hybrid / remote", names)

    def test_skill_matching_uses_word_boundaries(self):
        self.assertNotIn("AI", detect_skills("maintainability"))
        self.assertIn("Testing", detect_skills("Playwright"))

    def test_ai_evidence_requires_an_applied_practice_or_concrete_tool(self):
        self.assertNotIn("AI", detect_evidence_skills("Momants.ai Agent"))
        self.assertNotIn(
            "AI", detect_evidence_skills("Designed the frontend of an AI agent widget")
        )
        self.assertNotIn(
            "AI", detect_evidence_skills("Python FastAPI CRUD application")
        )
        self.assertNotIn("AI", detect_evidence_skills("Node.js CRUD API"))
        self.assertNotIn("AI", detect_evidence_skills("Technologies: Gemini"))
        self.assertIn(
            "AI", detect_evidence_skills("Used Gemini with validated structured output")
        )


if __name__ == "__main__":
    unittest.main()


class ProviderRecoveryTests(unittest.TestCase):
    def test_provider_failure_falls_back_without_fabricating_ai(self):
        from unittest.mock import patch
        import os
        with patch.dict(os.environ, {"GEMINI_API_KEY": "test-key"}), patch("matcher.urllib.request.urlopen", side_effect=OSError("offline")) as provider, patch("matcher.time.sleep"):
            result = match_vacancy("React TypeScript developer", [project("example", "Example", ["React", "TypeScript"])])
        self.assertEqual(provider.call_count, 2)
        self.assertEqual(result["mode"], "keywords")
        self.assertEqual(result["matches"][0]["id"], "example")
