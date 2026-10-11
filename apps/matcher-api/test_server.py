"""Exercise the real ASGI boundary without calling Gemini or storing vacancies."""
import os
import unittest
from unittest.mock import patch
from fastapi.testclient import TestClient
import server
from capacity import AnalysisCapacity

PAYLOAD = {"vacancy": "Looking for a React and TypeScript frontend developer.",
           "projects": [{"id": "example", "title": "Example", "evidence": "React TypeScript"}]}


class ServerTests(unittest.TestCase):
    def setUp(self):
        self.env = patch.dict(os.environ, {"MATCHER_API_TOKEN": "test-token", "GEMINI_API_KEY": ""})
        self.env.start()
        self.client = TestClient(server.app)
        self.headers = {"Authorization": "Bearer test-token", "X-Request-ID": "test-request"}

    def tearDown(self):
        self.client.close()
        self.env.stop()

    def test_health_and_readiness(self):
        self.assertEqual(self.client.get("/health").status_code, 200)
        self.assertEqual(self.client.get("/ready").status_code, 200)
        with patch.dict(os.environ, {"MATCHER_API_TOKEN": ""}):
            self.assertEqual(self.client.get("/ready").status_code, 503)

    def test_authentication_and_validation(self):
        self.assertEqual(self.client.post("/match", json=PAYLOAD).status_code, 401)
        self.assertEqual(self.client.post("/match", json={"vacancy": "short", "projects": []}, headers=self.headers).status_code, 400)
        self.assertEqual(self.client.post("/match", content=b"a" * 300001, headers=self.headers).status_code, 413)

    def test_real_keyword_matching_contract(self):
        result = self.client.post("/match", json=PAYLOAD, headers=self.headers)
        self.assertEqual(result.status_code, 200)
        self.assertEqual(result.headers["X-Request-ID"], "test-request")
        self.assertEqual(result.json()["mode"], "keywords")
        self.assertEqual(result.json()["matches"][0]["id"], "example")

    def test_capacity_rejects_then_recovers(self):
        with patch.object(server, "capacity", AnalysisCapacity(concurrent=1, waiting=0)):
            with server.capacity.slot():
                result = self.client.post("/match", json=PAYLOAD, headers=self.headers)
                self.assertEqual(result.status_code, 503)
                self.assertEqual(result.json()["code"], "MATCHER_BUSY")
                self.assertEqual(result.headers["Retry-After"], "5")
            self.assertEqual(self.client.post("/match", json=PAYLOAD, headers=self.headers).status_code, 200)

    def test_failure_logs_do_not_include_request_text(self):
        with patch.object(server, "match_vacancy", side_effect=RuntimeError(PAYLOAD["vacancy"])):
            with self.assertLogs("matcher", level="ERROR") as logs:
                result = self.client.post("/match", json=PAYLOAD, headers=self.headers)
        self.assertEqual(result.status_code, 503)
        self.assertNotIn(PAYLOAD["vacancy"], "".join(logs.output))
        self.assertIn("test-request", "".join(logs.output))
