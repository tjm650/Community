# Portable Makefile for GitHub terminals/Codespaces and local dev (Linux/Mac/Windows with GNU Make)

.PHONY: run server run-android redis redis-stop cache-clear expo-run help

# Start the Expo dev server in the current `frontend` directory
run:
	npx expo start

# Start the Django backend server from `../backend/communityapi`
# Binds to 0.0.0.0 so it works in Codespaces/containers
server:
	cd ../backend/communityapi && python manage.py runserver 0.0.0.0:8000

# Build and run the Android app (requires Android SDK/emulator or device)
run-android:
	npx expo run:android

# Start Redis using Docker (recommended for GitHub terminals/Codespaces)
# If the container exists, it will be started; otherwise, it will be created
redis:
	docker run --name community-redis -p 6379:6379 -d redis:7-alpine || docker start community-redis

cd ../../Program Files/Redis && redis-server.exe redis.windows.conf

# Stop Redis container if running
redis-stop:
	docker stop community-redis || true

# Clear Expo cache and start
cache-clear:
	npx expo start --clear

# Alias for `run`
expo-run:
	npx expo start
	

# Show available targets
help:
	@echo "Available targets: run, server, run-android, redis, redis-stop, cache-clear, expo-run"