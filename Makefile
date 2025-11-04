# Start the Expo dev server in the current `frontend` directory
run:
	npx expo start




# Clear Expo cache and start
cache-clear:
	npx expo start --clear



# Start the Django backend server from `../backend/communityapi`
server:
cd backend/communityapi && python manage.py runserver 



# Build and run the Android app (requires Android SDK/emulator or device)
run-android:
	cd frontend && npx expo run:android



# Start Redis using Docker (recommended for GitHub terminals/Codespaces)
# If the container exists, it will be started; otherwise, it will be created
redis:
cd ../../Program Files/Redis && redis-server.exe redis.windows.conf

