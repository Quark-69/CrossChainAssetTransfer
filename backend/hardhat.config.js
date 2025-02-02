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
    }
  }
};
