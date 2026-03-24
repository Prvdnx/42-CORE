#!/bin/bash

# Exit on error
set -e

# Cleanup function
clean() {
    echo "Cleaning up artifacts, cache, and dependencies..."
    rm -rf artifacts cache node_modules package-lock.json .tmp .pip_cache
}

# If "clean" is passed as an argument, just clean and exit
if [ "$1" == "clean" ]; then
    clean
    exit 0
fi

echo "--- Tokenizer: Token 42 ---"

# 1. Install dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps

# 2. Compile the smart contract
echo "Compiling the smart contract..."
npx hardhat compile

# 3. Local Deployment Test
echo "Running local deployment test..."
npx hardhat run deployment/deploy.js

echo "--- Setup Complete ---"
echo "To deploy to BSC Testnet, see documentation/usage.md"
echo "To clean the project, run: ./run.sh clean"
