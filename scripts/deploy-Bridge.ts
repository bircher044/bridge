import {ethers} from "hardhat";
import {Bridge__factory} from "../typechain-types";

async function main() {
  const [signer] = await ethers.getSigners();
  const bridge = await new Bridge__factory(signer).deploy(
    "0xBE9003F3Cd9B8499CBa1CA2e7D0130D87fEe6cD0", 
    "0x9f6cfde3A4E72F06Fae97b95A7268070BA14d0eE");
  console.log(bridge.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
