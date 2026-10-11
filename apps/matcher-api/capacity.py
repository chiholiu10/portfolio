"""Bound expensive work and the number of requests waiting for a slot."""
from contextlib import contextmanager
from threading import BoundedSemaphore


class CapacityBusy(Exception):
    pass


class AnalysisCapacity:
    def __init__(self, concurrent=4, waiting=8, wait_seconds=3):
        self.active = BoundedSemaphore(concurrent)
        self.admitted = BoundedSemaphore(concurrent + waiting)
        self.wait_seconds = wait_seconds

    @contextmanager
    def slot(self):
        if not self.admitted.acquire(blocking=False):
            raise CapacityBusy()
        acquired = False
        try:
            acquired = self.active.acquire(timeout=self.wait_seconds)
            if not acquired:
                raise CapacityBusy()
            yield
        finally:
            if acquired:
                self.active.release()
            self.admitted.release()
