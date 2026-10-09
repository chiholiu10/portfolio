"""Private HTTP service; Next.js is the public gateway. No request text is stored."""
import hmac
import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from matcher import match_vacancy


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_args):
        pass

    def respond(self, status, payload):
        data = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        self.respond(200 if self.path == "/health" else 404, {"ok": self.path == "/health"})

    def do_POST(self):
        if self.path != "/match":
            return self.respond(404, {"error": "Not found"})
        secret = os.environ.get("MATCHER_API_TOKEN", "")
        if not secret or not hmac.compare_digest(self.headers.get("Authorization", ""), "Bearer " + secret):
            return self.respond(401, {"error": "Unauthorized"})
        try:
            size = int(self.headers.get("Content-Length", "0"))
            if not 0 < size <= 300_000:
                return self.respond(413, {"error": "Request too large"})
            payload = json.loads(self.rfile.read(size))
            vacancy, projects = payload["vacancy"], payload["projects"]
            if not isinstance(vacancy, str) or not 40 <= len(vacancy) <= 8000:
                raise ValueError("Invalid vacancy")
            if not isinstance(projects, list) or len(projects) > 100:
                raise ValueError("Invalid projects")
            for project in projects:
                if not isinstance(project, dict) or not all(isinstance(project.get(k), str) for k in ("id", "title", "evidence")):
                    raise ValueError("Invalid project")
            self.respond(200, match_vacancy(vacancy, projects))
        except (ValueError, KeyError, TypeError, UnicodeDecodeError):
            self.respond(400, {"error": "Invalid request"})
        except Exception:
            self.respond(503, {"error": "Matcher unavailable"})


if __name__ == "__main__":
    ThreadingHTTPServer((os.environ.get("HOST", "127.0.0.1"), 8000), Handler).serve_forever()
