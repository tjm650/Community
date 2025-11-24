FROM python:3.10-slim

WORKDIR /app

# Copy and install Python dependencies
COPY backend/requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy project code
COPY backend/ .

# Run migrations and start server
CMD python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT
