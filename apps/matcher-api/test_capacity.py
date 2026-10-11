import time
import unittest
from concurrent.futures import ThreadPoolExecutor
from threading import Lock
from capacity import AnalysisCapacity, CapacityBusy


class CapacityTests(unittest.TestCase):
    def test_releases_capacity_after_failure(self):
        capacity = AnalysisCapacity(concurrent=1, waiting=0)
        with self.assertRaises(ValueError):
            with capacity.slot():
                raise ValueError("failed analysis")
        with capacity.slot():
            pass

    def test_wait_has_a_deadline_and_frees_queue_slot(self):
        capacity = AnalysisCapacity(concurrent=1, waiting=1, wait_seconds=0.01)
        with capacity.slot():
            with self.assertRaises(CapacityBusy):
                with capacity.slot():
                    self.fail("should not acquire an occupied slot")
        with capacity.slot():
            pass

    def test_100_requests_never_exceed_four_active_analyses(self):
        capacity = AnalysisCapacity(concurrent=4, waiting=8, wait_seconds=0.03)
        lock = Lock()
        active = 0
        peak = 0

        def analyse(_index):
            nonlocal active, peak
            try:
                with capacity.slot():
                    with lock:
                        active += 1
                        peak = max(peak, active)
                    time.sleep(0.05)
                    with lock:
                        active -= 1
                    return True
            except CapacityBusy:
                return False

        with ThreadPoolExecutor(max_workers=100) as pool:
            results = list(pool.map(analyse, range(100)))
        self.assertLessEqual(peak, 4)
        self.assertTrue(any(results))
        self.assertFalse(all(results))
        with capacity.slot():
            pass
