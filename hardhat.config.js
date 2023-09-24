require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
};

// config for deployment in other test networks
const URL = process.env.URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports={
  solidity: "0.8.19",
  networks:{
    sepolia:{
      url: URL,
      accounts: [PRIVATE_KEY],
    },
  },
};