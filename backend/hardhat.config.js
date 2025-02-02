require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    holesky: {
      url: process.env.HOLESKY_RPC_URL,
      accounts: [process.env.RELAYER_PRIVATE_KEY],
    },
    amoy: {
      url : process.env.AMOY_RPC_URL,
      accounts: [process.env.RELAYER_PRIVATE_KEY],
    },

    network1: {
      url: "http://127.0.0.1:8545",
      chainId: 1337, // Custom chainId for this network
      accounts: [process.env.DEMO_PRIVATE_KEY_1]
    },
    // Testnet 2: Local Network 2 with custom chainId
    network2: {
      url: "http://127.0.0.1:9545",
      chainId: 1338, // Different chainId for this network
      accounts: [process.env.DEMO_PRIVATE_KEY_2]
    }
  }
};
