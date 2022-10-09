import React from "react";
import { useMetaMask } from "./MetaMask";
import { ethers } from "ethers";

export function useContracts() {
    const {
        signer,
        chainId
    } = useMetaMask();

    const yarikium = new ethers.Contract(
        chainId == Number(process.env.REACT_APP_GOERLI_CHAIN_ID)
            ? process.env.REACT_APP_GOERLI_ERC20
            : process.env.REACT_APP_MUMBAI_ERC20,
        require("../abis/Yarikium.json"),
        signer
    );

    const bridge = new ethers.Contract(
        chainId == Number(process.env.REACT_APP_GOERLI_CHAIN_ID)
            ? process.env.REACT_APP_GOERLI_BRIDGE
            : process.env.REACT_APP_MUMBAI_BRIDGE,
        require("../abis/Bridge.json"),
        signer
    );

    return {
        yarikium,
        bridge
    };
}