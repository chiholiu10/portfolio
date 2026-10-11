FROM python:3.13-slim
WORKDIR /app
COPY apps/matcher-api/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY apps/matcher-api/*.py ./
ENV HOST=0.0.0.0 PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
RUN useradd --create-home matcher
USER matcher
EXPOSE 8000
HEALTHCHECK --interval=10s --timeout=3s CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/ready', timeout=2)"
CMD ["python", "server.py"]
