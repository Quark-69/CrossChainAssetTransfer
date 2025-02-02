const hre = require("hardhat");

async function main() {
  // Deploy ChainAGateway
  const ChainAGateway = await hre.ethers.getContractFactory("ChainAGateway");
  const gateway = await ChainAGateway.deploy();
  
  await gateway.waitForDeployment();
  console.log("ChainAGateway deployed to:", await gateway.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});