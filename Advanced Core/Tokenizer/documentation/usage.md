# Documentation

## Setup

1. **Install dependencies**:
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

2. **Compile the contract**:
   ```bash
   npx hardhat compile
   ```

## Local Development & Testing

Hardhat allows testing locally without real network costs.

- Run a local node:
  ```bash
  npx hardhat node
  ```

- Deploy locally (in a new terminal):
  ```bash
  npx hardhat run deployment/deploy.js --network localhost
  ```
