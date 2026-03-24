# Tokenizer: Token 42

This project is a Web3 exercise designed to create a custom token on a blockchain, adhering to the standard BEP-20 requirements for the BNB chain.

## Technology Choices

In order to keep the implementation **simple**, **concise**, and highly **secure**:
- **Solidity**: The standard programming language for BNB chain and Ethereum smart contracts.
- **OpenZeppelin Contracts**: We utilized the industry-standard, heavily audited OpenZeppelin ERC20 library. BEP-20 is fully compatible with ERC20, which minimizes the risk of introducing vulnerabilities.
- **Hardhat**: The premier development environment used for testing and deployment. Hardhat is easy to set up and runs a local network for quick testing.

## Smart Contract Details
- **Name**: Token 42 (As required, it contains "42").
- **Symbol**: T42
- **Network Used**: BSC Testnet (Chain ID: 97)
- **Smart Contract Address**: *(To be filled after deployment)*

## Directory Structure
- `code/`: Contains the Solidity smart contract.
- `deployment/`: Contains the Hardhat deployment script.
- `documentation/`: Contains instructions on compiling, deploying, and using the token.
- `README.md`: Explains the structural choices and project overview.
