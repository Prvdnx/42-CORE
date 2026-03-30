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

### Step 1: Install MetaMask
1. Install the [MetaMask](https://metamask.io/) browser extension.
2. Create a wallet (or import an existing one).
3. Add the **BSC Testnet** network to MetaMask:
   - Network Name: `BSC Testnet` or `BNB Smart Chain Testnet`
   - RPC URL: `https://data-seed-prebsc-1-s1.binance.org:8545`
   - Chain ID: `97`
   - Currency Symbol: `tBNB`
   - Block Explorer: `https://testnet.bscscan.com/`

### Step 2: Get Test BNB
1. Go to the [BNB Chain Faucet](https://testnet.bnbchain.org/faucet-smart) or any other alternative.
2. Paste your MetaMask wallet address.
3. Request tBNB (you only need ~0.01 tBNB for gas fees).

### Step 3: Export Your Private Key
1. In MetaMask, click the three dots → **Account Details** → **Export Private Key**.
2. Enter your password and copy the key.

### Step 4: Deploy
1. Set your private key as an environment variable in a .env or with an export:
   ```bash
   export PRIVATE_KEY="your-private-key-here"
   ```
2. Run the deployment:
   ```bash
   npx hardhat run deployment/deploy.js --network bscTestnet
   ```
3. Copy the deployed contract address from the output.
4. Paste it into `README.md` under **Smart Contract Address**.

## Verifying on BscScan

1. Go to [testnet.bscscan.com](https://testnet.bscscan.com/).
2. Search for your contract address.
3. You should see:
   - The contract creation transaction
   - Token name: **Token 42**
   - Symbol: **T42**
   - Total supply: **1,000,000**
4. Under "Read Contract", call `owner()` to verify the contract owner.

## Adding the Token to MetaMask

1. In MetaMask, click **Import Tokens**.
2. Paste your contract address.
3. MetaMask will auto-detect the token name (Token 42) and symbol (T42).
4. Your balance of 1,000,000 T42 will appear in your wallet.

## Transferring Tokens

Since this adheres to the BEP-20 (ERC20) standard, any standard web3 wallet like MetaMask, or blockchain explorer like BscScan, can interface with this token contract.

To transfer tokens:
1. In MetaMask, select your T42 token.
2. Click **Send** → enter the recipient address and amount → **Confirm**.
3. The transfer will appear on BscScan within seconds.
