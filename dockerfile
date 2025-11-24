FROM python:3.10-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY backend/requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy project code
COPY backend/ .

# Create static files directory and collect static files
RUN mkdir -p staticfiles
RUN python manage.py collectstatic --noinput

# Run the application
CMD python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT
