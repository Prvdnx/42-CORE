# 42TokenizeArt

This project is a Web3 exercise designed to create and deploy a non-fungible token (NFT) on the blockchain, adhering to the BEP-721 (ERC-721) standard for the BNB Smart Chain.

## Technology Choices

In order to keep the implementation **simple**, **concise**, and highly **secure**:
- **Solidity**: The standard programming language for BNB chain and Ethereum smart contracts.
- **OpenZeppelin Contracts**: We utilized the industry-standard, heavily audited OpenZeppelin ERC721 and ERC721URIStorage libraries. BEP-721 is fully compatible with ERC-721, minimizing the risk of introducing vulnerabilities.
- **Hardhat**: The premier development environment used for testing and deployment. Hardhat is easy to set up and runs a local network for quick testing.
- **IPFS**: The NFT image and metadata are stored on IPFS (InterPlanetary File System), a decentralized storage network, ensuring the content is permanent and tamper-proof.

## NFT Details
- **Collection Name**: 42TokenizeArt (contains "42" as required).
- **Symbol**: 42TA
- **Artist**: ookamonu
- **Art Style**: Cosmic Sacred Geometry
- **Network Used**: BSC Testnet (Chain ID: 97)
- **Smart Contract Address**: ``

## Directory Structure
- `code/`: Contains the Solidity smart contract (`42TokenizeArt.sol`).
- `deployment/`: Contains the Hardhat deployment script.
- `mint/`: Contains the minting script to create NFTs after deployment.
- `documentation/`: Contains instructions on usage and the project whitepaper.
- `README.md`: Explains the structural choices and project overview.
