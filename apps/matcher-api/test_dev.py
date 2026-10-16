"""Real process recovery test, isolated from the running development server."""
import json
import os
import pathlib
import signal
import socket
import subprocess
import sys
import time
import unittest
import urllib.request


class DevelopmentRecoveryTests(unittest.TestCase):
    def test_supervisor_restarts_crashed_backend_and_serves_requests(self):
        with socket.socket() as sock:
            sock.bind(("127.0.0.1", 0))
            port = sock.getsockname()[1]
        env = {**os.environ, "PORT": str(port), "MATCHER_API_TOKEN": "test-token", "GEMINI_API_KEY": ""}
        process = subprocess.Popen([sys.executable, "dev.py"], cwd=pathlib.Path(__file__).parent,
                                   env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                                   start_new_session=True)
        base = f"http://127.0.0.1:{port}"

        def wait_ready():
            deadline = time.monotonic() + 10
            while time.monotonic() < deadline:
                try:
                    with urllib.request.urlopen(base + "/ready", timeout=1) as result:
                        if result.status == 200:
                            return
                except OSError:
                    time.sleep(0.1)
            self.fail("Backend did not recover within 10 seconds")

        def match():
            request = urllib.request.Request(base + "/match", method="POST",
                headers={"Authorization": "Bearer test-token", "Content-Type": "application/json"},
                data=json.dumps({"vacancy": "React TypeScript frontend developer with testing experience.",
                                 "projects": [{"id": "example", "title": "Example",
                                               "summary": "Verified React case",
                                               "claims": [{"id": "example-react", "skill": "React",
                                                           "statement": "Built a verified React interface for production.",
                                                           "context": "Example", "ownership": "individual",
                                                           "source": "contribution"},
                                                          {"id": "example-typescript", "skill": "TypeScript",
                                                           "statement": "Applied TypeScript to frontend contracts.",
                                                           "context": "Example", "ownership": "individual",
                                                           "source": "contribution"}]}]}).encode())
            with urllib.request.urlopen(request, timeout=3) as result:
                self.assertEqual(json.load(result)["matches"][0]["id"], "example")

        try:
            wait_ready()
            match()
            # The supervisor writes its child's PID for deterministic crash testing.
            child = int(subprocess.check_output(["ps", "-o", "pid=", "--ppid", str(process.pid)]).strip()) if sys.platform != "darwin" else int(subprocess.check_output(["pgrep", "-P", str(process.pid)]).strip())
            os.kill(child, signal.SIGKILL)
            time.sleep(0.2)
            wait_ready()
            match()
        finally:
            os.killpg(process.pid, signal.SIGTERM)
            process.wait(timeout=5)
