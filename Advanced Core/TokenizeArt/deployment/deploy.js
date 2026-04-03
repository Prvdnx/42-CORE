const hre = require("hardhat");

async function main() {
  console.log("Deploying TokenizeArt42...");

  const NFT = await hre.ethers.getContractFactory("TokenizeArt42");
  const nft = await NFT.deploy();
  await nft.waitForDeployment();

  const address = await nft.getAddress();
  console.log("TokenizeArt42 deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
