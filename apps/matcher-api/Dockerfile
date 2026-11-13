FROM python:3.13-slim
WORKDIR /app
COPY apps/matcher-api/requirements.txt ./
RUN apt-get update \
    && apt-get upgrade --yes \
    && rm -rf /var/lib/apt/lists/* \
    && python -m pip install --no-cache-dir --only-binary=:all: --require-hashes -r requirements.txt \
    && python -m pip uninstall --yes msgpack setuptools urllib3 pip
COPY apps/matcher-api/*.py ./
COPY apps/matcher-api/taxonomy.json ./
ENV HOST=0.0.0.0 PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
RUN useradd --create-home matcher
USER matcher
EXPOSE 8000
HEALTHCHECK --interval=10s --timeout=3s CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/ready', timeout=2)"
CMD ["python", "server.py"]
