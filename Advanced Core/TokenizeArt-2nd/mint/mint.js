const hre = require("hardhat");

// IPFS metadata URI after uploading
const METADATA_URI = "ipfs://bafkreif7j5h62pat4pj6cctuz33tmveisjmx2q43ekklpoavot36evfhqa";

async function main() {
  // the deployed contract address
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
  if (!CONTRACT_ADDRESS) {
    // if no address provided, deploy a fresh one for local testing
    console.log("No CONTRACT_ADDRESS set, deploying fresh contract for local test...");
    const NFT = await hre.ethers.getContractFactory("42TokenizeArt");
    const nft = await NFT.deploy();
    await nft.waitForDeployment();

    const address = await nft.getAddress();
    console.log("Deployed to:", address);

    // mint NFT #0 to the deployer
    const [deployer] = await hre.ethers.getSigners();
    const tx = await nft.mint(deployer.address, METADATA_URI);
    await tx.wait();

    console.log("Minted NFT #0 to:", deployer.address);
    console.log("Token URI:", await nft.tokenURI(0));
    console.log("Owner of NFT #0:", await nft.ownerOf(0));
    return;
  }

  // attach to existing deployed contract
  const NFT = await hre.ethers.getContractFactory("42TokenizeArt");
  const nft = NFT.attach(CONTRACT_ADDRESS);

  const [deployer] = await hre.ethers.getSigners();
  console.log("Minting NFT with account:", deployer.address);

  const tx = await nft.mint(deployer.address, METADATA_URI);
  await tx.wait();

  // verify the mint
  const tokenId = 0;
  console.log("Minted NFT #" + tokenId);
  console.log("Token URI:", await nft.tokenURI(tokenId));
  console.log("Owner of NFT #" + tokenId + ":", await nft.ownerOf(tokenId));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
