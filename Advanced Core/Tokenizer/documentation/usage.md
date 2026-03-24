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

## Deploying to BNB Testnet (BSC Testnet)

To deploy to the public BSC testnet:

1. Obtain a testnet wallet (e.g., MetaMask) and get some test BNB from the [BNB Chain Faucet](https://testnet.binance.org/faucet-smart).
2. Set your `PRIVATE_KEY` as an environment variable:
   ```bash
   export PRIVATE_KEY="your-wallet-private-key"
   ```
3. Run the deployment script on the `bscTestnet` configured in `hardhat.config.js`:
   ```bash
   npx hardhat run deployment/deploy.js --network bscTestnet
   ```

## Using the Token
Since this adheres to the BEP-20 (ERC20) standard, any standard web3 wallet like MetaMask, or blockchain explorer like BscScan, can interface with this token contract immediately after deployment. You can transfer `T42` to any other BEP-20 compatible address.
