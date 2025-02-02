const hre = require("hardhat");

async function main() {
  // Deploy WrappedTokenFactory first
  const WrappedTokenFactory = await hre.ethers.getContractFactory("WrappedTokenFactory");
  const factory = await WrappedTokenFactory.deploy();
  await factory.waitForDeployment();
  console.log("WrappedTokenFactory deployed to:", await factory.getAddress());

  // Deploy ChainBGateway with factory address
  const ChainBGateway = await hre.ethers.getContractFactory("ChainBGateway");
  const gateway = await ChainBGateway.deploy(await factory.getAddress());
  await gateway.waitForDeployment();
  console.log("ChainBGateway deployed to:", await gateway.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});