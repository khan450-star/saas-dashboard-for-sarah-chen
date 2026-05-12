FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt /app/requirements.txt
RUN python -m pip install --upgrade pip && \
    python -m pip install -r /app/requirements.txt

COPY . /app

CMD ["python", "-c", "import os, uvicorn; uvicorn.run('orchestrator:app', host='0.0.0.0', port=int(os.getenv('PORT', '8000')))"]