require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

console.log("Sepolia URL:", process.env.SEPOLIA_QUICKNODE_KEY);
console.log("Private Key:", process.env.PRIVATE_KEY);

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
      console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    // goerli: {
    //   url: process.env.GOERLI_QUICKNODE_KEY,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    sepolia: {
      url: process.env.SEPOLIA_QUICKNODE_KEY,
      accounts: [process.env.PRIVATE_KEY],
    }

    
    // mainnet: {
    //   url: process.env.PROD_QUICKNODE_KEY,
    //   accounts: [process.env.PRIVATE_KEY],
    // }
  }
  
};
