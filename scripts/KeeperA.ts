import { ethers, EventFilter, Wallet } from "ethers";
import {
  Bridge__factory,
} from "../typechain-types";

const keeperPrivateKey = "bfe15ac25c9a0686a721d1b2611649f27ae7aed8d7ff3409b7e7cd2ff473c33e";

const rpcUrlA = "https://goerli.infura.io/v3/35cbd0a2437446b9bbb557129eb36625";
const rpcUrlB = "https://polygon-mumbai.infura.io/v3/35cbd0a2437446b9bbb557129eb36625";

const bridgeTransferAddressA = "0x4A6c6e472F928e9eBf445Ab0E30e25b3DF592AE9";
const bridgeReceiveAddressB = "0x4A6c6e472F928e9eBf445Ab0E30e25b3DF592AE9";

const providerA = new ethers.providers.JsonRpcProvider(rpcUrlA);
const providerB = new ethers.providers.JsonRpcProvider(rpcUrlB);

const keeperA = new Wallet(keeperPrivateKey, providerA);
const keeperB = new Wallet(keeperPrivateKey, providerB);

const bridgeTransferA = Bridge__factory.connect(
  bridgeTransferAddressA,
  keeperA
);

const bridgeReceiveB = Bridge__factory.connect(
  bridgeReceiveAddressB,
  keeperB
);

const transferTopic = ethers.utils.id(
  "Send(uint256,address)"
);

const filter: EventFilter = {
  address: bridgeTransferA.address,
  topics: [transferTopic],
};

providerA.on(filter, async (listener) => {
  const tx = await providerA.getTransactionReceipt(listener.transactionHash);
  const logs = tx.logs.filter((log) => log.address == bridgeTransferA.address);
  for (let i = 0; i < logs.length; i++) {
    const log = logs[i];
    const parsedLog = bridgeTransferA.interface.parseLog(log);
    if (parsedLog.name == "Send") {
      const amount = parsedLog.args[0];
      const who = parsedLog.args[1];

      const keepTx = await bridgeReceiveB.keep(
        amount,
        who
      );

      console.log(keepTx.hash);
    }
  }
});