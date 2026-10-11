import os
import unittest
from unittest.mock import patch
from matcher import match_vacancy, detect_skills


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

    def test_skill_matching_uses_word_boundaries(self):
        self.assertNotIn("AI", detect_skills("maintainability"))
        self.assertIn("Testing", detect_skills("Playwright"))


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
