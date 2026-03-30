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

# If "dp" is passed, deploy to BSC Testnet (public)
if [ "$1" == "dp" ]; then
    echo "--- Deploying Token 42 to BSC Testnet ---"

    # Check for PRIVATE_KEY
    if [ ! -f .env ] || ! grep -q "PRIVATE_KEY=.\+" .env; then
        echo "Error: No PRIVATE_KEY found in .env file."
        echo "1. Copy the example:  cp .env-example .env"
        echo "2. Add your key:      PRIVATE_KEY=your_key_here"
        exit 1
    fi

    npm install --legacy-peer-deps
    npx hardhat compile
    echo "Deploying to BSC Testnet..."
    npx hardhat run deployment/deploy.js --network bscTestnet

    echo "--- Deployment Complete ---"
    echo "Verify at: https://testnet.bscscan.com/"
    exit 0
fi

# If "vfy" is passed, verify the contract on BscScan
if [ "$1" == "vfy" ]; then
    if [ -z "$2" ]; then
        echo "Error: Please provide the contract address to verify."
        echo "Usage: ./run.sh vfy <CONTRACT_ADDRESS>"
        exit 1
    fi

    # Check for BSCSCAN_API_KEY
    if [ ! -f .env ] || ! grep -q "BSCSCAN_API_KEY=.\+" .env; then
        echo "Error: No BSCSCAN_API_KEY found in .env file."
        echo "Please add your BscScan API key to .env to verify: BSCSCAN_API_KEY=your_api_key_here"
        exit 1
    fi

    echo "--- Verifying Token 42 on BscScan ---"
    npx hardhat verify --network bscTestnet "$2"
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
echo "To deploy to BSC Testnet: ./run.sh dp"
echo "To verify on BSC Testnet: ./run.sh vfy <CONTRACT_ADDRESS>"
echo "To clean the project:     ./run.sh clean"
