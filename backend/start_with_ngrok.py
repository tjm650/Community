#!/usr/bin/env python
"""
Django Server Script
Usage: python start_with_ngrok.py
Starts Django development server on port 8000
"""

import os
import sys
import subprocess
import threading
import time
import signal
from pathlib import Path

def start_django_server():
    """Start Django development server"""
    try:
        print("Starting Django development server...")
        os.chdir(Path(__file__).parent)  # Change to script directory

        # Check if port 8000 is already in use
        import socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        result = sock.connect_ex(('127.0.0.1', 8000))
        sock.close()

        if result == 0:
            print("[INFO] Port 8000 already in use - Django server may already be running")
            return None  # Don't start a new server

        process = subprocess.Popen([sys.executable, 'manage.py', 'runserver', '0.0.0.0:8000'],
                                 stdout=subprocess.PIPE,
                                 stderr=subprocess.STDOUT,
                                 text=True,
                                 bufsize=1,
                                 universal_newlines=True)
        print("[OK] Django server starting on http://0.0.0.0:8000")
        return process
    except Exception as e:
        print(f"[ERROR] Error starting Django server: {e}")
        return None

def start_ngrok():
    """Start ngrok tunnel"""
    try:
        print("Starting ngrok tunnel...")
        process = subprocess.Popen(['ngrok', 'http', '8000'],
                                 stdout=subprocess.PIPE,
                                 stderr=subprocess.STDOUT,
                                 text=True,
                                 bufsize=1,
                                 universal_newlines=True)
        print("[OK] Ngrok tunnel starting...")
        return process
    except Exception as e:
        print(f"[ERROR] Error starting ngrok: {e}")
        return None

def monitor_output(process, name):
    """Monitor process output"""
    if process and process.stdout:
        try:
            for line in iter(process.stdout.readline, ''):
                if line.strip():
                    try:
                        print(f"[{name}] {line.strip()}")
                    except UnicodeEncodeError:
                        # Handle encoding issues on Windows
                        print(f"[{name}] {line.strip().encode('ascii', 'ignore').decode('ascii')}")
        except Exception as e:
            # If monitoring fails, just continue without monitoring
            print(f"[INFO] Output monitoring for {name} stopped: {e}")
            return

def cleanup_processes(processes):
    """Clean up running processes"""
    for name, process in processes.items():
        if process and process.poll() is None:
            print(f"Terminating {name}...")
            try:
                if os.name == 'nt':  # Windows
                    process.terminate()
                    time.sleep(1)
                    if process.poll() is None:
                        process.kill()
                else:
                    process.terminate()
                    time.sleep(2)
                    if process.poll() is None:
                        process.kill()
            except:
                pass

def signal_handler(signum, frame):
    """Handle shutdown signals"""
    print("\nShutting down server...")
    cleanup_processes(running_processes)
    sys.exit(0)

# Global variable to track processes
running_processes = {}

def main():
    # Setup signal handlers for graceful shutdown
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    try:
        print("Starting Django server...")
        print("=" * 50)

        # Start Django server
        django_process = start_django_server()
        if django_process:
            running_processes['django'] = django_process
            # Give Django server time to start
            print("Waiting for Django server to initialize...")
            time.sleep(5)
        else:
            print("[INFO] Django server appears to already be running on port 8000")
            return  # Exit if already running

        print("\n" + "=" * 50)
        print("Django server started successfully!")
        print("Local server: http://localhost:8000")
        print("To expose via ngrok, run: ngrok http 8000")
        print("Press Ctrl+C to stop the server")
        print("=" * 50)

        # Start monitoring thread for process output (optional)
        try:
            django_thread = threading.Thread(target=monitor_output, args=(django_process, 'DJANGO'), daemon=True)
            django_thread.start()
        except Exception as e:
            print(f"[INFO] Output monitoring disabled: {e}")

        # Keep the main thread alive
        while True:
            time.sleep(1)
            # Check if Django process has died
            if django_process.poll() is not None:
                print(f"\nDjango process has stopped (exit code: {django_process.returncode})")
                print("Shutting down...")
                cleanup_processes(running_processes)
                sys.exit(1)

    except KeyboardInterrupt:
        print("\n\nShutdown requested by user")
        cleanup_processes(running_processes)
        print("Server stopped")
    except UnicodeEncodeError:
        # Handle Windows encoding issues gracefully
        print("\n[INFO] Unicode encoding issue detected - server may still be running")
        print("Check if Django is accessible at http://localhost:8000")
        cleanup_processes(running_processes)
        sys.exit(0)
    except Exception as e:
        print(f"\nUnexpected error: {e}")
        cleanup_processes(running_processes)
        sys.exit(1)

if __name__ == '__main__':
    main()