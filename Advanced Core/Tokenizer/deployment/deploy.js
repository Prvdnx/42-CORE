const hre = require("hardhat");

async function main() {
  console.log("Deploying Token42...");

  const Token = await hre.ethers.getContractFactory("Token42");
  const token = await Token.deploy();
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("Token42 deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
