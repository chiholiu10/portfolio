"""Reload the development ASGI server when Python sources change."""
import pathlib
import signal
import subprocess
import sys
import time


def snapshot():
    return {str(path): path.stat().st_mtime_ns for path in pathlib.Path(".").glob("*.py")}


process = subprocess.Popen([sys.executable, "server.py"])
started = time.monotonic()
failures = 0


def stop(*_args):
    process.terminate()
    process.wait(timeout=5)
    sys.exit(0)


signal.signal(signal.SIGTERM, stop)
signal.signal(signal.SIGINT, stop)
state = snapshot()
try:
    while True:
        time.sleep(0.5)
        current = snapshot()
        if current != state or process.poll() is not None:
            if process.poll() is None:
                process.terminate()
                process.wait(timeout=5)
            else:
                failures = failures + 1 if time.monotonic() - started < 5 else 0
                # Avoid a rapid restart loop for missing dependencies or a persistent startup error.
                time.sleep(min(5, 0.5 * (2 ** min(failures, 4))))
            process = subprocess.Popen([sys.executable, "server.py"])
            started = time.monotonic()
            state = current
finally:
    if process.poll() is None:
        process.terminate()
        process.wait(timeout=5)
