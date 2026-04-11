# Tokenizer: Token 42

This project is a Web3 exercise designed to create a custom token on a blockchain, adhering to the standard BEP-20 requirements for the BNB chain.

## Technology Choices

In order to keep the implementation **simple**, **concise**, and highly **secure**:
- **Solidity**: The standard programming language for BNB chain and Ethereum smart contracts.
- **OpenZeppelin Contracts**: The industry-standard, heavily audited OpenZeppelin ERC20 library. BEP-20 is fully compatible with ERC20, which minimizes the risk of introducing vulnerabilities.
- **Hardhat**: The premier development environment used for testing and deployment. Hardhat is easy to set up and runs a local network for quick testing.
- **BscScan (Testnet)**: The block explorer used to publicly verify the smart contract source code, enabling transparent interaction directly from the web interface.

## Installed Dependencies
To run this project, the following `npm` packages were critical:
- **`hardhat`**: The core framework and compile engine.
- **`@nomicfoundation/hardhat-toolbox`**: A bundle of utilities including Ethers.js for blockchain communication and Hardhat Verify for BscScan integration.
- **`@openzeppelin/contracts`**: The secure blueprints containing the `ERC20` and `Ownable` contracts we inherit from.
- **`dotenv`**: For securely loading private keys and API credentials from a local `.env` file without hardcoding them.

## Smart Contract Details
- **Name**: Token 42 (As required, it contains "42").
- **Symbol**: T42
- **Network Used**: BSC Testnet (Chain ID: 97)
- **Smart Contract Address**: `0x0249bdBF64D6E8ab5277EaBB485D3b4913D550c5`

## Directory Structure
- `code/`: Contains the Solidity smart contract.
- `deployment/`: Contains the Hardhat deployment script.
- `documentation/`: Contains instructions on compiling, deploying, and using the token.
- `README.md`: Explains the structural choices and project overview.
