const hre = require("hardhat");

async function main() {
  console.log("Deploying 42TokenizeArt...");

  const NFT = await hre.ethers.getContractFactory("42TokenizeArt");
  const nft = await NFT.deploy();
  await nft.waitForDeployment();

  const address = await nft.getAddress();
  console.log("42TokenizeArt deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
