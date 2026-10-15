import os
import unittest
from unittest.mock import patch
from matcher import match_vacancy, detect_evidence_skills, detect_skills


class MatcherTests(unittest.TestCase):
    @patch.dict(os.environ, {"GEMINI_API_KEY": ""})
    def test_ranks_verified_projects_and_reports_missing_experience(self):
        result = match_vacancy("React TypeScript Python developer who writes tests", [
            {"id": "vue-case", "title": "Vue case", "evidence": "Vue and Jest", "summary": "Vue dashboard"},
            {"id": "react-case", "title": "React case", "evidence": "React TypeScript Jest", "summary": "Reusable React interface"}])
        self.assertEqual(result["matches"][0]["id"], "react-case")
        self.assertEqual(result["missing"], ["Python"])
        self.assertEqual(result["mode"], "keywords")

    @patch.dict(os.environ, {"GEMINI_API_KEY": ""})
    def test_never_returns_unrelated_projects(self):
        result = match_vacancy("Python developer building Python services", [
            {"id": "a", "title": "React", "evidence": "React"}])
        self.assertEqual(result["matches"], [])

    @patch.dict(os.environ, {"GEMINI_API_KEY": ""})
    def test_excludes_weak_matches_relative_to_the_best_evidence(self):
        result = match_vacancy(
            "React TypeScript testing and accessibility",
            [
                {"id": "strong", "title": "Strong", "evidence": "React TypeScript testing WCAG accessibility"},
                {"id": "weak", "title": "Weak", "evidence": "React"},
            ],
        )

        self.assertEqual([match["id"] for match in result["matches"]], ["strong"])

    @patch.dict(os.environ, {"GEMINI_API_KEY": ""})
    def test_adds_a_project_that_covers_a_requirement_the_top_case_misses(self):
        result = match_vacancy(
            "UX design system components and AI experience",
            [
                {
                    "id": "broad-frontend-case",
                    "title": "Broad frontend case",
                    "evidence": "UX design system with reusable components",
                },
                {
                    "id": "ai-case",
                    "title": "AI case",
                    "evidence": "Built an explainable matcher using Gemini with validated output",
                },
            ],
        )

        self.assertEqual(
            [match["id"] for match in result["matches"]],
            ["broad-frontend-case", "ai-case"],
        )
        self.assertEqual(result["missing"], [])

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
            result = match_vacancy("React TypeScript developer", [{"id": "example", "title": "Example", "evidence": "React TypeScript"}])
        self.assertEqual(provider.call_count, 2)
        self.assertEqual(result["mode"], "keywords")
        self.assertEqual(result["matches"][0]["id"], "example")
