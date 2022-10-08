import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy-ethers";

export default {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: `https://eth-goerli.infura.io/v3/eaa3051a438c45149e629eb028072632`,
      accounts: ["bfe15ac25c9a0686a721d1b2611649f27ae7aed8d7ff3409b7e7cd2ff473c33e"],
      chainId: 5
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/eaa3051a438c45149e629eb028072632`,
      accounts: ["bfe15ac25c9a0686a721d1b2611649f27ae7aed8d7ff3409b7e7cd2ff473c33e"],
      chainId: 80001
    },
    localhost: {
      chainId: 1337
    }
  }
};