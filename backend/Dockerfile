# Backend Dockerfile
FROM python:3.13-slim

# Set work directory
WORKDIR /app

# Install system dependencies for mysqlclient
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    build-essential \
    pkg-config \
    && apt-get clean

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Expose port
EXPOSE 8000

# Run Django server
CMD if [ -f "manage.py" ]; then python manage.py runserver 0.0.0.0:8000; else django-admin startproject core . && python manage.py runserver 0.0.0.0:8000; fi