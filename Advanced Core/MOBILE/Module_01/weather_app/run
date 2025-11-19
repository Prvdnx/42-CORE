#!/bin/bash
# A script for running and managing the project.

set -e

# --- Helper Functions ---

# Cleans the project by removing caches and dependencies.
clean() {
  echo "🧹 Cleaning project artifacts..."
  rm -rf node_modules
  rm -f package-lock.json
  npm cache clean --force
  echo "✅ Project cleaned successfully."
}

# Installs all npm dependencies.
install() {
  echo "📦 Installing dependencies..."
  npm install
  echo "✅ Dependencies installed successfully."
}

# Starts the Expo development server.
start() {
  echo "🚀 Starting the application..."
  npx expo start
}

# --- Main Logic ---

COMMAND=$1

# Show help if no command is provided.
if [ -z "$COMMAND" ]; then
  echo "Usage: $0 {start|clean|rebuild}"
  echo "  start   - Starts the Expo development server."
  echo "  clean   - Removes build artifacts and caches."
  echo "  rebuild - Cleans the project, reinstalls dependencies, and starts the server."
  exit 1
fi

case "$COMMAND" in
  start)
    start
    ;;
  clean)
    clean
    ;;
  rebuild)
    clean
    install
    start --clear
    ;;
  *)
    echo "Error: Unknown command '$COMMAND'"
    exit 1
    ;;
esac

echo "🎉 Done!"
