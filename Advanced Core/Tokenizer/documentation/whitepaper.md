# Token 42 (T42) 
Token 42 (T42) is a standard BEP-20 compliant digital asset deployed on the Binance Smart Chain (BSC) Testnet. This document outlines the purpose, technical features, and underlying functionality of the token.

## 1. Token Representation & Purpose
Token 42 is designed as an educational and utility token representing the successful integration of decentralized smart contract development within the 42 curriculum.

**What it will be used for:**
- **Demonstration of Decentralized Transfer:** Facilitating peer-to-peer transfers of value without a centralized intermediary.
- **Working with Other Apps:** Proving the token can easily securely connect to other websites (like a decentralized exchange) by allowing them to move tokens on your behalf using the standard rules.
- **Proof of Concept:** Showing that we can securely deploy standard, well tested code (OpenZeppelin) onto a real blockchain network.

## 2. Technical Features and Functionality
The token adheres strictly to the BEP-20 standard (fully cross-compatible with ERC-20), ensuring it can be imported into any standard Web3 wallet (e.g., MetaMask, Trust Wallet) and tracked on block explorers like BscScan.

### Core Specifications
- **Name:** Token 42
- **Ticker/Symbol:** T42
- **Network:** Binance Smart Chain (BSC) Testnet
- **Decimals:** 18 (This means a single T42 token can be split into extremely tiny fractions, like 0.000000000000000001).
- **Max Supply:** 1,000,000 T42
- **Fungibility:** Fully fungible (every T42 is identical and interchangeable with another).

### Functionality
The token contract exposes the following core functionalities to the public network:
1. **`transfer(to, amount)`**: Allows any token holder to send tokens to another address.
2. **`approve(spender, amount)`**: Allows a user to delegate spending power to a third-party application (like a decentralized exchange).
3. **`transferFrom(from, to, amount)`**: Allows an approved third-party application to securely move the user's funds.
4. **`balanceOf(account)`**: Queries the public ledger to return the exact holdings of any address.

## 3. Security, Ownership, and Privileges
Security is a paramount concern for Token 42. The contract implements the `Ownable` design pattern (via OpenZeppelin) to establish a clear hierarchy of privileges.

- **The Deployer:** Upon creation, the wallet that deploys the contract is permanently recorded as the `owner`.
- **Privileges:** As the `owner`, this wallet holds exclusive rights to administrative functions (if any are added) and is the sole recipient of the initial 1,000,000 T42 minted supply.
- **Revocability:** The owner can call `renounceOwnership()` to permanently leave the contract without an administrator, rendering the token completely trustless and immutable. Alternatively, ownership can be transferred to a new administrator via `transferOwnership()`.
- **Failure Handling:** If an unauthorized user attempts to perform an owner-level action, the contract completely halts and reverts the transaction, preventing any gas drain or unauthorized logic execution.

## 4. Tokenomics
- **Initial Minting:** 100% of the maximum supply (1,000,000 T42) was minted in a single transaction during contract deployment.
- **Distribution:** The entire supply is immediately transferred to the deployer's wallet (`msg.sender`). From there, the deployer acts as the central distributor to allocate tokens to testers, users, or liquidity pools over the BSC Testnet.
- **Inflation/Deflation:** The supply is permanently capped. The contract does not include dynamic minting or burning capabilities, guaranteeing a fixed supply schedule forever.
