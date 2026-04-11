# TokenizeArt: TokenizeArt 42

This project is a Web3 exercise designed to create and deploy a non-fungible token (NFT) on the blockchain, adhering to the BEP-721 (ERC-721) standard for the BNB Smart Chain.

## Technology Choices

In order to keep the implementation **simple**, **concise**, and highly **secure**:
- **Solidity**: The standard programming language for BNB chain and Ethereum smart contracts.
- **OpenZeppelin Contracts**: We utilized the industry-standard, heavily audited OpenZeppelin ERC721 and ERC721URIStorage libraries. BEP-721 is fully compatible with ERC-721, minimizing the risk of introducing vulnerabilities.
- **Hardhat**: The premier development environment used for testing and deployment. Hardhat is easy to set up and runs a local network for quick testing.
- **IPFS**: The NFT image and metadata are stored on IPFS (InterPlanetary File System), a decentralized storage network, ensuring the content is permanent and tamper-proof.

## NFT Details
- **Collection Name**: TokenizeArt 42 (contains "42" as required).
- **Symbol**: TA42
- **Artist**: ookamonu
- **Network Used**: BSC Testnet (Chain ID: 97)
- **Smart Contract Address**: `0xF87Ea69f76E31F811cb6Ab5F77754930f7da7b21`

## Directory Structure
- `code/`: Contains the Solidity smart contract (`TokenizeArt42.sol`).
- `deployment/`: Contains the Hardhat deployment script.
- `mint/`: Contains the minting script to create NFTs after deployment.
- `documentation/`: Contains instructions on usage and the project whitepaper.
- `README.md`: Explains the structural choices and project overview.
