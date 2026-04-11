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

# If "dp" is passed, deploy on BSC Testnet (public)
if [ "$1" == "dp" ]; then
    echo "--- Deploying TokenizeArt 42 to BSC Testnet ---"

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
    echo "1. Copy the address above."
    echo "2. Add it to .env:  CONTRACT_ADDRESS=\"0x...\""
    echo "3. Then run:        ./run.sh mint"
    exit 0
fi

# If "mint" is passed, mint on BSC Testnet (public)
if [ "$1" == "mint" ]; then
    echo "--- Minting NFT on BSC Testnet ---"

    # Check for CONTRACT_ADDRESS
    if [ ! -f .env ] || ! grep -q "CONTRACT_ADDRESS=.\+" .env; then
        echo "Error: No CONTRACT_ADDRESS found in .env file."
        echo "Please deploy first and add the address to your .env file."
        exit 1
    fi

    echo "Minting..."
    npx hardhat run mint/mint.js --network bscTestnet

    echo "--- Minting Complete ---"
    echo "Verify at: https://testnet.bscscan.com/"
    exit 0
fi

# If "vfy" is passed, verify on BSC Testnet (public)
if [ "$1" == "vfy" ]; then
    echo "--- Verifying Contract on BscScan ---"

    # Check for requirements
    if [ ! -f .env ]; then
        echo "Error: .env file missing."
        exit 1
    fi

    # Extract CONTRACT_ADDRESS from .env
    ADDR=$(grep "^CONTRACT_ADDRESS=" .env | cut -d'=' -f2 | tr -d '"' | tr -d "'")
    
    if [ -z "$ADDR" ]; then
        echo "Error: CONTRACT_ADDRESS not found in .env."
        exit 1
    fi

    echo "Verifying contract at $ADDR..."
    npx hardhat verify --network bscTestnet "$ADDR"

    echo "--- Verification Complete ---"
    exit 0
fi

echo "--- TokenizeArt: TokenizeArt 42 ---"

# 1. Install dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps

# 2. Compile the smart contract
echo "Compiling the smart contract..."
npx hardhat compile

# 3. Local Deployment + Mint Test
echo "Running local deployment test..."
npx hardhat run deployment/deploy.js

echo ""
echo "Running local mint test..."
npx hardhat run mint/mint.js

echo "--- Setup Complete ---"
echo "To deploy to BSC Testnet: ./run.sh dp"
echo "To mint on BSC Testnet:   ./run.sh mint"
echo "To verify on BscScan:     ./run.sh vfy"
echo "To clean the project:     ./run.sh clean"
