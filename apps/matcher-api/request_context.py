"""Correlation metadata propagated to the analysis thread without request content."""
from contextvars import ContextVar

request_id = ContextVar("request_id", default="unknown")
