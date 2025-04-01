require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      viaIR: true, // Enable IR-based compilation
      optimizer: {
        enabled: true,
        runs: 200, // Optimize for frequent use
      },
    },
  },
  paths: {
    sources: "./contracts",   // Ensure contracts are inside this folder
    artifacts: "./artifacts", // Generated ABI files go here
  },
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_URL, // Use Alchemy or Infura
      accounts: [process.env.PRIVATE_KEY], // Use your private key
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY, // Optional: For verifying contracts
  },
};
