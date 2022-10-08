import {ethers} from "hardhat";
import {Yarikium__factory} from "../typechain-types";

async function main() {
  const [signer] = await ethers.getSigners();
  const yarikium = await new Yarikium__factory(signer).deploy();
  console.log(yarikium.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
