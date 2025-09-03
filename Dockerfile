FROM python:3.13-slim

# Environment
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# System dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy project
COPY . .

# Create logs folder
RUN mkdir -p /app/logs
RUN chmod -R 777 /app/logs

# Copy run.sh and make executable
COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

EXPOSE 8080
ENTRYPOINT ["/app/run.sh"]