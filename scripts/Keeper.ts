import { ethers, EventFilter, Wallet } from "ethers";
import {
  BridgeReceive__factory,
  BridgeTransfer__factory,
} from "../typechain-types";

const keeperPrivateKey = "";

const rpcUrlA = "https://goerli.infura.io/v3/eaa3051a438c45149e629eb028072632";
const rpcUrlB = "https://polygon-mumbai.infura.io/v3/eaa3051a438c45149e629eb028072632";

const bridgeTransferAddressA = "0xd2108A509999f3f82263Ddd6606d00941D354b85";
const bridgeReceiveAddressB = "0x5D7A7e43e26db657211F7EFe6e2fe1cA5bc7b67a";

const providerA = new ethers.providers.JsonRpcProvider(rpcUrlA);
const providerB = new ethers.providers.JsonRpcProvider(rpcUrlB);

const keeperA = new Wallet(keeperPrivateKey, providerA);
const keeperB = new Wallet(keeperPrivateKey, providerB);

const bridgeTransferA = BridgeTransfer__factory.connect(
  bridgeTransferAddressA,
  keeperA
);

const bridgeReceiveB = BridgeReceive__factory.connect(
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
    if (parsedLog.name == "Transfer") {
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