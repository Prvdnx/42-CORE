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

- Mint an NFT locally:
  ```bash
  npx hardhat run mint/mint.js --network localhost
  ```
### **Local Development + Metamask(Visual Interface)**
Since `npx hardhat node` is terminal-only, you can use MetaMask as your visual interface to see balances and send local transactions:

1. Run `npx hardhat node` in your terminal.
2. Open MetaMask -> **Add Network** -> **Add a network manually**.
3. Set the details:
   - Network Name: `Hardhat Localhost`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337` (Hardhat's default)
   - Currency Symbol: `GO` (or ETH)
4. Now, your MetaMask is connected to your local Hardhat blockchain. Use one of the **Private Keys** printed in your Hardhat terminal terminal to import a test account into MetaMask!

## Preparing the NFT Image & Metadata

Before deploying to a public testnet, you need to upload your NFT image and metadata to IPFS.

### Step 1: Create Your NFT Image
Create or choose an image that contains the number **"42"**. It must not contain insulting terms or images.

### Step 2: Upload the Image to IPFS
Use a service like [Pinata](https://www.pinata.cloud/) or [nft.storage](https://nft.storage/):
1. Create a free account.
2. Upload your image file.
3. Copy the resulting **CID** (e.g., `QmXyz...`).
4. Your image URI will be: `ipfs://<IMAGE_CID>`
5. To preview it in a browser: `https://gateway.pinata.cloud/ipfs/<IMAGE_CID>`

### Step 3: Create and Upload Metadata
Create a `metadata.json` file:
```json
{
  "name": "TokenizeArt 42",
  "description": "A unique NFT created for the TokenizeArt project.",
  "image": "ipfs://<IMAGE_CID>",
  "attributes": [
    { "trait_type": "Artist", "value": "intra name" },
    { "trait_type": "Project", "value": "42" }
  ]
}
```
Replace `<IMAGE_CID>` with your actual image CID from Step 2.
Upload this JSON file to IPFS as well. Copy the **metadata CID**.

### Step 4: Update the Mint Script
In `mint/mint.js`, replace the `METADATA_URI` placeholder on line 4 with your actual metadata CID:
```javascript
const METADATA_URI = "ipfs://<YOUR_METADATA_CID>/metadata.json";
```

## Deploying to BNB Testnet (BSC Testnet)

### Step 1: Install MetaMask
1. Install the [MetaMask](https://metamask.io/) browser extension.
2. Create a wallet (or import an existing one).
3. Add the **BSC Testnet** network to MetaMask:
   - Network Name: `BSC Testnet`
   - RPC URL: `https://data-seed-prebsc-1-s1.binance.org:8545`
   - Chain ID: `97`
   - Currency Symbol: `tBNB`
   - Block Explorer: `https://testnet.bscscan.com/`

### Step 2: Get Test BNB
1. Go to the [BNB Chain Faucet](https://testnet.bnbchain.org/faucet-smart) or any other option.
2. Paste your MetaMask wallet address.
3. Request tBNB (you only need ~0.01 tBNB for gas fees).

### Step 3: Export Your Private Key
1. In MetaMask, click the three dots → **Account Details** → **Export Private Key**.
2. Enter your password and copy the key.

### Step 4: Deploy the Contract
1. Ensure your `.env` has your `PRIVATE_KEY`.
2. Deploy:
   ```bash
   ./run.sh dp
   ```
3. Copy the deployed contract address from the output.
4. Paste it into `README.md` under **Smart Contract Address**.

### Step 5: Mint Your NFT on Testnet
1. Add the address to `.env`:
   ```bash
   CONTRACT_ADDRESS="0xYourDeployedAddress"
   ```
2. Mint:
   ```bash
   ./run.sh mint
   ```
3. Verify the output shows:
   - `Minted NFT #0`
   - `Owner of NFT #0: <your wallet address>`
   - `Token URI: ipfs://<your metadata CID>`

## Verifying on BscScan

1. Go to [testnet.bscscan.com](https://testnet.bscscan.com/).
2. Search for your contract address.
3. You should see:
   - The contract creation transaction
   - Token name: **TokenizeArt 42**
   - Symbol: **TA42**
4. Under "Read Contract":
   - Call `ownerOf(0)` → should return your wallet address (proves NFT ownership)
   - Call `tokenURI(0)` → should return your IPFS metadata link
   - Call `owner()` → should return the contract owner address
   - Call `name()` → should return "TokenizeArt 42"

### Step 6: Verify the Source Code
Verification allows anyone to read your code directly on BscScan:
```bash
./run.sh vfy
```

## Viewing Your NFT

### Method 1: Blockchain Verification (BscScan)
This is the most direct way to prove ownership on-chain:
1.  Go to [testnet.bscscan.com](https://testnet.bscscan.com/) and search for your **Contract Address**.
2.  Navigate to the **Contract** tab and then click **Read Contract**.
3.  **Query `ownerOf`**: Enter token ID `0`. It should return your wallet address.
4.  **Query `tokenURI`**: Enter token ID `0`. It will return your IPFS metadata link.

### Method 2: Metadata & Image Check
To see the artwork behind the token:
1.  Copy the `tokenURI` from BscScan or your terminal.
2.  Replace `ipfs://` with `https://gateway.pinata.cloud/ipfs/` to view it in a normal browser.
3.  Within that JSON file, find the `image` link and do the same to view the high-resolution art.

### Method 3: Mobile Wallet (MetaMask)
To carry your NFT in your pocket (best on MetaMask Mobile):
1.  Open MetaMask Mobile and switch to the **BSC Testnet**.
2.  Go to the **NFTs** tab and tap **Import NFT**.
3.  **Address**: Paste your contract address.
4.  **Token ID**: `0`
5.  Your NFT's image and name will appear in your gallery!

## Transferring the NFT
Since this adheres to the BEP-721 (ERC-721) standard, any NFT-compatible wallet like MetaMask can display and transfer this NFT.

To transfer:
1. In MetaMask, go to your NFT → click **Send**.
2. Enter the recipient address → **Confirm**.
3. Verify on BscScan: call `ownerOf(0)` — it should now return the new owner's address.
