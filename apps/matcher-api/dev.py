"""Reload the dependency-free development server when Python sources change."""
import pathlib
import signal
import subprocess
import sys
import time


def snapshot():
    return {str(path): path.stat().st_mtime_ns for path in pathlib.Path(".").glob("*.py")}


process = subprocess.Popen([sys.executable, "server.py"])


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
            process = subprocess.Popen([sys.executable, "server.py"])
            state = current
finally:
    if process.poll() is None:
        process.terminate()
        process.wait(timeout=5)
