const hre = require("hardhat");

async function main() {
  const ContractFactory = await hre.ethers.getContractFactory("EHealthTransaction"); // Replace with your contract name
  const contract = await ContractFactory.deploy(); // Deploy contract

  await contract.waitForDeployment(); // Wait for contract to be mined

  console.log("Contract deployed to:", await contract.getAddress()); // Get deployed contract address
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
