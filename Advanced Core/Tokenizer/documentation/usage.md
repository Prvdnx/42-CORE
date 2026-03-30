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

Verification publishes your contract source code to the block explorer so others can verify your implementation and interact with it easily.

1. Get an API key from [BscScan](https://bscscan.com/myapikey).
2. Add your key to your `.env` file: `BSCSCAN_API_KEY=your_api_key_here`
3. Run the hardhat verify command with your deployed contract address:
   ```bash
   npx hardhat verify --network bscTestnet <YOUR_CONTRACT_ADDRESS>
   ```
   Or use the provided run script:
   ```bash
   ./run.sh vfy <YOUR_CONTRACT_ADDRESS>
   ```

4. Go to [testnet.bscscan.com](https://testnet.bscscan.com/).
5. Search for your contract address.
6. You should see a green checkmark indicating the code is verified!
   - Token name: **Token 42**
   - Symbol: **T42**
   - Total supply: **1,000,000**
7. Under "Read Contract" or "Write Contract", you can now call functions like `owner()` or `transfer()` by clicking "Connect to Web3".

## Adding the Token to MetaMask

1. Open MetaMask and make sure you are on the **BNB Smart Chain Testnet**.
2. Click on **Tokens** -> **Import tokens** (usually at the bottom).
3. Paste your contract address: `0x0249bdBF64D6E8ab5277EaBB485D3b4913D550c5`
4. MetaMask should instantly auto-fill the Token Symbol (`T42`) and Decimals (`18`).
5. Click **Next** and **Import**. You should immediately see your balance of `1,000,000 T42`!

## Transferring Tokens

Since this adheres to the BEP-20 (ERC20) standard, any standard web3 wallet like MetaMask, or blockchain explorer like BscScan, can interface with this token contract.

To transfer tokens:
1. In MetaMask, select your T42 token.
2. Click **Send** → enter the recipient address and amount → **Confirm**.
3. The transfer will appear on BscScan within seconds.
