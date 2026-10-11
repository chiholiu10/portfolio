"""Private ASGI service. Logs contain request IDs and categories, never request text."""
import hmac
import json
import logging
import os
import re
import time
import uuid

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ConfigDict, Field, ValidationError
from starlette.concurrency import run_in_threadpool
from request_context import request_id as current_request_id
from matcher import match_vacancy
from capacity import AnalysisCapacity, CapacityBusy

logger = logging.getLogger("matcher")
capacity = AnalysisCapacity()
app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)


class Project(BaseModel):
    model_config = ConfigDict(strict=True)
    id: str = Field(pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$", max_length=200)
    title: str = Field(max_length=1000)
    evidence: str = Field(max_length=100000)
    summary: str = Field(default="", max_length=100000)


class MatchRequest(BaseModel):
    model_config = ConfigDict(strict=True)
    vacancy: str = Field(min_length=40, max_length=8000)
    projects: list[Project] = Field(max_length=100)


def response(status, payload, retry_after=None):
    headers = {"Cache-Control": "no-store"}
    if retry_after is not None:
        headers["Retry-After"] = str(retry_after)
    return JSONResponse(payload, status_code=status, headers=headers)


@app.middleware("http")
async def request_logging(request: Request, call_next):
    supplied = request.headers.get("X-Request-ID", "")
    request_id = supplied if re.fullmatch(r"[a-zA-Z0-9-]{1,64}", supplied) else str(uuid.uuid4())
    context_token = current_request_id.set(request_id)
    started = time.monotonic()
    try:
        result = await call_next(request)
    except Exception as error:
        logger.error(json.dumps({"event": "matcher_failure", "requestId": request_id,
                                 "category": type(error).__name__}))
        result = response(503, {"code": "MATCHER_UNAVAILABLE"})
    current_request_id.reset(context_token)
    result.headers["X-Request-ID"] = request_id
    if request.url.path == "/match":
        logger.info(json.dumps({"event": "matcher_request", "requestId": request_id,
                                "status": result.status_code,
                                "durationMs": round((time.monotonic() - started) * 1000)}))
    return result


@app.get("/health")
async def health():
    return response(200, {"ok": True})


@app.get("/ready")
async def ready():
    configured = bool(os.environ.get("MATCHER_API_TOKEN"))
    return response(200 if configured else 503, {"ok": configured})


@app.post("/match")
async def match(request: Request):
    secret = os.environ.get("MATCHER_API_TOKEN", "")
    if not secret or not hmac.compare_digest(request.headers.get("Authorization", "").encode(),
                                              ("Bearer " + secret).encode()):
        return response(401, {"error": "Unauthorized"})
    body = bytearray()
    async for chunk in request.stream():
        body.extend(chunk)
        if len(body) > 300000:
            return response(413, {"error": "Request too large"})
    try:
        payload = MatchRequest.model_validate_json(body)
    except (ValidationError, ValueError):
        return response(400, {"error": "Invalid request"})

    def analyse():
        with capacity.slot():
            return match_vacancy(payload.vacancy, [project.model_dump() for project in payload.projects])

    try:
        result = await run_in_threadpool(analyse)
        return response(200, result)
    except CapacityBusy:
        return response(503, {"code": "MATCHER_BUSY"}, retry_after=5)


if __name__ == "__main__":
    import uvicorn
    logging.basicConfig(level=logging.INFO, format="%(message)s")
    uvicorn.run(app, host=os.environ.get("HOST", "127.0.0.1"), port=int(os.environ.get("PORT", "8000")),
                access_log=False, limit_concurrency=64, timeout_keep_alive=5)
